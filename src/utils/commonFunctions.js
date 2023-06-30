import { VscCircleFilled } from "react-icons/vsc";

// Function used for Convert Json Into CSV format

export const jsonToCsv = (jsonData) => {
  let tempData = jsonData?.data;
  const csvRows = [];
  const headers = Object.keys(tempData[0]);

  csvRows.push(headers.join(","));

  for (const row of tempData) {
    const values = headers.map((header) => {
      const escapedValue = row[header].toString().replace(/"/g, '\\"');
      return `"${escapedValue}"`;
    });
    csvRows.push(values.join(","));
  }

  return csvRows.join("\n");
};

// Function for Handle the date as per DD-MM-YYYY format

export const handleDate = (date) => {

  const dateObj = new Date(parseInt(date));

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
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return monthNames[monthIndex];
};

// Function for Download the file in the CSV format

export const downloadFileInCSV = (csvData, TEMPLATE_NAME, RUN_ID) => {
  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

  const csvUrl = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", csvUrl);
  link.setAttribute("download", `${TEMPLATE_NAME}_${RUN_ID}.csv`);

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
};

// Function for Calculating the percentage
export const calculatePercentage = (value, total) => {
  return Math.round((value * 100) / total);
};

/// To check the Object is empty or not...
export const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

/// CustomTooltip function used for Tooltip in charts...

export const CustomTooltip = ({
  active,
  payload,
  label,
  labelClassName,
  wrapperClassName,
  chart,
}) => {
  if (active) {
    return (
      <div
        className="shadow rounded"
        style={{ background: "rgba(30, 30, 30, 0.8)" }}
      >
        <div
          className="px-4 py-1"
          style={{
            background: "rgba(0, 0, 0, 0.7)",
            borderBottom: "1px solid #333",
          }}
        >
          <div className="flex items-center">
            {chart !== "Bar" ? (
              <VscCircleFilled color={payload[0].payload?.fill} />
            ) : null}
            <p className="label text-xs roboto-medium text-white">
              {(payload && payload.length > 0 && payload[0].payload?.name) ||
                label}
            </p>
          </div>
        </div>
        <div className="desc px-4 py-1 text-center">
          {payload?.map((p, index) => (
            <div key={`${index}_${p.name}`} className={"text-xs text-white"}>
              {labelClassName !== "undefined" ? labelClassName : ""}
              {labelClassName === undefined && wrapperClassName === undefined
                ? Number.isInteger(p.value) === false
                  ? p.value || 0
                  : p.value || 0
                : p.value || 0}
              {wrapperClassName !== "undefined" ? wrapperClassName : ""}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

// To find the part of the day using current time ..
export const getPartOfDay = (time) => {
  const hour = time.getHours();
  // const min = time.getMinutes();
  if (hour >= 5 && hour < 12) {
    return <p>Good morning!</p>;
  } else if (hour >= 12 && hour < 17) {
    return <p>Good afternoon!</p>;
  } else {
    return <p>Good evening!</p>;
  }
};
