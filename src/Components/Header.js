import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

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
        <div style={{position: 'absolute', top: 10, right: 50}}>
          <SearchField/>
        </div>
      
        {/* Uncomment if hamburger wanted
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                GitHub
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse> */}
      </Navbar>
    </div>
  );
};
export default MainHeader;