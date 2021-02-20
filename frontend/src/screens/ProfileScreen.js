import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Table,
  Container,
  Image,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import axios from "axios";

const ProfileScreen = () => {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //   const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  //   const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      if (!user) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails(userInfo.id));
      } else {
        setFirstName(userInfo.first_name);
        setLastName(userInfo.last_name);
        setEmail(userInfo.email);
      }
    }
  }, [dispatch, userInfo, history, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    // if (password !== confirmPassword) {
    //   setMessage("Passwords do not match.");
    // } else {
    //   dispatch(updateUserProfile({ id: user._id, name, email, password }));
    // }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const deleteHandler = () => {};

  return (
    <Container>
      <Row>
        <Col md={3} className="my-3 mr-3">
          <h2> User Profile</h2>
          <Image
            to="/profile"
            fluid
            thumbnail
            roundedCircle
            src={!userInfo.image ? "images/default.png" : userInfo.image}
          />
        </Col>
        <Col md={8} className="ml-5 mt-3">
          <h2>Posts &amp; Comments</h2>
          <Table striped hover responsive bordered className="table-sm">
            <thead>
              <tr>
                <th>DATE</th>
                <th>TOPIC</th>
                <th>COMMENT</th>
                <th>LINK</th>
              </tr>
            </thead>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <Form>
            <Form.Group controlId="image">
              <Form.File
                id="image-file"
                custom
                label="Choose file"
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col md={3} className="mr-2 mb-2">
          <h2> User Profile</h2>
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
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" block>
              Update Account
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col md={3} className=" mb-5">
          <Button onClick={deleteHandler} variant="danger" block>
            Delete Account
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;
