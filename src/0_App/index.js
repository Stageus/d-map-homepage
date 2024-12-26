import Page from "../1_Page";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./style/globalStyle.js";
import ResetStyle from "./style/resetStyle.js"
import theme from "./style/theme.js";
import Footer from "./ui/Footer/index.js";
import STYLE from "./style/style.js";

const App = () => {
  return (
    <ThemeProvider theme={theme.defaultTheme}>
      <ResetStyle/>
      <GlobalStyles />
      <BrowserRouter>
        <STYLE.Main>
          <Page />
          <Footer />
        </STYLE.Main>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
