import React, { useState } from 'react';
import axios from "axios";
import { useSelector } from "react-redux";



const ChartPage = () => {

    const state = useSelector((state) => state);
    const [templateName, setTemplateName] = useState([]);
    const [tableName, setTableName]=useState("");
    const user = state && state.user;
    const [chartImage, setChartImage] = useState('');

    const [chartDetails, setChartDetails] = useState({
        runId: "",
        templateName: "",
        chartType: "",
    });


    const handleSelectRunId = (e) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;
        setChartDetails({ ...chartDetails, [inputName]: inputValue });

    };

    const onSubmitRunId = () => {
        if (chartDetails?.runId !== "") {
            axios
                .get(`http://127.0.0.1:5000/${user?.name}`, {
                    params: {
                        query: `select distinct template_name from DCR_SAMP_CONSUMER1.PUBLIC.DASHBOARD_TABLE where RUN_ID = ${chartDetails?.runId};`,
                    },
                })
                .then((response) => {
                    if (response?.data) {
                        console.log("Template list", response?.data);
                        setTemplateName(response.data.data);
                    }
                })
                .catch((error) => console.log(error));
        }

    }

    const handleSelectedTemp = (e) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;
        setChartDetails({ ...chartDetails, [inputName]: inputValue });
        setTableName(`DCR_SAMP_CONSUMER1.PUBLIC.${inputValue}_${chartDetails?.runId}_INSIGHTS`)
    };


    const handleCustomerFormData = (e) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;
        setChartDetails({ ...chartDetails, [inputName]: inputValue });
    };


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5001/age_distribution', {
                user_name: `${user?.name}`,
                sf_table_name: tableName,
                chart_type: `${chartDetails?.chartType}`,
                
            }, {
              headers: {
                'Content-Type': 'application/json',
              },
              responseType: 'blob',
            });
            if (response.status === 200) {
              const imageBlob = response.data;
              setChartImage(URL.createObjectURL(imageBlob));
            } else {
              console.error('Failed to fetch chart image');
            }
          } catch (error) {
            console.error('An error occurred:', error);
          }
        };
        const handleFormSubmitGen = async (event) => {
            event.preventDefault();
            try {
                const response = await axios.post('http://127.0.0.1:5001/gender_distribution', {
                    user_name: `${user?.name}`,
                    sf_table_name: tableName,
                    chart_type: `${chartDetails?.chartType}`,
                    
                }, {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  responseType: 'blob',
                });
                if (response.status === 200) {
                  const imageBlob = response.data;
                  setChartImage(URL.createObjectURL(imageBlob));
                } else {
                  console.error('Failed to fetch chart image');
                }
              } catch (error) {
                console.error('An error occurred:', error);
              }
            };
      
    return (
        <div className="flex flex-col justify-center items-center space-y-6  w-4/5">
            <div className=" w-full">
                <label
                    htmlFor="uname"
                    className="block text-sm font-medium leading-6 text-amaranth-600 "
                >
                    Request Id{" "}
                </label>
                <div className="mt-2 flex">
                    <input
                        id="runId"
                        type="number"
                        name="runId"
                        placeholder="Please enter a requested Id. e.g. 1234567890"
                        onChange={handleSelectRunId}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-amaranth-600  bg-blend-darken    shadow-sm ring-1 ring-inset ring-amaranth-600  placeholder:text-amaranth-600  focus:ring-2 focus:ring-inset focus:ring-amaranth-600  sm:text-sm sm:leading-6"

                    />
                    <button
                        type="submit"
                        onClick={onSubmitRunId}
                        className="px-4 ml-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-amaranth-600 border border-transparent rounded-md active:bg-amaranth-700 focus:outline-none focus:shadow-outline-amaranth hover:bg-amaranth-700"
                    >
                        Submit
                    </button>
                </div>

            </div>

            <div className="w-full">
                <label
                    htmlFor="uname"
                    className="block text-sm font-medium leading-6 text-amaranth-600 "
                >
                    Query Name{" "}
                </label>
                <div className="mt-2">
                    <select
                        id="selectedTemp"
                        required
                        name="templateName"
                        value={chartDetails["templateName"]}
                        className="block w-full rounded-md border-0 py-1.5 text-amaranth-600  bg-blend-darken    shadow-sm ring-1 ring-inset ring-amaranth-600  placeholder:text-amaranth-600  focus:ring-2 focus:ring-inset focus:ring-amaranth-600  sm:text-sm sm:leading-6"
                        onChange={handleSelectedTemp}
                    >
                        <option value="">Select a template</option>
                        {templateName?.length > 0 ? (
                            templateName.map((item, index) => (
                                <option key={index} value={item.TEMPLATE_NAME}>
                                    {item.TEMPLATE_NAME}
                                </option>
                            ))
                        ) : (
                            <option value="">Loading...</option>
                        )}
                    </select>
                </div>
            </div>

            <div className=" w-full mt-6">
                <label
                    htmlFor="charttype"
                    className="block text-sm font-medium leading-6 text-amaranth-600 "
                >
                    Chart Type{" "}
                </label>
                <select
                    name="chartType"
                    onChange={handleCustomerFormData}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-amaranth-600  bg-blend-darken    shadow-sm ring-1 ring-inset ring-amaranth-600  placeholder:text-amaranth-600  focus:ring-2 focus:ring-inset focus:ring-amaranth-600  sm:text-sm sm:leading-6"
                >
                    <option value="">Please select</option>
                    <option value="bar_chart">Bar chart</option>
                    <option value="pie_chart">Pie Chart</option>
                    {/* <option value="MAID">MAID-WIP</option> */}
                </select>
            </div>

            <div className=" w-full mt-6">
                <button
                    onClick={handleFormSubmit}
                    className=" rounded-3xl flex w-30 justify-center  text-white bg-amaranth-600  px-3 py-1.5 text-sm font-semibold leading-6 text-stone-700shadow-sm hover:bg-amaranth-600  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amaranth-600 "
                >Age Distribution</button>
                <button
                    onClick={handleFormSubmitGen}
                    className=" rounded-3xl flex w-30 mt-4 justify-center  text-white bg-amaranth-600  px-3 py-1.5 text-sm font-semibold leading-6 text-stone-700shadow-sm hover:bg-amaranth-600  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amaranth-600 "
                >Gender Distribution</button>
            </div>
            {chartImage && <img src={chartImage} alt=" Distribution Chart" />}
        </div>
    );
};

export default ChartPage;
