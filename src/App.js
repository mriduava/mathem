import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import homePage from './Pages/homePage'
import header from './Components/Header'
import footer from './Components/Footer'

import ProductContextProvider from './contexts/ProductContextProvider'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      {header("Mat Priser")}
      <div className="content">
        <ProductContextProvider>
          <Switch>
            <Route exact path="/" component={homePage}/>
          </Switch>
        </ProductContextProvider>
      </div>
      {footer()}
    </div>
    </BrowserRouter>
  );
}

export default App;
