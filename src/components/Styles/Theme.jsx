import { createMuiTheme } from "@material-ui/core/styles";

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
    defaultBackground: {
      main: "#f0f0f0",
    },
  },
  typography: {
    fontFamily: "Oswald",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      tablet: 640,
      md: 960,
      laptop: 1025,
      lg: 1280,
      xl: 1920,
    },
  },
});
export default theme;
