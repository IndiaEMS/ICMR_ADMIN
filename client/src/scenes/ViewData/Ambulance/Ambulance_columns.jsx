import generateColumns from "../generateColumns";
import generateAMBColumns from "../generateAMBColumns";

export const columns = [
  {
    field: "AMBid",
    headerName: "Record ID",
    checkboxSelection: true,
    headerCheckboxSelection: false,
    width: 250,
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
  { field: "AMB1", headerName: "State " },
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
    headerName: "8. Staff on duty per ambulance",
    children: [
      {
        field: "AMB12_0",
        headerName: "Driver",
      },
      {
        field: "AMB12_1",
        headerName: "Doctor",
      },
      {
        field: "AMB12_2",
        headerName: "Emergency Medical Technicians",
      },
      {
        field: "AMB12_3",
        headerName: "Nurse",
      },
      // {
      //   field: "AMB12_4",
      //   headerName: "Other",
      //   valueGetter: (params) => params.data?.AMB12?.[4]?.length > 0 ? "Other" : "",
      // },
      // {
      //   field: "AMB12_4",
      //   headerName: "Other Specify",
      // },
    ],
  },
  {
    field: "AMB13",
    headerName: "9.1.Which Suction apparatus and accessories is available",
  },
  // {
  //   field: "AMB13_0",
  //   headerName:
  //     "9.1.Which Suction apparatus and accessories is available (choice=Portable or Mounted Suction Machine)",
  // },
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
    headerName: "9.2. Which type of Portable oxygen equipment/installed",
  },
  // {
  //   field: "AMB14_0",
  //   headerName:
  //     "9.2. Which type of Portable oxygen equipment/installed (choice=Portable oxygen tank with regulator)",
  // },
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
    headerName: "9.4. Whether it’s available or not",
    children: [
      {
        headerName: "Monitor",
        children: [
          { field: "table1_0_Available", headerName: "Available" },
          { field: "table1_0_Functional", headerName: "Functional" },
          { field: "table1_0_LastUsed", headerName: "When was it last used?" },
        ],
      },
      {
        headerName: "ECG Machine",
        children: [
          { field: "table1_1_Available", headerName: "Available" },
          { field: "table1_1_Functional", headerName: "Functional" },
          { field: "table1_1_LastUsed", headerName: "When was it last used?" },
        ],
      },
      {
        headerName: "Pulse Oxymeter",
        children: [
          { field: "table1_2_Available", headerName: "Available" },
          { field: "table1_2_Functional", headerName: "Functional" },
          { field: "table1_2_LastUsed", headerName: "When was it last used?" },
        ],
      },
      {
        headerName: "Glucometer",
        children: [
          { field: "table1_3_Available", headerName: "Available" },
          { field: "table1_3_Functional", headerName: "Functional" },
          { field: "table1_3_LastUsed", headerName: "When was it last used?" },
        ],
      },
      {
        headerName: "Defibrillator",
        children: [
          { field: "table1_4_Available", headerName: "Available" },
          { field: "table1_4_Functional", headerName: "Functional" },
          { field: "table1_4_LastUsed", headerName: "When was it last used?" },
        ],
      },
      {
        headerName: "Defibrillator pads - disposable",
        children: [
          { field: "table1_5_Available", headerName: "Available" },
          { field: "table1_5_Functional", headerName: "Functional" },
          { field: "table1_5_LastUsed", headerName: "When was it last used?" },
        ],
      },
      {
        headerName:
          "Sphygmomanometer, Non-mercurial- Paediatric cuff- Adult cuff",
        children: [
          { field: "table1_6_Available", headerName: "Available" },
          { field: "table1_6_Functional", headerName: "Functional" },
          { field: "table1_6_LastUsed", headerName: "When was it last used?" },
        ],
      },
      {
        headerName: "Stethoscope (Adult)",
        children: [
          { field: "table1_7_Available", headerName: "Available" },
          { field: "table1_7_Functional", headerName: "Functional" },
          { field: "table1_7_LastUsed", headerName: "When was it last used?" },
        ],
      },
      {
        headerName: "Stethoscope (Paediatric)",
        children: [
          { field: "table1_8_Available", headerName: "Available" },
          { field: "table1_8_Functional", headerName: "Functional" },
          { field: "table1_8_LastUsed", headerName: "When was it last used?" },
        ],
      },
      {
        headerName: "Endotracheal tubes (Adult)",
        children: [
          { field: "table1_9_Available", headerName: "Available" },
          { field: "table1_9_Functional", headerName: "Functional" },
          { field: "table1_9_LastUsed", headerName: "When was it last used?" },
        ],
      },
      {
        headerName: "Endotracheal tubes (Paediatric)",
        children: [
          { field: "table1_10_Available", headerName: "Available" },
          { field: "table1_10_Functional", headerName: "Functional" },
          { field: "table1_10_LastUsed", headerName: "When was it last used?" },
        ],
      },
      {
        headerName: "Laryngeal Mask Airway (Paediatric)",
        children: [
          { field: "table1_11_Available", headerName: "Available" },
          { field: "table1_11_Functional", headerName: "Functional" },
          { field: "table1_11_LastUsed", headerName: "When was it last used?" },
        ],
      },
      {
        headerName: "Laryngeal Mask Airways(Adult)",
        children: [
          { field: "table1_12_Available", headerName: "Available" },
          { field: "table1_12_Functional", headerName: "Functional" },
          { field: "table1_12_LastUsed", headerName: "When was it last used?" },
        ],
      },
      {
        headerName: "Nebulizer with nebulizer kit",
        children: [
          { field: "table1_13_Available", headerName: "Available" },
          { field: "table1_13_Functional", headerName: "Functional" },
          { field: "table1_13_LastUsed", headerName: "When was it last used?" },
        ],
      },
      {
        headerName: "Laryngoscope Set (Adult)",
        children: [
          { field: "table1_14_Available", headerName: "Available" },
          { field: "table1_14_Functional", headerName: "Functional" },
          { field: "table1_14_LastUsed", headerName: "When was it last used?" },
        ],
      },
      {
        headerName: "Laryngoscope Set (Paediatric)",
        children: [
          { field: "table1_15_Available", headerName: "Available" },
          { field: "table1_15_Functional", headerName: "Functional" },
          { field: "table1_15_LastUsed", headerName: "When was it last used?" },
        ],
      },
      {
        headerName: "Communication Device (eg. mobile, Radio)",
        children: [
          { field: "table1_16_Available", headerName: "Available" },
          { field: "table1_16_Functional", headerName: "Functional" },
          { field: "table1_16_LastUsed", headerName: "When was it last used?" },
        ],
      },
      {
        headerName: "Syringe Infusion Pump",
        children: [
          { field: "table1_17_Available", headerName: "Available" },
          { field: "table1_17_Functional", headerName: "Functional" },
          { field: "table1_17_LastUsed", headerName: "When was it last used?" },
        ],
      },
      {
        headerName: "Transport Ventilators",
        children: [
          { field: "table1_18_Available", headerName: "Available" },
          { field: "table1_18_Functional", headerName: "Functional" },
          { field: "table1_18_LastUsed", headerName: "When was it last used?" },
        ],
      },
      {
        headerName: "GPS System",
        children: [
          { field: "table1_19_Available", headerName: "Available" },
          { field: "table1_19_Functional", headerName: "Functional" },
          { field: "table1_19_LastUsed", headerName: "When was it last used?" },
        ],
      },
      // {
      //   headerName: "GPS System",
      //   children: [
      //     { field: "table1_20_Available", headerName: "Available" },
      //     { field: "table1_20_Functional", headerName: "Functional" },
      //     { field: "table1_20_LastUsed", headerName: "When was it last used?" },
      //   ],
      // },
    ],
  },

  {
    headerName:
      "9.5 : Whether these Emergency Medications are available or not?",
    children: [
      {
        field: "table2_0_Available",
        headerName: "Adrenaline Ampoules - Available",
      },
      {
        field: "table2_1_Available",
        headerName: "Anti Snake Venom Vial - Available",
      },
      {
        field: "table2_2_Available",
        headerName: "Atropine Ampoules - Available",
      },
      {
        field: "table2_3_Available",
        headerName: "Buscopan / Hyoscine Ampoules - Available",
      },
      {
        field: "table2_4_Available",
        headerName: "Methylergonovine Inj - Available",
      },
      {
        field: "table2_5_Available",
        headerName: "Frusemide / Lasix Ampoules - Available",
      },
      {
        field: "table2_6_Available",
        headerName: "Hydrocort 2ml Vial - Available",
      },
      {
        field: "table2_7_Available",
        headerName: "Magnesium Sulfate Ampoules - Available",
      },
      { field: "table2_8_Available", headerName: "Midazolam Vial - Available" },
      {
        field: "table2_9_Available",
        headerName: "Mucain gel Syrup - Available",
      },
      {
        field: "table2_10_Available",
        headerName: "Ondansetron Zofer Ampoules - Available",
      },
      {
        field: "table2_11_Available",
        headerName: "Oxytocin Ampoules - Available",
      },
      { field: "table2_12_Available", headerName: "ORS - Available" },
      { field: "table2_13_Available", headerName: "Glucose - Available" },
      {
        field: "table2_14_Available",
        headerName: "Paracetamol Ampoules - Available",
      },
      {
        field: "table2_15_Available",
        headerName: "Paracetamol Syrup - Available",
      },
      {
        field: "table2_16_Available",
        headerName: "Pheniramine Maleate / Avil Ampoules - Available",
      },
      {
        field: "table2_17_Available",
        headerName: "Ranitidine Ampoules - Available",
      },
      {
        field: "table2_18_Available",
        headerName: "Tablet Activated Charcoal / Powder - Available",
      },
      {
        field: "table2_19_Available",
        headerName: "Tablet Aspirin / Dispirin - Available",
      },
      {
        field: "table2_20_Available",
        headerName: "Tablet Clopidogrel (75mg) - Available",
      },
      {
        field: "table2_21_Available",
        headerName: "Tablet Isosorbide - Available",
      },
      {
        field: "table2_22_Available",
        headerName: "Asthalin Respule - Available",
      },
      {
        field: "table2_23_Available",
        headerName: "Budecort Repsule - Available",
      },
      {
        field: "table2_24_Available",
        headerName: "Duolin Respule - Available",
      },
      {
        field: "table2_25_Available",
        headerName: "Lignocaine / Xylocaine Gel - Available",
      },
      {
        field: "table2_26_Available",
        headerName: "Distil / Sterile Water - Available",
      },
      {
        field: "table2_27_Available",
        headerName: "Fluid Normal Saline (NS) 100 ml & 500 ml - Available",
      },
      { field: "table2_28_Available", headerName: "Betadine - Available" },
      {
        field: "table2_29_Available",
        headerName: "Dextrose 25% 100 ml - Available",
      },
      {
        field: "table2_30_Available",
        headerName: "Disposable Delivery Kit - Available",
      },
      {
        field: "table2_31_Available",
        headerName: "Disposable Hand Gloves - Available",
      },
      {
        field: "table2_32_Available",
        headerName: "Disposable Face Masks - Available",
      },
      { field: "table2_33_Available", headerName: "Cotton 500gm - Available" },
      {
        field: "table2_34_Available",
        headerName: "IV Cannula 18G 20G 22G & 24G - Available",
      },
      {
        field: "table2_35_Available",
        headerName: "All Syringes 3ml, 5ml & 10 ml - Available",
      },
      {
        field: "table2_36_Available",
        headerName: "IV Sets – Macro - Available",
      },
      {
        field: "table2_37_Available",
        headerName: "IV Sets – Micro - Available",
      },
      { field: "table2_38_Available", headerName: "Spirit - Available" },
      { field: "table2_39_Available", headerName: "Betadine - Available" },
    ],
  },

  {
    headerName: "9.6 : Whether these Immobilizing equipment’s are available?",
    children: [
      {
        headerName: "Firm padding or commercial head immobilization device",
        field: "AMB18_0",
        // children: [
        //   { field: "AMB18_0", headerName: "Available" },
        //   { field: "AMB18_0", headerName: "Functional" },
        //   { field: "AMB18_0", headerName: "Last Used" },
        // ],
      },
      {
        headerName:
          "Lower extremity traction devices (supporting slings, padding, traction strap)",
        field: "AMB18_1",
        // children: [
        //   { field: "AMB18_1", headerName: "Available" },
        //   { field: "AMB18_1", headerName: "Functional" },
        //   { field: "AMB18_1", headerName: "Last Used" },
        // ],
      },
      {
        headerName: "Upper and Lower extremity immobilization devices",
        field: "AMB18_2",
        // children: [
        //   { field: "AMB18_2", headerName: "Available" },
        //   { field: "AMB18_2", headerName: "Functional" },
        //   { field: "AMB18_2", headerName: "Last Used" },
        // ],
      },
      {
        headerName: "Joint above and joint below fracture immobilizing device",
        field: "AMB18_3",
        // children: [
        //   { field: "AMB18_3", headerName: "Available" },
        //   { field: "AMB18_3", headerName: "Functional" },
        //   { field: "AMB18_3", headerName: "Last Used" },
        // ],
      },
      {
        headerName: "Resistant straps or cravats",
        field: "AMB18_4",
        // children: [
        //   { field: "AMB18_4", headerName: "Available" },
        //   { field: "AMB18_4", headerName: "Functional" },
        //   { field: "AMB18_4", headerName: "Last Used" },
        // ],
      },
      {
        headerName: "Orthopaedic (scoop) stretcher/ Long back board",
        field: "AMB18_5",
        // children: [
        //   { field: "AMB18_5", headerName: "Available" },
        //   { field: "AMB18_5", headerName: "Functional" },
        //   { field: "AMB18_5", headerName: "Last Used" },
        // ],
      },
      {
        headerName: "Rigid cervical collars (small, medium, large)",
        field: "AMB18_6",
        // children: [
        //   { field: "AMB18_6", headerName: "Available" },
        //   { field: "AMB18_6", headerName: "Functional" },
        //   { field: "AMB18_6", headerName: "Last Used" },
        // ],
      },
    ],
  },

  {
    headerName:
      "9.7 : What are the different types of registers/records/checklists maintained on the ambulance?",
    children: [
      { field: "AMB19_0", headerName: "Ambulance Cleaning Checklist" },
      {
        field: "AMB19_1",
        headerName: "Portable Oxygen Cylinder Pressure Monitoring Sheet",
      },
      { field: "AMB19_2", headerName: "In Ambulance Treatment Summary Form" },
      { field: "AMB19_3", headerName: "Emergency Injection Register" },
      { field: "AMB19_4", headerName: "Emergency Medicine Checklist" },
      { field: "AMB19_5", headerName: "AED Checklist" },
      { field: "AMB19_6", headerName: "Patient Register" },
      {
        field: "AMB19_7",
        headerName: "Other",
        valueGetter: (params) =>
          params.data?.AMB19?.[7]?.length > 0 ? "Other" : "",
      },
      { field: "AMB19_7", headerName: "Other Specify" },
    ],
  },
];

const AmbulanceColumns = generateColumns(columns);
const HFATAmbulanceColumns = generateAMBColumns(columns);

export { AmbulanceColumns, HFATAmbulanceColumns };
