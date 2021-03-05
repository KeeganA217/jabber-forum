import React, { Fragment, useState, useEffect } from "react";
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
import { Link, useHistory } from "react-router-dom";
import LoginModal from "../modals/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import RegisterModal from "../modals/RegisterModal";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [show, setShow] = useState("");
  const handleClose = () => setShow(false);

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
  }, [userInfo]);

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <Fragment>
      <Navbar variant="dark" className="mb-2 navbar-main">
        <Container>
          <Navbar.Brand href="/" className="my-0 py-0">
            <h2 className="main-title">Jabber</h2>
          </Navbar.Brand>
          <Nav>
            <LinkContainer to="/topics">
              <Nav.Link>Topics</Nav.Link>
            </LinkContainer>
            {/* {userInfo && userInfo.isAdmin === 1 && (
              <NavDropdown className="ml-2" title="Admin" id="adminmenu">
                <LinkContainer to="/admin/userlist">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/commentlist">
                  <NavDropdown.Item>Comments</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )} */}
            {userInfo ? (
              <Fragment>
                <NavDropdown title={userInfo.first_name} className="mr-4">
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
                {/* <LinkContainer to="/profile">
                  <OverlayTrigger
                    key={"bottom"}
                    placement={"bottom"}
                    overlay={<Tooltip id={`bottom`}>Update Image</Tooltip>}
                  >
                    <Image
                      style={{ width: "60px", height: "60px" }}
                      to="/profile"
                      fluid
                      thumbnail
                      roundedCircle
                      src={
                        !userInfo.image ? "images/default.png" : userInfo.image
                      }
                    />
                  </OverlayTrigger>
                </LinkContainer> */}
              </Fragment>
            ) : (
              <Fragment>
                <LinkContainer>
                  <Nav.Link
                    onClick={() => setShow("modal-one")}
                    className="mr-1"
                  >
                    Login
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer>
                  <Nav.Link onClick={() => setShow("modal-two")}>
                    Sign up
                  </Nav.Link>
                </LinkContainer>
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
