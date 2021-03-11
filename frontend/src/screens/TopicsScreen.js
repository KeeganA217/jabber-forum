import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import AddTopicModal from "../modals/AddTopicModal";
import { listAllTopics, deleteTopic } from "../actions/topicActions";
import { ListGroup, Container, Col, Row, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import ReactPaginate from "react-paginate";

const TopicsScreen = () => {
  const dispatch = useDispatch();

  const [searchTerm, SetSearchTerm] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const topicsPerPage = 10;
  const pagesVisited = pageNumber * topicsPerPage;

  const getAllTopics = useSelector((state) => state.getAllTopics);
  const { loading, error, topics } = getAllTopics;

  const makeNewTopic = useSelector((state) => state.makeNewTopic);
  const { success: successCreate } = makeNewTopic;

  const topicDelete = useSelector((state) => state.topicDelete);
  const { success } = topicDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listAllTopics());
  }, [show, success, successCreate]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (!userInfo) {
      setMessage("You must be logged in to create a new topic.");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } else {
      setShow(true);
    }
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this topic?")) {
      dispatch(deleteTopic(id));
    }
  };

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Fragment>
      <Container>
        <Row className="mt-4 mb-3">
          <Col md={8}>
            <h1>Current Open Topics</h1>
            <Form>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search Topics..."
                  onChange={(e) => {
                    SetSearchTerm(e.target.value);
                  }}
                />
              </Form.Group>
            </Form>
            <ListGroup>
              {loading && <Loader />}
              {error && <Message variant="danger">{error}</Message>}

              {topics &&
                topics
                  .slice(pagesVisited, pagesVisited + topicsPerPage)
                  .filter((topic) => {
                    if (searchTerm == "") {
                      return topic;
                    } else if (
                      topic.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return topic;
                    }
                  })
                  .map((topic) => (
                    <ListGroup.Item key={topic.topic_id}>
                      <Row>
                        <Col md={9}>
                          <Link to={`/topics/${topic.topic_id}`}>
                            <h5>{topic.title}</h5>
                          </Link>
                          <small>
                            {" "}
                            Started on{" "}
                            {moment(topic.created_on).format(
                              "dddd, MMMM Do YYYY"
                            )}
                          </small>
                        </Col>
                        <Col className="ml-5">
                          {userInfo && userInfo.isAdmin === 1 && (
                            <Button
                              onClick={() => {
                                deleteHandler(topic.topic_id);
                              }}
                              className="ml-4 btn-danger"
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
          <Col className="mt-5">
            <Button className="my-3 btn-info" block onClick={handleShow}>
              Add new Topic
            </Button>
            {message && (
              <Message timeout variant="warning">
                {message}
              </Message>
            )}
          </Col>
        </Row>
        <Row>
          <Col md={8} className="paginate-col">
            <ReactPaginate
              previousLabel={"Prev"}
              nextLabel={"Next"}
              pageCount={topics && Math.ceil(topics.length / topicsPerPage)}
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
        </Row>
      </Container>
      <AddTopicModal show={show} handleClose={handleClose} />
    </Fragment>
  );
};

export default TopicsScreen;
