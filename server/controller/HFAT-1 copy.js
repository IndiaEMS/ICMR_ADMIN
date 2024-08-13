import express, { response } from "express";
import mongoose from "mongoose";
import { HFAT1 } from "../Database/HFAT-1.js";
import { createObjectCsvWriter, createObjectCsvStringifier } from "csv-writer";
const app = express();
import ExcelJS from "exceljs";

export const HFAT1Controller = async (req, res) => {
  var { completeform, table1, table2, table3, table4 } = req.body;
  // console.log(completeform, table1, table2, table3, table4);
  completeform = JSON.parse(completeform);
  table1 = JSON.parse(table1);
  table2 = JSON.parse(table2);
  table3 = JSON.parse(table3);
  table4 = JSON.parse(table4);

  const combinedData = { ...completeform, table1, table2, table3, table4 };
  HFAT1.create(combinedData)
    .then((result) => {
      res.status(200).json({ success: "data saved", result });
    })
    .catch((err) => {
      res.status(400).json({ error: "error for data save" });
    });
};

export const HFAT1Get = async (req, res, next) => {
  try {
    const HEAT1Data = await HFAT1.find();
    if (!HEAT1Data) {
      res.status(404).json({ error: "Data not found" });
    }

    res.status(200).json({
      success: true,
      HEAT1Data,
    });
  } catch (error) {
    next(error);
  }
};

