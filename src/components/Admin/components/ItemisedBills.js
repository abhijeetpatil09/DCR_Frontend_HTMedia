import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ItemisedBills = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const state = useSelector((state) => state);

  const user = state && state.user;


  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleViewBill = () => {
    const selectedValue = user?.name + "_" + selectedMonth + "_" + selectedYear + ".pdf";
    console.log("Selected Value:", selectedValue);

    // Check if the file exists in the bills folder
    const billsFolder = "/bills/";
    const filePath = billsFolder + selectedValue;
    const fileExists = checkIfFileExists(filePath);

    if (fileExists) {
      // Display the PDF file in a new window/tab
      window.open(filePath, "_blank");
    } else {
      console.log("File does not exist");
    }
  };

  const checkIfFileExists = (filePath) => {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", filePath, false);
    xhr.send();
    return xhr.status !== 404;
  };

  const renderMonths = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    return (
      <select value={selectedMonth} onChange={handleMonthChange}>
        <option value="">Select Month</option>
        {months.map((month, index) => (
          <option key={index} value={month}>
            {month}
          </option>
        ))}
      </select>
    );
  };

  const renderYears = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1999 }, (_, index) => currentYear - index);

    return (
      <select value={selectedYear} onChange={handleYearChange}>
        <option value="">Select Year</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className="w-2/3 mx-8">
      <div>
        {renderMonths()}
        {renderYears()}
        <button onClick={handleViewBill}>View Bill</button>
      </div>
    </div>
  );
};

export default ItemisedBills;
