import React, { Fragment, useState } from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import LoginModal from "../modals/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import RegisterModal from "../modals/RegisterModal";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const [show, setShow] = useState("");
  const handleClose = () => setShow(false);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Fragment>
      <Navbar variant="dark" className="mb-4 navbar-main">
        <Container>
          <Navbar.Brand href="/" className="my-0 py-0">
            <h2>Jabber</h2>
          </Navbar.Brand>
          {userInfo ? (
            <Nav className="ml-auto">
              <Navbar.Brand className="mr-5">Welcome Back!</Navbar.Brand>
              <NavDropdown title={userInfo.first_name} id="username">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav className="ml-auto">
              <Nav.Link className="mr-1" onClick={() => setShow("modal-one")}>
                Login
              </Nav.Link>
              <Nav.Link onClick={() => setShow("modal-two")}>Sign up</Nav.Link>
            </Nav>
          )}
        </Container>
      </Navbar>
      <LoginModal show={show} handleClose={handleClose} />
      <RegisterModal show={show} handleClose={handleClose} />
    </Fragment>
  );
};

export default Header;
