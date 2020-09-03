import { useEffect, useReducer } from "react";
import axios from "axios";

// Case variables
const SET_TOP_10_RATED_BEERS = "SET_TOP_10_RATED_BEERS";
const SET_TOP_10_REVIEWED_BEERS = "SET_TOP_10_REVIEWED_BEERS";
const SET_RECENTLY_SEEN = "SET_RECENTLY_SEEN";
const SET_RECOMMENDED = "SET_RECOMMENDED";
const SET_BEER_DATA = "SET_BEER_DATA";
const SET_VISITOR_BEER_DATA = "SET_VISITOR_BEER_DATA";
const SET_CURRENT_USER = "SET_CURRENT_USER";
const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";
const reducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_USER: {
      return { ...state, currentUser: action.value };
    }
    case SET_VISITOR_BEER_DATA: {
      return { ...state, ...action.value };
    }
    case SET_ERROR_MESSAGE: {
      return { ...state, errMessage: action.value };
    }
    default:
      throw new Error(
        `Tried to reduce with usuppoorted action type: ${action.type}`
      );
  }
};

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    top10RatedBeers: [],
    top10ReviewedBeers: [],
    recommendedBeers: [],
    recentlyViewed: [],
    beerCategories: [],
    currentUser: null,
    errMessage: null,
  });
  useEffect(() => {
    return axios.get("/api/user").then((res) => {
      console.log("res of current user");
      // setCurrentUser(res.data.data);
      dispatch({
        type: SET_CURRENT_USER,
        value: res.data.data,
      });
    });
  }, []);

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/beers/top10rated")),
      Promise.resolve(axios.get("/api/beers/top10reviewed")),
      Promise.resolve(axios.get("/api/beers/categories")),
    ])
      .then((all) => {
        dispatch({
          type: SET_VISITOR_BEER_DATA,
          value: {
            top10RatedBeers: all[0].data.data,
            top10ReviewedBeers: all[1].data.data,
            beerCategories: all[2].data.data,
          },
        });
      })
      .catch((err) => {
        console.log("Error getting beers: ", err);
      });
  }, []);

  const submitLoginData = (email, password) => {
    return axios
      .post("/api/login", {
        email,
        password,
      })
      .then((res) => {
        console.log("login promise res:  ", res);
        dispatch({
          type: SET_CURRENT_USER,
          value: res.data.user,
        });

        // setCurrentUser(res.data.user);
        // handleLoginClose();
      })
      .catch((err) => {
        dispatch({
          type: SET_ERROR_MESSAGE,
          value: "Invalid email or password",
        });
        // setErrMessage("Invalid email or password");
      });
  };

  // useEffect(() => {
  //   Promise.all([
  //     Promise.resolve(axios.get("/api/wishlists")),
  //     Promise.resolve(axios.get("/api/beers/recommendations")),
  //     Promise.resolve(axios.get("/api/beers/recently")),
  //   ])
  //     .then((all) => {
  //       setCurrentWishlist(all[0].data.data);
  //       setRecommendedBeers(all[1].data.data);
  //       setRecentlyViewed(all[2].data.data);
  //     })
  //     .then((res) => {
  //       return axios.get("/api/beers/recommendations");
  //     })
  //     .then((res) => {
  //       console.log("res recommendation: ", res);
  //       // setState((prev) => ({
  //       //   ...prev,
  //       //   recommendedBeers: [...res.data.data],
  //       // }));
  //     })
  //     .catch((err) => {
  //       console.log("Error getting beers: ", err);
  //     });
  // }, [currentUser]);

  // put all of our state handling shit in here

  return { ...state, submitLoginData };
}
