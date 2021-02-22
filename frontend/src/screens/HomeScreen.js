import React, { Fragment, useEffect } from "react";
import { Card, Col, Container, Row, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listNewTopics } from "../actions/topicActions";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const listRecentTopics = useSelector((state) => state.listRecentTopics);
  const { loading, error, topics } = listRecentTopics;

  useEffect(() => {
    dispatch(listNewTopics());
  }, []);

  return (
    <Fragment>
      <Row>
        <Col lg={3} className="pr-0">
          <Card className="mx-1 p-3 topics-card">
            <Card.Title as="div">
              <strong>
                <h3>Recent Topics</h3>
              </strong>
            </Card.Title>
            <Card.Body>
              {loading && <Loader />}
              {error && <Message variant="danger">{error}</Message>}
              {topics &&
                topics.map((topic) => (
                  <Card.Text key={topic.topic_id} as="div" className="py-2">
                    <Link
                      to={`/topics/${topic.topic_id}`}
                      className="topic-link"
                    >
                      {topic.title}
                    </Link>
                  </Card.Text>
                ))}
              <Card.Text className="center-align mt-2">
                <Link to="/topics">
                  <h4>Browse All</h4>
                </Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="pl-0">
          <div className="intro-card mr-1">
            <img className="img-person-left" src="images/megaphone.png" />
            <p className="motto">Discuss Freely</p>
            <img className="img-person-right" src="images/megaphone2.png" />
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default HomeScreen;
