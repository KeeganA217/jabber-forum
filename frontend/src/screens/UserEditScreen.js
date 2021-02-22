import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { useHistory } from "react-router-dom";
import Loader from "../components/Loader";
import { getUserComments, getUserDetails } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";
import moment from "moment";

const UserEditScreen = ({ match }) => {
  const userId = match.params.id;
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");
  const [isAdmin, setIsAdmin] = useState("0");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user, success: detailsSuccess } = userDetails;

  const userComments = useSelector((state) => state.userComments);
  const {
    comments,
    error: errorComments,
    loading: loadingComments,
  } = userComments;

  //   const userUpdate = useSelector((state) => state.userUpdate);
  //   const {
  //     loading: loadingUpdate,
  //     error: errorUpdate,
  //     success: successUpdate,
  //   } = userUpdate;

  useEffect(() => {
    dispatch(getUserDetails(userId));
    if (!user.first_name || user.id !== userId) {
      dispatch(getUserDetails(userId));
      dispatch(getUserComments(userId));
    } else {
      console.log(user);
      // setName(user.name);
      // setEmail(user.email);
      // setIsAdmin(user.isAdmin);
    }
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(
    //   updateUser({
    //     _id: userId,
    //     name,
    //     email,
    //     isAdmin,
    //   })
    // );
  };

  return (
    <Fragment>
      <Container>
        <Link to="/admin/userlist" className="btn btn-secondary my-3">
          Go Back
        </Link>
        <h2>Edit User</h2>
        <Row>
          <Col md={3} className="my-3 mr-3">
            {" "}
            <h3> User Info</h3>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {/* {success && <Message variant="success">Profile Updated</Message>} */}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="name">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="isadmin">
                <Form.Check
                  type="checkbox"
                  label="Is Admin"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                ></Form.Check>
              </Form.Group>
              <Button type="submit" variant="primary" block>
                Update Account
              </Button>
            </Form>
          </Col>
          <Col className="ml-5">
            <p>
              Member since {moment(user.joined_on).format("dddd, MMMM Do YYYY")}
            </p>
            <h3>Topics &amp; Comments</h3>
            <Table striped hover responsive bordered className="table-sm">
              <thead>
                <tr>
                  <th>DATE POSTED</th>
                  <th>TOPIC ID</th>
                  <th>COMMENT</th>
                </tr>
              </thead>
              <tbody>
                {comments &&
                  comments.map((comment) => (
                    <tr key={comment.comment_id}>
                      <td>
                        {moment(comment.date_added).format("MMMM Do, YYYY")}
                      </td>
                      <td>
                        <Link to={`/topics/${comment.topic_id}`}>
                          {comment.topic_id}
                        </Link>
                      </td>
                      <td>{comment.comment}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col md={3} className=" mb-5">
            <Button variant="danger" block>
              Delete Account
            </Button>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default UserEditScreen;
