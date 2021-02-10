import React, { Fragment } from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-dom";

const Header = () => {
  return (
    <Fragment>
      <Navbar variant="dark" className="mb-4 navbar-main">
        <Container>
          <Navbar.Brand href="#home">
            <h3>Jabber</h3>
          </Navbar.Brand>
          <Nav className="ml-auto">
            <NavDropdown title="Select" id="nav-dropdown">
              <NavDropdown.Item>Login</NavDropdown.Item>
              <NavDropdown.Item>Sign Up</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default Header;
