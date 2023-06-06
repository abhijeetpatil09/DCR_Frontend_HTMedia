import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";

import {
  jsonToCsv,
  handleDate,
  downloadFileInCSV,
} from "../utils/commonFunctions";
import * as actions from "../redux/actions/index";

const QueryStatus = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = state && state.user;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/${user?.name}`, {
        params: {
          query:
            "select * from DCR_SAMP_CONSUMER1.PUBLIC.DASHBOARD_TABLE order by RUN_ID desc;",
        },
      })
      .then((response) => setData(response.data.data))
      .catch((error) => console.log(error));
  }, [user?.name]);

  const downloadFile = (TEMPLATE_NAME, RUN_ID) => {
    axios
      .get(`http://127.0.0.1:5000/${user?.name}`, {
        responseType: "json",
        params: {
          query: `select * from DCR_SAMP_CONSUMER1.PUBLIC.${TEMPLATE_NAME}_${RUN_ID};`,
        },
      })
      .then((response) => {
        if (response?.data) {
          const csvData = jsonToCsv(response?.data); // Create a Blob from the CSV data
          downloadFileInCSV(csvData, TEMPLATE_NAME, RUN_ID);
        } else {
          console.log("File cannnot be downloaded...");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const showAnalyticsPage = (runId) => {
    dispatch(
      actions.AnalyticsData({
        RequestId: runId,
      })
    );
    console.log("in sjppooiiui");
    navigate("/analytics");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="flex flex-col w-full h-full ">
      <div className="flex h-12 sticky top-0 z-30 px-5  py-2 bg-amaranth-800 flex-row items-center justify-between w-full">
        <h3 className="  text-lg font-light text-white">Query status</h3>
      </div>
      <div className="flex flex-col w-full px-5 mt-4 ">
        <TableContainer>
          <Table
            sx={{ minWidth: 650, borderRadius: 0 }}
            stickyHeader
            size="small"
            classes={{ root: "w-100" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow
                sx={{
                  "& th": {
                    fontSize: "0.9rem",
                    fontWeight: 900,
                    color: "#8c0f45",
                    backgroundColor: "#fff1f4",
                    borderRadius: 0,
                    borderTop: 1,
                    borderLeft: 1,
                    borderColor: "#d6d3d1",
                  },
                  "& th:first-child": { borderLeft: 1, borderColor: "#d6d3d1" },
                }}
              >
                <TableCell key={0} align="center">
                  Request ID
                </TableCell>
                <TableCell key={1} align="center">
                  Template Name
                </TableCell>
                <TableCell key={2} align="center">
                  Provider Name
                </TableCell>
                <TableCell key={3} align="center">
                  Column Names
                </TableCell>
                <TableCell key={4} align="center">
                  Identifier Type
                </TableCell>
                <TableCell key={5} align="center">
                  Match Attribute
                </TableCell>
                <TableCell key={6} align="center">
                  Status
                </TableCell>
                <TableCell key={7} align="center">
                  Requested
                </TableCell>
                <TableCell key={"Actions"} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((row, index) => {
                    return (
                      <TableRow
                        key={index}
                        sx={{
                          "& td:last-child": {
                            borderRight: 1,
                            borderColor: "#d6d3d1",
                          },
                          "& td": { borderLeft: 1, borderColor: "#d6d3d1" },
                        }}
                      >
                        <TableCell align="center">
                          {row.RUN_ID}
                        </TableCell>
                        <TableCell align="center">
                          {row.TEMPLATE_NAME}
                        </TableCell>
                        <TableCell align="center">
                          {row.PROVIDER_NAME}
                        </TableCell>
                        <TableCell  align="center">
                          {row.COLOUMNS}
                        </TableCell>
                        <TableCell align="center">
                          {row.IDENTIFIER_TYPE}
                        </TableCell>
                        <TableCell align="center">
                          {row.ATTRIBUTE}
                        </TableCell>
                        <TableCell align="center">
                          <span
                            className={`${
                              row.STATUS === "true"
                                ? "bg-green-200 text-green-700"
                                : "bg-amaranth-200 text-amaranth-700 "
                            }   py-1 px-3 rounded-full text-xs`}
                          >
                            {row.STATUS === "true"
                              ? "Approved"
                              : row.STATUS === "false"
                              ? "Rejected"
                              : "In Progress"}
                          </span>
                        </TableCell>
                        <TableCell align="center">
                          {handleDate(row.RUN_ID)}
                        </TableCell>
                        <TableCell key={"actions"} align="center">
                          <button
                            onClick={() =>
                              downloadFile(row.TEMPLATE_NAME, row.RUN_ID)
                            }
                            className={`${
                              row.STATUS === "false"
                                ? "disabled opacity-10 hover:text-inherit"
                                : ""
                            }  px-1 hover:text-amaranth-600`}
                            disabled={row.STATUS === "false"}
                            title="Download file"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v4.59L7.3 9.24a.75.75 0 00-1.1 1.02l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V6.75z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                          {row.TEMPLATE_NAME === "ADVERTISER MATCH" ||
                          row.TEMPLATE_NAME === "advertiser_match" ? (
                            <button
                              onClick={() => showAnalyticsPage(row.RUN_ID)}
                              className={`${
                                row.STATUS === "false"
                                  ? "disabled opacity-10 hover:text-inherit"
                                  : ""
                              }  px-1 hover:text-amaranth-600`}
                              disabled={row.STATUS === "false"}
                              title="Show Analytics"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z"
                                  clipRule="evenodd"
                                />
                                <path
                                  fillRule="evenodd"
                                  d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          ) : null}
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        
      </div>
    </div>
  );
};

export default QueryStatus;
