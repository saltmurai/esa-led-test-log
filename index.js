const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: "data.csv",
  header: [
    { id: "timestamp", title: "Timestamp", type: "datetime" },
    { id: "chanel", title: "Chanel" },
    { id: "A_AC", title: "A_AC" },
    { id: "A_DC", title: "A_DC" },
    { id: "Cos_PHI_AC", title: "Cos_PHI_AC" },
    { id: "Cos_PHI_DC", title: "Cos_PHI_DC" },
    { id: "Freq", title: "Freq" },
    { id: "PF_AC", title: "PF_AC" },
    { id: "PF_DC", title: "PF_DC" },
    { id: "P_AC", title: "P_AC" },
    { id: "P_DC", title: "P_DC" },
    { id: "V_AC", title: "V_AC" },
    { id: "V_DC", title: "V_DC" },
  ],
});

let lastChanel = 0;

setInterval(() => {
	const timestamp = new Date().toISOString();
	// const timestamp = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  fetch("http://localhost:5000/data")
    .then((res) => res.json())
    .then((data) => {
      if (data.chanel !== 0 && data.chanel !== lastChanel) {
        const record = { timestamp, ...data, chanel: data.chanel.toString() };
        csvWriter
          .writeRecords([record])
          .then(() => console.log("Data written to CSV file"));
        lastChanel = data.chanel;
      }
    })
    .catch((err) => console.error(err));
}, 1000);