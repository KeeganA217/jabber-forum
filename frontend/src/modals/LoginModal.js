import React, { Fragment, useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import { useHistory } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";

const LoginModal = ({ show, handleClose }) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      setEmail("");
      setPassword("");
      handleClose();
    }
  }, [userInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      dispatch(login(email, password));
    } else {
      setMessage("Please fill in all fields");
    }
  };
  return (
    <Fragment>
      <Modal size="lg" show={show === "modal-one"} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Message variant="danger">{error}</Message>}
          {message && <Message variant="warning">{message}</Message>}
          {loading && <Loader />}
          <Form>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitHandler}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default LoginModal;
