import generateColumns from "./../generateColumns";

// Column Definitions: Defines the columns to be displayed.
const columns = [
  {
    headerName: "Record ID",
    field: "id",
    checkboxSelection: true,
    headerCheckboxSelection: true,
    width: 250,
    valueGetter: (params) => params.data?._id,
  },
  { headerName: "1A.1. Assessor's Name", field: "A1" },
  { headerName: "1A.2. Date", field: "A2" },
  {
    headerName: "1A.3. Code",
    field: "A3",
    valueGetter: (params) => params.data?.uniqueCode,
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
    headerName: "1A.10. GPS",
    children: [
      {
        headerName: "latitude",
        field: "A10_latitude",
        valueGetter: (params) => params?.data?.A10?.latitude,
      },
      {
        headerName: "longitude",
        field: "A10_longitude",
        valueGetter: (params) => params?.data?.A10?.longitude,
      },
      {
        headerName: "district",
        field: "A10_district",
        valueGetter: (params) => params?.data?.A10?.district,
      },
      {
        headerName: "state",
        field: "A10_state",
        valueGetter: (params) => params?.data?.A10?.state,
      },
    ],
  },
  { headerName: "1A.11. Type of Health Care Facility?", field: "A11" },
  {
    headerName: "1A.12. If Tertiary care center, select the appropriate one",
    field: "A12",
  },
  {
    headerName:
      "1B.1 How many beds are available for the in-patient department (IPD)?",
    field: "B1",
  },
  {
    headerName:
      "1B.2 Whether any dedicated bed present  for emergency care?    If No, skip to 1B.5 ",
    field: "B2",
  },
  {
    headerName: "1B.3. How many beds are available for emergency care?",
    field: "B3",
  },
  {
    headerName: "1B.4 : Number of Beds by Emergency Severity Index (ESI)",
    children: [
      {
        headerName: "Red",
        field: "B4_0",
        valueGetter: (params) => params.data?.B4?.[0]?.split(":")[1],
      },
      {
        headerName: "Yellow",
        field: "B4_1",
        valueGetter: (params) => params.data?.B4?.[1]?.split(":")[1],
      },
      {
        headerName: "Green",
        field: "B4_2",
        valueGetter: (params) => params.data?.B4?.[2]?.split(":")[1],
      },
    ],
  },
  {
    headerName:
      "1B.5  What is the average number of patients presenting to OPD per month? ",
    field: "B5",
  },
  {
    headerName:
      "1B.6  What is the average number of patients presenting with emergency conditions daily?   (Chest pain, stroke, acute weakness, acute blindness, Shortness of breath, altered mentation, snake bite, bites,   road traffic accident, injuries ,poisoning, deliberate self-harm, infectious diseases, fever, pregnancy related, seizure, acute abdomen, anaphylaxis, cerebro-meningeal infections, foreign body, acute pulmonary disease, Shock, accidental injuries, infections)",
    field: "B6",
  },
  {
    headerName: "1B.7 Does the facility have a licensed in-house blood bank?",
    field: "B7_0",
    valueGetter: (params) => params.data?.B7?.split(":")[0],
  },
  {
    headerName:
      "1B.7 Does the facility have a licensed in-house blood bank? (Other Specify)",
    field: "B7_1",
    valueGetter: (params) => params.data?.B7?.split(":")[1],
  },
  {
    headerName:
      "1B.8 Which of these does the blood bank have among the following?",
    children: [
      {
        headerName: "Component facility",
        field: "B8_0",
      },
      {
        headerName: "O- ve Blood availability",
        field: "B8_1",
      },
    ],
  },
  {
    headerName: "1B.9 Is there a blood storage facility inside the emergency?",
    field: "B9",
  },
  {
    headerName:
      "1B.10 Which of the following does your facility have to provide easy access for emergency care?",

    children: [
      {
        headerName:
          "No vehicles parked on the way/in front of emergency department",
        field: "B10_0",
      },
      {
        headerName: "Designated parking area for Ambulance, Staff and Public",
        field: "B10_1",
      },
      {
        headerName:
          "Smooth entry area with adequate wheelchair, trolley and stretcher bay",
        field: "B10_2",
      },
    ],
  },
  {
    headerName:
      "1B.11 Which of the following demarcated /dedicated areas does this facility have for emergency care?",
    children: [
      {
        headerName: "Decontamination Area at the Entrance of ED",
        field: "B11_0",
      },
      {
        headerName:
          "Hospital attendant at the entrance of hospital to help the patient with the wheelchair, stretcher, etc.",
        field: "B11_1",
      },
      {
        headerName: "Waiting area for patients/attendants",
        field: "B11_2",
      },
      {
        headerName: "Police control room",
        field: "B11_3",
      },
      {
        headerName: "Emergency Registration Counter",
        field: "B11_4",
      },
      {
        headerName:
          "Department has proper layout and demarcated areas as per Triage.",
        field: "B11_5",
      },
      {
        headerName: "Demarcated station for doctors and nurses",
        field: "B11_6",
      },
      {
        headerName: "Demarcated plaster room",
        field: "B11_7",
      },
      {
        headerName: "Dedicated isolation rooms (Emergency Infections)",
        field: "B11_8",
      },
      {
        headerName: "Dedicated minor OT.",
        field: "B11_9",
      },
      {
        headerName: "Provision for emergency OT",
        field: "B11_10",
      },
      {
        headerName: "Point of care lab (24x7)",
        field: "B11_11",
      },
      {
        headerName: "Demarcated duty room for doctors",
        field: "B11_12",
      },
      {
        headerName: "Demarcated duty room for nursing staff",
        field: "B11_13",
      },
      {
        headerName: "Ambulance drivers room",
        field: "B11_14",
      },
      {
        headerName: "Dedicated LaQshya certified labor room",
        field: "B11_15",
      },
      {
        headerName: "Child-friendly service based on MusQan.",
        field: "B11_16",
      },
      {
        headerName: "NABH Accreditation",
        field: "B11_17",
      },
    ],
  },
  {
    headerName:
      "1B.12 Is there any display board of all the emergency services and entitlements available in its departments?",
    children: [
      {
        field: "B12_0",
        headerName:
          "Services provided to the patients are clearly defined, displayed prominently.",
      },
      {
        field: "B12_1",
        headerName:
          "Names of doctor and nursing staff on duty are displayed and updated.",
      },
      { field: "B12_2", headerName: "List of available drugs are displayed." },
      {
        field: "B12_3",
        headerName:
          "All relevant information is displayed for the patients and visitors including user charges wherever applicable at the time of procedure/ investigation/admission.",
      },
      {
        field: "B12_4",
        headerName:
          "Important contact numbers including ambulance, blood bank, police and referral centers displayed.",
      },
      {
        field: "B12_5",
        headerName: "Other",
        valueGetter: (params) =>
          (params.data?.B12?.[5]?.length > 0 && "Other") || null,
      },
      {
        field: "B12_5",
        headerName: "Other Specify",
      },
    ],
  },
  {
    headerName:
      "1B.13 Which of the following safety and security infrastructure/ measures are in place at your hospital (Select all that apply):",
    children: [
      { field: "B13_0", headerName: "Fire safety" },
      { field: "B13_1", headerName: "Building safety" },
      { field: "B13_2", headerName: "Electrical safety" },
      { field: "B13_3", headerName: "Patient and healthcare provider safety" },
      { field: "B13_4", headerName: "Chemical safety" },
      {
        field: "B13_5",
        headerName: "Periodic training of staff (Every 6 months)",
      },
      { field: "B13_6", headerName: "Periodic mock drill (Every 6 months)" },
      {
        field: "B13_7",
        headerName: "Police post available within the premises.",
      },
      {
        field: "B13_8",
        headerName:
          "Alarm bell in Emergency / Code announcement available for extra help.",
      },
      { field: "B13_9", headerName: "Disease outbreak management plan" },
      { field: "B13_10", headerName: "Surge capacity in your hospital" },
    ],
  },
  {
    headerName:
      "1B.14 Does the hospital provide ambulance services? If Yes, please remember to complete the Ambulance Checklist after completing HFAT, else skip to 1B.15 ",
    field: "B14",
  },
  {
    headerName:
      "IB.15 If ambulances are not there, how are patients transferred? ",
    field: "B15",
  },

  {
    headerName:
      "1C.1 Tick the manpower available in your emergency department and provide",
    children: [
      {
        headerName: "Faculty/Consultant",
        children: [
          {
            field: "table1_0_Manpower",
            headerName: "Manpower",
            valueGetter: (params) => params.data?.table1?.[0]?.Manpower,
          },
          {
            field: "table1_0_Number",
            headerName: "Number",
            valueGetter: (params) => params.data?.table1?.[0]?.Number,
          },
          {
            field: "table1_0_Availability",
            headerName: "availability24 X 7",
            valueGetter: (params) => params.data?.table1?.[0]?.Availability,
          },
          {
            field: "table1_0_OnSite",
            headerName: "onSiteAvailability",
            valueGetter: (params) => params.data?.table1?.[0]?.OnSite,
          },
          {
            field: "table1_0_OnCall",
            headerName: "onCallAvailability",
            valueGetter: (params) => params.data?.table1?.[0]?.OnCall,
          },
        ],
      },
      {
        headerName: "CMO (casualty medical officer)",
        children: [
          {
            headerName: "Manpower",
            field: "table1_1_Manpower",
            valueGetter: (params) => params.data?.table1?.[1]?.Manpower,
          },
          {
            headerName: "Number",
            field: "table1_1_Number",
            valueGetter: (params) => params.data?.table1?.[1]?.Number,
          },
          {
            headerName: "availability24 X 7",
            field: "table1_1_Availability",
            valueGetter: (params) => params.data?.table1?.[1]?.Availability,
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_1_OnSite",
            valueGetter: (params) => params.data?.table1?.[1]?.OnSite,
          },
          {
            headerName: "onCallAvailability",
            field: "table1_1_OnCall",
            valueGetter: (params) => params.data?.table1?.[1]?.OnCall,
          },
        ],
      },
      {
        headerName: "SR (Senior Residents)",
        children: [
          {
            headerName: "Manpower",
            field: "table1_2_Manpower",
            valueGetter: (params) => params.data?.table1?.[2]?.Manpower,
          },
          {
            headerName: "Number",
            field: "table1_2_Number",
            valueGetter: (params) => params.data?.table1?.[2]?.Number,
          },
          {
            headerName: "availability24 X 7",
            field: "table1_2_Availability",
            valueGetter: (params) => params.data?.table1?.[2]?.Availability,
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_2_OnSite",
            valueGetter: (params) => params.data?.table1?.[2]?.OnSite,
          },
          {
            headerName: "onCallAvailability",
            field: "table1_2_OnCall",
            valueGetter: (params) => params.data?.table1?.[2]?.OnCall,
          },
        ],
      },
      {
        headerName: "JR (Junior Residents)",
        children: [
          {
            headerName: "Manpower",
            field: "table1_3_Manpower",
            valueGetter: (params) => params.data?.table1?.[3]?.Manpower,
          },
          {
            headerName: "Number",
            field: "table1_3_Number",
            valueGetter: (params) => params.data?.table1?.[3]?.Number,
          },
          {
            headerName: "availability24 X 7",
            field: "table1_3_Availability",
            valueGetter: (params) => params.data?.table1?.[3]?.Availability,
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_3_OnSite",
            valueGetter: (params) => params.data?.table1?.[3]?.OnSite,
          },
          {
            headerName: "onCallAvailability",
            field: "table1_3_OnCall",
            valueGetter: (params) => params.data?.table1?.[3]?.OnCall,
          },
        ],
      },
      {
        headerName: "MO (Medical officer)",
        children: [
          {
            headerName: "Manpower",
            field: "table1_4_Manpower",
            valueGetter: (params) => params.data?.table1?.[4]?.Manpower,
          },
          {
            headerName: "Number",
            field: "table1_4_Number",
            valueGetter: (params) => params.data?.table1?.[4]?.Number,
          },
          {
            headerName: "availability24 X 7",
            field: "table1_4_Availability",
            valueGetter: (params) => params.data?.table1?.[4]?.Availability,
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_4_OnSite",
            valueGetter: (params) => params.data?.table1?.[4]?.OnSite,
          },
          {
            headerName: "onCallAvailability",
            field: "table1_4_OnCall",
            valueGetter: (params) => params.data?.table1?.[4]?.OnCall,
          },
        ],
      },
      {
        headerName: "Nursing officer in charge / Team leader",
        children: [
          {
            headerName: "Manpower",
            field: "table1_5_Manpower",
            valueGetter: (params) => params.data?.table1?.[5]?.Manpower,
          },
          {
            headerName: "Number",
            field: "table1_5_Number",
            valueGetter: (params) => params.data?.table1?.[5]?.Number,
          },
          {
            headerName: "availability24 X 7",
            field: "table1_5_Availability",
            valueGetter: (params) => params.data?.table1?.[5]?.Availability,
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_5_OnSite",
            valueGetter: (params) => params.data?.table1?.[5]?.OnSite,
          },
          {
            headerName: "onCallAvailability",
            field: "table1_5_OnCall",
            valueGetter: (params) => params.data?.table1?.[5]?.OnCall,
          },
        ],
      },
      {
        headerName: "Staff Nurse/ Nursing Officer",
        children: [
          {
            headerName: "Manpower",
            field: "table1_6_Manpower",
            valueGetter: (params) => params.data?.table1?.[6]?.Manpower,
          },
          {
            headerName: "Number",
            field: "table1_6_Number",
            valueGetter: (params) => params.data?.table1?.[6]?.Number,
          },
          {
            headerName: "availability24 X 7",
            field: "table1_6_Availability",
            valueGetter: (params) => params.data?.table1?.[6]?.Availability,
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_6_OnSite",
            valueGetter: (params) => params.data?.table1?.[6]?.OnSite,
          },
          {
            headerName: "onCallAvailability",
            field: "table1_6_OnCall",
            valueGetter: (params) => params.data?.table1?.[6]?.OnCall,
          },
        ],
      },
      {
        headerName: "Radiology technician/ Radiographer",
        children: [
          {
            headerName: "Manpower",
            field: "table1_7_Manpower",
            valueGetter: (params) => params.data?.table1?.[7]?.Manpower,
          },
          {
            headerName: "Number",
            field: "table1_7_Number",
            valueGetter: (params) => params.data?.table1?.[7]?.Number,
          },
          {
            headerName: "availability24 X 7",
            field: "table1_7_Availability",
            valueGetter: (params) => params.data?.table1?.[7]?.Availability,
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_7_OnSite",
            valueGetter: (params) => params.data?.table1?.[7]?.OnSite,
          },
          {
            headerName: "onCallAvailability",
            field: "table1_7_OnCall",
            valueGetter: (params) => params.data?.table1?.[7]?.OnCall,
          },
        ],
      },
      {
        headerName: "Lab Technician",
        children: [
          {
            headerName: "Manpower",
            field: "table1_8_Manpower",
            valueGetter: (params) => params.data?.table1?.[8]?.Manpower,
          },
          {
            headerName: "Number",
            field: "table1_8_Number",
            valueGetter: (params) => params.data?.table1?.[8]?.Number,
          },
          {
            headerName: "availability24 X 7",
            field: "table1_8_Availability",
            valueGetter: (params) => params.data?.table1?.[8]?.Availability,
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_8_OnSite",
            valueGetter: (params) => params.data?.table1?.[8]?.OnSite,
          },
          {
            headerName: "onCallAvailability",
            field: "table1_8_OnCall",
            valueGetter: (params) => params.data?.table1?.[8]?.OnCall,
          },
        ],
      },
      {
        headerName: "OT. Technician",
        children: [
          {
            headerName: "Manpower",
            field: "table1_9_Manpower",
            valueGetter: (params) => params.data?.table1?.[9]?.Manpower,
          },
          {
            headerName: "Number",
            field: "table1_9_Number",
            valueGetter: (params) => params.data?.table1?.[9]?.Number,
          },
          {
            headerName: "availability24 X 7",
            field: "table1_9_Availability",
            valueGetter: (params) => params.data?.table1?.[9]?.Availability,
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_9_OnSite",
            valueGetter: (params) => params.data?.table1?.[9]?.OnSite,
          },
          {
            headerName: "onCallAvailability",
            field: "table1_9_OnCall",
            valueGetter: (params) => params.data?.table1?.[9]?.OnCall,
          },
        ],
      },
      {
        headerName:
          "H.A/ GDA/ Orderly (GDA)General Duty Assistant, SA- Sanitary Attendant, HA- Hospital Attendant",
        children: [
          {
            headerName: "Manpower",
            field: "table1_10_Manpower",
            valueGetter: (params) => params.data?.table1?.[10]?.Manpower,
          },
          {
            headerName: "Number",
            field: "table1_10_Number",
            valueGetter: (params) => params.data?.table1?.[10]?.Number,
          },
          {
            headerName: "availability24 X 7",
            field: "table1_10_Availability",
            valueGetter: (params) => params.data?.table1?.[10]?.Availability,
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_10_OnSite",
            valueGetter: (params) => params.data?.table1?.[10]?.OnSite,
          },
          {
            headerName: "onCallAvailability",
            field: "table1_10_OnCall",
            valueGetter: (params) => params.data?.table1?.[10]?.OnCall,
          },
        ],
      },
      {
        headerName: "SA/ Housekeeping staff",
        children: [
          {
            headerName: "Manpower",
            field: "table1_11_Manpower",
            valueGetter: (params) => params.data?.table1?.[11]?.Manpower,
          },
          {
            headerName: "Number",
            field: "table1_11_Number",
            valueGetter: (params) => params.data?.table1?.[11]?.Number,
          },
          {
            headerName: "availability24 X 7",
            field: "table1_11_Availability",
            valueGetter: (params) => params.data?.table1?.[11]?.Availability,
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_11_OnSite",
            valueGetter: (params) => params.data?.table1?.[11]?.OnSite,
          },
          {
            headerName: "onCallAvailability",
            field: "table1_11_OnCall",
            valueGetter: (params) => params.data?.table1?.[11]?.OnCall,
          },
        ],
      },
      {
        headerName: "EMT",
        children: [
          {
            headerName: "Manpower",
            field: "table1_12_Manpower",
            valueGetter: (params) => params.data?.table1?.[12]?.Manpower,
          },
          {
            headerName: "Number",
            field: "table1_12_Number",
            valueGetter: (params) => params.data?.table1?.[12]?.Number,
          },
          {
            headerName: "availability24 X 7",
            field: "table1_12_Availability",
            valueGetter: (params) => params.data?.table1?.[12]?.Availability,
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_12_OnSite",
            valueGetter: (params) => params.data?.table1?.[12]?.OnSite,
          },
          {
            headerName: "onCallAvailability",
            field: "table1_12_OnCall",
            valueGetter: (params) => params.data?.table1?.[12]?.OnCall,
          },
        ],
      },
      {
        headerName: "Security",
        children: [
          {
            headerName: "Manpower",
            field: "table1_13_Manpower",
            valueGetter: (params) => params.data?.table1?.[13]?.Manpower,
          },
          {
            headerName: "Number",
            field: "table1_13_Number",
            valueGetter: (params) => params.data?.table1?.[13]?.Number,
          },
          {
            headerName: "availability24 X 7",
            field: "table1_13_Availability",
            valueGetter: (params) => params.data?.table1?.[13]?.Availability,
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_13_OnSite",
            valueGetter: (params) => params.data?.table1?.[13]?.OnSite,
          },
          {
            headerName: "onCallAvailability",
            field: "table1_13_OnCall",
            valueGetter: (params) => params.data?.table1?.[13]?.OnCall,
          },
        ],
      },
      {
        headerName: "Registration staff",
        children: [
          {
            headerName: "Manpower",
            field: "table1_14_Manpower",
            valueGetter: (params) => params.data?.table1?.[14]?.Manpower,
          },
          {
            headerName: "Number",
            field: "table1_14_Number",
            valueGetter: (params) => params.data?.table1?.[14]?.Number,
          },
          {
            headerName: "availability24 X 7",
            field: "table1_14_Availability",
            valueGetter: (params) => params.data?.table1?.[14]?.Availability,
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_14_OnSite",
            valueGetter: (params) => params.data?.table1?.[14]?.OnSite,
          },
          {
            headerName: "onCallAvailability",
            field: "table1_14_OnCall",
            valueGetter: (params) => params.data?.table1?.[14]?.OnCall,
          },
        ],
      },
      {
        headerName: "IT Staff",
        children: [
          {
            headerName: "Manpower",
            field: "table1_15_Manpower",
            valueGetter: (params) => params.data?.table1?.[15]?.Manpower,
          },
          {
            headerName: "Number",
            field: "table1_15_Number",
            valueGetter: (params) => params.data?.table1?.[15]?.Number,
          },
          {
            headerName: "availability24 X 7",
            field: "table1_15_Availability",
            valueGetter: (params) => params.data?.table1?.[15]?.Availability,
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_15_OnSite",
            valueGetter: (params) => params.data?.table1?.[15]?.OnSite,
          },
          {
            headerName: "onCallAvailability",
            field: "table1_15_OnCall",
            valueGetter: (params) => params.data?.table1?.[15]?.OnCall,
          },
        ],
      },
      {
        headerName: "Hospital Administrator",
        children: [
          {
            headerName: "Manpower",
            field: "table1_16_Manpower",
            valueGetter: (params) => params.data?.table1?.[16]?.Manpower,
          },
          {
            headerName: "Number",
            field: "table1_16_Number",
            valueGetter: (params) => params.data?.table1?.[16]?.Number,
          },
          {
            headerName: "availability24 X 7",
            field: "table1_16_Availability",
            valueGetter: (params) => params.data?.table1?.[16]?.Availability,
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_16_OnSite",
            valueGetter: (params) => params.data?.table1?.[16]?.OnSite,
          },
          {
            headerName: "onCallAvailability",
            field: "table1_16_OnCall",
            valueGetter: (params) => params.data?.table1?.[16]?.OnCall,
          },
        ],
      },
      {
        headerName: "Pharmacist",
        children: [
          {
            headerName: "Manpower",
            field: "table1_17_Manpower",
            valueGetter: (params) => params.data?.table1?.[17]?.Manpower,
          },
          {
            headerName: "Number",
            field: "table1_17_Number",
            valueGetter: (params) => params.data?.table1?.[17]?.Number,
          },
          {
            headerName: "availability24 X 7",
            field: "table1_17_Availability",
            valueGetter: (params) => params.data?.table1?.[17]?.Availability,
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_17_OnSite",
            valueGetter: (params) => params.data?.table1?.[17]?.OnSite,
          },
          {
            headerName: "onCallAvailability",
            field: "table1_17_OnCall",
            valueGetter: (params) => params.data?.table1?.[17]?.OnCall,
          },
        ],
      },
      {
        headerName: "Other (please specify)",
        children: [
          {
            headerName: "Manpower",
            field: "table1_18_Manpower",
            valueGetter: (params) => params.data?.table1?.[18]?.Manpower,
          },
          {
            headerName: "Other specify",
            field: "table1_18_Manpower_other_specify",
            valueGetter: (params) => params.data?.table1?.[18]?.otherSpecify,
          },
          {
            headerName: "Number",
            field: "table1_18_Number",
            valueGetter: (params) => params.data?.table1?.[18]?.Number,
          },
          {
            headerName: "availability24 X 7",
            field: "table1_18_Availability",
            valueGetter: (params) => params.data?.table1?.[18]?.Availability,
          },
          {
            headerName: "onSiteAvailability",
            field: "table1_18_OnSite",
            valueGetter: (params) => params.data?.table1?.[18]?.OnSite,
          },
          {
            headerName: "onCallAvailability",
            field: "table1_18_OnCall",
            valueGetter: (params) => params.data?.table1?.[18]?.OnCall,
          },
        ],
      },
    ],
  },

  {
    headerName:
      "1C.2 Please indicate which of the following specialist/super specialist services are available in your hospital (District hospital + Medical college):",
    children: [
      {
        headerName: "District hospital + Medical college",

        children: [
          { field: "C2a_0", headerName: "Medicine" },
          { field: "C2a_1", headerName: "Gynecology and obstetrics" },
          { field: "C2a_2", headerName: "Orthopedics" },
          { field: "C2a_3", headerName: "General surgery" },
          { field: "C2a_4", headerName: "Radiology" },
          { field: "C2a_5", headerName: "Anesthesia" },
          { field: "C2a_6", headerName: "Critical care" },
          { field: "C2a_7", headerName: "Ophthalmology" },
          { field: "C2a_8", headerName: "ENT (Ear, Nose, Throat)" },
          { field: "C2a_9", headerName: "Psychiatry" },
          { field: "C2a_10", headerName: "Dermatology" },
          { field: "C2a_11", headerName: "Forensic medicine" },
        ],
      },
      {
        headerName: "Medical college",
        children: [
          { field: "C2b_0", headerName: "Transfusion medicine" },
          { field: "C2b_1", headerName: "Cardiology" },
          {
            field: "C2b_2",
            headerName: "CTVS (Cardiothoracic and Vascular Surgery)",
          },
          { field: "C2b_3", headerName: "Neurology" },
          { field: "C2b_4", headerName: "Neurosurgery" },
          { field: "C2b_5", headerName: "Plastic surgery" },
          { field: "C2b_6", headerName: "Maxillofacial surgery" },
          { field: "C2b_7", headerName: "Gastroenterology" },
          { field: "C2b_8", headerName: "Nephrology" },
          { field: "C2b_9", headerName: "Urology" },
          { field: "C2b_10", headerName: "Pediatric surgery" },
          { field: "C2b_11", headerName: "Emergency medicine" },
        ],
      },
    ],
  },

  {
    headerName:
      "1C.3 Whether training for emergency care management is being conducted for the staff in the institution?",
    field: "C3",
  },
  {
    headerName:
      "1C4. Which of the following emergency care trainings have you undergone?",
    children: [
      { headerName: "Trauma & Accidental Injuries", field: "C4_0" },
      { headerName: "Burns", field: "C4_1" },
      {
        headerName:
          "Cardiac emergencies: acute chest pain, acute coronary syndrome (ACS)/ STEMI, Heart failure, Cardiac Arrest",
        field: "C4_2",
      },
      { headerName: "Stroke", field: "C4_3" },
      { headerName: "Acute Breathlessness", field: "C4_4" },
      {
        headerName: "Bites (Animal bite/snake bite/scorpion sting)",
        field: "C4_5",
      },
      { headerName: "Choking/foreign body ingestion", field: "C4_6" },
      { headerName: "Poisoning", field: "C4_7" },
      { headerName: "PPH", field: "C4_8" },
      { headerName: "Pre-Eclampsia", field: "C4_9" },
      { headerName: "Neonatal emergencies", field: "C4_10" },
      {
        headerName: "Other",
        field: "C4_11",
        valueGetter: (params) =>
          (params.data?.C4?.[11].length > 0 && "Other") || "",
      },
      {
        headerName: "Other Specify",
        field: "C4_11",
      },
    ],
  },
  {
    headerName: "1C.5 Frequency of training on emergency care in a year?",
    field: "C5_0",
    valueGetter: (params) => params.data?.C5?.split(":")[0],
  },
  {
    headerName:
      "1C.5 Frequency of training on emergency care in a year? (Other Specify)",
    field: "C5_1",
    valueGetter: (params) => params.data?.C5?.split(":")[1],
  },
  { headerName: "1C.6 When was the last training conducted?", field: "C6" },

  {
    headerName:
      "1D.1 Which of the following essential emergency drugs are available at the DH/ Tertiary Care Hospital? ",
    children: [
      { headerName: "Oxygen medicinal gas", field: "H1D1_0" },
      { headerName: "Atropine", field: "H1D1_1" },
      { headerName: "Diazepam/Lorazepam", field: "H1D1_2" },
      { headerName: "Adrenaline", field: "H1D1_3" },
      { headerName: "Charcoal activated", field: "H1D1_4" },
      { headerName: "Antisnake venom", field: "H1D1_5" },
      { headerName: "Pralidoxime (PAM)", field: "H1D1_6" },
      { headerName: "Magnesium sulphate", field: "H1D1_7" },
      { headerName: "Tetanus immunoglobulin", field: "H1D1_8" },
      { headerName: "Neostigmine", field: "H1D1_9" },
      { headerName: "Aspirin", field: "H1D1_10" },
      { headerName: "Clopidogrel", field: "H1D1_11" },
      { headerName: "Atorvastatin", field: "H1D1_12" },
      { headerName: "Misoprostol", field: "H1D1_13" },
      { headerName: "Labetalol IV", field: "H1D1_14" },
      { headerName: "Phenobarbitone", field: "H1D1_15" },
      { headerName: "Phenytoin (inj)", field: "H1D1_16" },
      { headerName: "Plasma volume expander", field: "H1D1_17" },
      { headerName: "3% Saline", field: "H1D1_18" },
      { headerName: "Dobutamine", field: "H1D1_19" },
      { headerName: "Streptokinase", field: "H1D1_20" },
      { headerName: "Tenecteplase", field: "H1D1_21" },
      { headerName: "Oxytocin", field: "H1D1_22" },
      { headerName: "Salbutamol sulphate", field: "H1D1_23" },
      { headerName: "Glucose/ 25 % dextrose", field: "H1D1_24" },
      { headerName: "Tranexamic acid", field: "H1D1_25" },
      { headerName: "tPA IV", field: "H1D1_26" },
      { headerName: "Methergine", field: "H1D1_27" },
      { headerName: "Carboprost", field: "H1D1_28" },
    ],
  },
  {
    headerName:
      "1D.2 Which of the following essential emergency equipment is available at the DH/ Tertiary Care Hospital?",
    children: [
      { headerName: "Mobile bed for Resuscitation", field: "H1D2_0" },
      {
        headerName: "Crash cart (specialized cart for resuscitation)",
        field: "H1D2_1",
      },
      { headerName: "Hard Cervical collar", field: "H1D2_2" },
      { headerName: "Oxygen cylinder/central oxygen supply", field: "H1D2_3" },
      { headerName: "Suction machine", field: "H1D2_4" },
      {
        headerName:
          "Multipara Monitor (To monitor Heart rate, BP, SPO2[Essential] ECG, Respiration Rate [Desirable] etc)",
        field: "H1D2_5",
      },
      {
        headerName: "Defibrillator with or without external pacer",
        field: "H1D2_6",
      },
      {
        headerName:
          "Toothed Forceps, Kocher Forceps, Magills forceps, Artery forceps",
        field: "H1D2_7",
      },
      { headerName: "AMBU Bag for adult and Paediatric", field: "H1D2_8" },
      {
        headerName:
          "Basic airway equipment like oropharyngeal nasopharyngeal airway, LMA for adult and pediatric",
        field: "H1D2_9",
      },
      {
        headerName:
          "Advanced laryngoscope and endotracheal tube or other similar device",
        field: "H1D2_10",
      },
      { headerName: "Tourniquet", field: "H1D2_11" },
      {
        headerName: "Pelvic binder or bed sheets with clips",
        field: "H1D2_12",
      },
      { headerName: "Laryngoscope with all sized blades", field: "H1D2_13" },
      { headerName: "Endotracheal Tubes of all sizes", field: "H1D2_14" },
      { headerName: "Laryngeal Mask Airway (LMA)", field: "H1D2_15" },
      { headerName: "Chest Tubes with Water seal drain", field: "H1D2_16" },
      { headerName: "ECG machine", field: "H1D2_17" },
      { headerName: "Nebulizer", field: "H1D2_18" },
      { headerName: "Fluid warmer", field: "H1D2_19" },
      { headerName: "Infusion pump and Syringe Drivers", field: "H1D2_20" },
      {
        headerName: "Spine board with sling and scotch tapes",
        field: "H1D2_21",
      },
      { headerName: "Splints for all types of fracture", field: "H1D2_22" },
      { headerName: "Non-invasive ventilators", field: "H1D2_23" },
      { headerName: "Invasive ventilators", field: "H1D2_24" },
      { headerName: "Incubators", field: "H1D2_25" },
    ],
  },
  {
    headerName: "1E.1 Numbers of Patients who Visited ED in Last One Month",
    children: [
      {
        field: "table2_0_Adult",
        headerName: "Adult (>18 Years)",
        // valueGetter: (params) => params.data?.table2?.[0]?.Adult,
      },
      {
        field: "table2_0_Pediatric",
        headerName: "Pediatrics",
        // valueGetter: (params) => params.data?.table2?.[0]?.Pediatric,
      },
      {
        field: "table2_0_Broughtdead",
        headerName: "Brought dead",
        // valueGetter: (params) => params.data?.table2?.[0]?.Broughtdead,
      },
      {
        field: "table2_0_Deathafterarrival",
        headerName: "Death after arrival",
        // valueGetter: (params) => params.data?.table2?.[0]?.Deathafterarrival,
      },
      {
        field: "table2_0_MLC",
        headerName: "MLC",
        // valueGetter: (params) => params.data?.table2?.[0]?.MLC,
      },
    ],
  },

  {
    headerName:
      "1E.2. Numbers of Patients Attended in ED and Deaths in in Last One Year ",
    children: [
      {
        headerName: "MI",
        children: [
          {
            headerName: "Attended",
            field: "table3_0_Attended",
            valueGetter: (params) => params.data?.table3?.[0]?.Attended,
          },
          {
            headerName: "Death",
            field: "table3_0_Death",
            valueGetter: (params) => params.data?.table3?.[0]?.Death,
          },
        ],
      },
      {
        headerName: "Stroke",
        children: [
          {
            headerName: "Attended",
            field: "table3_1_Attended",
            valueGetter: (params) => params.data?.table3?.[1]?.Attended,
          },
          {
            headerName: "Death",
            field: "table3_1_Death",
            valueGetter: (params) => params.data?.table3?.[1]?.Death,
          },
        ],
      },
      {
        headerName: "Trauma & Burns",
        children: [
          {
            headerName: "Attended",
            field: "table3_2_Attended",
            valueGetter: (params) => params.data?.table3?.[2]?.Attended,
          },
          {
            headerName: "Death",
            field: "table3_2_Death",
            valueGetter: (params) => params.data?.table3?.[2]?.Death,
          },
        ],
      },
      {
        headerName: "Poisoning",
        children: [
          {
            headerName: "Attended",
            field: "table3_3_Attended",
            valueGetter: (params) => params.data?.table3?.[3]?.Attended,
          },
          {
            headerName: "Death",
            field: "table3_3_Death",
            valueGetter: (params) => params.data?.table3?.[3]?.Death,
          },
        ],
      },
      {
        headerName: "Snake Bites",
        children: [
          {
            headerName: "Attended",
            field: "table3_4_Attended",
            valueGetter: (params) => params.data?.table3?.[4]?.Attended,
          },
          {
            headerName: "Death",
            field: "table3_4_Death",
            valueGetter: (params) => params.data?.table3?.[4]?.Death,
          },
        ],
      },
      {
        headerName: "Maternal Emergencies-PPH",
        children: [
          {
            headerName: "Attended",
            field: "table3_5_Attended",
            valueGetter: (params) => params.data?.table3?.[5]?.Attended,
          },
          {
            headerName: "Death",
            field: "table3_5_Death",
            valueGetter: (params) => params.data?.table3?.[5]?.Death,
          },
        ],
      },
      {
        headerName: "Maternal Emergencies-Eclampsia",
        children: [
          {
            headerName: "Attended",
            field: "table3_6_Attended",
            valueGetter: (params) => params.data?.table3?.[6]?.Attended,
          },
          {
            headerName: "Death",
            field: "table3_6_Death",
            valueGetter: (params) => params.data?.table3?.[6]?.Death,
          },
        ],
      },
      {
        headerName: "Neonatal Emergencies",
        children: [
          {
            headerName: "Attended",
            field: "table3_7_Attended",
            valueGetter: (params) => params.data?.table3?.[7]?.Attended,
          },
          {
            headerName: "Death",
            field: "table3_7_Death",
            valueGetter: (params) => params.data?.table3?.[7]?.Death,
          },
        ],
      },
      {
        headerName: "Acute Respiratory Illness",
        children: [
          {
            headerName: "Attended",
            field: "table3_8_Attended",
            valueGetter: (params) => params.data?.table3?.[8]?.Attended,
          },
          {
            headerName: "Death",
            field: "table3_8_Death",
            valueGetter: (params) => params.data?.table3?.[8]?.Death,
          },
        ],
      },
    ],
  },
  {
    headerName:
      "1E.3. Which services does your healthcare facility provide? (Select all that apply)",
    children: [
      {
        headerName: "Emergency operative services for Trauma patients",
        field: "E3_0",
      },
      {
        headerName:
          "Emergency operative services for Non-Trauma (Surgical, Orthopedics etc.) patients",
        field: "E3_1",
      },
      {
        headerName: "Emergency operative services for Obstetrics patients",
        field: "E3_2",
      },
      {
        headerName: "Elective Operative services for Orthopedic patients",
        field: "E3_3",
      },
      {
        headerName: "Elective Operative services for neurosurgical patients",
        field: "E3_4",
      },
      { headerName: "Common Intensive care services (ICU)", field: "E3_5" },
      { headerName: "Common High dependency Unit (HDU)", field: "E3_6" },
      { headerName: "Pediatric ICU", field: "E3_7" },
      { headerName: "Neonatal ICU", field: "E3_8" },
      { headerName: "Neurosurgery ICU", field: "E3_9" },
      { headerName: "Cardiac ICU", field: "E3_10" },
      { headerName: "Cardiac Cath lab", field: "E3_11" },
      { headerName: "Intervention Radiology", field: "E3_12" },
      {
        headerName: "Intervention neuroradiology service with DSA",
        field: "E3_13",
      },
      { headerName: "Stroke unit", field: "E3_14" },
      { headerName: "Tele-Medicine facility", field: "E3_15" },
      {
        headerName: "Other",
        field: "E3_16",
        valueGetter: (params) =>
          (params.data?.E3?.[16]?.length > 0 && "Other") || "",
      },
      { headerName: "Other Specify", field: "E3_16" },
    ],
  },
  {
    headerName:
      "1E.4 Which of these emergency diagnostic facilities are provided at DH/ Tertiary Care Hospital?",
    children: [
      { headerName: "Radiology-CT", field: "E4_0" },
      { headerName: "Radiology -ultrasound", field: "E4_1" },
      { headerName: "Radiology -MRI", field: "E4_2" },
      { headerName: "Radiology Services are functional 24X7", field: "E4_3" },
      { headerName: "Point of care lab -ABG, Troponin", field: "E4_4" },
      { headerName: "Availability of Functional ECG Services", field: "E4_5" },
      {
        headerName: "Other",
        field: "E4_6",
        valueGetter: (params) =>
          (params.data?.E4?.[params.data?.E4?.length - 1]?.length > 0 &&
            "Other") ||
          "",
      },
      { headerName: "Other Specify", field: "E4_6" },
    ],
  },
  {
    headerName:
      "1F.1 Does the hospital have a Hospital Information System (HIS)? ",
    field: "H1F1",
  },
  {
    headerName:
      "1F.2 Does this facility do complete reporting of indicators on emergency care in HMIS? ",
    field: "H1F2",
  },
  {
    headerName:
      "1F.3 How many personnel are available for managing information system? ",
    field: "H1F3",
  },
  {
    headerName:
      "1F.4 What key indicators are generated from the emergency management information system?",
    children: [
      { headerName: "Numbers by type of emergencies", field: "H1F4_0" },
      { headerName: "Length of hospital stay", field: "H1F4_1" },
      { headerName: "Turnaround time", field: "H1F4_2" },
      { headerName: "Disposal time", field: "H1F4_3" },
      { headerName: "Number of deaths", field: "H1F4_4" },
      { headerName: "Number of Referrals", field: "H1F4_5" },
    ],
  },
  {
    headerName:
      "1F.5 Whether time bound management of common emergencies is captured in MIS.  For example, Door to CT/ECG time, Door to needle time,  Time  to activate emergency alert team. If No, Skip to IF.6, otherwise answer IF. 5 ",
    field: "H1F5",
  },
  {
    headerName: "1F.6 If Yes, select all that apply and provide their value",
    children: [
      {
        headerName: "Door to CT/ECG",
        field: "H1F6_0",
        valueGetter: (params) => params.data?.H1F6?.[0]?.split(":-")[1],
      },
      // {
      //   headerName: "Time",
      //   field: "H1F6_1",
      //   valueGetter: (params) => params.data?.H1F6?.[0]?.split(":-")[1],
      // },
      {
        headerName: "Door to needle",
        field: "H1F6_2",
        valueGetter: (params) => params.data?.H1F6?.[1]?.split(":-")[1],
      },
      // {
      //   headerName: "Time",
      //   field: "H1F6_3",
      //   valueGetter: (params) => params.data?.H1F6?.[1]?.split(":-")[1],
      // },
      {
        headerName: "Time to activate emergency alert team",
        field: "H1F6_4",
        valueGetter: (params) => params.data?.H1F6?.[2]?.split(":-")[1],
      },
      // {
      //   headerName: "Time",
      //   field: "H1F6_5",
      //   valueGetter: (params) => params.data?.H1F6?.[2]?.split(":-")[1],
      // },
    ],
  },
  {
    headerName:
      "1F.7  Whether hospital administrators/ Medical Superintendent uses or reviews the data for quality improvement",
    field: "H1F7",
  },
  {
    headerName:
      "1F.8 Do you get Pre-Hospital Notification during an emergency?  ",
    field: "H1F8",
  },
  {
    headerName: "1F.9 Infrastructure for receiving internal communication? ",
    field: "H1F9",
  },
  {
    headerName: "1G.1 Whether any untied fund is available at your hospital? ",
    field: "H1G1",
  },
  {
    headerName:
      "1G.2 If Yes, whether this fund is utilized for providing emergency care services?",
    field: "H1G2",
  },
  {
    headerName: "1G.3 Whether any fund is available for emergency care? ",
    field: "H1G3",
  },
  {
    headerName:
      "1G.4 If Yes, which health schemes are covering your emergency care system?",
    field: "H1G4",
  },
  {
    headerName:
      "1G.5 Out of total patients being provided emergency care, how many were provided services under PMJAY scheme/ any other insurance scheme ",
    field: "H1G5",
  },
  {
    headerName: "1H.1.1 Do You have any Disaster Management Plan ?",
    field: "H1H1",
  },
  {
    headerName: "1H.1.2 Do you have system to Redistribution Plan?",
    field: "H1H2",
  },
  { headerName: "1H.1.3 Do you have any Evacuation Plan?", field: "H1H3" },
  {
    headerName:
      "1H.2.1 Do you have a Quality Improvement Committee? ( if yes, collect detail of Committee)",
    field: "H1H4",
  },
  {
    headerName: "1H.2.2 How frequently does this committee meet in a year? ",
    field: "H1H5",
  },
  {
    headerName:
      "1H.2.3 Do you have regular audits related to emergency care in the hospital?",
    field: "H1H6",
  },
  {
    headerName: "1H.2.4 How frequently audits are conducted in a year?",
    field: "H1H7",
  },
  {
    headerName: "1H.2.5 Types of audits conducted?",
    children: [
      { headerName: "Mortality Audit", field: "H1H8_0" },
      { headerName: "Morbidity Audit", field: "H1H8_1" },
      {
        headerName: "Other",
        field: "H1H8_2",
        valueGetter: (params) =>
          (params.data?.H1H8?.[2]?.length > 0 && "Other") || "",
      },
      {
        headerName: "Other Specify",
        field: "H1H8_2",
      },
    ],
  },
  {
    headerName:
      "1H.2.6 Any action being taken on Audit report in the last one year?",
    field: "H1H9",
  },

  {
    headerName:
      "1I.1 Indicate whether your hospital has the following documented protocols and systems (Select all that apply):",
    children: [
      {
        headerName:
          "Procedure for registration and admission of new emergency patients",
        field: "I1_0",
      },
      {
        headerName: "Procedure/Policy for receiving of referral patients",
        field: "I1_1",
      },
      { headerName: "Emergency Manual at the point of care", field: "I1_2" },
      { headerName: "Triage guidelines and protocol", field: "I1_3" },
      { headerName: "Discharge summaries for all patients", field: "I1_4" },
      {
        headerName:
          "Policy on handling cases of death (outside and inside hospital)",
        field: "I1_5",
      },
      { headerName: "Disaster management plan", field: "I1_6" },
      {
        headerName: "Triage policy/system at your emergency department",
        field: "I1_7",
      },
      { headerName: "Alert system: Code Blue", field: "I1_8" },
      { headerName: "Alert system: Trauma", field: "I1_9" },
      { headerName: "Alert system: Chest Pain", field: "I1_10" },
      { headerName: "Alert system: Sepsis", field: "I1_11" },
      { headerName: "Alert system: Stroke", field: "I1_12" },
      { headerName: "Alert system : Maternal Emergencies", field: "I1_13" },
      { headerName: "Alert system : Neonatal Emergencies", field: "I1_14" },
      {
        headerName: "Alert system : Acute Respiratory Emergencies",
        field: "I1_15",
      },
      {
        headerName: "Alert system : Snake bite and Poisoning",
        field: "I1_16",
      },
    ],
  },
  {
    headerName:
      "1I.2 Whether having Emergency condition specific SOP/STW for emergency care?",
    children: [
      {
        headerName: "MI",
        children: [
          {
            headerName: "SOP/STW",
            field: "table4_0_SOP",
            valueGetter: (params) => params.data?.table4?.[0]?.SOP,
          },
          {
            headerName: "FOLLOW SOP",
            field: "table4_0_FollowsSOP",
            valueGetter: (params) => params.data?.table4?.[0]?.FollowsSOP,
          },
        ],
      },
      {
        headerName: "Stroke",
        children: [
          {
            headerName: "SOP/STW",
            field: "table4_1_SOP",
            valueGetter: (params) => params.data?.table4?.[1]?.SOP,
          },
          {
            headerName: "FOLLOW SOP",
            field: "table4_1_FollowsSOP",
            valueGetter: (params) => params.data?.table4?.[1]?.FollowsSOP,
          },
        ],
      },
      {
        headerName: "Trauma & Burns",
        children: [
          {
            headerName: "SOP/STW",
            field: "table4_2_SOP",
            valueGetter: (params) => params.data?.table4?.[2]?.SOP,
          },
          {
            headerName: "FOLLOW SOP",
            field: "table4_2_FollowsSOP",
            valueGetter: (params) => params.data?.table4?.[2]?.FollowsSOP,
          },
        ],
      },
      {
        headerName: "Poisoning",
        children: [
          {
            headerName: "SOP/STW",
            field: "table4_3_SOP",
            valueGetter: (params) => params.data?.table4?.[3]?.SOP,
          },
          {
            headerName: "FOLLOW SOP",
            field: "table4_3_FollowsSOP",
            valueGetter: (params) => params.data?.table4?.[3]?.FollowsSOP,
          },
        ],
      },
      {
        headerName: "Snake Bites",
        children: [
          {
            headerName: "SOP/STW",
            field: "table4_4_SOP",
            valueGetter: (params) => params.data?.table4?.[4]?.SOP,
          },
          {
            headerName: "FOLLOW SOP",
            field: "table4_4_FollowsSOP",
            valueGetter: (params) => params.data?.table4?.[4]?.FollowsSOP,
          },
        ],
      },
      {
        headerName: "Maternal Emergencies-PPH",
        children: [
          {
            headerName: "SOP/STW",
            field: "table4_5_SOP",
            valueGetter: (params) => params.data?.table4?.[5]?.SOP,
          },
          {
            headerName: "FOLLOW SOP",
            field: "table4_5_FollowsSOP",
            valueGetter: (params) => params.data?.table4?.[5]?.FollowsSOP,
          },
        ],
      },
      {
        headerName: "Maternal Emergencies- Eclampsia",
        children: [
          {
            headerName: "SOP/STW",
            field: "table4_6_SOP",
            valueGetter: (params) => params.data?.table4?.[6]?.SOP,
          },
          {
            headerName: "FOLLOW SOP",
            field: "table4_6_FollowsSOP",
            valueGetter: (params) => params.data?.table4?.[6]?.FollowsSOP,
          },
        ],
      },
      {
        headerName: "Neonatal Emergencies",
        children: [
          {
            headerName: "SOP/STW",
            field: "table4_7_SOP",
            valueGetter: (params) => params.data?.table4?.[7]?.SOP,
          },
          {
            headerName: "FOLLOW SOP",
            field: "table4_7_FollowsSOP",
            valueGetter: (params) => params.data?.table4?.[7]?.FollowsSOP,
          },
        ],
      },
      {
        headerName: "Acute Respiratory Illness",
        children: [
          {
            headerName: "SOP/STW",
            field: "table4_8_SOP",
            valueGetter: (params) => params.data?.table4?.[8]?.SOP,
          },
          {
            headerName: "FOLLOW SOP",
            field: "table4_8_FollowsSOP",
            valueGetter: (params) => params.data?.table4?.[8]?.FollowsSOP,
          },
        ],
      },
    ],
  },
  {
    headerName:
      "1J.1 Does this facility have policies and procedures which guide the referral of patients from other hospitals?",
    field: "H1J1",
  },
  {
    headerName:
      "1J.2 Does this facility have any policies and procedures which guide the transfer- out/referral of stable and unstable patients after stabilization to another facility with documentation?",
    field: "H1J2",
  },
];

export const HFAT1Columns = generateColumns(columns);
