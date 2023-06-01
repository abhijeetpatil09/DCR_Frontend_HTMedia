import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    handleDate,
} from "../utils/commonFunctions";

import { useSelector } from "react-redux";

import bgimage from '../Assets/pexel.jpg';
import lvideo  from '../Assets/DataCleanRoom_video.mp4';


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
        <div className="flex flex-row flex-wrap w-full px-5 dark:bg-slate-950 bg-gray-50 pb-10" style={{height: 'calc[100vh - 90px]'}}>
            <div className="flex flex-col  text-coal w-2/3  ">
                <div className="w-full max-w-full px-3 sm:flex-0 shrink-0 sm:w-4/12 lg:w-full mt-6">
                    <div className="border-black/12.5 shadow-soft-xl dark:bg-gray-950 dark:shadow-soft-dark-xl relative flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border p-4">
                        <div className="relative h-full overflow-hidden rounded-xl   bg-cover" style={{backgroundImage: `url(${bgimage})`}}>
                            <span className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-gray-900 to-slate-800 dark:bg-gradient-to-tl dark:from-slate-850 dark:to-gray-850 opacity-80"></span>
                            <div className="relative z-10 flex-auto h-full p-4">
                                <h6 className="mb-4 font-bold text-white">Hey John!</h6>
                                <p className="mb-4 text-white dark:opacity-60">Welcome to DataHaven. It is built on Snowflake. Snowflake Data Clean Room is a secure multi-party collaboration environment to share data without revealing PII or compromising privacy. </p>
                                <div className="flex">
                                <a className=" flex items-center align-middle active:shadow-soft-xs active:opacity-85 leading-pro text-xs ease-soft-in rounded-full hover:scale-102 mb-0 inline-block cursor-pointer border border-solid border-white/75 bg-white/10 py-3 px-6 text-center align-middle font-bold uppercase text-white shadow-none transition-all hover:border-white hover:bg-transparent hover:text-white hover:opacity-75 hover:shadow-none active:border-white active:bg-white active:text-black hover:active:bg-transparent hover:active:text-white hover:active:opacity-75 hover:active:shadow-none" href="javascript:;">
                                    <span className="text-center">Read More</span>
                                    <i className="ml-1 inline-block text-center leading-normal text-sm fas fa-arrow-right" aria-hidden="true">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                            <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
                                        </svg>

                                    </i>
                                </a></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card w-auto border rounded-xl border-stone-300 mt-4 py-2 px-4 hidden">
                    <h1 className="   text-2xl font-bold text-amaranth-600 pb-2 ">What is Snowflake Data Clean Room?</h1>
                    <section className="pb-2 mb-2 text-gray-500 border-b border-gray-300">
                        <p>Snowflake Data Clean Room is a secure multi-party collaboration
                            environment to share data without revealing PII or compromising privacy.
                        </p>
                    </section>
                    <section className="pb-2 mb-2 text-gray-500">
                        <p>
                            Build your DCR in Snowflake for use cases like a <strong className=" italic">marketing campaign</strong>,<strong className=" italic"> optimizing ad placement</strong>,
                            identifying common transaction patterns to improve fraud detection, etc.
                        </p>
                    </section>


                </div>
                <div className="w-full max-w-full px-3 sm:flex-0 shrink-0 sm:w-6/12 lg:w-full">
                    <div className="border-black/12.5 shadow-soft-xl dark:bg-gray-950 dark:shadow-soft-dark-xl relative mt-6 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
                        <div class="p-4 pb-0 rounded-t-4"><h5 class="mb-0 dark:text-white text-amaranth-700">Recent requests</h5></div>
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