import { red } from "@material-ui/core/colors";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import BackgroundImg from "./assets/img/bg.png";

const mainColor = "#2d797d";
export const theme = {
  palette: {
    primary: {
      main: mainColor,
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#182a2b",
      // paper: '#374e50f5',
      menu: {
        color: "#374e50f5",
        hover: "#338b8e",
      },
    },
  },
  typography: {
    fontFamily: ["times new roman"].join(","),
    h1: { fontSize: "2.0rem"},
    h2: { fontSize: "1.8rem"},
    h3: { fontSize: "1.6rem"},
    h4: { fontSize: "1.5rem" },
    subtitle1: { fontSize: "1.75rem" },
    subtitle2: { fontSize: "1.2rem" },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          background: `url(${BackgroundImg}) no-repeat center top`,
        },
        a: {
          color: mainColor,
        },
      },
    },
  },
};

export default responsiveFontSizes(createMuiTheme(theme));
