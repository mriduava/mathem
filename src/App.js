import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import homePage from './Pages/homePage'
import header from './Components/Header'
import footer from './Components/Footer'

import ProductsContextProvider from './contexts/ProductsContextProvider'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      {header("Mat Priser")}
      <main className="container">
      <ProductsContextProvider>
        <Switch>
          <Route exact path="/" component={homePage}/>
        </Switch>
      </ProductsContextProvider>
      </main>
      <div className="fixed-bottom">
      {footer()}
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
