import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Paper from "@mui/material/Paper";
import { VscCircleFilled } from "react-icons/vsc";

const COLORS = ["#c40c4f", "#ff6d94", "#FFBB28", "#FF8042", "red", "pink"];

const PieChartAnalytics = ({ data }) => {
  return (
       <>
       <div className="w-full max-w-full px-3 sm:flex-0 shrink-0 sm:w-6/12 lg:w-full">
            <div className="border-black/12.5 shadow-soft-xl dark:bg-gray-950 dark:shadow-soft-dark-xl relative mt-6 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
                <div className="p-4 pb-0 rounded-t-4">
                    <h5 className="mb-0 dark:text-white text-amaranth-700">Pie Chart</h5>
                </div>
                <div className="flex flex-row p-4">
                   <PieChart width={200} height={300}>
                    <Pie
                      data={data}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      innerRadius={40}
                      fill="#8884d8"
                      // paddingAngle={5}
                     >
                      {data.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                 
                  </PieChart>
                  <table className="items-center w-full h-auto mb-0 align-top border-gray-200 text-slate-500">
                      <tbody className="align-top">
                      {data.map((item, key) => {
                        return item.name !== "" ? (
                        <tr key={Math.random() * key}>
                          <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent dark:border-white/40">
                            <div className="flex items-center px-2 py-0">
                              <VscCircleFilled color={COLORS[key % COLORS.length]} />

                              {/* <span className="py-2.2 px-2.8 text-xs rounded-1.8  mr-4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white"> </span> */}
                              <div className="flex flex-col justify-center">
                                <h6 className="mb-0 text-sm leading-normal dark:text-white">{item.name}</h6>
                              </div>
                            </div>
                          </td>
                          <td className="p-2 text-sm leading-normal text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent dark:border-white/40 dark:text-white/60">
                            <span className="text-xs font-semibold leading-tight"> ({item.value}%) </span>
                          </td>
                        </tr>
                        ) : null;
                      })}

                      </tbody>
                    </table>
                 </div>
            </div>
        </div>
 
          
        
        {/* <ul className="w-full mt-4 mx-4">
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
        </ul> */}
      </>
   );
};

export default PieChartAnalytics;
