import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import AddTopicMidal from "../modals/AddTopicModal";
import { useHistory } from "react-router-dom";
import { listTopicDetails, deleteTopic } from "../actions/topicActions";
import { listAllComments, removeComment } from "../actions/commentActions";
import CreateCommentModal from "../modals/CreateCommentModal";
import { ListGroup, Container, Col, Row, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";

const SingleTopicScreen = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const topicDetails = useSelector((state) => state.topicDetails);
  const { loading, error, topic } = topicDetails;

  const listComments = useSelector((state) => state.listComments);
  const {
    loading: loadingComments,
    error: errorComments,
    comments,
  } = listComments;

  const createComment = useSelector((state) => state.createComment);
  const { success } = createComment;

  const deleteComment = useSelector((state) => state.deleteComment);
  const { success: successCommentDelete } = deleteComment;

  const topicDelete = useSelector((state) => state.topicDelete);
  const { success: successTopicDelete } = topicDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listTopicDetails(match.params.id));
    dispatch(listAllComments(match.params.id));
  }, [match, success, successTopicDelete, successCommentDelete]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (!userInfo) {
      setMessage("You must be logged in to post a comment.");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } else {
      setShow(true);
    }
  };

  const deleteTopicHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this topic?")) {
      dispatch(deleteTopic(id));
    }
    history.push("/topics");
  };

  const deleteCommentHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      dispatch(removeComment(id));
    }
  };

  return (
    <Fragment>
      <Container>
        <Link className="btn btn-sm btn-secondary my-3" to="/topics">
          Go Back
        </Link>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Fragment>
            <Row>
              <Col>
                <ListGroup>
                  <ListGroup.Item className="mb-3">
                    <h2>{topic.title}</h2>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <ListGroup>
                  {loadingComments && <Loader />}
                  {errorComments && (
                    <Message variant="danger">{errorComments}</Message>
                  )}
                  {comments &&
                    comments.map((comment) => (
                      <ListGroup.Item className="p-2" key={comment.comment_id}>
                        <Row className="ml-3 mb-2">
                          <h5>{comment.comment}</h5>
                        </Row>
                        <Row>
                          <Col className="pt-2 ml-4">
                            <small>
                              Posted by {comment.first_name} {comment.last_name}{" "}
                              on{" "}
                              {moment(comment.date_added).format(
                                "dddd, MMMM Do YYYY, h:mm:ss a"
                              )}
                            </small>
                          </Col>
                          <Col md={2}>
                            {" "}
                            {userInfo && userInfo.isAdmin === 1 && (
                              <Button
                                onClick={() => {
                                  deleteCommentHandler(comment.comment_id);
                                }}
                                className="ml-5 btn-danger"
                              >
                                <i className="fas fa-trash"></i>
                              </Button>
                            )}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                </ListGroup>
              </Col>
              <Col>
                <ListGroup>
                  <ListGroup.Item>
                    <p>
                      This discussion was opened on{" "}
                      <strong>
                        {moment(topic.created_on).format("dddd, MMMM Do YYYY")}
                      </strong>{" "}
                      by{" "}
                      <strong>
                        {topic.first_name} {topic.last_name}
                      </strong>
                      .
                    </p>
                  </ListGroup.Item>
                </ListGroup>
                <Button className=" btn-info my-3" block onClick={handleShow}>
                  Add Comment
                </Button>

                <Button
                  block
                  disabled={userInfo && userInfo.isAdmin !== 1}
                  onClick={() => {
                    deleteTopicHandler(topic.topic_id);
                  }}
                  className="my-3 btn-danger"
                >
                  Delete Topic
                </Button>
                {message && <Message variant="warning">{message}</Message>}
              </Col>
            </Row>
          </Fragment>
        )}
      </Container>
      <CreateCommentModal show={show} handleClose={handleClose} />
    </Fragment>
  );
};

export default SingleTopicScreen;
