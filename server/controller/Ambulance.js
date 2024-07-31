import express, { response } from "express";
import mongoose from "mongoose";
import { AMBULANCE } from "../Database/Ambulance.js";
const app = express();

export const AMBULANCEController = async (req, res) => {
  console.log("Comming");
  var { completeform, table1, table2, uniqueCode } = req.body;
  completeform = JSON.parse(completeform);
  table1 = JSON.parse(table1);
  table2 = JSON.parse(table2);
  uniqueCode = JSON.parse(uniqueCode);

  AMBULANCE.find({ AMB1: completeform?.AMB1 }).then((response) => {
    console.log(response);
    const combinedData = {
      ...completeform,
      table1,
      table2,
      formUniqueCode: uniqueCode,
      uniqueCode: `${completeform.AMB1}_${response.length + 1}`,
    };
    AMBULANCE.create(combinedData)
      .then((result) => {
        res.status(200).json({ success: "data saved", result });
      })
      .catch((err) => {
        res.status(400).json({ error: "error for data save" });
      });
  });
  // const hfat1 = req.body;
  // try {
  //   HFAT1.find({ A3: hfat1?.A3 }).then((response) => {
  //     const newHFAT1 = new HFAT1({
  //       uniqueCode: `${hfat1.A3}_${response.length + 1}`,
  //       ...hfat1,
  //     });
  //     // const newHFAT1 = new HFAT1(hfat);
  //     newHFAT1.save();
  //     res.status(201).json(newHFAT1);
  //   });
  // } catch (error) {
  //   res.status(409).json({ message: error.message });
  // }
};

export const AMBULANCEGet = async (req, res, next) => {
  try {
    const id = req.params.id;
    // const HEAT1Data = await HFAT1.find({ _id: "668b69b81f251d985457e463" });
    var AMBULANCEData;
    if (id) {
      AMBULANCEData = await AMBULANCE.findById({ _id: id });
    } else {
      AMBULANCEData = await AMBULANCE.find();
    }
    if (!AMBULANCEData) {
      res.status(404).json({ error: "Data not found" });
    }

    res.status(200).json({
      success: true,
      data: AMBULANCEData,
    });
  } catch (error) {
    next(error);
  }
};
