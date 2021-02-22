import React, { Fragment, useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNewComment } from "../actions/commentActions";
import { useHistory } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { NEW_COMMENT_RESET } from "../constants/commentConstants";

const CreateCommentModal = ({ show, handleClose }) => {
  const history = useHistory();
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const createComment = useSelector((state) => state.createComment);
  const { loading, error: errorNewComment, success } = createComment;

  const topicDetails = useSelector((state) => state.topicDetails);
  const { topic } = topicDetails;

  useEffect(() => {
    if (success) {
      setComment("");
      dispatch({ type: NEW_COMMENT_RESET });
    }
  }, [dispatch, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment === "") {
      setMessage("Please add a comment.");
    } else {
      dispatch(
        createNewComment({
          comment,
          topic_id: topic.topic_id,
          id: userInfo.id,
        })
      );
      handleClose();
    }
  };
  return (
    <Fragment>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Make a new Post!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorNewComment && (
            <Message variant="danger">{errorNewComment}</Message>
          )}
          {message && <Message variant="warning">{message}</Message>}
          {loading && <Loader />}
          <Form>
            <Form.Group controlId="Comment">
              <Form.Control
                type="text"
                as="textarea"
                placeholder="Enter Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
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

export default CreateCommentModal;
