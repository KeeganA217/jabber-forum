import React, { useEffect, Fragment, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Container, Table, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers, deleteUser } from "../actions/userActions";
import { USER_DETAILS_RESET } from "../constants/userConstants";
import moment from "moment";

const UserListScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [searchTerm, SetSearchTerm] = useState("");

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin === 1) {
      dispatch(listUsers());
      dispatch({ type: USER_DETAILS_RESET });
    } else if (!userInfo) {
      history.push("/");
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo, history, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <Fragment>
      <Container>
        <h1 className="my-4">Users</h1>
        <Form>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Search Users..."
              onChange={(e) => {
                SetSearchTerm(e.target.value);
              }}
            />
          </Form.Group>
        </Form>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Table striped hover responsive bordered className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th>MEMBER SINCE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users
                  .filter((user) => {
                    if (searchTerm == "") {
                      return user;
                    } else if (
                      user.first_name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return user;
                    } else if (
                      user.last_name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return user;
                    }
                  })
                  .map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>
                        {user.first_name} {user.last_name}
                      </td>
                      <td>
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                      </td>
                      <td>
                        {user.isAdmin === 1 ? (
                          <i
                            className="fas fa-check"
                            style={{ color: "green" }}
                          />
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          />
                        )}
                      </td>
                      <td>
                        {moment(user.joined_on).format("dddd, MMMM Do YYYY")}
                      </td>
                      <td>
                        <LinkContainer to={`/admin/user/${user.id}/edit`}>
                          <Button className="btn-sm mx-3" variant="secondary">
                            <i className="fas fa-edit" />
                          </Button>
                        </LinkContainer>
                        <Button
                          variant="danger"
                          className="btn-sm ml-2"
                          onClick={() => deleteHandler(user.id)}
                        >
                          <i className="fas fa-trash" />
                        </Button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </Table>
        )}
      </Container>
    </Fragment>
  );
};

export default UserListScreen;
