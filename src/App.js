import React, { useState, Fragment } from "react";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import axios from "axios";

import Register from "./components/Register/Register";
import Banner from "./components/Banner/Banner";
import Category from "./components/Category/Category";
import BeerCategoryList from "./components/Category/BeerCategoryList";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Search from "./components/Search/Search";
import Review from "./components/ReviewForm/Review";
import ShareOption from "./components/ShareOption/ShareOption";
import Snackbar from "./components/Small-Components/Snackbar";
import MyAccount from "./components/Account/MyAccount";
import Scanner from "./components/Scanner/Scanner";
import EditReview from "./components/MyReviews/EditReview";
import useApplicationData from "./hooks/useApplicationData";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import ScannerIntro from "./components/Scanner/ScannerIntro";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#71a0be",
      main: "#4e89ae",
      dark: "#365f79",
      contrastText: "#fff",
    },
    secondary: {
      light: "#efb033",
      main: "#EC9D00",
      dark: "#a56d00",
      contrastText: "#fff",
    },
  },
  defaultBackground: {
    main: "#f0f0f0",
  },
});

const useStyles = makeStyles(() => ({
  body: {
    backgroundColor: theme.defaultBackground.main,
  },
}));

function App() {
  const classes = useStyles();

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
  const [scannerIntroOpen, setScannerIntroOpen] = useState(false);
  const [editMyReviewsOpen, setEditMyReviewsOpen] = useState(false);
  const [singleReview, setSingleReview] = useState({});

  const {
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
  } = useApplicationData();

  const {
    top10RatedBeers,
    top10ReviewedBeers,
    recommendedBeers,
    recentlyViewed,
    beerCategories,
    currentWishlist,
    currentBeer,
    currentBeerReviews,
    currentUser,
    errMessage,
  } = state;

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
    setSearchQuery("");
    setSearchOpen(false);
  };

  const handleShareOptionOpen = (e) => {
    setShareOpen(true);
  };

  const handleShareOptionClose = (e) => {
    setShareOpen(false);
  };

  const handleEditReviewOpen = async (id) => {
    const selectedEditReviewId = currentBeerReviews.filter((beer) => {
      return id === beer.id;
    });
    await setSingleReview(selectedEditReviewId[0]);
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

  // Delete a review from your list of My Reviews
  const handleDeleteMyReview = (review_id) => {
    if (!currentUser) {
      setLoginOpen(true);
      return;
    }
    deleteReviewById(review_id);
    handleClickSB(`Your review was removed from your Review list`);
  };

  const handleChangeAccountDetails = (accountDetails) => {
    changeAccountDetails(accountDetails);
    handleClickSB(`Your account details were updated`);
  };
  // -------------------- To Here --------------------

  const handleLoginClose = (e) => {
    setLoginOpen(false);
    changeUserData(e, true);
  };

  const handleRegisterOpen = (e) => {
    setRegisterOpen(true);
  };

  const handleRegisterClose = (e) => {
    setRegisterOpen(false);
    changeUserData(e, true);
  };

  const handleLogout = (e) => {
    // e.preventDefault();

    return axios.post("/api/logout").then((data) => {
      logUserOut();
      handleClickSB(`You are now logged out`);
    });
  };

  const handleClickFromSearchResult = (id) => {
    handleBeerDetailClick(id);
  };

  const handleBeerDetailClick = async (id) => {
    setBeerDetailOpen(true);
    const body = {
      beer_id: id,
      query: searchQuery,
      user_id: currentUser && currentUser.id,
    };
    if (searchQuery) body.query = searchQuery;

    await axios.post("/api/search/analytics", body, {
      headers: {
        Authorization: `Bearer ${currentUser && currentUser.token}`,
      },
    });

    setRecentlyViewed();
    setClickedBeerToCurrent(id);
  };

  const handleBeerDetailClose = (e) => {
    setBeerDetailOpen(false);
    setTimeout(() => {
      setClickedBeerToCurrent();
    }, 200);
  };

  const handleAccountOpen = async (e) => {
    await getReviewsAndWishlistForSingleUser();

    setAccuontOpen(true);
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
      handleClickSB([
        <a href="javascript:void(0)" onClick={() => setLoginOpen(true)}>
          Login
        </a>,
        " or ",
        <a href="javascript:void(0)" onClick={() => setRegisterOpen(true)}>
          Register
        </a>,
        "to use that feature",
      ]);
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
    setScannerIntroOpen(true);
  };

  const handleScannerIntroClose = () => {
    setScannerIntroOpen(false);
  };

  const handleStartScanner = () => {
    setScannerIntroOpen(false);
    setScannerOpen(true);
  };

  const handleScannerClose = (e) => {
    setScannerOpen(false);
  };

  const handleCategoryClick = (category) => {
    setSearchOpen(true);
    setSearchQuery(category);
  };

  return (
    <div className={classes.body}>
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
        handleClose={handleLoginClose}
        errMessage={errMessage}
        setErrorMessage={setErrorMessage}
        changeUserData={changeUserData}
        submitLoginData={submitLoginData}
      />
      <Register
        open={registerOpen}
        handleClose={handleRegisterClose}
        errMessage={errMessage}
        changeUserData={changeUserData}
        setLoggedInUser={setLoggedInUser}
        setErrorMessage={setErrorMessage}
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
          setRegisterOpen={setRegisterOpen}
          searchByBrewery={handleCategoryClick}
        />
      )}
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        open={searchOpen}
        close={handleSearchClose}
        onClick={handleClickFromSearchResult}
      />

      <Review
        currentBeer={currentBeer}
        open={reviewOpen}
        close={handleReviewClose}
        handleDeleteMyReview={handleDeleteMyReview}
        addReviewById={addReviewById}
      />
      <ShareOption open={shareOpen} close={handleShareOptionClose} />

      {editMyReviewsOpen && (
        <EditReview
          open={editMyReviewsOpen}
          close={handleEditReviewClose}
          review={singleReview}
          handleEditReviewUpdate={handleEditReviewUpdate}
        />
      )}
      <Snackbar handleClose={handleCloseSB} open={openSB} textSB={textSB} />
      {currentUser && (
        <MyAccount
          firstName={currentUser.first_name}
          lastName={currentUser.last_name}
          email={currentUser.email}
          open={accuontOpen}
          handleClose={() => setAccuontOpen(false)}
          beers={currentWishlist}
          reviews={currentBeerReviews}
          handleEditReviewOpen={handleEditReviewOpen}
          handleDeleteMyReview={handleDeleteMyReview}
          changeAccountDetails={handleChangeAccountDetails}
          handleBeerDetailClick={handleBeerDetailClick}
        />
      )}
      <Scanner
        open={scannerOpen}
        handleClose={handleScannerClose}
        openBeer={handleBeerDetailClick}
      />
      <ScannerIntro
        startScanner={handleStartScanner}
        open={scannerIntroOpen}
        close={handleScannerIntroClose}
      />
    </div>
  );
}

export default App;
