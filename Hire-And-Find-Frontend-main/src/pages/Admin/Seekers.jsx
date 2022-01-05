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

const Seekers = ({ seekers }) => {
  const deleteSeekers = async (id) => {
    let results = await requests.deleteUser(id);
    alert(results);
  };
  return (
    <>
      <div className="page-header">
        <h2 className="text-center"> All Seekers</h2>
      </div>
      <div className="admincontainer">
        <div className="userinfo mt-3 mb-3">
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>NAME</StyledTableCell>
                  <StyledTableCell>SKILLS</StyledTableCell>{" "}
                  <StyledTableCell>NAME</StyledTableCell>
                  <StyledTableCell>SKILLS</StyledTableCell>
                  <StyledTableCell align="right">ACTIONS</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {seekers && seekers.length
                  ? seekers.map((data, i) => {
                      return (
                        <StyledTableRow key={i}>
                          <StyledTableCell component="th" scope="row">
                            {data.name || "random"}
                          </StyledTableCell>
                          <StyledTableCell>
                            {data.skills.length}
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {data.name || "random"}
                          </StyledTableCell>
                          <StyledTableCell>
                            {data.skills.length}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <button
                              className="btn btn-danger m-1"
                              onClick={() => deleteSeekers(data._id)}
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

export default Seekers;
