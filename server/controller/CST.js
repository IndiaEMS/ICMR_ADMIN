import { CSTFORM } from "../Database/CST.js";
import { User } from "../Database/user.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { Worker } from "worker_threads";
import fastCsv from "fast-csv";

import { createObjectCsvWriter, createObjectCsvStringifier } from "csv-writer";
// import {dirname} from "path";
// __dirname = dirname;
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { Transform } from "stream";

export const CSTConroller = (req, res) => {
  const { CompleteForm } = req.body;
  CSTFORM.create(CompleteForm)
    .then((response) => {
      res.status(200).json({
        success: "Data submitted successfully!",
        response: response,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Error occured in saving data.",
      });
    });
};

// export const CSTGetController = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const state = req.params.state;

//     var CSTData;
//     if (id) {
//       CSTData = await CSTFORM.findById({ _id: id });
//     } else if (state) {
//       CSTData = await CSTFORM.find();
//     } else {
//       CSTData = await CSTFORM.find();
//     }

//     if (!CSTData) {
//       res.status(404).json({ error: "Data not found" });
//     }

//     res.status(200).json({
//       success: true,
//       data: CSTData,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const states = [
  { value: "", label: "All" },
  { value: "GJBRC_CS", label: "Gujarat" },
  { value: "ORPUR", label: "Odisha" },
  { value: "MPBHS", label: "Bhopal" },
  { value: "PBLDH", label: "Ludhiana" },
  { value: "PYPDY", label: "Pondicherry" },
];

