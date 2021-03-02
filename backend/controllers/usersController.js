import mysql from "mysql";
import { db } from "../config/db.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

const connection = mysql.createConnection(db);

// REGISTER A NEW USER
const registerUser = asyncHandler(async (req, res) => {
  const { first_name, last_name, email, password } = req.body.first_name;
  const salt = 10;

  let sqlFind = `SELECT * FROM users WHERE email = ?;`;

  const userExists = await connection.query(sqlFind, email, (err, result) => {
    if (err) {
      console.log(err);
    } else if (result.length !== 0) {
      res.status(400);
      res.send({ message: "This email has already been registered" });
    } else {
      bcrypt.hash(password, salt, (error, hash) => {
        if (error) {
          console.log(error);
        }

        let sqlRegister = `INSERT INTO users (first_name, last_name, email, password) VALUES (?,?,?,?);`;

        connection.query(
          sqlRegister,
          [first_name, last_name, email, hash],
          (err, result) => {
            if (err) {
              res.send(err);
              console.log(err);
            } else {
              res.status(200);
              res.send({
                id: result.insertId,
                first_name: first_name,
                last_name: last_name,
                email: email,
                isAdmin: "0",
                image: null,
                token: generateToken(insertId),
              });
            }
          }
        );
      });
    }
  });
});

// LOGIN A USER
const loginUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  let sqlFind = `SELECT * FROM users WHERE email = ?;`;

  const userExists = await connection.query(sqlFind, email, (err, result) => {
    if (err) {
      console.log(err);
    } else if (result.length === 0) {
      res.status(400);
      res.send({ message: "User does not exist." });
    } else {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          res.send({
            id: result[0].id,
            first_name: result[0].first_name,
            last_name: result[0].last_name,
            email: result[0].email,
            isAdmin: result[0].isAdmin,
            image: result[0].image,
            token: generateToken(result[0].id),
          });
        } else {
          res.status(400);
          res.send({ message: "Incorrect Email or Password." });
        }
      });
    }
  });
});

// UPDATE YOUR OWN PROFILE INFO
const updateOwnProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, image, id } = req.body.id;
  const salt = 10;

  await bcrypt.hash(password, salt, (error, hash) => {
    if (error) {
      console.log(error);
    }
    let sql = `UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ?, image = ?
    WHERE id = ?;`;

    connection.query(
      sql,
      [firstName, lastName, email, hash, image, id],
      (err, result) => {
        if (err) {
          res.send(err);
          console.log(err);
        } else {
          let sqlFind = `SELECT * FROM users WHERE id = ?;`;

          connection.query(sqlFind, id, (err, result) => {
            if (err) {
              res.send(err);
              console.log(err);
            } else {
              res.send({
                id: result[0].id,
                first_name: result[0].first_name,
                last_name: result[0].last_name,
                email: result[0].email,
                isAdmin: result[0].isAdmin,
                image: result[0].image,
                token: generateToken(result[0].id),
              });
            }
          });
        }
      }
    );
  });
});

// UPDATE ANOTHER USERS INFO AS ADMIN
const updateUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, isAdmin, id } = req.body.id;
  let sql = `UPDATE users SET first_name = ?, last_name = ?, email = ?, isAdmin = ?
    WHERE id = ?;`;
  await connection.query(
    sql,
    [firstName, lastName, email, isAdmin, id],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        let sqlFind = `SELECT * FROM users WHERE id = ?;`;
        connection.query(sqlFind, id, (err, result) => {
          if (err) {
            res.send(err);
            console.log(err);
          } else {
            res.send({
              id: result[0].id,
              first_name: result[0].first_name,
              last_name: result[0].last_name,
              email: result[0].email,
              isAdmin: result[0].isAdmin,
              token: generateToken(result[0].id),
            });
          }
        });
      }
    }
  );
});

// GET A SINGLE USERS INFO
const getSingleUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  let sqlFind = `SELECT * FROM users WHERE id = ?;`;

  await connection.query(sqlFind, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({
        id: result[0].id,
        first_name: result[0].first_name,
        last_name: result[0].last_name,
        email: result[0].email,
        isAdmin: result[0].isAdmin,
        image: result[0].image,
        token: generateToken(result[0].id),
        joined_on: result[0].joined_on,
      });
    }
  });
});

// LIST ALL USERS AND DETAILS
const listAllUsers = asyncHandler(async (req, res) => {
  let sqlFind = `SELECT * FROM users;`;

  await connection.query(sqlFind, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// DELETE A SINGLE USER
const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  let sql = `DELETE FROM users WHERE id = ?;`;

  await connection.query(sql, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

export {
  registerUser,
  loginUser,
  deleteUser,
  listAllUsers,
  getSingleUser,
  updateOwnProfile,
  updateUser,
};
