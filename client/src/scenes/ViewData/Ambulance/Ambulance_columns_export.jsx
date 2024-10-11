import generateColumns from "../generateColumns";
import generateAMBColumns from "../generateAMBColumns";

const columns = [
  {
    field: "AMBid",
    headerName: "Record ID",
    valueGetter: (params) => params.data?._id,
  },
  {
    field: "form",
    headerName: "Form name",
    valueGetter: (params) => params.data?.formUniqueCode?.split(":")?.[0],
  },
  {
    field: "formUniqueCode",
    headerName: "Form Unique Code",
    valueGetter: (params) => params.data?.formUniqueCode?.split(":")?.[1],
  },
  { field: "AMB2", headerName: "Name of the data Collector" },
  { field: "AMB1", headerName: "State" },
  { field: "uniqueCode", headerName: "AMB Unique Code" },
  { field: "AMB3", headerName: "Date" },
  { field: "AMB4_latitude", headerName: "GPS_1" },
  { field: "AMB4_longitude", headerName: "GPS_2" },
  { field: "AMB4_district", headerName: "District" },
  { field: "AMB4_state", headerName: "State" },
  { field: "AMB5", headerName: "1. Name of the Ambulance Service?" },
  {
    field: "AMB6",
    headerName: "2. Which Location/Area does your ambulance operate in?",
  },
  { field: "AMB7", headerName: "3. Type of Ambulance Service?" },
  { field: "AMB8", headerName: "4. Is the ambulance service available 24/7? " },
  {
    field: "AMB9",
    headerName: "5. How many cases do you transport per day on an a average?",
  },
  {
    field: "AMB10",
    headerName:
      "6. How many emergency cases do you transport per day on an a average?",
  },
  { field: "AMB11", headerName: "7. How much area to you cater to" },
  {
    field: "AMB12_0",
    headerName: "8. Staff on duty per ambulance (choice = Driver)",
  },
  {
    field: "AMB12_1",
    headerName: "8. Staff on duty per ambulance (choice = Doctor)",
  },
  {
    field: "AMB12_2",
    headerName:
      "8. Staff on duty per ambulance (choice = emergency medical technicians)",
  },
  {
    field: "AMB12_3",
    headerName: "8. Staff on duty per ambulance (choice = nurse)",
  },
  // {
  //   field: "AMB12_4",
  //   headerName: "8. Staff on duty per ambulance (choice = other)",
  // },
  // {
  //   field: "AMB12_5",
  //   headerName: "8. Staff on duty per ambulance (other specify)",
  // },
  {
    field: "AMB13",
    headerName:
      "9.1.Which Suction apparatus and accessories is available (choice=Portable or Mounted Suction Machine)",
  },
  // {
  //   field: "AMB13_1",
  //   headerName:
  //     "9.1.Which Suction apparatus and accessories is available (choice=Flexible suction catheters Fr. 5,8,12 and 14)",
  // },
  // {
  //   field: "AMB13_2",
  //   headerName:
  //     "9.1.Which Suction apparatus and accessories is available (choice=Both of the above)",
  // },
  // {
  //   field: "AMB13_3",
  //   headerName:
  //     "9.1.Which Suction apparatus and accessories is available (choice=None of the above)",
  // },
  {
    field: "AMB14",
    headerName:
      "9.2. Which type of Portable oxygen equipment/installed (choice=Portable oxygen tank with regulator)",
  },
  // {
  //   field: "AMB14_1",
  //   headerName:
  //     "9.2. Which type of Portable oxygen equipment/installed (choice=Oxygen mask No. 2,3 and 4 (for new-born, infant and adult))",
  // },
  // {
  //   field: "AMB14_2",
  //   headerName:
  //     "9.2. Which type of Portable oxygen equipment/installed (choice=Both of the above)",
  // },
  // {
  //   field: "AMB14_3",
  //   headerName:
  //     "9.2. Which type of Portable oxygen equipment/installed (choice=None of the above)",
  // },
  {
    field: "AMB15",
    headerName:
      "9.3. Whether Bag valve mask resuscitator with rebreathe bag for adult, pediatric and infant is available",
  },
  {
    field: "table1_0_Available",
    headerName: "9.4 : Whether it’s available or not (Monitor - Available)",
  },
  {
    field: "table1_0_Functional",
    headerName: "9.4 : Whether it’s available or not (Monitor - Functional)",
  },
  {
    field: "table1_0_LastUsed",
    headerName:
      "9.4 : Whether it’s available or not (Monitor - When was it last used?)",
  },
  {
    field: "table1_1_Available",
    headerName: "9.4 : Whether it’s available or not (ECG Machine - Available)",
  },
  {
    field: "table1_1_Functional",
    headerName:
      "9.4 : Whether it’s available or not (ECG Machine - Functional)",
  },
  {
    field: "table1_1_LastUsed",
    headerName:
      "9.4 : Whether it’s available or not (ECG Machine - When was it last used?)",
  },
  {
    field: "table1_2_Available",
    headerName:
      "9.4 : Whether it’s available or not (Pulse Oxymeter - Available)",
  },
  {
    field: "table1_2_Functional",
    headerName:
      "9.4 : Whether it’s available or not (Pulse Oxymeter - Functional)",
  },
  {
    field: "table1_2_LastUsed",
    headerName:
      "9.4 : Whether it’s available or not (Pulse Oxymeter - When was it last used?)",
  },
  {
    field: "table1_3_Available",
    headerName: "9.4 : Whether it’s available or not (Glucometer  - Available)",
  },
  {
    field: "table1_3_Functional",
    headerName:
      "9.4 : Whether it’s available or not (Glucometer  - Functional)",
  },
  {
    field: "table1_3_LastUsed",
    headerName:
      "9.4 : Whether it’s available or not (Glucometer  - When was it last used?)",
  },
  {
    field: "table1_4_Available",
    headerName:
      "9.4 : Whether it’s available or not (Defibrillator - Available)",
  },
  {
    field: "table1_4_Functional",
    headerName:
      "9.4 : Whether it’s available or not (Defibrillator - Functional)",
  },
  {
    field: "table1_4_LastUsed",
    headerName:
      "9.4 : Whether it’s available or not (Defibrillator - When was it last used?)",
  },
  {
    field: "table1_5_Available",
    headerName:
      "9.4 : Whether it’s available or not (Defibrillator pads - disposable - Available)",
  },
  {
    field: "table1_5_Functional",
    headerName:
      "9.4 : Whether it’s available or not (Defibrillator pads - disposable - Functional)",
  },
  {
    field: "table1_5_LastUsed",
    headerName:
      "9.4 : Whether it’s available or not (Defibrillator pads - disposable - When was it last used?)",
  },
  {
    field: "table1_6_Available",
    headerName:
      "9.4 : Whether it’s available or not (Sphygmomanometer, Non-mercurial- Paediatric cuff- Adult cuff - Available)",
  },
  {
    field: "table1_6_Functional",
    headerName:
      "9.4 : Whether it’s available or not (Sphygmomanometer, Non-mercurial- Paediatric cuff- Adult cuff - Functional)",
  },
  {
    field: "table1_6_LastUsed",
    headerName:
      "9.4 : Whether it’s available or not (Sphygmomanometer, Non-mercurial- Paediatric cuff- Adult cuff - When was it last used?)",
  },
  {
    field: "table1_7_Available",
    headerName:
      "9.4 : Whether it’s available or not (Stethoscope Adult - Available)",
  },
  {
    field: "table1_7_Functional",
    headerName:
      "9.4 : Whether it’s available or not (Stethoscope Adult - Functional)",
  },
  {
    field: "table1_7_LastUsed",
    headerName:
      "9.4 : Whether it’s available or not (Stethoscope Adult - When was it last used?)",
  },
  {
    field: "table1_8_Available",
    headerName:
      "9.4 : Whether it’s available or not (Stethoscope Paediatric - Available)",
  },
  {
    field: "table1_8_Functional",
    headerName:
      "9.4 : Whether it’s available or not (Stethoscope Paediatric - Functional)",
  },
  {
    field: "table1_8_LastUsed",
    headerName:
      "9.4 : Whether it’s available or not (Stethoscope Paediatric - When was it last used?)",
  },
  {
    field: "table1_9_Available",
    headerName:
      "9.4 : Whether it’s available or not (Endotracheal tubes Adult - Available)",
  },
  {
    field: "table1_9_Functional",
    headerName:
      "9.4 : Whether it’s available or not (Endotracheal tubes Adult - Functional)",
  },
  {
    field: "table1_9_LastUsed",
    headerName:
      "9.4 : Whether it’s available or not (Endotracheal tubes Adult - When was it last used?)",
  },
  {
    field: "table1_10_Available",
    headerName:
      "9.4 : Whether it’s available or not (Endotracheal tubes Paediatric - Available)",
  },
  {
    field: "table1_10_Functional",
    headerName:
      "9.4 : Whether it’s available or not (Endotracheal tubes Paediatric - Functional)",
  },
  {
    field: "table1_10_LastUsed",
    headerName:
      "9.4 : Whether it’s available or not (Endotracheal tubes Paediatric - When was it last used?)",
  },
  {
    field: "table1_11_Available",
    headerName:
      "9.4 : Whether it’s available or not (Laryngeal Mask Airways Paediatric - Available)",
  },
  {
    field: "table1_11_Functional",
    headerName:
      "9.4 : Whether it’s available or not (Laryngeal Mask Airways Paediatric - Functional)",
  },
  {
    field: "table1_11_LastUsed",
    headerName:
      "9.4 : Whether it’s available or not (Laryngeal Mask Airways Paediatric - When was it last used?)",
  },
  {
    field: "table1_12_Available",
    headerName:
      "9.4 : Whether it’s available or not (Laryngeal Mask Airways Adult - Available)",
  },
  {
    field: "table1_12_Functional",
    headerName:
      "9.4 : Whether it’s available or not (Laryngeal Mask Airways Adult - Functional)",
  },
  {
    field: "table1_12_LastUsed",
    headerName:
      "9.4 : Whether it’s available or not (Laryngeal Mask Airways Adult - When was it last used?)",
  },
  {
    field: "table1_13_Available",
    headerName:
      "9.4 : Whether it’s available or not (Nebulizer with nebulizer kit - Available)",
  },
  {
    field: "table1_13_Functional",
    headerName:
      "9.4 : Whether it’s available or not (Nebulizer with nebulizer kit - Functional)",
  },
  {
    field: "table1_13_LastUsed",
    headerName:
      "9.4 : Whether it’s available or not (Nebulizer with nebulizer kit - When was it last used?)",
  },
  {
    field: "table1_14_Available",
    headerName:
      "9.4 : Whether it’s available or not (Laryngoscope Set Adult - Available)",
  },
  {
    field: "table1_14_Functional",
    headerName:
      "9.4 : Whether it’s available or not (Laryngoscope Set Adult - Functional)",
  },
  {
    field: "table1_14_LastUsed",
    headerName:
      "9.4 : Whether it’s available or not (Laryngoscope Set Adult - When was it last used?)",
  },
  {
    field: "table1_15_Available",
    headerName:
      "9.4 : Whether it’s available or not (Laryngoscope Set Paediatric - Available)",
  },
  {
    field: "table1_15_Functional",
    headerName:
      "9.4 : Whether it’s available or not (Laryngoscope Set Paediatric - Functional)",
  },
  {
    field: "table1_15_LastUsed",
    headerName:
      "9.4 : Whether it’s available or not (Laryngoscope Set Paediatric - When was it last used?)",
  },
  {
    field: "table1_16_Available",
    headerName:
      "9.4 : Whether it’s available or not (Communication Device (eg mobile, Radio) - Available)",
  },
  {
    field: "table1_16_Functional",
    headerName:
      "9.4 : Whether it’s available or not (Communication Device (eg mobile, Radio) - Functional)",
  },
  {
    field: "table1_16_LastUsed",
    headerName:
      "9.4 : Whether it’s available or not (Communication Device (eg mobile, Radio) - When was it last used?)",
  },
  {
    field: "table1_17_Available",
    headerName:
      "9.4 : Whether it’s available or not (Syringe Infusion Pump - Available)",
  },
  {
    field: "table1_17_Functional",
    headerName:
      "9.4 : Whether it’s available or not (Syringe Infusion Pump - Functional)",
  },
  {
    field: "table1_17_LastUsed",
    headerName:
      "9.4 : Whether it’s available or not (Syringe Infusion Pump - When was it last used?)",
  },
  {
    field: "table1_18_Available",
    headerName:
      "9.4 : Whether it’s available or not (Transport Ventilators - Available)",
  },
  {
    field: "table1_18_Functional",
    headerName:
      "9.4 : Whether it’s available or not (Transport Ventilators - Functional)",
  },
  {
    field: "table1_18_LastUsed",
    headerName:
      "9.4 : Whether it’s available or not (Transport Ventilators - When was it last used?)",
  },
  {
    field: "table1_19_Available",
    headerName: "9.4 : Whether it’s available or not (GPS System - Available)",
  },
  {
    field: "table1_19_Functional",
    headerName: "9.4 : Whether it’s available or not (GPS System - Functional)",
  },
  {
    field: "table1_19_LastUsed",
    headerName:
      "9.4 : Whether it’s available or not (GPS System - When was it last used?)",
  },
  {
    field: "table2_0_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Adrenaline Ampoules - Available)",
  },
  {
    field: "table2_1_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Anti Snake Venom Vial - Available)",
  },
  {
    field: "table2_2_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Atropine Ampoules - Available)",
  },
  {
    field: "table2_3_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Buscopan / Hyoscine Ampoules - Available)",
  },
  {
    field: "table2_4_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Methylergonovine Inj - Available)",
  },
  {
    field: "table2_5_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Frusemide / Lasix Ampoules - Available)",
  },
  {
    field: "table2_6_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Hydrocort 2ml Vial - Available)",
  },
  {
    field: "table2_7_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Magnesium Sulfate Ampoules - Available)",
  },
  {
    field: "table2_8_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Midazolam Vial - Available)",
  },
  {
    field: "table2_9_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Mucain gel Syrup - Available)",
  },
  {
    field: "table2_10_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Ondansetron Zofer Ampoules - Available)",
  },
  {
    field: "table2_11_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Oxytocin Ampoules - Available)",
  },
  {
    field: "table2_12_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (ORS - Available)",
  },
  {
    field: "table2_13_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Glucose - Available)",
  },
  {
    field: "table2_14_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Paracetamol Ampoules - Available)",
  },
  {
    field: "table2_15_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Paracetamol Syrup - Available)",
  },
  {
    field: "table2_16_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Pheniramine Maleate / Avil Ampoules - Available)",
  },
  {
    field: "table2_17_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Ranitidine Ampoules - Available)",
  },
  {
    field: "table2_18_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Tablet Activated Charcoal / Powder - Available)",
  },
  {
    field: "table2_19_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Tablet Aspirin / Dispirin - Available)",
  },
  {
    field: "table2_20_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Tablet Clopidogrel (75mg) - Available)",
  },
  {
    field: "table2_21_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Tablet Isosorbide - Available)",
  },
  {
    field: "table2_22_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Asthalin Respule - Available)",
  },
  {
    field: "table2_23_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Budecort Repsule - Available)",
  },
  {
    field: "table2_24_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Duolin Respule - Available)",
  },
  {
    field: "table2_25_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Lignocaine / Xylocaine Gel - Available)",
  },
  {
    field: "table2_26_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Distil / Sterile Water - Available)",
  },
  {
    field: "table2_27_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Fluid Normal Saline (NS) 100 ml & 500 ml - Available)",
  },
  {
    field: "table2_28_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Betadine - Available)",
  },
  {
    field: "table2_29_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Dextrose 25% 100 ml - Available)",
  },
  {
    field: "table2_30_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Disposable Delivery Kit - Available)",
  },
  {
    field: "table2_31_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Disposable Hand Gloves - Available)",
  },
  {
    field: "table2_32_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Disposable Face Masks - Available)",
  },
  {
    field: "table2_33_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Cotton 500gm - Available)",
  },
  {
    field: "table2_34_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (IV Cannula 18G 20G 22G & 24G - Available)",
  },
  {
    field: "table2_35_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (All Syringes 3ml, 5ml & 10 ml - Available)",
  },
  {
    field: "table2_36_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (IV Sets – Macro - Available)",
  },
  {
    field: "table2_37_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (IV Sets – Micro - Available)",
  },
  {
    field: "table2_38_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Spirit - Available)",
  },
  {
    field: "table2_39_Available",
    headerName:
      "9.5 : Whether these Emergency Medications are available or not? (Betadine - Available)",
  },
  {
    field: "AMB18_0",
    headerName:
      "9.6 : Whether these Immobilizing equipment’s are available? (choice = Firm padding or commercial head immobilization device)",
  },
  {
    field: "AMB18_1",
    headerName:
      "9.6 : Whether these Immobilizing equipment’s are available? (choice = Lower extremity traction devices (supporting slings, padding, traction strap))",
  },
  {
    field: "AMB18_2",
    headerName:
      "9.6 : Whether these Immobilizing equipment’s are available? (choice = Upper and Lower extremity immobilization devices)",
  },
  {
    field: "AMB18_3",
    headerName:
      "9.6 : Whether these Immobilizing equipment’s are available? (choice = Joint above and joint below fracture immobilizing device)",
  },
  {
    field: "AMB18_4",
    headerName:
      "9.6 : Whether these Immobilizing equipment’s are available? (choice = Resistant straps or cravats)",
  },
  {
    field: "AMB18_5",
    headerName:
      "9.6 : Whether these Immobilizing equipment’s are available? (choice = Orthopaedic (scoop) stretcher/ Long back board)",
  },
  {
    field: "AMB18_6",
    headerName:
      "9.6 : Whether these Immobilizing equipment’s are available? (choice = Rigid cervical collars (small, medium, large)",
  },
  {
    field: "AMB19_0",
    headerName:
      "9.7 : What are the different types of registers/records/checklists maintained on the ambulance? (choice = Ambulance Cleaning Checklist)",
  },
  {
    field: "AMB19_1",
    headerName:
      "9.7 : What are the different types of registers/records/checklists maintained on the ambulance? (choice = Portable Oxygen Cylinder Pressure Monitoring Sheet)",
  },
  {
    field: "AMB19_2",
    headerName:
      "9.7 : What are the different types of registers/records/checklists maintained on the ambulance? (choice = In Ambulance Treatment Summary Form)",
  },
  {
    field: "AMB19_3",
    headerName:
      "9.7 : What are the different types of registers/records/checklists maintained on the ambulance? (choice = Emergency Injection Register)",
  },
  {
    field: "AMB19_4",
    headerName:
      "9.7 : What are the different types of registers/records/checklists maintained on the ambulance? (choice = Emergency Medicine Checklist)",
  },
  {
    field: "AMB19_5",
    headerName:
      "9.7 : What are the different types of registers/records/checklists maintained on the ambulance? (choice = AED Checklist)",
  },
  {
    field: "AMB19_6",
    headerName:
      "9.7 : What are the different types of registers/records/checklists maintained on the ambulance? (choice = Patient Register)",
  },
  {
    field: "AMB19_7",
    headerName:
      "9.7 : What are the different types of registers/records/checklists maintained on the ambulance? (choice = Other)",
    valueGetter: (params) =>
      params.data?.AMB19?.[7]?.length > 0 ? "Other" : "",
  },
  {
    field: "AMB19_7",
    headerName:
      "9.7 : What are the different types of registers/records/checklists maintained on the ambulance? (Other Specify)",
  },
];

const AmbulanceColumnsExport = generateColumns(columns);
const HFATAmbulanceColumnsExport = generateAMBColumns(columns);

export { AmbulanceColumnsExport, HFATAmbulanceColumnsExport };


