import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { Box, Modal } from "@mui/material";
import { Steps } from "intro.js-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { handleDate, isObjectEmpty } from "../utils/commonFunctions";

import * as actions from "../redux/actions/index";
import Table from "./CommonComponent/Table";
import match from "../Assets/enrichment.svg";
import email from "../Assets/Personal data _Monochromatic.svg"
import CommonModal from "./CommonComponent/Modal";
import SampTemp from "../Assets/CSVTemplates/Sample_template.xlsx";
import "intro.js/introjs.css";

const MatchRate = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = state && state.user;
  const TableData =
    state && state.PublisherForm && state.PublisherForm.TableData;
  const requestId =
    state && state.PublisherForm && state.PublisherForm.RequestId;
  const fetchData =
    state && state.PublisherForm && state.PublisherForm.fetchData;
  const SampleFileData =
    state && state.ConsumerForm && state.ConsumerForm.SampleFileData;

  const [formData, setFormData] = useState({
    Query_Name: "advertiser_match",
    Provider_Name: "",
    Consumer_Name: user?.Consumer,
    Column_Names: "",
    File_Name: "",
    Match_Attribute: "",
    Match_Attribute_Value: "",
    file: "",
  });

  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("age_0_6");
  const [byPassAPICalled, setByPassAPICalled] = useState(false);
  const [note, setNote] = useState("");
  const [tableHead, setTableHead] = useState([]);
  const [tableRows, setTableRows] = useState([]);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  // Modal style
  const resultstyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "95%",
    maxHeight: "90%",
    bgcolor: "background.paper",
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
  const handleClose = () => {
    setLoading(false);
    setOpen(false);
    setErrorMessage("");
  };

  const [requestFailedReason, setRequestFailedReason] = React.useState({
    openModal: false,
    message: "",
  });

  // Result Modal
  const [isResultModalOpen, toggleResultModal] = React.useState(false);
  const handleResultModalOpen = () => toggleResultModal(true);
  const handleResultModalClose = () => toggleResultModal(false);

  // Sample Data Modal
  const [sampleData, setOpenSampleData] = useState(false);
  const handleSampleDataClose = () => {
    setOpenSampleData(!sampleData);
  };

  const [disableTemplate, setDisableTemplate] = useState(false);
  const handleCloseDisableTemplate = () => {
    setDisableTemplate(!disableTemplate);
  };

  // useEffect for set match attribute values..
  useEffect(() => {
    if (formData["Match_Attribute"] === "gender") {
      setFormData({
        ...formData,
        Match_Attribute_Value: gender,
      });
    } else if (formData["Match_Attribute"] === "age") {
      setFormData({
        ...formData,
        Match_Attribute_Value: age,
      });
    } else if (formData["Match_Attribute"] === "overall") {
      setFormData({
        ...formData,
        Match_Attribute_Value: "overall",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [age, formData?.Match_Attribute, gender]);

  const [data, setData] = useState([]);

  // UseEffect used for Inserting the Provider...

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/${user?.name}`, {
        params: {
          query: "select provider from DCR_SAMP_CONSUMER1.PUBLIC.PROV_DETAILS;",
        },
      })
      .then((response) => {
        if (response?.data?.data) {
          let provider_name = response?.data?.data?.[0];
          setFormData({ ...formData, Provider_Name: provider_name.PROVIDER });
        }
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.name]);

  const createNewRequest = () => {
    if (formData.Consumer_Name !== "" && formData.Query_Name !== "") {
      axios
        .get(`http://127.0.0.1:5000/${user.name}`, {
          params: {
            query: `select TEMPLATE_STATUS from DCR_PROVIDER2.CLEANROOM.TEMPLATES where CONSUMER_NAME = '${formData.Consumer_Name}' AND TEMPLATE_NAME = '${formData.Query_Name}';`,
          },
        })
        .then((response) => {
          if (response?.data?.data?.length > 0) {
            let status = response?.data?.data[0]?.TEMPLATE_STATUS;
            if (status) {
              setOpen(!open);
            } else {
              setDisableTemplate(!disableTemplate);
            }
          } else {
            setDisableTemplate(!disableTemplate);
          }
        })
        .catch((error) => {
          setDisableTemplate(!disableTemplate);
          console.log(error);
        });
    }
  };

  const fetchMainTable = () => {
    axios
      .get(`http://127.0.0.1:5000/${user?.name}`, {
        params: {
          query:
            "select * from DCR_SAMP_CONSUMER1.PUBLIC.DASHBOARD_TABLE where TEMPLATE_NAME = 'ADVERTISER MATCH' order by RUN_ID desc limit 5;",
        },
      })
      .then((response) => setData(response.data.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    let intervalId;
    if (byPassAPICalled === true) {
      intervalId = setInterval(() => {
        fetchMainTable();
      }, 5000);
    }
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [byPassAPICalled]);


  useEffect(() => {
    if (TableData) {
      setTableHead(TableData?.head || []);
      setTableRows(TableData?.rows || []);
    }
  }, [TableData]);

  // const downloadFile = (TEMPLATE_NAME, RUN_ID) => {
  //   axios
  //     .get(`http://127.0.0.1:5000/${user?.name}`, {
  //       responseType: "json",
  //       params: {
  //         query: `select * from DCR_SAMP_CONSUMER1.PUBLIC.${TEMPLATE_NAME}_${RUN_ID};`,
  //       },
  //     })
  //     .then((response) => {
  //       if (response?.data) {
  //         const csvData = jsonToCsv(response?.data); // Create a Blob from the CSV data
  //         downloadFileInCSV(csvData, TEMPLATE_NAME, RUN_ID);
  //       } else {
  //         console.log("File cannnot be downloaded...");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  const handleCustomerFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileInput = (event) => {
    event.preventDefault();
    var fileInput = document.getElementById("myFileInput");
    var file = fileInput?.files[0];
    setFormData({ ...formData, file: file });
  };

  // const isValidInput = (inputString) => {
  //   const regex = /^[0-9][0-9,-]*[0-9]$/; // regex pattern to match only comma, hyphen, and numeric values and start and end with numeric values
  //   return regex.test(inputString); // returns true if inputString matches the regex pattern, false otherwise
  // };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/${user?.name}`, {
        params: {
          query:
            "select * from DCR_SAMP_CONSUMER1.PUBLIC.DASHBOARD_TABLE where TEMPLATE_NAME = 'ADVERTISER MATCH' order by RUN_ID desc limit 5;",
        },
      })
      .then((response) => setData(response.data.data))
      .catch((error) => console.log(error));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const callByPassAPI = () => {
    setByPassAPICalled(true);
    // fetchMainTable();
    handleClose();
    axios
      .get(`http://127.0.0.1:5000/${user?.name}/procedure`, {
        params: {
          query: `call DCR_SAMP_CONSUMER1.PUBLIC.PROC_BYPASS_1();`,
        },
      })
      .then((response) => {
        if (response) {
          setByPassAPICalled(false);
          fetchMainTable();
        } else {
          setByPassAPICalled(false);
          fetchMainTable();
          dispatch(
            actions.PublisherForm({
              fetchData: false,
            })
          );
        }
      })
      .catch((error) => {
        console.log(error);
        setByPassAPICalled(false);
        fetchMainTable();
        dispatch(
          actions.PublisherForm({
            fetchData: false,
          })
        );
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true);

    formData.RunId = Date.now();

    // Upload file in Local uploadedFiles folder..
    const fileName = `${formData.RunId + "." + formData?.file?.name?.split(".")[1]
      }`;
    const modifiedFile = new File([formData?.file], fileName, {
      type: formData?.file.type,
    });
    formData.File_Name = fileName;
    formData.file = modifiedFile;
    const localFile = new FormData();

    localFile.append("myFile", modifiedFile);

    axios.post("http://localhost:8000/api/localFileUpload", localFile, {
      headers: {
        "content-type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    });

    axios
      .get(`http://127.0.0.1:5000/${user?.name}/attachment`, {
        params: {
          filename: `${formData.File_Name}`,
          identifyer: `${formData.Column_Names.toUpperCase()}`
        },
      })
      .then((response) => {
        if (response?.data?.data === true) {
          fetchMainTable();
          axios
            .get(`http://127.0.0.1:5000/${user?.name}`, {
              params: {
                query: `insert into DCR_SAMP_CONSUMER1.PUBLIC.dcr_query_request1(template_name,provider_name,columns,consumer_name,run_id,file_name,attribute_name,attribute_value) values ('${formData.Query_Name}', '${formData.Provider_Name}','${formData.Column_Names}','${formData.Consumer_Name}','${formData.RunId}', '${formData.File_Name}','${formData.Match_Attribute}','${formData.Match_Attribute_Value}');`,
              },
            })
            .then((response) => {
              if (response) {
                dispatch(
                  actions.PublisherForm({
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

        } else {
          fetchMainTable();
          setLoading(false);
          setErrorMessage("The data is not matching with requested Identifier.");

        }

      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage("Something went wrong, please try again later !!!");
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
      actions.PublisherForm({
        TableData: { head: head, rows: row, runId: runId },
        CardData: data,
        fetchData: false,
      })
    );
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

  const callByPassUpload = () => {
    setTimeout(() => {
      fetchMainTable();
      axios
        .get(`http://127.0.0.1:5000/${user?.name}/procedure`, {
          params: {
            query: `call DCR_SAMP_CONSUMER1.PUBLIC.proc_matched_data();`,
          },
        })
        .then((response) => {
          if (response) {
            fetchMainTable();
          }
        })
        .catch((error) => {
          console.log(error);
          fetchMainTable();
        });
    }, 2000);
  };

  const handleUploadData = async (runId) => {
    axios
      .get(`http://127.0.0.1:5000/${user?.name}`, {
        params: {
          query: `select * from DCR_SAMP_CONSUMER1.PUBLIC.DCR_QUERY_REQUEST1 where run_id = '${runId}';`,
        },
      })
      .then((response) => {
        if (response?.data?.data) {
          let data = response?.data?.data?.[0];
          axios
            .get(`http://127.0.0.1:5000/${user?.name}`, {
              params: {
                query: `insert into DCR_SAMP_CONSUMER1.PUBLIC.DEMO_REQUESTS(QUERY_NAME,PROVIDER_NAME,COLUMN_NAMES,CONSUMER_NAME,FILE_NAME, match_attribute,match_attribute_value,Run_id) values ('${data.TEMPLATE_NAME}','${data.PROVIDER_NAME}','${data.COLUMNS}','${data.CONSUMER_NAME}','${data.FILE_NAME}','${data.ATTRIBUTE_NAME}','${data.ATTRIBUTE_VALUE}','${data.RUN_ID}');`,
              },
            })
            .then((response) => {
              if (response) {
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
  };


  const downloadNewFile = () => {
    const link = document.createElement("a");
    link.href = SampTemp;
    link.download = "Sample_Template.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // toast.success(`Sample Template has been downloaded...`);
  };


  /// View the sample data...

  const handleViewSample = () => {
    console.log("isObjectEmpty(SampleFileData)", typeof SampleFileData);
    if (
      SampleFileData &&
      SampleFileData !== "undefined" &&
      !isObjectEmpty(SampleFileData)
    ) {
      setOpenSampleData(true);
    } else {
      axios
        .get(`http://127.0.0.1:5000/${user?.name}`, {
          params: {
            query: "select * from DCR_PROVIDER2.CLEANROOM.CUSTOMERS_SAMPLE_VW;",
          },
        })
        .then((response) => {
          if (response?.data?.data) {
            let head = [];
            let row = [];
            let data = response?.data?.data;
            if (data?.length > 0) {
              head = data && Object.keys(data[0]);
              data?.map((obj) => {
                return row.push(head?.map((key) => obj[key]));
              });
            }
            setOpenSampleData(true);
            dispatch(
              actions.ConsumerQueryForm({
                SampleFileData: { head: head, rows: row },
              })
            );
          }
        })
        .catch((error) => console.log(error));
    }
  };

  // React Intro JS
  const modalRef = useRef();

  const [stepsEnabled, setStepsEnabled] = useState(true);

  const steps = [
    {
      element: "#matchRate",
      intro: "Welcome to Match Rate page.",
    },
    {
      element: "#viewSample",
      intro: "View sample data to have an understanding on the providers data",
    },
    {
      element: "#createNewRequestMatchRate",
      intro: "Click here to create a new request.",
    },
    {
      element: "#modal_mr",
      intro:
        "Select the columns for match rate. You can multiselect. Select Identifier type to do the match. Submit the request.",
      tooltipClass: "customTooltip",
    },
  ];

  const onExit = () => {
    setStepsEnabled(false);
  };

  const stepsRef = useRef();

  const onBeforeChange = (nextStepIndex) => {
    if (nextStepIndex === 2 && !open) {
      setOpen(true);
      stepsRef.current.updateStepElement(nextStepIndex);
    }
    return true;
  };

  const sendEmail = () => {
    setEmailLoading(true);
    axios
      .get(`http://127.0.0.1:5000/mailtoadmin`, {
        params: {
          subject: `${user?.name} wants to explore`,
          message: `Hello,
                        ${user?.name} wants to explore more features of Data Haven. Please connect with ${user?.name} as soon as possible.`,
        },
      })
      .then((response) => {
        if (response) {
          setNote("** Our Expert team will connect with you, very soon. **");
          setEmailLoading(false);
        } else {
          setNote("");
          setEmailLoading(false);
        }
      })
      .catch((error) => console.log(error));
  };


  return (
    <>
      <Steps
        enabled={stepsEnabled}
        steps={steps}
        options={{ hideNext: false }}
        initialStep={0}
        onExit={onExit}
        ref={stepsRef}
        onBeforeChange={onBeforeChange}
      />
      <div id="mr_container" className="flex flex-col  w-full h-full">
        <div className="flex h-12 sticky top-0 px-5  py-2 bg-amaranth-800 flex-row items-center justify-between w-full">
          <h3 id="matchRate" className="text-lg font-light text-white">
            Match rate
          </h3>
          <button
            id="viewSample"
            onClick={handleViewSample}
            className="flex items-center ml-4 px-2 py-2 text-sm text-white bg-amaranth-600 rounded-md hover:bg-amaranth-700  "
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
                d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
              />
            </svg>
            <span className="ml-2">View sample data</span>
          </button>
        </div>
        <div className="relative flex flex-col px-6 py-8   bg-amaranth-50">
          <div className="flex w-2/3 text-gray-500 ">
            <p>
              Find the Match rate between your's and Provider's data based on a
              data point(Email/Phone No. etc.,) to run an AD campaign on
              provider's Ecospace. Select additional Match Atrribute to get more
              insights on your matched data.
            </p>
          </div>
          <div className="flex flex-grow-0 mt-4">
            <button
              id="createNewRequestMatchRate"
              onClick={createNewRequest}
              className=" w-max flex items-center px-2 py-2  text-sm text-white bg-amaranth-600 rounded-md   hover:bg-amaranth-700  "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
              Create new request
            </button>
          </div>
          <img
            className="absolute w-44 z-0 bottom-2  right-2 text-amarant-400"
            src={match}
            alt=""
          />
        </div>
        <div className="flex flex-col w-full px-5">
          <h1 className=" mt-4 text-xl font-regular text-amaranth-600 pb-2 ">
            Recent requests
          </h1>

          <table className="table-auto w-full text-center text-sm">
            <thead>
              <tr className="bg-amaranth-50 text-amaranth-900 uppercase text-sm leading-normal border-t border-l ">
                <th className="px-4 py-2 border-r"></th>
                <th className="px-4 py-2 border-r">Status</th>
                <th className="px-4 py-2 border-r">Request ID</th>
                <th className="px-4 py-2 border-r">Identifier Type</th>
                <th className="px-4 py-2 border-r">Match Attribute</th>
                <th className="px-4 py-2 border-r">Match count</th>
                <th className="px-4 py-2 border-r">Requested</th>
                <th className="px-4 py-2 border-r">Actions</th>
              </tr>
            </thead>
            <tbody className="text-amaranth-950 text-sm font-light">
              {data.map((item, index) => (
                <tr
                  key={index}
                  className="text-amaranth-950 border-b border-gray-200 hover:bg-amaranth-50"
                >
                  <td className="border text-amaranth-900 px-4 py-2">
                    <span className="relative flex h-3 w-3 mr-2">
                      {item.STATUS.toLowerCase() === "completed" ? (
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
                      ) : item.STATUS.toLowerCase() === "false" ||
                        item.STATUS.toLowerCase() === "failed" ? (
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-400"></span>
                      ) : (
                        <>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-amaranth-500"></span>
                        </>
                      )}
                    </span>
                  </td>
                  <td className="border px-4 py-2  whitespace-nowrap">
                    <span
                      className={`${
                        item.STATUS.toLowerCase() === "completed" ||
                        item.STATUS.toLowerCase() === "true"
                          ? "bg-green-200 text-green-700"
                          : item.STATUS.toLowerCase() === "failed" ||
                            item.STATUS.toLowerCase() === "false"
                          ? "bg-red-200 text-red-700 "
                          : "bg-amaranth-100 text-amaranth-700 "
                        }   py-1 px-3 rounded-full text-xs`}
                    >
                      {item.STATUS.toLowerCase() === "true"
                        ? "Approved"
                        : item.STATUS.toLowerCase() === "false"
                          ? "Rejected"
                          : item.STATUS}
                    </span>
                  </td>
                  <td className="border px-4 py-2">{item.RUN_ID}</td>
                  <td className="border px-4 py-2">{item.IDENTIFIER_TYPE}</td>
                  <td className="border px-4 py-2">{item.ATTRIBUTE}</td>
                  <td className="border px-4 py-2">{item.MATCH_COUNT}</td>
                  <td className="border px-4 py-2">
                    <span className="num-2"></span>
                    {handleDate(item.RUN_ID)}
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex justify-between">
                      {item.STATUS.toLowerCase() === "failed" ||
                        item.STATUS.toLowerCase() === "false" ? (
                        <button
                          onClick={() =>
                            setRequestFailedReason({
                              ...requestFailedReason,
                              openModal: true,
                              message: item.ERROR,
                            })
                          }
                          className="opacity-1 px-2 hover:text-inherit"
                          title="Request Error"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
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
                            fetchcsvTableData(item.TEMPLATE_NAME, item.RUN_ID)
                          }
                          disabled={item.STATUS.toLowerCase() !== "completed"}
                          className={`${item.STATUS.toLowerCase() === "completed"
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
                      <button
                        onClick={() => handleUploadData(item.RUN_ID)}
                        disabled={
                          item.UPL_INTO_CLI_SPACE?.toLowerCase() === "true" &&
                          item.STATUS?.toLowerCase() === "completed"
                        }
                        className={`${item.UPL_INTO_CLI_SPACE?.toLowerCase() !== "true" &&
                          item.STATUS?.toLowerCase() === "completed"
                          ? "opacity-1 hover:text-inherit"
                          : "disabled opacity-10 hover:text-inherit"
                          }  px-2 hover:text-amaranth-600`}
                        title={
                          item.UPL_INTO_CLI_SPACE?.toLowerCase() === "true"
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {user.role && user?.role?.includes("Publisher") && !user?.role?.includes("Consumer") && (
          <div className="relative flex flex-col mt-6 px-6 py-8   bg-amaranth-50">
            <div className="flex w-2/3 text-gray-500 ">
              <p>
                Want to Explore more features of Datahaven & integrate with
                the provider.
              </p>
            </div>
            <div className="flex flex-grow-0 mt-4">
              {emailLoading ? (
                <CircularProgress
                  style={{
                    width: "24px",
                    height: "24px",
                    color: "amaranth-600",
                  }}
                />) : (
                <button
                  className="w-max flex items-center px-2 py-2  text-sm text-white bg-amaranth-600 rounded-md   hover:bg-amaranth-700"
                  onClick={() => sendEmail()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 mr-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  Click Here
                </button>)

              }
              
            </div>

            <img
              className="absolute w-44 z-0 bottom-2  right-2 text-amarant-400"
              src={email}
              alt=""
            />
            <div className="w-full max-w-full px-3 py-3sm:flex-0 shrink-0 sm:w-6/12 lg:w-full">
              {note !== "" ? (
                <span className="text-amaranth-950 text-sm">{note}</span>
              ) : ""}
            </div>
          </div>

        )}
        <Modal
          ref={modalRef}
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          id="modal_mr"
          container={() => document.getElementById('mr_container')}
        >
          <Box
            sx={style}
            className="bg-white  bg-opacity-75 backdrop-filter backdrop-blur-lg "
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
                    New request
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
                <div className="mt-2 pb-21 flex flex-col">
                  <label className="block text-sm font-medium leading-6 text-amaranth-600 ">
                    Upload File
                  </label>
                  <input
                    // className="my-2 flex w-full justify-center rounded-md bg-amaranth-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amranth-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amaranth-700"
                    className=""
                    type="file"
                    id="myFileInput"
                    onChange={handleFileInput}
                    required
                  />

                </div>
                <div className="mt-2 pb-21 flex flex-col">
                  <button
                    className="flex flex-row text-amaranth-600"
                    onClick={downloadNewFile}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />

                    </svg>
                    <span className="pl-2 underline">Download Template</span>
                  </button>
                </div>

                <div className="mt-2 pb-21 flex flex-col">
                  <label className="block text-sm font-medium leading-6 text-amaranth-600 ">
                    Identifier Type
                  </label>
                  <select
                    name="Column_Names"
                    onChange={handleCustomerFormData}
                    required
                    className="bg-transparent  block w-full rounded-md border-0 py-1.5 text-amaranth-600  bg-blend-darken    shadow-sm ring-1 ring-inset ring-amaranth-600  placeholder:text-amaranth-600  focus:ring-2 focus:ring-inset focus:ring-amaranth-600  sm:text-sm sm:leading-6"
                  >
                    <option value="">Please select</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="MAID">MAID-WIP</option>
                  </select>
                </div>

                <div className="mt-2 pb-21 flex flex-col">
                  <label className="block text-sm font-medium leading-6 text-amaranth-600 ">
                    Match Attribute
                  </label>
                  <select
                    name="Match_Attribute"
                    onChange={handleCustomerFormData}
                    required
                    className="bg-transparent  block w-full rounded-md border-0 py-1.5 text-amaranth-600  bg-blend-darken    shadow-sm ring-1 ring-inset ring-amaranth-600  placeholder:text-amaranth-600  focus:ring-2 focus:ring-inset focus:ring-amaranth-600  sm:text-sm sm:leading-6"
                  >
                    <option value="">Please select</option>
                    <option value="overall">Overall</option>
                    <option value="age">Age</option>
                    <option value="gender">Gender</option>
                  </select>
                  {formData["Match_Attribute"] === "gender" && (
                    <div className="mt-2 pb-21 flex flex-col">
                      <span className="block text-sm font-medium leading-6 text-amaranth-600 ">
                        Select Gender
                      </span>
                      <label>
                        <input
                          type="radio"
                          value="male"
                          checked={gender === "male"}
                          onChange={(e) => setGender(e.target.value)}
                        />
                        <span className="pl-2">Male</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="female"
                          checked={gender === "female"}
                          onChange={(e) => setGender(e.target.value)}
                        />
                        <span className="pl-2">Female</span>
                      </label>
                    </div>
                  )}
                  {formData["Match_Attribute"] === "age" && (
                    <div className="mt-2 pb-21 flex flex-col">
                      <span className="block text-sm font-medium leading-6 text-amaranth-600 ">
                        Select Age
                      </span>
                      <label>
                        <input
                          type="radio"
                          value="age_0_6"
                          checked={age === "age_0_6"}
                          onChange={(e) => setAge(e.target.value)}
                        />
                        <span className="pl-2">0-6</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="age_7_16"
                          checked={age === "age_7_16"}
                          onChange={(e) => setAge(e.target.value)}
                        />
                        <span className="pl-2">7-16</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="age_17_25"
                          checked={age === "age_17_25"}
                          onChange={(e) => setAge(e.target.value)}
                        />
                        <span className="pl-2">17-25</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="age_26_40"
                          checked={age === "age_26_40"}
                          onChange={(e) => setAge(e.target.value)}
                        />
                        <span className="pl-2">26-40</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="age_41_above"
                          checked={age === "age_41_above"}
                          onChange={(e) => setAge(e.target.value)}
                        />
                        <span className="pl-2">41-above</span>
                      </label>
                    </div>
                  )}
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
                <div className="flex justify-center pt-2">
                  {errorMessage !== "" ? (
                    <span className="text-red-600">
                      {errorMessage}
                    </span>
                  ) : (
                    loading && (
                      <span className="text-red-600">
                        Uploading the Attachment. Please wait
                      </span>
                    )
                  )}
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
                    <>
                      <Table
                        id={TableData?.runId}
                        head={tableHead}
                        rows={tableRows}
                        pagination={"none"}
                      />
                    </>
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
        <Modal
          open={sampleData}
          onClose={handleSampleDataClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={resultstyle}>
            <div className=" flex flex-col flex-grow w-full">
              <div className="flex flex-row items-center justify-between sticky z-30 py-2 px-4 top-0 w-full bg-amaranth-800 text-white">
                <h3 className="font-bold text-white">Sample Data</h3>
                <button onClick={handleSampleDataClose}>
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
                {SampleFileData?.head?.length > 0 &&
                  SampleFileData?.rows?.length > 0 ? (
                  <Table
                    head={SampleFileData?.head}
                    rows={SampleFileData?.rows}
                  />
                ) : null}
              </div>
            </div>
          </Box>
        </Modal>
        <Modal
          open={disableTemplate}
          onClose={handleCloseDisableTemplate}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="flex flex-row items-center justify-between sticky z-30 py-2 px-4 top-0 w-full text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-16 h-16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>

              <h3 className="font-bold text-red-600 p-4">
                The Template has been disabled for this Consumer Account. Please
                contact provider.
              </h3>
              <button onClick={handleCloseDisableTemplate}>
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
          </Box>
        </Modal>

        {requestFailedReason.openModal ? (
          <CommonModal
            open={requestFailedReason.openModal}
            handleClose={() =>
              setRequestFailedReason({
                ...requestFailedReason,
                openModal: false,
              })
            }
            message={requestFailedReason.message}
            buttons={false}
            textColor={"text-red-600"}
          />
        ) : null}
      </div>
    </>
  );
};

export default MatchRate;
