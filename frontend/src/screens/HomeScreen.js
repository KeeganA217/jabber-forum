import React, { Fragment, useEffect, useState } from "react";
import { Card, Col, Row, Button, Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listNewTopics } from "../actions/topicActions";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { gsap, Power1 } from "gsap";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const listRecentTopics = useSelector((state) => state.listRecentTopics);
  const { loading, error, topics } = listRecentTopics;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listNewTopics());

    gsap.from(".title", {
      opacity: 0,
      x: 1575,
      ease: Power1,
      duration: 1.4,
    });
  }, [userInfo]);

  return (
    <Fragment>
      <Jumbotron
        fluid
        className="jumbotron"
        style={{ backgroundImage: "url('/images/plant.jpg')" }}
      >
        <Row>
          <Col lg={3} className="pr-0">
            <Card className="px-2 mx-5 topics-card">
              <Card.Title as="div" className="mx-auto mt-3">
                <strong>
                  <h2
                    style={{
                      textShadow: "3px 3px 2px rgba(150, 150, 150, 0.51)",
                    }}
                  >
                    Recent Topics
                  </h2>
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
          <Col lg={8} className="title-col mr-5 px-0 mt-auto">
            <p className="title">Discuss Freely.</p>
          </Col>
        </Row>
      </Jumbotron>
      <Row className="my-4">
        <Col md={4} className="text-center home-info mx-auto">
          <h2>Take part in discussions already there...</h2>
        </Col>
        <Col md={1} className="icon">
          <i className="fas fa-plus"></i>
        </Col>
        <Col md={4} className="text-center home-info mx-auto">
          <h2>Or create one of your own!</h2>
        </Col>
      </Row>
    </Fragment>
  );
};

export default HomeScreen;
