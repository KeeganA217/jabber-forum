import React, { Fragment, useEffect, useState } from "react";
import { Card, Col, Row, Button, Container, Form } from "react-bootstrap";
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
          <Card className="mx-2 p-3 topics-card">
            <Card.Title as="div" className="mx-auto">
              <strong>
                <h3>Recent Topics</h3>
              </strong>
            </Card.Title>
            <Card.Body>
              {loading && <Loader />}
              {error && <Message variant="danger">{error}</Message>}
              <Form>
                {topics &&
                  topics.map((topic) => (
                    <Button
                      block
                      key={topic.topic_id}
                      className="py-2 btn-light"
                    >
                      <Link
                        to={`/topics/${topic.topic_id}`}
                        className="topic-link"
                      >
                        {topic.title}
                      </Link>
                    </Button>
                  ))}
              </Form>
              <Card.Text className="mt-2">
                <Button block className="btn-info">
                  <Link className="topic-link" to="/topics">
                    Browse All
                  </Link>
                </Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="pl-0">
          <Card>
            <div className="intro-card mr-2">
              <Row>
                <p className="ml-auto">"Discuss</p>
              </Row>
              <Row>
                <p className="ml-auto">Freely"</p>
              </Row>
              <img className="img-person-left" src="images/megaphone.png" />
            </div>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default HomeScreen;
