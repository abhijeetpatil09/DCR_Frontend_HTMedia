import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Modal } from "@mui/material";

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
import CustomTable from "./CommonComponent/Table";

// Modal style
const resultstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  maxHeight: "90%",
  bgcolor: "background.paper",
  // p: 4,
  // pt:8\,
  overflow: "scroll",
};

const QueryStatus = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = state && state.user;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [tableHead, setTableHead] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [requestId, setRequestId] = useState("");

  // Result Modal
  const [isResultModalOpen, toggleResultModal] = React.useState(false);
  const handleResultModalOpen = () => toggleResultModal(true);
  const handleResultModalClose = () => toggleResultModal(false);

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

  const fetchTable = (data, runId) => {
    let head = [];
    let row = [];
    if (data?.length > 0) {
      head = data && Object.keys(data[0]);
      data?.map((obj) => {
        return row.push(head?.map((key) => obj[key]));
      });
    }
    setTableHead(head);
    setTableRows(row);
    setRequestId(runId);
  };

  const fetchcsvTableData = async (templateName, runId) => {
    templateName = templateName.replace(/\s/g, "_");
    axios
      .get(`http://127.0.0.1:5000/${user?.name}`, {
        params: {
          query: `select * from DCR_SAMP_CONSUMER1.PUBLIC.${templateName}_${runId} limit 1000;`,
        },
      })
      .then((response) => {
        if (response?.data?.data) {
          fetchTable(response?.data?.data, runId);
          handleResultModalOpen();
        }
      })
      .catch((error) => {
        console.log("In API catch", error);
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
                        <TableCell align="center">{row.RUN_ID}</TableCell>
                        <TableCell align="center">
                          {row.TEMPLATE_NAME}
                        </TableCell>
                        <TableCell align="center">
                          {row.PROVIDER_NAME}
                        </TableCell>
                        <TableCell align="center">{row.COLOUMNS}</TableCell>
                        <TableCell align="center">
                          {row.IDENTIFIER_TYPE}
                        </TableCell>
                        <TableCell align="center">{row.ATTRIBUTE}</TableCell>
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
                          <div className="flex">
                            <button
                              onClick={() =>
                                fetchcsvTableData(row.TEMPLATE_NAME, row.RUN_ID)
                              }
                              className={`${
                                row.STATUS === "false"
                                  ? "disabled opacity-10 hover:text-inherit"
                                  : row.STATUS === "pending"
                                  ? "disabled opacity-10 hover:text-inherit"
                                  : " "
                              }  px-2 hover:text-amaranth-600`}
                              title="View File"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                            </button>
                            {row.TEMPLATE_NAME === "CUSTOMER ENRICHMENT" ||
                            row.TEMPLATE_NAME === "customer_enrichment" ? (
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
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-4 h-4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </button>
                            ) : null}
                            {row.TEMPLATE_NAME === "ADVERTISER MATCH" ||
                            row.TEMPLATE_NAME === "advertiser_match" ? (
                              <>
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
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-4 h-4"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
                                    />
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
                                    />
                                  </svg>
                                </button>
                                <button
                                  className={`${
                                    row.STATUS === "false"
                                      ? "disabled opacity-10 hover:text-inherit"
                                      : row.STATUS === "pending"
                                      ? "disabled opacity-10 hover:text-inherit"
                                      : " "
                                  }  px-1 hover:text-amaranth-600 cursor-pointer`}
                                  title="Upload match records into client ecospace"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                    />
                                  </svg>
                                </button>
                              </>
                            ) : null}
                          </div>
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
      <Modal
        open={isResultModalOpen}
        onClose={handleResultModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={resultstyle}>
          <div className=" flex flex-col flex-grow w-full">
            <div className="flex flex-row items-center justify-between sticky z-30 py-2 px-4 top-0 w-full bg-amaranth-800 text-white">
              <h3 className="font-bold text-white">Query result</h3>
              <button onClick={handleResultModalClose}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>
            <div className="px-4">
              {tableHead?.length > 0 && tableRows?.length > 0 ? (
                <CustomTable id={requestId} head={tableHead} rows={tableRows} />
              ) : null}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default QueryStatus;
