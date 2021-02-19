import React, { Fragment } from "react";
import { Card, Col, Container, Row, Image } from "react-bootstrap";

const HomeScreen = () => {
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
          <Col lg={4}>
            <Card className="my-3 p-3 topics-card">
              <Card.Title as="div">
                <strong>
                  <h4>Recent Topics</h4>
                </strong>
              </Card.Title>
              <Card.Body>
                <Card.Text as="div" className="py-2">
                  Topic 1
                </Card.Text>
                <Card.Text as="div" className="py-2">
                  Topic 2
                </Card.Text>
                <Card.Text as="div" className="py-2">
                  Topic 3
                </Card.Text>
                <Card.Text as="div" className="py-2">
                  Topic 4
                </Card.Text>
                <Card.Text as="div" className="py-2">
                  Topic 5
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className="my-3 p-3 topics-card">
              <Card.Title as="div">
                <strong>
                  <h4>Something Else</h4>
                </strong>
              </Card.Title>
              <Card.Body>
                <Card.Text as="div" className="py-2">
                  Topic 1
                </Card.Text>
                <Card.Text as="div" className="py-2">
                  Topic 2
                </Card.Text>
                <Card.Text as="div" className="py-2">
                  Topic 3
                </Card.Text>
                <Card.Text as="div" className="py-2">
                  Topic 4
                </Card.Text>
                <Card.Text as="div" className="py-2">
                  Topic 5
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className="my-3 p-3 topics-card">
              <Card.Title as="div">
                <strong>
                  <h4>Most Popular</h4>
                </strong>
              </Card.Title>
              <Card.Body>
                <Card.Text as="div" className="py-2">
                  Topic 1
                </Card.Text>
                <Card.Text as="div" className="py-2">
                  Topic 2
                </Card.Text>
                <Card.Text as="div" className="py-2">
                  Topic 3
                </Card.Text>
                <Card.Text as="div" className="py-2">
                  Topic 4
                </Card.Text>
                <Card.Text as="div" className="py-2">
                  Topic 5
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default HomeScreen;
