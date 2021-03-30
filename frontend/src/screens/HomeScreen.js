import React, { Fragment, useEffect, useState } from "react";
import { Card, Col, Row, Button, Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listNewTopics } from "../actions/topicActions";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { gsap, Elastic, Power1 } from "gsap";

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
      ease: Elastic,
      duration: 1.6,
    });
    gsap.from(".browse-btn", {
      opacity: 0,
      y: 70,
      ease: Power1,
      duration: 0.8,
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
          <h2>Take part in discussions already created...</h2>
        </Col>
        <Col md={1} className="icon">
          <svg
            width="90"
            height="85"
            viewBox="0 0 212 177"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="triangles">
              <g id="Light" opacity="0.8">
                <path
                  id="light1"
                  opacity="0.8"
                  d="M147.824 85.8332C149.992 86.9502 149.992 90.0498 147.824 91.1668L87.6241 122.186C85.6275 123.215 83.25 121.765 83.25 119.519L83.25 57.4806C83.25 55.2345 85.6275 53.785 87.6241 54.8138L147.824 85.8332Z"
                />
              </g>
              <g id="Dark" opacity="0.8">
                <path
                  id="dark1"
                  opacity="0.8"
                  d="M194.824 85.8332C196.992 86.9502 196.992 90.0498 194.824 91.1668L134.624 122.186C132.628 123.215 130.25 121.765 130.25 119.519V57.4806C130.25 55.2345 132.627 53.785 134.624 54.8138L194.824 85.8332Z"
                />
                <path
                  id="dark2"
                  opacity="0.8"
                  d="M100.824 85.8332C102.992 86.9502 102.992 90.0498 100.824 91.1668L40.6241 122.186C38.6275 123.215 36.25 121.765 36.25 119.519L36.25 57.4806C36.25 55.2345 38.6275 53.785 40.6241 54.8138L100.824 85.8332Z"
                />
              </g>
            </g>
          </svg>
        </Col>
        <Col md={4} className="text-center home-info mx-auto">
          <h2>Or create one of your own!</h2>
        </Col>
      </Row>
    </Fragment>
  );
};

export default HomeScreen;
