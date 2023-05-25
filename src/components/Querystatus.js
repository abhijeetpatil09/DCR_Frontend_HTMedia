import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import "./styles.css";
import "./pure-react.css";

const Querystatus = () => {
  const state = useSelector((state) => state);
  const user = state && state.user;

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/${user?.name}`, {
        params: {
          query: "select * from DCR_SAMP_CONSUMER1.PUBLIC.DASHBOARD_TABLE order by RUN_ID desc;",
        },
      })
      .then((response) => setData(response.data.data))
      .catch((error) => console.log(error));
  }, [user?.name]);

  const handleDate = (date) => {
    const dateObj = new Date(date);
    
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");
    const hours = dateObj.getHours().toString().padStart(2, "0");
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    const seconds = dateObj.getSeconds().toString().padStart(2, "0");
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const downloadFile = (TEMPLATE_NAME, RUN_ID) => {
    axios
      .get(`http://127.0.0.1:5000/${user?.name}`, {
        responseType: "arraybuffer",
        params: {
          query: `select * from DCR_SAMP_CONSUMER1.PUBLIC.${TEMPLATE_NAME}_${RUN_ID};`,
        },
      })
      .then((response) => {
        // Convert the response data to a CSV format
        const csvData = new Blob([response.data], {
          type: "text/csv;charset=utf-8;",
        });
        const csvUrl = URL.createObjectURL(csvData);

        const link = document.createElement("a");
        link.setAttribute("href", csvUrl);
        link.setAttribute("download", `${TEMPLATE_NAME}_${RUN_ID}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };

  return (
    <div className=" ">
      <h3 class="my-4 text-xl font-bold bg-white text-deep-navy">
        Query Status
      </h3>
      <table className="w-full">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Template Name</th>
            <th>Provider Name</th>
            <th>Column Names</th>
            <th>Status</th>
            <th>Requested Date & Time</th>
            <th>Download O/P file</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="bg-white px-2 py-1 border-b border-gray-200 hover:bg-gray-500"
            >
              <td>{item.RUN_ID}</td>
              <td>{item.TEMPLATE_NAME}</td>
              <td>{item.PROVIDER_NAME}</td>
              <td>{item.COLOUMNS}</td>
              <td>{item.STATUS === "true" ? "Approved" :item.STATUS === "false" ? "Rejected" : "In Progress"}</td>
              <td>{handleDate(item.RUN_ID)}</td>
              <td>
                <button
                  onClick={() => downloadFile(item.TEMPLATE_NAME, item.RUN_ID)}
                  className={`flex flex-row items-center justify-center ${
                    item.STATUS === "true" && "text-[#0000FF]"
                  }`}
                  disabled={item.STATUS === "false" || item.STATUS === "Rejected"}
                >
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
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                  <span className="pl-2 underline">Download</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Querystatus;