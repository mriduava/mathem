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
      <Navbar style={{backgroundColor: '#000066'}} dark>
        <NavbarBrand href="/" className="mr-auto ml-4">
            <h1>
              Mat <span style={{backgroundColor: '#CC6600', borderRadius: '10px 10px'}}>Priser</span>
            </h1>
        </NavbarBrand>
        <SearchField />
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