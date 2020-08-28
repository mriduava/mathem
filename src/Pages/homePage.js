import React from "react";

import SearchField from './homePageComponents/searchField'
import poster from '../Assets/poster.jpg'


const HomePage = () => {

    return (
      <div className="container-fluid">
        <SearchField />
        <img src={poster} className="img-fluid poster" alt="food poster"/>
      </div>
    );
}

export default HomePage;