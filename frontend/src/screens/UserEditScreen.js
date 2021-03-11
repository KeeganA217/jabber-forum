import React, { useState, useEffect, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Container, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getUserComments,
  getUserDetails,
  updateUser,
} from "../actions/userActions";
import {
  USER_COMMENTS_RESET,
  USER_DETAILS_RESET,
  USER_UPDATE_RESET,
} from "../constants/userConstants";
import moment from "moment";
import ReactPaginate from "react-paginate";

const UserEditScreen = ({ match }) => {
  const userId = match.params.id;
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const dispatch = useDispatch();

  const commentsPerPage = 10;
  const pagesVisited = pageNumber * commentsPerPage;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user, success: detailsSuccess } = userDetails;

  const userComments = useSelector((state) => state.userComments);
  const {
    comments,
    error: errorComments,
    loading: loadingComments,
  } = userComments;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    loadDetails(userId);

    if (detailsSuccess) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, detailsSuccess]);

  const loadDetails = (id) => {
    dispatch(getUserDetails(id));
    dispatch(getUserComments(id));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        id: userId,
        firstName,
        lastName,
        email,
        isAdmin,
      })
    );
    history.push("/admin/userlist");
  };

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Fragment>
      <Container>
        <Row>
          <Col>
            {" "}
            <strong>Back to:</strong>
            <Link
              to="/admin/userlist"
              className="btn btn-sm btn-secondary mx-2 my-3"
            >
              Users
            </Link>
            <Link
              to="/admin/commentlist"
              className="btn btn-sm btn-secondary my-3"
            >
              Comments
            </Link>
          </Col>
        </Row>

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
                  placeholder="Enter First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="name">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter Last Name"
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
                <Form.Label>Is Admin?</Form.Label>
                <Form.Check
                  type="checkbox"
                  label="Yes"
                  checked={isAdmin === 1}
                  onChange={(e) => setIsAdmin(1)}
                ></Form.Check>
                <Form.Check
                  type="checkbox"
                  label="No"
                  checked={isAdmin === 0}
                  onChange={(e) => setIsAdmin(0)}
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
            <Table
              hover
              responsive
              bordered
              striped
              className="table-sm mb-5 table-light"
            >
              <thead>
                <tr>
                  <th>DATE POSTED</th>
                  <th>TOPIC ID</th>
                  <th>COMMENT</th>
                </tr>
              </thead>
              <tbody>
                {loadingComments && <Loader />}
                {errorComments && (
                  <Message variant="danger">{errorComments}</Message>
                )}
                {comments &&
                  comments.length !== 0 &&
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
            {comments.length === 0 && (
              <Message className="mt-5" variant="secondary">
                This User has not posted any comments yet.
              </Message>
            )}
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
