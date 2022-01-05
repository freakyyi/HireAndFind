import React, { useState } from "react";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const requests = require("../../axios/requests");

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const USERS = ({ users, setUsers }) => {
  console.log("USERS", users);
  const deleteUser = async (id) => {
    let results = await requests.deleteUser(id);
    if (results) {
      let arr = [];
      for (let i = 0; i < users.length; i++) {
        if (users[i]._id === id) {
          users.splice(i, 1);
        } else {
          arr.push(users[i]);
        }
      }

      users = arr;
      setUsers(arr);
    }
    console.log(results);
  };
  return (
    <>
      <div className="page-header">
        <h2 className="text-center"> All Users</h2>
      </div>
      <div className="admincontainer">
        <div className="userinfo mt-3 mb-3">
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>NAME</StyledTableCell>
                  <StyledTableCell>EMAIL</StyledTableCell>{" "}
                  <StyledTableCell>ROLE</StyledTableCell>
                  <StyledTableCell align="right">ACTIONS</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {users && users.length
                  ? users.map((data, i) => {
                      return (
                        <StyledTableRow key={i}>
                          <StyledTableCell component="th" scope="row">
                            {data.firstname} {data.lastname}
                          </StyledTableCell>
                          <StyledTableCell>{data.email}</StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {data.role}
                          </StyledTableCell>

                          <StyledTableCell align="right">
                            <button
                              className="btn btn-danger m-1"
                              onClick={() => deleteUser(data._id)}
                            >
                              Delete
                            </button>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })
                  : ""}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default USERS;
