import { useEffect, useReducer } from "react";
import axios from "axios";

// Case variables
const SET_VISITOR_BEER_DATA = "SET_VISITOR_BEER_DATA";
const SET_CURRENT_USER = "SET_CURRENT_USER";
const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";
const SET_USER_BEER_DATA = "SET_USER_BEER_DATA";
const SET_WISHLIST = "SET_WISHLIST";
const SET_REGISTRATION_OR_USER_DATA = "SET_REGISTRATION_OR_USER_DATA";
const SET_RECENTLY_VIEWED = "SET_RECENTLY_VIEWED";
const SET_USER_REVIEWS = "SET_USER_REVIEWS";
const SET_CURRENT_BEER = "SET_CURRENT_BEER";
const SET_USER_LOGOUT = "SET_USER_LOGOUT";
const reducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_USER: {
      return { ...state, currentUser: action.value, isActive: true };
    }
    case SET_USER_LOGOUT: {
      return { ...state, currentUser: null, isActive: false };
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
    case SET_CURRENT_BEER: {
      return { ...state, currentBeer: action.value };
    }
    case SET_RECENTLY_VIEWED: {
      return { ...state, recentlyViewed: action.value };
    }
    case SET_ERROR_MESSAGE: {
      return { ...state, errMessage: action.value };
    }
    case SET_REGISTRATION_OR_USER_DATA: {
      if (action.value.name) {
        return { ...state, [action.value.name]: action.value.value };
      } else {
        return { ...state, ...action.value };
      }
    }
    case SET_USER_REVIEWS: {
      return { ...state, currentBeerReviews: action.value };
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
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    passwordConfirmation: null,
    isActive: null,
  });

  useEffect(() => {
    return axios.get("/api/user").then((res) => {
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
        dispatch({
          type: SET_CURRENT_USER,
          value: res.data.user,
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_ERROR_MESSAGE,
          value: "Invalid email or password",
        });
        throw new Error();
      });
  };

  useEffect(() => {
    Promise.all([
      Promise.resolve(
        axios.get("/api/beers/recommendations", {
          headers: {
            Authorization: `Bearer ${state.currentUser.token}`,
          },
        })
      ),
      Promise.resolve(
        axios.get("/api/beers/recently", {
          headers: {
            Authorization: `Bearer ${state.currentUser.token}`,
          },
        })
      ),
      Promise.resolve(
        axios.get("/api/wishlists", {
          headers: {
            Authorization: `Bearer ${state.currentUser.token}`,
          },
        })
      ),
    ])
      .then((all) => {
        dispatch({
          type: SET_USER_BEER_DATA,
          value: {
            recommendedBeers: all[0].data.data,
            recentlyViewed: all[1].data.data,
            currentWishlist: all[2].data.data,
          },
        });
      })
      .catch((err) => {});
  }, [state.isActive]);

  const deleteBeerFromWishlist = (wishlist_id, currentBeer) => {
    return axios
      .delete(`/api/wishlists/${wishlist_id}`, {
        headers: {
          Authorization: `Bearer ${state.currentUser.token}`,
        },
      })
      .then((res) => {
        return axios.get("/api/wishlists", {
          headers: {
            Authorization: `Bearer ${state.currentUser.token}`,
          },
        });
      })
      .then((res) => {
        dispatch({
          type: SET_WISHLIST,
          value: res.data.data,
        });
      });
  };

  const addBeerToWishlist = (beer_id, currentBeer) => {
    return axios
      .post(
        "/api/wishlists/",

        {
          beer_id: beer_id,
          user_id: state.currentUser.id,
        },
        {
          headers: {
            Authorization: `Bearer ${state.currentUser.token}`,
          },
        }
      )
      .then((data) => {
        return axios.get("/api/wishlists", {
          headers: {
            Authorization: `Bearer ${state.currentUser.token}`,
          },
        });
      })
      .then((res) => {
        dispatch({
          type: SET_WISHLIST,
          value: res.data.data,
        });
      })
      .catch((error) => console.log("Error adding beer to wishlist: ", error));
  };

  const setClickedBeerToCurrent = async (id) => {
    if (id) {
      Promise.all([
        Promise.resolve(axios.get(`/api/beers/${id}`)),
        Promise.resolve(axios.get(`/api/reviews/beers/${id}`)),
      ]).then((all) => {
        dispatch({
          type: SET_VISITOR_BEER_DATA,
          value: {
            currentBeer: all[0].data.beer,
            currentBeerReviews: all[0].data.reviews,
          },
        });
      });
      return;
    } else {
      dispatch({
        type: SET_VISITOR_BEER_DATA,
        value: {
          currentBeer: null,
          currentBeerReviews: null,
        },
      });
    }
  };

  const getReviewsAndWishlistForSingleUser = async () => {
    Promise.all([
      Promise.resolve(
        axios.get("/api/reviews/user", {
          headers: {
            Authorization: `Bearer ${state.currentUser.token}`,
          },
        })
      ),
      Promise.resolve(
        axios.get("/api/wishlists", {
          headers: {
            Authorization: `Bearer ${state.currentUser.token}`,
          },
        })
      ),
    ]).then((all) => {
      dispatch({
        type: SET_USER_BEER_DATA,
        value: {
          currentBeerReviews: all[0].data.data,
          currentWishlist: all[1].data.data,
        },
      });
    });
  };

  const changeUserData = (e, clear = false) => {
    let dispatchValue = {};
    if (clear) {
      dispatchValue = {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        passwordConfirmation: null,
      };
    } else {
      dispatchValue = {
        name: e.target.name,
        value: e.target.value.trim(),
      };
    }
    dispatch({
      type: SET_REGISTRATION_OR_USER_DATA,
      value: dispatchValue,
    });
  };

  const setLoggedInUser = (user) => {
    dispatch({
      type: SET_CURRENT_USER,
      value: user,
    });
  };

  const setErrorMessage = (msg) => {
    dispatch({
      type: SET_ERROR_MESSAGE,
      value: msg,
    });
  };

  const changeAccountDetails = async (user) => {
    const newAccountDetails = {
      ...state.currentUser,
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
    };
    try {
      await axios.put("/api/user", newAccountDetails, {
        headers: {
          Authorization: `Bearer ${state.currentUser.token}`,
        },
      });

      dispatch({
        type: SET_CURRENT_USER,
        value: newAccountDetails,
      });
    } catch (error) {
      console.log("Error updating account: ", error);
    }
  };

  const setRecentlyViewed = async () => {
    const newRecentlyViewed = await axios.get("/api/beers/recently", {
      headers: {
        Authorization: `Bearer ${state.currentUser.token}`,
      },
    });
    dispatch({
      type: SET_RECENTLY_VIEWED,
      value: newRecentlyViewed.data.data,
    });
  };

  // Removes the deleted beer from =the state list of currentBeer Reviews
  const removeDeletedBeerReview = (id) => {
    const filteredList = state.currentBeerReviews.filter((beer) => {
      return id !== beer.id;
    });
    return filteredList;
  };

  // Delete a review from your list of My Reviews
  const deleteReviewById = async (review_id) => {
    await axios.delete(`/api/reviews/${review_id}`, {
      headers: {
        Authorization: `Bearer ${state.currentUser.token}`,
      },
    });
    const newBeerReview = removeDeletedBeerReview(review_id);
    dispatch({
      type: SET_USER_REVIEWS,
      value: newBeerReview,
    });
  };

  // Add a review from your list of My Reviews
  const addReviewById = async (reviewObject) => {
    const newReview = await axios.post("/api/reviews", reviewObject, {
      headers: {
        Authorization: `Bearer ${state.currentUser.token}`,
      },
    });
    newReview.data.data.first_name = state.currentUser.first_name;
    //const newBeerReview = removeDeletedBeerReview(review_id);
    const updateReviews = [newReview.data.data, ...state.currentBeerReviews];

    dispatch({
      type: SET_USER_REVIEWS,
      value: updateReviews,
    });
  };

  const logUserOut = () => {
    dispatch({
      type: SET_USER_LOGOUT,
    });
  };

  return {
    state,
    submitLoginData,
    addBeerToWishlist,
    deleteBeerFromWishlist,
    setClickedBeerToCurrent,
    getReviewsAndWishlistForSingleUser,
    changeUserData,
    setLoggedInUser,
    setErrorMessage,
    changeAccountDetails,
    setRecentlyViewed,
    deleteReviewById,
    addReviewById,
    logUserOut,
  };
}
