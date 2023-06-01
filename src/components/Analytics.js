import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Tabs, Tab } from "@mui/material";
import BarChartAnalytics from "./CommonComponent/Charts/BarChart";
import PieChartAnalytics from "./CommonComponent/Charts/PieChart";

const ChartPage = () => {
  const state = useSelector((state) => state);
  const user = state && state.user;

  const [activeTab, setActiveTab] = useState("gender");
  const [chartData, setChartData] = useState({
    ageData: [],
    genderData: [],
    total: null,
  });
  const [chartDetails, setChartDetails] = useState({
    runId: "",
    templateName: "",
    chartType: "",
  });

  const handleSelectRunId = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setChartDetails({ ...chartDetails, [inputName]: inputValue });
  };

  const onSubmitRunId = () => {
    if (chartDetails?.runId !== "") {
      axios
        .get(`http://127.0.0.1:5000/${user?.name}`, {
          params: {
            query: `select advertiser_match,age_0_6, age_7_16, age_17_25, age_26_40, age_41_above, male, female from DCR_SAMP_CONSUMER1.PUBLIC.advertiser_match_${chartDetails?.runId}_insights;`,
          },
        })
        .then((response) => {
          if (response?.data?.data) {
            let data = response?.data?.data[0];
            let age_data = [
              { name: "AGE_0_6", value: data?.AGE_0_6 },
              { name: "AGE_7_16", value: data?.AGE_7_16 },
              { name: "AGE_17_25", value: data?.AGE_17_25 },
              { name: "AGE_26_40", value: data?.AGE_26_40 },
              { name: "AGE_41_ABOVE", value: data?.AGE_41_ABOVE },
            ];
            let gender_data = [
              { name: "MALE", value: data?.MALE },
              { name: "FEMALE", value: data?.FEMALE },
            ];
            let total = data?.ADVERTISER_MATCH;
            setChartData({
              ...chartData,
              ageData: age_data,
              genderData: gender_data,
              total: total,
            });
          } else {
            setChartData({
              ...chartData,
              ageData: [],
              genderData: [],
              total: null,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          setChartData({
            ...chartData,
            ageData: [],
            genderData: [],
            total: null,
          });
        });
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  console.log("activeTab", activeTab);

  return (
    <div className="flex flex-col w-full h-full dark:bg-slate-950 bg-gray-50">
       <div className="flex h-12 sticky top-0 z-30 px-5  py-2 bg-amaranth-800 flex-row items-center justify-between w-full">
        <h3 className="  text-lg font-light text-white">Analytics</h3>

      </div>
      
      <div className="flex flex-row justify-start items-center w-full px-4 my-1">
        <div className="w-1/3">
          <label
            htmlFor="uname"
            className="block text-sm font-medium leading-6 text-amaranth-600 "
          >
            Please enter a request id to proceed.
          </label>
          <div className="mt-2 flex">
            <input
              id="runId"
              type="number"
              name="runId"
              placeholder="e.g. 1691891590873"
              onChange={handleSelectRunId}
              required
              className="block w-full rounded-md border-0 py-1.5 text-amaranth-600  bg-blend-darken shadow-sm ring-1 ring-inset ring-amaranth-600  placeholder:text-gray-350  focus:ring-2 focus:ring-inset focus:ring-amaranth-600  sm:text-sm sm:leading-6"
            />
            <button
              type="submit"
              onClick={onSubmitRunId}
              className="px-4 ml-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-amaranth-600 border border-transparent rounded-md active:bg-amaranth-700 focus:outline-none focus:shadow-outline-amaranth hover:bg-amaranth-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>

            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-row px-4">
        {chartData?.genderData?.length > 0 && <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab
            className="text-amaranth-600 !important"
            label="Gender distribution"
            value="gender"
          />
          <Tab
            className="text-amaranth-600 !important"
            label="Age distribution"
            value="age"
          />
        </Tabs>}
      </div>
     
     

      {activeTab === "gender"
        ? chartData?.genderData?.length > 0 && (
            <div className="flex  flex-row  w-full px-4">
              <div className="w-1/2">
                <BarChartAnalytics data={chartData?.genderData} />
              </div>
              <div className="w-1/2">
                <PieChartAnalytics data={chartData?.genderData} />
              </div>
            </div>
          )
        : chartData?.ageData?.length > 0 && (
            <div className="flex  flex-row  w-full px-4">
              <div className="w-1/2">
                <BarChartAnalytics data={chartData?.ageData} />
              </div>
              <div className="w-1/2">
                <PieChartAnalytics data={chartData?.ageData} />
              </div>
            </div>
          )}
    </div>
  );
};

export default ChartPage;
