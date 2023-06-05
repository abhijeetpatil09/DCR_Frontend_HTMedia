import React, { useEffect, useState } from "react";
import AWS from "aws-sdk";
import axios from "axios";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import SelectDropdown from "./CommonComponent/SelectDropdown";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as actions from "../redux/actions/index";

import {
  jsonToCsv,
  handleDate,
  downloadFileInCSV,
} from "../utils/commonFunctions";

import Table from "./CommonComponent/Table";
import "./styles.css";
import "./pure-react.css";
import { Box, Modal } from "@mui/material";

const initialState = {
  Query_Name: "",
  Provider_Name: "",
  Column_Names: [],
  Consumer_Name: "",
  Attribute_Value: "",
};

const s3 = new AWS.S3({
  accessKeyId: "AKIA57AGVWXYVR36XIEC",
  secretAccessKey: "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",
  // signatureVersion: 'v4',
  region: "ap-south-1",
  // region: 'ap-south-1',
});

const Enrichment = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const user = state && state.user;
  const TableData = state && state.ConsumerForm && state.ConsumerForm.TableData;
  const requestId = state && state.ConsumerForm && state.ConsumerForm.RequestId;
  const fetchData = state && state.ConsumerForm && state.ConsumerForm.fetchData;

  const [formData, setFormData] = useState(initialState);
  const [tableHead, setTableHead] = useState([]);
  const [tableRows, setTableRows] = useState([]);

  const [callTable, setCallTable] = useState(false);
  const [loading, setLoading] = useState(false);

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
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    p: 2,
    borderRadius: 5,
  };
  // Create query Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setLoading(false);
    setOpen(false);
  };

  // Result Modal
  const [isResultModalOpen, toggleResultModal] = React.useState(false);
  const handleResultModalOpen = () => toggleResultModal(true);
  const handleResultModalClose = () => toggleResultModal(false);

  const [providerList, setProviderList] = useState([]);
  const [templateList, setTemplateList] = useState("");
  const [databaseName, setDatabaseName] = useState("");
  const [colunms, setColumns] = useState([]);
  const [byPassAPICalled, setByPassAPICalled] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (TableData) {
      setTableHead(TableData?.head || []);
      setTableRows(TableData?.rows || []);
    }
  }, [TableData]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/${user?.name}`, {
        params: {
          query:
            "select * from DCR_SAMP_CONSUMER1.PUBLIC.DASHBOARD_TABLE where TEMPLATE_NAME = 'customer_enrichment' order by RUN_ID desc limit 10;",
        },
      })
      .then((response) => {
        if (response?.data?.data) {
          let res = response?.data?.data;
          setData(res);
        } else {
          setData([]);
        }
      })
      .catch((error) => console.log(error));
  }, [user?.name, callTable]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/${user?.name}`, {
        params: {
          query: "select provider from DCR_SAMP_CONSUMER1.PUBLIC.PROV_DETAILS;",
        },
      })
      .then((response) => {
        if (response?.data) {
          setProviderList(response?.data?.data);
        } else {
          setProviderList([]);
        }
      })
      .catch((error) => console.log(error));
  }, [user?.name]);

  useEffect(() => {
    if (databaseName !== "") {
      axios
        .get(`http://127.0.0.1:5000/${user?.name}`, {
          params: {
            query: `select template_name from ${databaseName}.CLEANROOM.TEMPLATES where template_name <> 'advertiser_match';`,
          },
        })
        .then((response) => {
          if (response?.data) {
            setTemplateList(response.data.data);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [databaseName, user?.name]);

  useEffect(() => {
    if (databaseName !== "" && formData["Query_Name"] !== "") {
      axios
        .get(`http://127.0.0.1:5000/${user?.name}`, {
          params: {
            query: `select allowed_columns from ${databaseName}.CLEANROOM.TEMPLATES where template_name='${formData["Query_Name"]}';`,
          },
        })
        .then((response) => {
          if (response?.data) {
            let col_name = response?.data?.data[0]?.ALLOWED_COLUMNS?.split("|");
            col_name = col_name?.map((item) => {
              return item?.split(".")[1];
            });

            let temp = [];
            temp.push({ value: "all", name: "All" });
            col_name?.map((value) => {
              let xyz = {};
              xyz = { value: value, name: value };
              return temp.push(xyz);
            });
            setColumns(temp);
          }
        })
        .catch((error) => console.log(error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [databaseName, formData["Query_Name"]]);

  const handleSelectProvider = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setTemplateList([]);
    getDatabaseName(event.target.value);
  };

  const handleSelectedTemp = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const getDatabaseName = (selectedProvider) => {
    axios
      .get(`http://127.0.0.1:5000/${user?.name}`, {
        params: {
          query: `select database from DCR_SAMP_CONSUMER1.PUBLIC.PROV_DETAILS where provider = '${selectedProvider}';`,
        },
      })
      .then((response) => {
        if (response?.data) {
          let db_name = response?.data?.data;
          setDatabaseName(db_name[0]?.DATABASE);
        } else {
          setDatabaseName("");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleCustomerFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    const delimiter = "&";
    const selectedOptionsString = `#${selectedOptions.join(delimiter)}#`;
    setFormData({
      ...formData,
      [event.target.name]: selectedOptionsString,
    });
    // setSelectedColumns(selectedOptions);
  };

  const handleChange = (event, name) => {
    setFormData({
      ...formData,
      [name]: event,
    });
  };

  const callByPassAPI = () => {
    setByPassAPICalled(true);
    setTimeout(() => {
      axios
        .get(`http://127.0.0.1:5000/${user?.name}`, {
          params: {
            query: `call DCR_SAMP_CONSUMER1.PUBLIC.PROC_BYPASS_1();`,
          },
        })
        .then((response) => {
          if (response) {
            // fetchcsvTableData();
            setByPassAPICalled(false);
            setCallTable(false);
          } else {
            setByPassAPICalled(false);
            setCallTable(false);
            dispatch(
              actions.ConsumerQueryForm({
                fetchData: false,
              })
            );
          }
        })
        .catch((error) => {
          console.log(error);
          setByPassAPICalled(false);
          setCallTable(false);
          dispatch(
            actions.ConsumerQueryForm({
              fetchData: false,
            })
          );
        });
      setTimeout(() => {
        setCallTable(true);
        handleClose();
      }, 2000);
    }, 2000);
  };

  const downloadFile = (TEMPLATE_NAME, RUN_ID) => {
    axios
      .get(`http://127.0.0.1:5000/${user?.name}`, {
        responseType: "json", // Set the response type to JSON
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

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    if (byPassAPICalled) {
      toast.error(
        "We are fetching the data for current request. Please wait..."
      );
      return;
    }
    formData.RunId = Date.now();

    const keys = Object.keys(formData);
    let csv = keys.join(",") + "\n";
    for (const obj of [formData]) {
      const values = keys.map((key) => obj[key]);
      csv += values.join(",") + "\n";
    }

    const blob = new Blob([csv], { type: "text/csv" });

    // const url = URL.createObjectURL(blob);
    // const link = document.createElement('a');
    // link.href = url;
    // link.download = formData['RunId'] +'.csv';
    // document.body.appendChild(link);
    // link.click();

    const params = {
      // Bucket: 'dcr-poc/query_request',
      Bucket: "dcr-poc",
      Key:
        "query_request/" +
        formData["Query_Name"] +
        "_" +
        formData["RunId"] +
        ".csv",
      Body: blob,
      // ACL: 'private',
    };

    // s3.listBuckets(function(err, data) {
    //     if (err) console.log(err, err.stack);
    //     else console.log(data);
    // });

    s3.putObject(params, (err, data) => {
      if (err) {
        console.log("err", err);
      } else {
        console.log("data", data);
      }
    });

    axios
      .get(`http://127.0.0.1:5000/${user?.name}`, {
        params: {
          query: `insert into DCR_SAMP_CONSUMER1.PUBLIC.dcr_query_request1(template_name,provider_name,columns,consumer_name,run_id, attribute_value) values ('${formData.Query_Name}', '${formData.Provider_Name}','${formData.Column_Names}','${formData.Consumer_Name}','${formData.RunId}', '${formData.Attribute_Value}');`,
        },
      })
      .then((response) => {
        if (response) {
          dispatch(
            actions.ConsumerQueryForm({
              RequestId: formData?.RunId,
              fetchData: true,
            })
          );
          callByPassAPI();
        }
      })
      .catch((error) => {
        console.log(error);
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
    dispatch(
      actions.ConsumerQueryForm({
        TableData: { head: head, rows: row, runId: runId },
        fetchData: false,
      })
    );
  };

  const fetchcsvTableData = async (templateName, runId) => {
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

  return (
    <div className="flex flex-col w-full h-full ">
      <div className="flex h-12 sticky top-0 z-30 px-5  py-2 bg-amaranth-800 flex-row items-center justify-between w-full">
        <h3 className="  text-lg font-light text-white">Customer enrichment</h3>
        <button
          onClick={handleOpen}
          className="flex items-center px-2 py-2  text-sm text-white bg-amaranth-600 rounded-md   hover:bg-amaranth-700  "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
          New Request
        </button>
      </div>
      <div className="flex flex-col w-full px-5">
        <h1 className=" mt-4 text-xl font-regular text-amaranth-600 pb-2 ">
          Recent requests
        </h1>

        <table className="table-auto w-full text-left text-sm">
          <thead>
            <tr className="bg-amaranth-50 text-amaranth-900 uppercase text-sm leading-normal border-t border-l ">
              <th className="px-4 py-2 border-r"></th>
              <th className="px-4 py-2 border-r">Status</th>
              <th className="px-4 py-2 border-r">Request ID</th>
              <th className="px-4 py-2 border-r">Column names</th>
              <th className="px-4 py-2 border-r">Provider</th>
              <th className="px-4 py-2 border-r">Identifier Type</th>
              <th className="px-4 py-2 border-r">Requested</th>
              <th className="px-4 py-2 border-r">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {data.map((item, index) => (
              <tr className="border-b border-gray-200 hover:bg-gray-100">
                <td className="border  px-4 py-2">
                  <span className="relative flex h-3 w-3 mr-2">
                    {item.STATUS === "true" ? (
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
                    ) : (
                      <>
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amaranth-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-amaranth-500"></span>
                      </>
                    )}
                  </span>
                </td>
                <td className="border px-4 py-2  whitespace-nowrap">
                  <span
                    className={`${
                      item.STATUS === "true"
                        ? "bg-green-200 text-green-700"
                        : "bg-amaranth-200 text-amaranth-700 "
                    }   py-1 px-3 rounded-full text-xs`}
                  >
                    {item.STATUS === "true"
                      ? "Approved"
                      : item.STATUS === "false"
                      ? "Rejected"
                      : "In Progress"}
                  </span>
                </td>
                <td className="border px-4 py-2">{item.RUN_ID}</td>
                <td className="border px-4 py-2">{item.COLOUMNS}</td>
                <td className="border px-4 py-2">{item.PROVIDER_NAME}</td>
                <td className="border px-4 py-2">{item.IDENTIFIER_TYPE}</td>
                <td className="border px-4 py-2">
                  <span className="num-2"></span>
                  {handleDate(item.RUN_ID)}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() =>
                      fetchcsvTableData(item.TEMPLATE_NAME, item.RUN_ID)
                    }
                    className={`${
                      item.STATUS === "false"
                        ? "disabled opacity-10 hover:text-inherit"
                        : item.STATUS === "pending"
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
                  <button
                    onClick={() =>
                      downloadFile(item.TEMPLATE_NAME, item.RUN_ID)
                    }
                    className={`${
                      item.STATUS === "false"
                        ? "disabled opacity-10 hover:text-inherit"
                        : item.STATUS === "pending"
                        ? "disabled opacity-10 hover:text-inherit"
                        : " "
                    }  px-2 hover:text-amaranth-600 cursor-pointer`}
                    title="Download file"
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
                        d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="bg-white  bg-opacity-15 backdrop-filter backdrop-blur-lg "
        >
          <div className="flex flex-row justify-between items-start ">
            <div className="flex flex-row items-start justify-center text-amaranth-500 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mt-1 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
              </svg>
              <div className="flex flex-col">
                <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-br from-red-600 to-amaranth-800 uppercase">
                  New enrichment request
                </h3>
                <span className="text-sm mb-4 font-light text-coal">
                  {" "}
                  Please fill in the following details.
                </span>
              </div>
            </div>
            <button className="mt-1" onClick={handleClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form
            className=" my-1 px-7      "
            name="myForm"
            onSubmit={handleSubmit}
          >
            <div>
              <div className="  pb-2 flex flex-col">
                <label className="block text-sm font-medium leading-6 text-amaranth-600 ">
                  Provider name
                </label>
                <select
                  id="provider"
                  name="Provider_Name"
                  required
                  className="bg-transparent block w-full rounded-md border-0 py-1.5 text-amaranth-600  bg-blend-darken    shadow-sm ring-1 ring-inset ring-amaranth-600  placeholder:text-amaranth-600  focus:ring-2 focus:ring-inset focus:ring-amaranth-600  sm:text-sm sm:leading-6"
                  value={formData["Provider_Name"]}
                  onChange={handleSelectProvider}
                >
                  <option value="">Select a provider</option>
                  {providerList?.length > 0 ? (
                    providerList.map((item, index) => (
                      <option key={index} value={item.PROVIDER}>
                        <span className="capitalize"> {item.PROVIDER}</span>
                      </option>
                    ))
                  ) : (
                    <option value="">Loading...</option>
                  )}
                </select>
              </div>

              <div className="mt-2 pb-2 flex flex-col">
                <label className="block text-sm font-medium leading-6 text-amaranth-600 ">
                  Query name{" "}
                </label>
                <select
                  id="selectedTemp"
                  required
                  name="Query_Name"
                  value={formData["Query_Name"]}
                  className="bg-transparent  block w-full rounded-md border-0 py-1.5 text-amaranth-600  bg-blend-darken    shadow-sm ring-1 ring-inset ring-amaranth-600  placeholder:text-amaranth-600  focus:ring-2 focus:ring-inset focus:ring-amaranth-600  sm:text-sm sm:leading-6"
                  onChange={handleSelectedTemp}
                >
                  <option value="">Select a template</option>
                  {templateList?.length > 0 ? (
                    templateList.map((item, index) => (
                      <option key={index} value={item.TEMPLATE_NAME}>
                        {item.TEMPLATE_NAME}
                      </option>
                    ))
                  ) : (
                    <option value="">Loading...</option>
                  )}
                </select>
              </div>

              <div className="mt-2 pb-2 flex flex-col">
                <SelectDropdown
                  title="Columns"
                  mode="multiple"
                  name="Column_Names"
                  value={formData?.Column_Names}
                  placeholder="Select Columns"
                  data={colunms}
                  setValue={(e, value) => {
                    handleChange(e, value);
                  }}
                />

                {/* <label className="block text-sm font-medium leading-6 text-amaranth-600 ">Column name</label>
                <select
                  className="bg-transparent  block w-full rounded-md border-0 py-1.5 text-amaranth-600  bg-blend-darken    shadow-sm ring-1 ring-inset ring-amaranth-600  placeholder:text-amaranth-600  focus:ring-2 focus:ring-inset focus:ring-amaranth-600  sm:text-sm sm:leading-6"
                  multiple
                  name="Column_Names"
                  required
                  onChange={handleSelectChange}
                >
                  {colunms &&
                    colunms.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                </select> */}
              </div>

              <div className="mt-2 pb-21 flex flex-col">
                <label className="block text-sm font-medium leading-6 text-amaranth-600 ">
                  Identifier type
                </label>
                <select
                  name="Attribute_Value"
                  onChange={handleCustomerFormData}
                  required
                  className="bg-transparent  block w-full rounded-md border-0 py-1.5 text-amaranth-600  bg-blend-darken    shadow-sm ring-1 ring-inset ring-amaranth-600  placeholder:text-amaranth-600  focus:ring-2 focus:ring-inset focus:ring-amaranth-600  sm:text-sm sm:leading-6"
                >
                  <option value="">Please select</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="MAID">MAID</option>
                </select>
              </div>

              <div className="mt-2 pb-2 flex flex-col">
                <label className="block text-sm font-medium leading-6 text-amaranth-600 ">
                  Consumer name
                </label>
                <select
                  name="Consumer_Name"
                  onChange={handleCustomerFormData}
                  required
                  className="bg-transparent block w-full rounded-md border-0 py-1.5 text-amaranth-600  bg-blend-darken    shadow-sm ring-1 ring-inset ring-amaranth-600  placeholder:text-amaranth-600  focus:ring-2 focus:ring-inset focus:ring-amaranth-600  sm:text-sm sm:leading-6"
                >
                  <option value="">--Select--</option>
                  {user["name"] === "Hoonartekcons1" && (
                    <option value="Hoonartek">Hoonartek</option>
                  )}
                  {user["name"] === "Hoonartek" && (
                    <option value="Hoonartek">Hoonartek</option>
                  )}
                  {user["name"] === "Hoonartekcons2" && (
                    <option value="Hoonartek">Hoonartek</option>
                  )}
                  {user["name"] === "admin" && (
                    <option value="hoonartek">Hoonartek</option>
                  )}
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  className="my-2 flex w-full justify-center rounded-md bg-amaranth-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amranth-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amaranth-700"
                  type="submit"
                >
                  {loading ? (
                    <CircularProgress
                      style={{
                        width: "24px",
                        height: "24px",
                        color: "#FFFFFF",
                      }}
                    />
                  ) : (
                    "Submit Query"
                  )}
                </button>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
      <Modal
        open={isResultModalOpen}
        onClose={handleResultModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={resultstyle}>
          {!fetchData ? (
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
                  <Table
                    id={TableData?.runId}
                    head={tableHead}
                    rows={tableRows}
                  />
                ) : null}
              </div>
            </div>
          ) : (
            <span className="text-deep-navy flex flex-grow mt-4">
              We are fetching the data you requested: Request Id -
              <strong>{requestId}</strong>
            </span>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Enrichment;
