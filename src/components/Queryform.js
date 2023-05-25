import React, { useEffect, useState } from "react";
import AWS from "aws-sdk";
import axios from "axios";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import QueryModal from './CommonComponent/QueryModal'
import * as actions from "../redux/actions/index";

import Table from "./CommonComponent/Table";
import "./styles.css";
import "./pure-react.css";
import { Box, Button, Modal, Typography } from "@mui/material";

const initialState = {
  Query_Name: "",
  Provider_Name: "",
  Column_Names: "",
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

const Queryform = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const user = state && state.user;
  const TableData = state && state.ConsumerForm && state.ConsumerForm.TableData;
  const requestId = state && state.ConsumerForm && state.ConsumerForm.RequestId;
  const fetchData = state && state.ConsumerForm && state.ConsumerForm.fetchData;

  const [formData, setFormData] = useState(initialState);
  const [tableHead, setTableHead] = useState([]);
  const [tableRows, setTableRows] = useState([]);


  const [openModal, setOpenModal] = useState(false);
  const handleModal = () => {

    setOpenModal(!openModal);

  }

  // MUI Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [providerList, setProviderList] = useState([]);
  const [templateList, setTemplateList] = useState("");
  const [databaseName, setDatabaseName] = useState("");
  const [colunms, setColumns] = useState([]);
  const [byPassAPICalled, setByPassAPICalled] = useState(false);

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
            console.log("Template list", response?.data);
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
            query: `select dimensions from ${databaseName}.CLEANROOM.TEMPLATES where template_name='${formData["Query_Name"]}';`,
          },
        })
        .then((response) => {
          if (response?.data) {
            console.log("response?.data", response?.data);
            let col_name = response?.data?.data[0]?.DIMENSIONS?.split("|");
            col_name = col_name?.map((item) => {
              return item?.split(".")[1];
            });
            console.log("col_name", col_name);

            setColumns(col_name);
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

  const callByPassAPI = () => {
    setByPassAPICalled(true);
    setTimeout(() => {
      axios
        .get(`http://127.0.0.1:5000/${user?.name}`, {
          params: {
            query: `call DCR_SAMP_CONSUMER1.PUBLIC.PROC_BYPASS();`,
          },
        })
        .then((response) => {
          if (response) {
            fetchcsvTableData();
            setByPassAPICalled(false);
          } else {
            setByPassAPICalled(false);
            dispatch(
              actions.ConsumerQueryForm({
                fetchData: false
              })
            );
          }
        })
        .catch((error) => {
          console.log(error);
          setByPassAPICalled(false);
          dispatch(
            actions.ConsumerQueryForm({
              fetchData: false
            })
          );
        });
    }, 5000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (byPassAPICalled) {
      toast.error("We are fetching the data for current request. Please wait...");
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
              fetchData: true
            })
          );
          callByPassAPI();
        }
      })
      .catch((error) => {
        console.log(error);
      });
    handleClose();
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
        TableData: { head: head, rows: row },
        fetchData: false
      })
    );
  };

  const fetchcsvTableData = async () => {
    axios
      .get(`http://127.0.0.1:5000/${user?.name}`, {
        params: {
          query: `select * from DCR_SAMP_CONSUMER1.PUBLIC.${formData?.Query_Name}_${formData?.RunId} limit 1000;`,
        },
      })
      .then((response) => {
        if (response?.data?.data) {
          fetchTable(response?.data?.data, formData?.RunId);
          toast.success(`Data fetched successfully. Request Id: ${formData?.RunId}`);
        }
      })
      .catch((error) => {
        console.log("In API catch", error);
      });

  };

  return (
    <div className="flex flex-col w-full h-screen ">
      <div className="flex h-12 sticky top-12 px-5  py-2 bg-amaranth-800 flex-row items-center justify-between w-full">
        <h3 className="  text-lg font-light text-white">Customer enrichment</h3>

        <button
          onClick={handleOpen}
          className="flex items-center px-2 py-2  text-sm text-white bg-amaranth-600 rounded-md   hover:bg-amaranth-700  ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
          Create new query
        </button>

      </div>
      <div className="flex flex-col w-full px-5">
        <h1 class=" mt-4 text-xl font-regular text-amaranth-600 pb-2 ">Recent requests</h1>

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

            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="border border-l-0 px-4 py-2">
                <span class="relative flex h-3 w-3 mr-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                </span>
              </td>
              <td className="border border-l-0 px-4 py-2  whitespace-nowrap">
                <span class="bg-blue-200 text-blue-600 py-1 px-3 rounded-full text-xs">Active</span></td>
              <td className="border border-l-0 px-4 py-2">1691891590841</td>
              <td className="border border-l-0 px-4 py-2">Customer enrichment</td>
              <td className="border border-l-0 px-4 py-2">Hoonartek</td>
              <td className="border border-l-0 px-4 py-2"><span className="num-2">32</span> minutes ago</td>
              <td className="border border-l-0 border-r-0 px-4 py-2">
                <button className="px-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                    <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="px-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v4.59L7.3 9.24a.75.75 0 00-1.1 1.02l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V6.75z" clipRule="evenodd" />
                  </svg>
                </button>
              </td>

            </tr>
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="border border-l-0 px-4 py-2">
                <span class="relative flex h-3 w-3 mr-2">
                  {/* <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span> */}
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-amaranth-500"></span>
                </span>
              </td>
              <td className="border border-l-0 px-4 py-2  whitespace-nowrap">
                <span class="bg-amaranth-200 text-amaranth-600 py-1 px-3 rounded-full text-xs">Approved</span></td>
              <td className="border border-l-0 px-4 py-2">1685008890370</td>
              <td className="border border-l-0 px-4 py-2">Customer enrichment</td>
              <td className="border border-l-0 px-4 py-2">Hoonartek</td>
              <td className="border border-l-0 px-4 py-2"><span className="num-2">42</span> minutes ago</td>
              <td className="border border-l-0 border-r-0 px-4 py-2">
                <button className="px-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                    <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="px-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v4.59L7.3 9.24a.75.75 0 00-1.1 1.02l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V6.75z" clipRule="evenodd" />
                  </svg>

                </button>
              </td>
            </tr>
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="border border-l-0 px-4 py-2">
                <span class="relative flex h-3 w-3 mr-2">
                  {/* <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span> */}
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-amaranth-500"></span>
                </span>
              </td>
              <td className="border border-l-0 px-4 py-2  whitespace-nowrap">
                <span class="bg-amaranth-200 text-amaranth-600 py-1 px-3 rounded-full text-xs">Approved</span></td>
              <td className="border border-l-0 px-4 py-2">1685008890370</td>
              <td className="border border-l-0 px-4 py-2">Customer enrichment</td>
              <td className="border border-l-0 px-4 py-2">Hoonartek</td>
              <td className="border border-l-0 px-4 py-2"><span className="num-2">2</span> days ago</td>
              <td className="border border-l-0 border-r-0 px-4 py-2">
                <button className="px-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                    <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="px-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v4.59L7.3 9.24a.75.75 0 00-1.1 1.02l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V6.75z" clipRule="evenodd" />
                  </svg>

                </button>
              </td>
            </tr>
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="border border-l-0 px-4 py-2">
                <span class="relative flex h-3 w-3 mr-2">
                  {/* <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span> */}
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              </td>
              <td className="border border-l-0 px-4 py-2  whitespace-nowrap">
                <span class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">Completed</span></td>
              <td className="border border-l-0 px-4 py-2">1685008777027</td>
              <td className="border border-l-0 px-4 py-2">Customer enrichment	</td>
              <td className="border border-l-0 px-4 py-2">Hoonartek</td>
              <td className="border border-l-0 px-4 py-2"><span className="num-2">3</span> days ago</td>
              <td className="border border-l-0 border-r-0 px-4 py-2">
                <button className="px-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                    <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="px-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v4.59L7.3 9.24a.75.75 0 00-1.1 1.02l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V6.75z" clipRule="evenodd" />
                  </svg>

                </button>
              </td>
            </tr>
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="border border-l-0 px-4 py-2">
                <span class="relative flex h-3 w-3 mr-2">
                  {/* <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span> */}
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              </td>
              <td className="border border-l-0 px-4 py-2  whitespace-nowrap">
                <span class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">Completed</span></td>
              <td className="border border-l-0 px-4 py-2">1684996564070</td>
              <td className="border border-l-0 px-4 py-2">Customer enrichment	</td>
              <td className="border border-l-0 px-4 py-2">Hoonartek</td>
              <td className="border border-l-0 px-4 py-2"><span className="num-2">4</span> days ago</td>
              <td className="border border-l-0 border-r-0 px-4 py-2">
                <button className="px-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                    <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="px-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v4.59L7.3 9.24a.75.75 0 00-1.1 1.02l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V6.75z" clipRule="evenodd" />
                  </svg>

                </button>
              </td>
            </tr>


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
            className=" my-4 px-4 py-2   w-80 max-w-xs"
            name="myForm"
            onSubmit={handleSubmit}
          >
            <span className="text-sm mb-4 font-light text-coal">
              Query request
            </span>
            <div>
              <div className="mt-2 pb-2 flex flex-col">
                <label>Provider name</label>
                <select
                  id="provider"
                  name="Provider_Name"
                  required
                  className="w-full"
                  value={formData["Provider_Name"]}
                  onChange={handleSelectProvider}
                >
                  <option value="">Select a provider</option>
                  {providerList?.length > 0 ? (
                    providerList.map((item, index) => (
                      <option  key={index} value={item.PROVIDER}>
                          <span className="capitalize"> {item.PROVIDER}</span> 
                      </option>
                    ))
                  ) : (
                    <option value="">Loading...</option>
                  )}
                </select>
              </div>

              <div className="mt-2 pb-2 flex flex-col">
                <label>Query name </label>
                <select
                  id="selectedTemp"
                  required
                  name="Query_Name"
                  value={formData["Query_Name"]}
                  className="w-full"
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
                <label>Column name</label>
                <select
                  className="w-full"
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
                </select>
              </div>

              <div className="mt-2 pb-21 flex flex-col">
                <label>Identifier type</label>
                <select
                  name="Attribute_Value"
                  onChange={handleCustomerFormData}
                  required
                  className="w-full"
                >
                  <option value="">Please select</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="MAID">MAID</option>
                </select>
              </div>

              <div className="mt-2 pb-2 flex flex-col">
                <label>Consumer name</label>
                <select
                  name="Consumer_Name"
                  onChange={handleCustomerFormData}
                  required
                  className="w-full"
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
                  Submit query
                </button>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
      <div className="flex flex-row  gap-3  w-full px-5">

        {!fetchData ? (
          <div className=" flex flex-grow">
            {tableHead?.length > 0 && tableRows?.length > 0 ? (
              <Table id={requestId} head={tableHead} rows={tableRows} />
            ) : null}
          </div>
        ) : (
          <span className="text-deep-navy flex flex-grow mt-4">
            We are fetching the data you requested: Request Id -{" "}
            <strong>{requestId}</strong>
          </span>
        )}
      </div>
    </div>
  );
};

export default Queryform;
