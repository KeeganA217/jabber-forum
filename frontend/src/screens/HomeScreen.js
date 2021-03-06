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

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listNewTopics());
  }, [userInfo]);

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
                      href={`/topics/${topic.topic_id}`}
                      block
                      key={topic.topic_id}
                      className="py-2 btn-light"
                    >
                      {topic.title}
                    </Button>
                  ))}
              </Form>
              <Card.Text className="mt-2">
                <Button block className="btn browse-btn" href="/topics">
                  Browse All
                </Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        {/* <Col className="pl-0">
          <Card>
            <div className="intro-card mr-2">
              <Row>
                <p className="ml-auto mr-5 my-0 py-0">"Discuss</p>
              </Row>
              <Row>
                <p className="ml-auto mr-5 p-0 my-0">Freely"</p>
              </Row>
              <img className="img-person-left" src="images/megaphone.png" />
            </div>
          </Card>
        </Col> */}
      </Row>
    </Fragment>
  );
};

export default HomeScreen;
