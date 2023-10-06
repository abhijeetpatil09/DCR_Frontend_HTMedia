import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Box, Modal } from "@mui/material";
import CustomTable from "../../CommonComponent/Table";
import { handleDate } from "../../../utils/commonFunctions";

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
  overflow: "scroll",
};

const MetaAdsAnalytics = ({ runId }) => {
  const state = useSelector((state) => state);
  const user = state && state.user;

  const [metaAdsAnalysisData, setMetaAdsAnalysisData] = useState([]);
  const [noDataFound, setNoDataFound] = useState(false);
  const [viewLogs, setViewLogs] = useState({
    openModal: false,
    queryName: "",
  });

  const [tableHead, setTableHead] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const handleResultModalClose = () => {
    setViewLogs({
      ...viewLogs,
      openModal: false,
      queryName: "",
    });
  };

  useEffect(() => {
    axios
      .get(`${baseURL}/analysis_report`, {
        params: {
          account_name: user?.Consumer,
          run_id: runId,
        },
      })
      .then((response) => {
        if (
          response?.status === 200 &&
          response?.data?.data &&
          response?.data?.data?.length > 0 &&
          response?.data?.data1 &&
          response?.data?.data1?.length > 0
        ) {
          let fetchResult1 = response?.data?.data[0];
          let fetchResult2 = response?.data?.data1[0];
          setMetaAdsAnalysisData({ ...fetchResult1, ...fetchResult2 });
        } else {
          setNoDataFound(true);
        }
      })
      .catch((error) => console.log(error));
  }, [runId, user?.Consumer]);

  const handleLogs = () => {
    setViewLogs({
      ...viewLogs,
      openModal: true,
      status: metaAdsAnalysisData?.STATUS,
    });

    axios
      .get(`${baseURL}/analysis_log_report`, {
        params: {
          account_name: user?.Consumer,
          run_id: runId,
        },
      })
      .then((response) => {
        if (
          response?.status === 200 &&
          response?.data?.data &&
          response?.data?.data?.length > 0
        ) {
          let fetchResult = response?.data?.data;
          setTableHead(["Start Date", "End Date"]);
          let row = [];
          if (fetchResult?.length > 0) {
            let head = fetchResult && Object.keys(fetchResult[0]);
            fetchResult?.map((obj) => {
              return row.push(
                head?.map((key) =>
                  obj[key] !== null ? handleDate(obj[key]) : "NA"
                )
              );
            });
          }
          setTableRows(row);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="p-4">
        {!noDataFound ? (
          <>
            <div className="grid grid-cols-4 gap-4 mt-4">
              <div className="mb-4 bg-white p-4 rounded-lg shadow">
                <label
                  for="campaign_name"
                  className="block text-cement font-bold mb-2"
                >
                  Campaign Name
                </label>
                <input
                  type="text"
                  id="campaign_name"
                  name="campaign_name"
                  value={metaAdsAnalysisData?.campaign_name}
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 bg-cement text-amaranth-900 "
                ></input>
              </div>
              <div className="mb-4 bg-white p-4 rounded-lg shadow">
                <label
                  for="ad_set_name"
                  className="block text-cement font-bold mb-2"
                >
                  Ad Set Name
                </label>
                <input
                  type="text"
                  id="ad_set_name"
                  name="ad_set_name"
                  value={metaAdsAnalysisData?.adset_name}
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 bg-cement text-amaranth-900 "
                ></input>
              </div>
              <div className="mb-4 bg-white p-4 rounded-lg shadow">
                <label
                  for="ad_name"
                  className="block text-cement font-bold mb-2"
                >
                  Ad Name
                </label>
                <input
                  type="text"
                  id="ad_name"
                  name="ad_name"
                  value={metaAdsAnalysisData?.ad_name}
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 bg-cement text-amaranth-900 "
                ></input>
              </div>
              <div className="mb-4 bg-white p-4 rounded-lg shadow">
                <label
                  for="current_status"
                  className="block text-cement font-bold mb-2"
                >
                  Current Status
                </label>
                <input
                  type="text"
                  id="current_status"
                  name="current_status"
                  value={metaAdsAnalysisData?.STATUS}
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 bg-cement text-amaranth-900 "
                ></input>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-4">
              <div className="p-4 border rounded-lg bg-white">
                <div
                  className="bg-orange-500 p-4 text-white text-center "
                  id="clickBox"
                >
                  <p className="text-xl">Click</p>
                </div>
                <div className="bg-white p-4 text-center">
                  <p className="text-xl font-semibold" id="clickCount">
                    {metaAdsAnalysisData?.clicks}
                  </p>
                </div>
              </div>
              <div className="p-4 border rounded-lg bg-white">
                <div
                  className="bg-pink-500 p-4 text-white text-center "
                  id="impressionBox"
                >
                  <p className="text-xl">Impression</p>
                </div>
                <div className="bg-white p-4 text-center">
                  <p className="text-xl font-semibold" id="impressionCount">
                    {metaAdsAnalysisData?.impressions}
                  </p>
                </div>
              </div>
              <div className="p-4 border rounded-lg bg-white">
                <div
                  className="bg-indigo-500 p-4 text-white text-center "
                  id="reachBox"
                >
                  <p className="text-xl">Reach</p>
                </div>
                <div className="bg-white p-4 text-center">
                  <p className="text-xl font-semibold" id="reachCount">
                    {metaAdsAnalysisData?.reach}
                  </p>
                </div>
              </div>
              <div className="p-4 border rounded-lg bg-white">
                <div
                  className="bg-cyan-500 p-4 text-white text-center "
                  id="spendBox"
                >
                  <p className="text-xl">Spend</p>
                </div>
                <div className="bg-white p-4 text-center">
                  <p className="text-xl font-semibold" id="Time_Spend">
                    {metaAdsAnalysisData?.spend}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded"
                onClick={handleLogs}
              >
                Log
              </button>
            </div>
          </>
        ) : (
          <span className="text-amaranth-600 flex flex-grow m-4">
            Please run a Meta Ad's for this Request Id.
          </span>
        )}
      </div>

      {/* Modal for check Logs for Meta Ad's */}
      <Modal
        open={viewLogs.openModal}
        onClose={handleResultModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={resultstyle}>
          <div className=" flex flex-col flex-grow w-full">
            <div className="flex flex-row items-center justify-between sticky z-30 py-2 px-4 top-0 w-full bg-amaranth-800 text-white">
              <h3 className="font-bold text-white">Meta Ad's Logs</h3>
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
                  id={runId}
                  head={tableHead}
                  rows={tableRows}
                  pagination={tableRows?.length < 10 ? "none" : true}
                  status={viewLogs.status}
                />
              ) : null}
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default MetaAdsAnalytics;
