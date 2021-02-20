import React, { Fragment, useEffect } from "react";
import { Card, Col, Container, Row, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listTopics } from "../actions/topicActions";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const listRecentTopics = useSelector((state) => state.listRecentTopics);
  const { loading, error, topics } = listRecentTopics;

  useEffect(() => {
    dispatch(listTopics());
  }, []);

  return (
    <Fragment>
      <Row>
        <Col lg={12}>
          <div className="intro-card">
            <img className="img-person-left" src="images/megaphone.png" />
            <p className="motto">Discuss Freely</p>
            <img className="img-person-right" src="images/megaphone2.png" />
          </div>
        </Col>
      </Row>
      <Container>
        <Row>
          <Col lg={3}>
            <Card className="my-3 p-3 topics-card">
              <Card.Title as="div">
                <strong>
                  <h3>Recent Topics</h3>
                </strong>
              </Card.Title>
              <Card.Body>
                {topics &&
                  topics.map((topic) => (
                    <Card.Text key={topic.id} as="div" className="py-2">
                      <Link className="topic-link">{topic.title}</Link>
                    </Card.Text>
                  ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default HomeScreen;
