import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import homePage from './Pages/homePage'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      {/*Header here*/}
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
