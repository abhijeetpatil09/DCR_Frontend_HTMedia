import React, { useEffect, useState } from "react";
import axios from "axios";
import { getPartOfDay, handleDate } from "../utils/commonFunctions";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import lvideo from "../Assets/DataCleanRoom_video.mp4";
import enrichment from "../Assets/Personal data _Monochromatic.svg";
import match from "../Assets/enrichment.svg";
import analyticsIllustration from "../Assets/Pie chart _Monochromatic.svg";
import adminConsole from "../Assets/Settings_Monochromatic.svg";

import USER_MANUAL_PDF from "../Assets/PDF/User_Manual.pdf";
import DCR_INTRO_PDF from "../Assets/PDF/DCR_Introduction.pdf";
import Provider_Data_Catalog_PDF from "../Assets/PDF/Provider_Data_Catalog.pdf";

const Home = () => {
  const state = useSelector((state) => state);
  const navigate = useNavigate();

  const user = state && state.user;
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/${user?.name}`, {
        params: {
          query:
            "select * from DCR_SAMP_CONSUMER1.PUBLIC.DASHBOARD_TABLE order by RUN_ID desc limit 5;",
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
  }, [user?.name]);

  return (
    <div className="flex flex-row flex-wrap w-full h-full px-5 dark:bg-slate-950 bg-gray-50 pb-10">
      <div className="flex flex-col text-coal w-2/3  ">
        <div className="flex flex-col mt-9 px-6">
          <h1 className="flex text-3xl font-bold text-amaranth-600 capitalize">
            Hi {user.name},{" "}
            <span className="font-light italic">
              {getPartOfDay(new Date())}
            </span>
          </h1>
          <p className="text-gray-600 text-sm pb-2 mb-1">
            Welcome to DataHaven, a certified snowflake partner product.
          </p>
        </div>

        <div className="flex flex-row gap-3 mt-6 mx-3 flex-wrap">
          {user && user?.role.includes("Publisher") && (
            <div className="basis-[48%] relative rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-amaranth-500 p-1 shadow-xl">
              <div className="z-30 flex flex-col justify-between h-full rounded-xl bg-white p-4 sm:p-6 lg:p-8">
                <h3 className="text-lg font-bold text-amaranth-900 sm:text-xl">
                  Match Rate
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Find the Match rate between your's and Provider's data based
                  on a data point(Email/Phone No. etc.,) to run an AD campaign
                  on provider's Ecospace.
                </p>
                <button
                  className="flex w-fit flex-row items-center justify-end text-center mt-6   text-white text-sm rounded-md bg-amaranth-500 px-4 py-2"
                  onClick={() => navigate("/publisherform")}
                >
                  Start Now
                </button>
              </div>
              <img
                className="absolute w-44 z-0 bottom-1 right-2 text-amarant-400"
                src={match}
                alt="match"
              />
            </div>
          )}

          {user.role && user?.role?.includes("Consumer") && (
            <div className="basis-[48%] relative rounded-2xl bg-gradient-to-r from-amaranth-500 via-purple-500 to-indigo-500 p-1 shadow-xl">
              <div className="z-30 flex flex-col justify-between h-full rounded-xl bg-white p-4 sm:p-6 lg:p-8">
                <h3 className="text-lg font-bold text-amaranth-900 sm:text-xl">
                  Customer Enrichment
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Enrich your first hand data with more data points from the
                  provider's Data.
                </p>
                <button
                  className="flex w-fit flex-row items-center justify-end text-center mt-6   text-white text-sm rounded-md bg-amaranth-500 px-4 py-2"
                  onClick={() => navigate("/queryform")}
                >
                  Start Now
                </button>
              </div>

              <img
                className="absolute w-44 z-0 bottom-1  right-2 text-amarant-400"
                src={enrichment}
                alt=""
              />
            </div>
          )}

          {user.role && !user.role?.includes("Provider") && (
            <div className="basis-[48%] relative rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-amaranth-500 p-1 shadow-xl">
              <div
                className="z-30 flex flex-col justify-between h-full rounded-xl bg-white p-4 sm:p-6 lg:p-8"
                href=""
              >
                <h3 className="text-lg font-bold text-amaranth-900 sm:text-xl">
                  Analytics
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Analyze the Match Rate on various Data points for deeper
                  insights on the Provider's Data.
                </p>
                <button
                  className="flex w-fit flex-row items-center justify-end text-center mt-6   text-white text-sm rounded-md bg-amaranth-500 px-4 py-2"
                  onClick={() => navigate("/analytics")}
                >
                  Explore More
                </button>
              </div>
              <img
                className="absolute w-44 z-0 bottom-1  right-2 text-amarant-400"
                src={analyticsIllustration}
                alt=""
              />
            </div>
          )}

          {(user?.role?.includes("Consumer_Admin") ||
            user?.role?.includes("Provider_Admin")) && (
            <div className="basis-[48%] relative rounded-2xl bg-gradient-to-r from-amaranth-500 via-purple-500 to-indigo-500 p-1 shadow-xl">
              <div
                className="z-30 flex flex-col justify-between h-full rounded-xl bg-white p-4 sm:p-6 lg:p-8"
                href="/"
              >
                <h3 className="text-lg font-bold text-amaranth-900 sm:text-xl">
                  Admin Console
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  To Manage Users for your Account, View Itemised Bills,
                  Snowflake Account Credit consumption details etc.
                </p>
                <button
                  className="flex w-fit flex-row items-center justify-end text-center mt-6   text-white text-sm rounded-md bg-amaranth-500 px-4 py-2"
                  onClick={() => navigate("/consumer-admin")}
                >
                  Explore More
                </button>
              </div>
              <img
                className="absolute w-44 z-0 bottom-1  right-2 text-amarant-400"
                src={adminConsole}
                alt=""
              />
            </div>
          )}
        </div>

        <div className="w-full max-w-full px-3 sm:flex-0 shrink-0 sm:w-6/12 lg:w-full hidden">
          <div className="border-black/12.5 shadow-soft-xl dark:bg-gray-950 dark:shadow-soft-dark-xl relative mt-6 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
            <div className="p-4 pb-0 rounded-t-4">
              <h5 className="mb-0 dark:text-white text-amaranth-700">
                Recent requests
              </h5>
            </div>
            <div className="flex-auto p-4">
              <table className="table-auto w-full text-left text-xs">
                <thead>
                  <tr className="bg-amaranth-50 text-amaranth-900 uppercase text-xs leading-normal border-t border-l ">
                    <th className="px-4 py-2 w-4 "></th>
                    <th className="px-4 py-2 border-r">Status</th>
                    <th className="px-4 py-2 border-r">Request ID</th>
                    <th className="px-4 py-2 border-r">Template name</th>
                    <th className="px-4 py-2 border-r">Provider</th>
                    <th className="px-4 py-2 border-r">Requested</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-xs font-light">
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
                      <td className="border px-4 py-2">{item.TEMPLATE_NAME}</td>
                      <td className="border px-4 py-2">{item.PROVIDER_NAME}</td>
                      <td className="border px-4 py-2">
                        <span className="num-2"></span>
                        {handleDate(item.RUN_ID)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 w-1/3">
        <div className="w-full max-w-full px-3 sm:flex-0 shrink-0 sm:w-6/12 lg:w-full">
          <div className="border-black/12.5 shadow-soft-xl dark:bg-gray-950 dark:shadow-soft-dark-xl relative mt-6 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
            <div className="flex p-4 pb-0 rounded-t-4 justify-between">
              <h5 className="mb-0 dark:text-white text-amaranth-700">
                How to videos
              </h5>
              <h5
                className="mb-0 dark:text-white text-amaranth-700 text-sm cursor-pointer"
                onClick={() => navigate("/veiw-all-videos")}
              >
                View All
              </h5>
            </div>
            <div className="flex-auto p-4">
              <video
                width="100%"
                height="240"
                autoPlay
                loop
                muted
                controls
                className="w-full rounded-t-lg"
              >
                <source src={lvideo} type="video/mp4" />
                {/* <source src="movie.ogg" type="video/ogg" /> */}
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
        <div className="w-full max-w-full px-3 sm:flex-0 shrink-0 sm:w-6/12 lg:w-full">
          <div className="border-black/12.5 shadow-soft-xl dark:bg-gray-950 dark:shadow-soft-dark-xl relative mt-6 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
            <div className="flex p-4 pb-0 rounded-t-4 justify-between">
              <h5 className="mb-0 dark:text-white text-amaranth-700">
                Documents
              </h5>
            </div>
            <div className="flex-auto p-4">
              <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                <li className="relative flex justify-between py-2 pr-4 mb-2 border-0 rounded-t-lg rounded-xl text-inherit">
                  <div className="flex items-center">
                    <div className="flex items-center pl-2 w-8 h-8 mr-4 text-center text-white bg-center fill-current stroke-none shadow-soft-2xl bg-gradient-to-tl from-purple-900 to-amaranth-800 dark:bg-gradient-to-tl dark:from-slate-850 dark:to-gray-850 rounded-xl">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 cursor-pointer"
                        onClick={() => window.open(USER_MANUAL_PDF, "_blank")}
                      >
                        <title>View</title>
                        <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
                        <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <h6
                        className="mb-1 leading-normal text-sm text-amaranth-950 dark:text-white cursor-pointer"
                        onClick={() => window.open(USER_MANUAL_PDF, "_blank")}
                      >
                        <span className="font-semibold capitalize">
                          USER MANUAL
                        </span>
                      </h6>
                      <span className="leading-tight text-xs">
                        This is a User Manual document file{" "}
                        <span className="font-semibold"></span>
                      </span>
                    </div>
                  </div>
                </li>

                <li className="relative flex justify-between py-2 pr-4 mb-2 border-0 rounded-t-lg rounded-xl text-inherit">
                  <div className="flex items-center">
                    <div className="flex items-center pl-2 w-8 h-8 mr-4 text-center text-white bg-center fill-current stroke-none shadow-soft-2xl bg-gradient-to-tl from-purple-900 to-amaranth-800 dark:bg-gradient-to-tl dark:from-slate-850 dark:to-gray-850 rounded-xl">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 cursor-pointer"
                        onClick={() => window.open(DCR_INTRO_PDF, "_blank")}
                      >
                        <title>View</title>
                        <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
                        <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <h6
                        className="mb-1 leading-normal text-sm text-amaranth-950 dark:text-white cursor-pointer"
                        onClick={() => window.open(DCR_INTRO_PDF, "_blank")}
                      >
                        <span className="font-semibold capitalize">
                          DCR Introduction
                        </span>
                      </h6>
                      <span className="leading-tight text-xs">
                        This is a DCR Introduction PDF file{" "}
                        <span className="font-semibold"></span>
                      </span>
                    </div>
                  </div>
                </li>

                <li className="relative flex justify-between py-2 pr-4 mb-2 border-0 rounded-t-lg rounded-xl text-inherit">
                  <div className="flex items-center">
                    <div className="flex items-center pl-2 w-8 h-8 mr-4 text-center text-white bg-center fill-current stroke-none shadow-soft-2xl bg-gradient-to-tl from-purple-900 to-amaranth-800 dark:bg-gradient-to-tl dark:from-slate-850 dark:to-gray-850 rounded-xl">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 cursor-pointer"
                        onClick={() =>
                          window.open(Provider_Data_Catalog_PDF, "_blank")
                        }
                      >
                        <title>View</title>
                        <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
                        <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <h6
                        className="mb-1 leading-normal text-sm text-amaranth-950 dark:text-white cursor-pointer"
                        onClick={() =>
                          window.open(Provider_Data_Catalog_PDF, "_blank")
                        }
                      >
                        <span className="font-semibold capitalize">
                          Provider's Data Catalog
                        </span>
                      </h6>
                      <span className="leading-tight text-xs">
                        This is a Provider's Data Catalog PDF File{" "}
                        <span className="font-semibold"></span>
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
