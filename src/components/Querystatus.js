import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";


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
    <div className="flex flex-col w-full ">
      <div className="flex h-12 sticky top-12 z-30 px-5  py-2 bg-amaranth-800 flex-row items-center justify-between w-full">
        <h3 className="  text-lg font-light text-white">Query status</h3>


      </div>
      <div className="flex flex-col w-full px-5 mt-4">
     
        <table className="table-auto w-full text-left text-sm">
          <thead>
            <tr className="bg-amaranth-50 text-amaranth-900 uppercase text-sm leading-normal border-t border-l ">
              <th className="px-4 py-2 w-4 ">Request ID</th>
              <th className="px-4 py-2 border-r">Template Name</th>
              <th className="px-4 py-2 border-r">Provider Name</th>
              <th className="px-4 py-2 border-r">Column Names</th>
              <th className="px-4 py-2 border-r">Status</th>
              <th className="px-4 py-2 border-r">Requested</th>
              <th className="px-4 py-2 border-r">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {data.map((item, index) => (
               <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
               
                <td className="border  px-4 py-2">{item.RUN_ID}</td>
                <td className="border border-l-0 px-4 py-2">{item.TEMPLATE_NAME}</td>
                <td className="border border-l-0 px-4 py-2">{item.PROVIDER_NAME}</td>
                <td className="border border-l-0 px-4 py-2">{item.COLOUMNS}</td>

                <td className="border border-l-0 px-4 py-2">
                  <span className={`${item.STATUS === "true" ? "bg-green-200 text-green-600": "bg-amaranth-200 text-amaranth-600"}  py-1 px-3 rounded-full text-xs`}>{item.STATUS === "true" ? "Approved" : "Rejected"}</span>
                </td>
                <td className="border border-l-0 px-4 py-2">{handleDate(item.RUN_ID)}</td>
                <td className="border border-l-0 px-4 py-2">
                  {/* <button
                    onClick={() => downloadFile(item.TEMPLATE_NAME, item.RUN_ID)}
                    className={`flex flex-row items-center justify-center ${
                      item.STATUS === "true" && "text-[#0000FF]"
                    }`}
                    disabled={item.STATUS === "false"}
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
                  </button> */}
                  <button 
                  
                    onClick={() => downloadFile(item.TEMPLATE_NAME, item.RUN_ID)}
                    className="px-1 hover:text-amaranth-600"
                    disabled={item.STATUS === "false"}

                    >

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v4.59L7.3 9.24a.75.75 0 00-1.1 1.02l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V6.75z" clipRule="evenodd" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
            console.log("🚀 ~ file: Querystatus.js:133 ~ Querystatus ~ map:", map)
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Querystatus;