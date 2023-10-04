import React, { useRef, useState } from "react";
import video1 from "../Assets/HowToVideos/DataCleanRoom_video.mp4";
import video2 from "../Assets/HowToVideos/Login_Match_Rate_Trim_final.mp4";
import video3 from "../Assets/HowToVideos/Customer_Enrichment.mp4";
import video4 from "../Assets/HowToVideos/Admin_console_status.mp4";
import { useNavigate } from "react-router-dom";

const Videos = () => {
  const navigate = useNavigate();
  const [currentVideo, setCurrentVideo] = useState(-1);

  const videoRefs = [useRef(), useRef(), useRef(), useRef()];

  const playVideo = (index) => {
    if (currentVideo !== index) {
      if (currentVideo !== -1) {
        videoRefs[currentVideo].current.pause();
      }
      setCurrentVideo(index);
      videoRefs[index].current.play();
    }
  };

  const handleVideoPlay = (index) => {
    playVideo(index);
  };

  const handleVideoPause = () => {
    if (currentVideo !== -1) {
      videoRefs[currentVideo].current.pause();
      setCurrentVideo(-1);
    }
  };

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
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
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
                  <h2 className="font-semibold mb-4 text-amaranth-700">
                    Introduction to DCR
                  </h2>
                  <video
                    ref={videoRefs[0]}
                    width="100%"
                    height="240"
                    loop
                    muted
                    controls
                    className="w-full rounded-t-lg rounded-b-lg"
                    onPlay={() => handleVideoPlay(0)}
                    onPause={handleVideoPause}
                    onEnded={handleVideoPause}
                  >
                    <source src={video1} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <p className="mt-2">Video1 Description</p>
                </div>
              </div>

              <div className="flex items-center w-1/2 ml-2">
                <div className="flex-auto p-4">
                  <h2 className="font-semibold mb-4 text-amaranth-700">
                    Introduction to Log in and Match Rate feature
                  </h2>
                  <video
                    ref={videoRefs[1]}
                    width="100%"
                    height="240"
                    loop
                    muted
                    controls
                    className="w-full rounded-t-lg rounded-b-lg"
                    onPlay={() => handleVideoPlay(1)}
                    onPause={handleVideoPause}
                    onEnded={handleVideoPause}
                  >
                    <source src={video2} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <p className="mt-2">Video2 Description</p>
                </div>
              </div>
            </li>

            <li className="relative flex justify-between py-2 pr-4 mb-2 mt-5 border-0 rounded-t-lg rounded-xl text-inherit">
              <div className="flex items-center w-1/2">
                <div className="flex-auto p-4">
                  <h2 className="font-semibold mb-4 text-amaranth-700">
                    Introduction to Customer Enrichment feature
                  </h2>
                  <video
                    ref={videoRefs[2]}
                    width="100%"
                    height="240"
                    loop
                    muted
                    controls
                    className="w-full rounded-t-lg rounded-b-lg"
                    onPlay={() => handleVideoPlay(2)}
                    onPause={handleVideoPause}
                    onEnded={handleVideoPause}
                  >
                    <source src={video3} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <p className="mt-2">Video3 Description</p>
                </div>
              </div>

              <div className="flex items-center w-1/2 ml-2">
                <div className="flex-auto p-4">
                  <h2 className="font-semibold mb-4 text-amaranth-700">
                    Introduction to Admin console and status feature
                  </h2>
                  <video
                    ref={videoRefs[3]}
                    width="100%"
                    height="240"
                    loop
                    muted
                    controls
                    className="w-full rounded-t-lg rounded-b-lg"
                    onPlay={() => handleVideoPlay(3)}
                    onPause={handleVideoPause}
                    onEnded={handleVideoPause}
                  >
                    <source src={video4} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <p className="mt-2">Video4 Description</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Videos;
