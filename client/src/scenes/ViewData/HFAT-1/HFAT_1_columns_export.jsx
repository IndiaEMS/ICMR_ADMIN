import generateColumns from "./../generateColumns";
import getOptionsIndex from "./../getOptionsIndex";

const columns = [
  {
    headerName: "Record ID",
    field: "_id",
    checkboxSelection: true,
    headerCheckboxSelection: true,
    width: 250,
    valueGetter: (params) => params.data?._id,
  },
  {
    headerName: "Unique Code",
    field: "uniqueCode",
    valueGetter: (params) => params.data?.uniqueCode,
  },
  { headerName: "1A.1. Assessor's Name", field: "A1" },
  { headerName: "1A.2. Date", field: "A2" },
  {
    headerName: "1A.3. Code",
    field: "A3",
    valueGetter: (params) => params.data?.A3,
  },
  { headerName: "1A.4. Block Name", field: "A4" },
  { headerName: "1A.5. Healthcare Facility Name", field: "A5" },
  { headerName: "1A.6. Healthcare Facility Address", field: "A6" },
  { headerName: "1A.7. Name of the Hospital Superintendent", field: "A7" },
  {
    headerName: "1A.8. Contact Number of the Hospital Superintendent:",
    field: "A8",
  },
  { headerName: "1A.9. Email ID:", field: "A9" },
  {
    field: "A10_0",
    headerName: "1A.10. GPS_1",
    valueGetter: (params) => params?.data?.A10?.latitude,
  },
  {
    field: "A10_1",
    headerName: "1A.10. GPS_2",
    valueGetter: (params) => params?.data?.A10?.longitude,
  },
  {
    field: "A10_2",
    headerName: "1A.10. District",
    valueGetter: (params) => params?.data?.A10?.district,
  },
  {
    field: "A10_3",
    headerName: "1A.10. State",
    valueGetter: (params) => params?.data?.A10?.state,
  },
  { field: "A11", headerName: "1A.11. Type of Health Care Facility?" },
  {
    field: "A12",
    headerName: "1A.12. If Tertiary care center, select the appropriate one",
  },
  {
    field: "B1",
    headerName:
      "1B.1 How many beds are available for the in-patient department (IPD)?",
  },
  {
    field: "B2",
    headerName:
      "1B.2 Whether any dedicated bed present for emergency care? If No, skip to 1B.5",
  },
  {
    field: "B3",
    headerName: "1B.3. How many beds are available for emergency care?",
  },
  {
    field: "B4_0",
    headerName:
      "1B.4 : Number of Beds by Emergency Severity Index (ESI): (choice=Red)",
    valueGetter: (params) => params.data?.B4?.[0]?.split(":")[1],
  },
  {
    field: "B4_1",
    headerName:
      "1B.4 : Number of Beds by Emergency Severity Index (ESI): (choice=Yellow)",
    valueGetter: (params) => params.data?.B4?.[1]?.split(":")[1],
  },
  {
    field: "B4_2",
    headerName:
      "1B.4 : Number of Beds by Emergency Severity Index (ESI): (choice=Green)",
    valueGetter: (params) => params.data?.B4?.[2]?.split(":")[1],
  },
  {
    field: "B5",
    headerName:
      "1B.5 What is the average number of patients presenting to OPD per month?",
  },
  {
    field: "B6",
    headerName:
      "1B.6 What is the average number of patients presenting with emergency conditions daily? (Chest pain, stroke, acute weakness, acute blindness, Shortness of breath, altered mentation, snake bite, bites, road traffic accident, injuries ,poisoning, deliberate self-harm, infectious diseases, fever, pregnancy related, seizure, acute abdomen, anaphylaxis, cerebro-meningeal infections, foreign body, acute pulmonary disease, Shock, accidental injuries, infections)",
  },
  {
    field: "B7_0",
    headerName: "1B.7 Does the facility have a licensed in-house blood bank?",
    valueGetter: (params) => params.data?.B7?.split(":")[0],
  },
  {
    field: "B7_1",
    headerName:
      "1B.7 Does the facility have a licensed in-house blood bank? (Other Specify)",
    valueGetter: (params) => params.data?.B7?.split(":")[1],
  },
  {
    field: "B8_0",
    headerName:
      "1B.8 Which of these does the blood bank have among the following? (choice=Component facility)",
  },
  {
    field: "B8_1",
    headerName:
      "1B.8 Which of these does the blood bank have among the following? (choice=O- ve Blood availability)",
  },
  {
    field: "B9",
    headerName: "1B.9 Is there a blood storage facility inside the emergency?",
  },
  {
    field: "B10",
    headerName:
      "1B.10 Which of the following does your facility have to provide easy access for emergency care?",
      valueGetter: (params) => getOptionsIndex(params.data?.B10),
    },
    {
      field: "B11",
      headerName:
      "1B.11 Which of the following demarcated /dedicated areas does this facility have for emergency care?",
      valueGetter: (params) => getOptionsIndex(params.data?.B11),
    },
    {
      field: "B12",
      headerName:
      "1B.12 Is there any display board of all the emergency services and entitlements available in its departments?",
      valueGetter: (params) => getOptionsIndex(params.data?.B12),
  },
  {
    field: "B12_5",
    headerName:
      "1B.12 Is there any display board of all the emergency services and entitlements available in its departments? (choice=Other)",
    valueGetter: (params) =>
      (params.data?.B12?.[5]?.length > 0 && "Other") || null,
  },
  {
    field: "B12_5",
    headerName:
      "1B.12 Is there any display board of all the emergency services and entitlements available in its departments? (Other Specify)",
  },
  {
    field: "B13",
    headerName:
      "1B.13 Which of the following safety and security infrastructure/ measures are in place at your hospital:",
      valueGetter: (params) => getOptionsIndex(params.data?.B13),
  },
  {
    field: "B14",
    headerName:
      "1B.14 Does the hospital provide ambulance services? If Yes, please remember to complete the Ambulance Checklist after completing HFAT, else skip to 1B.15",
  },
  {
    field: "B15",
    headerName:
      "IB.15 If ambulances are not there, how are patients transferred?",
  },
  {
    field: "table1_0_Manpower",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Faculty/Consultant) (Manpower)",
  },
  {
    field: "table1_0_Number",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Faculty/Consultant) (Number)",
  },
  {
    field: "table1_0_Availability",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Faculty/Consultant) (availability24 X 7)",
  },
  {
    field: "table1_0_OnSite",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Faculty/Consultant) (onSiteAvailability)",
  },
  {
    field: "table1_0_OnCall",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Faculty/Consultant) (onCallAvailability)",
  },
  {
    field: "table1_1_Manpower",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (CMO = casualty medical officer) (Manpower)",
  },
  {
    field: "table1_1_Number",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (CMO = casualty medical officer) (Number)",
  },
  {
    field: "table1_1_Availability",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (CMO = casualty medical officer) (availability24 X 7)",
  },
  {
    field: "table1_1_OnSite",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (CMO = casualty medical officer) (onSiteAvailability)",
  },
  {
    field: "table1_1_OnCall",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (CMO = casualty medical officer) (onCallAvailability)",
  },
  {
    field: "table1_2_Manpower",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (SR = Senior Residents) (Manpower)",
  },
  {
    field: "table1_2_Number",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (SR = Senior Residents) (Number)",
  },
  {
    field: "table1_2_Availability",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (SR = Senior Residents) (availability24 X 7)",
  },
  {
    field: "table1_2_OnSite",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (SR = Senior Residents) (onSiteAvailability)",
  },
  {
    field: "table1_2_OnCall",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (SR = Senior Residents) (onCallAvailability)",
  },
  {
    field: "table1_3_Manpower",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (JR = Junior Residents) (Manpower)",
  },
  {
    field: "table1_3_Number",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (JR = Junior Residents) (Number)",
  },
  {
    field: "table1_3_Availability",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (JR = Junior Residents) (availability24 X 7)",
  },
  {
    field: "table1_3_OnSite",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (JR = Junior Residents) (onSiteAvailability)",
  },
  {
    field: "table1_3_OnCall",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (JR = Junior Residents) (onCallAvailability)",
  },
  {
    field: "table1_4_Manpower",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (MO = Medical officer) (Manpower)",
  },
  {
    field: "table1_4_Number",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (MO = Medical officer) (Number)",
  },
  {
    field: "table1_4_Availability",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (MO = Medical officer) (availability24 X 7)",
  },
  {
    field: "table1_4_OnSite",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (MO = Medical officer) (onSiteAvailability)",
  },
  {
    field: "table1_4_OnCall",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (MO = Medical officer) (onCallAvailability)",
  },
  {
    field: "table1_5_Manpower",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Nursing officer in charge / Team leader) (Manpower)",
  },
  {
    field: "table1_5_Number",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Nursing officer in charge / Team leader) (Number)",
  },
  {
    field: "table1_5_Availability",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Nursing officer in charge / Team leader) (availability24 X 7)",
  },
  {
    field: "table1_5_OnSite",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Nursing officer in charge / Team leader) (onSiteAvailability)",
  },
  {
    field: "table1_5_OnCall",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Nursing officer in charge / Team leader) (onCallAvailability)",
  },
  {
    field: "table1_6_Manpower",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Staff Nurse/ Nursing Officer) (Manpower)",
  },
  {
    field: "table1_6_Number",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Staff Nurse/ Nursing Officer) (Number)",
  },
  {
    field: "table1_6_Availability",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Staff Nurse/ Nursing Officer) (availability24 X 7)",
  },
  {
    field: "table1_6_OnSite",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Staff Nurse/ Nursing Officer) (onSiteAvailability)",
  },
  {
    field: "table1_6_OnCall",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Staff Nurse/ Nursing Officer) (onCallAvailability)",
  },
  {
    field: "table1_7_Manpower",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Radiology technician/ Radiographer) (Manpower)",
  },
  {
    field: "table1_7_Number",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Radiology technician/ Radiographer) (Number)",
  },
  {
    field: "table1_7_Availability",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Radiology technician/ Radiographer) (availability24 X 7)",
  },
  {
    field: "table1_7_OnSite",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Radiology technician/ Radiographer) (onSiteAvailability)",
  },
  {
    field: "table1_7_OnCall",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Radiology technician/ Radiographer) (onCallAvailability)",
  },
  {
    field: "table1_8_Manpower",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Lab Technician) (Manpower)",
  },
  {
    field: "table1_8_Number",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Lab Technician) (Number)",
  },
  {
    field: "table1_8_Availability",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Lab Technician) (availability24 X 7)",
  },
  {
    field: "table1_8_OnSite",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Lab Technician) (onSiteAvailability)",
  },
  {
    field: "table1_8_OnCall",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Lab Technician) (onCallAvailability)",
  },
  {
    field: "table1_9_Manpower",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (OT. Technician) (Manpower)",
  },
  {
    field: "table1_9_Number",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (OT. Technician) (Number)",
  },
  {
    field: "table1_9_Availability",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (OT. Technician) (availability24 X 7)",
  },
  {
    field: "table1_9_OnSite",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (OT. Technician) (onSiteAvailability)",
  },
  {
    field: "table1_9_OnCall",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (OT. Technician) (onCallAvailability)",
  },
  {
    field: "table1_10_Manpower",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (H.A/ GDA/ Orderly (GDA)General Duty Assistant, SA- Sanitary Attendant, HA- Hospital Attendant) (Manpower)",
  },
  {
    field: "table1_10_Number",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (H.A/ GDA/ Orderly (GDA)General Duty Assistant, SA- Sanitary Attendant, HA- Hospital Attendant) (Number)",
  },
  {
    field: "table1_10_Availability",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (H.A/ GDA/ Orderly (GDA)General Duty Assistant, SA- Sanitary Attendant, HA- Hospital Attendant) (availability24 X 7)",
  },
  {
    field: "table1_10_OnSite",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (H.A/ GDA/ Orderly (GDA)General Duty Assistant, SA- Sanitary Attendant, HA- Hospital Attendant) (onSiteAvailability)",
  },
  {
    field: "table1_10_OnCall",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (H.A/ GDA/ Orderly (GDA)General Duty Assistant, SA- Sanitary Attendant, HA- Hospital Attendant) (onCallAvailability)",
  },
  {
    field: "table1_11_Manpower",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (SA/ Housekeeping staff) (Manpower)",
  },
  {
    field: "table1_11_Number",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (SA/ Housekeeping staff) (Number)",
  },
  {
    field: "table1_11_Availability",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (SA/ Housekeeping staff) (availability24 X 7)",
  },
  {
    field: "table1_11_OnSite",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (SA/ Housekeeping staff) (onSiteAvailability)",
  },
  {
    field: "table1_11_OnCall",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (SA/ Housekeeping staff) (onCallAvailability)",
  },
  {
    field: "table1_12_Manpower",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (EMT) (Manpower)",
  },
  {
    field: "table1_12_Number",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (EMT) (Number)",
  },
  {
    field: "table1_12_Availability",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (EMT) (availability24 X 7)",
  },
  {
    field: "table1_12_OnSite",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (EMT) (onSiteAvailability)",
  },
  {
    field: "table1_12_OnCall",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (EMT) (onCallAvailability)",
  },
  {
    field: "table1_13_Manpower",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Security) (Manpower)",
  },
  {
    field: "table1_13_Number",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Security) (Number)",
  },
  {
    field: "table1_13_Availability",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Security) (availability24 X 7)",
  },
  {
    field: "table1_13_OnSite",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Security) (onSiteAvailability)",
  },
  {
    field: "table1_13_OnCall",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Security) (onCallAvailability)",
  },
  {
    field: "table1_14_Manpower",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Registration staff) (Manpower)",
  },
  {
    field: "table1_14_Number",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Registration staff) (Number)",
  },
  {
    field: "table1_14_Availability",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Registration staff) (availability24 X 7)",
  },
  {
    field: "table1_14_OnSite",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Registration staff) (onSiteAvailability)",
  },
  {
    field: "table1_14_OnCall",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Registration staff) (onCallAvailability)",
  },
  {
    field: "table1_15_Manpower",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (IT Staff) (Manpower)",
  },
  {
    field: "table1_15_Number",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (IT Staff) (Number)",
  },
  {
    field: "table1_15_Availability",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (IT Staff) (availability24 X 7)",
  },
  {
    field: "table1_15_OnSite",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (IT Staff) (onSiteAvailability)",
  },
  {
    field: "table1_15_OnCall",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (IT Staff) (onCallAvailability)",
  },
  {
    field: "table1_16_Manpower",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Hospital Administrator) (Manpower)",
  },
  {
    field: "table1_16_Number",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Hospital Administrator) (Number)",
  },
  {
    field: "table1_16_Availability",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Hospital Administrator) (availability24 X 7)",
  },
  {
    field: "table1_16_OnSite",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Hospital Administrator) (onSiteAvailability)",
  },
  {
    field: "table1_16_OnCall",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Hospital Administrator) (onCallAvailability)",
  },
  {
    field: "table1_17_Manpower",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Pharmacist) (Manpower)",
  },
  {
    field: "table1_17_Number",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Pharmacist) (Number)",
  },
  {
    field: "table1_17_Availability",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Pharmacist) (availability24 X 7)",
  },
  {
    field: "table1_17_OnSite",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Pharmacist) (onSiteAvailability)",
  },
  {
    field: "table1_17_OnCall",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Pharmacist) (onCallAvailability)",
  },
  {
    field: "table1_18_Manpower",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Other (please specify)) (Manpower)",
  },
  {
    field: "table1_18_Manpower_other_specify",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Other (please specify)) (Manpower) (Other Specify)",
    valueGetter: (params) => params.data?.table1?.[18]?.otherSpecify,
  },
  {
    field: "table1_18_Number",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Other (please specify)) (Number)",
  },
  {
    field: "table1_18_Availability",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Other (please specify)) (availability24 X 7)",
  },
  {
    field: "table1_18_OnSite",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Other (please specify)) (onSiteAvailability)",
  },
  {
    field: "table1_14_OnCall",
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide (Other (please specify)) (onCallAvailability)",
  },
  {
    field: "C2a",
    headerName:
      "1C.2 Please indicate which of the following specialist/super specialist services are available in your hospital - District hospital + Medical college",
      valueGetter: (params) => getOptionsIndex(params.data?.C2a),
  },
  {
    field: "C2b",
    headerName:
      "1C.2 Please indicate which of the following specialist/super specialist services are available in your hospital - Medical college",
      valueGetter: (params) => getOptionsIndex(params.data?.C2b),
  },
  {
    field: "C3",
    headerName:
      "1C.3 Whether training for emergency care management is being conducted for the staff in the institution?",
  },
  {
    field: "C4",
    headerName:
      "1C4. Which of the following emergency care trainings have you undergone?",
      valueGetter: (params) => getOptionsIndex(params.data?.C4),
  },
  {
    field: "C4_11",
    headerName:
      "1C4. Which of the following emergency care trainings have you undergone? (choice = Other)",
    valueGetter: (params) =>
      (params.data?.C4?.[11]?.length > 0 && "Other") || "",
  },
  {
    field: "C4_12",
    headerName:
      "1C4. Which of the following emergency care trainings have you undergone? (Other Specify)",
    valueGetter: (params) => params.data?.C4?.[11],
  },
  {
    field: "C5_0",
    headerName: "1C.5 Frequency of training on emergency care in a year?",
    valueGetter: (params) => params.data?.C5?.split(":")[0],
  },
  {
    field: "C5_1",
    headerName:
      "1C.5 Frequency of training on emergency care in a year? (Other Specify)",
    valueGetter: (params) => params.data?.C5?.split(":")[1],
  },
  { field: "C6", headerName: "1C.6 When was the last training conducted?" },
  {
    field: "H1D1",
    headerName:
      "1D.1 Which of the following essential emergency drugs are available at the DH/ Tertiary Care Hospital?",
      valueGetter: (params) => getOptionsIndex(params.data?.H1D1),
  },
  {
    field: "H1D2",
    headerName:
      "1D.2 Which of the following essential emergency equipment is available at the DH/ Tertiary Care Hospital?",
      valueGetter: (params) => getOptionsIndex(params.data?.H1D2),
  },
  {
    field: "table2_0_Adult",
    headerName:
      "1E.1 Numbers of Patients who Visited ED in Last One Month (Adult (>18 Years))",
  },
  {
    field: "table2_0_Pediatric",
    headerName:
      "1E.1 Numbers of Patients who Visited ED in Last One Month (Pediatrics)",
  },
  {
    field: "table2_0_Broughtdead",
    headerName:
      "1E.1 Numbers of Patients who Visited ED in Last One Month (Brought dead)",
  },
  {
    field: "table2_0_Deathafterarrival",
    headerName:
      "1E.1 Numbers of Patients who Visited ED in Last One Month (Death after arrival)",
  },
  {
    field: "table2_0_MLC",
    headerName:
      "1E.1 Numbers of Patients who Visited ED in Last One Month (MLC)",
  },
  {
    field: "table3_0_Attended",
    headerName:
      "1E.2. Numbers of Patients Attended in ED and Deaths in in Last One Year (MI - Attended)",
  },
  {
    field: "table3_0_Death",
    headerName:
      "1E.2. Numbers of Patients Attended in ED and Deaths in in Last One Year (MI - Death)",
  },
  {
    field: "table3_1_Attended",
    headerName:
      "1E.2. Numbers of Patients Attended in ED and Deaths in in Last One Year (Stroke -Attended)",
  },
  {
    field: "table3_1_Death",
    headerName:
      "1E.2. Numbers of Patients Attended in ED and Deaths in in Last One Year (Stroke - Death)",
  },
  {
    field: "table3_2_Attended",
    headerName:
      "1E.2. Numbers of Patients Attended in ED and Deaths in in Last One Year (Trauma & Burns -Attended)",
  },
  {
    field: "table3_2_Death",
    headerName:
      "1E.2. Numbers of Patients Attended in ED and Deaths in in Last One Year (Trauma & Burns - Death)",
  },
  {
    field: "table3_3_Attended",
    headerName:
      "1E.2. Numbers of Patients Attended in ED and Deaths in in Last One Year (Poisoning -Attended)",
  },
  {
    field: "table3_3_Death",
    headerName:
      "1E.2. Numbers of Patients Attended in ED and Deaths in in Last One Year (Poisoning - Death)",
  },
  {
    field: "table3_4_Attended",
    headerName:
      "1E.2. Numbers of Patients Attended in ED and Deaths in in Last One Year (Snake Bites -Attended)",
  },
  {
    field: "table3_4_Death",
    headerName:
      "1E.2. Numbers of Patients Attended in ED and Deaths in in Last One Year (Snake Bites - Death)",
  },
  {
    field: "table3_5_Attended",
    headerName:
      "1E.2. Numbers of Patients Attended in ED and Deaths in in Last One Year (Maternal Emergencies-PPH -Attended)",
  },
  {
    field: "table3_5_Death",
    headerName:
      "1E.2. Numbers of Patients Attended in ED and Deaths in in Last One Year (Maternal Emergencies-PPH - Death)",
  },
  {
    field: "table3_6_Attended",
    headerName:
      "1E.2. Numbers of Patients Attended in ED and Deaths in in Last One Year (Maternal Emergencies-Eclampsia -Attended)",
  },
  {
    field: "table3_6_Death",
    headerName:
      "1E.2. Numbers of Patients Attended in ED and Deaths in in Last One Year (Maternal Emergencies-Eclampsia - Death)",
  },
  {
    field: "table3_7_Attended",
    headerName:
      "1E.2. Numbers of Patients Attended in ED and Deaths in in Last One Year (Neonatal Emergencies -Attended)",
  },
  {
    field: "table3_7_Death",
    headerName:
      "1E.2. Numbers of Patients Attended in ED and Deaths in in Last One Year (Neonatal Emergencies - Death)",
  },
  {
    field: "table3_8_Attended",
    headerName:
      "1E.2. Numbers of Patients Attended in ED and Deaths in in Last One Year (Acute Respiratory Illness -Attended)",
  },
  {
    field: "table3_8_Death",
    headerName:
      "1E.2. Numbers of Patients Attended in ED and Deaths in in Last One Year (Acute Respiratory Illness - Death)",
  },
  {
    field: "E3_0",
    headerName:
      "1E.3. Which services does your healthcare facility provide?",
      valueGetter: (params) => getOptionsIndex(params.data?.E3),
  },
  {
    field: "E3_16",
    headerName:
      "1E.3. Which services does your healthcare facility provide? (Select all that apply) (choice=Other)",
    valueGetter: (params) =>
      (params.data?.E3?.[16]?.length > 0 && "Other") || "",
  },
  {
    field: "E3_16",
    headerName:
      "1E.3. Which services does your healthcare facility provide? (Other Specify)",
  },
  {
    field: "E4",
    headerName:
      "1E.4 Which of these emergency diagnostic facilities are provided at DH/ Tertiary Care Hospital?",
      valueGetter: (params) => getOptionsIndex(params.data?.E4),
  },
  {
    field: "E4_6",
    headerName:
      "1E.4 Which of these emergency diagnostic facilities are provided at DH/ Tertiary Care Hospital? (choice=Other)",
    valueGetter: (params) =>
      (params.data?.E4?.[6]?.length > 0 && "Other") || "",
  },
  {
    field: "E4_6",
    headerName:
      "1E.4 Which of these emergency diagnostic facilities are provided at DH/ Tertiary Care Hospital? (other specify)",
  },
  {
    field: "H1F1",
    headerName:
      "1F.1 Does the hospital have a Hospital Information System (HIS)?",
  },
  {
    field: "H1F2",
    headerName:
      "1F.2 Does this facility do complete reporting of indicators on emergency care in HMIS?",
  },
  {
    field: "H1F3",
    headerName:
      "1F.3 How many personnel are available for managing information system?",
  },
  {
    field: "H1F4",
    headerName:
      "1F.4 What key indicators are generated from the emergency management information system?",
      valueGetter: (params) => getOptionsIndex(params.data?.H1F4),
  },
  {
    field: "H1F5",
    headerName:
      "1F.5 Whether time bound management of common emergencies is captured in MIS. For example, Door to CT/ECG time, Door to needle time, Time to activate emergency alert team. If No, Skip to IF.6, otherwise answer IF. 5",
  },
  {
    field: "H1F6_0",
    headerName:
      "1F.6 If Yes, select all that apply and provide their value (choice=Door to CT/ECG time)",
  },
  {
    field: "H1F6_1",
    headerName:
      "1F.6 If Yes, select all that apply and provide their value (choice=Door to needle time)",
  },
  {
    field: "H1F6_2",
    headerName:
      "1F.6 If Yes, select all that apply and provide their value (choice=Time to activate emergency alert team)",
  },
  {
    field: "H1F6_3",
    headerName: "1F.6 Door to CT/ECG time",
    valueGetter: (params) => params.data?.H1F6?.[0]?.split(":-")[1],
  },
  {
    field: "H1F6_4",
    headerName: "1F.6 Door to needle time",
    valueGetter: (params) => params.data?.H1F6?.[1]?.split(":-")[1],
  },
  {
    field: "H1F6_5",
    headerName: "1F.6 Time to activate emergency alert team",
    valueGetter: (params) => params.data?.H1F6?.[2]?.split(":-")[1],
  },
  {
    field: "H1F7",
    headerName:
      "1F.7 Whether hospital administrators/ Medical Superintendent uses or reviews the data for quality improvement",
  },
  {
    field: "H1F8",
    headerName:
      "1F.8 Do you get Pre-Hospital Notification during an emergency?",
  },
  {
    field: "H1F9",
    headerName: "1F.9 Infrastructure for receiving internal communication?",
  },
  {
    field: "H1G1",
    headerName: "1G.1 Whether any untied fund is available at your hospital?",
  },
  {
    field: "H1G2",
    headerName:
      "1G.2 If Yes, whether this fund is utilized for providing emergency care services?",
  },
  {
    field: "H1G3",
    headerName: "1G.3 Whether any fund is available for emergency care?",
  },
  {
    field: "H1G4",
    headerName:
      "1G.4 If Yes, which health schemes are covering your emergency care system?",
  },
  {
    field: "H1G5",
    headerName:
      "1G.5 Out of total patients being provided emergency care, how many were provided services under PMJAY scheme/ any other insurance scheme",
  },
  {
    field: "H1H1",
    headerName: "1H.1.1 Do You have any Disaster Management Plan ?",
  },
  {
    field: "H1H2",
    headerName: "1H.1.2 Do you have system to Redistribution Plan?",
  },
  { field: "H1H3", headerName: "1H.1.3 Do you have any Evacuation Plan?" },
  {
    field: "H1H4",
    headerName:
      "1H.2.1 Do you have a Quality Improvement Committee? ( if yes, collect detail of Committee)",
  },
  {
    field: "H1H5",
    headerName: "1H.2.2 How frequently does this committee meet in a year?",
  },
  {
    field: "H1H6",
    headerName:
      "1H.2.3 Do you have regular audits related to emergency care in the hospital?",
  },
  {
    field: "H1H7",
    headerName: "1H.2.4 How frequently audits are conducted in a year?",
  },
  {
    field: "H1H8_0",
    headerName: "1H.2.5 Types of audits conducted?",
    valueGetter: (params) => getOptionsIndex(params.data?.H1H8),
  },
  {
    field: "H1H8_2",
    headerName: "1H.2.5 Types of audits conducted? (choice = other)",
    valueGetter: (params) =>
      (params.data?.H1H8?.[2]?.length > 0 && "Other") || "",
  },
  {
    field: "H1H8_2",
    headerName: "2H.2.5 Types of audits conducted? (Other Specify)",
  },
  {
    field: "H1H9",
    headerName:
      "1H.2.6 Any action being taken on Audit report in the last one year?",
  },
  {
    field: "I1_0",
    headerName:
      "1I.1 Indicate whether your hospital has the following documented protocols and systems",
      valueGetter: (params) => getOptionsIndex(params.data?.I1),
  },
  { field: "table4_0_SOP", headerName: "MI (SOP/STW)" },
  { field: "table4_0_FollowsSOP", headerName: "MI (FollowsSOP)" },
  { field: "table4_1_SOP", headerName: "Stroke (SOP/STW)" },
  { field: "table4_1_FollowsSOP", headerName: "Stroke (FollowsSOP)" },
  { field: "table4_2_SOP", headerName: "Trauma & Burns (SOP/STW)" },
  { field: "table4_2_FollowsSOP", headerName: "Trauma & Burns (FollowsSOP)" },
  { field: "table4_3_SOP", headerName: "Poisoning (SOP/STW)" },
  { field: "table4_3_FollowsSOP", headerName: "Poisoning (FollowsSOP)" },
  { field: "table4_4_SOP", headerName: "Snake Bites (SOP/STW)" },
  { field: "table4_4_FollowsSOP", headerName: "Snake Bites (FollowsSOP)" },
  { field: "table4_5_SOP", headerName: "Maternal Emergencies-PPH (SOP/STW)" },
  {
    field: "table4_5_FollowsSOP",
    headerName: "Maternal Emergencies-PPH (FollowsSOP)",
  },
  {
    field: "table4_6_SOP",
    headerName: "Maternal Emergencies- Eclampsia (SOP/STW)",
  },
  {
    field: "table4_6_FollowsSOP",
    headerName: "Maternal Emergencies- Eclampsia (FollowsSOP)",
  },
  { field: "table4_7_SOP", headerName: "Neonatal Emergencies (SOP/STW)" },
  {
    field: "table4_7_FollowsSOP",
    headerName: "Neonatal Emergencies (FollowsSOP)",
  },
  { field: "table4_8_SOP", headerName: "Acute Respiratory Illness (SOP/STW)" },
  {
    field: "table4_8_FollowsSOP",
    headerName: "Acute Respiratory Illness (FollowsSOP)",
  },
  {
    field: "H1J1",
    headerName:
      "1J.1 Does this facility have policies and procedures which guide the referral of patients from other hospitals?",
  },
  {
    field: "H1J2",
    headerName:
      "1J.2 Does this facility have any policies and procedures which guide the transfer- out/referral of stable and unstable patients after stabilization to another facility with documentation?",
  },
];

export const HFAT1ColumnsExport = generateColumns(columns);
