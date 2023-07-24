import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Modal } from "@mui/material";
import { CircularProgress } from "@mui/material";
import meta from "../Assets/META.svg";
import google from "../Assets/GoogleAd.svg";
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
import CommonModal from "./CommonComponent/Modal";

const baseURL = process.env.REACT_APP_BASE_URL;

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
  const [uploading, setUploading] = useState(false);
  const [requestFailedReason, setRequestFailedReason] = React.useState({
    openModal: false,
    message: "",
  });

  // Result Modal
  const [viewTemplate, setViewTemplate] = React.useState({
    openModal: false,
    queryName: "",
  });
  const handleResultModalClose = () =>
    setViewTemplate({
      ...viewTemplate,
      openModal: false,
      queryName: "",
    });

  const fetchMainTable = () => {
    if (user["role"] && user["role"].includes("Publisher") && user["role"].includes("Consumer")) {
      axios
        .get(`${baseURL}/${user?.name}`, {
          params: {
            query:
              "select * from DCR_SAMP_CONSUMER1.PUBLIC.DASHBOARD_TABLE order by RUN_ID desc;",
          },
        })
        .then((response) => {
          if (response) {
            let data = response?.data?.data;
            setData(data);
          }
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .get(`${baseURL}/${user?.name}`, {
          params: {
            query:
              "select * from DCR_SAMP_CONSUMER1.PUBLIC.DASHBOARD_TABLE where TEMPLATE_NAME = 'ADVERTISER MATCH' order by run_id desc;",
          },
        })
        .then((response) => {
          if (response) {
            let data = response?.data?.data;
            setData(data);
          }
        })
        .catch((error) => console.log(error));
    }

  };


  useEffect(() => {
    fetchMainTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const downloadFile = (TEMPLATE_NAME, RUN_ID) => {
    TEMPLATE_NAME = TEMPLATE_NAME.replace(/\s/g, "_");
    axios
      .get(`${baseURL}/${user?.name}`, {
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
      .get(`${baseURL}/${user?.name}`, {
        params: {
          query: `select * from DCR_SAMP_CONSUMER1.PUBLIC.${templateName}_${runId} limit 1000;`,
        },
      })
      .then((response) => {
        if (response?.data?.data) {
          fetchTable(response?.data?.data, runId);
          setViewTemplate({
            ...viewTemplate,
            openModal: true,
            queryName: templateName,
          });
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
    navigate("/analytics");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleUploadData = async (runId) => {
    setUploading(true);
    axios
      .get(`${baseURL}/${user?.name}`, {
        params: {
          query: `select * from DCR_SAMP_CONSUMER1.PUBLIC.DCR_QUERY_REQUEST1 where run_id = '${runId}';`,
        },
      })
      .then((response) => {
        if (response?.data?.data) {
          let data = response?.data?.data?.[0];
          axios
            .get(`${baseURL}/${user?.name}`, {
              params: {
                query: `insert into DCR_SAMP_CONSUMER1.PUBLIC.DEMO_REQUESTS(QUERY_NAME,PROVIDER_NAME,COLUMN_NAMES,CONSUMER_NAME,FILE_NAME, match_attribute,match_attribute_value,Run_id) values ('${data.TEMPLATE_NAME}','${data.PROVIDER_NAME}','${data.COLUMNS}','${data.CONSUMER_NAME}','${data.FILE_NAME}','${data.ATTRIBUTE_NAME}','${data.ATTRIBUTE_VALUE}','${data.RUN_ID}');`,
              },
            })
            .then((response) => {
              if (response) {
                axios
                  .get(`${baseURL}/${user?.name}`, {
                    params: {
                      query: `update DCR_SAMP_CONSUMER1.PUBLIC.DASHBOARD_TABLE set UPL_INTO_CLI_SPACE = 'In Progress' where RUN_ID = '${data.RUN_ID}';`,
                    },
                  })
                  .then((response) => {
                    if (response) {
                      fetchMainTable();
                      callByPassUpload();

                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const callByPassUpload = () => {
    setTimeout(() => {
      fetchMainTable();
      axios
        .get(`${baseURL}/${user?.name}/procedure`, {
          params: {
            query: `call DCR_SAMP_CONSUMER1.PUBLIC.proc_matched_data();`,
          },
        })
        .then((response) => {
          if (response) {
            fetchMainTable();
            setUploading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          fetchMainTable();
          setUploading(false);
        });
    }, 2000);
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
                    // color: "#8c0f45",
                    // backgroundColor: "#fff1f4",
                    borderRadius: 0,
                    borderTop: 1,
                    borderLeft: 1,
                    borderColor: "#d6d3d1",
                  },
                  "& th:first-of-type": {
                    borderLeft: 1,
                    borderColor: "#d6d3d1",
                  },
                  "& th:last-child": {
                    borderRight: 1,
                    borderColor: "#d6d3d1",
                  },
                }}
              >
                <TableCell
                  className="bg-amaranth-50 text-amaranth-900"
                  key={0}
                  align="center"
                >
                  Request ID
                </TableCell>
                <TableCell
                  className="bg-amaranth-50 text-amaranth-900"
                  key={1}
                  align="center"
                >
                  Template Name
                </TableCell>
                <TableCell
                  className="bg-amaranth-50 text-amaranth-900"
                  key={2}
                  align="center"
                >
                  Column Names
                </TableCell>
                <TableCell
                  className="bg-amaranth-50 text-amaranth-900"
                  key={3}
                  align="center"
                >
                  Identifier Type
                </TableCell>
                <TableCell
                  className="bg-amaranth-50 text-amaranth-900"
                  key={4}
                  align="center"
                >
                  Match Attribute
                </TableCell>
                <TableCell
                  className="bg-amaranth-50 text-amaranth-900"
                  key={5}
                  align="center"
                >
                  Match Count
                </TableCell>
                <TableCell
                  className="bg-amaranth-50 text-amaranth-900"
                  key={6}
                  align="center"
                >
                  Status
                </TableCell>
                <TableCell
                  className="bg-amaranth-50 text-amaranth-900"
                  key={"Actions"}
                  align="center"
                >
                  Actions
                </TableCell>
                <TableCell
                  className="bg-amaranth-50 text-amaranth-900"
                  key={7}
                  align="center"
                >
                  Requested
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
                        className="border-gray-200 hover:bg-amaranth-50"
                        key={index}
                        sx={{
                          "& td:last-child": {
                            borderRight: 1,
                            borderColor: "#d6d3d1",
                          },
                          "& td": { borderLeft: 1, borderColor: "#d6d3d1" },
                        }}
                      >
                        <TableCell className="text-amaranth-900" align="center">
                          {row.RUN_ID}
                        </TableCell>
                        <TableCell className="text-amaranth-900" align="center">
                          {row.TEMPLATE_NAME}
                        </TableCell>
                        <TableCell className="text-amaranth-900" align="center">
                          {row.COLOUMNS}
                        </TableCell>
                        <TableCell className="text-amaranth-900" align="center">
                          {row.IDENTIFIER_TYPE}
                        </TableCell>
                        <TableCell className="text-amaranth-900" align="center">
                          {row.ATTRIBUTE}
                        </TableCell>
                        <TableCell className="text-amaranth-900" align="center">
                          {row.MATCH_COUNT}
                        </TableCell>
                        <TableCell className="text-amaranth-900" align="center">
                          <span
                            className={`${row.STATUS.toLowerCase() === "completed" ||
                              row.STATUS.toLowerCase() === "true"
                              ? "bg-green-200 text-green-700 inline"
                              : row.STATUS === "Failed" ||
                                row.STATUS === "false"
                                ? "bg-red-200 text-red-700 inline"
                                : "text-amaranth-700 block bg-amaranth-200 h-[45px]"
                              }  text-xs py-1 px-3 rounded-full  `}
                          >
                            {row.STATUS.toLowerCase() === "true"
                              ? "Approved"
                              : row.STATUS.toLowerCase() === "false"
                                ? "Rejected"
                                : row.STATUS}
                          </span>
                        </TableCell>

                        <TableCell
                          className="text-amaranth-900"
                          key={"actions"}
                          align="center"
                        >
                          <div className="flex justify-between">
                            {row.STATUS.toLowerCase() === "failed" ||
                              row.STATUS.toLowerCase() === "false" ? (
                              <button
                                onClick={() =>
                                  setRequestFailedReason({
                                    ...requestFailedReason,
                                    openModal: true,
                                    message: row.ERROR,
                                  })
                                }
                                className="opacity-1 px-2 hover:text-inherit"
                                title="Request Error"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  class="w-5 h-5 text-red-600"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                  />
                                </svg>
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  fetchcsvTableData(
                                    row.TEMPLATE_NAME,
                                    row.RUN_ID
                                  )
                                }
                                disabled={
                                  row.STATUS.toLowerCase() !== "completed"
                                }
                                className={`${row.STATUS.toLowerCase() === "completed"
                                  ? "opacity-1 hover:text-inherit"
                                  : "disabled opacity-10 hover:text-inherit"
                                  }  px-2 hover:text-amaranth-600`}
                                title="View"
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
                            )}
                            {row.TEMPLATE_NAME === "CUSTOMER ENRICHMENT" ||
                              row.TEMPLATE_NAME === "customer_enrichment" ? (
                              <button
                                onClick={() =>
                                  downloadFile(row.TEMPLATE_NAME, row.RUN_ID)
                                }
                                disabled={
                                  row.STATUS.toLowerCase() !== "completed"
                                }
                                className={`${row.STATUS.toLowerCase() === "completed"
                                  ? "opacity-1 hover:text-inherit"
                                  : "disabled opacity-10 hover:text-inherit"
                                  }  px-2 hover:text-amaranth-600`}
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
                            {(row.TEMPLATE_NAME === "ADVERTISER MATCH" ||
                              row.TEMPLATE_NAME === "advertiser_match") && (user.role && user?.role?.includes("Publisher") && user?.role?.includes("Consumer")) ? (
                              <>
                                <button
                                  onClick={() => showAnalyticsPage(row.RUN_ID)}
                                  disabled={
                                    row.STATUS.toLowerCase() !== "completed"
                                  }
                                  className={`${row.STATUS.toLowerCase() === "completed"
                                    ? "opacity-1 hover:text-inherit"
                                    : "disabled opacity-10 hover:text-inherit"
                                    }  px-2 hover:text-amaranth-600`}
                                  title="Show Analytics"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
                                    />
                                  </svg>
                                </button>
                                <button
                                  // onClick={() => metaAd(row.RUN_ID)}
                                  disabled={
                                    row.STATUS.toLowerCase() !== "completed"
                                  }
                                  className={`${row.STATUS.toLowerCase() === "completed"
                                    ? "opacity-1 hover:text-inherit"
                                    : "disabled opacity-10 hover:text-inherit"
                                    }  px-2 hover:text-amaranth-600`}
                                  title="Show Analytics"
                                >
                                  <img src={meta} alt="" />
                                </button>
                                <button
                                  // onClick={() => googleAd(row.RUN_ID)}
                                  disabled={
                                    row.STATUS.toLowerCase() !== "completed"
                                  }
                                  className={`${row.STATUS.toLowerCase() === "completed"
                                    ? "opacity-1 hover:text-inherit"
                                    : "disabled opacity-10 hover:text-inherit"
                                    }  px-2 hover:text-amaranth-600`}
                                  title="Show Analytics"
                                >
                                  <img src={google} alt="" />
                                </button>
                                {uploading && row.UPL_INTO_CLI_SPACE?.toLowerCase() === "in progress" ? (
                                  <div>
                                    <CircularProgress
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        color: "amaranth-600",
                                      }}
                                      title="Wait uploading is going on"
                                    />
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => handleUploadData(row.RUN_ID)}
                                    disabled={
                                      row.UPL_INTO_CLI_SPACE?.toLowerCase() ===
                                      "true" &&
                                      row.STATUS?.toLowerCase() === "completed"
                                    }
                                    className={`${row.UPL_INTO_CLI_SPACE?.toLowerCase() !==
                                      "true" &&
                                      row.STATUS?.toLowerCase() === "completed"
                                      ? "opacity-1 hover:text-inherit"
                                      : "disabled opacity-10 hover:text-inherit"
                                      }  px-2 hover:text-amaranth-600`}
                                    title={
                                      row.UPL_INTO_CLI_SPACE?.toLowerCase() === "true"
                                        ? "Already Uploaded into client ecospace"
                                        : "Upload match records into client ecospace"
                                    }
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="w-5 h-5"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                      />
                                    </svg>
                                  </button>
                                )}
                                

                              </>
                            ) : null}
                          </div>
                        </TableCell>
                        <TableCell className="text-amaranth-900" align="center">
                          {handleDate(row.RUN_ID)}
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
        open={viewTemplate.openModal}
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
                <CustomTable
                  id={requestId}
                  head={tableHead}
                  rows={tableRows}
                  pagination={
                    viewTemplate.queryName === "ADVERTISER_MATCH"
                      ? "none"
                      : true
                  }
                />
              ) : null}
            </div>
          </div>
        </Box>
      </Modal>

      {requestFailedReason.openModal ? (
        <CommonModal
          open={requestFailedReason.openModal}
          handleClose={() =>
            setRequestFailedReason({ ...requestFailedReason, openModal: false })
          }
          message={requestFailedReason.message}
          buttons={false}
          textColor={"text-red-600"}
        />
      ) : null}
    </div>
  );
};

export default QueryStatus;
