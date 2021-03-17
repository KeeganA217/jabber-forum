import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import AddTopicMidal from "../modals/AddTopicModal";
import { useHistory } from "react-router-dom";
import { listTopicDetails, deleteTopic } from "../actions/topicActions";
import { listAllTopicComments, removeComment } from "../actions/commentActions";
import CreateCommentModal from "../modals/CreateCommentModal";
import { ListGroup, Container, Col, Row, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import ReactPaginate from "react-paginate";

const SingleTopicScreen = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const commentsPerPage = 20;
  const pagesVisited = pageNumber * commentsPerPage;

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
    dispatch(listAllTopicComments(match.params.id));
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
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Fragment>
      <Container>
        <Link className="btn btn-sm btn-secondary my-3" to="/topics">
          Back to all Topics
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
                  {comments && comments.length === 0 && (
                    <h4 className="mt-5 ml-5">
                      No comments have been posted yet. Be the first?
                    </h4>
                  )}
                  {comments &&
                    comments
                      .slice(pagesVisited, pagesVisited + commentsPerPage)
                      .map((comment) => (
                        <ListGroup.Item
                          className="p-2"
                          key={comment.comment_id}
                        >
                          <Row className="ml-3 mb-2 pr-4">
                            <h5>{comment.comment}</h5>
                          </Row>
                          <Row>
                            <Col className="pt-2 ml-4">
                              <small>
                                Posted by{" "}
                                <strong>
                                  {comment.first_name} {comment.last_name}
                                </strong>{" "}
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
                                  className="delete-button btn-danger"
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
                <Button className=" btn my-3" block onClick={handleShow}>
                  Add Comment
                </Button>

                <Button
                  block
                  disabled={(userInfo && userInfo.isAdmin !== 1) || !userInfo}
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
        <Row className="my-3">
          {comments && comments.length !== 0 && (
            <Col md={8} className="paginate-col">
              <ReactPaginate
                previousLabel={"Prev"}
                nextLabel={"Next"}
                pageCount={
                  comments && Math.ceil(comments.length / commentsPerPage)
                }
                onPageChange={changePage}
                pageRangeDisplayed={5}
                containerClassName={"pagination-btns"}
                activeClassName={"active-btn"}
                previousClassName={"previous-btn"}
                nextClassName={"next-btn"}
                pageClassName={"page-btns"}
                disabledClassName={"disabled-btn"}
              />
            </Col>
          )}
        </Row>
      </Container>
      <CreateCommentModal show={show} handleClose={handleClose} />
    </Fragment>
  );
};

export default SingleTopicScreen;
