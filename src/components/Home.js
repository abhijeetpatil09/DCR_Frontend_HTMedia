import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    handleDate,
} from "../utils/commonFunctions";

import { useSelector } from "react-redux";

import lvideo from '../Assets/DataCleanRoom_video.mp4';


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
        <div className="flex flex-row flex-wrap w-full h-screen px-5">
            <div className="flex flex-col  text-coal w-2/3 px-2">
                <div className="card w-auto border rounded-xl border-stone-300 mt-4 py-2 px-4">
                    <h1 class="   text-2xl font-bold text-amaranth-600 pb-2 ">What is Snowflake Data Clean Room?</h1>
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
                <div className="flex flex-col w-full px-5">
                    <h1 class=" mt-4 text-xl font-regular text-amaranth-600 pb-2 ">
                        Recent requests
                    </h1>

                    <table className="table-auto w-full text-left text-sm">
                        <thead>
                            <tr className="bg-amaranth-50 text-amaranth-900 uppercase text-sm leading-normal border-t border-l ">
                                <th className="px-4 py-2 w-4 "></th>
                                <th className="px-4 py-2 border-r">Status</th>
                                <th className="px-4 py-2 border-r">Request ID</th>
                                <th className="px-4 py-2 border-r">Template name</th>
                                <th className="px-4 py-2 border-r">Provider</th>
                                <th className="px-4 py-2 border-r">Requested</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {data.map((item, index) => (
                                <tr className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="border  px-4 py-2">
                                        <span class="relative flex h-3 w-3 mr-2">
                                            {item.STATUS === "true" ? (
                                                <span class="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
                                            ) : (
                                                <>
                                                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amaranth-400 opacity-75"></span>
                                                    <span class="relative inline-flex rounded-full h-3 w-3 bg-amaranth-500"></span>
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
            <div className="flex flex-col flex-1 w-1/3">
                <div className="card w-auto border rounded-xl border-stone-300 mt-4 py-2 px-4">

                    <h1 class="   text-2xl font-bold text-amaranth-600 pb-2 ">How to videos</h1>
                    <video width="320" height="240" autoPlay muted controls className="w-full rounded-t-lg">
                        <source src={lvideo} type="video/mp4" />
                        {/* <source src="movie.ogg" type="video/ogg" /> */}
                        Your browser does not support the video tag.
                    </video>
                    {/* <iframe className="w-full"  height="240" src="https://www.youtube.com/embed/9PBvVeCQi0w?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
                    <div className="px-2 py-4">
                        <h5 className="text-stone-900 text-xl font-medium mb-2">Hoonartek DCR solution</h5>
                        <p className="text-stone-700 text-base mb-4">
                            A sneak peak into DataHaven.
                        </p>
                        {/* <button type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button> */}
                    </div>
                </div>

            </div>
        </div>
    )

}

export default Home