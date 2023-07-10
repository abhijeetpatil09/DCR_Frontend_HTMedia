import React, { useEffect, useState } from "react";
import axios from "axios";
import Switch from '@mui/material/Switch';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const ProfileTable = ({ user, UserRole }) => {
  const [data, setData] = useState([]);



  useEffect(() => {
    if (UserRole?.includes("Consumer_Admin")) {
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

    } else {
      axios
        .get(`http://127.0.0.1:5000/${user?.name}`, {
          params: {
            query: "select * from DCR_SAMP_PROVIDER_DB.DATAEX.CONSUMER_ATTRIBUTES_VW order by admin desc;",
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
    }
  }, [user, UserRole]);



  return (
    <div className="p-4 w-11/12">
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
                "& th:first-of-type": {
                  borderLeft: 1,
                  borderColor: "#d6d3d1",
                },
                "& th:last-child": {
                  borderRight: 1,
                  borderColor: "#d6d3d1",
                },
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
                Consumer
              </TableCell>
              <TableCell
                className="bg-amaranth-50 text-amaranth-900"
                key={1}
                align="center"
              >
                Publisher
              </TableCell>
              <TableCell
                className="bg-amaranth-50 text-amaranth-900"
                key={1}
                align="center"
              >
                Provider
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
                  <TableCell className="ext-amaranth-900" align="center">
                    {row.USER}
                  </TableCell>

                  <TableCell className="ext-amaranth-900" align="center">
                    <Switch
                      checked={row.CONSUMER.toLowerCase() === "true"}
                      // onChange={handleChange}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </TableCell>
                  <TableCell className="ext-amaranth-900" align="center">
                  <Switch
                      checked={row.PUBLISHER.toLowerCase() === "true"}
                      // onChange={handleChange}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </TableCell>
                  <TableCell className="ext-amaranth-900" align="center">

                    {row.PROVIDER.toLowerCase() === "true" ? "PROVIDER" : ""}

                  </TableCell>
                  {/* <TableCell className="ext-amaranth-900" align="center">
                    {row.CONSUMER.toLowerCase() === "true" ? "CONSUMER" : ""}
                    {row.PUBLISHER.toLowerCase() === "true"
                      ? `${row.CONSUMER.toLowerCase() === "true"
                        ? ", PUBLISHER"
                        : "PUBLISHER"
                      }`
                      : ""}
                    {row.PROVIDER.toLowerCase() === "true"
                      ? `${row.CONSUMER.toLowerCase() === "true" ||
                        row.PUBLISHER.toLowerCase() === "true"
                        ? ", PROVIDER"
                        : "PROVIDER"
                      }`
                      : ""}
                  </TableCell> */}
                  <TableCell className="ext-amaranth-900" align="center">
                    {row.ADMIN.toLowerCase() === "true" ? "ADMIN"
                      : row.CONSUMER.toLowerCase() === "true" && row.ADMIN.toLowerCase() === "false" ? "CONSUMER" : "PROVIDER"}
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

export default ProfileTable;
