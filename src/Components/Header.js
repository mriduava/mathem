import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
} from "reactstrap";
import Cart from './Cart'

import SearchField from '../Pages/homePageComponents/searchField'

const MainHeader = (name) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar style={{backgroundColor: '#294360'}} dark>
        <NavbarBrand href="/" className="mr-auto ml-4">
            <h1 className="mt-2">
              Mat <span style={{color: '#294360', backgroundColor: '#FFC654', borderRadius: '6px 6px', padding: '0 5px'}}>Priser</span>
            </h1>
        </NavbarBrand>
        <Cart/>
      </Navbar>
    </div>
  );
};
export default MainHeader;