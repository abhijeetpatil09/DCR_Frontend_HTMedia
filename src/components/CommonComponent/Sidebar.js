import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from "../../redux/actions/index";

import HTWLogo from "../../Assets/Logos/Data_Haven_Logo.svg";
import DiscoverLogo from "../../Assets/Logos/Discover_Logo.svg";

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const user = state && state.user;

  const [isOpened, setIsOpened] = useState(true);
  const [menuOpen, setMenuIsOpened] = useState(false);

  const [tab, setTab] = useState(0);

  const divRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setMenuIsOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const { pathname } = window.location;
    if (pathname?.includes("home")) {
      setTab(1);
    } else if (pathname?.includes("publisherform")) {
      setTab(2);
    } else if (pathname?.includes("queryform")) {
      setTab(3);
    } else if (pathname?.includes("analytics")) {
      setTab(4);
    } else if (pathname?.includes("admin-console")) {
      setTab(5);
    }
    // else if (pathname?.includes("provider-admin")) {
    //   setTab(6);
    // }
    else if (pathname?.includes("querystatus")) {
      setTab(7);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);

  const handleSignOut = () => {
    dispatch(actions.logoutUser());
    navigate("/");
  };

  const navigateTo = (page) => {
    navigate(page);
  };

  return (
    <>
      <div className="  w-screen flex flex-row h-[calc(100vh)]  ">
        {/* SIDEBAR */}
        <aside
          className={`${isOpened ? "opened" : "sidebar bg-amaranth-100 "}      
               flex flex-col items-start text-amaranth-900 shadow h-[calc(100vh)] sticky top-0  `}
        >
          {/* <!-- Side Nav Bar--> */}
          {isOpened ? (
            <div className="flex flex-row items-center justify-around gap-1 h-10 w-full mb-2 pt-1">
              <a
                href={"/home"}
                className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0"
              >
                <span className="flex flex-row items-center mx-auto text-xl font-black leading-none text-gray-900 select-none">
                  <img src={HTWLogo} className="w-40" alt="" />
                </span>
              </a>
              <i
                className="px-2  cursor-pointer"
                onClick={() => setIsOpened(!isOpened)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </i>
            </div>
          ) : (
            <div
              className={`${
                isOpened ? "" : "text-amaranth-600"
              }  mb-2 pt-2 px-6 flex justify-start items-center  text-stone-600 focus:text-amaranth-900 cursor-pointer`}
              onClick={() => setIsOpened(!isOpened)}
            >
              <i
                className=" pb-2 pt-1  cursor-pointer"
                onClick={() => setIsOpened(!isOpened)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </i>
            </div>
          )}
          <ul className="w-full">
            {/* <!-- Items Section --> */}

            <li
              className={`${
                tab === 1 ? "bg-amaranth-200" : ""
              } hover:bg-amaranth-200 transition ease-in-out duration-500`}
            >
              <button
                onClick={() => navigateTo("/home")}
                className="py-4 px-6 flex flex justify-start items-center w-full  capitalize font-medium text-sm "
              >
                <i className="text-xs mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                      clipRule="evenodd"
                    />
                  </svg>
                </i>
                <span className={`${isOpened ? "" : "hidden"} `}>Home</span>
              </button>
            </li>

            {/* {user["role"] && user["role"].includes("Provider") && (
              <li
                className={`${
                  tab === 2 ? "bg-amaranth-200" : ""
                } hover:bg-amaranth-200 transition ease-in-out duration-500`}
              >
                <button
                  onClick={() => navigateTo("/home")}
                  className="py-4 px-6 flex flex justify-start items-center w-full  capitalize font-medium text-sm "
                >
                  <i className="text-xs mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M13.75 7h-3V3.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0L6.2 4.74a.75.75 0 001.1 1.02l1.95-2.1V7h-3A2.25 2.25 0 004 9.25v7.5A2.25 2.25 0 006.25 19h7.5A2.25 2.25 0 0016 16.75v-7.5A2.25 2.25 0 0013.75 7zm-3 0h-1.5v5.25a.75.75 0 001.5 0V7z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </i>
                  <span className={`${isOpened ? "" : "hidden"} `}>Upload</span>
                </button>
              </li>
            )} */}

            {user["role"] && user["role"].includes("Publisher") && (
              <li
                className={`${
                  tab === 2 ? "bg-amaranth-200" : ""
                } hover:bg-amaranth-200 transition ease-in-out duration-500`}
              >
                <button
                  onClick={() => navigateTo("/publisherform")}
                  className="py-4 px-6 flex flex justify-start items-center w-full  capitalize font-medium text-sm "
                >
                  <i className="text-xs mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.638 1.093a.75.75 0 01.724 0l2 1.104a.75.75 0 11-.724 1.313L10 2.607l-1.638.903a.75.75 0 11-.724-1.313l2-1.104zM5.403 4.287a.75.75 0 01-.295 1.019l-.805.444.805.444a.75.75 0 01-.724 1.314L3.5 7.02v.73a.75.75 0 01-1.5 0v-2a.75.75 0 01.388-.657l1.996-1.1a.75.75 0 011.019.294zm9.194 0a.75.75 0 011.02-.295l1.995 1.101A.75.75 0 0118 5.75v2a.75.75 0 01-1.5 0v-.73l-.884.488a.75.75 0 11-.724-1.314l.806-.444-.806-.444a.75.75 0 01-.295-1.02zM7.343 8.284a.75.75 0 011.02-.294L10 8.893l1.638-.903a.75.75 0 11.724 1.313l-1.612.89v1.557a.75.75 0 01-1.5 0v-1.557l-1.612-.89a.75.75 0 01-.295-1.019zM2.75 11.5a.75.75 0 01.75.75v1.557l1.608.887a.75.75 0 01-.724 1.314l-1.996-1.101A.75.75 0 012 14.25v-2a.75.75 0 01.75-.75zm14.5 0a.75.75 0 01.75.75v2a.75.75 0 01-.388.657l-1.996 1.1a.75.75 0 11-.724-1.313l1.608-.887V12.25a.75.75 0 01.75-.75zm-7.25 4a.75.75 0 01.75.75v.73l.888-.49a.75.75 0 01.724 1.313l-2 1.104a.75.75 0 01-.724 0l-2-1.104a.75.75 0 11.724-1.313l.888.49v-.73a.75.75 0 01.75-.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </i>
                  <span className={`${isOpened ? "" : "hidden"} `}>
                    Match rate
                  </span>
                </button>
              </li>
            )}

            {user["role"] && user["role"].includes("Consumer") && (
              <li
                className={`${
                  tab === 3 ? "bg-amaranth-200" : ""
                } hover:bg-amaranth-200 transition ease-in-out duration-500`}
              >
                <button
                  onClick={() => navigateTo("/queryform")}
                  className=" py-4 px-6 flex flex justify-start items-center w-full  capitalize font-medium text-sm "
                >
                  <i className="text-xs mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M11 5a3 3 0 11-6 0 3 3 0 016 0zM2.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 018 18a9.953 9.953 0 01-5.385-1.572zM16.25 5.75a.75.75 0 00-1.5 0v2h-2a.75.75 0 000 1.5h2v2a.75.75 0 001.5 0v-2h2a.75.75 0 000-1.5h-2v-2z" />
                    </svg>
                  </i>
                  <span className={`${isOpened ? "" : "hidden"} `}>
                    Enrichment
                  </span>
                </button>
              </li>
            )}

            {user.role &&
              !user.role?.includes("Provider") &&
              user.role?.includes("Consumer") && (
                <li
                  className={`${
                    tab === 4 ? "bg-amaranth-200" : ""
                  } hover:bg-amaranth-200 transition ease-in-out duration-500`}
                >
                  <button
                    onClick={() => navigateTo("/analytics")}
                    className=" py-4 px-6 flex flex justify-start items-center w-full  capitalize font-medium text-sm "
                  >
                    <i className="text-xs mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm4.5 7.5a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zm3.75-1.5a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0V12zm2.25-3a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0V9.75A.75.75 0 0113.5 9zm3.75-1.5a.75.75 0 00-1.5 0v9a.75.75 0 001.5 0v-9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </i>
                    <span className={`${isOpened ? "" : "hidden"} `}>
                      Analytics
                    </span>
                  </button>
                </li>
              )}

            {((user["role"] && user["role"].includes("Consumer_Admin")) ||
              (user["role"] && user["role"].includes("Provider_Admin"))) && (
              <li
                className={`${
                  tab === 5 ? "bg-amaranth-200" : ""
                } hover:bg-amaranth-200 transition ease-in-out duration-500`}
              >
                <button
                  onClick={() => navigateTo("/admin-console")}
                  className=" py-4 px-6 flex flex justify-start items-center w-full  capitalize font-medium text-sm "
                >
                  <i className="text-xs mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                      />
                    </svg>
                  </i>
                  <span className={`${isOpened ? "" : "hidden"} `}>
                    Admin console
                  </span>
                </button>
              </li>
            )}
            {user["role"] && !user["role"].includes("Provider") && (
              <li
                className={`${
                  tab === 7 ? "bg-amaranth-200" : ""
                } hover:bg-amaranth-200 transition ease-in-out duration-500`}
              >
                <button
                  onClick={() => navigateTo("/querystatus")}
                  className=" py-4 px-6 flex flex justify-start items-center w-full  capitalize font-medium text-sm "
                >
                  <i className="text-xs mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </i>
                  <span className={`${isOpened ? "" : "hidden"} `}>Status</span>
                </button>
              </li>
            )}
          </ul>
        </aside>

        <div className="flex flex-col flex-grow w-full  overflow-hidden mb-8">
          {/* HEADER */}
          <div className="py-2 w-full flex flex-row justify-between items-center sticky top-0 z-50 min-h-[48px] bg-white drop-shadow-sm">
            <div className="px-4">
              {/* <img
                className="w-24 object-cover"
                src={DiscoverLogo}
                alt=""
              /> */}
            </div>

            {/* <!-- user --> */}
            <div className="dropdown relative md:static pr-4">
              <button className="menu-btn focus:outline-none focus:shadow-outline flex flex-wrap items-center">
                <div
                  className="capitalize flex items-center"
                  onClick={() => setMenuIsOpened(!menuOpen)}
                >
                  <h1 className="text-sm text-amaranth-900 font-semibold  leading-none">
                    {user?.name}
                  </h1>
                  <i className="fad fa-chevron-down ml-2 text-xs leading-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </i>
                </div>
              </button>

              <button className="hidden fixed top-0 left-0 z-10 w-full h-full menu-overflow"></button>

              <div
                ref={divRef}
                className={`${
                  menuOpen ? " " : " hidden "
                } text-gray-500 menu md:w-auto rounded bg-white shadow-md absolute z-20 right-1   w-40  py-2 animated faster`}
              >
                <a
                  className="px-4 py-2 block capitalize font-medium text-sm tracking-wide bg-white hover:bg-amaranth-200 hover:text-amaranth-900 transition-all duration-300 ease-in-out"
                  href="/my-profile"
                >
                  <i className="fad fa-user-edit text-xs text-amaranth-800 mr-1"></i>
                  Edit my profile
                </a>

                <a
                  onClick={handleSignOut}
                  className="px-4 py-2 block capitalize font-medium text-sm tracking-wide bg-white hover:bg-amaranth-200 hover:text-amaranth-900 transition-all duration-300 ease-in-out"
                  href="/"
                >
                  <i className="fad fa-user-times text-xs text-amaranth-800 mr-1"></i>
                  log out
                </a>
              </div>
            </div>
            {/* <!-- end user --> */}
          </div>
          {/* CONTAINER */}
          <main className="flex flex-col w-full overflow-auto h-full">
            <div className="flex flex-grow w-full h-full">{children}</div>
            <div className="bg-white w-full right-0 h-8 flex flex-row items-center justify-end text-xs fixed bottom-0 px-10 py-2 z-30 border-l border-gray-100">
              &copy; 2023 Hoonar Tekwurks Private Ltd.
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
