import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import homePage from './Pages/homePage'
import header from './Components/Header'
import footer from './Components/Footer'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      {header("Mat hem")}
      <main className="container">
        <Switch>
          <Route exact path="/" component={homePage}/>
        </Switch>
      </main>
      {footer()}
    </div>
    </BrowserRouter>
  );
}

export default App;
