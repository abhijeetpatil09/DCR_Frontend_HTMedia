import React, { useEffect, useState } from "react";
import AWS from "aws-sdk";
import axios from "axios";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  jsonToCsv,
  handleDate,
  downloadFileInCSV,
} from "../utils/commonFunctions";

import * as actions from "../redux/actions/index";
import Table from "./CommonComponent/Table";
import { Box, Modal } from "@mui/material";

const s3 = new AWS.S3({
  accessKeyId: "AKIA57AGVWXYVR36XIEC",
  secretAccessKey: "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",
  // signatureVersion: 'v4',
  region: "ap-south-1",
  // region: 'ap-south-1',
});

const initialState = {
  Query_Name: "",
  Provider_Name: "",
  Column_Names: "",
  Consumer_Name: "",
  File_Name: "",
  Match_Attribute: "",
  Match_Attribute_Value: "",
};

const Publisherform = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const user = state && state.user;
  const TableData =
    state && state.PublisherForm && state.PublisherForm.TableData;
  const requestId =
    state && state.PublisherForm && state.PublisherForm.RequestId;
  const fetchData =
    state && state.PublisherForm && state.PublisherForm.fetchData;

  const [formData, setFormData] = useState({
    ...initialState,
    Provider_Name: user?.name,
    Consumer_Name: "Hoonartek",
  });

  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("age_0_6");

  const [tableHead, setTableHead] = useState([]);
  const [tableRows, setTableRows] = useState([]);

  const [byPassAPICalled, setByPassAPICalled] = useState(false);

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
    width: 400,
    bgcolor: "background.paper",
    p: 4,
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

  useEffect(() => {
    console.log("UseEffect called");
    axios
      .get(`http://127.0.0.1:5000/${user?.name}`, {
        params: {
          query:
            "select * from DCR_SAMP_CONSUMER1.PUBLIC.DASHBOARD_TABLE where TEMPLATE_NAME = 'advertiser_match' order by RUN_ID desc limit 5;",
        },
      })
      .then((response) => setData(response.data.data))
      .catch((error) => console.log(error));
  }, [user?.name, callTable]);

  useEffect(() => {
    if (TableData) {
      setTableHead(TableData?.head || []);
      setTableRows(TableData?.rows || []);
    }
  }, [TableData]);

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

  const handleCustomerFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileInput = (event) => {
    event.preventDefault();
    var fileInput = document.getElementById("myFileInput");
    var file = fileInput.files[0];
    setFormData({ ...formData, File_Name: file.name });
  };

  // const isValidInput = (inputString) => {
  //   const regex = /^[0-9][0-9,-]*[0-9]$/; // regex pattern to match only comma, hyphen, and numeric values and start and end with numeric values
  //   return regex.test(inputString); // returns true if inputString matches the regex pattern, false otherwise
  // };

  const sendEmail = () => {
    // create reusable transporter object using the default SMTP transport
    // let transporter = nodemailer.createTransport({
    //     host: 'smtp.gmail.com',
    //     port: 465,
    //     secure: true, // true for 465, false for other ports
    //     auth: {
    //         user: 'atulkhot07@gmail.com', // your email address
    //         pass: '9975334797' // your email password or app password if using 2-factor authentication
    //     }
    // });

    // // setup email data with unicode symbols
    // let mailOptions = {
    //     from: '"Atul Khot" atulkhot07@gmail.com', // sender address
    //     to: 'atulkhot07@example.com', // list of receivers
    //     subject: 'Hello', // Subject line
    //     text: 'Hello world?', // plain text body
    //     // html: '<b>Hello world?</b>' // html body
    // };

    // // send mail with defined transport object
    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log('Message sent: %s', info.messageId);
    // });
    console.log("into send email method");
  };

  const callByPassAPI = () => {
    setByPassAPICalled(true);
    setTimeout(() => {
      setCallTable(true);
      handleClose();
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
              actions.PublisherForm({
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
            actions.PublisherForm({
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
    const file1 = new File(
      [blob],
      formData["Query_Name"] + "_" + formData["RunId"] + ".csv",
      { type: "text/csv" }
    );

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

    s3.putObject(params, (err, data) => {
      if (err) {
        console.log(err);
      }
    });

    var inputFile = document.getElementById("myFileInput");

    const params2 = {
      // Bucket: 'dcr-poc/query_request',
      Bucket: "dcr-poc",
      Key: "query_request_data/" + inputFile.files[0].name,
      Body: inputFile.files[0],
      // ACL: 'private',
    };

    s3.putObject(params2, (err, data) => {
      if (err) {
        console.log("err", err);
      } else {
        console.log("data", data);
      }
    });

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
    const formData2 = new FormData();
    formData2.append("file", inputFile.files[0]);

    // fetch("http://localhost:5000/upload", {
    //   method: "POST",
    //   body: formData2,
    // })
    //   .then((response) => {
    //     console.log("response upload", response);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    const formData3 = new FormData();
    formData3.append("file", file1);

    // try {
    //   fetch("http://localhost:4040/upload2", {
    //     method: "POST",
    //     body: formData3,
    //   })
    //     .then((response) => {
    //       console.log(response);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // } catch {
    //   console.log("Error in Upload 2")
    // }
  };

  const fetchTable = (data, runId) => {
    console.log(" ~ file: Publisherform.js:383 ~ fetchTable ~ data:", data);
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
    axios
      .get(`http://127.0.0.1:5000/${user?.name}`, {
        params: {
          query: `select * from DCR_SAMP_CONSUMER1.PUBLIC.${templateName}_${runId} limit 1000;`,
        },
      })
      .then((response) => {
        if (response?.data?.data) {
          fetchTable(response?.data?.data, runId);
          toast.success(`Data fetched successfully. Request Id: ${runId}`);
          handleResultModalOpen();
        }
      })
      .catch((error) => {
        console.log("In API catch", error);
      });
  };

  return (
    <div className="flex flex-col  w-full h-screen  ">
      <div className="flex h-12 sticky top-12 px-5  py-2 bg-amaranth-800 flex-row items-center justify-between w-full">
        <h3 className="  text-lg font-light text-white">Match rate</h3>

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
          Create new query
        </button>
      </div>

      <div className="flex flex-col w-full px-5">
        <h1 class=" mt-4 text-xl font-regular text-amaranth-600 pb-2 ">
          Recent requests
        </h1>

        <table className="table-auto w-full text-left text-sm">
          <thead>
            <tr className="bg-amaranth-50 text-amaranth-900 uppercase text-sm leading-normal border-t border-l ">
              <th className="px-4 py-2 w-4 "></th>
              <th className="px-4 py-2 border-r">Status</th>
              <th className="px-4 py-2 border-r">Request ID</th>
              <th className="px-4 py-2 border-r">Template name</th>
              <th className="px-4 py-2 border-r">Provider</th>
              <th className="px-4 py-2 border-r">Requested</th>
              <th className="px-4 py-2 border-r">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {data.map((item, index) => (
              <tr className="border-b border-gray-200 hover:bg-gray-100">
                <td className="border   px-4 py-2">
                  <span class="relative flex h-3 w-3 mr-2">
                    {item.STATUS === "true" ? (
                      <span class="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
                    ) : (
                      <>
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amaranth-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-amaranth-500"></span>
                      </>
                    )}
                  </span>
                </td>
                <td className="border  px-4 py-2  whitespace-nowrap">
                  <span
                    className={`${
                      item.STATUS === "true"
                        ? "bg-green-200 text-green-600"
                        : "bg-amaranth-200 text-amaranth-600 "
                    }   py-1 px-3 rounded-full text-xs`}
                  >
                    {item.STATUS === "true"
                      ? "Approved"
                      : item.STATUS === "false"
                      ? "Rejected"
                      : "In Progress"}
                  </span>
                </td>
                <td className="border   px-4 py-2">{item.RUN_ID}</td>
                <td className="border px-4 py-2">{item.TEMPLATE_NAME}</td>
                <td className="border px-4 py-2">{item.PROVIDER_NAME}</td>
                <td className="border px-4 py-2">
                  <span className="num-2"></span>
                  {handleDate(item.RUN_ID)}
                </td>
                <td className="border border-r-0 px-4 py-2">
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
                    }  px-1 hover:text-amaranth-600`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                      <path
                        fillRule="evenodd"
                        d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
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
                    }  px-1 hover:text-amaranth-600 cursor-pointer`}
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
                  <button
                    className={`${
                      item.STATUS === "false"
                        ? "disabled opacity-10 hover:text-inherit"
                        : item.STATUS === "pending"
                        ? "disabled opacity-10 hover:text-inherit"
                        : " "
                    }  px-1 hover:text-amaranth-600 cursor-pointer`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M9.97.97a.75.75 0 011.06 0l3 3a.75.75 0 01-1.06 1.06l-1.72-1.72v3.44h-1.5V3.31L8.03 5.03a.75.75 0 01-1.06-1.06l3-3zM9.75 6.75v6a.75.75 0 001.5 0v-6h3a3 3 0 013 3v7.5a3 3 0 01-3 3h-7.5a3 3 0 01-3-3v-7.5a3 3 0 013-3h3z" />
                      <path d="M7.151 21.75a2.999 2.999 0 002.599 1.5h7.5a3 3 0 003-3v-7.5c0-1.11-.603-2.08-1.5-2.599v7.099a4.5 4.5 0 01-4.5 4.5H7.151z" />
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
        <Box sx={style}>
          <form
            className="  my-4 px-4 py-2 h-auto  w-80 max-w-xs"
            name="myForm"
            onSubmit={handleSubmit}
          >
            <span className="text-sm mb-4 font-light text-coal">
              Advertiser record match
            </span>
            <div>
              <div className=" mt-2 pb-2 flex flex-col">
                <label>Query Name</label>
                <select
                  name="Query_Name"
                  onChange={handleCustomerFormData}
                  required
                  className="w-full"
                >
                  <option value="">Please select</option>
                  <option value="advertiser_match">Advertiser Match</option>
                </select>
              </div>

              <div className="mt-2 pb-21 flex flex-col">
                <label>Upload File</label>
                <input
                  className="w-full "
                  type="file"
                  id="myFileInput"
                  onChange={handleFileInput}
                  required
                />
              </div>

              <div className="mt-2 pb-21 flex flex-col">
                <label>Identifier Type</label>
                <select
                  name="Column_Names"
                  onChange={handleCustomerFormData}
                  required
                  className="w-full"
                >
                  <option value="">Please select</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="MAID">MAID-WIP</option>
                </select>
              </div>

              <div className="mt-2 pb-21 flex flex-col">
                <label>Match Attribute</label>
                <select
                  name="Match_Attribute"
                  onChange={handleCustomerFormData}
                  required
                  className="w-full"
                >
                  <option value="">Please select</option>
                  <option value="overall">Overall</option>
                  <option value="age">Age</option>
                  <option value="gender">Gender</option>
                </select>
                {formData["Match_Attribute"] === "gender" && (
                  <div className="mt-2 pb-21 flex flex-col">
                    Select Gender
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
                    Select Age
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
                    {/* {TableData.map((item, index) => ( 
                  // console.log
                      <div className="mr-2 border-r " key={index}>{item},</div>
                  ))} */}
                    <Table
                      id={TableData?.runId}
                      head={tableHead}
                      rows={tableRows}
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
    </div>
  );
};

export default Publisherform;