export const CSTGetController = async (req, res, next) => {
  try {
    const adminId = req.user._id;
    const state = req.user.sitename;
    const role = req.user.role;

    if (!adminId || !state) {
      return next(new ErrorHandler("Both ID and state are required"));
    }

    const validateUser = await User.findById(adminId);
    if (!validateUser) {
      return next(new ErrorHandler("User is not authenticated"));
    }

    const stateCode = state?.trim();

    const matchedState = states.find((s) => s.label === stateCode);

    if (!matchedState) {
      return res.status(400).json({
        success: false,
        message: "State code not found",
      });
    }

    const regex = new RegExp(`^${matchedState.value}`);

    // Pagination
    let { page = 1, limit = 2000 } = req.query; // Default values
    const skip = (page - 1) * limit; // Correct skip calculation

    // Query based on role
    // const query = role === "superadmin" ? {} : { AA2: { $regex: regex } };
    const query = role === "superadmin" 
  // ? { AA1: { $nin: ["", null, undefined] } } // Check that AA1 is not an empty string
  ? {} // Check that AA1 is not an empty string
  : { 
      AA2: { $regex: regex },
      AA1: { $nin: ["", null, undefined] } // Also ensure AA1 is not empty for non-superadmin roles
    };



    const CSTData = await CSTFORM.find(query).skip(skip).limit(limit);
    const totalRecords = await CSTFORM.countDocuments(query);
    const totalPages = Math.ceil(totalRecords / limit);

    if (!CSTData || CSTData.length === 0) {
      return next(new ErrorHandler("Data not found"));
    }

    res.status(200).json({
      success: true,
      data: CSTData,
      totalRecords,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCst = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Ids not found or not provided",
      });
    }

    const deletedItems = await CSTFORM.deleteMany({
      _id: { $in: ids },
    });

    if (deletedItems.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No CST forms found with the provided ids",
      });
    }

    return res.status(200).json({
      success: true,
      message: `${deletedItems.deletedCount} CST forms deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const questions = [
  {
    id: "_id",
    title: "Record ID",
  },

  { id: "AA1", title: "AA.1 Date & Time:" },
  { id: "AA2", title: "AA.2 Site:" },
  { id: "AA3", title: "AA.3 Name of the Data Collector:" },
  {
    id: "AA4",
    title: "AA.4 Respondent ID:",
    valueGetter: (params) => params?.data?.Respondent_ID,
  },
  {
    id: "AB1",
    title: "AB.1 Block",
  },
  { id: "AB2", title: "AB.2 Type of PSU:" },
  { id: "AB3", title: "AB.3 Name of PSU (Town/Village):" },
  {
    id: "AB4",
    title: "AB.4 GPS Co-ordinates: (Latitude)",
    valueGetter: (params) => params?.data?.AB4?.latitude,
  },
  {
    id: "AB4",
    title: "AB.4 GPS Co-ordinates: (Longitude)",
    valueGetter: (params) => params?.data?.AB4?.longitude,
  },
  {
    id: "AB4",
    title: "AB.4 GPS Co-ordinates: (State)",
    valueGetter: (params) => params?.data?.AB4?.district,
  },
  {
    id: "AB4",
    title: "AB.4 GPS Co-ordinates: (district)",
    valueGetter: (params) => params?.data?.AB4?.state,
  },
  {
    id: "AB5",
    title: "AB.5 Household ID Number:",
    valueGetter: (params) => params?.data?.Household_ID,
  },
  {
    id: "AB6",
    title:
      "AB.6 For how long have you been living in this city/village with your family?",
  },
  {
    id: "AC1",
    title: "AC.1 How many members are currently residing in his household?",
  },
  // ...generateMemeberColumns,
  { id: "AC2_1", title: "AC.2.1 Name of Respondent?" },
  {
    id: "AC3",
    title:
      "AC.3 Are there any other persons such as small children or infants that we have not listed?",
  },
  {
    id: "AC4",
    title:
      "AC.4 Are there any other people who may not be members of your family such as domestic servants who usually live here?",
  },
  {
    id: "AC5",
    title:
      "AC.5 In the past one year, did any member of this household have any health emergency that could have required any sort of medical attention or treatment?",
  },
  {
    id: "AC6_1",
    title:
      "AC.6.1 In the past one year, did you or any member of this household suffered from sudden injury in Road Traffic Accident/ fracture/ severe fall/ drowning/ stabbing/ gunshot/ any other assault/ any attempt to self-harm/ domestic violence/ homicidal etc.?",
  },
  {
    id: "AC6_1_if",
    title:
      "AC6.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
  },
  {
    id: "AC6_2",
    title:
      "AC.6.2 If yes, could you please tell who all from your Household suffered with this condition?",
  },
  {
    id: "AC7_1",
    title:
      "AC.7.1 In the past one year, did you or any member of this household suffered from severe/ minor burns etc.",
  },
  {
    id: "AC7_1_if",
    title:
      "AC.7.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
  },
  {
    id: "AC7_2",
    title:
      "Ac.7.2 If yes, could you please tell who all from your Household suffered with this condition?",
  },
  {
    id: "AC8_1",
    title:
      "AC.8.1 In the past one year, has anyone in your household had a history of heart attack or sudden onset of acute chest pain/ heaviness/ constriction, with possible radiation to the left arm, neck, or back, associated with symptoms such as upper abdominal pain/ palpitations/ dizziness/ profuse sweating, and exacerbated by exertion after meals?",
  },
  {
    id: "AC8_1_if",
    title:
      "AC.8.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
  },
  {
    id: "AC8_2",
    title:
      "AC.8.2 If yes, could you please tell who all from your Household suffered with this condition?",
  },
  {
    id: "AC9_1",
    title:
      "Ac.9.1 In the past one year, did you or any member of this household suffered with brain stroke or symptoms like sudden onset of weakness, especially one side of the body/ loss of consciousness/ altered sensorium/ Imbalance/ blurred vision/ facial deviation/ drooping of eyelid/ speech abnormality with numbness and tingling sensation, or difficulty in speaking or understanding speech (aphasia), or sudden severe headache with no known cause of one's life (haemorrhagic strokes)?",
  },
  {
    id: "AC9_1_if",
    title:
      "AC.9.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
  },
  {
    id: "AC9_2",
    title:
      "AC.9.2 If yes, could you please tell who all from your Household suffered with this condition?",
  },
  {
    id: "AC10_1",
    title:
      "AC.10.1 In the past one year, has anyone in your household experienced breathlessness with or without sudden onset of fever/ cough with expectoration/ chest pain (pleuritic)/ fast breathing/ not able to speak complete sentences/ loss of consciousness/ or chest tightness leading to suspicion of pneumonia?",
  },
  {
    id: "AC10_1_if",
    title:
      "AC.10.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
  },
  {
    id: "AC10_2",
    title:
      "AC.10.2 If yes, could you please tell who all from your Household suffered with this condition?",
  },
  {
    id: "AC11_1",
    title:
      "AC.11.1 In the past one year, did any women in your household give birth to a child or had any episode of miscarriage/ abortion?",
  },
  {
    id: "AC11_1_if",
    title:
      "AC.11.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
  },
  {
    id: "AC11_2",
    title:
      "AC.11.2 If “Yes” to AC.11.1, did women or mother suffer with any condition like vaginal bleeding that required blood transfusion or sudden increase in blood pressure or decreased urine output or loss of fetal movements or loss of consciousness or seizure or fits etc., before / during / after delivery?",
  },
  {
    id: "AC11_2_if",
    title:
      "AC.11.2.2 If Yes, What were the symptoms of emergency conditions and first course of action?",
  },
  {
    id: "AC11_3",
    title:
      "AC.11.3 If “Yes” to AC.11.2, could you please tell us who suffered with this condition?",
  },
  {
    id: "AC11_4",
    title:
      'AC.11.4 If "Yes" to AC.11.1, At the time of birth did the new-born had any issues such as not cried/ delayed cry/ not able to breath/ body getting cold/ minimal limb movement/ blue discoloration/ taken no ICU after delivery/ convulsion/ sudden onset of fever/ difficulty in breast feeding/ excessive diarrhoea/ jaundice or any other condition that required a longer hospital stay before being discharged/ that required a further admission after discharge within the first month of the birth?',
  },
  {
    id: "AC11_4_if",
    title:
      "AC.11.4.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
  },
  {
    id: "AC11_5",
    title:
      "AC.11.5 If “Yes” to AC.11.4, could you please tell us who suffered with this condition?",
  },
  {
    id: "AC12_1",
    title:
      "AC.12.1 In the past one year have you or anyone from your family member been bitten by a snake?",
  },
  {
    id: "AC12_1_if",
    title:
      "AC.12.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
  },
  {
    id: "AC12_2",
    title:
      "AC.12.2 If “Yes”, could you please tell who all suffered with this condition?",
  },
  {
    id: "AC13_1",
    title:
      "AC.13.1 In the past one year, did you or anyone of your family member have a history of accidental/ intentional ingestion of poison/ ingestion or exposure to pesticides/ insecticides/ ingestion of rat poison/ phenyl any hazardous substance/ chemical substance or any other substance that could have required any sort of medical attention or treatment?",
  },
  {
    id: "AC13_1_if",
    title:
      "AC.13.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
  },
  {
    id: "AC13_2",
    title:
      "AC.13.2 If Yes, Could you please tell who all suffered with this condition?",
  },
  {
    id: "AC14_1",
    title:
      "AC.14.1 Apart from the above-mentioned conditions, did anyone suffer from any other conditions that required immediate emergency services?",
  },
  {
    id: "AC14_1_if",
    title:
      "AC.14.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
  },
  {
    id: "AC14_2",
    title:
      "AC.14.2 If yes, could you please tell who all suffered with this condition?",
  },
  {
    id: "AC15_1",
    title:
      "AC.15.1 In the last one year, did any member in your household lost his/her life due to any health emergency condition?",
  },
  // ...generateDeathMemeberColumns,
  {
    id: "AC15_2",
    title:
      "AC.15.2 If yes, how many members in your household lost his/her life due to any health emergency condition (Specify)",
  },
  {
    id: "AC15_4_0",
    title:
      "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Trauma)",
    valueGetter: (params) => params?.AC15_4?.[0],
  },
  {
    id: "AC15_4_1",
    title:
      "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Burn: Severe / Minor burns)",
    valueGetter: (params) => params?.AC15_4?.[1],
  },
  {
    id: "AC15_4_2",
    title:
      "Ac.15.4 What werw the symptoms the deceased complained about? (choice = STEMI)",
    valueGetter: (params) => params?.AC15_4?.[2],
  },
  {
    id: "AC15_4_3",
    title:
      "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Stroke)",
    valueGetter: (params) => params?.AC15_4?.[3],
  },
  {
    id: "AC15_4_4",
    title:
      "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Acute Respiratory Illness)",
    valueGetter: (params) => params?.AC15_4?.[4],
  },
  {
    id: "AC15_4_5",
    title:
      "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Postpartum Haemorrhage & Pre-Eclampsia)",
    valueGetter: (params) => params?.AC15_4?.[5],
  },
  {
    id: "AC15_4_6",
    title:
      "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Neonatal Emergency)",
    valueGetter: (params) => params?.AC15_4?.[6],
  },
  {
    id: "AC15_4_7",
    title:
      "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Snake bite)",
    valueGetter: (params) => params?.AC15_4?.[7],
  },
  {
    id: "AC15_4_8",
    title:
      "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Poisoning)",
    valueGetter: (params) => params?.AC15_4?.[9],
  },
  {
    id: "AC15_4_9",
    title:
      "Ac.15.4 What werw the symptoms the deceased complained about? (choice = others)",
    valueGetter: (params) => params?.AC15_4?.[10]?.split(":")[0],
  },
  {
    id: "AC15_4_9_other_specify",
    title:
      "Ac.15.4 What werw the symptoms the deceased complained about? (Others(Specify))",
    valueGetter: (params) => params?.AC15_4?.[10]?.split(":")[1],
  },
];

// Create a map for quick lookup
const questionMap = questions.reduce((acc, q) => {
  acc[q.id] = q.title;
  return acc;
}, {});

class ResponseToCsvTransform extends Transform {
  constructor(questionMap) {
    super({ objectMode: true });
    this.questionMap = questionMap;
    this.isFirstChunk = true;
  }

  _transform(doc, encoding, callback) {
    try {
      const rowData = {};

      // Convert MongoDB document to plain object
      const plainDoc = doc.toObject ? doc.toObject() : doc;

      // Map each field to its question text
      Object.entries(plainDoc).forEach(([key, value]) => {
        // Skip MongoDB internal fields
        if (key.startsWith("_")) return;

        // Use question text as header if available, otherwise use field ID
        const headerText = this.questionMap[key] || key;
        rowData[headerText] = value;
      });

      callback(null, rowData);
    } catch (error) {
      callback(error);
    }
  }
}

// export const CSTDownloadCsv = async (req, res) => {
//   try {
//     // Set headers for CSV download
//     res.setHeader("Content-Type", "text/csv");
//     res.setHeader("Content-Disposition", "attachment; filename=responses.csv");

//     // Create CSV stream with headers
//     const csvStream = fastCsv.format({
//       headers: true,
//       writeHeaders: true,
//     });

//     // Pipe to response
//     csvStream.pipe(res);

//     // Create transform stream
//     const transformStream = new ResponseToCsvTransform(questionMap);

//     // Create cursor and pipe through transforms
//     const cursor = CSTFORM.find({}).limit(500)
//       .cursor({ batchSize: 100 }) // Adjust batch size based on your needs
//       .pipe(transformStream)
//       .pipe(csvStream);

//     // Handle errors
//     cursor.on("error", (error) => {
//       console.error("Stream error:", error);
//       res.end();
//     });
//   } catch (error) {
//     console.error("CSV generation error:", error);
//     res.status(500).send("Error generating CSV");
//   }
// };

export const CSTUpdateController = async (req, res) => {
  try {
    // const { id } = req.params;
    const data = req.body;
    const updatedData = await CSTFORM.findByIdAndUpdate(data._id, data);
    res.status(200).json({updatedData,succes:true});
  }
  catch (error) {
    console.error(error);
    res.status(500).send("Error updating data");
  }
}




// Header Configuration List
const PartA = (generateMemeberColumns, generateDeathMemeberColumns) => [
  // const PartA = (generateMemeberColumns) => [
  { field: "AA1", headerName: "AA.1 Date & Time:" },
  { field: "AA2", headerName: "AA.2 Site:" },
  { field: "AA3", headerName: "AA.3 Name of the Data Collector:" },
  {
    field: "AA4",
    headerName: "AA.4 Respondent ID:",
    valueGetter: (item) => item?.data?.Respondent_ID || "Uncheck", // Fix: Directly accessing item
  },
  {
    field: "AB1",
    headerName: "AB.1 Block",
  },
  { field: "AB2", headerName: "AB.2 Type of PSU:" },
  { field: "AB3", headerName: "AB.3 Name of PSU (Town/Village):" },
  {
    field: "AB4",
    headerName: "AB.4 GPS Co-ordinates: (Latitude)",
    valueGetter: (params) => params?.data?.AB4?.latitude,
  },
  {
    field: "AB4",
    headerName: "AB.4 GPS Co-ordinates: (Longitude)",
    valueGetter: (params) => params?.data?.AB4?.longitude,
  },
  {
    field: "AB4",
    headerName: "AB.4 GPS Co-ordinates: (State)",
    valueGetter: (params) => params?.data?.AB4?.district,
  },
  {
    field: "AB4",
    headerName: "AB.4 GPS Co-ordinates: (district)",
    valueGetter: (params) => params?.data?.AB4?.state,
  },
  {
    field: "AB5",
    headerName: "AB.5 Household ID Number:",
    valueGetter: (params) => params?.data?.Household_ID,
  },
  {
    field: "AB6",
    headerName:
      "AB.6 For how long have you been living in this city/village with your family?",
  },
  {
    field: "AC1",
    headerName:
      "AC.1 How many members are currently residing in his household?",
  },
  ...generateMemeberColumns,
  { field: "AC2_1", headerName: "AC.2.1 Name of Respondent?" },
  {
    field: "AC3",
    headerName:
      "AC.3 Are there any other persons such as small children or infants that we have not listed?",
  },
  {
    field: "AC4",
    headerName:
      "AC.4 Are there any other people who may not be members of your family such as domestic servants who usually live here?",
  },
  {
    field: "AC5",
    headerName:
      "AC.5 In the past one year, did any member of this household have any health emergency that could have required any sort of medical attention or treatment?",
  },
  {
    field: "AC6_1",
    headerName:
      "AC.6.1 In the past one year, did you or any member of this household suffered from sudden injury in Road Traffic Accident/ fracture/ severe fall/ drowning/ stabbing/ gunshot/ any other assault/ any attempt to self-harm/ domestic violence/ homicidal etc.?",
  },
  {
    field: "AC6_1_if",
    headerName:
      "AC6.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
  },
  {
    field: "AC6_2",
    headerName:
      "AC.6.2 If yes, could you please tell who all from your Household suffered with this condition?",
  },
  {
    field: "AC7_1",
    headerName:
      "AC.7.1 In the past one year, did you or any member of this household suffered from severe/ minor burns etc.",
  },
  {
    field: "AC7_1_if",
    headerName:
      "AC.7.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
  },
  {
    field: "AC7_2",
    headerName:
      "Ac.7.2 If yes, could you please tell who all from your Household suffered with this condition?",
  },
  {
    field: "AC8_1",
    headerName:
      "AC.8.1 In the past one year, has anyone in your household had a history of heart attack or sudden onset of acute chest pain/ heaviness/ constriction, with possible radiation to the left arm, neck, or back, associated with symptoms such as upper abdominal pain/ palpitations/ dizziness/ profuse sweating, and exacerbated by exertion after meals?",
  },
  {
    field: "AC8_1_if",
    headerName:
      "AC.8.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
  },
  {
    field: "AC8_2",
    headerName:
      "AC.8.2 If yes, could you please tell who all from your Household suffered with this condition?",
  },
  {
    field: "AC9_1",
    headerName:
      "Ac.9.1 In the past one year, did you or any member of this household suffered with brain stroke or symptoms like sudden onset of weakness, especially one side of the body/ loss of consciousness/ altered sensorium/ Imbalance/ blurred vision/ facial deviation/ drooping of eyelid/ speech abnormality with numbness and tingling sensation, or difficulty in speaking or understanding speech (aphasia), or sudden severe headache with no known cause of one's life (haemorrhagic strokes)?",
  },
  {
    field: "AC9_1_if",
    headerName:
      "AC.9.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
  },
  {
    field: "AC9_2",
    headerName:
      "AC.9.2 If yes, could you please tell who all from your Household suffered with this condition?",
  },
  {
    field: "AC10_1",
    headerName:
      "AC.10.1 In the past one year, has anyone in your household experienced breathlessness with or without sudden onset of fever/ cough with expectoration/ chest pain (pleuritic)/ fast breathing/ not able to speak complete sentences/ loss of consciousness/ or chest tightness leading to suspicion of pneumonia?",
  },
  {
    field: "AC10_1_if",
    headerName:
      "AC.10.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
  },
  {
    field: "AC10_2",
    headerName:
      "AC.10.2 If yes, could you please tell who all from your Household suffered with this condition?",
  },
  {
    field: "AC11_1",
    headerName:
      "AC.11.1 In the past one year, did any women in your household give birth to a child or had any episode of miscarriage/ abortion?",
  },
  {
    field: "AC11_1_if",
    headerName:
      "AC.11.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
  },
  {
    field: "AC11_2",
    headerName:
      "AC.11.2 If “Yes” to AC.11.1, did women or mother suffer with any condition like vaginal bleeding that required blood transfusion or sudden increase in blood pressure or decreased urine output or loss of fetal movements or loss of consciousness or seizure or fits etc., before / during / after delivery?",
  },
  {
    field: "AC11_2_if",
    headerName:
      "AC.11.2.2 If Yes, What were the symptoms of emergency conditions and first course of action?",
  },
  {
    field: "AC11_3",
    headerName:
      "AC.11.3 If “Yes” to AC.11.2, could you please tell us who suffered with this condition?",
  },
  {
    field: "AC11_4",
    headerName:
      'AC.11.4 If "Yes" to AC.11.1, At the time of birth did the new-born had any issues such as not cried/ delayed cry/ not able to breath/ body getting cold/ minimal limb movement/ blue discoloration/ taken no ICU after delivery/ convulsion/ sudden onset of fever/ difficulty in breast feeding/ excessive diarrhoea/ jaundice or any other condition that required a longer hospital stay before being discharged/ that required a further admission after discharge within the first month of the birth?',
  },
  {
    field: "AC11_4_if",
    headerName:
      "AC.11.4.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
  },
  {
    field: "AC11_5",
    headerName:
      "AC.11.5 If “Yes” to AC.11.4, could you please tell us who suffered with this condition?",
  },
  {
    field: "AC12_1",
    headerName:
      "AC.12.1 In the past one year have you or anyone from your family member been bitten by a snake?",
  },
  {
    field: "AC12_1_if",
    headerName:
      "AC.12.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
  },
  {
    field: "AC12_2",
    headerName:
      "AC.12.2 If “Yes”, could you please tell who all suffered with this condition?",
  },
  {
    field: "AC13_1",
    headerName:
      "AC.13.1 In the past one year, did you or anyone of your family member have a history of accidental/ intentional ingestion of poison/ ingestion or exposure to pesticides/ insecticides/ ingestion of rat poison/ phenyl any hazardous substance/ chemical substance or any other substance that could have required any sort of medical attention or treatment?",
  },
  {
    field: "AC13_1_if",
    headerName:
      "AC.13.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
  },
  {
    field: "AC13_2",
    headerName:
      "AC.13.2 If Yes, Could you please tell who all suffered with this condition?",
  },
  {
    field: "AC14_1",
    headerName:
      "AC.14.1 Apart from the above-mentioned conditions, did anyone suffer from any other conditions that required immediate emergency services?",
  },
  {
    field: "AC14_1_if",
    headerName:
      "AC.14.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
  },
  {
    field: "AC14_2",
    headerName:
      "AC.14.2 If yes, could you please tell who all suffered with this condition?",
  },
  {
    field: "AC15_1",
    headerName:
      "AC.15.1 In the last one year, did any member in your household lost his/her life due to any health emergency condition?",
  },
  ...generateDeathMemeberColumns,
  {
    field: "AC15_2",
    headerName:
      "AC.15.2 If yes, how many members in your household lost his/her life due to any health emergency condition (Specify)",
  },
  {
    field: "AC15_4_0",
    headerName:
      "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Trauma)",
    valueGetter: (params) => params?.AC15_4?.[0],
  },
  {
    field: "AC15_4_1",
    headerName:
      "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Burn: Severe / Minor burns)",
    valueGetter: (params) => params?.AC15_4?.[1],
  },
  {
    field: "AC15_4_2",
    headerName:
      "Ac.15.4 What werw the symptoms the deceased complained about? (choice = STEMI)",
    valueGetter: (params) => params?.AC15_4?.[2],
  },
  {
    field: "AC15_4_3",
    headerName:
      "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Stroke)",
    valueGetter: (params) => params?.AC15_4?.[3],
  },
  {
    field: "AC15_4_4",
    headerName:
      "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Acute Respiratory Illness)",
    valueGetter: (params) => params?.AC15_4?.[4],
  },
  {
    field: "AC15_4_5",
    headerName:
      "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Postpartum Haemorrhage & Pre-Eclampsia)",
    valueGetter: (params) => params?.AC15_4?.[5],
  },
  {
    field: "AC15_4_6",
    headerName:
      "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Neonatal Emergency)",
    valueGetter: (params) => params?.AC15_4?.[6],
  },
  {
    field: "AC15_4_7",
    headerName:
      "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Snake bite)",
    valueGetter: (params) => params?.AC15_4?.[7],
  },
  {
    field: "AC15_4_8",
    headerName:
      "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Poisoning)",
    valueGetter: (params) => params?.AC15_4?.[9],
  },
  {
    field: "AC15_4_9",
    headerName:
      "Ac.15.4 What werw the symptoms the deceased complained about? (choice = others)",
    valueGetter: (params) => params?.AC15_4?.[10]?.split(":")[0],
  },
  {
    field: "AC15_4_9_other_specify",
    headerName:
      "Ac.15.4 What werw the symptoms the deceased complained about? (Others(Specify))",
    valueGetter: (params) => params?.AC15_4?.[10]?.split(":")[1],
  },
  {
    field: "AC15_4",
    headerName: "Ac.15.4 What werw the symptoms the deceased complained about?",
    valueGetter: (params) => getOptionsIndex(params?.data?.AC15_4),
  },
];

const PartBcolumns = [
  {
    field: "Name",
    headerName: "Name",
  },
  {
    field: "Emergency",
    headerName: "Emergency",
  },
  {
    field: "B0",
    headerName:
      "B.0 When did the Patient (Name of the patient from the list) suffered with this condition?",
  },
  { field: "B1", headerName: "B.1 Marital satus:" },
  { field: "B2", headerName: "B.2 Level of education:" },
  { field: "B3", headerName: "B.3 Occupation:" },
  {
    field: "B4_0",
    headerName:
      "B.4 Which of the following Health Insurance coverage you or the person with emergency condition or the deceased had? (Choice = Private cashless)",
  },
  {
    field: "B4_1",
    headerName:
      "B.4 Which of the following Health Insurance coverage you or the person with emergency condition or the deceased had? (Choice = Private reimbursement)",
  },
  {
    field: "B4_2",
    headerName:
      "B.4 Which of the following Health Insurance coverage you or the person with emergency condition or the deceased had? (Choice = Central Health Insurance Scheme (Ayushmaan Bharat/ CGHS / etc.))",
  },
  {
    field: "B4_3",
    headerName:
      "B.4 Which of the following Health Insurance coverage you or the person with emergency condition or the deceased had? (Choice = State Health Insurance Scheme)",
  },
  {
    field: "B4_4",
    headerName:
      "B.4 Which of the following Health Insurance coverage you or the person with emergency condition or the deceased had? (Choice = Co-Payment)",
  },
  {
    field: "B4_5",
    headerName:
      "B.4 Which of the following Health Insurance coverage you or the person with emergency condition or the deceased had? (Choice = Community Health Insurance Programme)",
  },
  {
    field: "B4_6",
    headerName:
      "B.4 Which of the following Health Insurance coverage you or the person with emergency condition or the deceased had? (Choice = None)",
  },
  {
    field: "B4_7",
    headerName:
      "B.4 Which of the following Health Insurance coverage you or the person with emergency condition or the deceased had? (Choice = Prefer not to disclose/ Refuse)",
  },
  {
    field: "B4_8",
    headerName:
      "B.4 Which of the following Health Insurance coverage you or the person with emergency condition or the deceased had? (Choice = Don’t Know)",
  },
  {
    field: "B4",
    headerName:
      "B.4 Which of the following Health Insurance coverage you or the person with emergency condition or the deceased had?",
    valueGetter: (params) => getOptionsIndex(params?.B4),
  },
  { field: "B5_dt", headerName: "B.5 When did this incident take place?" },
  {
    field: "B6",
    headerName: "B.6 How sure/confident are you about the time of Incident?",
  },
  {
    field: "B7",
    headerName: "B.7 Where did the medical emergency situation arise?",
  },
  {
    field: "B7",
    headerName:
      "B.7 Where did the medical emergency situation arise? (other Speify)",
  },
  {
    field: "B8",
    headerName:
      "B.8 Which was the first symptom you/ or the person expressed or complaint of during emergency condition?",
  },
  {
    field: "B9",
    headerName:
      "B.9 When was the first symptom of a medical emergency recognised? ",
  },
  {
    field: "B10",
    headerName: "B.10 How sure/confident are you about the time of Incident?",
  },
  {
    field: "B11",
    headerName:
      "B.11 At the start of symptoms was any medication taken/ given at home to alleviate symptoms?",
  },
  {
    field: "B12_if",
    headerName: "B.12 If yes, what medication was given?",
  },
  {
    field: "B13",
    headerName: "B.13 Which was the first symptom recognised as serious?",
  },
  {
    field: "B14",
    headerName: "B.14 Who first recognized the symptoms to be serious?",
    valueGetter: (params) =>
      params?.B14?.split(":")?.[1]?.length > 0 && params?.B14?.split(":")?.[1] !== undefined ? "Other" : params?.B14,
  },
  {
    field: "B14",
    headerName:
      "B.14 Who first recognized the symptoms to be serious? (other specify)",
    valueGetter: (params) => params?.B14?.split(":")[1],
  },
  {
    field: "B15",
    headerName:
      "B.15 What was your first course of action on identifying the emergency condition?",
  },
  {
    field: "B16",
    headerName:
      "B.16 If Home visit by a doctor, then which type of doctor visited to attend the emergency patient?",
  },
  {
    field: "B16",
    headerName:
      "B.16 If Home visit by a doctor, then which type of doctor visited to attend the emergency patient? (Other specify)",
  },
  {
    field: "B17",
    headerName:
      "B.17 Who suggested you visit the healthcare facility for emergency care?",
    valueGetter: (params) =>
      params?.B17?.split(":")?.[1]?.length > 0 && params?.B17?.split(":")?.[1] !== undefined ? "Other" : params?.B17,
  },
  {
    field: "B17",
    headerName:
      "B.17 Who suggested you visit the healthcare facility for emergency care? (Other Specify)",
    valueGetter: (params) =>
      params?.B17?.split(":")?.[1]?.length > 0 ? "Other" : "",
  },
  {
    field: "B18",
    headerName:
      "B.18 How much time did it take to decide to seek care or call an ambulance or any transport after recognizing the symptom? (Hour)",
    valueGetter: (params) => params?.B18_1,
  },
  {
    field: "B18",
    headerName:
      "B.18 How much time did it take to decide to seek care or call an ambulance or any transport after recognizing the symptom? (In Min)",
    valueGetter: (params) => params?.B18_2,
  },
  {
    field: "B19",
    headerName:
      "B.19 How did you or the patient reach the first health care facility?",
    valueGetter: (params) => params?.B19?.split(":")[0],
  },
  {
    field: "B19",
    headerName:
      "B.19 How did you or the patient reach the first health care facility? (Other specify)",
    valueGetter: (params) => params?.B19?.split(":")[1],
  },
  {
    field: "B20",
    headerName:
      "B.20 What type of transport was used to reach the first health care facility?",
    valueGetter: (params) => params?.B20?.split(":")[0],
  },
  {
    field: "B20",
    headerName:
      "B.20 What type of transport was used to reach the first health care facility? (Other specify)",
    valueGetter: (params) => params?.B20?.split(":")[1],
  },
  {
    field: "B21",
    headerName:
      "B.21 If Govt. Ambulance, Which ambulance service you opted for?",
  },
  {
    field: "B21",
    headerName:
      "B.21 If Govt. Ambulance, Which ambulance service you opted for? (Other Specify)",
  },
  {
    field: "B22",
    headerName:
      "B.22 Were there any problems in arranging for transport of the patient?",
    valueGetter: (params) => params?.B22?.split(":")[0],
  },
  {
    field: "B22",
    headerName:
      "B.22 Were there any problems in arranging for transport of the patient? (other specify)",
    valueGetter: (params) => params?.B22?.split(":")[1],
  },
  {
    field: "B23",
    headerName:
      "B.23 How much time the ambulance/ any transport took to reach the point of incident? (Hour)",
    valueGetter: (params) => params?.B23_1,
  },
  {
    field: "B23",
    headerName:
      "B.23 How much time the ambulance/ any transport took to reach the point of incident? (Min)",
    valueGetter: (params) => params?.B23_2,
  },
  {
    field: "B24",
    headerName:
      "B.24 How much time the ambulance/ any transport took to reach the first facility from the point of incident? (hours)",
    valueGetter: (params) => params?.B24_1,
  },
  {
    field: "B24",
    headerName:
      "B.24 How much time the ambulance/ any transport took to reach the first facility from the point of incident? (hours)",
    valueGetter: (params) => params?.B24_2,
  },
  {
    field: "B25",
    headerName: "B.25 Which type of facility did you visit first?",
    valueGetter: (params) => params?.B25?.split(":")[0],
  },
  {
    field: "B25",
    headerName:
      "B.25 Which type of facility did you visit first? (Other Specify)",
    valueGetter: (params) => params?.B25?.split(":")[1],
  },
  { field: "B26", headerName: "B.26 What was the name of the facility?" },
  {
    field: "B27_0",
    headerName:
      "B.27 Who suggested you the above-mentioned facility for emergency care? (choice = Self)",
  },
  {
    field: "B27_1",
    headerName:
      "B.27 Who suggested you the above-mentioned facility for emergency care? (choice = Family members)",
  },
  {
    field: "B27_2",
    headerName:
      "B.27 Who suggested you the above-mentioned facility for emergency care? (choice = Neighbour)",
  },
  {
    field: "B27_3",
    headerName:
      "B.27 Who suggested you the above-mentioned facility for emergency care? (choice = ASHA/AWW)",
  },
  {
    field: "B27_4",
    headerName:
      "B.27 Who suggested you the above-mentioned facility for emergency care? (choice = ANM)",
  },
  {
    field: "B27_5",
    headerName:
      "B.27 Who suggested you the above-mentioned facility for emergency care? (choice = CHO)",
  },
  {
    field: "B27_5",
    headerName:
      "B.27 Who suggested you the above-mentioned facility for emergency care? (Other Specify)",
  },
  {
    field: "B27",
    headerName:
      "B.27 Who suggested you the above-mentioned facility for emergency care?",
    valueGetter: (params) => getOptionsIndex(params?.B27),
  },
  {
    field: "B28",
    headerName:
      "B.28 How long after reaching the first HCF (in emergency) was the patient attended?",
  },
  {
    field: "B29",
    headerName: "B.29 Who attended the patient at the first HCF?",
  },
  {
    field: "B30",
    headerName: "B.30 Was any treatment started at the HCF?",
  },
  {
    field: "B31",
    headerName:
      "B.31 Were any laboratory &/or radiology investigations done at the HCF?",
  },
  {
    field: "B32",
    headerName: "B.32 How much time was spent in investigations?",
  },
  {
    field: "B33",
    headerName: "B.33 Was the patient shifted to ICU/ CCU/ HDU at HCF?",
  },
  {
    field: "B34",
    headerName:
      "B.34 What was the final outcome of visiting the first facility or home visit by Doctor?",
  },
  {
    field: "B35",
    headerName:
      "B.35 What was the final diagnosis on consultation with the doctor or mentioned in the final discharge summary?",
  },
  // ...generateColumns(2, PartCcolumns),
];

const PartDcolumns = [
  {
    field: "D1_0",
    headerName:
      "D.1 Why did you NOT seek medical care at the facility during the emergency? (choice = Lack of severity of symptoms)",
  },
  {
    field: "D1_1",
    headerName:
      "D.1 Why did you NOT seek medical care at the facility during the emergency? (choice = Bad previous experience)",
  },
  {
    field: "D1_2",
    headerName:
      "D.1 Why did you NOT seek medical care at the facility during the emergency? (choice = High cost of medical care)",
  },
  {
    field: "D1_3",
    headerName:
      "D.1 Why did you NOT seek medical care at the facility during the emergency? (choice = Distant healthcare facilities)",
  },
  {
    field: "D1_4",
    headerName:
      "D.1 Why did you NOT seek medical care at the facility during the emergency? (choice = Non-availability of transport)",
  },
  {
    field: "D1_5",
    headerName:
      "D.1 Why did you NOT seek medical care at the facility during the emergency? (choice = Dissuaded by family/ friend/ neighbour)",
  },
  {
    field: "D1_6",
    headerName:
      "D.1 Why did you NOT seek medical care at the facility during the emergency? (choice = Absence of accompanying member)",
  },
  {
    field: "D1_7",
    headerName:
      "D.1 Why did you NOT seek medical care at the facility during the emergency? (choice = Doctors not taking care or visiting the patient after admission)",
  },
  {
    field: "D1_8",
    headerName:
      "D.1 Why did you NOT seek medical care at the facility during the emergency? (choice = Unavailability of OTC drugs)",
  },
  {
    field: "D1_9",
    headerName:
      "D.1 Why did you NOT seek medical care at the facility during the emergency? (choice = Over prescription of medicines)",
  },
  {
    field: "D1_10",
    headerName:
      "D.1 Why did you NOT seek medical care at the facility during the emergency? (choice = Unnecessary investigations)",
  },
  {
    field: "D1_11",
    headerName:
      "D.1 Why did you NOT seek medical care at the facility during the emergency? (choice = Cultural barrier)",
  },
  {
    field: "D1_12",
    headerName:
      "D.1 Why did you NOT seek medical care at the facility during the emergency? (choice = Linguistic barrier)",
  },
  {
    field: "D1_13",
    headerName:
      "D.1 Why did you NOT seek medical care at the facility during the emergency? (choice = Lack of trust)",
  },
  {
    field: "D1_14",
    headerName:
      "D.1 Why did you NOT seek medical care at the facility during the emergency? (choice = other)",
    valueGetter: (params) => params?.D1?.[14],
  },
  // {
  //   field: "D1_14_other_specify",
  //   headerName:
  //     "D.1 Why did you NOT seek medical care at the facility during the emergency? (other specify)",
  //   valueGetter: (params) => params?.D1?.[14],
  // },
  {
    field: "D1",
    headerName:
      "D.1 Why did you NOT seek medical care at the facility during the emergency?",
    valueGetter: (params) => getOptionsIndex(params?.D1),
  },
  {
    field: "D2_0",
    headerName:
      "D.2 During the last medical emergency, when you went to seek medical care what were the challenges faced. (choice = Difficulty in getting the transport to healthcare facilities)",
  },
  {
    field: "D2_1",
    headerName:
      "D.2 During the last medical emergency, when you went to seek medical care what were the challenges faced. (choice = Reaching health facility not treating the condition)",
  },
  {
    field: "D2_2",
    headerName:
      "D.2 During the last medical emergency, when you went to seek medical care what were the challenges faced. (choice = Unavailability of same clinicians)",
  },
  {
    field: "D2_3",
    headerName:
      "D.2 During the last medical emergency, when you went to seek medical care what were the challenges faced. (choice = Long waiting period)",
  },
  {
    field: "D2_4",
    headerName:
      "D.2 During the last medical emergency, when you went to seek medical care what were the challenges faced. (choice = Communication barrier)",
  },
  {
    field: "D2_5",
    headerName:
      "D.2 During the last medical emergency, when you went to seek medical care what were the challenges faced. (choice = Out of pocket expenditure)",
  },
  {
    field: "D2_6",
    headerName:
      "D.2 During the last medical emergency, when you went to seek medical care what were the challenges faced. (choice = Unavailability of OTC drugs)",
  },
  {
    field: "D2_7",
    headerName:
      "D.2 During the last medical emergency, when you went to seek medical care what were the challenges faced. (choice = Over prescription of medicines)",
  },
  {
    field: "D2_8",
    headerName:
      "D.2 During the last medical emergency, when you went to seek medical care what were the challenges faced. (choice = Doctors not taking care or visiting the patient after admission)",
  },
  {
    field: "D2_9",
    headerName:
      "D.2 During the last medical emergency, when you went to seek medical care what were the challenges faced. (choice = Unnecessary investigations)",
  },
  {
    field: "D2_10",
    headerName:
      "D.2 During the last medical emergency, when you went to seek medical care what were the challenges faced. (choice = Others)",
    valueGetter: (params) => params?.D2?.[10]?.split(":")[0],
  },
  // {
  //   field: "D2_10_other_specify",
  //   headerName:
  //     "D.2 During the last medical emergency, when you went to seek medical care what were the challenges faced. (choice = Other specify)",
  //   valueGetter: (params) => params?.D2?.[10]?.split(":")[1],
  // },
  {
    field: "D2_11",
    headerName:
      "D.2 During the last medical emergency, when you went to seek medical care what were the challenges faced. (choice = None of the above)",
  },
  {
    field: "D2",
    headerName:
      "D.2 During the last medical emergency, when you went to seek medical care what were the challenges faced. (choice = Difficulty in getting the transport to healthcare facilities)",
    valueGetter: (params) => getOptionsIndex(params?.D2),
  },
  {
    field: "D3_0",
    headerName:
      "D.3 What motivated you for seeking care or taking the patient to the healthcare facility for emergency care? (choice = Easy accessibility)",
  },
  {
    field: "D3_1",
    headerName:
      "D.3 What motivated you for seeking care or taking the patient to the healthcare facility for emergency care? (choice = Skilled Healthcare provider)",
  },
  {
    field: "D3_2",
    headerName:
      "D.3 What motivated you for seeking care or taking the patient to the healthcare facility for emergency care? (choice = Good Professional behaviour)",
  },
  {
    field: "D3_3",
    headerName:
      "D.3 What motivated you for seeking care or taking the patient to the healthcare facility for emergency care? (choice = Insurance facility)",
  },
  {
    field: "D3_4",
    headerName:
      "D.3 What motivated you for seeking care or taking the patient to the healthcare facility for emergency care? (choice = Affordable services)",
  },
  {
    field: "D3_5",
    headerName:
      "D.3 What motivated you for seeking care or taking the patient to the healthcare facility for emergency care? (choice = Insurance Empanelled Health care facility)",
  },
  {
    field: "D3_6",
    headerName:
      "D.3 What motivated you for seeking care or taking the patient to the healthcare facility for emergency care? (choice = Good ambience of HCF)",
  },
  {
    field: "D3_7",
    headerName:
      "D.3 What motivated you for seeking care or taking the patient to the healthcare facility for emergency care? (choice = Immediate care)",
  },
  {
    field: "D3_8",
    headerName:
      "D.3 What motivated you for seeking care or taking the patient to the healthcare facility for emergency care? (choice = Others)",
    valueGetter: (params) => params?.D3?.[8]?.split(":")[0],
  },
  // {
  //   field: "D3_8_other_specify",
  //   headerName:
  //     "D.3 What motivated you for seeking care or taking the patient to the healthcare facility for emergency care? (other specify)",
  //   valueGetter: (params) => params?.D3?.[8]?.split(":")[1],
  // },
  {
    field: "D3",
    headerName:
      "D.3 What motivated you for seeking care or taking the patient to the healthcare facility for emergency care?",
    valueGetter: (params) => getOptionsIndex(params?.D3),
  },
  {
    field: "D4_0",
    headerName:
      "D.4 While choosing a healthcare facility, what influence your decision to seek care during any health emergency conditions? (choice = Affordability)",
  },
  {
    field: "D4_1",
    headerName:
      "D.4 While choosing a healthcare facility, what influence your decision to seek care during any health emergency conditions? (choice = Availability of Transport)",
  },
  {
    field: "D4_2",
    headerName:
      "D.4 While choosing a healthcare facility, what influence your decision to seek care during any health emergency conditions? (choice = Availability of accompanying person)",
  },
  {
    field: "D4_3",
    headerName:
      "D.4 While choosing a healthcare facility, what influence your decision to seek care during any health emergency conditions? (choice = Distance from facility)",
  },
  {
    field: "D4_4",
    headerName:
      "D.4 While choosing a healthcare facility, what influence your decision to seek care during any health emergency conditions? (choice = Time delay)",
  },
  {
    field: "D4_5",
    headerName:
      "D.4 While choosing a healthcare facility, what influence your decision to seek care during any health emergency conditions? (choice = Others)",
    valueGetter: (params) => params?.D4?.[5]?.split(":")[0],
  },
  // {
  //   field: "D4_5_other_specify",
  //   headerName:
  //     "D.4 While choosing a healthcare facility, what influence your decision to seek care during any health emergency conditions? (other specify)",
  //   valueGetter: (params) => params?.D4?.[5]?.split(":")[1],
  // },
  {
    field: "D4",
    headerName:
      "D.4 While choosing a healthcare facility, what influence your decision to seek care during any health emergency conditions?",
    valueGetter: (params) => getOptionsIndex(params?.D4),
  },
];

const PartCcolumns = [
  {
    field: "C1",
    headerName:
      "C.1 Who took the decision to refer/ shift the patient to another facility?",
    valueGetter: (params) => params?.C1?.split(":")?.[0],
  },
  {
    field: "C1",
    headerName:
      "C.1 Who took the decision to refer/ shift the patient to another facility? (Other Specify)",
    valueGetter: (params) => params?.C1?.split(":")?.[1] ?? "",
  },
  {
    field: "C2_0",
    headerName:
      "C.2 If referral was suggested by the medical team, what was the reason given for referral? (choice = Serious illness requiring higher centre)",
  },
  {
    field: "C2_1",
    headerName:
      "C.2 If referral was suggested by the medical team, what was the reason given for referral? (choice = Unavailability of doctor)",
  },
  {
    field: "C2_2",
    headerName:
      "C.2 If referral was suggested by the medical team, what was the reason given for referral? (choice = Unavailability of specialist )",
  },
  {
    field: "C2_3",
    headerName:
      "C.2 If referral was suggested by the medical team, what was the reason given for referral? (choice = Medicines unavailable)",
  },
  {
    field: "C2_4",
    headerName:
      "C.2 If referral was suggested by the medical team, what was the reason given for referral? (choice = Admission facility unavailable)",
  },
  {
    field: "C2_5",
    headerName:
      "C.2 If referral was suggested by the medical team, what was the reason given for referral? (choice = Unavailability of bed)",
  },
  {
    field: "C2_6",
    headerName:
      "C.2 If referral was suggested by the medical team, what was the reason given for referral? (choice = Inappropriate staff behaviour)",
  },
  {
    field: "C2_7",
    headerName:
      "C.2 If referral was suggested by the medical team, what was the reason given for referral? (choice = Others)",
    valueGetter: (params) => params?.C2_7?.split(":")[0],
  },
  {
    field: "C2_7_other_specify",
    headerName:
      "C.2 If referral was suggested by the medical team, what was the reason given for referral? (Other Specify)",
    valueGetter: (params) => params?.C2_7?.split(":")[1],
  },
  {
    field: "C2",
    headerName:
      "C.2 If referral was suggested by the medical team, what was the reason given for referral?",
    valueGetter: (params) => getOptionsIndex(params?.C2),
  },
  { field: "C3", headerName: "C.3 Which facility were you referred?" },
  {
    field: "C4",
    headerName:
      "C.4 If referred by a health facility, was a referral slip given?",
  },
  {
    field: "C5",
    headerName:
      "C.5 How did you or the patient reach the referred health care facility?",
    valueGetter: (params) => params?.C5?.split(":")[0],
  },
  {
    field: "C5_other_specify",
    headerName:
      "C.5 How did you or the patient reach the referred health care facility? (Other Specify)",
    valueGetter: (params) => params?.C5?.split(":")[1],
  },
  {
    field: "C6",
    headerName:
      "C.6 What type of transport was used to reach the referred health care facility?",
    valueGetter: (params) => params?.C6?.split(":")[0],
  },
  {
    field: "C6_other_specify",
    headerName:
      "C.6 What type of transport was used to reach the referred health care facility? (Other Specify)",
    valueGetter: (params) => params?.C6?.split(":")[1],
  },
  {
    field: "C7",
    headerName:
      "C.7 If Govt. Ambulance, Which ambulance service you opted for?",
    valueGetter: (params) => params?.C7?.split(":")[0],
  },
  {
    field: "C7_other_specify",
    headerName:
      "C.7 If Govt. Ambulance, Which ambulance service you opted for? (Other Specify)",
    valueGetter: (params) => params?.C7?.split(":")[1],
  },
  {
    field: "C8",
    headerName:
      "C.8 Were there any problems in arranging for transport of the patient?",
    valueGetter: (params) => params?.C8?.split(":")[0],
  },
  {
    field: "C8_other_specify",
    headerName:
      "C.8 Were there any problems in arranging for transport of the patient? (Other Specify)",
    valueGetter: (params) => params?.C8?.split(":")[1],
  },
  {
    field: "C9",
    headerName:
      "C.9 How much time the ambulance/ any transport took to reach the referring facility? (In Min/Hour)",
    valueGetter: (params) =>
      `${params?.C9_1 ?? ""} ${params?.C9_2 ? ":" : ""} ${params?.C9_2 ?? ""}`,
  },
  {
    field: "C10",
    headerName:
      "C.10 How much time the ambulance/ any transport took to reach the referred facility? (In Min/Hour)",
    valueGetter: (params) =>
      `${params?.C10_1 ?? ""} ${params?.C10_2 ? ":" : ""} ${
        params?.C10_2 ?? ""
      }`,
  },
  {
    field: "C11",
    headerName: "C.11 Did the patient go to the referred facility?",
  },
  {
    field: "C12",
    headerName: "C.12 Which type of facility did you or the patient shifted?",
    valueGetter: (params) => params?.C12?.split(":")[0],
  },
  {
    field: "C12",
    headerName:
      "C.12 Which type of facility did you or the patient shifted? (Other Specify)",
    valueGetter: (params) => params?.C12?.split(":")[1],
  },
  {
    field: "C13",
    headerName: "C.13 What was the name of the facility the patient shifted?",
  },
  {
    field: "C14",
    headerName:
      "C.14 Who suggested you visit the above mentioned facility for further emergency care?",
    valueGetter: (params) => params?.C14?.split(":")[0],
  },
  {
    field: "C14",
    headerName:
      "C.14 Who suggested you visit the above mentioned facility for further emergency care? (Other Specify)",
    valueGetter: (params) => params?.C14?.split(":")[1],
  },
  {
    field: "C15",
    headerName:
      "C.15 How long after reaching the referral HCF (in emergency) was the patient attended?",
  },
  {
    field: "C16",
    headerName: "C.16 Who attended the patient at the referral HCF?",
  },
  {
    field: "C17",
    headerName: "C.17 Was any treatment started at the referral HCF?",
  },
  {
    field: "C18",
    headerName:
      "C.18 Were any laboratory &/or radiology investigations done at the HCF?",
  },
  {
    field: "C19",
    headerName:
      "C.19 How much time was spent in investigations at referral HCF?",
  },
  {
    field: "C20",
    headerName:
      "C.20 What was the final outcome of visiting the referral facility?",
  },
  {
    field: "C21",
    headerName:
      "C.21 What was the final diagnosis on consultation with the doctor or mentioned in the final discharge summary?",
  },
];

const PartEcolumns = [
  { field: "E1", headerName: "E.1 Was the patient covered by any insurance?" },
  {
    field: "E2_0",
    headerName:
      "E.2 If yes, which of the following Health Insurance coverage patient had? (choice = Private cashless)",
  },
  {
    field: "E2_1",
    headerName:
      "E.2 If yes, which of the following Health Insurance coverage patient had? (choice = Private reimbursement)",
  },
  {
    field: "E2_2",
    headerName:
      "E.2 If yes, which of the following Health Insurance coverage patient had? (choice = Central Health Insurance Scheme (Ayushmaan Bharat/ CGHS / etc.))",
  },
  {
    field: "E2_3",
    headerName:
      "E.2 If yes, which of the following Health Insurance coverage patient had? (choice = State Health Insurance Scheme)",
  },
  {
    field: "E2_4",
    headerName:
      "E.2 If yes, which of the following Health Insurance coverage patient had? (choice = Co-Payment)",
  },
  {
    field: "E2_5",
    headerName:
      "E.2 If yes, which of the following Health Insurance coverage patient had? (choice = Community Health Insurance Programme)",
  },
  {
    field: "E2_6",
    headerName:
      "E.2 If yes, which of the following Health Insurance coverage patient had? (choice = None)",
  },
  {
    field: "E2",
    headerName:
      "E.2 If yes, which of the following Health Insurance coverage patient had?",
    valueGetter: (params) => getOptionsIndex(params?.E2),
  },
  {
    field: "E3_a",
    headerName:
      "E.3 How much amount was spent on the following while availing the emergency care service? (choice = Drugs)",
  },
  {
    field: "E3_b",
    headerName:
      "E.3 How much amount was spent on the following while availing the emergency care service? (choice = Consultation)",
  },
  {
    field: "E3_c",
    headerName:
      "E.3 How much amount was spent on the following while availing the emergency care service? (choice = Diagnostics)",
  },
  {
    field: "E3_d",
    headerName:
      "E.3 How much amount was spent on the following while availing the emergency care service? (choice = Implants and devices etc.)",
  },
  {
    field: "E3_e",
    headerName:
      "E.3 How much amount was spent on the following while availing the emergency care service? (choice = Hospital stay)",
  },
  {
    field: "E3_f",
    headerName:
      "E.3 How much amount was spent on the following while availing the emergency care service? (choice = Other (Specify))",
  },
  {
    field: "E4",
    headerName:
      "E.4 What was the approximate overall money spent on the availing the emergency care service?",
  },
  {
    field: "E5_a",
    headerName:
      "E.5 How much extra amount was spent on the following while availing the emergency care service? (choice = Transportation)",
  },
  {
    field: "E5_b",
    headerName:
      "E.5 How much extra amount was spent on the following while availing the emergency care service? (choice = Boarding/ lodging)",
  },
  {
    field: "E5_c",
    headerName:
      "E.5 How much extra amount was spent on the following while availing the emergency care service? (choice = Nursing attendant)",
  },
  {
    field: "E5_d",
    headerName:
      "E.5 How much extra amount was spent on the following while availing the emergency care service? (choice = Food)",
  },
  {
    field: "E5_e",
    headerName:
      "E.5 How much extra amount was spent on the following while availing the emergency care service? (choice = Other (Specify))",
  },
  {
    field: "E6",
    headerName:
      "E.6 What was the approximate overall money spent on the availing the emergency care service?",
  },
  {
    field: "E7",
    headerName:
      "E.7 What is the cost of lost productivity due to missed workdays for patients and their family caregivers while accessing emergency care services?",
  },
  {
    field: "E8",
    headerName:
      "E.8 What is the cost of lost productivity due to premature death on the availing the emergency care service?",
  },
  {
    field: "E9_a",
    headerName:
      "E.9 What were the sources through which you met the expenses for emergency care and what is the amount covered? (choice = Personal Income)",
  },
  {
    field: "E9_b",
    headerName:
      "E.9 What were the sources through which you met the expenses for emergency care and what is the amount covered? (choice =  Household income excluding personal income)",
  },
  {
    field: "E9_c",
    headerName:
      "E.9 What were the sources through which you met the expenses for emergency care and what is the amount covered? (choice = Savings)",
  },
  {
    field: "E9_d",
    headerName:
      "E.9 What were the sources through which you met the expenses for emergency care and what is the amount covered? (choice = Loan from Bank)",
  },
  {
    field: "E9_e",
    headerName:
      "E.9 What were the sources through which you met the expenses for emergency care and what is the amount covered? (choice = Borrowed from friends/relatives)",
  },
  {
    field: "E9_f",
    headerName:
      "E.9 What were the sources through which you met the expenses for emergency care and what is the amount covered? (choice = Contribution from friends/relatives)",
  },
  {
    field: "E9_g",
    headerName:
      "E.9 What were the sources through which you met the expenses for emergency care and what is the amount covered? (choice = Selling assets/property/jewellery)",
  },
  {
    field: "E9_h",
    headerName:
      "E.9 What were the sources through which you met the expenses for emergency care and what is the amount covered? (choice = Insurance coverage)",
  },
  {
    field: "E9_i",
    headerName:
      "E.9 What were the sources through which you met the expenses for emergency care and what is the amount covered? (choice = Reimbursement from employer)",
  },
  {
    field: "E9_j",
    headerName:
      "E.9 What were the sources through which you met the expenses for emergency care and what is the amount covered? (choice = Other (Specify))",
  },
  {
    field: "E10",
    headerName:
      "E.10 Based on your experience what suggestion would you like to make to the government to improve the emergency services in your district?",
  },
];

const PartFcolumns = [
  { field: "F1", headerName: "F.1 Name of the Head of the Household:" },
  { field: "F2", headerName: "F.2 Age (in Years):" },
  {
    field: "F3",
    headerName: "F.3 Sex:",
    valueGetter: (params) => params?.F3?.split(":")[0],
  },
  {
    field: "F3",
    headerName: "F.3 Sex: (Other Specify)",
    valueGetter: (params) => params?.F3?.split(":")[1],
  },
  {
    field: "F4",
    headerName: "F.4 Religion",
  },
  { field: "F5", headerName: "F.5 Caste" },
  {
    field: "F6",
    headerName: "F.6 Marital status:",
  },
  {
    field: "F7",
    headerName: "F.7 Level of education:",
  },
  {
    field: "F8",
    headerName: "F.8 Occupation:",
  },
  {
    field: "F9",
    headerName: "F.9 Total family Income per Month (in INR):",
  },
  {
    field: "F10_0",
    headerName:
      "F.10 What type of Transport facility available at home: (choice = None)",
  },
  {
    field: "F10_1",
    headerName:
      "F.10 What type of Transport facility available at home: (choice = Two-Wheeler (Bicycle))",
  },
  {
    field: "F10_2",
    headerName:
      "F.10 What type of Transport facility available at home: (choice = Two-Wheeler (Motorcycle))",
  },
  {
    field: "F10_3",
    headerName:
      "F.10 What type of Transport facility available at home: (choice = Three-Wheeler (Manual Rickshaw, Auto rickshaw etc.))",
  },
  {
    field: "F10_4",
    headerName:
      "F.10 What type of Transport facility available at home: (choice = Four-Wheeler (Car/Jeep/etc.))",
  },
  {
    field: "F10_5",
    headerName:
      "F.10 What type of Transport facility available at home: (choice = Agricultural Vehicle (Tractor))",
  },
  {
    field: "F10_6",
    headerName:
      "F.10 What type of Transport facility available at home: (choice = Others)",
    valueGetter: (params) => params?.F10,
  },
  {
    field: "F10",
    headerName: "F.10 What type of Transport facility available at home:",
    valueGetter: (params) => getOptionsIndex(params?.F10),
  },
  // {
  //   field: "F10_os",
  //   headerName:
  //     "F.10 What type of Transport facility available at home: (Other Specify)",
  //   valueGetter: (params) => params?.F10?.split(":")[1],
  // },
  {
    field: "F11",
    headerName: "F.11 Do you have any medical insurance?",
  },
  {
    field: "F12_0",
    headerName:
      "F.12 If Yes, which of the following Household Medical Insurance coverage do you have? (choice = Private Insurance)",
  },
  {
    field: "F12_1",
    headerName:
      "F.12 If Yes, which of the following Household Medical Insurance coverage do you have? (choice = Central Health Insurance Scheme (Ayushmaan Bharat))",
  },
  {
    field: "F12_2",
    headerName:
      "F.12 If Yes, which of the following Household Medical Insurance coverage do you have? (choice = State Health Insurance Scheme)",
  },
  {
    field: "F12_3",
    headerName:
      "F.12 If Yes, which of the following Household Medical Insurance coverage do you have? (choice = Co-Payment)",
  },
  {
    field: "F12_4",
    headerName:
      "F.12 If Yes, which of the following Household Medical Insurance coverage do you have? (choice = Community Health Insurance Programme)",
  },
  {
    field: "F12_5",
    headerName:
      "F.12 If Yes, which of the following Household Medical Insurance coverage do you have? (choice = Employee based Insurance (ESI / CGHS/others))",
  },
  {
    field: "F12",
    headerName:
      "F.12 If Yes, which of the following Household Medical Insurance coverage do you have?",
    valueGetter: (params) => getOptionsIndex(params?.F12),
  },
  {
    field: "F13",
    headerName:
      "F.13 Are all your family members enrolled with the same Health Insurance coverage?",
  },
  {
    field: "F14",
    headerName:
      "F.14 How many of you or your family members have an individual medical/ health insurance scheme?",
  },
  {
    field: "F15",
    headerName: "F.15 Do you have a BPL card?",
  },
  {
    field: "F16",
    headerName: "F.16 Do you have ABHA ID?",
  },
  {
    field: "F17",
    headerName:
      "F.17 How many of your family members are enrolled with ABHA id?",
  },
  {
    field: "F18",
    headerName: "F.18 Type of Family",
  },
];

// 🟢 Member Columns Definition
const MemberColumns = [
  { field: "name", headerName: "Name" },
  { field: "age", headerName: "Age" },
  { field: "sex", headerName: "Sex" },
  { field: "MemberID", headerName: "MemberID", editable: false },
];

// 🟢 Generate Member Columns (Without Changing HeaderName)
const generateMemberColumns = (maxMembers, columns, tableName) => {
  return Array.from({ length: maxMembers }, (_, index) =>
    columns.map((column) => ({
      field: `${tableName}_${index}_${column.field}`,
      headerName: `${tableName}_${index}_${column.field}`,
      // headerName: column.headerName,

      valueGetter: (params) => {
        const members = params?.data?.[tableName] || []; // Ensure it's an array

        if (!Array.isArray(members)) {
          console.warn(`Expected array at ${tableName}, got:`, members);
          return "";
        }

        const member = members[index] || {}; // Get the member or empty object
        return member[column.field] !== undefined ? member[column.field] : "";
      },
    }))
  ).flat();
};

// const generatePartBColumns = (maxQuestions, columns, table_name) => {
//   return Array.from({ length: maxQuestions }, (_, questionIndex) =>
//     columns.map((column) => ({
//       field: `${table_name}_${questionIndex}_${column.field}`, // Unique field key
//       headerName: column.headerName,
//       editable: false,
//       valueGetter: (params) => {
//         const currentQuestion = params?.data?.[table_name]?.[questionIndex];

//         if (column.valueGetter) {
//           return column.valueGetter(currentQuestion);
//         } else if (Array.isArray(currentQuestion?.[column.field?.split("_")[0]])) {
//           const [mainKey, subKey] = column.field.split("_");
//           return currentQuestion?.[mainKey]?.[subKey] || "";
//         } else {
//           return currentQuestion ? currentQuestion[column.field] : "";
//         }
//       },
//     }))
//   ).flat();
// };


// old
// const generateColumns = (columns, table_name, questionIndex) => {
//   return columns.map((column) => ({
//     field: `${table_name}_${questionIndex}_${column.field}`,
//     headerName: column.headerName + ` (Emergency ${questionIndex + 1})`,
//     valueGetter: (params) => {
//       const currentQuestion = params?.data?.[table_name]?.[questionIndex];
//       return currentQuestion ? currentQuestion[column.field] : "";
//     },
//   }));
// };


// new
const generateColumns = (columns, table_name, questionIndex) => {
  return columns.map((column) => ({
    field: `${table_name}_${questionIndex}_${column.field}`,
    headerName: column.headerName + ` (Emergency ${questionIndex + 1})`,
    valueGetter: (params) => {
      const member = params?.data?.Emergency_Data?.[questionIndex]; // Use questionIndex for Emergency_Data access

      if (column.valueGetter) {
        return column.valueGetter(member); // Custom valueGetter if provided
      } else {
        if (Array.isArray(member?.[column.field.split("_")[0]])) {
          // Handle array-type data
          return member?.[column.field.split("_")[0]]?.[column.field.split("_")[1]];
        } else {
          // Return the normal field value
          return member ? member[column.field] : "";
        }
      }
    },
  }));
};


const generateAllColumns = (
  maxQuestions,
  maxPartC,
  partBColumns,
  partCColumns,
  partDColumns,
  partEColumns,
  partFColumns,
  table_name
) => {
  return Array.from({ length: maxQuestions }, (_, questionIndex) => {
    // 🟢 Generate columns for the current Emergency_Data index
    const partBColumnsForThisQuestion = generateColumns(
      partBColumns,
      table_name,
      questionIndex
    );

    const partEColumnsForThisQuestion = generateColumns(
      partEColumns,
      table_name,
      questionIndex
    );

    const partFColumnsForThisQuestion = generateColumns(
      partFColumns,
      table_name,
      questionIndex
    );

    // 🟢 Generate PartC columns for the current Emergency index

    // old
    // const partCColumnsForThisQuestion = Array.from(
    //   { length: maxPartC },
    //   (_, partCIndex) =>
    //     partCColumns.map((column) => ({
    //       field: `${table_name}_${questionIndex}_PartC_${partCIndex}_${column.field}`,
    //       headerName:
    //         column.headerName +
    //         ` (Emergency ${questionIndex + 1}, Part C ${partCIndex + 1})`,
    //       valueGetter: (params) => {
    //         const currentEmergency =
    //           params?.data?.[table_name]?.[questionIndex];
    //         if (!currentEmergency || !currentEmergency.PartCLoop) return "";

    //         return currentEmergency.PartCLoop[partCIndex]?.[column.field] || "";
    //       },
    //     }))
    // ).flat();

    //new 
    const partCColumnsForThisQuestion = Array.from(
      { length: maxPartC },
      (_, partCIndex) =>
        partCColumns.map((column) => ({
          field: `${table_name}_${questionIndex}_PartC_${partCIndex}_${column.field}`,
          headerName:
            column.headerName +
            ` (Emergency ${questionIndex + 1}, Part C ${partCIndex + 1})`,
          valueGetter: (params) => {
            const currentEmergency = params?.data?.[table_name]?.[questionIndex];
            if (!currentEmergency || !currentEmergency.PartCLoop) return "";
    
            const member = currentEmergency.PartCLoop[partCIndex];
            if (!member) return "";
    
            if (Array.isArray(member?.[column.field.split("_")[0]])) {
              // Handle array-type data
              return member?.[column.field.split("_")[0]]?.[column.field.split("_")[1]];
            } else {
              // Return the normal field value
              return member ? member[column.field] : "";
            }
          },
        }))
    ).flat();
    

    // 🟢 Generate PartD columns for the current Emergency index
    const partDColumnsForThisQuestion = generateColumns(
      partDColumns,
      table_name,
      questionIndex
    );

    // 🟢 Ensure proper order: B → C → D → E → F (per Emergency index)
    return [
      ...partBColumnsForThisQuestion,
      ...partCColumnsForThisQuestion,
      ...partDColumnsForThisQuestion,
      ...partEColumnsForThisQuestion,
      ...partFColumnsForThisQuestion,
    ];
  }).flat();
};

// ✅ CSTColumns Function
export const CSTColumns = (data) => {
  const maxMembers = Math.max(
    1,
    ...data.map((row) => row?.AC3_table?.length || 1)
  );
  const maxDeathMembers = Math.max(
    1,
    ...data.map((row) => row?.AC15_table?.length || 1)
  );
  const MaxEmergencyDataLength = Math.max(
    1,
    ...data.map((row) => row?.Emergency_Data?.length || 1)
  );
  const maxPartC = Math.max(
    1,
    ...data.flatMap(
      (row) =>
        row?.Emergency_Data?.map((entry) => entry?.PartCLoop?.length || 1) || []
    )
  );

  const generateMemeberColumns = generateMemberColumns(
    maxMembers,
    MemberColumns,
    "AC3_table"
  );
  const generateDeathMemeberColumns = generateMemberColumns(
    maxDeathMembers,
    MemberColumns,
    "AC15_table"
  );
  const generateQuestionColumns = generateAllColumns(
    MaxEmergencyDataLength,
    maxPartC,
    PartBcolumns,
    PartCcolumns,
    PartDcolumns,
    PartEcolumns,
    PartFcolumns,
    "Emergency_Data"
  );

  return [
    {
      headerName: "Record ID",
      field: "id",
      checkboxSelection: true,
      headerCheckboxSelection: false,
      checkbox: "single",
      width: 250,
      editable: false,
      valueGetter: (params) => params.data._id,
    },
     ...PartA(generateMemeberColumns, generateDeathMemeberColumns),
    ...generateQuestionColumns,
  ];
};

// ✅ Format Data for CSV
const formatDataForCSV = (data) => {
  const headersConfig = CSTColumns(data);

  return data.map((item) => {
    let formattedItem = {};
    headersConfig.forEach(({ headerName,field, valueGetter }) => {
      formattedItem[headerName] = valueGetter
        ? valueGetter({ data: item })
        : item[field] || "";
    });

    return formattedItem;
  });
};

// ✅ API to Download CSV
export const CSTDownloadCsv = async (req, res) => {
  try {

    // console.log("COmming");
    

    const adminId = req.user._id;
    const state = req.user.sitename;
    const role = req.user.role;

    if (!adminId || !state) {
      return next(new ErrorHandler("Both ID and state are required"));
    }

    const validateUser = await User.findById(adminId);
    if (!validateUser) {
      return next(new ErrorHandler("User is not authenticated"));
    }

    const stateCode = state?.trim();

    const matchedState = states.find((s) => s.label === stateCode);

    if (!matchedState) {
      return res.status(400).json({
        success: false,
        message: "State code not found",
      });
    }

    const regex = new RegExp(`^${matchedState.value}`);

    // const query = role === "superadmin" ? {} : { AA2: { $regex: regex } };
    const query = role === "superadmin" 
  ? { AA1: { $nin: ["", null, undefined] } } // Check that AA1 is not an empty string
  : { 
      // AA2: { $regex: regex },
      // AA1: { $nin: ["", null, undefined] } // Also ensure AA1 is not empty for non-superadmin roles
      AA2: { $regex: regex },
      // AA1: { $nin: ["", null, undefined] }
    };


    const data = await CSTFORM.find(query).sort({ _id: -1 }).lean();
    if (!data.length) return res.status(404).send("No data found");

    const formattedData = formatDataForCSV(data);
    const filePath = "data.csv";
    const ws = fs.createWriteStream(filePath);

    fastCsv
      .write(formattedData, { headers: true })
      .on("finish", function () {
        res.download(filePath, "data.csv", (err) => {
          if (err) {
            console.error(err);
            res.status(500).send("Error downloading file");
          }
          fs.unlinkSync(filePath);
        });
      })
      .pipe(ws);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getOptionsIndex = (data) => {
  // return data
  //   ?.map((value, index) => (value ? index + 1 : null))
  //   .filter((index) => index !== null)
  //   .join(", ");
  // return Array.isArray(data)
  //   ? data
  //       .map((value, index) => (value ? index + 1 : null))
  //       .filter((index) => index !== null)
  //       .join(", ")
  //   : "";

  return Array.isArray(data)
  ? data.reduce((result, value, index) => {
      if (value) result.push(index + 1);
      return result;
    }, []).join(", ")
  : '';
};
