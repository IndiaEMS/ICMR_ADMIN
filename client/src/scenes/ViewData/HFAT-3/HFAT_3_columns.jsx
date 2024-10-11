import generateColumns from "../generateColumns";

const columns = [
  {
    field: "_id",
    headerName: "Record ID",
    checkboxSelection: true,
    headerCheckboxSelection: false,
  },
  { field: "H3A1", headerName: "3A.1 Assessor's Name:" },
  {
    field: "date",
    headerName: "Date:",
    valueGetter: (params) => params.data?.HFAT3_DATE,
  },
  { field: "H3A2", headerName: "3A.2 State:" },
  { field: "H3A3", headerName: "3A.3 Block Name:" },
  { field: "H3A4", headerName: "3A.4 Healthcare Facility Name" },
  { field: "H3A5", headerName: "3A.5 Healthcare Facility Address" },
  { field: "H3A6", headerName: "3A.6 Name of the Medical Officer" },
  { field: "H3A7", headerName: "3A.7 Contact Number of the Medical Officer:" },
  { field: "H3A8", headerName: "3A.8 Email ID:" },
  // { field: "H3A9_0", headerName: "3A.9 GPS Coordinates:" },
  // { field: "H3A9_1", headerName: "3A.9 GPS Coordinates" },
  {
    headerName: "3A.9 : GPS",
    children: [
      { headerName: "latitude", field: "H3A9_latitude" },
      { headerName: "longitude", field: "H3A9_longitude" },
      { headerName: "district", field: "H3A9_district" },
      { headerName: "state", field: "H3A9_state" },
    ],
  },
  {
    field: "H3A10",
    headerName: "3A.10 What type of Health Care Facility is this?",
  },
  { field: "H3A11", headerName: "3A.11 This facility is coming under:" },
  { field: "H3B1", headerName: "3B.1 Is the PHC 24/7?" },
  {
    field: "H3B2",
    headerName: "3B.2 How many observation beds are available in the PHC?",
  },
  {
    field: "H3B3",
    headerName: "3B.3 Are dedicated beds available for emergency care?",
  },
  {
    field: "H3B4",
    headerName: "3B.4 How many beds are earmarked for emergency care?",
  },
  {
    field: "H3B5",
    headerName:
      "3B.5 What is the average number of patients presenting to OPD in a day/ everyday?",
  },
  {
    field: "H3B6",
    headerName:
      "3B.6 What is the average daily number of patients presenting with emergency conditions? (Chest pain, stroke, acute weakness, acute blindness, Shortness of breath, altered mentation, snake bite, bites, road traffic accident, injuries ,poisoning, deliberate self-harm, infectious diseases, fever, pregnancy related, seizure, acute abdomen, anaphylaxis, cerebro-meningeal infections, foreign body, acute pulmonary disease, Shock, accidental injuries, infections)",
  },
  {
    headerName:
      "3B.7 Which of the following infrastructure requirements for emergency are available at the PHC? (Multiple answers possible)",
    children: [
      { field: "H3B7_0", headerName: "Emergency Registration Counter" },
      { field: "H3B7_1", headerName: "Waiting Area for patients/attendants" },
      { field: "H3B7_2", headerName: "Plaster Room/Suturing Room/Minor OT" },
      { field: "H3B7_3", headerName: "Point of Care Lab" },
      { field: "H3B7_4", headerName: "Area to Keep Dead Bodies" },
      {
        field: "H3B7_5",
        headerName: "Demarcate Duty Rooms for Doctors and Nurses",
      },
      { field: "H3B7_6", headerName: "Computerized Registration" },
      { field: "H3B7_7", headerName: "Triage Area" },
      { field: "H3B7_8", headerName: "Resuscitation Area" },
      { field: "H3B7_9", headerName: "Decontamination Facility" },
      { field: "H3B7_10", headerName: "Security Services" },
      { field: "H3B7_11", headerName: "Designated Parking Area for Ambulance" },
      {
        field: "H3B7_12",
        headerName: "Smooth Entry for Wheelchair Trolley and Stretcher Bay",
      },
      {
        field: "H3B7_13",
        headerName: "IT infrastructure for providing teleconsultation services",
      },
      {
        field: "H3B7_14",
        headerName:
          "There is the provision of adequate illumination at the entrance & access road to PHC especially at night.",
      },
      {
        field: "H3B7_15",
        headerName: "Availability of Wheelchair or stretcher for easy Access",
      },
      {
        field: "H3B7_16",
        headerName: "Ward is easily accessible from the OPD",
      },
    ],
  },

  {
    headerName:
      "3B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments?",
    children: [
      {
        field: "H3B8_0",
        headerName: "Services Provided Clearly Defined and Displayed",
      },
      {
        field: "H3B8_1",
        headerName:
          "The name of the facility is prominently displayed in front of the hospital building",
      },
      { field: "H3B8_2", headerName: "Display of citizens charter" },
      {
        field: "H3B8_3",
        headerName: "Direction to PHC is displayed from the Access Road.",
      },
      {
        field: "H3B8_4",
        headerName:
          "Facility layout with Directions to different departments displayed.",
      },
      {
        field: "H3B8_5",
        headerName:
          "Name of the facility is prominently displayed in front of the hospital building.",
      },
      {
        field: "H3B8_6",
        headerName:
          "All functional areas identified by their respective signage.",
      },
      {
        field: "H3B8_7",
        headerName:
          "Availability of complaint box and display of process for grievance re-addressed and whom to contact is displayed",
      },
    ],
  },
  {
    field: "H3B9",
    headerName:
      "3B.9 Does this facility provide ambulance services? If Yes, please remember to complete the Ambulance Checklist after completing HFAT, else skip to 2B.10",
  },
  {
    field: "H3B10",
    headerName:
      "3B.10 If ambulances are not there, how are patients transferred?",
  },
  {
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers",
    children: [
      {
        headerName: "MO MBBS",
        children: [
          {
            headerName: "Manpower",
            field: "table1_0_Manpower",
          },
          {
            headerName: "Number",
            field: "table1_0_Number",
          },
          {
            headerName: "Availability 24/7",
            field: "table1_0_availability247",
          },
          {
            headerName: "On Site Availability",
            field: "table1_0_onSiteAvailability",
          },
          {
            headerName: "On Call Availability",
            field: "table1_0_onCallAvailability",
          },
        ],
      },
      {
        headerName: "Specialist for Medicine",
        children: [
          {
            headerName: "Manpower",
            field: "table1_1_Manpower",
          },
          {
            headerName: "Number",
            field: "table1_1_Number",
          },
          {
            headerName: "Availability 24/7",
            field: "table1_1_availability247",
          },
          {
            headerName: "On Site Availability",
            field: "table1_1_onSiteAvailability",
          },
          {
            headerName: "On Call Availability",
            field: "table1_1_onCallAvailability",
          },
        ],
      },
      {
        headerName: "Specialist for Pediatrics",
        children: [
          {
            headerName: "Manpower",
            field: "table1_2_Manpower",
          },
          {
            headerName: "Number",
            field: "table1_2_Number",
          },
          {
            headerName: "Availability 24/7",
            field: "table1_2_availability247",
          },
          {
            headerName: "On Site Availability",
            field: "table1_2_onSiteAvailability",
          },
          {
            headerName: "On Call Availability",
            field: "table1_2_onCallAvailability",
          },
        ],
      },
      {
        headerName: "Specialist for Ophthalmology",
        children: [
          {
            headerName: "Manpower",
            field: "table1_3_Manpower",
          },
          {
            headerName: "Number",
            field: "table1_3_Number",
          },
          {
            headerName: "Availability 24/7",
            field: "table1_3_availability247",
          },
          {
            headerName: "On Site Availability",
            field: "table1_3_onSiteAvailability",
          },
          {
            headerName: "On Call Availability",
            field: "table1_3_onCallAvailability",
          },
        ],
      },
      {
        headerName: "Specialist Obstetrics & Gynecologist",
        children: [
          {
            headerName: "Manpower",
            field: "table1_4_Manpower",
          },
          {
            headerName: "Number",
            field: "table1_4_Number",
          },
          {
            headerName: "Availability 24/7",
            field: "table1_4_availability247",
          },
          {
            headerName: "On Site Availability",
            field: "table1_4_onSiteAvailability",
          },
          {
            headerName: "On Call Availability",
            field: "table1_4_onCallAvailability",
          },
        ],
      },
      {
        headerName: "Staff Nurses",
        children: [
          {
            headerName: "Manpower",
            field: "table1_5_Manpower",
          },
          {
            headerName: "Number",
            field: "table1_5_Number",
          },
          {
            headerName: "Availability 24/7",
            field: "table1_5_availability247",
          },
          {
            headerName: "On Site Availability",
            field: "table1_5_onSiteAvailability",
          },
          {
            headerName: "On Call Availability",
            field: "table1_5_onCallAvailability",
          },
        ],
      },
      {
        headerName: "Pharmacist",
        children: [
          {
            headerName: "Manpower",
            field: "table1_6_Manpower",
          },
          {
            headerName: "Number",
            field: "table1_6_Number",
          },
          {
            headerName: "Availability 24/7",
            field: "table1_6_availability247",
          },
          {
            headerName: "On Site Availability",
            field: "table1_6_onSiteAvailability",
          },
          {
            headerName: "On Call Availability",
            field: "table1_6_onCallAvailability",
          },
        ],
      },
      {
        headerName: "Lab technician",
        children: [
          {
            headerName: "Manpower",
            field: "table1_7_Manpower",
          },
          {
            headerName: "Number",
            field: "table1_7_Number",
          },
          {
            headerName: "Availability 24/7",
            field: "table1_7_availability247",
          },
          {
            headerName: "On Site Availability",
            field: "table1_7_onSiteAvailability",
          },
          {
            headerName: "On Call Availability",
            field: "table1_7_onCallAvailability",
          },
        ],
      },
      {
        headerName: "Dressor",
        children: [
          {
            headerName: "Manpower",
            field: "table1_8_Manpower",
          },
          {
            headerName: "Number",
            field: "table1_8_Number",
          },
          {
            headerName: "Availability 24/7",
            field: "table1_8_availability247",
          },
          {
            headerName: "On Site Availability",
            field: "table1_8_onSiteAvailability",
          },
          {
            headerName: "On Call Availability",
            field: "table1_8_onCallAvailability",
          },
        ],
      },
      {
        headerName: "Data entry operator",
        children: [
          {
            headerName: "Manpower",
            field: "table1_9_Manpower",
          },
          {
            headerName: "Number",
            field: "table1_9_Number",
          },
          {
            headerName: "Availability 24/7",
            field: "table1_9_availability247",
          },
          {
            headerName: "On Site Availability",
            field: "table1_9_onSiteAvailability",
          },
          {
            headerName: "On Call Availability",
            field: "table1_9_onCallAvailability",
          },
        ],
      },
      {
        headerName: "Sanitation staff",
        children: [
          {
            headerName: "Manpower",
            field: "table1_10_Manpower",
          },
          {
            headerName: "Number",
            field: "table1_10_Number",
          },
          {
            headerName: "Availability 24/7",
            field: "table1_10_availability247",
          },
          {
            headerName: "On Site Availability",
            field: "table1_10_onSiteAvailability",
          },
          {
            headerName: "On Call Availability",
            field: "table1_10_onCallAvailability",
          },
        ],
      },
      {
        headerName: "Other",
        children: [
          {
            headerName: "Manpower",
            field: "table1_11_Manpower",
          },
          {
            headerName: "Manpower (Other Specify)",
            field: "table1_11_Manpower_other_specify",
            valueGetter: (params) => params.data?.table1?.[11]?.otherSpecify,
          },
          {
            headerName: "Number",
            field: "table1_11_Number",
          },
          {
            headerName: "Availability 24/7",
            field: "table1_11_availability247",
          },
          {
            headerName: "On Site Availability",
            field: "table1_11_onSiteAvailability",
          },
          {
            headerName: "On Call Availability",
            field: "table1_11_onCallAvailability",
          },
        ],
      },
    ],
  },
  {
    field: "H3C2",
    headerName:
      "3C.2 Whether training for emergency care management is being conducted for the staff in the institution?",
  },
  {
    headerName:
      "3C.3 : If Yes to 3C.2, Which of the following emergency care trainings you have undergone?",
    children: [
      {
        field: "H3C3_0",
        headerName: "Trauma & Accidental Injuries",
      },
      {
        field: "H3C3_1",
        headerName: "Burns",
      },
      {
        field: "H3C3_2",
        headerName:
          "Cardiac emergencies: acute chest pain, acute coronary syndrome (ACS)/ STEMI, Heart failure, Cardiac Arrest",
      },
      {
        field: "H3C3_3",
        headerName: "Stroke",
      },
      {
        field: "H3C3_4",
        headerName: "Acute Breathlessness",
      },
      {
        field: "H3C3_5",
        headerName: "Seizures",
      },
      {
        field: "H3C3_6",
        headerName: "Bites (Animal bite/snake bite/scorpion sting)",
      },
      {
        field: "H3C3_7",
        headerName: "Choking/foreign body ingestion",
      },
      {
        field: "H3C3_8",
        headerName: "Poisoning",
      },
      {
        field: "H3C3_9",
        headerName: "PPH",
      },
      {
        field: "H3C3_10",
        headerName: "Pre-Eclampsia",
      },
      {
        field: "H3C3_11",
        headerName: "Neonatal emergencies",
      },
      {
        field: "H3C3_12",
        headerName: "Other",
        valueGetter: (params) =>
          params.data?.H3C3?.[12]?.length > 0 ? "Other" : "",
      },
      {
        field: "H3C3_12",
        headerName: "Other Specify",
      },
    ],
  },
  {
    headerName:
      "3C.4 : If Yes, Frequency of training on emergency care in a year?",
    children: [
      {
        field: "H3C4",
        headerName: "Frequency of training on emergency care in a year?",
        valueGetter: (params) => params.data?.H3C4?.split(":")[0],
      },
      {
        field: "H3C4",
        headerName: "Other Specify",
        valueGetter: (params) => params.data?.H3C4?.split(":")[1],
      },
    ],
  },
  { field: "H3C5", headerName: "3C.5 When was the last training conducted?" },
  {
    headerName:
      "3D.1 : Which of the following emergency drugs are available at the PHC?",
    children: [
      {
        field: "H3D1_0",
        headerName: "Oxygen medicinal gas",
      },
      {
        field: "H3D1_1",
        headerName: "Atropine",
      },
      {
        field: "H3D1_2",
        headerName: "Diazepam/Lorazepam",
      },
      {
        field: "H3D1_3",
        headerName: "Adrenaline",
      },
      {
        field: "H3D1_4",
        headerName: "Charcoal activated",
      },
      {
        field: "H3D1_5",
        headerName: "Antisnake venom",
      },
      {
        field: "H3D1_6",
        headerName: "Pralidoxime (PAM)",
      },
      {
        field: "H3D1_7",
        headerName: "Magnesium sulphate",
      },
      {
        field: "H3D1_8",
        headerName: "Tetanus immunoglobulin",
      },
      {
        field: "H3D1_9",
        headerName: "Neostigmine",
      },
      {
        field: "H3D1_10",
        headerName: "Aspirin",
      },
      {
        field: "H3D1_11",
        headerName: "Clopidogrel",
      },
      {
        field: "H3D1_12",
        headerName: "Atorvastatin",
      },
      {
        field: "H3D1_13",
        headerName: "Misoprostol",
      },
      {
        field: "H3D1_14",
        headerName: "Labetalol IV",
      },
      {
        field: "H3D1_15",
        headerName: "Phenobarbitone",
      },
      {
        field: "H3D1_16",
        headerName: "Phenytoin (inj)",
      },
      {
        field: "H3D1_17",
        headerName: "Plasma volume expander",
      },
      {
        field: "H3D1_18",
        headerName: "3% Saline",
      },
      {
        field: "H3D1_19",
        headerName: "Dobutamine",
      },
      {
        field: "H3D1_20",
        headerName: "Streptokinase",
      },
      {
        field: "H3D1_21",
        headerName: "Tenecteplase",
      },
      {
        field: "H3D1_22",
        headerName: "Oxytocin",
      },
      {
        field: "H3D1_23",
        headerName: "Salbutamol sulphate",
      },
      {
        field: "H3D1_24",
        headerName: "Glucose/ 25 % dextrose",
      },
      {
        field: "H3D1_25",
        headerName: "Tranexamic acid",
      },
      {
        field: "H3D1_26",
        headerName: "tPA IV",
      },
      {
        field: "H3D1_27",
        headerName: "Methergine",
      },
      {
        field: "H3D1_28",
        headerName: "Carboprost",
      },
    ],
  },
  {
    headerName:
      "3D.2 : Which of the following emergency equipment is available at the PHC?",
    children: [
      {
        field: "H3D2_0",
        headerName: "Mobile bed for Resuscitation",
      },
      {
        field: "H3D2_1",
        headerName: "Crash Cart (Specialized Cart for Resuscitation)",
      },
      {
        field: "H3D2_2",
        headerName: "Hard Cervical Collar",
      },
      {
        field: "H3D2_3",
        headerName: "Oxygen Cylinder/Central Oxygen Supply",
      },
      {
        field: "H3D2_4",
        headerName: "Suction Machine",
      },
      {
        field: "H3D2_5",
        headerName:
          "Multipara Monitor (To monitor Heart rate, BP, SPO2[Essential] ECG, Respiration Rate [Desirable] etc)",
      },
      {
        field: "H3D2_6",
        headerName: "Defibrillator with or without External Pacer",
      },
      {
        field: "H3D2_7",
        headerName:
          "Toothed Forceps, Kocher Forceps, Magill's forceps, Artery forceps",
      },
      {
        field: "H3D2_8",
        headerName: "AMBU Bag for Adult and Paediatric",
      },
      {
        field: "H3D2_9",
        headerName:
          "Basic airway equipment like oropharyngeal nasopharyngeal airway, LMA for adult and pediatric",
      },
      {
        field: "H3D2_10",
        headerName:
          "Advanced Laryngoscope and Endotracheal Tube or Other Similar Device",
      },
      {
        field: "H3D2_11",
        headerName: "Tourniquet",
      },
      {
        field: "H3D2_12",
        headerName: "Pelvic Binder or Bed Sheets with Clips",
      },
      {
        field: "H3D2_13",
        headerName: "Laryngoscope with all sized Blades",
      },
      {
        field: "H3D2_14",
        headerName: "Endotracheal Tubes of all sizes",
      },
      {
        field: "H3D2_15",
        headerName: "Laryngeal Mask Airway (LMA)",
      },
      {
        field: "H3D2_16",
        headerName: "Chest Tubes with Water seal drain",
      },
      {
        field: "H3D2_17",
        headerName: "ECG Machine",
      },
      {
        field: "H3D2_18",
        headerName: "Nebulizer",
      },
      {
        field: "H3D2_19",
        headerName: "Fluid Warmer",
      },
      {
        field: "H3D2_20",
        headerName: "Infusion Pump and Syringe Drivers",
      },
      {
        field: "H3D2_21",
        headerName: "Spine Board with Sling and Scotch Tapes",
      },
      {
        field: "H3D2_22",
        headerName: "Splints for all types of Fracture",
      },
      {
        field: "H3D2_23",
        headerName: "Non-invasive Ventilators",
      },
      {
        field: "H3D2_24",
        headerName: "Invasive Ventilators",
      },
      {
        field: "H3D2_25",
        headerName: "Incubators",
      },
    ],
  },
  {
    headerName: "3E.1 : Numbers of Patients who Visited ED in Last One Month",
    children: [
      {
        field: "table2_0_Adult",
        headerName: "Adult (> 18 Years)",
      },
      {
        field: "table2_0_Pediatric",
        headerName: "Pediatric",
      },
      {
        field: "table2_0_Broughtdead",
        headerName: "Brought dead",
      },
      {
        field: "table2_0_Deathafterarrival",
        headerName: "Death after arrival",
      },
      {
        field: "table2_0_MLC",
        headerName: "MLC (Medico-Legal Cases)",
      },
    ],
  },
  {
    headerName:
      "3E.2 : Numbers of Patients Attended in ED and Deaths in Last One Year (Jan - Dec 2023)",
    children: [
      {
        headerName: "MI",
        children: [
          {
            field: "table3_0_Attended",
            headerName: "Attended",
          },
          {
            field: "table3_0_Death",
            headerName: "Death",
          },
        ],
      },
      {
        headerName: "Stroke",
        children: [
          {
            field: "table3_1_Attended",
            headerName: "Attended",
          },
          {
            field: "table3_1_Death",
            headerName: "Death",
          },
        ],
      },
      {
        headerName: "Trauma & Burns",
        children: [
          {
            field: "table3_2_Attended",
            headerName: "Attended",
          },
          {
            field: "table3_2_Death",
            headerName: "Death",
          },
        ],
      },
      {
        headerName: "Poisoning",
        children: [
          {
            field: "table3_3_Attended",
            headerName: "Attended",
          },
          {
            field: "table3_3_Death",
            headerName: "Death",
          },
        ],
      },
      {
        headerName: "Snake Bites",
        children: [
          {
            field: "table3_4_Attended",
            headerName: "Attended",
          },
          {
            field: "table3_4_Death",
            headerName: "Death",
          },
        ],
      },
      {
        headerName: "Maternal Emergencies-PPH",
        children: [
          {
            field: "table3_5_Attended",
            headerName: "Attended",
          },
          {
            field: "table3_5_Death",
            headerName: "Death",
          },
        ],
      },
      {
        headerName: "Maternal Emergencies- Eclampsia",
        children: [
          {
            field: "table3_6_Attended",
            headerName: "Attended",
          },
          {
            field: "table3_6_Death",
            headerName: "Death",
          },
        ],
      },
      {
        headerName: "Neonatal Emergencies",
        children: [
          {
            field: "table3_7_Attended",
            headerName: "Attended",
          },
          {
            field: "table3_7_Death",
            headerName: "Death",
          },
        ],
      },
      {
        headerName: "Acute Respiratory Illness",
        children: [
          {
            field: "table3_8_Attended",
            headerName: "Attended",
          },
          {
            field: "table3_8_Death",
            headerName: "Death",
          },
        ],
      },
    ],
  },
  {
    headerName:
      "3E.3 Which of the following emergency services are delivered at the PHC? (Multiple answers possible)",
    children: [
      {
        field: "H3E3_0",
        headerName: "Triage",
      },
      {
        field: "H3E3_1",
        headerName: "Resuscitation",
      },
      {
        field: "H3E3_2",
        headerName: "Medico-legal Reporting",
      },
    ],
  },
  {
    field: "H3F1",
    headerName:
      "3F.1 Does the facility have a Hospital Management Information System (HMIS)",
  },
  {
    field: "H3F2",
    headerName:
      "3F.2 Does this facility do complete reporting of indicators on emergency care in HMIS?",
  },
  {
    field: "H3F3",
    headerName:
      "3F.3 How many personnel available for managing information system?",
  },
  {
    headerName:
      "3F.4 What key indicators are generated from the emergency management information system?",
    children: [
      {
        field: "H3F4_0",
        headerName: "Numbers by type of emergencies",
      },
      {
        field: "H3F4_1",
        headerName: "Length of hospital stay",
      },
      {
        field: "H3F4_2",
        headerName: "Turn around time",
      },
      {
        field: "H3F4_3",
        headerName: "Disposal time",
      },
      {
        field: "H3F4_4",
        headerName: "Number of deaths",
      },
      {
        field: "H3F4_5",
        headerName: "Number of Referrals",
      },
    ],
  },
  {
    field: "H3F5",
    headerName:
      "3F.5 Whether time bound management of common emergencies is captured in MIS.",
  },
  {
    field: "H3F6",
    headerName:
      "3F.6 Whether Medical Officer In charge (MO/IC) uses or reviews the data for quality improvement",
  },
  {
    field: "H3F7",
    headerName:
      "3F.7 Do you get Pre-Hospital Notification during an emergency?",
    valueGetter: (params) => params.data?.H3F7?.split(":")[0],
    valueFormatter: (params) => params.value?.split("(")[0],
  },
  {
    field: "H3F7",
    headerName:
      "3F.7 If Yes , How often per week get Pre-Hospital Notification during an emergency?",
    valueGetter: (params) => params.data?.H3F7?.split(":")[1],
  },
  {
    field: "H3F8",
    headerName: "3F.8 Infrastructure for receiving external communication?",
  },
  {
    field: "H3G1",
    headerName: "3G.1 Whether any untied fund is available at your hospital?",
  },
  {
    field: "H3G2",
    headerName:
      "3G.2 If Yes, whether this fund is utilized for providing emergency care services?",
  },
  {
    field: "H3G3",
    headerName: "3G.3 Whether any fund is available for emergency care?",
  },
  {
    field: "H3G4",
    headerName:
      "3G.4 If funds are available, which health protection schemes are covering your emergency care system?",
    valueGetter: (params) => params.data?.H3G4?.split(":")[0],
  },
  {
    field: "H3G4",
    headerName:
      "3G.4 If funds are available, which health protection schemes are covering your emergency care system? (Other specify)",
    valueGetter: (params) => params.data?.H3G4?.split(":")[1],
  },
  {
    field: "H3G5",
    headerName:
      "3G.5 Out of total patients being provided emergency care, how many were provided services under PMJAY scheme/ any other insurance scheme.",
  },
  {
    field: "H3G6",
    headerName:
      "3G.6 Is the facility providing free emergency services to pregnant women, mothers, and neonates as per prevalent government schemes?",
  },
  {
    field: "H3H1",
    headerName:
      "3H.1.1 Do you have any disaster management plans if any catastrophe takes place at PHC (fire, building collapse, earthquake, etc. affecting the PHC)?",
  },
  {
    field: "H3H2",
    headerName:
      "3H.1.2 Do you have a redistribution plan (management plan in case human resource/ logistics scarcity)?",
  },
  { field: "H3H3", headerName: "3H.1.3 Do you have any evacuation plan?" },
  {
    field: "H3H4",
    headerName:
      "3H.2.1 Do you have a Quality Improvement Committee? (if yes, collect detail of Committee)",
    valueGetter: (params) => params.data?.H3H4?.split(":")[0],
  },
  {
    field: "H3H4_1",
    headerName: "3H.2.1 If Yes ,Provide Details",
    valueGetter: (params) => params.data?.H3H4?.split(":")[1],
  },
  {
    field: "H3H5",
    headerName: "3H.2.2 How frequently does this committee meet in a year?",
  },
  {
    field: "H3H6",
    headerName:
      "3H.2.3 Do you have regular audits related to emergency care in this facility?",
  },
  {
    field: "H3H7",
    headerName:
      "3H.2.4 How frequently emergency care audits are conducted in a year?",
  },
  {
    headerName: "3H.2.5 Types of audits conducted?",
    children: [
      {
        field: "H3H8_0",
        headerName: "Mortality Audit",
      },
      {
        field: "H3H8_1",
        headerName: "Morbidity Audit",
      },
      {
        field: "H3H8_2",
        headerName: "Other",
        valueGetter: (params) =>
          params.data?.H3H8?.[2]?.length > 0 ? "Other" : "",
      },
      {
        field: "H3H8_2",
        headerName: "Other Specify",
      },
    ],
  },
  {
    field: "H3H9",
    headerName:
      "3H.2.6 Any action being taken on Audit report in the last one year?",
  },
  {
    headerName:
      "3I.1 What types of registers are maintained at the PHC? (Multiple answers possible)",
    children: [
      {
        field: "H3I1_0",
        headerName: "OPD/Treatment Register",
      },
      {
        field: "H3I1_1",
        headerName: "Inventory Register",
      },
      {
        field: "H3I1_2",
        headerName: "Referral Register",
      },
      {
        field: "H3I1_3",
        headerName:
          "Record for handing over and taking over of critical care equipment.",
      },
      {
        field: "H3I1_4",
        headerName: "Medico-legal register",
      },
      {
        field: "H3I1_5",
        headerName: "Patient/Community feedback register",
      },
      {
        field: "H3I1_6",
        headerName: "At Risk Register for vulnerable patients",
      },
      {
        field: "H3I1_7",
        headerName: "Emergency Register",
      },
      {
        field: "H3I1_8",
        headerName: "Mapping of the other Facilities in the block/district",
      },
      {
        field: "H3I1_9",
        headerName: "Other",
      },
      {
        field: "H3I1_10",
        headerName: "Other specify",
      },
    ],
  },
  {
    headerName:
      "3I.2 Which of the following SOPs for the management of common medical emergencies are followed at your PHC? (Select all that apply)",
    children: [
      {
        field: "H3I2_1",
        headerName: "Use of Standard guidelines for triage",
      },
      {
        field: "H3I2_2",
        headerName: "Post Exposure prophylaxis protocols.",
      },
      {
        field: "H3I2_3",
        headerName:
          "Protocols for communication among health care teams and with patients and relatives.",
      },
      {
        field: "H3I2_4",
        headerName: "Disaster management plan.",
      },
      {
        field: "H3I2_5",
        headerName: "Other",
      },
      {
        field: "H3I2_6",
        headerName: "Other specify",
      },
    ],
  },
  {
    headerName:
      "3I.3 : Whether having Emergency condition specific SOP/STW for emergency care?",
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
    field: "H3I4",
    headerName:
      "3I.4 Does the facility have defined and established procedure for informing patients about their medical condition, involving them in treatment planning and facilitating informed decision making?",
  },
  {
    field: "H3J1",
    headerName:
      "3J.1 Does this facility have any policies and procedures which guide the transfer- out/referral of stable and unstable patients after stabilization to another facility with documentation?",
  },
  {
    field: "H3J2",
    headerName:
      "3J.2Do you any documented SOP/STW guiding the referral linkages?",
  },
];

export const HFAT3Columns = generateColumns(columns);
