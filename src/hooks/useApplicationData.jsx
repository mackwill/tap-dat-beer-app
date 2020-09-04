import { useEffect, useReducer } from "react";
import axios from "axios";

// Case variables
const SET_VISITOR_BEER_DATA = "SET_VISITOR_BEER_DATA";
const SET_CURRENT_USER = "SET_CURRENT_USER";
const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";
const SET_USER_BEER_DATA = "SET_USER_BEER_DATA";
const SET_WISHLIST = "SET_WISHLIST";
const reducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_USER: {
      return { ...state, currentUser: action.value };
    }
    case SET_VISITOR_BEER_DATA: {
      return { ...state, ...action.value };
    }
    case SET_USER_BEER_DATA: {
      return { ...state, ...action.value };
    }
    case SET_WISHLIST: {
      return { ...state, currentWishlist: action.value };
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
    currentBeer: null,
    currentBeerReviews: [],
    currentWishlist: [],
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

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/beers/recommendations")),
      Promise.resolve(axios.get("/api/beers/recently")),
      Promise.resolve(axios.get("/api/wishlists")),
    ])
      .then((all) => {
        console.log("all data: ", all);
        dispatch({
          type: SET_USER_BEER_DATA,
          value: {
            recommendedBeers: all[0].data.data,
            recentlyViewed: all[1].data.data,
            currentWishlist: all[2].data.data,
          },
        });
      })
      .catch((err) => {
        console.log("Error getting beers: ", err);
      });
  }, [state.currentUser]);

  const removeDeletedBeer = (id) => {
    const filteredList = state.currentWishlist.filter((beer) => {
      return id !== beer.id;
    });
    return filteredList;
  };

  const deleteBeerFromWishlist = (wishlist_id, currentBeer) => {
    // return axios.delete(`/api/wishlists/${wishlist_id}`).then((res) => {
    //   const newWishList = removeDeletedBeer(currentBeer.id);
    //   console.log("newWishlist: ", newWishList);
    //   dispatch({
    //     type: SET_WISHLIST,
    //     value: newWishList,
    //   });
    // });
    console.log("wishlist: ", wishlist_id);
    return axios
      .delete(`/api/wishlists/${wishlist_id}`)
      .then((res) => {
        return axios.get("/api/wishlists");
      })
      .then((res) => {
        console.log("res: ", res);
        dispatch({
          type: SET_WISHLIST,
          value: res.data.data,
        });
      });
  };

  const addBeerToWishlist = (beer_id, currentBeer) => {
    return axios
      .post("/api/wishlists/", {
        beer_id: beer_id,
        user_id: state.currentUser.id,
      })
      .then(() => {
        return axios.get("/api/wishlists");
      })
      .then((res) => {
        console.log("res: ", res);
        dispatch({
          type: SET_WISHLIST,
          value: res.data.data,
        });
      })
      .catch((err) => console.log("err, ", err));
  };

  const setClickedBeerToCurrent = async (id) => {
    Promise.all([
      Promise.resolve(axios.get(`/api/beers/${id}`)),
      Promise.resolve(axios.get(`/api/reviews/beers/${id}`)),
    ]).then((all) => {
      console.log("all:", all);
      dispatch({
        type: SET_VISITOR_BEER_DATA,
        value: {
          currentBeer: all[0].data.beer,
          currentBeerReviews: all[0].data.reviews,
        },
      });
    });
  };

  const getReviewsAndWishlistForSingleUser = async () => {
    // const reviews = await axios.get("/api/reviews/user");
    // dispatch({
    //   type: SET_USER_BEER_DATA,
    //   value: reviews,
    // });
    Promise.all([
      Promise.resolve(axios.get("/api/reviews/user")),
      Promise.resolve(axios.get("/api/wishlists")),
    ]).then((all) => {
      console.log("all: ", all);
      dispatch({
        type: SET_USER_BEER_DATA,
        value: {
          currentBeerReviews: all[0].data.data,
          currentWishlist: all[1].data.data,
        },
      });
    });
  };

  return {
    ...state,
    submitLoginData,
    addBeerToWishlist,
    deleteBeerFromWishlist,
    setClickedBeerToCurrent,
    getReviewsAndWishlistForSingleUser,
  };
}
