import React from "react";
import lvideo from "../Assets/DataCleanRoom_video.mp4";
import { useNavigate } from "react-router-dom";

const Videos = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-full px-3 sm:flex-0 shrink-0 sm:w-6/12 lg:w-full">
      <div className="border-black/12.5 shadow-soft-xl dark:bg-gray-950 dark:shadow-soft-dark-xl relative flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
        <div className="flex h-12 sticky top-0 z-30 py-2 bg-amaranth-800 flex-row items-center justify-start w-full">
          <div className="text-xl font-bold text-white mx-4 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
              onClick={() => navigate("/home")}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
              />
            </svg>
          </div>
          <h3 className="px-5 text-lg font-light text-white">How to Videos</h3>
        </div>
        <div className="flex-auto p-4">
          <ul className="flex flex-col pl-0 mb-0 rounded-lg">
            <li className="relative flex justify-between py-2 pr-4 mb-2 border-0 rounded-t-lg rounded-xl text-inherit">
              <div className="flex items-center w-1/2">
                <div className="flex-auto p-4">
                  <h2 className="font-semibold">Introduction to DCR</h2>
                  <video
                    width="100%"
                    height="240"
                    loop
                    muted
                    controls
                    className="w-full rounded-t-lg"
                  >
                    <source src={lvideo} type="video/mp4" />
                    {/* <source src="movie.ogg" type="video/ogg" /> */}
                    Your browser does not support the video tag.
                  </video>
                  <p className="mt-2">Video1 Description</p>
                </div>
              </div>

              <div className="flex items-center w-1/2 ml-2">
                <div className="flex-auto p-4">
                  <h2 className="font-semibold">Video 2</h2>
                  <video
                    width="100%"
                    height="240"
                    loop
                    muted
                    controls
                    className="w-full rounded-t-lg"
                  >
                    <source src={lvideo} type="video/mp4" />
                    {/* <source src="movie.ogg" type="video/ogg" /> */}
                    Your browser does not support the video tag.
                  </video>
                  <p className="mt-2">Video2 Description</p>
                </div>
              </div>
            </li>

            <li className="relative flex justify-between py-2 pr-4 mb-2 mt-5 border-0 rounded-t-lg rounded-xl text-inherit">
              <div className="flex items-center w-1/2">
                <div className="flex-auto p-4">
                  <h2 className="font-semibold">Video 3</h2>
                  <video
                    width="100%"
                    height="240"
                    loop
                    muted
                    controls
                    className="w-full rounded-t-lg"
                  >
                    <source src={lvideo} type="video/mp4" />
                    {/* <source src="movie.ogg" type="video/ogg" /> */}
                    Your browser does not support the video tag.
                  </video>
                  <p className="mt-2">Video3 Description</p>
                </div>
              </div>

              <div className="flex items-center w-1/2 ml-2">
                <div className="flex-auto p-4">
                  <h2 className="font-semibold">Video 4</h2>
                  <video
                    width="100%"
                    height="240"
                    loop
                    muted
                    controls
                    className="w-full rounded-t-lg"
                  >
                    <source src={lvideo} type="video/mp4" />
                    {/* <source src="movie.ogg" type="video/ogg" /> */}
                    Your browser does not support the video tag.
                  </video>
                  <p className="mt-2">Video4 Description</p>
                </div>
              </div>
            </li>
            {/* <li className="relative flex justify-between py-2 pr-4 mb-2 border-0 rounded-t-lg rounded-xl text-inherit">
                            <div className="flex items-center">
                                <div className="flex items-center pl-2 w-8 h-8 mr-4 text-center text-white bg-center fill-current stroke-none shadow-soft-2xl bg-gradient-to-tl from-purple-900 to-amaranth-800 dark:bg-gradient-to-tl dark:from-slate-850 dark:to-gray-850 rounded-xl">
                                    <a
                                        href={doc1} type="file/pdf"
                                        download
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-4 h-4"
                                        >
                                            <title>Download Document</title>
                                            <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
                                            <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
                                        </svg>
                                    </a>
                                </div>
                                <div className="flex flex-col">
                                    <h6 className="mb-1 leading-normal text-sm text-slate-700 dark:text-white">
                                        Document 3
                                    </h6>
                                    <span className="leading-tight text-xs">
                                        About document3......{" "}
                                        <span className="font-semibold"></span>
                                    </span>
                                </div>
                            </div>
                        </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Videos;
