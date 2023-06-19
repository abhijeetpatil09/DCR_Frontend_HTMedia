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
import QueryTemplate from "./components/QueryTemplate";
import PublisherTemplate from "./components/PublisherTemplate";

const ProviderAdmin = () => {
  const state = useSelector((state) => state);
  const user = state && state.user;
  const UserRole = state && state.user && state.user.role;

  const [data, setData] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    const element = "Provider_Admin";
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

  return (
    <div className="flex flex-col w-full px-5">
      <div className="flex h-12 sticky top-0 z-30 px-5  py-2 bg-amaranth-800 flex-row items-center justify-between w-full">
        <h3 className="  text-lg font-light text-white">Provider List</h3>
      </div>
      <div>
        <TableContainer className="mt-6">
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
                    key={index}
                    sx={{
                      "& td:last-child": {
                        borderRight: 1,
                        borderColor: "#d6d3d1",
                      },
                      "& td": { borderLeft: 1, borderColor: "#d6d3d1" },
                    }}
                  >
                    <TableCell className="ext-amaranth-900" align="center">
                      {row.USER}
                    </TableCell>
                    <TableCell className="ext-amaranth-900" align="center">
                      {role}
                    </TableCell>
                    <TableCell className="ext-amaranth-900" align="center">
                      {row.ADMIN.toLowerCase() === "true"
                        ? "ADMIN"
                        : "PROVIDER"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="m-8 flex justify-between">
        <div>
          <div className="bg-white bg-opacity-75 backdrop-filter backdrop-blur-lg ">
            <div className="flex flex-row items-start text-amaranth-500 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mt-1 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
              </svg>
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-amaranth-900 uppercase">
                  Configure Query Template
                </h3>
                <span className="text-sm mb-4 font-light text-amaranth-900">
                  {" "}
                  Enable/Disable Query Template for perticular consumer.
                </span>
              </div>
            </div>
          </div>
          <QueryTemplate user={user} />
        </div>
        <div>
          <div className="bg-white bg-opacity-75 backdrop-filter backdrop-blur-lg ">
            <div className="flex flex-row items-start text-amaranth-500 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mt-1 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
              </svg>
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-amaranth-900 uppercase">
                  Configure Publisher Template
                </h3>
                <span className="text-sm mb-4 font-light text-amaranth-900">
                  {" "}
                  Enable/Disable Publisher Template for perticular consumer.
                </span>
              </div>
            </div>
          </div>
          <PublisherTemplate user={user} />
        </div>
      </div>
    </div>
  );
};

export default ProviderAdmin;
