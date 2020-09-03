import React, { useState } from "react";
import { fade, makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { createMuiTheme } from "@material-ui/core/styles";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Box from "@material-ui/core/Box";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CameraAltIcon from "@material-ui/icons/CameraAlt";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#7e5dc0",
      main: "#5e35b1",
      dark: "#41257b",
      contrastText: "#fff",
    },
    secondary: {
      light: "#637bfe",
      main: "#3d5afe",
      dark: "#2a3eb1",
      contrastText: "#fff",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    paddingLeft: "0.4rem",
    paddingRight: "0.4rem",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    alignContent: "center",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  menuItemText: {
    margin: 0,
  },
}));

export default function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (action) => {
    switch (action) {
      case "login":
        props.handleLoginOpen(true);
        break;
      case "register":
        props.handleRegisterOpen();
        break;
      case "account":
        props.handleAccountOpen();
        break;
      case "scanner":
        props.handleScannerOpen();
        break;
      case "logout":
        props.handleLogout();
        break;
      case "search":
        props.handleSearchOpen();
        break;
    }

    setMobileMoreAnchorEl(null);
    setAnchorEl(null);
  };
  // const handleMenuItemClick = () => {
  //   props.hand
  // }

  let visitorShow = "block";
  let userShow = "none";

  if (props.currentUser) {
    visitorShow = "none";
    userShow = "block";
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => handleMenuItemClick("scanner")}>
        <IconButton
          aria-label="scanner"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <CameraAltIcon />
        </IconButton>
        <p className={classes.menuItemText}>Scanner</p>
      </MenuItem>
      <Box display={visitorShow}>
        <MenuItem onClick={() => handleMenuItemClick("register")}>
          <IconButton
            aria-label="register new user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <PersonAddIcon />
          </IconButton>
          <p className={classes.menuItemText}>Register</p>
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("login")}>
          <IconButton
            aria-label="login user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <LockOpenIcon />
          </IconButton>
          <p className={classes.menuItemText}>Login</p>
        </MenuItem>
      </Box>
      <Box display={userShow}>
        <MenuItem onClick={() => handleMenuItemClick("account")}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p className={classes.menuItemText}>My Account</p>
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("logout")}>
          <IconButton
            aria-label="logout user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <ExitToAppIcon />
          </IconButton>
          <p className={classes.menuItemText}>Logout</p>
        </MenuItem>
      </Box>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <MuiThemeProvider theme={theme}>
        <AppBar position="fixed">
          <Toolbar>
            <Box
              width={1}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography className={classes.title} variant="h6">
                Tap Dat
              </Typography>
              <Box display={"flex"}>
                <IconButton onClick={() => handleMenuItemClick("search")}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                </IconButton>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                  <IconButton
                    aria-label="scanner"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={() => handleMenuItemClick("scanner")}
                  >
                    <CameraAltIcon />
                  </IconButton>

                  <Box display={visitorShow}>
                    <IconButton
                      edge="end"
                      aria-label="register new user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={() => handleMenuItemClick("register")}
                      color="inherit"
                    >
                      <PersonAddIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="login user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={() => handleMenuItemClick("login")}
                      color="inherit"
                    >
                      <LockOpenIcon />
                    </IconButton>
                  </Box>
                  <Box display={userShow}>
                    <IconButton
                      edge="end"
                      aria-label="account of current  user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={() => handleMenuItemClick("account")}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="logout user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={() => handleMenuItemClick("logout")}
                      color="inherit"
                    >
                      <ExitToAppIcon />
                    </IconButton>
                  </Box>
                </div>
                <div className={classes.sectionMobile}>
                  <IconButton
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                </div>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </MuiThemeProvider>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