export const HFAT1DownloadCsv = async (req, res) => {
  try {
    const data = await HFAT1.find().lean();

    const csvStringifier = createObjectCsvStringifier({
      header: [
        {
          id: "_id",
          title: "Record ID",
        },
        { id: "A1", title: "Assessor's Name" },
        { id: "A2", title: "Date:" },
        { id: "A3", title: "Code:" },
        { id: "A4", title: "Block Name:" },
        { id: "A5", title: "Healthcare Facility Name" },
        { id: "A6", title: "Healthcare Facility Address:" },
        { id: "A7", title: "Name of the Hospital Superintendent:" },
        { id: "A8", title: "Contact Number of the Hospital Superintendent:" },
        { id: "A9", title: "Email ID:" },
        { id: "A10", title: "GPS_1" },
        { id: "A10", title: "GPS_2" },
        { id: "A11", title: "Type of Health Care Facility?" },
        {
          id: "A12",
          title: "If Tertiary care center, select the appropriate one",
        },
        {
          id: "B1",
          title:
            "1B.1 How many beds are available for the in-patient department (IPD)?",
        },
        {
          id: "B2",
          title:
            "1B.2 Whether any dedicated bed present for emergency care? If No, skip to 1B.5",
        },
        {
          id: "B3",
          title: "1B.3. How many beds are available for emergency care?",
        },
        { id: "B4_0", title: "a. Red:" },
        { id: "B4_1", title: "b. Yellow:" },
        { id: "B4_2", title: "c. Green" },
        {
          id: "B5",
          title:
            "1B.5 What is the average number of patients presenting to OPD per month?",
        },
        {
          id: "B6",
          title:
            "1B.6 What is the average number of patients presenting with emergency conditions daily? (Chest pain, stroke, acute weakness, acute blindness, Shortness of breath, altered mentation, snake bite, bites, road traffic accident, injuries ,poisoning, deliberate self-harm, infectious diseases, fever, pregnancy related, seizure, acute abdomen, anaphylaxis, cerebro-meningeal infections, foreign body, acute pulmonary disease, Shock, accidental injuries, infections)",
        },
        {
          id: "B7",
          title: "1B.7 Does the facility have a licensed in-house blood bank?",
        },
        {
          id: "B8",
          title:
            "1B.8 Which of these does the blood bank have among the following? (choice=Component facility)",
        },
        {
          id: "B8",
          title:
            "1B.8 Which of these does the blood bank have among the following? (choice=O- ve Blood availability)",
        },
        {
          id: "B9",
          title: "1B.9 Is there a blood storage facility inside the emergency?",
        },
        {
          id: "B10",
          title:
            "1B.10 Which of the following does your facility have to provide easy access for emergency care? (choice=No vehicles parked on the way/in front of emergency department)",
        },
        {
          id: "B11_0",
          title:
            "1B.10 Which of the following does your facility have to provide easy access for emergency care? (choice=Designated parking area for Ambulance, Staff and Public)",
        },
        {
          id: "B11_1",
          title:
            "1B.10 Which of the following does your facility have to provide easy access for emergency care? (choice=Smooth entry area with adequate wheelchair, trolley and stretcher bay)",
        },
        {
          id: "B11_0",
          title:
            "1B.11 Which of the following demarcated /dedicated areas does this facility have for emergency care? (Select all that apply) (choice=Decontamination Area at the Entrance of ED)",
        },
        {
          id: "B11_1",
          title:
            "1B.11 Which of the following demarcated /dedicated areas does this facility have for emergency care? (Select all that apply) (choice=Hospital attendant at the entrance of hospital to help the patient with the wheelchair, stretcher, etc.)",
        },
        {
          id: "B11_0",
          title:
            "1B.11 Which of the following demarcated /dedicated areas does this facility have for emergency care? (Select all that apply) (choice=Waiting area for patients/ attendants)",
        },
        {
          id: "B11_1",
          title:
            "1B.11 Which of the following demarcated /dedicated areas does this facility have for emergency care? (Select all that apply) (choice=Police control room)",
        },
        {
          id: "B11_0",
          title:
            "1B.11 Which of the following demarcated /dedicated areas does this facility have for emergency care? (Select all that apply) (choice=Emergency Registration Counter)",
        },
        {
          id: "B11_1",
          title:
            "1B.11 Which of the following demarcated /dedicated areas does this facility have for emergency care? (Select all that apply) (choice=Department has proper layout and demarcated areas as per Triage.)",
        },
        {
          id: "B11_0",
          title:
            "1B.11 Which of the following demarcated /dedicated areas does this facility have for emergency care? (Select all that apply) (choice=Demarcated station for doctors and nurses)",
        },
        {
          id: "B11_1",
          title:
            "1B.11 Which of the following demarcated /dedicated areas does this facility have for emergency care? (Select all that apply) (choice=Demarcated plaster room)",
        },
        {
          id: "B11_0",
          title:
            "1B.11 Which of the following demarcated /dedicated areas does this facility have for emergency care? (Select all that apply) (choice=Dedicated isolation rooms (Emergency Infections))",
        },
        {
          id: "B11_1",
          title:
            "1B.11 Which of the following demarcated /dedicated areas does this facility have for emergency care? (Select all that apply) (choice=Dedicated minor OT.)",
        },
        {
          id: "B11_0",
          title:
            "1B.11 Which of the following demarcated /dedicated areas does this facility have for emergency care? (Select all that apply) (choice=Provision for emergency OT)",
        },
        {
          id: "B11_1",
          title:
            "1B.11 Which of the following demarcated /dedicated areas does this facility have for emergency care? (Select all that apply) (choice=Point of care lab (24x7))",
        },
        {
          id: "B11_0",
          title:
            "1B.11 Which of the following demarcated /dedicated areas does this facility have for emergency care? (Select all that apply) (choice=Demarcated duty room for doctors)",
        },
        {
          id: "B11_1",
          title:
            "1B.11 Which of the following demarcated /dedicated areas does this facility have for emergency care? (Select all that apply) (choice=Demarcated duty room for nursing staff)",
        },
        {
          id: "B11_0",
          title:
            "1B.11 Which of the following demarcated /dedicated areas does this facility have for emergency care? (Select all that apply) (choice=Ambulance drivers room)",
        },
        {
          id: "B11_1",
          title:
            "1B.11 Which of the following demarcated /dedicated areas does this facility have for emergency care? (Select all that apply) (choice=Dedicated LaQshya certified labor room)",
        },
        {
          id: "B11_0",
          title:
            "1B.11 Which of the following demarcated /dedicated areas does this facility have for emergency care? (Select all that apply) (choice=Child-friendly service based on MusQan.)",
        },
        {
          id: "B11_1",
          title:
            "1B.11 Which of the following demarcated /dedicated areas does this facility have for emergency care? (Select all that apply) (choice=NABH Accreditation)",
        },
        {
          id: "B12_0",
          title:
            "1B.12 Is there any display board of all the emergency services and entitlements available in its departments? (choice=Services provided to the patients are clearly defined, displayed prominently.)",
        },
        {
          id: "B12_1",
          title:
            "1B.12 Is there any display board of all the emergency services and entitlements available in its departments? (choice=Names of doctor and nursing staff on duty are displayed and updated.)",
        },
        {
          id: "B12_0",
          title:
            "1B.12 Is there any display board of all the emergency services and entitlements available in its departments? (choice=List of available drugs are displayed.)",
        },
        {
          id: "B12_1",
          title:
            "1B.12 Is there any display board of all the emergency services and entitlements available in its departments? (choice=All relevant information is displayed for the patients and visitors including user charges wherever applicable at the time of procedure/ investigation/admission.)",
        },
        {
          id: "B12_0",
          title:
            "1B.12 Is there any display board of all the emergency services and entitlements available in its departments? (choice=Important contact numbers including ambulance, blood bank, police and referral centers displayed.)",
        },
        {
          id: "B12_1",
          title:
            "1B.12 Is there any display board of all the emergency services and entitlements available in its departments? (choice=Other)",
        },
        { id: "B12_0", title: "Other Specify" },
        {
          id: "B12_1",
          title:
            "1B.13 Which of the following safety and security infrastructure/ measures are in place at your hospital (Select all that apply): (choice=Fire safety)",
        },
        {
          id: "B12_0",
          title:
            "1B.13 Which of the following safety and security infrastructure/ measures are in place at your hospital (Select all that apply): (choice=Building safety)",
        },
        {
          id: "B12_1",
          title:
            "1B.13 Which of the following safety and security infrastructure/ measures are in place at your hospital (Select all that apply): (choice=Electrical safety)",
        },
        {
          id: "B12_0",
          title:
            "1B.13 Which of the following safety and security infrastructure/ measures are in place at your hospital (Select all that apply): (choice=Patient and healthcare provider safety)",
        },
        {
          id: "B12_1",
          title:
            "1B.13 Which of the following safety and security infrastructure/ measures are in place at your hospital (Select all that apply): (choice=Chemical safety)",
        },
        {
          id: "B12_0",
          title:
            "1B.13 Which of the following safety and security infrastructure/ measures are in place at your hospital (Select all that apply): (choice=Periodic training of staff (Every 6 months))",
        },
        {
          id: "B12_1",
          title:
            "1B.13 Which of the following safety and security infrastructure/ measures are in place at your hospital (Select all that apply): (choice=Periodic mock drill (Every 6 months))",
        },
        {
          id: "B12_0",
          title:
            "1B.13 Which of the following safety and security infrastructure/ measures are in place at your hospital (Select all that apply): (choice=Police post available within the premises.)",
        },
        {
          id: "B12_1",
          title:
            "1B.13 Which of the following safety and security infrastructure/ measures are in place at your hospital (Select all that apply): (choice=Alarm bell in Emergency / Code announcement available for extra help.)",
        },
        {
          id: "B12_0",
          title:
            "1B.13 Which of the following safety and security infrastructure/ measures are in place at your hospital (Select all that apply): (choice=Disease outbreak management plan)",
        },
        {
          id: "B12_1",
          title:
            "1B.13 Which of the following safety and security infrastructure/ measures are in place at your hospital (Select all that apply): (choice=Surge capacity in your hospital)",
        },
        {
          id: "B14",
          title:
            "1B.14 Does the hospital provide ambulance services? If Yes, please remember to complete the Ambulance Checklist after completing HFAT, else skip to 1B.15",
        },
        {
          id: "B15",
          title:
            "IB.15 If ambulances are not there, how are patients transferred?",
        },
        {
          id: "table1?.[0].['Manpower']",
          title: "Faculty/Consultant (['Manpower'])",
        },
        { id: "table1_0_Number", title: "Faculty/Consultant (Number)" },
        {
          id: "table1_0_availability247",
          title: "Faculty/Consultant (availability24 X 7)",
        },
        {
          id: "table1_0_onSiteAvailability",
          title: "Faculty/Consultant (onSiteAvailability)",
        },
        {
          id: "table1_0_onCallAvailability",
          title: "Faculty/Consultant (onCallAvailability)",
        },
        {
          id: "table1_1_Manpower",
          title: "CMO (casualty medical officer) (Manpower)",
        },
        {
          id: "table1_1_Number",
          title: "CMO (casualty medical officer) (Number)",
        },
        {
          id: "table1_1_availability248",
          title: "CMO (casualty medical officer) (availability24 X 7)",
        },
        {
          id: "table1_1_onSiteAvailability",
          title: "CMO (casualty medical officer) (onSiteAvailability)",
        },
        {
          id: "table1_1_onCallAvailability",
          title: "CMO (casualty medical officer) (onCallAvailability)",
        },
        { id: "table1_2_Manpower", title: "SR (Senior Residents) (Manpower)" },
        { id: "table1_2_Number", title: "SR (Senior Residents) (Number)" },
        {
          id: "table1_2_availability247",
          title: "SR (Senior Residents) (availability24 X 7)",
        },
        {
          id: "table1_2_onSiteAvailability",
          title: "SR (Senior Residents) (onSiteAvailability)",
        },
        {
          id: "table1_2_onCallAvailability",
          title: "SR (Senior Residents) (onCallAvailability)",
        },
        { id: "table1_3_Manpower", title: "JR (Junior Residents) (Manpower)" },
        { id: "table1_3_Number", title: "JR (Junior Residents) (Number)" },
        {
          id: "table1_3_availability248",
          title: "JR (Junior Residents) (availability24 X 7)",
        },
        {
          id: "table1_3_onSiteAvailability",
          title: "JR (Junior Residents) (onSiteAvailability)",
        },
        {
          id: "table1_3_onCallAvailability",
          title: "JR (Junior Residents) (onCallAvailability)",
        },
        { id: "table1_4_Manpower", title: "MO (Medical officer) (Manpower)" },
        { id: "table1_4_Number", title: "MO (Medical officer) (Number)" },
        {
          id: "table1_4_availability247",
          title: "MO (Medical officer) (availability24 X 7)",
        },
        {
          id: "table1_4_onSiteAvailability",
          title: "MO (Medical officer) (onSiteAvailability)",
        },
        {
          id: "table1_4_onCallAvailability",
          title: "MO (Medical officer) (onCallAvailability)",
        },
        {
          id: "table1_5_Manpower",
          title: "Nursing officer in charge / Team leader (Manpower)",
        },
        {
          id: "table1_5_Number",
          title: "Nursing officer in charge / Team leader (Number)",
        },
        {
          id: "table1_5_availability247",
          title: "Nursing officer in charge / Team leader (availability24 X 7)",
        },
        {
          id: "table1_5_onSiteAvailability",
          title: "Nursing officer in charge / Team leader (onSiteAvailability)",
        },
        {
          id: "table1_5_onCallAvailability",
          title: "Nursing officer in charge / Team leader (onCallAvailability)",
        },
        {
          id: "table1_6_Manpower",
          title: "Staff Nurse/ Nursing Officer (Manpower)",
        },
        {
          id: "table1_6_Number",
          title: "Staff Nurse/ Nursing Officer (Number)",
        },
        {
          id: "table1_6_availability247",
          title: "Staff Nurse/ Nursing Officer (availability24 X 7)",
        },
        {
          id: "table1_6_onSiteAvailability",
          title: "Staff Nurse/ Nursing Officer (onSiteAvailability)",
        },
        {
          id: "table1_6_onCallAvailability",
          title: "Staff Nurse/ Nursing Officer (onCallAvailability)",
        },
        {
          id: "table1_7_Manpower",
          title: "Radiology technician/ Radiographer (Manpower)",
        },
        {
          id: "table1_7_Number",
          title: "Radiology technician/ Radiographer (Number)",
        },
        {
          id: "table1_7_availability247",
          title: "Radiology technician/ Radiographer (availability24 X 7)",
        },
        {
          id: "table1_7_onSiteAvailability",
          title: "Radiology technician/ Radiographer (onSiteAvailability)",
        },
        {
          id: "table1_7_onCallAvailability",
          title: "Radiology technician/ Radiographer (onCallAvailability)",
        },
        { id: "table1_8_Manpower", title: "Lab Technician (Manpower)" },
        { id: "table1_8_Number", title: "Lab Technician (Number)" },
        {
          id: "table1_8_availability247",
          title: "Lab Technician (availability24 X 7)",
        },
        {
          id: "table1_8_onSiteAvailability",
          title: "Lab Technician (onSiteAvailability)",
        },
        {
          id: "table1_8_onCallAvailability",
          title: "Lab Technician (onCallAvailability)",
        },
        { id: "table1_9_Manpower", title: "OT. Technician (Manpower)" },
        { id: "table1_9_Number", title: "OT. Technician (Number)" },
        {
          id: "table1_9_availability247",
          title: "OT. Technician (availability24 X 7)",
        },
        {
          id: "table1_9_onSiteAvailability",
          title: "OT. Technician (onSiteAvailability)",
        },
        {
          id: "table1_9_onCallAvailability",
          title: "OT. Technician (onCallAvailability)",
        },
        {
          id: "table1_10_Manpower",
          title:
            "H.A/ GDA/ Orderly (GDA)General Duty Assistant, SA- Sanitary Attendant, HA- Hospital Attendant (Manpower)",
        },
        {
          id: "table1_10_Number",
          title:
            "H.A/ GDA/ Orderly (GDA)General Duty Assistant, SA- Sanitary Attendant, HA- Hospital Attendant (Number)",
        },
        {
          id: "table1_10_availability247",
          title:
            "H.A/ GDA/ Orderly (GDA)General Duty Assistant, SA- Sanitary Attendant, HA- Hospital Attendant (availability24 X 7)",
        },
        {
          id: "table1_10_onSiteAvailability",
          title:
            "H.A/ GDA/ Orderly (GDA)General Duty Assistant, SA- Sanitary Attendant, HA- Hospital Attendant (onSiteAvailability)",
        },
        {
          id: "table1_10_onCallAvailability",
          title:
            "H.A/ GDA/ Orderly (GDA)General Duty Assistant, SA- Sanitary Attendant, HA- Hospital Attendant (onCallAvailability)",
        },
        {
          id: "table1_11_Manpower",
          title: "SA/ Housekeeping staff (Manpower)",
        },
        { id: "table1_11_Number", title: "SA/ Housekeeping staff (Number)" },
        {
          id: "table1_11_availability247",
          title: "SA/ Housekeeping staff (availability24 X 7)",
        },
        {
          id: "table1_11_onSiteAvailability",
          title: "SA/ Housekeeping staff (onSiteAvailability)",
        },
        {
          id: "table1_11_onCallAvailability",
          title: "SA/ Housekeeping staff (onCallAvailability)",
        },
        { id: "table1_12_Manpower", title: "EMT (Manpower)" },
        { id: "table1_12_Number", title: "EMT (Number)" },
        { id: "table1_12_availability247", title: "EMT (availability24 X 7)" },
        {
          id: "table1_12_onSiteAvailability",
          title: "EMT (onSiteAvailability)",
        },
        {
          id: "table1_12_onCallAvailability",
          title: "EMT (onCallAvailability)",
        },
        { id: "table1_13_Manpower", title: "Security (Manpower)" },
        { id: "table1_13_Number", title: "Security (Number)" },
        {
          id: "table1_13_availability247",
          title: "Security (availability24 X 7)",
        },
        {
          id: "table1_13_onSiteAvailability",
          title: "Security (onSiteAvailability)",
        },
        {
          id: "table1_13_onCallAvailability",
          title: "Security (onCallAvailability)",
        },
        { id: "table1_14_Manpower", title: "Registration staff (Manpower)" },
        { id: "table1_14_Number", title: "Registration staff (Number)" },
        {
          id: "table1_14_availability247",
          title: "Registration staff (availability24 X 7)",
        },
        {
          id: "table1_14_onSiteAvailability",
          title: "Registration staff (onSiteAvailability)",
        },
        {
          id: "table1_14_onCallAvailability",
          title: "Registration staff (onCallAvailability)",
        },
        { id: "table1_15_Manpower", title: "IT Staff (Manpower)" },
        { id: "table1_15_Number", title: "IT Staff (Number)" },
        {
          id: "table1_15_availability247",
          title: "IT Staff (availability24 X 7)",
        },
        {
          id: "table1_15_onSiteAvailability",
          title: "IT Staff (onSiteAvailability)",
        },
        {
          id: "table1_15_onCallAvailability",
          title: "IT Staff (onCallAvailability)",
        },
        {
          id: "table1_16_Manpower",
          title: "Hospital Administrator (Manpower)",
        },
        { id: "table1_16_Number", title: "Hospital Administrator (Number)" },
        {
          id: "table1_16_availability247",
          title: "Hospital Administrator (availability24 X 7)",
        },
        {
          id: "table1_16_onSiteAvailability",
          title: "Hospital Administrator (onSiteAvailability)",
        },
        {
          id: "table1_16_onCallAvailability",
          title: "Hospital Administrator (onCallAvailability)",
        },
        { id: "table1_17_Manpower", title: "Pharmacist (Manpower)" },
        { id: "table1_17_Number", title: "Pharmacist (Number)" },
        {
          id: "table1_17_availability247",
          title: "Pharmacist (availability24 X 7)",
        },
        {
          id: "table1_17_onSiteAvailability",
          title: "Pharmacist (onSiteAvailability)",
        },
        {
          id: "table1_17_onCallAvailability",
          title: "Pharmacist (onCallAvailability)",
        },
        {
          id: "table1_18_Manpower",
          title: "Other (please specify) (Manpower)",
        },
        { id: "table1_18_Number", title: "Other (please specify) (Number)" },
        {
          id: "table1_18_availability247",
          title: "Other (please specify) (availability24 X 7)",
        },
        {
          id: "table1_18_onSiteAvailability",
          title: "Other (please specify) (onSiteAvailability)",
        },
        {
          id: "table1_14_onCallAvailability",
          title: "Other (please specify) (onCallAvailability)",
        },
        {
          id: "C2a_0",
          title:
            "1C.2 Please indicate which of the following specialist/super specialist services are available in your hospital (Select all that apply) - District hospital + Medical college (choice=Medicine)",
        },
        {
          id: "C2a_1",
          title:
            "1C.2 Please indicate which of the following specialist/super specialist services are available in your hospital (Select all that apply) - District hospital + Medical college (choice=Gynecology and obstetrics)",
        },
        {
          id: "C2a_2",
          title:
            "1C.2 Please indicate which of the following specialist/super specialist services are available in your hospital (Select all that apply) - District hospital + Medical college (choice=Orthopedics)",
        },
        {
          id: "C2a_3",
          title:
            "1C.2 Please indicate which of the following specialist/super specialist services are available in your hospital (Select all that apply) - District hospital + Medical college (choice=General surgery)",
        },
        {
          id: "C2a_4",
          title:
            "1C.2 Please indicate which of the following specialist/super specialist services are available in your hospital (Select all that apply) - District hospital + Medical college (choice=Radiology)",
        },
        {
          id: "C2a_5",
          title:
            "1C.2 Please indicate which of the following specialist/super specialist services are available in your hospital (Select all that apply) - District hospital + Medical college (choice=Anesthesia)",
        },
        {
          id: "C2a_6",
          title:
            "1C.2 Please indicate which of the following specialist/super specialist services are available in your hospital (Select all that apply) - District hospital + Medical college (choice=Critical care)",
        },
        {
          id: "C2a_7",
          title:
            "1C.2 Please indicate which of the following specialist/super specialist services are available in your hospital (Select all that apply) - District hospital + Medical college (choice=Ophthalmology)",
        },
        {
          id: "C2a_8",
          title:
            "1C.2 Please indicate which of the following specialist/super specialist services are available in your hospital (Select all that apply) - District hospital + Medical college (choice=ENT)",
        },
        {
          id: "C2a_9",
          title:
            "1C.2 Please indicate which of the following specialist/super specialist services are available in your hospital (Select all that apply) - District hospital + Medical college (choice=Psychiatry)",
        },
        {
          id: "C2a_10",
          title:
            "1C.2 Please indicate which of the following specialist/super specialist services are available in your hospital (Select all that apply) - District hospital + Medical college (choice=Dermatology)",
        },
        {
          id: "C2a_11",
          title:
            "1C.2 Please indicate which of the following specialist/super specialist services are available in your hospital (Select all that apply) - District hospital + Medical college (choice=Forensic medicine)",
        },
        {
          id: "C2b_0",
          title:
            "1C.2 Please indicate which of the following specialist/super specialist services are available in your hospital (Select all that apply) - Medical college (choice=Transfusion medicine)",
        },
        {
          id: "C2b_1",
          title:
            "1C.2 Please indicate which of the following specialist/super specialist services are available in your hospital (Select all that apply) - Medical college (choice=Cardiology)",
        },
        {
          id: "C2b_2",
          title:
            "1C.2 Please indicate which of the following specialist/super specialist services are available in your hospital (Select all that apply) - Medical college (choice=CTVS)",
        },
        {
          id: "C2b_3",
          title:
            "1C.2 Please indicate which of the following specialist/super specialist services are available in your hospital (Select all that apply) - Medical college (choice=Neurology)",
        },
        {
          id: "C2b_4",
          title:
            "1C.2 Please indicate which of the following specialist/super specialist services are available in your hospital (Select all that apply) - Medical college (choice=Plastic surgery)",
        },
        {
          id: "C2b_5",
          title:
            "1C.2 Please indicate which of the following specialist/super specialist services are available in your hospital (Select all that apply) - Medical college (choice=Maxillofacial surgery)",
        },
        {
          id: "C2b_6",
          title:
            "1C.2 Please indicate which of the following specialist/super specialist services are available in your hospital (Select all that apply) - Medical college (choice=Gastroenterology)",
        },
        {
          id: "C2b_7",
          title:
            "1C.2 Please indicate which of the following specialist/super specialist services are available in your hospital (Select all that apply) - Medical college (choice=Nephrology)",
        },
        {
          id: "C2b_8",
          title:
            "1C.2 Please indicate which of the following specialist/super specialist services are available in your hospital (Select all that apply) - Medical college (choice=Urology)",
        },
        {
          id: "C2b_9",
          title:
            "1C.2 Please indicate which of the following specialist/super specialist services are available in your hospital (Select all that apply) - Medical college (choice=Pediatric surgery)",
        },
        {
          id: "C2b_10",
          title:
            "1C.2 Please indicate which of the following specialist/super specialist services are available in your hospital (Select all that apply) - Medical college (choice=Emergency medicine)",
        },
        {
          id: "C3",
          title:
            "1C.3 Whether training for emergency care management is being conducted for the staff in the institution?",
        },
        {
          id: "C4_0",
          title:
            "1C4. Which of the following emergency care trainings have you undergone? (choice = Trauma & Accidental Injuries)",
        },
        {
          id: "C4_1",
          title:
            "1C4. Which of the following emergency care trainings have you undergone? (choice = Burns)",
        },
        {
          id: "C4_2",
          title:
            "1C4. Which of the following emergency care trainings have you undergone? (choice = Cardiac emergencies: acute chest pain, acute coronary syndrome (ACS)/ STEMI, Heart failure, Cardiac Arrest)",
        },
        {
          id: "C4_3",
          title:
            "1C4. Which of the following emergency care trainings have you undergone? (choice = Stroke)",
        },
        {
          id: "C4_4",
          title:
            "1C4. Which of the following emergency care trainings have you undergone? (choice = Acute Breathlessness)",
        },
        {
          id: "C4_5",
          title:
            "1C4. Which of the following emergency care trainings have you undergone? (choice = Bites (Animal bite/snake bite/scorpion sting))",
        },
        {
          id: "C4_6",
          title:
            "1C4. Which of the following emergency care trainings have you undergone? (choice = Choking/foreign body ingestion)",
        },
        {
          id: "C4_7",
          title:
            "1C4. Which of the following emergency care trainings have you undergone? (choice = Poisoning)",
        },
        {
          id: "C4_8",
          title:
            "1C4. Which of the following emergency care trainings have you undergone? (choice = PPH)",
        },
        {
          id: "C4_9",
          title:
            "1C4. Which of the following emergency care trainings have you undergone? (choice = Pre-Eclampsia)",
        },
        {
          id: "C4_10",
          title:
            "1C4. Which of the following emergency care trainings have you undergone? (choice = Neonatal emergencies)",
        },
        {
          id: "C4_11",
          title:
            "1C4. Which of the following emergency care trainings have you undergone? (choice = Other)",
        },
        { id: "C4_12", title: "Other Specify" },
        {
          id: "C5",
          title: "1C.5 Frequency of training on emergency care in a year?",
        },
        { id: "C6", title: "1C.6 When was the last training conducted?" },
        {
          id: "H1D1_0",
          title:
            "1D.1 Which of the following essential emergency drugs are available at the DH/ Tertiary Care Hospital? (Multiple answers possible)? (choice=Saline)",
        },
        {
          id: "H1D1_1",
          title:
            "1D.1 Which of the following essential emergency drugs are available at the DH/ Tertiary Care Hospital? (Multiple answers possible)? (choice=Adrenaline)",
        },
        {
          id: "H1D1_2",
          title:
            "1D.1 Which of the following essential emergency drugs are available at the DH/ Tertiary Care Hospital? (Multiple answers possible)? (choice=Antisnake venom)",
        },
        {
          id: "H1D1_3",
          title:
            "1D.1 Which of the following essential emergency drugs are available at the DH/ Tertiary Care Hospital? (Multiple answers possible)? (choice=Aspirin)",
        },
        {
          id: "H1D1_4",
          title:
            "1D.1 Which of the following essential emergency drugs are available at the DH/ Tertiary Care Hospital? (Multiple answers possible)? (choice=Atorvastatin)",
        },
        {
          id: "H1D1_5",
          title:
            "1D.1 Which of the following essential emergency drugs are available at the DH/ Tertiary Care Hospital? (Multiple answers possible)? (choice=Atropine)",
        },
        {
          id: "H1D1_6",
          title:
            "1D.1 Which of the following essential emergency drugs are available at the DH/ Tertiary Care Hospital? (Multiple answers possible)? (choice=Carboprost)",
        },
        {
          id: "H1D1_7",
          title:
            "1D.1 Which of the following essential emergency drugs are available at the DH/ Tertiary Care Hospital? (Multiple answers possible)? (choice=Charcoal activated)",
        },
        {
          id: "H1D1_8",
          title:
            "1D.1 Which of the following essential emergency drugs are available at the DH/ Tertiary Care Hospital? (Multiple answers possible)? (choice=Clopidogrel)",
        },
        {
          id: "H1D1_9",
          title:
            "1D.1 Which of the following essential emergency drugs are available at the DH/ Tertiary Care Hospital? (Multiple answers possible)? (choice=Diazepam/Lorazepam)",
        },
        {
          id: "H1D1_10",
          title:
            "1D.1 Which of the following essential emergency drugs are available at the DH/ Tertiary Care Hospital? (Multiple answers possible)? (choice=Dobutamine)",
        },
        {
          id: "H1D1_11",
          title:
            "1D.1 Which of the following essential emergency drugs are available at the DH/ Tertiary Care Hospital? (Multiple answers possible)? (choice=Isosorbidedinitrate (subl))",
        },
        {
          id: "H1D1_12",
          title:
            "1D.1 Which of the following essential emergency drugs are available at the DH/ Tertiary Care Hospital? (Multiple answers possible)? (choice=Labetalol IV)",
        },
        {
          id: "H1D1_13",
          title:
            "1D.1 Which of the following essential emergency drugs are available at the DH/ Tertiary Care Hospital? (Multiple answers possible)? (choice=Magnesium sulphate)",
        },
        {
          id: "H1D1_14",
          title:
            "1D.1 Which of the following essential emergency drugs are available at the DH/ Tertiary Care Hospital? (Multiple answers possible)? (choice=Methergine)",
        },
        {
          id: "H1D1_15",
          title:
            "1D.1 Which of the following essential emergency drugs are available at the DH/ Tertiary Care Hospital? (Multiple answers possible)? (choice=Misoprostol)",
        },
        {
          id: "H1D1_16",
          title:
            "1D.1 Which of the following essential emergency drugs are available at the DH/ Tertiary Care Hospital? (Multiple answers possible)? (choice=Neostigmine)",
        },
        {
          id: "H1D1_17",
          title:
            "1D.1 Which of the following essential emergency drugs are available at the DH/ Tertiary Care Hospital? (Multiple answers possible)? (choice=Oxygen medicinal gas)",
        },
        {
          id: "H1D1_18",
          title:
            "1D.1 Which of the following essential emergency drugs are available at the DH/ Tertiary Care Hospital? (Multiple answers possible)? (choice=Oxytocin)",
        },
        {
          id: "H1D1_19",
          title:
            "1D.1 Which of the following essential emergency drugs are available at the DH/ Tertiary Care Hospital? (Multiple answers possible)? (choice=Phenobarbitone)",
        },
        {
          id: "H1D1_20",
          title:
            "1D.1 Which of the following essential emergency drugs are available at the DH/ Tertiary Care Hospital? (Multiple answers possible)? (choice=Phenytoin( inj))",
        },
        {
          id: "H1D1_21",
          title:
            "1D.1 Which of the following essential emergency drugs are available at the DH/ Tertiary Care Hospital? (Multiple answers possible)? (choice=Plasma volume exppander)",
        },
        {
          id: "H1D1_22",
          title:
            "1D.1 Which of the following essential emergency drugs are available at the DH/ Tertiary Care Hospital? (Multiple answers possible)? (choice=Pralidoxime (PAM))",
        },
        {
          id: "H1D1_23",
          title:
            "1D.1 Which of the following essential emergency drugs are available at the DH/ Tertiary Care Hospital? (Multiple answers possible)? (choice=Streptokinase)",
        },
        {
          id: "H1D1_24",
          title:
            "1D.1 Which of the following essential emergency drugs are available at the DH/ Tertiary Care Hospital? (Multiple answers possible)? (choice=Tenecteplase/ tPA IV)",
        },
        {
          id: "H1D1_25",
          title:
            "1D.1 Which of the following essential emergency drugs are available at the DH/ Tertiary Care Hospital? (Multiple answers possible)? (choice=Tetanus immunoglobulin)",
        },
        {
          id: "H1D1_26",
          title:
            "1D.1 Which of the following essential emergency drugs are available at the DH/ Tertiary Care Hospital? (Multiple answers possible)? (choice=Tranexemic acid)",
        },
        {
          id: "H1D1_27",
          title:
            "1D.1 Which of the following essential emergency drugs are available at the DH/ Tertiary Care Hospital? (Multiple answers possible)? (choice=Hydrocortisone)",
        },
        {
          id: "H1D2_0",
          title:
            "1D.2 Which of the following essential emergency equipment is available at the DH/ Tertiary Care Hospital? (Multiple answers possible) (choice=mobile bed for Resuscitation)",
        },
        {
          id: "H1D2_1",
          title:
            "1D.2 Which of the following essential emergency equipment is available at the DH/ Tertiary Care Hospital? (Multiple answers possible) (choice=crash cart (specialized cart for resuscitation))",
        },
        {
          id: "H1D2_2",
          title:
            "1D.2 Which of the following essential emergency equipment is available at the DH/ Tertiary Care Hospital? (Multiple answers possible) (choice=Hard Cervical collar)",
        },
        {
          id: "H1D2_3",
          title:
            "1D.2 Which of the following essential emergency equipment is available at the DH/ Tertiary Care Hospital? (Multiple answers possible) (choice=Oxygen cylinder/central oxygen supply)",
        },
        {
          id: "H1D2_4",
          title:
            "1D.2 Which of the following essential emergency equipment is available at the DH/ Tertiary Care Hospital? (Multiple answers possible) (choice=suction machine)",
        },
        {
          id: "H1D2_5",
          title:
            "1D.2 Which of the following essential emergency equipment is available at the DH/ Tertiary Care Hospital? (Multiple answers possible) (choice=Multipara Monitor (To monitor Heart rate, BP, SPO2[Essential] ECG, Respiration Rate [Desirable] etc))",
        },
        {
          id: "H1D2_6",
          title:
            "1D.2 Which of the following essential emergency equipment is available at the DH/ Tertiary Care Hospital? (Multiple answers possible) (choice=defibrillator with or without external pacer)",
        },
        {
          id: "H1D2_7",
          title:
            "1D.2 Which of the following essential emergency equipment is available at the DH/ Tertiary Care Hospital? (Multiple answers possible) (choice=Toothed Forceps, Kocher Forceps, Magills forceps, Artery forceps)",
        },
        {
          id: "H1D2_8",
          title:
            "1D.2 Which of the following essential emergency equipment is available at the DH/ Tertiary Care Hospital? (Multiple answers possible) (choice=AMBU Bag for adult and Paediatric)",
        },
        {
          id: "H1D2_9",
          title:
            "1D.2 Which of the following essential emergency equipment is available at the DH/ Tertiary Care Hospital? (Multiple answers possible) (choice=basic airway equipment like oropharyngeal nasopharyngeal airway, LMA for adult and pediatric)",
        },
        {
          id: "H1D2_10",
          title:
            "1D.2 Which of the following essential emergency equipment is available at the DH/ Tertiary Care Hospital? (Multiple answers possible) (choice=advanced laryngoscope and endotracheal tube or other similar device)",
        },
        {
          id: "H1D2_11",
          title:
            "1D.2 Which of the following essential emergency equipment is available at the DH/ Tertiary Care Hospital? (Multiple answers possible) (choice=tourniquet)",
        },
        {
          id: "H1D2_12",
          title:
            "1D.2 Which of the following essential emergency equipment is available at the DH/ Tertiary Care Hospital? (Multiple answers possible) (choice=pelvic binder or bed sheets with clips)",
        },
        {
          id: "H1D2_13",
          title:
            "1D.2 Which of the following essential emergency equipment is available at the DH/ Tertiary Care Hospital? (Multiple answers possible) (choice=laryngoscope with all sized blades)",
        },
        {
          id: "H1D2_14",
          title:
            "1D.2 Which of the following essential emergency equipment is available at the DH/ Tertiary Care Hospital? (Multiple answers possible) (choice=Endotracheal Tubes of all sizes)",
        },
        {
          id: "H1D2_15",
          title:
            "1D.2 Which of the following essential emergency equipment is available at the DH/ Tertiary Care Hospital? (Multiple answers possible) (choice=Laryngeal Mask Airway (LMA))",
        },
        {
          id: "H1D2_16",
          title:
            "1D.2 Which of the following essential emergency equipment is available at the DH/ Tertiary Care Hospital? (Multiple answers possible) (choice=Chest Tubes with Water seal drain)",
        },
        {
          id: "H1D2_17",
          title:
            "1D.2 Which of the following essential emergency equipment is available at the DH/ Tertiary Care Hospital? (Multiple answers possible) (choice=ECG machine)",
        },
        {
          id: "H1D2_18",
          title:
            "1D.2 Which of the following essential emergency equipment is available at the DH/ Tertiary Care Hospital? (Multiple answers possible) (choice=nebulizer)",
        },
        {
          id: "H1D2_19",
          title:
            "1D.2 Which of the following essential emergency equipment is available at the DH/ Tertiary Care Hospital? (Multiple answers possible) (choice=fluid warmer)",
        },
        {
          id: "H1D2_20",
          title:
            "1D.2 Which of the following essential emergency equipment is available at the DH/ Tertiary Care Hospital? (Multiple answers possible) (choice=Infusion pump and Syringe Drivers)",
        },
        {
          id: "H1D2_21",
          title:
            "1D.2 Which of the following essential emergency equipment is available at the DH/ Tertiary Care Hospital? (Multiple answers possible) (choice=spine board with sling and scotch tapes)",
        },
        {
          id: "H1D2_22",
          title:
            "1D.2 Which of the following essential emergency equipment is available at the DH/ Tertiary Care Hospital? (Multiple answers possible) (choice=splints for all types of fracture)",
        },
        {
          id: "H1D2_23",
          title:
            "1D.2 Which of the following essential emergency equipment is available at the DH/ Tertiary Care Hospital? (Multiple answers possible) (choice=non-invasive ventilators)",
        },
        {
          id: "H1D2_24",
          title:
            "1D.2 Which of the following essential emergency equipment is available at the DH/ Tertiary Care Hospital? (Multiple answers possible) (choice=invasive ventilators)",
        },
        {
          id: "H1D2_25",
          title:
            "1D.2 Which of the following essential emergency equipment is available at the DH/ Tertiary Care Hospital? (Multiple answers possible) (choice=incubators)",
        },
        { id: "table2_0_Adult", title: "Adult (>18 Years)" },
        { id: "table2_0_Pediatric", title: "Pediatrics" },
        { id: "table2_0_Broughtdead", title: "Brought dead" },
        { id: "table2_0_Deathafterarrival", title: "Death after arrival" },
        { id: "table2_0_MLC", title: "MLC" },
        { id: "table3_0_Attended", title: "MI (Attended)" },
        { id: "table3_0_Death", title: "MI (Attended)" },
        { id: "table3_1_Attended", title: "Stroke (Attended)" },
        { id: "table3_1_Death", title: "Stroke (Attended)" },
        { id: "table3_2_Attended", title: "Trauma & Burns (Attended)" },
        { id: "table3_2_Death", title: "Trauma & Burns (Attended)" },
        { id: "table3_3_Attended", title: "Poisoning (Attended)" },
        { id: "table3_3_Death", title: "Poisoning (Attended)" },
        { id: "table3_4_Attended", title: "Snake Bites (Attended)" },
        { id: "table3_4_Death", title: "Snake Bites (Attended)" },
        {
          id: "table3_5_Attended",
          title: "Maternal Emergencies-PPH (Attended)",
        },
        { id: "table3_5_Death", title: "Maternal Emergencies -PPH (Attended)" },
        {
          id: "table3_6_Attended",
          title: "Maternal Emergencies-Eclampsia (Attended)",
        },
        {
          id: "table3_6_Death",
          title: "Maternal Emergencies-Eclampsia (Attended)",
        },
        { id: "table3_7_Attended", title: "Neonatal Emergencies (Attended)" },
        { id: "table3_7_Death", title: "Neonatal Emergencies (Attended)" },
        {
          id: "table3_8_Attended",
          title: "Acute Respiratory Illness (Attended)",
        },
        { id: "table3_8_Death", title: "Acute Respiratory Illness (Attended)" },
        {
          id: "E3_0",
          title:
            "IE.3. Which services does your healthcare facility provide? (Select all that apply) (choice=Emergency operative services for Trauma patients)",
        },
        {
          id: "E3_1",
          title:
            "IE.3. Which services does your healthcare facility provide? (Select all that apply) (choice=Emergency operative services for Non-Trauma (Surgical, Orthopedics etc.) patients)",
        },
        {
          id: "E3_2",
          title:
            "IE.3. Which services does your healthcare facility provide? (Select all that apply) (choice=Emergency operative services for Obstetrics patients)",
        },
        {
          id: "E3_3",
          title:
            "IE.3. Which services does your healthcare facility provide? (Select all that apply) (choice=Elective Operative services for Orthopedic patients)",
        },
        {
          id: "E3_4",
          title:
            "IE.3. Which services does your healthcare facility provide? (Select all that apply) (choice=Elective Operative services for neurosurgical patients)",
        },
        {
          id: "E3_5",
          title:
            "IE.3. Which services does your healthcare facility provide? (Select all that apply) (choice=Common Intensive care services (ICU))",
        },
        {
          id: "E3_6",
          title:
            "IE.3. Which services does your healthcare facility provide? (Select all that apply) (choice=Common High dependency Unit (HDU))",
        },
        {
          id: "E3_7",
          title:
            "IE.3. Which services does your healthcare facility provide? (Select all that apply) (choice=Pediatric ICU)",
        },
        {
          id: "E3_8",
          title:
            "IE.3. Which services does your healthcare facility provide? (Select all that apply) (choice=Neonatal ICU)",
        },
        {
          id: "E3_9",
          title:
            "IE.3. Which services does your healthcare facility provide? (Select all that apply) (choice=Neurosurgery ICU)",
        },
        {
          id: "E3_10",
          title:
            "IE.3. Which services does your healthcare facility provide? (Select all that apply) (choice=Cardiac ICU)",
        },
        {
          id: "E3_11",
          title:
            "IE.3. Which services does your healthcare facility provide? (Select all that apply) (choice=Cardiac Cath lab)",
        },
        {
          id: "E3_12",
          title:
            "IE.3. Which services does your healthcare facility provide? (Select all that apply) (choice=Intervention Radiology)",
        },
        {
          id: "E3_13",
          title:
            "IE.3. Which services does your healthcare facility provide? (Select all that apply) (choice=Intervention neuroradiology service with DSA)",
        },
        {
          id: "E3_14",
          title:
            "IE.3. Which services does your healthcare facility provide? (Select all that apply) (choice=Stroke unit)",
        },
        {
          id: "E3_15",
          title:
            "IE.3. Which services does your healthcare facility provide? (Select all that apply) (choice=Tele-Medicine facility)",
        },
        {
          id: "E3_16",
          title:
            "IE.3. Which services does your healthcare facility provide? (Select all that apply) (choice=Other)",
        },
        { id: "E3_17", title: "Other Specify" },
        {
          id: "E4_0",
          title:
            "1E.4 Which of these emergency diagnostic facilities are provided at DH/ Tertiary Care Hospital? (choice=Radiology-CT)",
        },
        {
          id: "E4_1",
          title:
            "1E.4 Which of these emergency diagnostic facilities are provided at DH/ Tertiary Care Hospital? (choice=Radiology -ultrasound)",
        },
        {
          id: "E4_2",
          title:
            "1E.4 Which of these emergency diagnostic facilities are provided at DH/ Tertiary Care Hospital? (choice=Radiology -MRI)",
        },
        {
          id: "E4_3",
          title:
            "1E.4 Which of these emergency diagnostic facilities are provided at DH/ Tertiary Care Hospital? (choice=Radiology Services are functional 24X7)",
        },
        {
          id: "E4_4",
          title:
            "1E.4 Which of these emergency diagnostic facilities are provided at DH/ Tertiary Care Hospital? (choice=Point of care lab -ABG, Troponin)",
        },
        {
          id: "E4_5",
          title:
            "1E.4 Which of these emergency diagnostic facilities are provided at DH/ Tertiary Care Hospital? (choice=Availability of Functional ECG Services.)",
        },
        {
          id: "E4_6",
          title:
            "1E.4 Which of these emergency diagnostic facilities are provided at DH/ Tertiary Care Hospital? (choice=Other)",
        },
        { id: "E4_7", title: "other specify" },
        {
          id: "H1F1",
          title:
            "1F.1 Does the hospital have a Hospital Information System (HIS)?",
        },
        {
          id: "H1F2",
          title:
            "1F.2 Does this facility do complete reporting of indicators on emergency care in HMIS?",
        },
        {
          id: "H1F3",
          title:
            "1F.3 How many personnel are available for managing information system?",
        },
        {
          id: "H1F4_0",
          title:
            "1F.4 What key indicators are generated from the emergency management information system? (choice=Numbers by type of emergencies)",
        },
        {
          id: "H1F4_1",
          title:
            "1F.4 What key indicators are generated from the emergency management information system? (choice=Length of hospital stay)",
        },
        {
          id: "H1F4_2",
          title:
            "1F.4 What key indicators are generated from the emergency management information system? (choice=Turnaround time)",
        },
        {
          id: "H1F4_3",
          title:
            "1F.4 What key indicators are generated from the emergency management information system? (choice=Disposal time)",
        },
        {
          id: "H1F4_4",
          title:
            "1F.4 What key indicators are generated from the emergency management information system? (choice=Number of deaths)",
        },
        {
          id: "H1F4_5",
          title:
            "1F.4 What key indicators are generated from the emergency management information system? (choice=Number of Referrals)",
        },
        {
          id: "H1F5",
          title:
            "1F.5 Whether time bound management of common emergencies is captured in MIS. For example, Door to CT/ECG time, Door to needle time, Time to activate emergency alert team. If No, Skip to IF.6, otherwise answer IF. 5",
        },
        {
          id: "H1F6_0",
          title:
            "1F.6 If Yes, select all that apply and provide their value (choice=Door to CT/ECG time)",
        },
        {
          id: "H1F6_1",
          title:
            "1F.6 If Yes, select all that apply and provide their value (choice=Door to needle time)",
        },
        {
          id: "H1F6_2",
          title:
            "1F.6 If Yes, select all that apply and provide their value (choice=Time to activate emergency alert team)",
        },
        { id: "H1F6_3", title: "Door to CT/ECG time" },
        { id: "H1F6_4", title: "Door to needle time" },
        { id: "H1F6_5", title: "Time to activate emergency alert team" },
        {
          id: "H1F7",
          title:
            "1F.7 Whether hospital administrators/ Medical Superintendent uses or reviews the data for quality improvement",
        },
        {
          id: "H1F8",
          title:
            "1F.8 Do you get Pre-Hospital Notification during an emergency?",
        },
        {
          id: "H1F9",
          title: "1F.9 Infrastructure for receiving internal communication?",
        },
        {
          id: "H1G1",
          title: "1G.1 Whether any untied fund is available at your hospital?",
        },
        {
          id: "H1G2",
          title:
            "1G.2 If Yes, whether this fund is utilized for providing emergency care services?",
        },
        {
          id: "H1G3",
          title: "1G.3 Whether any fund is available for emergency care?",
        },
        {
          id: "H1G4",
          title:
            "1G.4 If Yes, which health schemes are covering your emergency care system?",
        },
        {
          id: "H1G5",
          title:
            "1G.5 Out of total patients being provided emergency care, how many were provided services under PMJAY scheme/ any other insurance scheme",
        },
        {
          id: "H1H1",
          title: "1H.1.1 Do You have any Disaster Management Plan ?",
        },
        {
          id: "H1H2",
          title: "1H.1.2 Do you have system to Redistribution Plan?",
        },
        { id: "H1H3", title: "1H.1.3 Do you have any Evacuation Plan?" },
        {
          id: "H2H1",
          title:
            "1H.2.1 Do you have a Quality Improvement Committee? ( if yes, collect detail of Committee)",
        },
        {
          id: "H2H2",
          title: "1H.2.2 How frequently does this committee meet in a year?",
        },
        {
          id: "H2H3",
          title:
            "1H.2.3 Do you have regular audits related to emergency care in the hospital?",
        },
        {
          id: "H2H4",
          title: "1H.2.4 How frequently audits are conducted in a year?",
        },
        {
          id: "H2H5_0",
          title: "1H.2.5 Types of audits conducted? (choice = Mortality Audit)",
        },
        {
          id: "H2H5_1",
          title: "1H.2.5 Types of audits conducted? (choice = Morbidity Audit)",
        },
        {
          id: "H2H5_2",
          title: "1H.2.5 Types of audits conducted? (choice = other)",
        },
        { id: "H2H5_3", title: "Other specify" },
        {
          id: "H2H6",
          title:
            "1H.2.6 Any action being taken on Audit report in the last one year?",
        },
        {
          id: "I1_0",
          title:
            "1I.1 Indicate whether your hospital has the following documented protocols and systems (Select all that apply): (choice=Procedure for registration and admission of new emergency patients)",
        },
        {
          id: "I1_1",
          title:
            "1I.1 Indicate whether your hospital has the following documented protocols and systems (Select all that apply): (choice=Procedure/Policy for receiving of referral patients)",
        },
        {
          id: "I1_2",
          title:
            "1I.1 Indicate whether your hospital has the following documented protocols and systems (Select all that apply): (choice=Emergency Manual at the point of care)",
        },
        {
          id: "I1_3",
          title:
            "1I.1 Indicate whether your hospital has the following documented protocols and systems (Select all that apply): (choice=Triage guidelines and protocol.)",
        },
        {
          id: "I1_4",
          title:
            "1I.1 Indicate whether your hospital has the following documented protocols and systems (Select all that apply): (choice=Discharge summaries for all patients.)",
        },
        {
          id: "I1_5",
          title:
            "1I.1 Indicate whether your hospital has the following documented protocols and systems (Select all that apply): (choice=Policy on handling cases of death (outside and inside hospital).)",
        },
        {
          id: "I1_6",
          title:
            "1I.1 Indicate whether your hospital has the following documented protocols and systems (Select all that apply): (choice=Disaster management plan)",
        },
        {
          id: "I1_7",
          title:
            "1I.1 Indicate whether your hospital has the following documented protocols and systems (Select all that apply): (choice=Triage policy/system at your emergency department.)",
        },
        {
          id: "I1_8",
          title:
            "1I.1 Indicate whether your hospital has the following documented protocols and systems (Select all that apply): (choice=Alert system: Code Blue.)",
        },
        {
          id: "I1_9",
          title:
            "1I.1 Indicate whether your hospital has the following documented protocols and systems (Select all that apply): (choice=Alert system: Trauma.)",
        },
        {
          id: "I1_10",
          title:
            "1I.1 Indicate whether your hospital has the following documented protocols and systems (Select all that apply): (choice=Alert system: Chest Pain)",
        },
        {
          id: "I1_11",
          title:
            "1I.1 Indicate whether your hospital has the following documented protocols and systems (Select all that apply): (choice=Alert system: Sepsis.)",
        },
        {
          id: "I1_12",
          title:
            "1I.1 Indicate whether your hospital has the following documented protocols and systems (Select all that apply): (choice=Alert system: Stroke)",
        },
        {
          id: "I1_13",
          title:
            "1I.1 Indicate whether your hospital has the following documented protocols and systems (Select all that apply): (choice=Alert system : Maternal Emergencies)",
        },
        {
          id: "I1_14",
          title:
            "1I.1 Indicate whether your hospital has the following documented protocols and systems (Select all that apply): (choice=Alert system : Neonatal Emergencies)",
        },
        {
          id: "I1_15",
          title:
            "1I.1 Indicate whether your hospital has the following documented protocols and systems (Select all that apply): (choice=Alert system : Acute Respiratory Emergencies)",
        },
        {
          id: "I1_16",
          title:
            "1I.1 Indicate whether your hospital has the following documented protocols and systems (Select all that apply): (choice=Alert system : Snake bite and Poisoning)",
        },
        { id: "table4_0_SOP", title: "MI (SOP)" },
        { id: "table4_0_FollowsSOP", title: "MI (FollowsSOP)" },
        { id: "table4_1_SOP", title: "Stroke (SOP)" },
        { id: "table4_1_FollowsSOP", title: "Stroke (FollowsSOP)" },
        { id: "table4_2_SOP", title: "Trauma & Burns (SOP)" },
        { id: "table4_2_FollowsSOP", title: "Trauma & Burns (FollowsSOP)" },
        { id: "table4_3_SOP", title: "Poisoning (SOP)" },
        { id: "table4_3_FollowsSOP", title: "Poisoning (FollowsSOP)" },
        { id: "table4_4_SOP", title: "Snake Bites (SOP)" },
        { id: "table4_4_FollowsSOP", title: "Snake Bites (FollowsSOP)" },
        { id: "table4_5_SOP", title: "Maternal Emergencies-PPH (SOP)" },
        {
          id: "table4_5_FollowsSOP",
          title: "Maternal Emergencies-PPH (FollowsSOP)",
        },
        { id: "table4_6_SOP", title: "Maternal Emergencies- Eclampsia (SOP)" },
        {
          id: "table4_6_FollowsSOP",
          title: "Maternal Emergencies- Eclampsia (FollowsSOP)",
        },
        { id: "table4_7_SOP", title: "Neonatal Emergencies (SOP)" },
        {
          id: "table4_7_FollowsSOP",
          title: "Neonatal Emergencies (FollowsSOP)",
        },
        { id: "table4_8_SOP", title: "Acute Respiratory Illness (SOP)" },
        {
          id: "table4_8_FollowsSOP",
          title: "Acute Respiratory Illness (FollowsSOP)",
        },
        {
          id: "H1J1",
          title:
            "1J.1 Does this facility have policies and procedures which guide the referral of patients from other hospitals?",
        },
        {
          id: "H1J2",
          title:
            "1J.2 Does this facility have any policies and procedures which guide the transfer- out/referral of stable and unstable patients after stabilization to another facility with documentation?",
        },
      ],
    });

    const csv =
      csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(data);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment;filename=HFAT-1.csv");
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating CSV file");
  }
};

