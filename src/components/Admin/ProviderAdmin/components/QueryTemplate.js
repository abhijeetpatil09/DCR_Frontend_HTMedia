import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

import CommonModal from "../../../CommonComponent/Modal";

const QueryTemplate = ({ user }) => {
  const [queryData, setQueryData] = useState({
    consumer: "",
    template: "",
    status: "",
  });

  const [consumers, setConsumers] = useState([]);
  const [templateNames, setTemplateNames] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/${user?.name}`, {
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

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/${user?.name}`, {
        params: {
          query: `select distinct TEMPLATE_NAME from DCR_SAMP_PROVIDER_DB.TEMPLATES.DCR_TEMPLATES where CONSUMER_NAME = '${queryData.consumer}';`,
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
  }, [user?.name, queryData.consumer]);

  useEffect(() => {
    if (queryData.consumer !== "" && queryData.template !== "") {
      axios
        .get(`http://127.0.0.1:5000/${user?.name}`, {
          params: {
            query: `select TEMPLATE_STATUS from DCR_SAMP_PROVIDER_DB.TEMPLATES.DCR_TEMPLATES where CONSUMER_NAME = '${queryData.consumer}' AND TEMPLATE_NAME = '${queryData.template}';`,
          },
        })
        .then((response) => {
          if (response?.data?.data?.length > 0) {
            setQueryData({
              ...queryData,
              status: response?.data?.data[0]?.TEMPLATE_STATUS,
            });
          } else {
            setQueryData({ ...queryData, status: "" });
          }
        })
        .catch((error) => console.log(error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryData.consumer, queryData.template]);

  const handleClickYes = () => {
    setOpenModal(!openModal);
    setLoading(true);
    axios
      .get(`http://127.0.0.1:5000/${user?.name}`, {
        params: {
          query: `insert into DCR_SAMP_PROVIDER_DB.TEMPLATES.JSON_TABLE select PARSE_JSON('
                  {
                     "Consumer_Name": "${queryData.consumer}",
                     "Template_Name": "${queryData.template}",
                     "Template_Status" : ${
                       queryData.status === true ? "false" : "true"
                     }
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
    if (queryData.consumer === "" || queryData.template === "") {
      return;
    } else {
      setMessage(
        `Are you sure, you want to ${
          queryData.status === true ? "Disable" : "Enable"
        } this template?`
      );
      setOpenModal(!openModal);
    }
  };

  const callByPass = () => {
    setTimeout(() => {
      axios
        .get(`http://127.0.0.1:5000/${user?.name}`, {
          params: {
            query: `CALL DCR_SAMP_PROVIDER_DB.TEMPLATES.UPDATETEMPLATESTATUS();`,
          },
        })
        .then((response) => {
          setLoading(false);
          setQueryData({ consumer: "", template: "", status: "" });
          toast.success(response?.data?.data?.[0]?.UPDATETEMPLATESTATUS);
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
          value={queryData.consumer}
          onChange={(e) =>
            setQueryData({ ...queryData, consumer: e.target.value })
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
          value={queryData.template}
          onChange={(e) =>
            setQueryData({ ...queryData, template: e.target.value })
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

      {queryData.status !== "" ? (
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
                queryData.status === true ? "Disable" : "Enable"
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

export default QueryTemplate;
