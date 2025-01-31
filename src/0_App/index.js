import Page from "../1_Page";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./style/globalStyle.js";
import ResetStyle from "./style/resetStyle.js";
import theme from "./style/theme.js";
import Footer from "./ui/Footer/index.js";
import STYLE from "./style/style.js";
import { LoadScript } from "@react-google-maps/api";

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const App = () => {
  return (
    <ThemeProvider theme={theme.defaultTheme}>
      <ResetStyle />
      <GlobalStyles />
      <BrowserRouter>
        <STYLE.Main>
          <LoadScript googleMapsApiKey={API_KEY}>
            <Footer />
            <Page />
          </LoadScript>
        </STYLE.Main>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
