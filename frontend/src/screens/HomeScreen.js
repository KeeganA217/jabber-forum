import React, { Fragment, useEffect, useState } from "react";
import {
  Card,
  Col,
  Row,
  Button,
  Container,
  Form,
  Jumbotron,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listNewTopics } from "../actions/topicActions";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const listRecentTopics = useSelector((state) => state.listRecentTopics);
  const { loading, error, topics } = listRecentTopics;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listNewTopics());
  }, [userInfo]);

  return (
    <Fragment>
      <Jumbotron fluid className="jumbotron">
        <Row>
          <Col lg={3} className="pr-0">
            <Card className="px-2 mx-5 topics-card">
              <Card.Title as="div" className="mx-auto mt-3">
                <strong>
                  <h2>Explore Recent Topics</h2>
                </strong>
              </Card.Title>
              <Card.Body className="pt-0">
                {loading && <Loader />}
                {error && <Message variant="danger">{error}</Message>}

                {topics &&
                  topics.map((topic) => (
                    <Button
                      href={`/topics/${topic.topic_id}`}
                      block
                      key={topic.topic_id}
                      className="py-2 topic-btn"
                    >
                      {topic.title}
                    </Button>
                  ))}

                <Card.Text className="mt-3">
                  <Button block className="btn browse-btn" href="/topics">
                    Browse More
                  </Button>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={8} className="title-col ml-auto px-0 mx-0">
            <p>Discuss Freely.</p>
          </Col>
        </Row>
      </Jumbotron>
    </Fragment>
  );
};

export default HomeScreen;
