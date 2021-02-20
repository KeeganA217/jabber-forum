import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import AddTopicMidal from "../modals/AddTopicModal";
import { listAllTopics } from "../actions/topicActions";
import { ListGroup, Container, Col, Row, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";

const TopicsScreen = () => {
  const dispatch = useDispatch();

  const [searchTerm, SetSearchTerm] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const getAllTopics = useSelector((state) => state.getAllTopics);
  const { loading, error, topics } = getAllTopics;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listAllTopics());
  }, [show]);

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

  return (
    <Fragment>
      <Container>
        <Row className="mb-5">
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
                    <ListGroup.Item key={topic.id}>
                      <Link>
                        <h5>{topic.title}</h5>
                      </Link>
                      <small>
                        {" "}
                        Started on{" "}
                        {moment(topic.created_on).format("dddd, MMMM Do YYYY")}
                      </small>
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
      </Container>
      <AddTopicMidal show={show} handleClose={handleClose} />
    </Fragment>
  );
};

export default TopicsScreen;
