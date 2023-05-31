

// Convert Json Into CSV format
export const jsonToCsv = (jsonData) => {
    let tempData = jsonData?.data;
    const csvRows = [];
    const headers = Object.keys(tempData[0]); // Add the headers as the first row

    csvRows.push(headers.join(",")); // Iterate over each JSON object and convert it to CSV row

    for (const row of tempData) {
      const values = headers.map((header) => {
        const escapedValue = row[header].toString().replace(/"/g, '\\"');
        return `"${escapedValue}"`;
      });
      csvRows.push(values.join(","));
    } // Join the CSV rows with newlines

    return csvRows.join("\n");
  };

 export const handleDate = (date) => {
  const dateObj = new Date(date);

  const year = dateObj.getFullYear();
  const month = getMonthName(dateObj.getMonth());
  const day = dateObj.getDate().toString().padStart(2, "0");
  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  const seconds = dateObj.getSeconds().toString().padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

const getMonthName = (monthIndex) => {
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  return monthNames[monthIndex];
};

  export const downloadFileInCSV = (csvData, TEMPLATE_NAME, RUN_ID) => {
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" }); // Create a temporary URL for the Blob

    const csvUrl = URL.createObjectURL(blob); // Create a link element

    const link = document.createElement("a");
    link.setAttribute("href", csvUrl);
    link.setAttribute("download", `${TEMPLATE_NAME}_${RUN_ID}.csv`); // Append the link to the document body and click it

    document.body.appendChild(link);
    link.click(); // Clean up by removing the link from the document body

    document.body.removeChild(link);
  };