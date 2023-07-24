import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import HTWLogo from "../../Assets/Logos/Data_Haven_Logo.svg";

import * as actions from "../../redux/actions/index";

const baseURL = process.env.REACT_APP_BASE_URL;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginDetails, setLoginDetails] = useState({
    userName: "",
    password: "",
    captcha: "",
  });

  const [errors, setErrors] = useState({
    userName: null,
    password: null,
    captcha: null,
  });

  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOnChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    if (inputName === "userName") {
      if (inputValue === "") {
        setErrors({ ...errors, userName: "Please enter User Name" });
      } else {
        setErrors({ ...errors, userName: null });
      }
    } else if (inputName === "password") {
      if (inputValue === "") {
        setErrors({ ...errors, password: "Please enter password" });
      } else {
        setErrors({ ...errors, password: null });
      }
    }
    setLoginDetails({ ...loginDetails, [inputName]: inputValue });
  };

  const getAllConsumers = async (userRole) => {
    await axios
      .get(`${baseURL}/${loginDetails?.userName}`, {
        params: {
          query: `select user from CONSUMER_ATTRIBUTES_VW where admin = 'TRUE';`,
        },
      })
      .then((response) => {
        if (response?.data?.data) {
          setIsSubmitted(true);

          let data = response?.data?.data?.[0];
          dispatch(
            actions.loginRequest({
              isLoggedIn: true,
              name: loginDetails?.userName,
              role: userRole,
              Consumer: data?.USER,
            })
          );
          navigate("/home");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();
    if (loginDetails?.userName === "") {
      setErrors({ ...errors, userName: "Please enter User name" });
      return;
    } else if (loginDetails?.password === "") {
      setErrors({ ...errors, password: "Please enter password" });
      return;
    }

    if (loginDetails?.userName !== "") {
      setLoading(true);
      await axios
        .get(`${baseURL}/${loginDetails?.userName}`, {
          params: {
            query: `select * from CONSUMER_ATTRIBUTES_VW WHERE USER = '${loginDetails?.userName}';`,
          },
        })
        .then((response) => {
          if (response?.data?.data) {
            let data = response?.data?.data; // Find user login info

            const userData = data ? data[0] : [];

            // Compare user info
            if (userData) {
              if (userData.PASSWORD !== loginDetails?.password) {
                setErrors({ ...errors, password: "Invalid Password" });
                setLoading(false);
              } else {
                const userRole = [];
                if (userData?.PUBLISHER?.toLowerCase() === "true") {
                  userRole.push("Publisher");
                }
                if (userData?.PROVIDER?.toLowerCase() === "true") {
                  userRole.push("Provider");
                }
                if (userData?.CONSUMER?.toLowerCase() === "true") {
                  userRole.push("Consumer");
                }
                if (
                  userData?.PROVIDER?.toLowerCase() === "true" &&
                  userData?.ADMIN?.toLowerCase() === "true"
                ) {
                  userRole.push("Provider_Admin");
                }

                if (
                  userData?.PROVIDER?.toLowerCase() !== "true" &&
                  userData?.ADMIN?.toLowerCase() === "true"
                ) {
                  userRole.push("Consumer_Admin");
                }
                getAllConsumers(userRole);
              }
            } else {
              // Username not found
              setLoading(false);
              setErrors({ ...errors, userName: "User name not found" });
              toast.error(
                "You entered an incorrect username, password or both."
              );
            }
          }
        })
        .catch((error) => {
          setErrors({ ...errors, userName: "User name not found" });
          setLoading(false);
          console.log(error);
        });
    }
  };

  // JSX code for login form
  const renderForm = (
    <div className="flex flex-col justify-center items-center space-y-6  w-4/5">
      <div className=" w-full">
        <label
          htmlFor="uname"
          className="block text-sm font-medium leading-6 text-amaranth-600 "
        >
          User Name{" "}
        </label>
        <div className="mt-2">
          <input
            id="userName"
            type="text"
            name="userName"
            placeholder="Please enter a username. e.g. aditi_nair"
            onChange={handleOnChange}
            required
            className="block w-full rounded-md border-0 py-1.5 text-amaranth-600  bg-blend-darken    shadow-sm ring-1 ring-inset ring-amaranth-600  placeholder:text-amaranth-600  focus:ring-2 focus:ring-inset focus:ring-amaranth-600  sm:text-sm sm:leading-6"
          />
          {errors.userName !== null ? (
            <span className="text-[#f44336] text-sm">{errors.userName}</span>
          ) : null}
        </div>
      </div>
      <div className=" w-full">
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-6 text-amaranth-600 "
        >
          Password
        </label>
        <div className="mt-2">
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Please enter your password."
            required
            onChange={handleOnChange}
            className="block w-full rounded-md border-0 py-1.5 text-amaranth-600  bg-blend-darken   shadow-sm ring-1 ring-inset ring-amaranth-600  placeholder:text-amaranth-600  focus:ring-2 focus:ring-inset focus:ring-amaranth-600  sm:text-sm sm:leading-6"
          />
          {errors.password !== null ? (
            <span className="text-[#f44336] text-sm">{errors.password}</span>
          ) : null}
        </div>
      </div>

      <div className=" w-full">
        <button
          onClick={handleSubmit}
          className=" rounded-3xl flex w-full justify-center  text-white bg-amaranth-600  px-3 py-1.5 text-sm font-semibold leading-6 text-stone-700shadow-sm hover:bg-amaranth-600  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amaranth-600 "
        >
          {loading ? (
            <CircularProgress
              style={{ width: "24px", height: "24px", color: "#FFFFFF" }}
            />
          ) : (
            "Log In"
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-stone-300 flex flex-row  p-12 lg:p-24 xl:p-26 min-h-screen ">
      <div className="flex flex-row mx-auto max-w-[70%] max-h-auto bg-white rounded-3xl shadow-lg shadow-stone-400">
        <div className="w-1/2 px-6 py-4">
          <div className=" flex flex-row items-start justify-start py-4 ">
            <a
              href="/"
              className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0"
            >
              <span className="flex flex-row items-center mx-auto text-xl font-black leading-none text-gray-900 select-none">
                <img src={HTWLogo} className="w-52 mr-2" alt="" />
              </span>
            </a>
          </div>
          <div className="flex flex-col items-center my-6">
            <h2 className="mt-10 mb-2 text-center text-6xl font-extrabold  tracking-tight    leading-9 text-amaranth-600 ">
              Hi there!
            </h2>
            <span className="text-center font-normal text-stone-800 text-sm">
              Welcome to DataHaven. Your trusted partner.
            </span>
          </div>

          <div className="flex items-start justify-center my-auto">
            {isSubmitted ? (
              <div>User is successfully logged in</div>
            ) : (
              renderForm
            )}
          </div>
        </div>
        <div className="w-1/2 h-full flex flex-col items-center justify-center overflow-hidden relative bg-gradient-to-br from-amaranth-100 to-purple-200 rounded-r-3xl px-6">
          {/* <h2 className="font-light text-4xl tracking-tighter text-purple-800">Proudly made by</h2> */}
          <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-amaranth-600 to-purple-800">
            Secure data collaboration with DataHaven
            <span className="font-bold text-4xl text-amaranth-500">.</span>
          </h1>
          {/* <h3 className="absolute w-4/5 text-2xl font-semibold  bottom-10 left-4 text-white z-40">Go anywhere you want in a Galaxy full of wonders!</h3> */}
          {/* <img src={Astro} className="absolute z-10 top-0 h-full object-cover rounded-r-3xl brightness-120  opacity-90" /> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
