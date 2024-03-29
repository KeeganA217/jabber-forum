import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Table,
  Container,
  Figure,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getUserComments,
  updateOwnProfile,
  deleteUser,
  logout,
} from "../actions/userActions";
import axios from "axios";
import moment from "moment";
import { USER_LOGOUT } from "../constants/userConstants";
import ReactPaginate from "react-paginate";

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
  const [pageNumber, setPageNumber] = useState(0);

  const dispatch = useDispatch();

  const commentsPerPage = 10;
  const pagesVisited = pageNumber * commentsPerPage;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error, loading } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: deleteSuccess } = userDelete;

  const userComments = useSelector((state) => state.userComments);
  const {
    comments,
    error: errorComments,
    loading: loadingComments,
  } = userComments;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
    dispatch(getUserComments(userInfo.id));

    setFirstName(userInfo.first_name);
    setLastName(userInfo.last_name);
    setEmail(userInfo.email);
    setImage(userInfo.image);
  }, [dispatch, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } else if (password === "" || confirmPassword === "") {
      setMessage("Please complete all fields to update profile.");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } else {
      dispatch(
        updateOwnProfile({
          id: userInfo.id,
          firstName,
          lastName,
          email,
          password,
          image,
        })
      );
      setPassword("");
      setConfirmPassword("");
    }
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

  const deleteHandler = () => {
    if (
      window.confirm(
        "Are you sure you want to permanently delete this account and all of the associated comments??"
      )
    ) {
      dispatch(deleteUser(userInfo.id));
    }
    if (deleteSuccess) {
      dispatch(logout);
      dispatch({ type: USER_LOGOUT });
      history.push("/");
    }
  };

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Container>
      <Row>
        <Col md={3} className="my-3 mr-3">
          <h3>
            {userInfo && userInfo.first_name} {userInfo && userInfo.last_name}
          </h3>
          <Figure>
            <Figure.Image
              to="/profile"
              src={
                userInfo && !userInfo.image
                  ? "images/default.png"
                  : userInfo && userInfo.image
              }
              rounded
              width={150}
              height={80}
              alt="171x180"
              className="personal-img"
            />
          </Figure>
        </Col>
        <Col md={8} className="ml-5 mt-4">
          <p>
            Member since{" "}
            {moment(userInfo && userInfo.joined_on).format(
              "dddd, MMMM Do YYYY"
            )}
          </p>
          <h3> My Comments</h3>
          <Table
            hover
            striped
            responsive
            bordered
            className="table-sm table-light"
          >
            <thead>
              <tr>
                <th>DATE POSTED</th>
                <th>TOPIC ID</th>
                <th>COMMENT</th>
              </tr>
            </thead>
            <tbody>
              {comments &&
                comments
                  .slice(pagesVisited, pagesVisited + commentsPerPage)
                  .map((comment) => (
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
          <Col className="paginate-col">
            <ReactPaginate
              previousLabel={"Prev"}
              nextLabel={"Next"}
              pageCount={
                comments && Math.ceil(comments.length / commentsPerPage)
              }
              onPageChange={changePage}
              pageRangeDisplayed={5}
              containerClassName={"pagination-btns"}
              activeClassName={"active-btn"}
              previousClassName={"previous-btn"}
              nextClassName={"next-btn"}
              pageClassName={"page-btns"}
              disabledClassName={"disabled-btn"}
            />
          </Col>
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
          <h3> User Info</h3>
          {success && <Message variant="success">Profile Updated!</Message>}
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
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
