import { parentPort } from "worker_threads";
import { createObjectCsvWriter as createCsvWriter } from "csv-writer";
import path,{ dirname } from "path";
import { fileURLToPath } from "url";
// const { MONGO_URI } = require("../config/env");
import { CSTFORM } from "../Database/CST.js";

// Question Mapping
const questionMapping = [
  { headerName: "Record ID", field: "id" },
  // { fieldName: "a1", headerName: "Name" },
  // { fieldName: "a2", headerName: "Age" },
  // { fieldName: "a3", headerName: "Address" },
];

// MongoDB Connection
// mongoose
//   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Worker connected to MongoDB"))
//   .catch((err) => {
//     console.error("Worker MongoDB connection error:", err);
//     parentPort.postMessage("error");
//   });

parentPort.on("message", async () => {
  try {
    const __dirname = dirname(fileURLToPath(import.meta.url));
  
    console.log("Worker started",dirname);
    
    const csvWriter = createCsvWriter({
      path: path.resolve(__dirname, "../dataset.csv"),
      header: questionMapping.map((q) => ({
        id: q.field,
        title: q.headerName,
      })),
    });

    

    // Fetch data in batches
    const batchSize = 1000;
    const cursor = CSTFORM.find().limit(10).cursor();
    const records = [];
    // console.log("Worker started",cursor);
    

    for await (const doc of cursor) {
      records.push(doc);
      console.log("Worker started",doc);
      

      if (records.length >= batchSize) {
        await csvWriter.writeRecords(records);
        records.length = 0; // Clear batch
      }
    }

    // Write remaining records
    if (records.length > 0) {
      await csvWriter.writeRecords(records);
    }

    console.log(records.length);
    

    console.log("Worker completed",path.resolve(__dirname, "../dataset.csv"));
    

    parentPort.postMessage(path.resolve(__dirname, "../dataset.csv"));
  } catch (error) {
    console.error("Worker error:", error);
    parentPort.postMessage("error");
  }
});
