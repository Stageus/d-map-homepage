import Page from "../1_Page";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./style/globalStyle.js";
import theme from "./style/theme.js";
import Footer from "./ui/Footer/index.js";

const App = () => {
  return (
    <ThemeProvider theme={theme.defaultTheme}>
      <GlobalStyles />
      <BrowserRouter>
          <Page />
          <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
