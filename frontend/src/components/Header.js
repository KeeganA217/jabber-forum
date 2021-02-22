import React, { Fragment, useState } from "react";
import { Nav, Navbar, Container, NavDropdown, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import LoginModal from "../modals/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import RegisterModal from "../modals/RegisterModal";
import { logout } from "../actions/userActions";
import { userDetailsReducer } from "../reducers/userReducer";

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
      <Navbar variant="dark" className="mb-2 navbar-main">
        <Container>
          <Navbar.Brand href="/" className="my-0 py-0">
            <h2 className="main-title">Jabber</h2>
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="/topics">Topics</Nav.Link>
            {userInfo && userInfo.isAdmin === 1 && (
              <NavDropdown className="ml-2" title="Admin" id="adminmenu">
                <LinkContainer to="/admin/userlist">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
            {userInfo ? (
              <Fragment>
                <NavDropdown
                  title={userInfo.first_name}
                  id="username"
                  className="mr-4"
                >
                  <LinkContainer to="/">
                    <NavDropdown.Item>Home</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                <Link to="/profile" style={{ width: "50px", height: "50px" }}>
                  <Image
                    to="/profile"
                    fluid
                    thumbnail
                    roundedCircle
                    src={
                      !userInfo.image ? "images/default.png" : userInfo.image
                    }
                  />
                </Link>
              </Fragment>
            ) : (
              <Fragment>
                <Nav.Link className="mr-1" onClick={() => setShow("modal-one")}>
                  Login
                </Nav.Link>
                <Nav.Link onClick={() => setShow("modal-two")}>
                  Sign up
                </Nav.Link>
              </Fragment>
            )}
          </Nav>
        </Container>
      </Navbar>
      <LoginModal show={show} handleClose={handleClose} />
      <RegisterModal show={show} handleClose={handleClose} />
    </Fragment>
  );
};

export default Header;