export const HFAT1DownloadExcel = async (req, res) => {
  try {
    const data = await HFAT1.find().lean();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("My Sheet");

    // Column Definitions: Defines the columns to be displayed.
    worksheet.columns = [
      {
        header: "Record ID",
        key: "_id",
        checkboxSelection: true,
        headerCheckboxSelection: true,
        width: 50,
      },
      { header: "Assessor's Name", key: "A1" },
      { header: "Date", key: "A2" },
      { header: "Code", key: "A3" },
      { header: "Block Name", key: "A4" },
      { header: "Healthcare Facility Name", key: "A5" },
      { header: "Healthcare Facility Address", key: "A6" },
      { header: "Name of the Hospital Superintendent", key: "A7" },
      {
        header: "Contact Number of the Hospital Superintendent:",
        key: "A8",
      },
      { header: "Email ID:", key: "A9" },
      { header: "GPS_1", key: "A10" },
      { header: "GPS_2", key: "A10" },
      { header: "Type of Health Care Facility?", key: "A11" },
      {
        header: "If Tertiary care center, select the appropriate one",
        key: "A12",
      },
      {
        header:
          "1B.1 How many beds are available for the in-patient department (IPD)?",
        key: "B1",
      },
      {
        header:
          "1B.2  Whether any dedicated bed present  for emergency care?    If No, skip to 1B.5 ",
        key: "B2",
      },
      {
        header: "1B.3. How many beds are available for emergency care?",
        key: "B3",
      },
      { header: "a. Red: ", key: "B4_0" },
      { header: "b. Yellow:", key: "B4_1" },
      { header: "c. Green", key: "B4_2" },
      {
        header:
          "1B.5  What is the average number of patients presenting to OPD per month? ",
        key: "B5",
      },
      {
        header:
          "1B.6  What is the average number of patients presenting with emergency conditions daily?   (Chest pain, stroke, acute weakness, acute blindness, Shortness of breath, altered mentation, snake bite, bites,   road traffic accident, injuries ,poisoning, deliberate self-harm, infectious diseases, fever, pregnancy related, seizure, acute abdomen, anaphylaxis, cerebro-meningeal infections, foreign body, acute pulmonary disease, Shock, accidental injuries, infections)",
        key: "B6",
      },
      {
        header: "1B.7 Does the facility have a licensed in-house blood bank?",
        key: "B7",
      },
      {
        header:
          "1B.8 Which of these does the blood bank have among the following?",
        children: [
          {
            header: "Component facility",
            key: "B8",
          },
          {
            header: "O- ve Blood availability",
            key: "B8",
          },
        ],
      },
      {
        header: "1B.9 Is there a blood storage facility inside the emergency?",
        key: "B9",
      },
      {
        header:
          "1B.10 Which of the following does your facility have to provide easy access for emergency care?",

        children: [
          {
            header:
              "No vehicles parked on the way/in front of emergency department",
            key: "B10_0",
          },
          {
            header: "Designated parking area for Ambulance, Staff and Public",
            key: "B10_1",
          },
          {
            header:
              "Smooth entry area with adequate wheelchair, trolley and stretcher bay",
            key: "B10_2",
          },
        ],
      },
      {
        header:
          "1B.11 Which of the following demarcated /dedicated areas does this facility have for emergency care?",
        children: [
          {
            header: "Decontamination Area at the Entrance of ED",
            key: "B11_0",
          },
          {
            header:
              "Hospital attendant at the entrance of hospital to help the patient with the wheelchair, stretcher, etc.",
            key: "B11_1",
          },
          {
            header: "Waiting area for patients/attendants",
            key: "B11_2",
          },
          {
            header: "Police control room",
            key: "B11_3",
          },
          {
            header: "Emergency Registration Counter",
            key: "B11_4",
          },
          {
            header:
              "Department has proper layout and demarcated areas as per Triage.",
            key: "B11_5",
          },
          {
            header: "Demarcated station for doctors and nurses",
            key: "B11_6",
          },
          {
            header: "Demarcated plaster room",
            key: "B11_7",
          },
          {
            header: "Dedicated isolation rooms (Emergency Infections)",
            key: "B11_8",
          },
          {
            header: "Dedicated minor OT.",
            key: "B11_9",
          },
          {
            header: "Provision for emergency OT",
            key: "B11_10",
          },
          {
            header: "Point of care lab (24x7)",
            key: "B11_11",
          },
          {
            header: "Demarcated duty room for doctors",
            key: "B11_12",
          },
          {
            header: "Demarcated duty room for nursing staff",
            key: "B11_13",
          },
          {
            header: "Ambulance drivers room",
            key: "B11_14",
          },
          {
            header: "Dedicated LaQshya certified labor room",
            key: "B11_15",
          },
          {
            header: "Child-friendly service based on MusQan.",
            key: "B11_16",
          },
          {
            header: "NABH Accreditation",
            key: "B11_17",
          },
        ],
      },
      {
        header:
          "1B.12 Is there any display board of all the emergency services and entitlements available in its departments?",
        children: [
          {
            key: "B12_0",
            header:
              "Services provided to the patients are clearly defined, displayed prominently.",
          },
          {
            key: "B12_1",
            header:
              "Names of doctor and nursing staff on duty are displayed and updated.",
          },
          {
            key: "B12_2",
            header: "List of available drugs are displayed.",
          },
          {
            key: "B12_3",
            header:
              "All relevant information is displayed for the patients and visitors including user charges wherever applicable at the time of procedure/ investigation/admission.",
          },
          {
            key: "B12_4",
            header:
              "Important contact numbers including ambulance, blood bank, police and referral centers displayed.",
          },
          { key: "B12_5", header: "Other" },
          { key: "B12_6", header: "Other Specify" },
        ],
      },
      {
        header:
          "1B.13 Which of the following safety and security infrastructure/ measures are in place at your hospital (Select all that apply):",
        children: [
          { key: "B13_0", header: "Fire safety" },
          { key: "B13_1", header: "Building safety" },
          { key: "B13_2", header: "Electrical safety" },
          {
            key: "B13_3",
            header: "Patient and healthcare provider safety",
          },
          { key: "B13_4", header: "Chemical safety" },
          {
            key: "B13_5",
            header: "Periodic training of staff (Every 6 months)",
          },
          {
            key: "B13_6",
            header: "Periodic mock drill (Every 6 months)",
          },
          {
            key: "B13_7",
            header: "Police post available within the premises.",
          },
          {
            key: "B13_8",
            header:
              "Alarm bell in Emergency / Code announcement available for extra help.",
          },
          { key: "B13_9", header: "Disease outbreak management plan" },
          { key: "B13_10", header: "Surge capacity in your hospital" },
        ],
      },
      {
        header:
          "1B.14 Does the hospital provide ambulance services? If Yes, please remember to complete the Ambulance Checklist after completing HFAT, else skip to 1B.15 ",
        key: "B14",
      },
      {
        header:
          "IB.15 If ambulances are not there, how are patients transferred? ",
        key: "B15",
      },

      {
        header: "Faculty/Consultant",
        children: [
          { key: "table1_0_Manpower", header: "Manpower" },
          { key: "table1_0_Number", header: "Number" },
          {
            key: "table1_0_availability247",
            header: "availability24 X 7",
          },
          {
            key: "table1_0_onSiteAvailability",
            header: "onSiteAvailability",
          },
          {
            key: "table1_0_onCallAvailability",
            header: "onCallAvailability",
          },
        ],
      },

      {
        header: "CMO (casualty medical officer)",
        children: [
          {
            header: "Manpower",
            key: "table1_1_Manpower",
          },
          {
            header: "Number",
            key: "table1_1_Number",
          },
          {
            header: "availability24 X 7",
            key: "table1_1_availability247",
          },
          {
            header: "onSiteAvailability",
            key: "table1_1_onSiteAvailability",
          },
          {
            header: "onCallAvailability",
            key: "table1_1_onCallAvailability",
          },
        ],
      },
      {
        header: "SR (Senior Residents)",
        children: [
          {
            header: "Manpower",
            key: "table1_2_Manpower",
          },
          {
            header: "Number",
            key: "table1_2_Number",
          },
          {
            header: "availability24 X 7",
            key: "table1_2_availability247",
          },
          {
            header: "onSiteAvailability",
            key: "table1_2_onSiteAvailability",
          },
          {
            header: "onCallAvailability",
            key: "table1_2_onCallAvailability",
          },
        ],
      },
      {
        header: "JR (Junior Residents)",
        children: [
          {
            header: "Manpower",
            key: "table1_3_Manpower",
          },
          {
            header: "Number",
            key: "table1_3_Number",
          },
          {
            header: "availability24 X 7",
            key: "table1_3_availability247",
          },
          {
            header: "onSiteAvailability",
            key: "table1_3_onSiteAvailability",
          },
          {
            header: "onCallAvailability",
            key: "table1_3_onCallAvailability",
          },
        ],
      },
      {
        header: "MO (Medical officer)",
        children: [
          {
            header: "Manpower",
            key: "table1_4_Manpower",
          },
          {
            header: "Number",
            key: "table1_4_Number",
          },
          {
            header: "availability24 X 7",
            key: "table1_4_availability247",
          },
          {
            header: "onSiteAvailability",
            key: "table1_4_onSiteAvailability",
          },
          {
            header: "onCallAvailability",
            key: "table1_4_onCallAvailability",
          },
        ],
      },
      {
        header: "Nursing officer in charge / Team leader",
        children: [
          {
            header: "Manpower",
            key: "table1_5_Manpower",
          },
          {
            header: "Number",
            key: "table1_5_Number",
          },
          {
            header: "availability24 X 7",
            key: "table1_5_availability247",
          },
          {
            header: "onSiteAvailability",
            key: "table1_5_onSiteAvailability",
          },
          {
            header: "onCallAvailability",
            key: "table1_5_onCallAvailability",
          },
        ],
      },
      {
        header: "Staff Nurse/ Nursing Officer",
        children: [
          {
            header: "Manpower",
            key: "table1_6_Manpower",
          },
          {
            header: "Number",
            key: "table1_6_Number",
          },
          {
            header: "availability24 X 7",
            key: "table1_6_availability247",
          },
          {
            header: "onSiteAvailability",
            key: "table1_6_onSiteAvailability",
          },
          {
            header: "onCallAvailability",
            key: "table1_6_onCallAvailability",
          },
        ],
      },
      {
        header: "Radiology technician/ Radiographer",
        children: [
          {
            header: "Manpower",
            key: "table1_7_Manpower",
          },
          {
            header: "Number",
            key: "table1_7_Number",
          },
          {
            header: "availability24 X 7",
            key: "table1_7_availability247",
          },
          {
            header: "onSiteAvailability",
            key: "table1_7_onSiteAvailability",
          },
          {
            header: "onCallAvailability",
            key: "table1_7_onCallAvailability",
          },
        ],
      },
      {
        header: "Lab Technician",
        children: [
          {
            header: "Manpower",
            key: "table1_8_Manpower",
          },
          {
            header: "Number",
            key: "table1_8_Number",
          },
          {
            header: "availability24 X 7",
            key: "table1_8_availability247",
          },
          {
            header: "onSiteAvailability",
            key: "table1_8_onSiteAvailability",
          },
          {
            header: "onCallAvailability",
            key: "table1_8_onCallAvailability",
          },
        ],
      },
      {
        header: "OT. Technician",
        children: [
          {
            header: "Manpower",
            key: "table1_9_Manpower",
          },
          {
            header: "Number",
            key: "table1_9_Number",
          },
          {
            header: "availability24 X 7",
            key: "table1_9_availability247",
          },
          {
            header: "onSiteAvailability",
            key: "table1_9_onSiteAvailability",
          },
          {
            header: "onCallAvailability",
            key: "table1_9_onCallAvailability",
          },
        ],
      },
      {
        header:
          "H.A/ GDA/ Orderly (GDA)General Duty Assistant, SA- Sanitary Attendant, HA- Hospital Attendant",
        children: [
          {
            header: "Manpower",
            key: "table1_10_Manpower",
          },
          {
            header: "Number",
            key: "table1_10_Number",
          },
          {
            header: "availability24 X 7",
            key: "table1_10_availability247",
          },
          {
            header: "onSiteAvailability",
            key: "table1_10_onSiteAvailability",
          },
          {
            header: "onCallAvailability",
            key: "table1_10_onCallAvailability",
          },
        ],
      },
      {
        header: "SA/ Housekeeping staff",
        children: [
          {
            header: "Manpower",
            key: "table1_11_Manpower",
          },
          {
            header: "Number",
            key: "table1_11_Number",
          },
          {
            header: "availability24 X 7",
            key: "table1_11_availability247",
          },
          {
            header: "onSiteAvailability",
            key: "table1_11_onSiteAvailability",
          },
          {
            header: "onCallAvailability",
            key: "table1_11_onCallAvailability",
          },
        ],
      },
      {
        header: "EMT",
        children: [
          {
            header: "Manpower",
            key: "table1_12_Manpower",
          },
          {
            header: "Number",
            key: "table1_12_Number",
          },
          {
            header: "availability24 X 7",
            key: "table1_12_availability247",
          },
          {
            header: "onSiteAvailability",
            key: "table1_12_onSiteAvailability",
          },
          {
            header: "onCallAvailability",
            key: "table1_12_onCallAvailability",
          },
        ],
      },
      {
        header: "Security",
        children: [
          {
            header: "Manpower",
            key: "table1_13_Manpower",
          },
          {
            header: "Number",
            key: "table1_13_Number",
          },
          {
            header: "availability24 X 7",
            key: "table1_13_availability247",
          },
          {
            header: "onSiteAvailability",
            key: "table1_13_onSiteAvailability",
          },
          {
            header: "onCallAvailability",
            key: "table1_13_onCallAvailability",
          },
        ],
      },
      {
        header: "Registration staff",
        children: [
          {
            header: "Manpower",
            key: "table1_14_Manpower",
          },
          {
            header: "Number",
            key: "table1_14_Number",
          },
          {
            header: "availability24 X 7",
            key: "table1_14_availability247",
          },
          {
            header: "onSiteAvailability",
            key: "table1_14_onSiteAvailability",
          },
          {
            header: "onCallAvailability",
            key: "table1_14_onCallAvailability",
          },
        ],
      },
      {
        header: "IT Staff",
        children: [
          {
            header: "Manpower",
            key: "table1_15_Manpower",
          },
          {
            header: "Number",
            key: "table1_15_Number",
          },
          {
            header: "availability24 X 7",
            key: "table1_15_availability247",
          },
          {
            header: "onSiteAvailability",
            key: "table1_15_onSiteAvailability",
          },
          {
            header: "onCallAvailability",
            key: "table1_15_onCallAvailability",
          },
        ],
      },
      {
        header: "Hospital Administrator",
        children: [
          {
            header: "Manpower",
            key: "table1_16_Manpower",
          },
          {
            header: "Number",
            key: "table1_16_Number",
          },
          {
            header: "availability24 X 7",
            key: "table1_16_availability247",
          },
          {
            header: "onSiteAvailability",
            key: "table1_16_onSiteAvailability",
          },
          {
            header: "onCallAvailability",
            key: "table1_16_onCallAvailability",
          },
        ],
      },
      {
        header: "Pharmacist",
        children: [
          {
            header: "Manpower",
            key: "table1_17_Manpower",
          },
          {
            header: "Number",
            key: "table1_17_Number",
          },
          {
            header: "availability24 X 7",
            key: "table1_17_availability247",
          },
          {
            header: "onSiteAvailability",
            key: "table1_17_onSiteAvailability",
          },
          {
            header: "onCallAvailability",
            key: "table1_17_onCallAvailability",
          },
        ],
      },
      {
        header: "Other (please specify)",
        children: [
          {
            header: "Manpower",
            key: "table1_18_Manpower",
          },
          {
            header: "Number",
            key: "table1_18_Number",
          },
          {
            header: "availability24 X 7",
            key: "table1_18_availability247",
          },
          {
            header: "onSiteAvailability",
            key: "table1_18_onSiteAvailability",
          },
          {
            header: "onCallAvailability",
            key: "table1_18_onCallAvailability",
          },
        ],
      },

      {
        header:
          "1C.2 Please indicate which of the following specialist/super specialist services are available in your hospital (District hospital + Medical college):",
        children: [
          {
            header: "District hospital + Medical college",

            children: [
              { key: "c2a_0", header: "Medicine" },
              { key: "c2a_1", header: "Gynecology and obstetrics" },
              { key: "c2a_2", header: "Orthopedics" },
              { key: "c2a_3", header: "General surgery" },
              { key: "c2a_4", header: "Radiology" },
              { key: "c2a_5", header: "Anesthesia" },
              { key: "c2a_6", header: "Critical care" },
              { key: "c2a_7", header: "Ophthalmology" },
              { key: "c2a_8", header: "ENT (Ear, Nose, Throat)" },
              { key: "c2a_9", header: "Psychiatry" },
              { key: "c2a_10", header: "Dermatology" },
              { key: "c2a_11", header: "Forensic medicine" },
            ],
          },
          {
            header: "Medical college",
            children: [
              { key: "c2b_0", header: "Transfusion medicine" },
              { key: "c2b_1", header: "Cardiology" },
              {
                key: "c2b_2",
                header: "CTVS (Cardiothoracic and Vascular Surgery)",
              },
              { key: "c2b_3", header: "Neurology" },
              { key: "c2b_4", header: "Plastic surgery" },
              { key: "c2b_5", header: "Maxillofacial surgery" },
              { key: "c2b_6", header: "Gastroenterology" },
              { key: "c2b_7", header: "Nephrology" },
              { key: "c2b_8", header: "Urology" },
              { key: "c2b_9", header: "Pediatric surgery" },
              { key: "c2b_10", header: "Emergency medicine" },
            ],
          },
        ],
      },

      {
        header:
          "1C.3 Whether training for emergency care management is being conducted for the staff in the institution?",
        key: "C3",
      },
      {
        header:
          "1C4. Which of the following emergency care trainings have you undergone?",
        children: [
          { header: "Trauma & Accidental Injuries", key: "C4_0" },
          { header: "Burns", key: "C4_1" },
          {
            header:
              "Cardiac emergencies: acute chest pain, acute coronary syndrome (ACS)/ STEMI, Heart failure, Cardiac Arrest",
            key: "C4_2",
          },
          { header: "Stroke", key: "C4_3" },
          { header: "Acute Breathlessness", key: "C4_4" },
          {
            header: "Bites (Animal bite/snake bite/scorpion sting)",
            key: "C4_5",
          },
          { header: "Choking/foreign body ingestion", key: "C4_6" },
          { header: "Poisoning", key: "C4_7" },
          { header: "PPH", key: "C4_8" },
          { header: "Pre-Eclampsia", key: "C4_9" },
          { header: "Neonatal emergencies", key: "C4_10" },
          { header: "Other", key: "C4_11" },
          { header: "Other Specify", key: "C4_12" },
        ],
      },
      {
        header: "1C.5 Frequency of training on emergency care in a year?",
        key: "C5",
      },
      { header: "1C.6 When was the last training conducted?", key: "C6" },

      {
        header:
          "1D.1 Which of the following essential emergency drugs are available at the DH/ Tertiary Care Hospital? ",
        children: [
          { header: "Saline", key: "H1D1_0" },
          { header: "Adrenaline", key: "H1D1_1" },
          { header: "Antisnake venom", key: "H1D1_2" },
          { header: "Aspirin", key: "H1D1_3" },
          { header: "Atorvastatin", key: "H1D1_4" },
          { header: "Atropine", key: "H1D1_5" },
          { header: "Carboprost", key: "H1D1_6" },
          { header: "Charcoal activated", key: "H1D1_7" },
          { header: "Clopidogrel", key: "H1D1_8" },
          { header: "Diazepam/Lorazepam", key: "H1D1_9" },
          { header: "Dobutamine", key: "H1D1_10" },
          { header: "Isosorbidedinitrate (subl)", key: "H1D1_11" },
          { header: "Labetalol IV", key: "H1D1_12" },
          { header: "Magnesium sulphate", key: "H1D1_13" },
          { header: "Methergine", key: "H1D1_14" },
          { header: "Misoprostol", key: "H1D1_15" },
          { header: "Neostigmine", key: "H1D1_16" },
          { header: "Oxygen medicinal gas", key: "H1D1_17" },
          { header: "Oxytocin", key: "H1D1_18" },
          { header: "Phenobarbitone", key: "H1D1_19" },
          { header: "Phenytoin( inj)", key: "H1D1_20" },
          { header: "Plasma volume exppander", key: "H1D1_21" },
          { header: "Pralidoxime (PAM)", key: "H1D1_22" },
          { header: "Streptokinase", key: "H1D1_23" },
          { header: "Tenecteplase/ tPA IV", key: "H1D1_24" },
          { header: "Tetanus immunoglobulin", key: "H1D1_25" },
          { header: "Tranexemic acid", key: "H1D1_26" },
          { header: "Hydrocortisone", key: "H1D1_27" },
        ],
      },
      {
        header:
          "1D.2 Which of the following essential emergency equipment is available at the DH/ Tertiary Care Hospital?",
        children: [
          { header: "Mobile bed for Resuscitation", key: "H1D2_0" },
          {
            header: "Crash cart (specialized cart for resuscitation)",
            key: "H1D2_1",
          },
          { header: "Hard Cervical collar", key: "H1D2_2" },
          {
            header: "Oxygen cylinder/central oxygen supply",
            key: "H1D2_3",
          },
          { header: "Suction machine", key: "H1D2_4" },
          {
            header:
              "Multipara Monitor (To monitor Heart rate, BP, SPO2[Essential] ECG, Respiration Rate [Desirable] etc)",
            key: "H1D2_5",
          },
          {
            header: "Defibrillator with or without external pacer",
            key: "H1D2_6",
          },
          {
            header:
              "Toothed Forceps, Kocher Forceps, Magills forceps, Artery forceps",
            key: "H1D2_7",
          },
          { header: "AMBU Bag for adult and Paediatric", key: "H1D2_8" },
          {
            header:
              "Basic airway equipment like oropharyngeal nasopharyngeal airway, LMA for adult and pediatric",
            key: "H1D2_9",
          },
          {
            header:
              "Advanced laryngoscope and endotracheal tube or other similar device",
            key: "H1D2_10",
          },
          { header: "Tourniquet", key: "H1D2_11" },
          {
            header: "Pelvic binder or bed sheets with clips",
            key: "H1D2_12",
          },
          {
            header: "Laryngoscope with all sized blades",
            key: "H1D2_13",
          },
          { header: "Endotracheal Tubes of all sizes", key: "H1D2_14" },
          { header: "Laryngeal Mask Airway (LMA)", key: "H1D2_15" },
          { header: "Chest Tubes with Water seal drain", key: "H1D2_16" },
          { header: "ECG machine", key: "H1D2_17" },
          { header: "Nebulizer", key: "H1D2_18" },
          { header: "Fluid warmer", key: "H1D2_19" },
          { header: "Infusion pump and Syringe Drivers", key: "H1D2_20" },
          {
            header: "Spine board with sling and scotch tapes",
            key: "H1D2_21",
          },
          { header: "Splints for all types of fracture", key: "H1D2_22" },
          { header: "Non-invasive ventilators", key: "H1D2_23" },
          { header: "Invasive ventilators", key: "H1D2_24" },
          { header: "Incubators", key: "H1D2_25" },
        ],
      },
      { header: "Adult (>18 Years)", key: "table2_Adult" },
      { header: "Pediatrics", key: "table2_Pediatric" },
      { header: "Brought dead ", key: "table2_Broughtdead" },
      { header: "Death after arrival", key: "table2_Deathafterarrival" },
      { header: "MLC", key: "table2_MLC" },

      {
        header: "MI",
        children: [
          {
            header: "Attended",
            key: "table3_0_Attended",
          },
          {
            header: "Death",
            key: "table3_0_Death",
          },
        ],
      },
      {
        header: "Stroke",
        children: [
          {
            header: "Attended",
            key: "table3_1_Attended",
          },
          {
            header: "Death",
            key: "table3_1_Death",
          },
        ],
      },
      {
        header: "Trauma & Burns",
        children: [
          {
            header: "Attended",
            key: "table3_2_Attended",
          },
          {
            header: "Death",
            key: "table3_2_Death",
          },
        ],
      },
      {
        header: "Poisoning",
        children: [
          {
            header: "Attended",
            key: "table3_3_Attended",
          },
          {
            header: "Death",
            key: "table3_3_Death",
          },
        ],
      },
      {
        header: "Snake Bites",
        children: [
          {
            header: "Attended",
            key: "table3_4_Attended",
          },
          {
            header: "Death",
            key: "table3_4_Death",
          },
        ],
      },
      {
        header: "Maternal Emergencies-PPH",
        children: [
          {
            header: "Attended",
            key: "table3_5_Attended",
          },
          {
            header: "Death",
            key: "table3_5_Death",
          },
        ],
      },
      {
        header: "Maternal Emergencies-Eclampsia",
        children: [
          {
            header: "Attended",
            key: "table3_6_Attended",
          },
          {
            header: "Death",
            key: "table3_6_Death",
          },
        ],
      },
      {
        header: "Neonatal Emergencies",
        children: [
          {
            header: "Attended",
            key: "table3_7_Attended",
          },
          {
            header: "Death",
            key: "table3_7_Death",
          },
        ],
      },
      {
        header: "Acute Respiratory Illness",
        children: [
          {
            header: "Attended",
            key: "table3_8_Attended",
          },
          {
            header: "Death",
            key: "table3_8_Death",
          },
        ],
      },
      {
        header:
          "IE.3. Which services does your healthcare facility provide? (Select all that apply)",
        children: [
          {
            header: "Emergency operative services for Trauma patients",
            key: "E3_0",
          },
          {
            header:
              "Emergency operative services for Non-Trauma (Surgical, Orthopedics etc.) patients",
            key: "E3_1",
          },
          {
            header: "Emergency operative services for Obstetrics patients",
            key: "E3_2",
          },
          {
            header: "Elective Operative services for Orthopedic patients",
            key: "E3_3",
          },
          {
            header: "Elective Operative services for neurosurgical patients",
            key: "E3_4",
          },
          { header: "Common Intensive care services (ICU)", key: "E3_5" },
          { header: "Common High dependency Unit (HDU)", key: "E3_6" },
          { header: "Pediatric ICU", key: "E3_7" },
          { header: "Neonatal ICU", key: "E3_8" },
          { header: "Neurosurgery ICU", key: "E3_9" },
          { header: "Cardiac ICU", key: "E3_10" },
          { header: "Cardiac Cath lab", key: "E3_11" },
          { header: "Intervention Radiology", key: "E3_12" },
          {
            header: "Intervention neuroradiology service with DSA",
            key: "E3_13",
          },
          { header: "Stroke unit", key: "E3_14" },
          { header: "Tele-Medicine facility", key: "E3_15" },
          { header: "Other", key: "E3_16" },
          { header: "Other Specify", key: "E3_17" },
        ],
      },
      {
        header:
          "1E.4 Which of these emergency diagnostic facilities are provided at DH/ Tertiary Care Hospital?",
        children: [
          { header: "Radiology-CT", key: "E4_0" },
          { header: "Radiology -ultrasound", key: "E4_1" },
          { header: "Radiology -MRI", key: "E4_2" },
          {
            header: "Radiology Services are functional 24X7",
            key: "E4_3",
          },
          { header: "Point of care lab -ABG, Troponin", key: "E4_4" },
          {
            header: "Availability of Functional ECG Services",
            key: "E4_5",
          },
          { header: "Other", key: "E4_6" },
          { header: "Other Specify", key: "E4_7" },
        ],
      },
      {
        header:
          "1F.1 Does the hospital have a Hospital Information System (HIS)? ",
        key: "H1F1",
      },
      {
        header:
          "1F.2 Does this facility do complete reporting of indicators on emergency care in HMIS? ",
        key: "H1F2",
      },
      {
        header:
          "1F.3 How many personnel are available for managing information system? ",
        key: "H1F3",
      },
      {
        header:
          "1F.4 What key indicators are generated from the emergency management information system?",
        children: [
          { header: "Numbers by type of emergencies", key: "H1F4_0" },
          { header: "Length of hospital stay", key: "H1F4_1" },
          { header: "Turnaround time", key: "H1F4_2" },
          { header: "Disposal time", key: "H1F4_3" },
          { header: "Number of deaths", key: "H1F4_4" },
          { header: "Number of Referrals", key: "H1F4_5" },
        ],
      },
      {
        header:
          "1F.5 Whether time bound management of common emergencies is captured in MIS.  For example, Door to CT/ECG time, Door to needle time,  Time  to activate emergency alert team. If No, Skip to IF.6, otherwise answer IF. 5 ",
        key: "H1F5",
      },
      {
        header: "1F.6 If Yes, select all that apply and provide their value",
        children: [
          { header: "Door to CT/ECG time", key: "H1F6_0" },
          { header: "Door to needle time", key: "H1F6_1" },
          {
            header: "Time to activate emergency alert team",
            key: "H1F6_2",
          },
          { header: "", key: "H1F6_3" },
          { header: "", key: "H1F6_4" },
          { header: "", key: "H1F6_5" },
        ],
      },
      {
        header:
          "1F.7  Whether hospital administrators/ Medical Superintendent uses or reviews the data for quality improvement",
        key: "H1F7",
      },
      {
        header:
          "1F.8 Do you get Pre-Hospital Notification during an emergency?  ",
        key: "H1F8",
      },
      {
        header: "1F.9 Infrastructure for receiving internal communication? ",
        key: "H1F9",
      },
      {
        header: "1G.1 Whether any untied fund is available at your hospital? ",
        key: "H1G1",
      },
      {
        header:
          "1G.2 If Yes, whether this fund is utilized for providing emergency care services?",
        key: "H1G2",
      },
      {
        header: "1G.3 Whether any fund is available for emergency care? ",
        key: "H1G3",
      },
      {
        header:
          "1G.4 If Yes, which health schemes are covering your emergency care system?",
        key: "H1G4",
      },
      {
        header:
          "1G.5 Out of total patients being provided emergency care, how many were provided services under PMJAY scheme/ any other insurance scheme ",
        key: "H1G5",
      },
      {
        header: "1H.1.1 Do You have any Disaster Management Plan ?",
        key: "H1H1",
      },
      {
        header: "1H.1.2 Do you have system to Redistribution Plan?",
        key: "H1H2",
      },
      { header: "1H.1.3 Do you have any Evacuation Plan?", key: "H1H3" },
      {
        header:
          "1H.2.1 Do you have a Quality Improvement Committee? ( if yes, collect detail of Committee)",
        key: "H1H4",
      },
      {
        header: "1H.2.2 How frequently does this committee meet in a year? ",
        key: "H1H5",
      },
      {
        header:
          "1H.2.3 Do you have regular audits related to emergency care in the hospital?",
        key: "H1H6",
      },
      {
        header: "1H.2.4 How frequently audits are conducted in a year?",
        key: "H1H7",
      },
      {
        header: "1H.2.5 Types of audits conducted?",
        children: [
          { header: "Mortality Audit", key: "H1H8_0" },
          { header: "Morbidity Audit", key: "H1H8_1" },
          { header: "Other", key: "H1H8_2" },
          { header: "Other Specify", key: "H1H8_3" },
        ],
      },
      {
        header:
          "1H.2.6 Any action being taken on Audit report in the last one year?",
        key: "H1H9",
      },

      {
        header:
          "1I.1 Indicate whether your hospital has the following documented protocols and systems (Select all that apply):",
        children: [
          {
            header:
              "Procedure for registration and admission of new emergency patients",
            key: "I1_0",
          },
          {
            header: "Procedure/Policy for receiving of referral patients",
            key: "I1_1",
          },
          {
            header: "Emergency Manual at the point of care",
            key: "I1_2",
          },
          { header: "Triage guidelines and protocol", key: "I1_3" },
          { header: "Discharge summaries for all patients", key: "I1_4" },
          {
            header:
              "Policy on handling cases of death (outside and inside hospital)",
            key: "I1_5",
          },
          { header: "Disaster management plan", key: "I1_6" },
          {
            header: "Triage policy/system at your emergency department",
            key: "I1_7",
          },
          { header: "Alert system: Code Blue", key: "I1_8" },
          { header: "Alert system: Trauma", key: "I1_9" },
          { header: "Alert system: Chest Pain", key: "I1_10" },
          { header: "Alert system: Sepsis", key: "I1_11" },
          { header: "Alert system: Stroke", key: "I1_12" },
          { header: "Alert system : Maternal Emergencies", key: "I1_13" },
          { header: "Alert system : Neonatal Emergencies", key: "I1_14" },
          {
            header: "Alert system : Acute Respiratory Emergencies",
            key: "I1_15",
          },
          {
            header: "Alert system : Snake bite and Poisoning",
            key: "I1_16",
          },
        ],
      },
      {
        header: "MI",
        children: [
          {
            header: "SOP",
            key: "table4_0_SOP",
          },
          {
            header: "FOLLOW SOP",
            key: "table4_0_FollowsSOP",
          },
        ],
      },
      {
        header: "Stroke",
        children: [
          {
            header: "SOP",
            key: "table4_1_SOP",
          },
          {
            header: "FOLLOW SOP",
            key: "table4_1_FollowsSOP",
          },
        ],
      },
      {
        header: "Trauma & Burns",
        children: [
          {
            header: "SOP",
            key: "table4_2_SOP",
          },
          {
            header: "FOLLOW SOP",
            key: "table4_2_FollowsSOP",
          },
        ],
      },
      {
        header: "Poisoning",
        children: [
          {
            header: "SOP",
            key: "table4_3_SOP",
          },
          {
            header: "FOLLOW SOP",
            key: "table4_3_FollowsSOP",
          },
        ],
      },
      {
        header: "Snake Bites",
        children: [
          {
            header: "SOP",
            key: "table4_4_SOP",
          },
          {
            header: "FOLLOW SOP",
            key: "table4_4_FollowsSOP",
          },
        ],
      },
      {
        header: "Maternal Emergencies-PPH",
        children: [
          {
            header: "SOP",
            key: "table4_5_SOP",
          },
          {
            header: "FOLLOW SOP",
            key: "table4_5_FollowsSOP",
          },
        ],
      },
      {
        header: "Maternal Emergencies- Eclampsia",
        children: [
          {
            header: "SOP",
            key: "table4_6_SOP",
          },
          {
            header: "FOLLOW SOP",
            key: "table4_6_FollowsSOP",
          },
        ],
      },
      {
        header: "Neonatal Emergencies",
        children: [
          {
            header: "SOP",
            key: "table4_7_SOP",
          },
          {
            header: "FOLLOW SOP",
            key: "table4_7_FollowsSOP",
          },
        ],
      },
      {
        header: "Acute Respiratory Illness",
        children: [
          {
            header: "SOP",
            key: "table4_8_SOP",
          },
          {
            header: "FOLLOW SOP",
            key: "table4_8_FollowsSOP",
          },
        ],
      },
      {
        header:
          "1J.1 Does this facility have policies and procedures which guide the referral of patients from other hospitals?",
        key: "H1J1",
      },
      {
        header:
          "1J.2 Does this facility have any policies and procedures which guide the transfer- out/referral of stable and unstable patients after stabilization to another facility with documentation?",
        key: "H1J2",
      },
    ];

    worksheet.addRows(
      data.map((row) => ({
        id: row._id,
        A1: row.A1,
        A2: row.A2,
        A3: row.A3,
        A4: row.A4,
        A5: row.A5,
        A6: row.A6,
        A7: row.A7,
        A8: row.A8,
        A9: row.A9,
        A10: row.A10,
        A10: row.A10,
        A11: row.A11,
        A12: row.A12,
        B1: row.B1,
        B2: row.B2,
        B3: row.B3,
        B4_0: row.B4?.[0],
        B4_1: row.B4?.[1],
        B4_3: row.B4?.[2],
        B5: row.B5,
        B6: row.B6,
        B7: row.B7,
        B8: row.B8,
        B8: row.B8,
        B9: row.B9,
        B10_0: row.B10?.[0],
        B10_1: row.B10?.[1],
        B10_2: row.B10?.[2],
        B11_0: row.B11?.[0],
        B11_1: row.B11?.[1],
        B11_2: row.B11?.[2],
        B11_3: row.B11?.[3],
        B11_4: row.B11?.[4],
        B11_5: row.B11?.[5],
        B11_6: row.B11?.[6],
        B11_7: row.B11?.[7],
        B11_8: row.B11?.[8],
        B11_9: row.B11?.[9],
        B11_10: row.B11?.[10],
        B11_11: row.B11?.[11],
        B11_12: row.B11?.[12],
        B11_13: row.B11?.[13],
        B11_14: row.B11?.[14],
        B11_15: row.B11?.[15],
        B11_16: row.B11?.[16],
        B11_17: row.B11?.[17],
        B12_0: row.B12?.[0],
        B12_1: row.B12?.[1],
        B12_2: row.B12?.[2],
        B12_3: row.B12?.[3],
        B12_4: row.B12?.[4],
        B12_5: row.B12?.[5],
        B12_6: row.B12?.[6],
        B13_0: row.B13?.[0],
        B13_1: row.B13?.[1],
        B13_2: row.B13?.[2],
        B13_3: row.B13?.[3],
        B13_4: row.B13?.[4],
        B13_5: row.B13?.[5],
        B13_6: row.B13?.[6],
        B13_7: row.B13?.[7],
        B13_8: row.B13?.[8],
        B13_9: row.B13?.[9],
        B13_10: row.B13?.[10],
        B14: row.B14,
        B15: row.B15,
        table1_0_Manpower: row.table1?.[0].Manpower,
        table1_0_Number: row.table1?.[0].Number,
        table1_0_availability247: row.table1?.[0].availability247,
        table1_0_onSiteAvailability: row.table1?.[0].onSiteAvailability,
        table1_0_onCallAvailability: row.table1?.[0].onCallAvailability,
        table1_1_Manpower: row.table1?.[1].Manpower,
        table1_1_Number: row.table1?.[1].Number,
        table1_1_availability247: row.table1?.[1].availability247,
        table1_1_onSiteAvailability: row.table1?.[1].onSiteAvailability,
        table1_1_onCallAvailability: row.table1?.[1].onCallAvailability,
        table1_2_Manpower: row.table1?.[2].Manpower,
        table1_2_Number: row.table1?.[2].Number,
        table1_2_availability247: row.table1?.[2].availability247,
        table1_2_onSiteAvailability: row.table1?.[2].onSiteAvailability,
        table1_2_onCallAvailability: row.table1?.[2].onCallAvailability,
        table1_3_Manpower: row.table1?.[3].Manpower,
        table1_3_Number: row.table1?.[3].Number,
        table1_3_availability247: row.table1?.[3].availability247,
        table1_3_onSiteAvailability: row.table1?.[3].onSiteAvailability,
        table1_3_onCallAvailability: row.table1?.[3].onCallAvailability,
        table1_4_Manpower: row.table1?.[4].Manpower,
        table1_4_Number: row.table1?.[4].Number,
        table1_4_availability247: row.table1?.[4].availability247,
        table1_4_onSiteAvailability: row.table1?.[4].onSiteAvailability,
        table1_4_onCallAvailability: row.table1?.[4].onCallAvailability,
        table1_5_Manpower: row.table1?.[5].Manpower,
        table1_5_Number: row.table1?.[5].Number,
        table1_5_availability247: row.table1?.[5].availability247,
        table1_5_onSiteAvailability: row.table1?.[5].onSiteAvailability,
        table1_5_onCallAvailability: row.table1?.[5].onCallAvailability,
        table1_6_Manpower: row.table1?.[6].Manpower,
        table1_6_Number: row.table1?.[6].Number,
        table1_6_availability247: row.table1?.[6].availability247,
        table1_6_onSiteAvailability: row.table1?.[6].onSiteAvailability,
        table1_6_onCallAvailability: row.table1?.[6].onCallAvailability,
        table1_7_Manpower: row.table1?.[7].Manpower,
        table1_7_Number: row.table1?.[7].Number,
        table1_7_availability247: row.table1?.[7].availability247,
        table1_7_onSiteAvailability: row.table1?.[7].onSiteAvailability,
        table1_7_onCallAvailability: row.table1?.[7].onCallAvailability,
        table1_8_Manpower: row.table1?.[8].Manpower,
        table1_8_Number: row.table1?.[8].Number,
        table1_8_availability247: row.table1?.[8].availability247,
        table1_8_onSiteAvailability: row.table1?.[8].onSiteAvailability,
        table1_8_onCallAvailability: row.table1?.[8].onCallAvailability,
        table1_9_Manpower: row.table1?.[9].Manpower,
        table1_9_Number: row.table1?.[9].Number,
        table1_9_availability247: row.table1?.[9].availability247,
        table1_9_onSiteAvailability: row.table1?.[9].onSiteAvailability,
        table1_9_onCallAvailability: row.table1?.[9].onCallAvailability,
        table1_10_Manpower: row.table1?.[10].Manpower,
        table1_10_Number: row.table1?.[10].Number,
        table1_10_availability247: row.table1?.[10].availability247,
        table1_10_onSiteAvailability: row.table1?.[10].onSiteAvailability,
        table1_10_onCallAvailability: row.table1?.[10].onCallAvailability,
        table1_11_Manpower: row.table1?.[11].Manpower,
        table1_11_Number: row.table1?.[11].Number,
        table1_11_availability247: row.table1?.[11].availability247,
        table1_11_onSiteAvailability: row.table1?.[11].onSiteAvailability,
        table1_11_onCallAvailability: row.table1?.[11].onCallAvailability,
        table1_12_Manpower: row.table1?.[12].Manpower,
        table1_12_Number: row.table1?.[12].Number,
        table1_12_availability247: row.table1?.[12].availability247,
        table1_12_onSiteAvailability: row.table1?.[12].onSiteAvailability,
        table1_12_onCallAvailability: row.table1?.[12].onCallAvailability,
        table1_13_Manpower: row.table1?.[13].Manpower,
        table1_13_Number: row.table1?.[13].Number,
        table1_13_availability247: row.table1?.[13].availability247,
        table1_13_onSiteAvailability: row.table1?.[13].onSiteAvailability,
        table1_13_onCallAvailability: row.table1?.[13].onCallAvailability,
        table1_14_Manpower: row.table1?.[14].Manpower,
        table1_14_Number: row.table1?.[14].Number,
        table1_14_availability247: row.table1?.[14].availability247,
        table1_14_onSiteAvailability: row.table1?.[14].onSiteAvailability,
        table1_14_onCallAvailability: row.table1?.[14].onCallAvailability,
        table1_15_Manpower: row.table1?.[15].Manpower,
        table1_15_Number: row.table1?.[15].Number,
        table1_15_availability247: row.table1?.[15].availability247,
        table1_15_onSiteAvailability: row.table1?.[15].onSiteAvailability,
        table1_15_onCallAvailability: row.table1?.[15].onCallAvailability,
        table1_16_Manpower: row.table1?.[16].Manpower,
        table1_16_Number: row.table1?.[16].Number,
        table1_16_availability247: row.table1?.[16].availability247,
        table1_16_onSiteAvailability: row.table1?.[16].onSiteAvailability,
        table1_16_onCallAvailability: row.table1?.[16].onCallAvailability,
        table1_17_Manpower: row.table1?.[17].Manpower,
        table1_17_Number: row.table1?.[17].Number,
        table1_17_availability247: row.table1?.[17].availability247,
        table1_17_onSiteAvailability: row.table1?.[17].onSiteAvailability,
        table1_17_onCallAvailability: row.table1?.[17].onCallAvailability,
        table1_18_Manpower: row.table1?.[18].Manpower,
        table1_18_Number: row.table1?.[18].Number,
        table1_18_availability247: row.table1?.[18].availability247,
        table1_18_onSiteAvailability: row.table1?.[18].onSiteAvailability,
        table1_18_onCallAvailability: row.table1?.[18].onCallAvailability,
        Other: "Other",
        table1_19_Manpower: "row.table1?.[19].Manpower",
        table1_19_Number: "row.table1?.[19].Number",
        table1_19_availability247: "row.table1?.[19].availability247",
        table1_19_onSiteAvailability: "row.table1?.[19].onSiteAvailability",
        table1_19_onCallAvailability: "row.table1?.[19].onCallAvailability",
        C2a_0: row.C2a?.[0],
        C2a_1: row.C2a?.[1],
        C2a_2: row.C2a?.[2],
        C2a_3: row.C2a?.[3],
        C2a_4: row.C2a?.[4],
        C2a_5: row.C2a?.[5],
        C2a_6: row.C2a?.[6],
        C2a_7: row.C2a?.[7],
        C2a_8: row.C2a?.[8],
        C2a_9: row.C2a?.[9],
        C2a_10: row.C2a?.[10],
        C2a_11: row.C2a?.[11],
        C2b_0: row.C2b?.[0],
        C2b_1: row.C2b?.[1],
        C2b_2: row.C2b?.[2],
        C2b_3: row.C2b?.[3],
        C2b_4: row.C2b?.[4],
        C2b_5: row.C2b?.[5],
        C2b_6: row.C2b?.[6],
        C2b_7: row.C2b?.[7],
        C2b_8: row.C2b?.[8],
        C2b_9: row.C2b?.[9],
        C2b_10: row.C2b?.[10],
        C3: row.C3,
        // C4: row.C4,
        C4_0: row.C4?.[0],
        C4_1: row.C4?.[1],
        C4_2: row.C4?.[2],
        C4_3: row.C4?.[3],
        C4_4: row.C4?.[4],
        C4_5: row.C4?.[5],
        C4_6: row.C4?.[6],
        C4_7: row.C4?.[7],
        C4_8: row.C4?.[8],
        C4_9: row.C4?.[9],
        C4_10: row.C4?.[10],
        C4_11: row.C4?.[11] != null ? "Others" : "",
        C4_12: row.C4?.[11],
        H1D1_0: row.H1D1?.[0],
        H1D1_1: row.H1D1?.[1],
        H1D1_2: row.H1D1?.[2],
        H1D1_3: row.H1D1?.[3],
        H1D1_4: row.H1D1?.[4],
        H1D1_5: row.H1D1?.[5],
        H1D1_6: row.H1D1?.[6],
        H1D1_7: row.H1D1?.[7],
        H1D1_8: row.H1D1?.[8],
        H1D1_9: row.H1D1?.[9],
        H1D1_10: row.H1D1?.[10],
        H1D1_11: row.H1D1?.[11],
        H1D1_12: row.H1D1?.[12],
        H1D1_13: row.H1D1?.[13],
        H1D1_14: row.H1D1?.[14],
        H1D1_15: row.H1D1?.[15],
        H1D1_16: row.H1D1?.[16],
        H1D1_17: row.H1D1?.[17],
        H1D1_18: row.H1D1?.[18],
        H1D1_19: row.H1D1?.[19],
        H1D1_20: row.H1D1?.[20],
        H1D1_21: row.H1D1?.[21],
        H1D1_22: row.H1D1?.[22],
        H1D1_23: row.H1D1?.[23],
        H1D1_24: row.H1D1?.[24],
        H1D1_25: row.H1D1?.[25],
        H1D1_26: row.H1D1?.[26],
        H1D1_27: row.H1D1?.[27],
        H1D2_0: row.H1D2?.[0],
        H1D2_1: row.H1D2?.[1],
        H1D2_2: row.H1D2?.[2],
        H1D2_3: row.H1D2?.[3],
        H1D2_4: row.H1D2?.[4],
        H1D2_5: row.H1D2?.[5],
        H1D2_6: row.H1D2?.[6],
        H1D2_7: row.H1D2?.[7],
        H1D2_8: row.H1D2?.[8],
        H1D2_9: row.H1D2?.[9],
        H1D2_10: row.H1D2?.[10],
        H1D2_11: row.H1D2?.[11],
        H1D2_12: row.H1D2?.[12],
        H1D2_13: row.H1D2?.[13],
        H1D2_14: row.H1D2?.[14],
        H1D2_15: row.H1D2?.[15],
        H1D2_16: row.H1D2?.[16],
        H1D2_17: row.H1D2?.[17],
        H1D2_18: row.H1D2?.[18],
        H1D2_19: row.H1D2?.[19],
        H1D2_20: row.H1D2?.[20],
        H1D2_21: row.H1D2?.[21],
        H1D2_22: row.H1D2?.[22],
        H1D2_23: row.H1D2?.[23],
        H1D2_24: row.H1D2?.[24],
        H1D2_25: row.H1D2?.[25],
        table2_Adult: row.table2?.[0].Adult,
        table2_Pediatric: row.table2?.[0].Pediatric,
        table2_Broughtdead: row.table2?.[0].Broughtdead,
        table2_Deathafterarrival: row.table2?.[0].Deathafterarrival,
        table2_MLC: row.table2?.[0].MLC,
        table3_0_Attended: row.table3?.[0].Attended,
        table3_0_Death: row.table3?.[0].Death,
        table3_1_Attended: row.table3?.[1].Attended,
        table3_1_Death: row.table3?.[1].Death,
        table3_2_Attended: row.table3?.[2].Attended,
        table3_2_Death: row.table3?.[2].Death,
        table3_3_Attended: row.table3?.[3].Attended,
        table3_3_Death: row.table3?.[3].Death,
        table3_4_Attended: row.table3?.[4].Attended,
        table3_4_Death: row.table3?.[4].Death,
        table3_5_Attended: row.table3?.[5].Attended,
        table3_5_Death: row.table3?.[5].Death,
        table3_6_Attended: row.table3?.[6].Attended,
        table3_6_Death: row.table3?.[6].Death,
        table3_7_Attended: row.table3?.[7].Attended,
        table3_7_Death: row.table3?.[7].Death,
        table3_8_Attended: row.table3?.[8].Attended,
        table3_8_Death: row.table3?.[8].Death,
        E3_0: row.E3?.[0],
        E3_1: row.E3?.[1],
        E3_2: row.E3?.[2],
        E3_3: row.E3?.[3],
        E3_4: row.E3?.[4],
        E3_5: row.E3?.[5],
        E3_6: row.E3?.[6],
        E3_7: row.E3?.[7],
        E3_8: row.E3?.[8],
        E3_9: row.E3?.[9],
        E3_10: row.E3?.[10],
        E3_11: row.E3?.[11],
        E3_12: row.E3?.[12],
        E3_13: row.E3?.[13],
        E3_14: row.E3?.[14],
        E3_15: row.E3?.[15],
        E3_16: row.E3?.[16],
        E3_17: row.E3?.[17],
        E4_0: row.E4?.[0],
        E4_1: row.E4?.[1],
        E4_2: row.E4?.[2],
        E4_3: row.E4?.[3],
        E4_4: row.E4?.[4],
        E4_5: row.E4?.[5],
        E4_6: row.E4?.[6],
        E4_7: row.E4?.[7],
        H1F1: row.H1F1,
        H1F2: row.H1F2,
        H1F3: row.H1F3,
        H1F4_0: row.H1F4?.[0],
        H1F4_1: row.H1F4?.[1],
        H1F4_2: row.H1F4?.[2],
        H1F4_3: row.H1F4?.[3],
        H1F4_4: row.H1F4?.[4],
        H1F4_5: row.H1F4?.[5],
        H1F5: row.H1F5,
        H1F6_0: row.H1F6?.[0] != null ? "Yes" : "No",
        H1F6_1: row.H1F6?.[1] != null ? "Yes" : "No",
        H1F6_2: row.H1F6?.[2] != null ? "Yes" : "No",
        H1F6_3: row.H1F6?.[0],
        H1F6_4: row.H1F6?.[1],
        H1F6_5: row.H1F6?.[2],
        H1F7: row.H1F7,
        H1F8: row.H1F8,
        H1F9: row.H1F9,
        H1G1: row.H1G1,
        H1G2: row.H1G2,
        H1G3: row.H1G3,
        H1G4: row.H1G4,
        H1G5: row.H1G5,
        H1H1: row.H1H1,
        H1H2: row.H1H2,
        H1H3: row.H1H3,
        H1H4: row.H1H4,
        H1H5: row.H1H5,
        H1H6: row.H1H6,
        H1H7: row.H1H7,
        H1H8_0: row.H1H8?.[1],
        H1H8_1: row.H1H8?.[0],
        H1H9: row.H1H9,
        I1_0: row.I1?.[0],
        I1_1: row.I1?.[1],
        I1_2: row.I1?.[2],
        I1_3: row.I1?.[3],
        I1_4: row.I1?.[4],
        I1_5: row.I1?.[5],
        I1_6: row.I1?.[6],
        I1_7: row.I1?.[7],
        I1_8: row.I1?.[8],
        I1_9: row.I1?.[9],
        I1_10: row.I1?.[10],
        I1_11: row.I1?.[11],
        I1_12: row.I1?.[12],
        I1_13: row.I1?.[13],
        I1_14: row.I1?.[14],
        I1_15: row.I1?.[15],
        I1_16: row.I1?.[16],
        table4_0_SOP: row.table4?.[0].SOP,
        table4_0_FollowsSOP: row.table4?.[0].FollowsSOP,
        table4_1_SOP: row.table4?.[1].SOP,
        table4_1_FollowsSOP: row.table4?.[1].FollowsSOP,
        table4_2_SOP: row.table4?.[2].SOP,
        table4_2_FollowsSOP: row.table4?.[2].FollowsSOP,
        table4_3_SOP: row.table4?.[3].SOP,
        table4_3_FollowsSOP: row.table4?.[3].FollowsSOP,
        table4_4_SOP: row.table4?.[4].SOP,
        table4_4_FollowsSOP: row.table4?.[4].FollowsSOP,
        table4_5_SOP: row.table4?.[5].SOP,
        table4_5_FollowsSOP: row.table4?.[5].FollowsSOP,
        table4_6_SOP: row.table4?.[6].SOP,
        table4_6_FollowsSOP: row.table4?.[6].FollowsSOP,
        table4_7_SOP: row.table4?.[7].SOP,
        table4_7_FollowsSOP: row.table4?.[7].FollowsSOP,
        table4_8_SOP: row.table4?.[8].SOP,
        table4_8_FollowsSOP: row.table4?.[8].FollowsSOP,
        H1J1: row.H1J1,
        H1J2: row.H1J2,
      }))
    );

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", 'attachment; filename="hfat-1.csv"');

    // await workbook.xlsx.write(res);
    await workbook.csv.write(res);
    res.end();
    // res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating CSV file");
  }
};
