import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import Paper from "@mui/material/Paper";
import { VscCircleFilled } from "react-icons/vsc";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const PieChartAnalytics = ({ data }) => {
  return (
    <Paper elevation={3} className="w-full">
      <div className="flex">
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            // label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          {/* <Tooltip /> */}
          {/* <Legend /> */}
        </PieChart>
        <ul className="w-full mt-4 mx-4">
          {data.map((item, key) => {
            return item.name !== "" ? (
              <li
                key={Math.random() * key}
                className="flex flex-row w-full justify-between mb-2 items-center"
              >
                <VscCircleFilled color={COLORS[key % COLORS.length]} />
                <span className="pl-2 text-left">{item.name}</span>
                <span className="pl-2">({item.value}%)</span>
              </li>
            ) : null;
          })}
        </ul>
      </div>
    </Paper>
  );
};

export default PieChartAnalytics;
