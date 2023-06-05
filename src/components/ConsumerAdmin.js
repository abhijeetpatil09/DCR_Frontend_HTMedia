import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const ConsumerAdmin = () => {

    const [data, setData] = useState([]);

    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    const user = state && state.user;
    // const role = state && state.role;

    // console.log("roles == ", user.role);

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:5000/${user?.name}`, {
                params: {
                    query: "select * from DCR_PROVIDER2.CLEANROOM.CONSUMER_ATTRIBUTES_VW;",
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
    }, [user?.name]);

    return (
        <div className="flex flex-col w-full px-5">
            <h1 class=" mt-4 text-xl font-regular text-amaranth-600 pb-2 ">
                Consumer List
            </h1>

            <table className="table-auto w-full text-left text-sm">
                <thead>
                    <tr className="bg-amaranth-50 text-amaranth-900 uppercase text-sm leading-normal border-t border-l ">
                        <th className="px-4 py-2 border-r">User</th>
                        <th className="px-4 py-2 border-r">Provider</th>
                        <th className="px-4 py-2 border-r">Consumer</th>
                        <th className="px-4 py-2 border-r">Publisher</th>
                        <th className="px-4 py-2 border-r">Auth role</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {data.map((item, index) => (
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="border px-4 py-2">{item.USER}</td>
                            <td className="border px-4 py-2">{item.PROVIDER === "true" ? "YES" : "NO"}</td>
                            <td className="border px-4 py-2">{item.CONSUMER === "true" ? "YES" : "NO"}</td>
                            <td className="border px-4 py-2">{item.PUBLISHER === "true" ? "YES" : "NO"}</td>
                            <td className="border px-4 py-2">{item.CONSUMER_ADMIN === "TRUE" ? "ADMIN" : "CONSUMER"}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ConsumerAdmin;