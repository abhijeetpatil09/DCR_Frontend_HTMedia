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
          query:
            "select * from DCR_PROVIDER2.CLEANROOM.CONSUMER_ATTRIBUTES_VW;",
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

  console.log("data", data)
  return (
    <div className="flex flex-col w-full px-5">
      <span className=" mt-4 text-xl font-regular text-amaranth-600 pb-2 ">
        <strong>Consumer List</strong>
      </span>
      <TableContainer>
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
    </div>
  );
};

export default ConsumerAdmin;
