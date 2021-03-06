import React, { useEffect, Fragment, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Container, Table, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listComments, removeComment } from "../actions/commentActions";
import moment from "moment";
import ReactPaginate from "react-paginate";

const CommentListScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [searchTerm, SetSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const commentsPerPage = 20;
  const pagesVisited = pageNumber * commentsPerPage;

  const listAllComments = useSelector((state) => state.listAllComments);
  const { loading, error, comments } = listAllComments;

  const deleteComment = useSelector((state) => state.deleteComment);
  const { success: successCommentDelete } = deleteComment;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin === 1) {
      dispatch(listComments());
    } else if (!userInfo) {
      history.push("/");
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo, history, successCommentDelete]);

  const deleteCommentHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      dispatch(removeComment(id));
    }
  };

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <Fragment>
      <Container>
        <h1 className="my-4">Comments</h1>
        <Form>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Search Comments..."
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
          <Table
            hover
            striped
            responsive
            bordered
            className="table-sm table-light"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>COMMENT</th>
                <th>TOPIC ID</th>
                <th>DATE POSTED</th>
                <th>USER ID</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {comments &&
                comments
                  .slice(pagesVisited, pagesVisited + commentsPerPage)
                  .filter((comment) => {
                    if (searchTerm == "") {
                      return comment;
                    } else if (
                      comment.comment
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return comment;
                    }
                  })
                  .map((comment) => (
                    <tr key={comment.comment_id}>
                      <td>{comment.comment_id}</td>
                      <td>{comment.comment}</td>
                      <td>
                        {" "}
                        <Link to={`/topics/${comment.topic_id}`}>
                          {comment.topic_id}
                        </Link>
                      </td>
                      <td>
                        {moment(comment.date_added).format(
                          "dddd, MMMM Do YYYY"
                        )}
                      </td>
                      <td>
                        <Link to={`/admin/user/${comment.id}/edit`}>
                          {comment.id}
                        </Link>
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          className="btn-sm ml-2"
                          onClick={() =>
                            deleteCommentHandler(comment.comment_id)
                          }
                        >
                          <i className="fas fa-trash" />
                        </Button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </Table>
        )}
        <Row>
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
        </Row>
      </Container>
    </Fragment>
  );
};

export default CommentListScreen;
