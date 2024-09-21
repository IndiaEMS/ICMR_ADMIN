import generateColumns from "./../generateColumns";
const columns = [
  {
    field: "_id",
    headerName: "Record ID",
    checkboxSelection: true,
    headerCheckboxSelection: true,
    width: 250,
  },
  { field: "H2A1", headerName: "2A.1 : Assessor's Name:" },
  {
    field: "date",
    headerName: "Date:",
    valueGetter: (params) => params.data?.HFAT2_DATE,
  },
  { field: "H2A2", headerName: "2A.2 : State:" },
  { field: "H2A3", headerName: "2A.3 : Block Name:" },
  { field: "H2A4", headerName: "2A.4 : Healthcare Facility Name" },
  { field: "H2A5", headerName: "2A.5 : Healthcare Facility Address" },
  { field: "H2A6", headerName: "2A.6 : Name of the MOIC" },
  { field: "H2A7", headerName: "2A.7 : Contact Number of MOIC" },
  { field: "H2A8", headerName: "2A.8 : Email ID:" },
  // { field: "H2A9_0", headerName: "2A.9 : GPS_1" },
  // { field: "H2A9_1", headerName: "2A.9 : GPS_2" },
  {
    headerName: "2A.9 : GPS",
    children: [
      { headerName: "latitude", field: "H2A9_latitude" },
      { headerName: "longitude", field: "H2A9_longitude" },
      { headerName: "district", field: "H2A9_district" },
      { headerName: "state", field: "H2A9_state" },
    ],
  },
  { field: "H2A10", headerName: "2A.10 : What type of CHC is this?" },
  { field: "H2A11", headerName: "2A.11 : Type of locality" },
  { field: "H2B1", headerName: "2B.1 Is the CHC 24/7?" },
  {
    field: "H2B2",
    headerName:
      "2B.2 How many beds are available for the in-patient department (IPD)?",
  },
  {
    field: "H2B3",
    headerName: "2B.3 Is there any dedicated bed present for emergency care?",
  },
  {
    field: "H2B4",
    headerName: "2B.4 How many beds are available for emergency care?",
  },
  {
    field: "H2B5",
    headerName:
      "2B.5 What is the average number of patients presenting to OPD per month?",
  },
  {
    field: "H2B6",
    headerName:
      "2B.6 What is the average daily number of patients presenting with emergency conditions daily? (Chest pain, stroke, acute weakness, acute blindness, Shortness of breath, altered mentation, snake bite, bites, road traffic accident, injuries ,poisoning, deliberate self-harm, infectious diseases, fever, pregnancy related, seizure, acute abdomen, anaphylaxis, cerebro-meningeal infections, foreign body, acute pulmonary disease, Shock, accidental injuries, infections)",
  },
  {
    headerName:
      "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible)",
    children: [
      {
        headerName: "Emergency Registration Counter",
        field: "H2B7_0",
      },
      {
        headerName: "Computerized Registration",
        field: "H2B7_1",
      },
      {
        headerName: "Triage Area",
        field: "H2B7_2",
      },
      {
        headerName: "Resuscitation Area",
        field: "H2B7_3",
      },
      {
        headerName: "Decontamination Facility",
        field: "H2B7_4",
      },
      {
        headerName: "Security Services",
        field: "H2B7_5",
      },
      {
        headerName: "Designated Parking Area for Ambulance",
        field: "H2B7_6",
      },
      {
        headerName: "Smooth Entry for Wheelchair Trolley and Stretcher Bay",
        field: "H2B7_7",
      },
      {
        headerName: "Waiting Area for patients & Attendants",
        field: "H2B7_8",
      },
      {
        headerName: "Plaster Room/Suturing Room/Minor OT",
        field: "H2B7_9",
      },
      {
        headerName: "Emergency OT",
        field: "H2B7_10",
      },
      {
        headerName: "Dedicated Isolation rooms",
        field: "H2B7_11",
      },
      {
        headerName: "Point of Care Lab",
        field: "H2B7_12",
      },
      {
        headerName: "Blood storage unit",
        field: "H2B7_13",
      },
      {
        headerName: "Point of care ultrasound",
        field: "H2B7_14",
      },
      {
        headerName: "Radiology service-X ray , Ultrasound",
        field: "H2B7_15",
      },
      {
        headerName: "Demarcated Duty Rooms for Doctors and Nurses",
        field: "H2B7_16",
      },
      {
        headerName: "Area to Keep Dead Bodies",
        field: "H2B7_17",
      },
      {
        headerName: "Tele-Medicine Facility",
        field: "H2B7_18",
      },
    ],
  },
  {
    headerName:
      "2B.8 Which of these signage or display boards of the emergency services and entitlements are available in its departments?",
    children: [
      {
        headerName:
          "Services Provided to the patients are clearly defined, displayed prominently.",
        field: "H2B8_0",
      },
      {
        headerName:
          "Name of doctor and nursing staff on duty are displayed and updated.",
        field: "H2B8_1",
      },
      {
        headerName: "List of available drugs are displayed.",
        field: "H2B8_2",
      },
      {
        headerName:
          "All the relevant information is displayed for the patients and visitors including user charges wherever applicable at the time of procedure/investigation/admission.",
        field: "H2B8_3",
      },
      {
        headerName:
          "Important contact numbers including ambulance, blood bank, police and referral centers displayed.",
        field: "H2B8_4",
      },
      {
        headerName: "Display of citizen's charter.",
        field: "H2B8_5",
      },
      {
        headerName: "Other",
        field: "H2B8_6",
        valueGetter: (params) =>
          params.data?.H2B8?.[6]?.length > 0 ? "Other" : "",
      },
      {
        headerName: "Other Specify",
        field: "H2B8_6",
      },
    ],
  },
  {
    field: "H2B9",
    headerName: "2B.9 Does the hospital provide ambulance services?",
  },
  {
    field: "H2B10",
    headerName:
      "2B.10 : If ambulances are not there, how are patients transferred?",
  },

  {
    headerName:
      "2C.1: Which of the following manpower is available at the CHC?",
    children: [
      {
        headerName: "Physician/Family Medicine Specialist",
        children: [
          { headerName: "Manpower", field: "table1_0_Manpower" },
          { headerName: "Number", field: "table1_0_Number" },
          {
            headerName: "availability 24 X 7",
            field: "table1_0_Availability",
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_0_OnSite",
          },
          {
            headerName: "onCallAvailability",
            field: "table1_0_OnCall",
          },
        ],
      },
      {
        headerName: "Surgeon",
        children: [
          { headerName: "Manpower", field: "table1_1_Manpower" },
          { headerName: "Number", field: "table1_1_Number" },
          {
            headerName: "availability 24 X 7",
            field: "table1_1_Availability",
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_1_OnSite",
          },
          {
            headerName: "onCallAvailability",
            field: "table1_1_OnCall",
          },
        ],
      },
      {
        headerName: "Obsterician & Gynecologist",
        children: [
          { headerName: "Manpower", field: "table1_2_Manpower" },
          { headerName: "Number", field: "table1_2_Number" },
          {
            headerName: "availability 24 X 7",
            field: "table1_2_Availability",
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_2_OnSite",
          },
          {
            headerName: "onCallAvailability",
            field: "table1_2_OnCall",
          },
        ],
      },
      {
        headerName: "Pediatrician",
        children: [
          { headerName: "Manpower", field: "table1_3_Manpower" },
          { headerName: "Number", field: "table1_3_Number" },
          {
            headerName: "availability 24 X 7",
            field: "table1_3_Availability",
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_3_OnSite",
          },
          {
            headerName: "onCallAvailability",
            field: "table1_3_OnCall",
          },
        ],
      },
      {
        headerName: "Anesthesiologist",
        children: [
          { headerName: "Manpower", field: "table1_4_Manpower" },
          { headerName: "Number", field: "table1_4_Number" },
          {
            headerName: "availability 24 X 7",
            field: "table1_4_Availability",
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_4_OnSite",
          },
          {
            headerName: "onCallAvailability",
            field: "table1_4_OnCall",
          },
        ],
      },
      {
        headerName: "Ophthalmologist",
        children: [
          { headerName: "Manpower", field: "table1_5_Manpower" },
          { headerName: "Number", field: "table1_5_Number" },
          {
            headerName: "availability 24 X 7",
            field: "table1_5_Availability",
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_5_OnSite",
          },
          {
            headerName: "onCallAvailability",
            field: "table1_5_OnCall",
          },
        ],
      },
      {
        headerName: "Orthopaedician",
        children: [
          { headerName: "Manpower", field: "table1_6_Manpower" },
          { headerName: "Number", field: "table1_6_Number" },
          {
            headerName: "availability 24 X 7",
            field: "table1_6_Availability",
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_6_OnSite",
          },
          {
            headerName: "onCallAvailability",
            field: "table1_6_OnCall",
          },
        ],
      },
      {
        headerName: "ENT",
        children: [
          { headerName: "Manpower", field: "table1_7_Manpower" },
          { headerName: "Number", field: "table1_7_Number" },
          {
            headerName: "availability 24 X 7",
            field: "table1_7_Availability",
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_7_OnSite",
          },
          {
            headerName: "onCallAvailability",
            field: "table1_7_OnCall",
          },
        ],
      },
      {
        headerName: "Microbiologist/Pathologist/Biochemist",
        children: [
          { headerName: "Manpower", field: "table1_8_Manpower" },
          { headerName: "Number", field: "table1_8_Number" },
          {
            headerName: "availability 24 X 7",
            field: "table1_8_Availability",
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_8_OnSite",
          },
          {
            headerName: "onCallAvailability",
            field: "table1_8_OnCall",
          },
        ],
      },
      {
        headerName: "GDMO",
        children: [
          { headerName: "Manpower", field: "table1_9_Manpower" },
          { headerName: "Number", field: "table1_9_Number" },
          {
            headerName: "availability 24 X 7",
            field: "table1_9_Availability",
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_9_OnSite",
          },
          {
            headerName: "onCallAvailability",
            field: "table1_9_OnCall",
          },
        ],
      },
      {
        headerName: "Nurses",
        children: [
          { headerName: "Manpower", field: "table1_10_Manpower" },
          { headerName: "Number", field: "table1_10_Number" },
          {
            headerName: "availability 24 X 7",
            field: "table1_10_Availability",
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_10_OnSite",
          },
          {
            headerName: "onCallAvailability",
            field: "table1_10_OnCall",
          },
        ],
      },
      {
        headerName: "Data entry operator",
        children: [
          { headerName: "Manpower", field: "table1_11_Manpower" },
          { headerName: "Number", field: "table1_11_Number" },
          {
            headerName: "availability 24 X 7",
            field: "table1_11_Availability",
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_11_OnSite",
          },
          {
            headerName: "onCallAvailability",
            field: "table1_11_OnCall",
          },
        ],
      },
      {
        headerName: "ECG technician",
        children: [
          { headerName: "Manpower", field: "table1_12_Manpower" },
          { headerName: "Number", field: "table1_12_Number" },
          {
            headerName: "availability 24 X 7",
            field: "table1_12_Availability",
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_12_OnSite",
          },
          {
            headerName: "onCallAvailability",
            field: "table1_12_OnCall",
          },
        ],
      },
      {
        headerName: "MLT",
        children: [
          { headerName: "Manpower", field: "table1_13_Manpower" },
          { headerName: "Number", field: "table1_13_Number" },
          {
            headerName: "availability 24 X 7",
            field: "table1_13_Availability",
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_13_OnSite",
          },
          {
            headerName: "onCallAvailability",
            field: "table1_13_OnCall",
          },
        ],
      },
      {
        headerName: "Pharmacist",
        children: [
          { headerName: "Manpower", field: "table1_14_Manpower" },
          { headerName: "Number", field: "table1_14_Number" },
          {
            headerName: "availability 24 X 7",
            field: "table1_14_Availability",
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_14_OnSite",
          },
          {
            headerName: "onCallAvailability",
            field: "table1_14_OnCall",
          },
        ],
      },
      {
        headerName: "Radiology technician",
        children: [
          { headerName: "Manpower", field: "table1_15_Manpower" },
          { headerName: "Number", field: "table1_15_Number" },
          {
            headerName: "availability 24 X 7",
            field: "table1_15_Availability",
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_15_OnSite",
          },
          {
            headerName: "onCallAvailability",
            field: "table1_15_OnCall",
          },
        ],
      },
      {
        headerName: "Other",
        children: [
          { headerName: "Manpower", field: "table1_16_Manpower" },
          {
            headerName: "Manpower (Other Specify)",
            field: "table1_16_Manpower_other_specify",
          },
          { headerName: "Number", field: "table1_16_Number" },
          {
            headerName: "availability 24 X 7",
            field: "table1_16_Availability",
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_16_OnSite",
          },
          {
            headerName: "onCallAvailability",
            field: "table1_16_OnCall",
          },
        ],
      },
    ],
  },

  {
    field: "H2C2",
    headerName:
      "2C.2 Whether training for emergency care management is being conducted for the staff in the institution?",
  },
  {
    headerName:
      "2C.3 Which of the following emergency care trainings you have undergone?",
    children: [
      {
        headerName: "Trauma & Accidental Injuries",
        field: "H2C3_0",
      },
      {
        headerName: "Burns",
        field: "H2C3_1",
      },
      {
        headerName:
          "Cardiac emergencies: acute chest pain, acute coronary syndrome (ACS)/ STEMI, Heart failure, Cardiac Arrest",
        field: "H2C3_2",
      },
      {
        headerName: "Stroke",
        field: "H2C3_3",
      },
      {
        headerName: "Acute Breathlessness",
        field: "H2C3_4",
      },
      {
        headerName: "Seizures",
        field: "H2C3_5",
      },
      {
        headerName: "Bites (Animal bite/snake bite/scorpion sting)",
        field: "H2C3_6",
      },
      {
        headerName: "Choking/foreign body ingestion",
        field: "H2C3_7",
      },
      {
        headerName: "Poisoning",
        field: "H2C3_8",
      },
      {
        headerName: "PPH",
        field: "H2C3_9",
      },
      {
        headerName: "Pre-Eclampsia",
        field: "H2C3_10",
      },
      {
        headerName: "Neonatal emergencies",
        field: "H2C3_11",
      },
      {
        headerName: "Other",
        field: "H2C3_12",
        valueGetter: (params) =>
          params.data?.H2C3?.[12]?.length > 0 ? "Other" : "",
      },
      {
        headerName: "Other Specify",
        field: "H2C3_12",
      },
    ],
  },
  {
    field: "H2C4",
    headerName: "2C.4  Frequency of training on emergency care in a year?",
    valueGetter: (params) => params.data?.H2C4?.split(":")[0],
  },
  {
    field: "H2C4_1",
    headerName:
    "2C.4  Frequency of training on emergency care in a year? (other specify)",
    valueGetter: (params) => params.data?.H2C4?.split(":")[1],
  },
  { field: "H2C5", headerName: "2C.5 When was the last training conducted?" },
  {
    headerName:
      "2D.1 : Which of the following emergency drugs are available at the CHC?",
    children: [
      {
        headerName: "Oxygen medicinal gas",
        field: "H2D1_0",
      },
      {
        headerName: "Atropine",
        field: "H2D1_1",
      },
      {
        headerName: "Diazepam/Lorazepam",
        field: "H2D1_2",
      },
      {
        headerName: "Adrenaline",
        field: "H2D1_3",
      },
      {
        headerName: "Charcoal activated",
        field: "H2D1_4",
      },
      {
        headerName: "Antisnake venom",
        field: "H2D1_5",
      },
      {
        headerName: "Pralidoxime (PAM)",
        field: "H2D1_6",
      },
      {
        headerName: "Magnesium sulphate",
        field: "H2D1_7",
      },
      {
        headerName: "Tetanus immunoglobulin",
        field: "H2D1_8",
      },
      {
        headerName: "Neostigmine",
        field: "H2D1_9",
      },
      {
        headerName: "Aspirin",
        field: "H2D1_10",
      },
      {
        headerName: "Clopidogrel",
        field: "H2D1_11",
      },
      {
        headerName: "Atorvastatin",
        field: "H2D1_12",
      },
      {
        headerName: "Misoprostol",
        field: "H2D1_13",
      },
      {
        headerName: "Labetalol IV",
        field: "H2D1_14",
      },
      {
        headerName: "Phenobarbitone",
        field: "H2D1_15",
      },
      {
        headerName: "Phenytoin (inj)",
        field: "H2D1_16",
      },
      {
        headerName: "Plasma volume expander",
        field: "H2D1_17",
      },
      {
        headerName: "3% Saline",
        field: "H2D1_18",
      },
      {
        headerName: "Dobutamine",
        field: "H2D1_19",
      },
      {
        headerName: "Streptokinase",
        field: "H2D1_20",
      },
      {
        headerName: "Tenecteplase",
        field: "H2D1_21",
      },
      {
        headerName: "Oxytocin",
        field: "H2D1_22",
      },
      {
        headerName: "Salbutamol sulphate",
        field: "H2D1_23",
      },
      {
        headerName: "Glucose/ 25 % dextrose",
        field: "H2D1_24",
      },
      {
        headerName: "Tranexamic acid",
        field: "H2D1_25",
      },
      {
        headerName: "tPA IV",
        field: "H2D1_26",
      },
      {
        headerName: "Methergine",
        field: "H2D1_27",
      },
      {
        headerName: "Carboprost",
        field: "H2D1_28",
      },
    ],
  },
  {
    headerName:
      "2D.2 : Which of the following emergency equipment is available at the CHC?",
    children: [
      {
        headerName: "Mobile bed for Resuscitation",
        field: "H2D2_0",
      },
      {
        headerName: "Crash Cart (specialized cart for resuscitation)",
        field: "H2D2_1",
      },
      {
        headerName: "Hard Cervical Collar",
        field: "H2D2_2",
      },
      {
        headerName: "Oxygen Cylinder/Central Oxygen Supply",
        field: "H2D2_3",
      },
      {
        headerName: "Suction Machine",
        field: "H2D2_4",
      },
      {
        headerName:
          "Multipara Monitor (To monitor Heart rate, BP, SPO2[Essential] ECG, Respiration Rate [Desirable] etc)",
        field: "H2D2_5",
      },
      {
        headerName: "Defibrillator with or without external pacer",
        field: "H2D2_6",
      },
      {
        headerName:
          "Toothed Forceps, Kocher Forceps, Magill's forceps, Artery forceps",
        field: "H2D2_7",
      },
      {
        headerName: "AMBU Bag for adult and Paediatric",
        field: "H2D2_8",
      },
      {
        headerName:
          "Basic airway equipment like oropharyngeal nasopharyngeal airway, LMA for adult and pediatric",
        field: "H2D2_9",
      },
      {
        headerName:
          "Advanced laryngoscope and endotracheal tube or other similar device",
        field: "H2D2_10",
      },
      {
        headerName: "Tourniquet",
        field: "H2D2_11",
      },
      {
        headerName: "Pelvic binder or bed sheets with clips",
        field: "H2D2_12",
      },
      {
        headerName: "Laryngoscope with all sized blades",
        field: "H2D2_13",
      },
      {
        headerName: "Endotracheal Tubes of all sizes",
        field: "H2D2_14",
      },
      {
        headerName: "Laryngeal Mask Airway (LMA)",
        field: "H2D2_15",
      },
      {
        headerName: "Chest Tubes with Water seal drain",
        field: "H2D2_16",
      },
      {
        headerName: "ECG Machine",
        field: "H2D2_17",
      },
      {
        headerName: "Nebulizer",
        field: "H2D2_18",
      },
      {
        headerName: "Fluid Warmer",
        field: "H2D2_19",
      },
      {
        headerName: "Infusion pump and Syringe Drivers",
        field: "H2D2_20",
      },
      {
        headerName: "Spine board with sling and scotch tapes",
        field: "H2D2_21",
      },
      {
        headerName: "Splints for all types of fracture",
        field: "H2D2_22",
      },
      {
        headerName: "Non-invasive Ventilators",
        field: "H2D2_23",
      },
      {
        headerName: "Invasive Ventilators",
        field: "H2D2_24",
      },
      {
        headerName: "Incubators",
        field: "H2D2_25",
      },
    ],
  },
  {
    headerName: "2E.1 : Numbers of Patients who Visited ED in Last One Month",
    children: [
      {
        headerName: "Adult (> 18Years)",
        field: "table2_0_Adult",
      },
      {
        headerName: "Pediatric",
        field: "table2_0_Pediatric",
      },
      {
        headerName: "Brought dead",
        field: "table2_0_Broughtdead",
      },
      {
        headerName: "Death after arrival",
        field: "table2_0_Deathafterarrival",
      },
      {
        headerName: "MLC",
        field: "table2_0_MLC",
      },
    ],
  },
  {
    headerName: "2E.2 : Numbers of Patients who Visited ED in Last One Month",
    children: [
      {
        headerName: "MI - Attended",
        field: "table3_0_Attended",
      },
      {
        headerName: "MI - Death",
        field: "table3_0_Death",
      },
      {
        headerName: "Stroke - Attended",
        field: "table3_1_Attended",
      },
      {
        headerName: "Stroke - Death",
        field: "table3_1_Death",
      },
      {
        headerName: "Trauma & Burns - Attended",
        field: "table3_2_Attended",
      },
      {
        headerName: "Trauma & Burns - Death",
        field: "table3_2_Death",
      },
      {
        headerName: "Poisoning - Attended",
        field: "table3_3_Attended",
      },
      {
        headerName: "Poisoning - Death",
        field: "table3_3_Death",
      },
      {
        headerName: "Snake Bite - Attended",
        field: "table3_4_Attended",
      },
      {
        headerName: "Snake Bite - Death",
        field: "table3_4_Death",
      },
      {
        headerName: "Maternal Emergencies-PPH - Attended",
        field: "table3_5_Attended",
      },
      {
        headerName: "Maternal Emergencies-PPH - Death",
        field: "table3_5_Death",
      },
      {
        headerName: "Maternal Emergencies-Eclampsia - Attended",
        field: "table3_6_Attended",
      },
      {
        headerName: "Maternal Emergencies-Eclampsia - Death",
        field: "table3_6_Death",
      },
      {
        headerName: "Neontal Emergencies - Attended",
        field: "table3_7_Attended",
      },
      {
        headerName: "Neontal Emergencies - Death",
        field: "table3_7_Death",
      },
      {
        headerName: "Acute Respiratory Illness - Attended",
        field: "table3_8_Attended",
      },
      {
        headerName: "Acute Respiratory Illness - Death",
        field: "table3_8_Death",
      },
    ],
  },
  {
    headerName: "2E.3 Emergency Services Delivered at CHC",
    children: [
      {
        field: "H2E3_0",
        headerName: "Triage",
      },
      {
        field: "H2E3_1",
        headerName: "Resuscitation",
      },
      {
        field: "H2E3_2",
        headerName: "Medico-legal Reporting",
      },
    ],
  },
  {
    field: "H2F1",
    headerName:
      "2F.1 Does the facility have a Hospital Management Information System (HMIS)",
  },
  {
    field: "H2F2",
    headerName:
      "2F.2 Does this facility do complete reporting of indicators on emergency care in HMIS?",
  },
  {
    field: "H2F3",
    headerName:
      "2F.3 How many personnel available for managing information system?",
  },
  {
    headerName:
      "2F.4 Key Indicators from Emergency Management Information System",
    children: [
      {
        field: "H2F4_0",
        headerName: "Numbers by type of emergencies",
      },
      {
        field: "H2F4_1",
        headerName: "Length of hospital stay",
      },
      {
        field: "H2F4_2",
        headerName: "Turn around time",
      },
      {
        field: "H2F4_3",
        headerName: "Disposal time",
      },
      {
        field: "H2F4_4",
        headerName: "Number of deaths",
      },
      {
        field: "H2F4_5",
        headerName: "Number of Referrals",
      },
    ],
  },
  {
    field: "H2F5",
    headerName:
      "2F.5 Whether time bound management of common emergencies is captured in MIS.",
  },
  {
    headerName: "2F.6 Alert Systems at Facility",
    children: [
      {
        field: "H2F6_0",
        headerName: "Code blue alert system",
      },
      {
        field: "H2F6_1",
        headerName: "STEMI alert system",
      },
      {
        field: "H2F6_2",
        headerName: "Stroke alert system",
      },
      {
        field: "H2F6_3",
        headerName: "Trauma alert system",
      },
    ],
  },
  {
    field: "H2F7",
    headerName:
      "2F.7 Whether Medical Officer In charge (MO/IC) uses or reviews the data for quality improvement",
  },
  {
    field: "H2F8",
    headerName:
      "2F.8 Do you get Pre-Hospital Notification during an emergency?",
    valueGetter: (params) => params.data?.H2F8?.split("_")?.[0],
  },
  {
    field: "H2F8_1",
    headerName:
      "2F.8 Do you get Pre-Hospital Notification during an emergency?(if yes, How often per week)",
    valueGetter: (params) => params.data?.H2F8?.split("_")?.[1],
  },
  {
    field: "H2F9",
    headerName: "2F.9 Infrastructure for receiving external communication?",
  },
  {
    field: "H2G1",
    headerName: "2G.1 Whether any untied fund is available at your hospital?",
  },
  {
    field: "H2G2",
    headerName:
      "2G.2 If Yes, whether this fund is utilized for providing emergency care services?",
  },
  {
    field: "H2G3",
    headerName: "2G.3 Whether any fund is available for emergency care?",
  },
  {
    headerName: "2G.4 Health Protection Schemes Covering Emergency Care System",
    children: [
      {
        field: "H2G4",
        headerName: "PMJAY",
        valueGetter: (params) => (params.data?.H2G4 == "PMJAY" ? "PMJAY" : ""),
      },
      {
        field: "H2G4_1",
        headerName: "RKS",
        valueGetter: (params) => (params.data?.H2G4 == "RKS" ? "RKS" : ""),
      },
      {
        field: "H2G4_2",
        headerName: "Other",
        valueGetter: (params) =>
          params.data?.H2G4?.split("_")?.[1]?.length > 0 ? "Other" : "",
      },
      {
        field: "H2G4_3",
        headerName: "Other specify",
        valueGetter: (params) => params.data?.H2G4?.split("_")?.[1],
      },
    ],
  },
  {
    field: "H2G5",
    headerName:
      "2G.5 Out of total patients being provided emergency care, how many were provided services under PMJAY scheme/ any other insurance scheme.",
  },
  {
    field: "H2G6",
    headerName:
      "2G.6 Is the facility providing free emergency services to pregnant women, mothers, and neonates as per prevalent government schemes?",
  },
  {
    field: "H2H1",
    headerName: "2H.1.1 Do you have any disaster management plans?",
  },
  { field: "H2H2", headerName: "2H.1.2 Do you have a redistribution plan?" },
  { field: "H2H3", headerName: "2H.1.3 Do you have any evacuation plan?" },
  {
    field: "H2H4_0",
    headerName: "2H.2.1 Do you have a Quality Improvement Committee?",
    valueGetter: (params) => params.data?.H2H4?.split(":")?.[0],
  },
  {
    field: "H2H4_1",
    headerName:
      "2H.2.1 Do you have a Quality Improvement Committee? (if yes, collect detail of Committee)",
    valueGetter: (params) => params.data?.H2H4?.split(":")?.[1],
  },
  {
    field: "H2H5",
    headerName: "2H.2.2 How frequently does this committee meet in a year?",
  },
  {
    field: "H2H6",
    headerName:
      "2H.2.3 Do you have regular audits related to emergency care in this facility?",
  },
  {
    field: "H2H7",
    headerName:
      "2H.2.4 How frequently emergency care audits are conducted in a year?",
  },
  {
    headerName: "2H.2.5 Types of Audits Conducted",
    children: [
      {
        field: "H2H8_0",
        headerName: "Mortality Audit",
      },
      {
        field: "H2H8_1",
        headerName: "Morbidity Audit",
      },
      {
        field: "H2H8_2",
        headerName: "Other",
      },
      {
        field: "H2H8_3",
        headerName: "Other Specify",
      },
    ],
  },
  {
    field: "H2H9",
    headerName:
      "2H.2.6 Any action being taken on Audit report in the last one year?",
  },
  {
    headerName:
      "2I.1 What types of registers are maintained at the CHC? (Multiple answers possible)",
    children: [
      {
        field: "H2I1_0",
        headerName: "OPD/Treatment Register",
      },
      {
        field: "H2I1_1",
        headerName: "Inventory Register",
      },
      {
        field: "H2I1_2",
        headerName: "Procedure Register",
      },
      {
        field: "H2I1_3",
        headerName: "Referral Register",
      },
      {
        field: "H2I1_4",
        headerName:
          "Record for handing over and taking over of critical care equipment",
      },
      {
        field: "H2I1_5",
        headerName: "Medico-legal register",
      },
      {
        field: "H2I1_6",
        headerName: "Death Register",
      },
      {
        field: "H2I1_7",
        headerName: "Patient/Community feedback register",
      },
      {
        field: "H2I1_8",
        headerName: "Other",
        valueGetter: (params) =>
          params.data?.H2I1?.[8]?.length > 0 ? "Other" : "",
      },
      {
        field: "H2I1_8",
        headerName: "Other Specify",
      },
    ],
  },
  {
    headerName:
      "2I.2 Which of the following SOPs for the management of common medical emergencies are followed at your CHC? (Select all that apply)",
    children: [
      {
        field: "H2I2_0",
        headerName: "Documents triage guidelines and protocols",
      },
      {
        field: "H2I2_1",
        headerName: "Standard treatment protocols for emergencies",
      },
      {
        field: "H2I2_2",
        headerName: "Transfer policies and procedures",
      },
      {
        field: "H2I2_3",
        headerName: "Disaster Management Plan",
      },
      {
        field: "H2I2_4",
        headerName: "Policies for handling cases of death",
      },
    ],
  },
  {
    headerName:
      "2I.3 Whether having Emergency condition specific SOP/STW for emergency care?",
    children: [
      {
        headerName: "MI",
        children: [
          {
            field: "table4_0_SOP",
            headerName: "SOP/STW",
          },
          {
            field: "table4_0_FollowsSOP",
            headerName: "Follows SOP",
          },
        ],
      },
      {
        headerName: "Stroke",
        children: [
          {
            field: "table4_1_SOP",
            headerName: "SOP/STW",
          },
          {
            field: "table4_1_FollowsSOP",
            headerName: "Follows SOP",
          },
        ],
      },
      {
        headerName: "Trauma & Burns",
        children: [
          {
            field: "table4_2_SOP",
            headerName: "SOP/STW",
          },
          {
            field: "table4_2_FollowsSOP",
            headerName: "Follows SOP",
          },
        ],
      },
      {
        headerName: "Poisoning",
        children: [
          {
            field: "table4_3_SOP",
            headerName: "SOP/STW",
          },
          {
            field: "table4_3_FollowsSOP",
            headerName: "Follows SOP",
          },
        ],
      },
      {
        headerName: "Snake Bites",
        children: [
          {
            field: "table4_4_SOP",
            headerName: "SOP/STW",
          },
          {
            field: "table4_4_FollowsSOP",
            headerName: "Follows SOP",
          },
        ],
      },

      {
        headerName: "Maternal Emergencies-PPH",
        children: [
          {
            field: "table4_5_SOP",
            headerName: "SOP/STW",
          },
          {
            field: "table4_5_FollowsSOP",
            headerName: "Follows SOP",
          },
        ],
      },
      {
        headerName: "Maternal Emergencies-Eclampsia",
        children: [
          {
            field: "table4_6_SOP",
            headerName: "SOP/STW",
          },
          {
            field: "table4_6_FollowsSOP",
            headerName: "Follows SOP",
          },
        ],
      },
      {
        headerName: "Neonatal Emergencies",
        children: [
          {
            field: "table4_7_SOP",
            headerName: "SOP/STW",
          },
          {
            field: "table4_7_FollowsSOP",
            headerName: "Follows SOP",
          },
        ],
      },
      {
        headerName: "Acute Respiratory Illness",
        children: [
          {
            field: "table4_8_SOP",
            headerName: "SOP/STW",
          },
          {
            field: "table4_8_FollowsSOP",
            headerName: "Follows SOP",
          },
        ],
      },
    ],
  },
  {
    field: "H2I4",
    headerName:
      "2I.4 Does the facility have defined and established procedure for informing patients about their medical condition, involving them in treatment planning and facilitating informed decision making?",
  },
  {
    field: "H2J1",
    headerName:
      "2J.1 Does this facility have any policies and procedures which guide the transfer- out/referral of stable and unstable patients after stabilization to another facility with documentation?",
  },
  {
    field: "H2J2",
    headerName:
      "2J.2 Dose this facility have any policies and procedures which guide the transferout/referral of stable and unstable with documentation?",
  },
];
export const HFAT2Columns = generateColumns(columns);
