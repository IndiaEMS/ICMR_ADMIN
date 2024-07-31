// const { MongoClient } = require('mongodb');
import { json2csv as _json2csv } from "json-2-csv";
import { writeFile } from "fs";

import { HFAT1 } from "../Database/HFAT-1.js";

async function exportToCsv() {
  try {
    // Fetch all documents from the collection
    const documents = await HFAT1.find({}).toArray();

    if (documents.length === 0) {
      console.log("No documents found in the collection");
      return;
    }

    // Convert JSON documents to CSV format
    _json2csv(documents, (err, csv) => {
      if (err) {
        throw err;
      }

      // Write CSV data to file
      writeFile("output.csv", csv, (err) => {
        if (err) {
          throw err;
        }
        console.log("Data successfully exported to output.csv");
      });
    });
  } catch (error) {
    console.error("Error exporting data:", error);
  } finally {
    // await client.close();
  }
}

exportToCsv();
