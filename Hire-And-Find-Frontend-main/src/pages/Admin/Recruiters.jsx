import React, { useState } from "react";
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

const Recruiters = ({ recruitres }) => {
  const deleteRecruiters = async (id) => {
    let results = await requests.deleteUser(id);
    console.log(results);
    // alert(results);
  };
  return (
    <>
      <div className="page-header">
        <h2 className="text-center"> All Recruiters</h2>
      </div>
      <div className="admincontainer">
        <div className="userinfo mt-3 mb-3">
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>COMPANY</StyledTableCell>
                  <StyledTableCell>PHONE NUMBER</StyledTableCell>{" "}
                  <StyledTableCell>COMPANY</StyledTableCell>
                  <StyledTableCell>PHONE NUMBER</StyledTableCell>
                  <StyledTableCell align="right">ACTIONS</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {recruitres && recruitres.length
                  ? recruitres.map((data, i) => {
                      console.log(data);
                      return (
                        <StyledTableRow key={i}>
                          <StyledTableCell component="th" scope="row">
                            {data.company || "Not Found"}
                          </StyledTableCell>
                          <StyledTableCell>{data.phone_number}</StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {data.company || "Not Found"}
                          </StyledTableCell>
                          <StyledTableCell>{data.phone_number}</StyledTableCell>
                          <StyledTableCell align="right">
                            <button
                              className="btn btn-danger m-1"
                              onClick={() => deleteRecruiters(data._id)}
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

export default Recruiters;
