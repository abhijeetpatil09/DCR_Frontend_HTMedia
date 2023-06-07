import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    handleDate,
} from "../utils/commonFunctions";

import { useSelector } from "react-redux";

import bgimage from '../Assets/pexel.jpg';
import lvideo  from '../Assets/DataCleanRoom_video.mp4';
import enrichment  from '../Assets/Personal data _Monochromatic.svg';
import match  from '../Assets/enrichment.svg';
import analyticsIllustration  from '../Assets/Pie chart _Monochromatic.svg';
import adminConsole  from '../Assets/Settings_Monochromatic.svg';

const Home = () => {

    const state = useSelector((state) => state);

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
            <div className="flex flex-col  text-coal w-2/3  ">
                <div className="flex flex-col mt-9 px-6">
                    <h1 className="text-3xl font-bold text-amaranth-600">Hi John, <span className="font-light italic">Good afternoon!</span></h1>
                    <p className="text-gray-600 text-sm pb-2 mb-1">Welcome to DataHaven, a certified snowflake partner product.</p>
                </div>
                <div className="flex flex-row gap-4 mt-6 mx-3">
                    <div className="relative rounded-2xl bg-gradient-to-r from-amaranth-500 via-amranth-500 to-yellow-500 p-1 shadow-xl">
                        <a className="z-30 flex flex-col justify-between h-full rounded-xl bg-white p-4 sm:p-6 lg:p-8" href="">
                            <div className=" ">
                                <h3 className="text-lg font-bold text-amaranth-900 sm:text-xl">
                                    Customer Enrichment
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, adipisci.
                                </p>
                                <button className="flex flex-row items-center justify-end text-center mt-6   text-white text-sm rounded-md bg-amaranth-500 px-4 py-2">
                                    Explore
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                    </svg> */}
                                </button>
                            </div>
                              
                        </a>
                        <img className="absolute w-44 z-0 bottom-1  right-2 text-amarant-400" src= {enrichment} />


                    </div>
                    <div className="relative rounded-2xl bg-gradient-to-r from-yellow-500 via-red-500 to-amaranth-500 p-1 shadow-xl">
                     <a className="z-30 flex flex-col justify-between h-full rounded-xl bg-white p-4 sm:p-6 lg:p-8" href="">
                            <div className=" ">
                                <h3 className="text-lg font-bold text-amaranth-900 sm:text-xl">
                                    Match Rate
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, adipisci.
                                </p>
                                <button className="flex flex-row items-center justify-end text-center mt-6   text-white text-sm rounded-md bg-amaranth-500 px-4 py-2">
                                    Explore
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                    </svg> */}
                                </button>
                            </div>
                              
                        </a>
                        <img className="absolute w-44 z-0 bottom-1  right-2 text-amarant-400" src= {match} />
                    </div>
                </div>
                <div className="flex flex-row gap-4 mt-6 mx-3">
                    <div className="relative rounded-2xl bg-gradient-to-r from-amaranth-500 via-red-500 to-yellow-500 p-1 shadow-xl">
                        <a className="z-30 flex flex-col justify-between h-full rounded-xl bg-white p-4 sm:p-6 lg:p-8" href="">
                            <div className=" ">
                                <h3 className="text-lg font-bold text-amaranth-900 sm:text-xl">
                                    Analytics
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, adipisci.
                                </p>
                                <button className="flex flex-row items-center justify-end text-center mt-6   text-white text-sm rounded-md bg-amaranth-500 px-4 py-2">
                                    Explore
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                    </svg> */}
                                </button>
                            </div>
                              
                        </a>
                        <img className="absolute w-44 z-0 bottom-1  right-2 text-amarant-400" src= {analyticsIllustration} />


                    </div>
                    <div className="relative rounded-2xl bg-gradient-to-r from-yellow-500 via-red-500 to-amaranth-500 p-1 shadow-xl">
                     <a className="z-30 flex flex-col justify-between h-full rounded-xl bg-white p-4 sm:p-6 lg:p-8" href="">
                            <div className=" ">
                                <h3 className="text-lg font-bold text-amaranth-900 sm:text-xl">
                                    Admin Console
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, adipisci.
                                </p>
                                <button className="flex flex-row items-center justify-end text-center mt-6   text-white text-sm rounded-md bg-amaranth-500 px-4 py-2">
                                    Explore
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                    </svg> */}
                                </button>
                            </div>
                              
                        </a>
                        <img className="absolute w-44 z-0 bottom-1  right-2 text-amarant-400" src= {adminConsole} />
                    </div>
                </div>
                
                <div className="w-full max-w-full px-3 sm:flex-0 shrink-0 sm:w-6/12 lg:w-full hidden">
                    <div className="border-black/12.5 shadow-soft-xl dark:bg-gray-950 dark:shadow-soft-dark-xl relative mt-6 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
                        <div className="p-4 pb-0 rounded-t-4"><h5 className="mb-0 dark:text-white text-amaranth-700">Recent requests</h5></div>
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
                                                    className={`${item.STATUS === "true"
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
                        <div className="p-4 pb-0 rounded-t-4">
                            <h5 className="mb-0 dark:text-white text-amaranth-700">How to videos</h5>
                        </div>
                        <div className="flex-auto p-4">
                            <video 
                                width="100%" 
                                height="240" 
                                autoPlay 
                                loop
                                muted 
                                controls 
                                className="w-full rounded-t-lg">
                                <source src={lvideo} type="video/mp4" />
                                {/* <source src="movie.ogg" type="video/ogg" /> */}
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
                <div className="w-full max-w-full px-3 sm:flex-0 shrink-0 sm:w-6/12 lg:w-full">
                    <div className="border-black/12.5 shadow-soft-xl dark:bg-gray-950 dark:shadow-soft-dark-xl relative mt-6 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
                        <div className="p-4 pb-0 rounded-t-4">
                            <h5 className="mb-0 dark:text-white text-amaranth-700">Documents</h5>
                        </div>
                        <div className="flex-auto p-4">
                            <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                                <li className="relative flex justify-between py-2 pr-4 mb-2 border-0 rounded-t-lg rounded-xl text-inherit">
                                    <div className="flex items-center">
                                        <div className="flex items-center pl-2 w-8 h-8 mr-4 text-center text-white bg-center fill-current stroke-none shadow-soft-2xl bg-gradient-to-tl from-purple-900 to-amaranth-800 dark:bg-gradient-to-tl dark:from-slate-850 dark:to-gray-850 rounded-xl">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                    <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
                                                    <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
                                                </svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <h6 className="mb-1 leading-normal text-sm text-slate-700 dark:text-white">Template 1</h6>
                                            <span className="leading-tight text-xs">About template <span className="font-semibold">346+ downloaded</span></span>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <button className="group ease-soft-in leading-pro text-xs rounded-3.5xl p-1.2 h-6 w-6 mx-0 my-auto inline-block cursor-pointer border-0 bg-transparent text-center align-middle font-bold text-slate-700 shadow-none transition-all dark:text-white"><i className="ni ease-bounce text-3xs group-hover:translate-x-1.25 ni-bold-right transition-all duration-200" aria-hidden="true"></i></button>
                                    </div>
                                </li>
                                <li className="relative flex justify-between py-2 pr-4 mb-2 border-0 rounded-xl text-inherit">
                                    <div className="flex items-center">
                                        <div className="flex items-center pl-2 w-8 h-8 mr-4 text-center text-white bg-center fill-current stroke-none shadow-soft-2xl bg-gradient-to-tl from-purple-900 to-amaranth-800 dark:bg-gradient-to-tl dark:from-slate-850 dark:to-gray-850 rounded-xl">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
                                                <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
                                            </svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <h6 className="mb-1 leading-normal text-sm text-slate-700 dark:text-white">Template 2</h6>
                                            <span className="leading-tight text-xs">About template <span className="font-semibold">346+ downloaded</span></span>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <button className="group ease-soft-in leading-pro text-xs rounded-3.5xl p-1.2 h-6 w-6 mx-0 my-auto inline-block cursor-pointer border-0 bg-transparent text-center align-middle font-bold text-slate-700 shadow-none transition-all dark:text-white"><i className="ni ease-bounce text-3xs group-hover:translate-x-1.25 ni-bold-right transition-all duration-200" aria-hidden="true"></i></button>
                                    </div>
                                </li>
                                <li className="relative flex justify-between py-2 pr-4 border-0 rounded-b-lg rounded-xl text-inherit">
                                    <div className="flex items-center">
                                        <div className="flex items-center pl-2 w-8 h-8 mr-4 text-center text-white bg-center fill-current stroke-none shadow-soft-2xl bg-gradient-to-tl from-purple-900 to-amaranth-800 dark:bg-gradient-to-tl dark:from-slate-850 dark:to-gray-850 rounded-xl">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
                                                <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
                                            </svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <h6 className="mb-1 leading-normal text-sm text-slate-700 dark:text-white">Document 3</h6>
                                            <span className="leading-tight text-xs">About template <span className="font-semibold">346+ downloaded</span></span>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <button className="group ease-soft-in leading-pro text-xs rounded-3.5xl p-1.2 h-6 w-6 mx-0 my-auto inline-block cursor-pointer border-0 bg-transparent text-center align-middle font-bold text-slate-700 shadow-none transition-all dark:text-white"><i className="ni ease-bounce text-3xs group-hover:translate-x-1.25 ni-bold-right transition-all duration-200" aria-hidden="true"></i></button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Home