import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { VscCircleFilled } from "react-icons/vsc";

import {
  calculatePercentage,
  CustomTooltip,
} from "../../../utils/commonFunctions";

const COLORS = ["#3700FF", "#FB0007", "#FED60A", "#FB13F3","#0891b2"];

const PieChartAnalytics = ({ data, total }) => {
  return (
    <>
      <div className="w-full max-w-full px-3 sm:flex-0 shrink-0 sm:w-6/12 lg:w-full">
        <div className="border-black/12.5 shadow-soft-xl dark:bg-gray-950 dark:shadow-soft-dark-xl relative mt-6 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
          <div className="p-4 pb-0 rounded-t-4">
            <h5 className="mb-0 dark:text-white text-amaranth-700 font-bold">
              Pie Chart
            </h5>
          </div>
          <div className="flex flex-row p-4">
            <PieChart width={300} height={300}>
              <Tooltip
                cursor={false}
                content={
                  <CustomTooltip labelClassName={""} wrapperClassName={""} chart={'Pie'} />
                }
              />
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                labelLine={false}
                // outerRadius={80}
                // innerRadius={40}
                fill="#8884d8"
                // paddingAngle={5}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
            <table className="items-center flex w-full h-auto mb-0 align-top border-gray-200 text-slate-500">
              <tbody className="align-top">
                {data.map((item, key) => {
                  return item.name !== "" ? (
                    <tr key={Math.random() * key}>
                      <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent dark:border-white/40">
                        <div className="flex items-center px-2 py-0">
                          <VscCircleFilled
                            color={COLORS[key % COLORS.length]}
                          />

                          {/* <span className="py-2.2 px-2.8 text-xs rounded-1.8  mr-4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white"> </span> */}
                          <div className="flex flex-col justify-center">
                            <h6 className="mb-0 text-sm leading-normal dark:text-white">
                              {item.name}
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td className="p-2 text-sm leading-normal text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent dark:border-white/40 dark:text-white/60">
                        <span className="text-xs font-semibold leading-tight">
                          {" "}
                          (
                          {calculatePercentage(
                            parseInt(item.value),
                            parseInt(total)
                          )}
                          %){" "}
                        </span>
                      </td>
                    </tr>
                  ) : null;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default PieChartAnalytics;

// import * as React from "react";
// import { render } from "react-dom";
// import {
//   Cell,
//   PieChart,
//   Pie,
//   Tooltip,
//   ContentRenderer,
//   PieLabelRenderProps,
//   ResponsiveContainer
// } from "recharts";

// interface IData {
//   name: string;
//   value: string | number;
// }

// const data: IData[] = [
//   { name: "Group A", value: 400 },
//   { name: "Group B", value: 300 },
//   { name: "Group C", value: 300 },
//   { name: "Group D", value: 200 }
// ];
// const COLORS = [
//   "#408fda",
//   "#73b0ed",
//   "#c1deff",
//   "#aeefc8",
//   "#86deaa",
//   "#73c897",
//   "#9180cc",
//   "#c1aff6",
//   "#cadad8",
//   "#9bb4b1",
//   "#7ea4a8"
// ];

// const RADIAN = Math.PI / 180;
// const textStyles: React.CSSProperties = { fontWeight: "bold" };
// const RenderCustomizedLabel: ContentRenderer<PieLabelRenderProps> = (
//   props: PieLabelRenderProps
// ) => {
//   const iRadius = Number(props.innerRadius) || 0;
//   const oRadius = Number(props.outerRadius) || 0;
//   const mAngle = Number(props.midAngle) || 0;
//   const chartX = Number(props.cx) || 0;
//   const chartY = Number(props.cy) || 0;
//   const percentage = Number(props.percent) || 0;

//   const radius = iRadius + (oRadius - iRadius) * 0.3;
//   const x = chartX + radius * Math.cos(-mAngle * RADIAN);
//   const y = chartY + radius * Math.sin(-mAngle * RADIAN);

//   return (
//     <text
//       x={x}
//       y={y}
//       fill="white"
//       textAnchor={x > chartX ? "start" : "end"}
//       dominantBaseline="central"
//       style={textStyles}
//     >
//       {`${(percentage * 100).toFixed(0)}%`}
//     </text>
//   );
// };

// const style = {
//   backgroundColor: "#4a4a4a",
//   color: "#fefefe",
//   padding: "2px 20px",
//   borderRadius: 5,
//   fontSize: "14px"
// };
// const CustomizedTooltip = React.memo((props: any) => {
//   if (props.payload.length > 0) {
//     const data: IData = props.payload[0];
//     return (
//       <div style={style}>
//         <p>{data.name}</p>
//         <p>{data.value}</p>
//       </div>
//     );
//   }
//   return null;
// });

// const SimplePieChart = () => {
//   return (
//     <ResponsiveContainer width="100%" maxHeight={400} aspect={1}>
//       <PieChart>
//         <Tooltip content={<CustomizedTooltip />} />
//         <Pie
//           dataKey="value"
//           data={data}
//           cx={300}
//           cy={200}
//           labelLine={false}
//           // label={RenderCustomizedLabel}
//           // innerRadius={100}
//         >
//           {data.map((entry, index) => (
//             <Cell fill={COLORS[index % COLORS.length]} key={`cell-${index}`} />
//           ))}
//         </Pie>
//       </PieChart>
//     </ResponsiveContainer>
//   );
// };

// render(<SimplePieChart />, document.getElementById("root"));
