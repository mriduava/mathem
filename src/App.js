import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import homePage from './Pages/homePage'
import header from './Components/Header'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      {header("Mat priser")}
      <main className="container">
        <Switch>
          <Route exact path="/" component={homePage}/>
        </Switch>
      </main>
    </div>
    </BrowserRouter>
  );
}

export default App;
