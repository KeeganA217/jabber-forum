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
import { login, logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [show, setShow] = useState("");
  const handleClose = () => setShow(false);

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  const loginAdmin = () => {
    setEmail("Admin@User.com");
    setPassword(11111);
    dispatch(login(email, password));
    setEmail("");
    setPassword("");
  };

  return (
    <Fragment>
      <Navbar variant="dark" className="mb-0 navbar-main">
        <Container>
          <Navbar.Brand href="/" className="my-0 py-0">
            <h1 className="main-title">Jabber</h1>
          </Navbar.Brand>
          <Nav>
            <LinkContainer to="/topics" className="mt-3">
              <Nav.Link>Topics</Nav.Link>
            </LinkContainer>
            {userInfo && userInfo.isAdmin === 1 && (
              <NavDropdown className="ml-2 mt-3" title="Admin" id="adminmenu">
                <LinkContainer to="/admin/userlist">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/commentlist">
                  <NavDropdown.Item>Comments</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
            {userInfo && userInfo.first_name ? (
              <Fragment>
                <NavDropdown title={userInfo.first_name} className="mr-4 mt-3">
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
                <Nav.Link href="/profile">
                  <OverlayTrigger
                    key={"bottom"}
                    placement={"bottom"}
                    overlay={<Tooltip id={`bottom`}>Update Image</Tooltip>}
                  >
                    <Image
                      style={{ width: "60px", height: "60px" }}
                      to="/profile"
                      fluid
                      roundedCircle
                      className="personal-img"
                      src={
                        !userInfo.image ? "images/default.png" : userInfo.image
                      }
                    />
                  </OverlayTrigger>
                </Nav.Link>
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
                <Nav.Item>
                  <Nav.Link
                    onClick={loginAdmin}
                    style={{ border: "1px solid white", color: "white" }}
                    className="mr-1 mt-3 ml-3"
                  >
                    Demo as Admin
                  </Nav.Link>
                </Nav.Item>
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
