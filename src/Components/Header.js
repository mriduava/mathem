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

const MainHeader = (name) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar color="primary" dark>
        <NavbarBrand href="/" className="mr-auto ml-4">
            <h1>
          {name}
            </h1>
        </NavbarBrand>
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