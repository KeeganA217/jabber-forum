import React, { Fragment, useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import { useHistory } from "react-router-dom";
import Message from "../components/Message";
import { createNewTopic } from "../actions/topicActions";
import Loader from "../components/Loader";

const AddTopicModal = ({ show, handleClose }) => {
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  const makeNewTopic = useSelector((state) => state.makeNewTopic);
  const { loading, error } = makeNewTopic;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    if (title === "") {
      setMessage("Please enter a title.");
      setTimeout(() => {
        setMessage("");
      }, 1500);
    } else if (!error) {
      dispatch(
        createNewTopic({
          title,
          id: userInfo.id,
        })
      );
      setTitle("");
      handleClose();
    }
  };
  return (
    <Fragment>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Topic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Message variant="danger">{error}</Message>}
          {message && <Message variant="warning">{message}</Message>}
          {loading && <Loader />}
          <Form>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter A Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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

export default AddTopicModal;
