import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const ConsumerAdmin = () => {
  const state = useSelector((state) => state);
  const user = state && state.user;
  const UserRole = state && state.user && state.user.role;

  const [data, setData] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    const element = "Consumer_Admin";
    const index = UserRole?.indexOf(element);

    if (index !== -1) {
      const newArray = [
        ...UserRole.slice(0, index),
        ...UserRole.slice(index + 1),
      ];
      setRole(newArray?.join(", "));
    } else {
      setRole(UserRole?.join(", "));
    }

    axios
      .get(`http://127.0.0.1:5000/${user?.name}`, {
        params: {
          query: "select * from CONSUMER_ATTRIBUTES_VW order by admin desc;",
        },
      })
      .then((response) => {
        if (response?.data) {
          setData(response?.data?.data);
        } else {
          setData([]);
        }
      })
      .catch((error) => console.log(error));
  }, [user, UserRole]);

  console.log("data", data);
  return (
    <div className="flex flex-col w-full">
      <div className="flex h-12 sticky top-0 z-30 py-2 bg-amaranth-800 flex-row items-center justify-between w-full">
        <h3 className="px-5 text-lg font-light text-white">Admin console</h3>
      </div>
      {/* Create 3 tabs in tailwind css - 1. Consumer 2. Provider 3. Admin  */}
      <div className="border-b border-b-gray-200">
        <ul className="-mb-px flex items-center gap-4 text-sm font-medium">
          <li className="flex-1">
            <a href="#" className="flex items-center justify-center gap-2 px-1 py-3 text-gray-500 hover:text-amranth-700"> Profiles </a>
          </li>
          <li className="flex-1">
            <a href="#" className="relative flex items-center justify-center gap-2 px-1 py-3 text-amranth-700 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-blue-700 hover:text-blue-700"> Templates <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500"> 2 </span></a>
          </li>

          <li className="flex-1">
            <a href="#" className="flex items-center justify-center gap-2 px-1 py-3 text-gray-500 hover:text-amranth-700"> Itemised bills</a>
          </li>
         
        </ul>

      </div>

      
      <div>

      </div>
      <TableContainer className="mt-6 hidden">
        <Table
          sx={{ minWidth: 650, borderRadius: 0 }}
          stickyHeader
          size="small"
          classes={{ root: "w-100" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  fontSize: "0.9rem",
                  fontWeight: 900,
                  color: "#8c0f45",
                  backgroundColor: "#fff1f4",
                  borderRadius: 0,
                  borderTop: 1,
                  borderLeft: 1,
                  borderColor: "#d6d3d1",
                },
                "& th:first-child": { borderLeft: 1, borderColor: "#d6d3d1" },
              }}
            >
              <TableCell
                className="bg-amaranth-50 text-amaranth-900"
                key={0}
                align="center"
              >
                User
              </TableCell>
              <TableCell
                className="bg-amaranth-50 text-amaranth-900"
                key={1}
                align="center"
              >
                Role
              </TableCell>
              <TableCell
                className="bg-amaranth-50 text-amaranth-900"
                key={2}
                align="center"
              >
                Auth role
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => {
              return (
                <TableRow
                  className="border-gray-200 hover:bg-amaranth-50"
                  key={index}
                  sx={{
                    "& td:last-child": {
                      borderRight: 1,
                      borderColor: "#d6d3d1",
                    },
                    "& td": { borderLeft: 1, borderColor: "#d6d3d1" },
                  }}
                >
                  <TableCell className="text-amaranth-900" align="center">
                    {row.USER}
                  </TableCell>
                  <TableCell className="text-amaranth-900" align="center">
                    {role}
                  </TableCell>
                  <TableCell className="text-amaranth-900" align="center">
                    {row.CONSUMER_ADMIN === "TRUE" ? "ADMIN" : "CONSUMER"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="flex flex-col mt-4 px-5 w-1/3">
        <div class="mt-2 pb-21 flex flex-col">
          <label class="block text-sm font-medium leading-6 text-amaranth-600 ">Consumer name</label>
          <input name="Column_Names" required="" class="bg-transparent  block w-full rounded-md border-0 py-1.5 text-amaranth-600  bg-blend-darken    shadow-sm ring-1 ring-inset ring-amaranth-600  placeholder:text-amaranth-600  focus:ring-2 focus:ring-inset focus:ring-amaranth-600  sm:text-sm sm:leading-6" />
           
          
        </div>
        <div class="settings">
          {/* <span class="settings__title field-title">settings</span> */}
          <div class="setting border-b border-b-gray-200">
            <input type="checkbox" id="uppercase" />
            <label for="uppercase">Query 1</label>
          </div>
          <div class="setting  border-b border-b-gray-200">
            <input type="checkbox" id="lowercase"   />
              <label for="lowercase">Query 2</label>
          </div>
          <div class="setting  border-b border-b-gray-200">
            <input type="checkbox" id="number"   />
              <label for="number">Query 3</label>
          </div>
          <div className="  border-b border-b-gray-200">
            <div class="setting">
              <input type="checkbox" id="symbol" checked />
              <label for="symbol">Query 4</label>
              
            </div>
            <ul className="pb-2">
                <li className="ml-10">
                  <input type="checkbox" id="sq1" />
                  <label for="sq1" checked className="pl-2 text-gray-600">Age </label>
                </li>
                <li className="ml-10">
                  <input type="checkbox" id="sq2" />
                  <label for="sq2" className="pl-2 text-gray-600">Email </label>
                </li>
                <li className="ml-10">
                  <input type="checkbox" id="sq3" />
                  <label for="sq3" className="pl-2 text-gray-600">Overall </label>
                </li>
            </ul>
          </div>
         
        </div>
           
      </div>
    </div>
  );
};

export default ConsumerAdmin;
