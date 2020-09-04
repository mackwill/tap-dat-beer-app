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
import MyWishlist from "./components/MyReviews/MyReviews";
import MyReviews from "./components/MyReviews/MyReviews";
import ShareOption from "./components/ShareOption/ShareOption";
import Button from "@material-ui/core/Button";
import Snackbar from "./components/Small-Components/Snackbar";
import MyAccount from "./components/Account/MyAccount";
import CustomAlert from "./components/Alert/CustomAlert";
import Scanner from "./components/Scanner/Scanner";
import EditReview from "./components/MyReviews/EditReview";
//import Review from './components/Review/Review'
import useApplicationData from "./hooks/useApplicationData";

function App() {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [beerDetailOpen, setBeerDetailOpen] = useState(false);
  const [accuontOpen, setAccuontOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [reviewOpen, setReviewOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [userNote, setUserNote] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [editMyReviewsOpen, setEditMyReviewsOpen] = useState(false);
  const [singleReview, setSingleReview] = useState({});
  const [beers, setBeers] = useState([]);

  const [state, setState] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    passwordConfirmation: null,
  });

  const {
    top10RatedBeers,
    top10ReviewedBeers,
    recommendedBeers,
    recentlyViewed,
    beerCategories,
    currentWishlist,
    setCurrentBeer,
    currentBeer,
    setCurrentBeerReviews,
    currentBeerReviews,
    currentUser,
    errMessage,
    submitLoginData,
    addBeerToWishlist,
    deleteBeerFromWishlist,
    setClickedBeerToCurrent,
    getReviewsAndWishlistForSingleUser,
    changeUserData,
    firstName,
    lastName,
    email,
    password,
    passwordConfirmation,
    setLoggedInUser,
    setErrorMessage,
  } = useApplicationData();

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

  // -------------------- Here --------------------
  const handleSearchOpen = (e) => {
    setSearchOpen(true);
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

  const handleEditReviewOpen =  async (id) => {
    console.log('id passed in editreview open', id);
    const selectedEditReviewId = currentBeerReviews.filter((beer) => {
      return id === beer.id;
    });
    console.log('this is selectedEdit', selectedEditReviewId);
    await setSingleReview(selectedEditReviewId[0])
    console.log('single review after await', singleReview, selectedEditReviewId); 
    setEditMyReviewsOpen(true);

  };

  const handleEditReviewClose = (e) => {
    setEditMyReviewsOpen(false);
  };

  const handleEditReviewUpdate = () => {
      getReviewsAndWishlistForSingleUser();
    };
  


  const handleReviewOpen = (e) => {
    //clear the review state
    setReviewOpen(true);
  };

  const handleReviewClose = (e) => {
    setReviewOpen(false);
    
  };

  // Removes the deleted beer from =the state list of currentBeer Reviews
  const removeDeletedBeerReview = (id) => {
    const filteredList = currentBeerReviews.filter((beer) => {
      return id !== beer.id;
    });
    return filteredList;
  };

  // Check if user has already reviewed that beer
  const hasUserReviewedBeer = (id) => {
    const filteredList = currentBeerReviews.filter((beer) => {
      return id === beer.id;
    });
    return filteredList;
  };

  // Delete a review from your list of My Reviews
  const handleDeleteMyReview = (review_id) => {
    if (!currentUser) {
      setLoginOpen(true);
      return;
    }
      return axios
        .delete(`/api/reviews/${review_id}`)
        .then((res) => {
          const newBeerReview = removeDeletedBeerReview(review_id);
          console.log(newBeerReview);
          setState((prev) => ({
            ...prev,
            currentBeerReviews: newBeerReview,
          }));
          handleClickSB(
            `Your review was removed from your Review list`
          );
        });
  }

  
  // -------------------- To Here --------------------

  // const handleLoginChange = (e) => {
  //   e.persist();
  //   changeUserData(e);
  // };

  const handleLoginClose = (e) => {
    setLoginOpen(false);
    changeUserData(e, true);
  };


  const handleRegisterOpen = (e) => {
    setRegisterOpen(true);
  };

  const handleRegisterChange = (e) => {
    e.persist();
    changeUserData(e);
  };

  const handleRegisterClose = (e) => {
    setRegisterOpen(false);
    changeUserData(e, true);
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
      // setErrMessage("Please fill out all fields");
      return;
    } else if (state.password !== state.passwordConfirmation) {
      // setErrMessage("Passwords do not match");
      return;
    }

    const newUser = {
      firstName,
      lastName,
      email,
      password,
    };
    return axios
      .post("/api/register", newUser)
      .then((res) => {
        setLoggedInUser(res.data.user);
        handleRegisterClose();
      })
      .catch((err) => {
        setErrorMessage("That email already exists");
      });
  };

  const handleLogout = (e) => {
   // e.preventDefault();

    console.log("Logout clicked");
    return axios.post("/api/logout").then((data) => {
      // setCurrentUser(null);
      // setCurrentWishlist([]);

      handleClickSB(`You are now logged out`);
    });
  };

  const handleClickFromSearchResult = (id) => {
    handleBeerDetailClick(id);

    const body = {
      beer_id: id,
      query: searchQuery,
      user_id: currentUser && currentUser.id,
    };
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
    setBeerDetailOpen(true);
    let userId = null;
    if (currentUser) {
      userId = currentUser.id;
    }

    console.log("id here:", id);

    if (isBeerInRecentlyViewedList(id).length === 0) {
      await axios.post("/api/search/analytics", {
        user_id: userId,
        beer_id: id,
      });
    }
    setClickedBeerToCurrent(id);
  };

  const handleBeerDetailClose = (e) => {
    setBeerDetailOpen(false);
    
    // setTimeout(() => {
    //   setCurrentBeer(null);
    //   setCurrentBeerReviews([]);
    // }, 300);
  };

  const handleAccountOpen = (e) => {
    // Uncomment when modal is here
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
    getReviewsAndWishlistForSingleUser();
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
        // setCurrentUser(res.data.data);
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

  // Add an item to your wishlist if it isn't already liked
  const handleAddToWishlist = async (e) => {
    if (!currentUser) {
      setLoginOpen(true);
      return;
    }

    const checkWishlist = await hasUserWishlistedBeer(currentBeer.id);

    // Check to see if the user has already wishlisted a beer
    // and remove it from the wishlist if they have
    if (checkWishlist.length > 0) {
      const wish = currentWishlist.filter((beer) => beer.id === currentBeer.id);
      await deleteBeerFromWishlist(wish[0].w_id, currentBeer);
      handleClickSB(`${currentBeer.name} was removed from your wishlist`);
      return;
    }

    if (currentUser && currentBeer) {
      await addBeerToWishlist(currentBeer.id);
      handleClickSB(`${currentBeer.name} was saved to wishlist`);
    }
  };

  // Open scanner
  const handleScannerOpen = (e) => {
    setScannerOpen(true);
    // if (state) {
    //   setScannerOpen(true);
    // } else {
    //   setScannerOpen(false);
    // }
  };

  const handleScannerClose = (e) => {
    setScannerOpen(false);
  };

  const handleCategoryClick = (category) => {
    setSearchOpen(true);
    setSearchQuery(category);
  };

  return (
    <div className="App">
      <Navbar
        handleSearchOpen={handleSearchOpen}
        handleRegisterOpen={handleRegisterOpen}
        handleLoginOpen={setLoginOpen}
        currentUser={currentUser}
        handleLogout={handleLogout}
        handleAccountOpen={handleAccountOpen}
        handleScannerOpen={handleScannerOpen}
      />
      <Login
        open={loginOpen}
        // onChange={handleLoginChange}
        handleClose={handleLoginClose}
        // onSubmit={handleLoginSubmit}
        errMessage={errMessage}
      />
      <Register
        open={registerOpen}
        onChange={handleRegisterChange}
        handleClose={handleRegisterClose}
        onSubmit={handleRegisterSubmit}
        errMessage={errMessage}
        state={{ firstName, lastName, email, password, passwordConfirmation }}
      />

      <Banner />

      {currentUser && (
        <Fragment>
          {recommendedBeers.length !== 0 && (
            <Category
              category={"Recommended"}
              beers={recommendedBeers}
              onClick={handleBeerDetailClick}
            />
          )}
          {recentlyViewed.length !== 0 && (
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
          beers={beers}
          reviews={currentBeerReviews}
          openForm={handleReviewOpen}
          currentUser={currentUser}
          handleAddToWishlist={handleAddToWishlist}
          handleShareOptionOpen={handleShareOptionOpen}
          userNote={userNote}
          setOpenSB={handleClickSB}
          onClick={handleBeerDetailClick}
          setUserNote={setUserNote}
          handleEditReviewOpen={handleEditReviewOpen}
        />
      )}
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        open={searchOpen}
        close={handleSearchClose}
        onClick={handleClickFromSearchResult}
      />

      {/* Move review component and share option to beer detail page */}
      <Review
        currentBeer={currentBeer}
        open={reviewOpen}
        close={handleReviewClose}
      />
      {/* Move review component and share option to beer detail page */}
      <ShareOption open={shareOpen} close={handleShareOptionClose} />

     
      {editMyReviewsOpen && <EditReview
        open={editMyReviewsOpen}
        close={handleEditReviewClose}
        review={singleReview}
        handleEditReviewUpdate={handleEditReviewUpdate}
      />}


      <Button onClick={() => handleClickSB()}>Open simple snackbar</Button>
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
          handleEditReviewOpen={handleEditReviewOpen}
          handleDeleteMyReview={handleDeleteMyReview}
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
