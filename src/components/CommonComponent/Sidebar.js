import { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from "../../redux/actions/index";

import GroupMLogo from "../../Assets/logo-download-01.png";
import GroupMLogoDark from "../../Assets/logo-download-02.png";
import { Breadcrumbs, Link } from "@material-ui/core";
import { Typography } from "@mui/material";

// import "../pure-react.css";
// import "../styles.css";

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const user = state && state.user;

  const [isOpened, setIsOpened] = useState(true);
  const [menuOpen, setMenuIsOpened] = useState(false);

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
          className={`${isOpened ? " opened  " : " sidebar bg-amaranth-100 "
            }      
               flex flex-col items-start  text-amaranth-900 shadow h-[calc(100vh)] sticky top-0  `}
        >
          {/* <!-- Side Nav Bar--> */}
          {isOpened ? <div className="flex flex-row items-center justify-around gap-1 h-10 w-full mb-2">
            <a
              href={"/#"}
              className="flex pl-6 items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0"
            >
              <span className="flex flex-row items-center mx-auto text-xl font-black leading-none text-gray-900 select-none">
                DataHaven<span className="text-amaranth-600">.</span>
              </span>
            </a>
            <i className="px-2  cursor-pointer" onClick={() => setIsOpened(!isOpened)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" clipRule="evenodd" />
              </svg>

            </i>
        
           </div>
            :
            <div
              className={`${isOpened ? "" : "text-amaranth-600"
                }  mb-2 pt-2 px-6 flex justify-start items-center  text-stone-600 focus:text-amaranth-900 cursor-pointer`}
              onClick={() => setIsOpened(!isOpened)}
            >
              <i className=" pb-2 pt-1  cursor-pointer" onClick={() => setIsOpened(!isOpened)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                </svg>

              </i>
            </div>}
          <ul>
            {/* <!-- Items Section --> */}
            
            <li className="">
              <button 
                onClick={() => navigateTo("/home")} 
                className=" py-2 px-6 flex flex justify-start items-center w-full  capitalize font-medium text-sm hover:bg-amaranth-200 transition ease-in-out duration-500">
                <i class="text-xs mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
                  </svg>
                </i>
                <span
                  className={`${isOpened ? "" : "hidden"
                    } `}
                >
                  Home
                </span>
              </button>
            </li>

            {user["role"] && user["role"].includes("Provider") && (          
            <li className="">
              <button 
                onClick={() => navigateTo("/home")} 
                className=" py-2 px-6 flex flex justify-start items-center w-full  capitalize font-medium text-sm hover:bg-amaranth-200 transition ease-in-out duration-500">
                <i class="text-xs mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M13.75 7h-3V3.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0L6.2 4.74a.75.75 0 001.1 1.02l1.95-2.1V7h-3A2.25 2.25 0 004 9.25v7.5A2.25 2.25 0 006.25 19h7.5A2.25 2.25 0 0016 16.75v-7.5A2.25 2.25 0 0013.75 7zm-3 0h-1.5v5.25a.75.75 0 001.5 0V7z" clipRule="evenodd" />
                  </svg>

                </i>
                <span
                  className={`${isOpened ? "" : "hidden"
                    } `}
                >
                  Upload
                </span>
              </button>
            </li>
            )}
            {user["role"] && user["role"].includes("Consumer") && (
               <li className="">
               <button 
                 onClick={() => navigateTo("/home")} 
                 className=" py-2 px-6 flex flex justify-start items-center w-full  capitalize font-medium text-sm hover:bg-amaranth-200 transition ease-in-out duration-500">
                 <i class="text-xs mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path d="M11 5a3 3 0 11-6 0 3 3 0 016 0zM2.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 018 18a9.953 9.953 0 01-5.385-1.572zM16.25 5.75a.75.75 0 00-1.5 0v2h-2a.75.75 0 000 1.5h2v2a.75.75 0 001.5 0v-2h2a.75.75 0 000-1.5h-2v-2z" />
                    </svg>
                 </i>
                 <span
                   className={`${isOpened ? "" : "hidden"
                     } `}
                 >
                   Enrichment  
                 </span>
               </button>
             </li>

            )}

            {user["role"] && user["role"].includes("Provider") && (
              
              <li className="hover:text-white">
                <button
                  className="h-16 px-6 flex justify-start items-center w-full
              focus:text-amaranth-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 stroke-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>

                  <span
                    className={`${isOpened ? "" : "hidden"
                      } pl-5 uppercase font-semibold`}
                  >
                    Upload{" "}
                  </span>
                </button>
              </li>
            )}



            {user["role"] && user["role"].includes("Consumer") && (
              <li className="hover:text-white">
                <button
                  onClick={() => navigateTo("/queryform")}
                  className="h-16 px-6 flex  justify-start items-center w-full
              focus:text-amaranth-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 stroke-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                    />
                  </svg>

                  <span
                    className={`${isOpened ? "" : "hidden"
                      } pl-5 uppercase font-semibold`}
                  >
                    Enrichment
                  </span>
                </button>
              </li>
            )}
            {user["role"] && user["role"].includes("Publisher") && (
              <li className="hover:text-white">
                <button
                  onClick={() => navigateTo("/publisherform")}
                  className="h-16 px-6 flex flex justify-start items-center w-full
              focus:text-amaranth-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 stroke-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46"
                    />
                  </svg>

                  <span
                    className={`${isOpened ? "" : "hidden"
                      } pl-5 uppercase font-semibold`}
                  >
                    Match Rate
                  </span>
                </button>
              </li>
            )}

            <li className="hover:text-white">
              <button
                onClick={() => navigateTo("/querystatus")}
                className="h-16 px-6 flex flex justify-start items-center w-full
              focus:text-amaranth-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 stroke-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <span
                  className={`${isOpened ? "" : "hidden"
                    } pl-5 uppercase font-semibold`}
                >
                  Status
                </span>
              </button>
            </li>

            <li className="hover:text-white">
              <button
                onClick={() => navigateTo("/requestinfo")}
                className="h-16 px-6 flex flex justify-start items-center w-full
              focus:text-amaranth-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 stroke-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>

                <span
                  className={`${isOpened ? "" : "hidden"
                    } pl-5 uppercase font-semibold`}
                >
                  Requests
                </span>
              </button>
            </li>
          </ul>
        </aside>

        <div className="flex flex-col flex-grow w-full  overflow-auto">
          {/* HEADER */}
          <div className=" py-2 w-full flex flex-row justify-between items-center sticky top-0 z-50  bg-white drop-shadow-sm">
            <div className=" px-4">
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                  Home
                </Link>
                <Link
                  underline="hover"
                  color="inherit"
                  // href="/material-ui/getting-started/installation/"
                >
                   
                </Link>
                {/* <Typography color="text.primary">Breadcrumbs</Typography> */}
              </Breadcrumbs>
            </div>
               {/* <button
                onClick={handleSignOut}
                className={`${user?.name ? "" : "invisible"
                  }  px-6 w-auto  flex  justify-center items-center  text-amaranth-600  focus:outline-none`}
              >
                <svg
                  className="h-5 w-5 mr-1 text-amaranth-600 "
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
               </button> */}
               {/* <div onClick={handleSignOut} >{(user?.name) ? "Sign Out" : "Sign In"}</div> */}
               {/* <!-- user --> */}
              <div className="dropdown relative md:static pr-4">

                <button className="menu-btn focus:outline-none focus:shadow-outline flex flex-wrap items-center">
                  <div className="w-8 h-8 overflow-hidden rounded-full">
                    <img className="w-full h-full object-cover" src="https://moesaid.github.io/cleopatra/img/user.svg" />
                  </div> 

                  <div className="ml-2 capitalize flex ">
                    <h1 className="text-sm text-gray-800 font-semibold m-0 p-0 leading-none">Aditi Tripathi</h1>
                    <i className="fad fa-chevron-down ml-2 text-xs leading-none" onClick={() => setMenuIsOpened(!menuOpen)}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                          </svg>

                    </i>
                  </div>                        
                </button>

                <button className="hidden fixed top-0 left-0 z-10 w-full h-full menu-overflow"></button>

                <div  className={`${menuOpen ? " " : " hidden "
                      } text-gray-500 menu    md:w-auto rounded bg-white shadow-md absolute z-20 right-1   w-40  py-2 animated faster`}>

            
                  <a className="px-4 py-2 block capitalize font-medium text-sm tracking-wide bg-white hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 ease-in-out" href="#">
                    <i className="fad fa-user-edit text-xs mr-1"></i> 
                    edit my profile
                  </a>     
                
                  <a className="px-4 py-2 block capitalize font-medium text-sm tracking-wide bg-white hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 ease-in-out" href="#">
                    <i className="fad fa-inbox-in text-xs mr-1"></i> 
                    my inbox
                  </a>     
                
                  <a className="px-4 py-2 block capitalize font-medium text-sm tracking-wide bg-white hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 ease-in-out" href="#">
                    <i className="fad fa-badge-check text-xs mr-1"></i> 
                    tasks
                  </a>     
      
                  <a className="px-4 py-2 block capitalize font-medium text-sm tracking-wide bg-white hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 ease-in-out" href="#">
                    <i className="fad fa-comment-alt-dots text-xs mr-1"></i> 
                    chats
                  </a>     
      
                

                  <a onClick={handleSignOut} className="px-4 py-2 block capitalize font-medium text-sm tracking-wide bg-white hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 ease-in-out" href="#">
                    <i className="fad fa-user-times text-xs mr-1"></i> 
                    log out
                  </a>     
      
                </div>
              </div>
        {/* <!-- end user --> */}
          </div>
          {/* CONTAINER */}
          <main className="flex flex-col w-full ">
            <div className="flex flex-grow w-full px-5">{children}</div>
            <div className="bg-white  h-10 flex flex-row items-center justify-end text-xs sticky bottom-0 px-10 py-2">
              &copy; 2023 Hoonar Tekwurks Private Ltd.
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
