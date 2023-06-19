import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

import CommonModal from "../../../CommonComponent/Modal";

const PublisherTemplate = ({ user }) => {
  const [publisherData, setPublisherData] = useState({
    consumer: "",
    template: "",
    column_name: "",
    status: "",
  });

  const [consumers, setConsumers] = useState([]);
  const [templateNames, setTemplateNames] = useState([]);
  const [columns, setColumns] = useState([]);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(!openModal);
  };

  //   UseEffect for Consumer List....

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/Pravin`, {
        params: {
          query:
            "select distinct CONSUMER_NAME from DCR_SAMP_PROVIDER_DB.TEMPLATES.DCR_TEMPLATES;",
        },
      })
      .then((response) => {
        if (response?.data) {
          setConsumers(response?.data?.data);
        } else {
          setConsumers([]);
        }
      })
      .catch((error) => console.log(error));
  }, [user?.name]);

  //   UseEffect for Template List....

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/Pravin`, {
        params: {
          query: `select distinct TEMPLATE_NAME from DCR_SAMP_PROVIDER_DB.TEMPLATES.DCR_TEMPLATES where CONSUMER_NAME = '${publisherData.consumer}';`,
        },
      })
      .then((response) => {
        if (response?.data) {
          setTemplateNames(response?.data?.data);
        } else {
          setTemplateNames([]);
        }
      })
      .catch((error) => console.log(error));
  }, [user?.name, publisherData.consumer]);

  //   UseEffect for Column List....

  useEffect(() => {
    if (publisherData.consumer !== "" && publisherData.template !== "") {
      axios
        .get(`http://127.0.0.1:5000/Pravin`, {
          params: {
            query: `select ALLOWED_COLUMN from DCR_SAMP_PROVIDER_DB.TEMPLATES.DCR_TEMPLATES where TEMPLATE_NAME = '${publisherData.template}' and CONSUMER_NAME = '${publisherData.consumer}';`,
          },
        })
        .then((response) => {
          if (response?.data?.data) {
            let data = response?.data?.data;
            let col_name = data[0]?.ALLOWED_COLUMN?.split("|");
            col_name = col_name?.map((item) => {
              return item?.split(".")[1];
            });
            setColumns(col_name);
          } else {
            setColumns([]);
          }
        })
        .catch((error) => console.log(error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publisherData.consumer, publisherData.template]);

  //   UseEffect for Status buttton Enable/Disable....

  useEffect(() => {
    if (
      publisherData.consumer !== "" &&
      publisherData.template !== "" &&
      publisherData.column_name !== ""
    ) {
      axios
        .get(`http://127.0.0.1:5000/Pravin`, {
          params: {
            query: `select count(*) from DCR_SAMP_PROVIDER_DB.TEMPLATES.DCR_TEMPLATES where TEMPLATE_NAME = '${publisherData.template}' and CONSUMER_NAME = '${publisherData.consumer}' and contains(ALLOWED_COLUMN, '${publisherData.column_name}');`,
          },
        })
        .then((response) => {
          if (response?.data?.data?.length > 0) {
            let data = response?.data?.data;
            console.log("data", Object.values(data[0]));
            setPublisherData({
              ...publisherData,
              status: parseInt(Object.values(data[0])) === 1 ? true : false,
            });
          } else {
            setPublisherData({ ...publisherData, status: "" });
          }
        })
        .catch((error) => console.log(error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    publisherData.consumer,
    publisherData.template,
    publisherData.column_name,
  ]);

  const handleClickYes = () => {
    setOpenModal(!openModal);
    setLoading(true);
    axios
      .get(`http://127.0.0.1:5000/Pravin`, {
        params: {
          query: `insert into DCR_SAMP_PROVIDER_DB.TEMPLATES.JSON_TABLE select PARSE_JSON('
                  {
                     "Consumer_Name": "${publisherData.consumer}",
                     "Template_Name": "${publisherData.template}",
                     "column_name" : "${publisherData.column_name}",
                     "Tag" : "${
                       publisherData.status === true ? "remove" : "add"
                     }"
                  }
                  ');`,
        },
      })
      .then((response) => {
        if (response) {
          callByPass();
        }
      })
      .catch((error) => {
        toast.error("Fetching error...");
        console.log(error);
      });
  };

  const handleSubmit = () => {
    if (
      publisherData.consumer === "" ||
      publisherData.template === "" ||
      publisherData.column_name === ""
    ) {
      return;
    } else {
      setMessage(
        `Are you sure, you want to ${
          publisherData.status === true ? "Remove" : "Add"
        } this Column?`
      );
      setOpenModal(!openModal);
    }
  };

  const callByPass = () => {
    setTimeout(() => {
      axios
        .get(`http://127.0.0.1:5000/Pravin`, {
          params: {
            query: `call DCR_SAMP_PROVIDER_DB.TEMPLATES.PROC_NEW_12();`,
          },
        })
        .then((response) => {
          setLoading(false);
          setPublisherData({
            consumer: "",
            template: "",
            column_name: "",
            status: "",
          });
          toast.success(response?.data?.data?.[0]?.PROC_NEW_12);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }, 2000);
  };

  return (
    <div className="w-2/3">
      <div className="mt-2 pb-21 flex flex-col">
        <label className="block text-sm font-medium leading-6 text-amaranth-600 ">
          Consumer Name
        </label>
        <select
          value={publisherData.consumer}
          onChange={(e) =>
            setPublisherData({
              ...publisherData,
              consumer: e.target.value,
            })
          }
          required
          className="bg-transparent  block w-full rounded-md border-0 py-1.5 text-amaranth-600  bg-blend-darken    shadow-sm ring-1 ring-inset ring-amaranth-600  placeholder:text-amaranth-600  focus:ring-2 focus:ring-inset focus:ring-amaranth-600  sm:text-sm sm:leading-6"
        >
          <option value="">Please select</option>
          {consumers?.map((consumer, index) => (
            <option key={index} value={consumer?.CONSUMER_NAME}>
              {consumer?.CONSUMER_NAME}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-2 pb-21 flex flex-col">
        <label className="block text-sm font-medium leading-6 text-amaranth-600 ">
          Query Name
        </label>
        <select
          value={publisherData.template}
          onChange={(e) =>
            setPublisherData({
              ...publisherData,
              template: e.target.value,
            })
          }
          required
          className="bg-transparent  block w-full rounded-md border-0 py-1.5 text-amaranth-600  bg-blend-darken    shadow-sm ring-1 ring-inset ring-amaranth-600  placeholder:text-amaranth-600  focus:ring-2 focus:ring-inset focus:ring-amaranth-600  sm:text-sm sm:leading-6"
        >
          <option value="">Please select</option>
          {templateNames?.map((template, index) => (
            <option key={index} value={template?.TEMPLATE_NAME}>
              {template?.TEMPLATE_NAME}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-2 pb-21 flex flex-col">
        <label className="block text-sm font-medium leading-6 text-amaranth-600 ">
          Column Name
        </label>
        <select
          value={publisherData.column_name}
          onChange={(e) =>
            setPublisherData({
              ...publisherData,
              column_name: e.target.value,
            })
          }
          required
          className="bg-transparent  block w-full rounded-md border-0 py-1.5 text-amaranth-600  bg-blend-darken    shadow-sm ring-1 ring-inset ring-amaranth-600  placeholder:text-amaranth-600  focus:ring-2 focus:ring-inset focus:ring-amaranth-600  sm:text-sm sm:leading-6"
        >
          <option value="">Please select</option>
          {columns?.map((column, index) => (
            <option key={index} value={column}>
              {column}
            </option>
          ))}
        </select>
      </div>

      {publisherData.status !== "" ? (
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleSubmit}
            className="px-8 bg-amaranth-600 opacity-1 flex items-center py-2 text-sm text-white rounded-md"
          >
            {loading ? (
              <CircularProgress
                style={{
                  width: "20px",
                  height: "20px",
                  color: "#FFFFFF",
                }}
              />
            ) : (
              <span className="ml-2">{`${
                publisherData.status === true ? "Remove" : "Add"
              }`}</span>
            )}
          </button>
        </div>
      ) : null}
      <CommonModal
        open={openModal}
        handleClose={handleCloseModal}
        handleClickYes={handleClickYes}
        message={message}
      />
    </div>
  );
};

export default PublisherTemplate;
