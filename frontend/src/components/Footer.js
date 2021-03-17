import React, { Fragment, useState } from "react";
import {
  Nav,
  Navbar,
  Container,
  NavDropdown,
  Image,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import LoginModal from "../modals/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import RegisterModal from "../modals/RegisterModal";
import { logout } from "../actions/userActions";

const Footer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [show, setShow] = useState("");
  const handleClose = () => setShow(false);

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <Fragment>
      <Navbar variant="dark" className="footer-main" sticky="bottom">
        <Container>
          <Nav>
            <LinkContainer to="/topics" className="mt-3">
              <Nav.Link>Topics</Nav.Link>
            </LinkContainer>
            {userInfo && userInfo.first_name ? (
              <Fragment>
                <Nav.Item>
                  <Nav.Link className="mr-1 mt-3" href="/">
                    Home
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="mr-1 mt-3" href="/profile">
                    Profile
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="mr-2 mt-3" onClick={logoutHandler}>
                    Logout
                  </Nav.Link>
                </Nav.Item>
              </Fragment>
            ) : (
              <Fragment>
                <Nav.Item>
                  <Nav.Link
                    onClick={() => setShow("modal-one")}
                    className="mr-1 mt-3"
                  >
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    onClick={() => setShow("modal-two")}
                    className="mt-3"
                  >
                    Sign up
                  </Nav.Link>
                </Nav.Item>
              </Fragment>
            )}
            <Nav.Item className="ml-5 mt-4">
              <p>Developed by Keegan Adams &copy; 2020 All rights reserved.</p>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
      <LoginModal show={show} handleClose={handleClose} />
      <RegisterModal show={show} handleClose={handleClose} />
    </Fragment>
  );
};

export default Footer;
