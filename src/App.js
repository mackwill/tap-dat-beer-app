import React, { useState, useEffect, Fragment } from "react";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import axios from "axios";

import "./App.css";
import Register from "./components/Register/Register";
import Banner from "./components/Banner/Banner";
import Category from "./components/Category/Category";
import BeerCategoryList from "./components/Category/BeerCategoryList";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Search from "./components/Search/Search";
import Review from "./components/ReviewForm/Review";
import Account from "./components/Account/Account";
import Wishlist from "./components/Wishlist/Wishlist";
import ShareOption from "./components/ShareOption/ShareOption";
import Button from "@material-ui/core/Button";
import Snackbar from "./components/Small-Components/Snackbar";
import MyAccount from "./components/Account/MyAccount";
import CustomAlert from "./components/Alert/CustomAlert";
import Scanner from "./components/Scanner/Scanner";
//import Review from './components/Review/Review'

function App() {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [beerDetailOpen, setBeerDetailOpen] = useState(false);
  const [accuontOpen, setAccuontOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [popularSearch, setPopularSearch] = useState([]);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [myWishlistOpen, setMyWishlistOpen] = useState(false);
  const [userNote, setUserNote] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentBeer, setCurrentBeer] = useState(null);
  const [beers, setBeers] = useState([]);
  const [similarBeers, setSimilarBeers] = useState([]);
  const [top10RatedBeers, setTop10RatedBeers] = useState([]);
  const [top10ReviewedBeers, setTop10ReviewedBeers] = useState([]);
  const [beerCategories, setBeerCategories] = useState([]);
  const [currentBeerReviews, setCurrentBeerReviews] = useState([]);
  const [recommendedBeers, setRecommendedBeers] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [currentWishlist, setCurrentWishlist] = useState([]);

  const [state, setState] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    passwordConfirmation: null,
  });
  const [openSB, setOpenSB] = useState(false);
  const [textSB, setTextSB] = useState(false);

  const handleClickSB = (text) => {
    setOpenSB(true);
    setTextSB(text);
  };

  const handleCloseSB = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSB(false);
  };

  const onChangeSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchOpen = (e) => {
    setSearchOpen(true);
    return axios
      .get("/api/search/analytics")
      .then((data) => setPopularSearch(data.data.finalData))
      .catch((e) => null);
  };

  const handleSearchClose = (e) => {
    setSearchOpen(false);
  };

  const handleShareOptionOpen = (e) => {
    setShareOpen(true);
  };

  const handleShareOptionClose = (e) => {
    setShareOpen(false);
  };

  const handleReviewOpen = (e) => {
    setReviewOpen(true);
  };

  const handleReviewClose = (e) => {
    setReviewOpen(false);
  };

  // The following login functions handle the
  // login open, change, close and submit dialog functionality
  const handleLoginOpen = (e) => {
    setLoginOpen(true);
  };

  const handleLoginChange = (e) => {
    e.persist();
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const handleLoginClose = (e) => {
    setLoginOpen(false);
    setState((prev) => ({
      ...prev,
      email: null,
      password: null,
    }));
    setErrMessage(null);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (!state.email || !state.password) {
      setErrMessage("Please fill out both fields to login");
      return;
    }
    return axios
      .post("/api/login", {
        email: state.email,
        password: state.password,
      })
      .then((res) => {
        console.log("login promise res:  ", res);

        setCurrentUser(res.data.user);
        handleLoginClose();
      })
      .catch((err) => {
        setErrMessage("Invalid email or password");
      });
  };

  // The following login functions handle the
  // registration open, change, close and submit dialog functionality
  const handleRegisterOpen = (e) => {
    setRegisterOpen(true);
  };

  const handleRegisterChange = (e) => {
    e.persist();
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const handleRegisterClose = (e) => {
    setRegisterOpen(false);
    setState((prev) => ({
      ...prev,
      firstName: null,
      lastName: null,
      email: null,
      password: null,
    }));
    setErrMessage(null);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (
      !state.firstName ||
      !state.lastName ||
      !state.email ||
      !state.password ||
      !state.passwordConfirmation
    ) {
      setErrMessage("Please fill out all fields");
      return;
    } else if (state.password !== state.passwordConfirmation) {
      setErrMessage("Passwords do not match");
      return;
    }

    const newUser = {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      password: state.password,
    };
    return axios
      .post("/api/register", newUser)
      .then((res) => {
        setCurrentUser(res.data.user);
        handleRegisterClose();
      })
      .catch((err) => {
        setErrMessage("That email already exists");
      });
  };

  const handleLogout = (e) => {
    e.preventDefault();

    return axios.post("/api/logout").then(() => {
      setCurrentUser(null);
      setCurrentWishlist([]);

      handleClickSB(`You are now logged out`);
    });
  };

  const handleReviewSubmit = () => {
    handleClickSB(`You just made a review`);
  };

  const handleClickFromSearchResult = (id) => {
    handleBeerDetailClick(id);

    const body = {
      beer_id: id,
      query: searchQuery,
      user_id: currentUser && currentUser.id,
    };

    // We dont need a then statement  if we  arent doing anything with it.
    // Is there something we could be doing with the data that comes back?
    return axios
      .post("/api/search/analytics", body)
      .then((data) => console.log("added search analytics:", data))
      .catch((e) => console.log("Search analytics failed", e));
  };

  const isBeerInRecentlyViewedList = (id) => {
    const filteredList = recentlyViewed.filter((beer) => beer.id === id);
    return filteredList;
  };

  const handleBeerDetailClick = async (id) => {
    console.log("id: ", id);
    setBeerDetailOpen(true);
    let userId = null;
    if (currentUser) {
      userId = currentUser.id;
    }

    if (isBeerInRecentlyViewedList(id).length === 0) {
      await axios.post("/api/search/analytics", {
        user_id: userId,
        beer_id: id,
      });
    }

    Promise.all([
      Promise.resolve(axios.get(`/api/beers/${id}`)),
      Promise.resolve(axios.get(`/api/beers/similar/${id}`)),
    ])
      .then((all) => {
        console.log("all: ", all);
        setCurrentBeer(all[0].data.beer);
        setSimilarBeers(all[1].data.data);
        return all[0].data.reviews;
      })
      .then((reviews) => setCurrentBeerReviews(reviews))
      .catch((err) =>
        console.log("Error fetching beer/similar beers/reviews: ", err)
      );
    // return axios
    //   .get(`/api/beers/${id}`)
    //   .then((res) => {
    //     setCurrentBeer(res.data.beer);
    //     return res.data.reviews;
    //   })
    //   .then((reviews) => setCurrentBeerReviews(reviews));
  };

  const handleBeerDetailClose = (e) => {
    setBeerDetailOpen(false);

    setTimeout(() => {
      setCurrentBeer(null);
      setCurrentBeerReviews([]);
      setSimilarBeers([]);
    }, 300);
  };

  const handleAccountOpen = (e) => {
    const prevFirstName = currentUser.first_name;
    const prevLastName = currentUser.last_name;
    const prevEmail = currentUser.email;
    setState((prev) => ({
      ...prev,
      firstName: prevFirstName,
      lastName: prevLastName,
      email: prevEmail,
    }));
    setAccuontOpen(true);
    return axios.get("/api/reviews/user").then((res) => {
      setCurrentBeerReviews(res.data.data);
    });
  };

  // Handle account detail change form submit
  const handleAccountChangeSubmit = (e) => {
    e.preventDefault();
    const newAccountDetails = {
      first_name: state.firstName,
      last_name: state.lastName,
      email: state.email,
      password: currentUser.password,
    };

    return axios
      .put("/api/user", newAccountDetails)
      .then((res) => {
        setCurrentUser(res.data.data);
      })
      .catch((err) => console.log("Error Updating Account: ", err));
  };

  // Check if user has already wishlisted that beer
  const hasUserWishlistedBeer = (id) => {
    const filteredList = currentWishlist.filter((beer) => {
      return id === beer.id;
    });
    return filteredList;
  };

  // Removes the deleted beer from the state list of currentWishlist
  const removeDeletedBeer = (id) => {
    const filteredList = currentWishlist.filter((beer) => {
      return id !== beer.id;
    });
    return filteredList;
  };

  // Add an item to your wishlist if it isn't already liked
  const handleAddToWishlist = (e) => {
    if (!currentUser) {
      setLoginOpen(true);
      return;
    }

    // Check to see if the user has already wishlisted a beer
    // and remove it from the wishlist if they have
    if (hasUserWishlistedBeer(currentBeer.id).length > 0) {
      return axios
        .post("/api/wishlists/delete", {
          beer_id: currentBeer.id,
          user_id: currentUser.id,
        })
        .then((res) => {
          const newWishList = removeDeletedBeer(currentBeer.id);

          setCurrentWishlist(newWishList);
          handleClickSB(`${currentBeer.name} was removed from your wishlist`);
        });
    }

    if (currentUser && currentBeer) {
      return axios
        .post("/api/wishlists", {
          beer_id: currentBeer.id,
          user_id: currentUser.id,
        })
        .then((res) => {
          const newWishList = [...currentWishlist, currentBeer];
          setCurrentWishlist([...newWishList]);
          handleClickSB(`${currentBeer.name} was saved to wishlist`);
        })
        .catch((err) => console.log("err, ", err));
    }
  };

  // Open scanner
  const handleScannerOpen = (e) => {
    setScannerOpen(true);
  };

  const handleScannerClose = (e) => {
    setScannerOpen(false);
  };

  const handleCategoryClick = (category) => {
    setSearchOpen(true);
    setSearchQuery(category);
  };

  useEffect(() => {
    axios
      .get(`/api/search?q=${encodeURI(searchQuery)}`)
      .then((data) => {
        setSearchResults(data.data.data);
      })
      .catch((e) => console.log("Error on search query:", e));
  }, [searchQuery]);

  // Get all the beers once the home page is loaded
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/beers/top10rated")),
      Promise.resolve(axios.get("/api/beers/top10reviewed")),
      Promise.resolve(axios.get("/api/beers/categories")),
    ])
      .then((all) => {
        setTop10RatedBeers(all[0].data.data);
        setTop10ReviewedBeers(all[1].data.data);
        setBeerCategories(all[2].data.data);
      })
      .catch((err) => {
        console.log("Error getting beers: ", err);
      });
  }, []);

  useEffect(() => {
    Promise.resolve(axios.get("/api/user")).then((res) => {
      setCurrentUser(res.data.data);
    });
  }, []);
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/wishlists")),
      Promise.resolve(axios.get("/api/beers/recommendations")),
      Promise.resolve(axios.get("/api/beers/recently")),
    ])
      .then((all) => {
        setCurrentWishlist(all[0].data.data);
        setRecommendedBeers(all[1].data.data);
        setRecentlyViewed(all[2].data.data);
      })
      .then((res) => {
        return axios.get("/api/beers/recommendations");
      })
      .then((res) => {
        // We need to do something with this. Why is this here?
        console.log("res recommendation: ", res);
        // setState((prev) => ({
        //   ...prev,
        //   recommendedBeers: [...res.data.data],
        // }));
      })
      .catch((err) => {
        console.log("Error getting beers: ", err);
      });
  }, [currentUser]);

  return (
    <div className="App">
      <Navbar
        handleSearchOpen={handleSearchOpen}
        handleRegisterOpen={handleRegisterOpen}
        handleLoginOpen={handleLoginOpen}
        currentUser={currentUser}
        handleLogout={handleLogout}
        handleAccountOpen={handleAccountOpen}
        handleScannerOpen={handleScannerOpen}
      />
      <Login
        open={loginOpen}
        onChange={handleLoginChange}
        handleClose={handleLoginClose}
        onSubmit={handleLoginSubmit}
        errMessage={errMessage}
      />
      <Register
        open={registerOpen}
        onChange={handleRegisterChange}
        handleClose={handleRegisterClose}
        onSubmit={handleRegisterSubmit}
        errMessage={errMessage}
      />

      <Banner />

      {currentUser && (
        <Fragment>
          {recommendedBeers.length != 0 && (
            <Category
              category={"Recommended"}
              beers={recommendedBeers}
              onClick={handleBeerDetailClick}
            />
          )}
          {recentlyViewed.length != 0 && (
            <Category
              category={"Recently Viewed"}
              beers={recentlyViewed}
              onClick={handleBeerDetailClick}
            />
          )}
        </Fragment>
      )}

      {top10RatedBeers.length > 0 && (
        <Category
          category={"Top 10 Rated Beers"}
          beers={top10RatedBeers}
          onClick={handleBeerDetailClick}
        />
      )}
      {top10ReviewedBeers.length > 0 && (
        <Category
          category={"Top 10 Reviewed Beers"}
          beers={top10ReviewedBeers}
          onClick={handleBeerDetailClick}
        />
      )}

      {beerCategories.length > 0 && (
        <BeerCategoryList
          title={"Categories"}
          categories={beerCategories}
          handleCategoryClick={handleCategoryClick}
        />
      )}

      {currentBeer && (
        <ProductDetail
          open={beerDetailOpen}
          handleClose={handleBeerDetailClose}
          currentBeer={currentBeer}
          beers={similarBeers}
          reviews={currentBeerReviews}
          openForm={handleReviewOpen}
          currentUser={currentUser}
          handleAddToWishlist={handleAddToWishlist}
          handleShareOptionOpen={handleShareOptionOpen}
          userNote={userNote}
          setOpenSB={handleClickSB}
          onClick={handleBeerDetailClick}
          setUserNote={setUserNote}
        />
      )}
      <Search
        popularSearch={popularSearch}
        onChangeSearch={onChangeSearch}
        searchQuery={searchQuery}
        open={searchOpen}
        close={handleSearchClose}
        searchResults={searchResults}
        onClick={handleClickFromSearchResult}
      />
      <Review
        currentBeer={currentBeer}
        open={reviewOpen}
        close={handleReviewClose}
        handleReviewSubmit={handleReviewSubmit}
      />
      <ShareOption open={shareOpen} close={handleShareOptionClose} />

      <Wishlist
        open={myWishlistOpen}
        close={() => setMyWishlistOpen(false)}
        beers={currentWishlist}
        onClick={handleBeerDetailClick}
      />
      <Snackbar handleClose={handleCloseSB} open={openSB} textSB={textSB} />
      {state.firstName && currentUser && (
        <MyAccount
          firstNameBeforeUpdate={currentUser.first_name}
          lastNameBeforeUpdate={currentUser.last_name}
          first_name={state.firstName}
          last_name={state.lastName}
          email={state.email}
          open={accuontOpen}
          handleClose={() => setAccuontOpen(false)}
          handleAccountChange={handleRegisterChange}
          beers={currentWishlist}
          reviews={currentBeerReviews}
          onSubmit={handleAccountChangeSubmit}
        />
      )}
      <Scanner
        open={scannerOpen}
        handleClose={handleScannerClose}
        openBeer={handleBeerDetailClick}
        beers={beers}
      />
    </div>
  );
}

export default App;
