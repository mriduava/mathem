import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import homePage from "./Pages/homePage";
import header from "./Components/Header";
import footer from "./Components/Footer";

import ProductContextProvider from "./contexts/ProductContextProvider";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <ProductContextProvider>
        {header("Mat Priser")}
        <div className="content">
            <Switch>
              <Route exact path="/" component={homePage} />
            </Switch>
        </div>
        {footer()}
          </ProductContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
