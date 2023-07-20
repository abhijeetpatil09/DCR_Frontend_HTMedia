import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const baseURL = process.env.REACT_APP_BASE_URL;

const Profile = () => {

  const state = useSelector((state) => state);
  const user = state && state.user;
  const [data, setData] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passError, setPassError] = useState("");


  useEffect(() => {
    if (user?.name && confirmPassword === newPassword) {
      axios
        .get(`${baseURL}/Provider`, {
          params: {
            query: `select * from DCR_SAMP_PROVIDER_DB.SHARED_SCHEMA.user_details_registration where USERNAME = '${user?.name}';`,
          },
        })
        .then((response) => {
          if (response?.data?.data) {
            setData(response?.data?.data);
          } else {
            setData([]);
          }
        })
        .catch((error) => console.log(error));
    }

  }, [confirmPassword, newPassword, user?.name]);

  console.log("data", data);


  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    if (name === "password") {
      setNewPassword(value);
    } else if (name === "confirm_password") {
      setConfirmPassword(value);
    }
  };

  const handleSave = (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setPassError("Passwords do not match");
      return;
    }
    axios
      .get(`${baseURL}/Provider`, {
        params: {
          query: `update DCR_SAMP_PROVIDER_DB.SHARED_SCHEMA.CONSUMER_ATTRIBUTES set  PASSWORD='${confirmPassword}' where USER = '${user?.name}';`,
        },
      })
      .then((response) => {
        if (response?.data) {
          setPassError("Password Upadted Successfully. ")
        } else {
          setPassError("Something went wrong, please try after sometime. ")
        }
      })
      .catch((error) => console.log(error));

  };

  return (
    <div className="flex flex-col flex-grow w-full h-full bg-gray-50">
      <div className="flex h-12 sticky top-0 px-5  py-2 bg-amaranth-800 flex-row items-center justify-between w-full">
        <h3 className="text-lg font-light text-white">My profile</h3>
      </div>
      <div className="container mx-auto my-auto max-w-3xl mt-8">
        <form>
          <div className="w-full bg-white rounded-lg mx-auto mt-8 flex overflow-hidden rounded-b-none  shadow-sm">
            <div className="w-1/2 bg-amaranth-50 p-8 hidden md:inline-block">

              <h2 className="font-medium text-md text-gray-700 mb-4 tracking-wide">{data ? data[0].USERNAME : "Loading..."}</h2>
              <dl className="divide-y divide-gray-100">
                <div className="flex flex-col px-3 py-2 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data ? data[0].FULL_NAME : "Loading..."}</dd>
                </div>
                <div className="flex flex-col px-3 py-2 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Email Id</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data ? data[0].EMAIL_ID : "Loading..."}</dd>
                </div>
                <div className="flex flex-col px-3 py-2 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Company Name</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data ? data[0].COMPANY : "Loading..."}</dd>
                </div>
                <div className="flex flex-col px-3 py-2 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Designation</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data ? data[0].DESIGNATION : "Loading..."}</dd>
                </div>

              </dl>

            </div>
            <div className="md:w-1/2 w-full ">

              <div className="py-8 px-16">
                <h2 className="font-medium text-md text-gray-700 mb-4 tracking-wide">Change password</h2>
                <label for="name" className="text-sm text-gray-600">
                  New password
                </label>
                <input
                  className="block w-full rounded-md border-0 py-1.5 text-amaranth-600  bg-blend-darken    shadow-sm ring-1 ring-inset ring-amaranth-600  placeholder:text-amaranth-600  focus:ring-2 focus:ring-inset focus:ring-amaranth-600  sm:text-sm sm:leading-6"
                  type="password"
                  value={newPassword}
                  name="password"
                  onChange={handlePasswordChange}
                />
              </div>
              <hr className="border-gray-200" />
              <div className="py-8 px-16">
                <label for="email" className="text-sm text-gray-600">
                  Confirm password
                </label>
                <input
                  className="block w-full rounded-md border-0 py-1.5 text-amaranth-600  bg-blend-darken    shadow-sm ring-1 ring-inset ring-amaranth-600  placeholder:text-amaranth-600  focus:ring-2 focus:ring-inset focus:ring-amaranth-600  sm:text-sm sm:leading-6"
                  type="password"
                  name="confirm_password"
                  value={confirmPassword}
                  onChange={handlePasswordChange}
                />
              </div>

              <button
                // id="createNewRequestMatchRate"
                className=" w-full rounded-none px-2 py-2 mb-0  text-white bg-amaranth-600  text-lg hover:bg-amaranth-500 hover:text-white text-center font-semibold "
                onClick={handleSave}
              > Save
              </button>
              <div className="flex justify-center pt-2">
                {passError !== "" ? (
                  <span className="text-red-600">{passError}</span>
                ) : (
                  null
                )}
              </div>
            </div>

          </div>

        </form>
      </div>
    </div>
  );
};

export default Profile;
