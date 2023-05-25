import React from "react";
import image from '../Assets/DRC.png';
import lvideo from '../Assets/DataCleanRoom_video.mp4';
// import "./styles.css";
// import "./pure-react.css";

const Home = () => {

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
                <div className="card w-auto border rounded-xl border-stone-300 mt-4 py-2 px-4">
                    <h1 class="   text-2xl font-bold text-amaranth-600 pb-2 ">Recent requests</h1>
 
                    <table className="table-auto w-full text-left text-sm">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="px-4 py-2  "></th>
                                <th className="px-4 py-2 border-r">Status</th>
                                <th className="px-4 py-2 border-r">Request ID</th>
                                <th className="px-4 py-2 border-r">Template name</th>
                                <th className="px-4 py-2 border-r">Provider</th>

                                <th className="px-4 py-2 border-r">Requested</th>

                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">

                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="border border-l-0 px-4 py-2">
                                    <span class="relative flex h-3 w-3 mr-2">
                                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                        <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                                    </span>
                                </td>
                                <td className="border border-l-0 px-4 py-2  whitespace-nowrap">
                                <span class="bg-blue-200 text-blue-600 py-1 px-3 rounded-full text-xs">Active</span></td>
                                <td className="border border-l-0 px-4 py-2">1691891590841</td>
                                <td className="border border-l-0 px-4 py-2">Customer enrichment</td>
                                <td className="border border-l-0 px-4 py-2">Hoonartek</td>
                                <td className="border border-l-0 border-r-0 px-4 py-2"><span className="num-2">32</span> minutes ago</td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="border border-l-0 px-4 py-2">
                                    <span class="relative flex h-3 w-3 mr-2">
                                        {/* <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span> */}
                                        <span class="relative inline-flex rounded-full h-3 w-3 bg-amaranth-500"></span>
                                    </span>
                                </td>
                                <td className="border border-l-0 px-4 py-2  whitespace-nowrap">
                                <span class="bg-amaranth-200 text-amaranth-600 py-1 px-3 rounded-full text-xs">Approved</span></td>
                                <td className="border border-l-0 px-4 py-2">1685008890370</td>
                                <td className="border border-l-0 px-4 py-2">Customer enrichment</td>
                                <td className="border border-l-0 px-4 py-2">Hoonartek</td>
                                <td className="border border-l-0 border-r-0 px-4 py-2"><span className="num-2">42</span> minutes ago</td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="border border-l-0 px-4 py-2">
                                    <span class="relative flex h-3 w-3 mr-2">
                                        {/* <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span> */}
                                        <span class="relative inline-flex rounded-full h-3 w-3 bg-amaranth-500"></span>
                                    </span>
                                </td>
                                <td className="border border-l-0 px-4 py-2  whitespace-nowrap">
                                <span class="bg-amaranth-200 text-amaranth-600 py-1 px-3 rounded-full text-xs">Approved</span></td>
                                <td className="border border-l-0 px-4 py-2">1685008890370</td>
                                <td className="border border-l-0 px-4 py-2">Customer enrichment</td>
                                <td className="border border-l-0 px-4 py-2">Hoonartek</td>
                                <td className="border border-l-0 border-r-0 px-4 py-2"><span className="num-2">2</span> days ago</td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="border border-l-0 px-4 py-2">
                                    <span class="relative flex h-3 w-3 mr-2">
                                        {/* <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span> */}
                                        <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                    </span>
                                </td>
                                <td className="border border-l-0 px-4 py-2  whitespace-nowrap">
                                <span class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">Completed</span></td>
                                <td className="border border-l-0 px-4 py-2">1685008777027</td>
                                <td className="border border-l-0 px-4 py-2">Advertiser match</td>
                                <td className="border border-l-0 px-4 py-2">Hoonartek</td>
                                <td className="border border-l-0 border-r-0 px-4 py-2"><span className="num-2">3</span> days ago</td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="border border-l-0 px-4 py-2">
                                    <span class="relative flex h-3 w-3 mr-2">
                                        {/* <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span> */}
                                        <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                    </span>
                                </td>
                                <td className="border border-l-0 px-4 py-2  whitespace-nowrap">
                                <span class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">Completed</span></td>
                                <td className="border border-l-0 px-4 py-2">1684996564070</td>
                                <td className="border border-l-0 px-4 py-2">Advertiser match</td>
                                <td className="border border-l-0 px-4 py-2">Hoonartek</td>
                                <td className="border border-l-0 border-r-0 px-4 py-2"><span className="num-2">4</span> days ago</td>
                            </tr>
                          

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