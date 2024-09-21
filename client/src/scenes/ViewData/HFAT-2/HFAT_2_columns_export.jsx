import generateColumns from "./../generateColumns";
export const columns = [
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
  { field: "H2A9_latitude", headerName: "2A.9 : GPS_1" },
  { field: "H2A9_longitude", headerName: "2A.9 : GPS_2" },
  { field: "H2A9_district", headerName: "2A.9 District" },
  { field: "H2A9_state", headerName: "3A.9 State" },
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
    field: "H2B7_0",
    headerName:
      "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Emergency Registration Counter)",
  },
  {
    field: "H2B7_1",
    headerName:
      "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Computerized Registration)",
  },
  {
    field: "H2B7_2",
    headerName:
      "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Triage Area)",
  },
  {
    field: "H2B7_3",
    headerName:
      "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Resuscitation Area)",
  },
  {
    field: "H2B7_4",
    headerName:
      "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Decontamination Facility)",
  },
  {
    field: "H2B7_5",
    headerName:
      "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Security Services)",
  },
  {
    field: "H2B7_6",
    headerName:
      "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Designated Parking Area for Ambulance)",
  },
  {
    field: "H2B7_7",
    headerName:
      "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Smooth Entry for Wheelchair Trolley and Stretcher Bay)",
  },
  {
    field: "H2B7_8",
    headerName:
      "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Waiting Area for patients & Attendants.)",
  },
  {
    field: "H2B7_9",
    headerName:
      "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Plaster Room/Suturing Room/Minor OT)",
  },
  {
    field: "H2B7_10",
    headerName:
      "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Emergency OT)",
  },
  {
    field: "H2B7_11",
    headerName:
      "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Dedicated Isolation rooms)",
  },
  {
    field: "H2B7_12",
    headerName:
      "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Point of Care Lab)",
  },
  {
    field: "H2B7_13",
    headerName:
      "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Blood storage unit)",
  },
  {
    field: "H2B7_14",
    headerName:
      "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice= Point of care ultrasound)",
  },
  {
    field: "H2B7_15",
    headerName:
      "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Radiology service-X ray , Ultrasound.)",
  },
  {
    field: "H2B7_16",
    headerName:
      "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Demarcated Duty Rooms for Doctors and Nurses)",
  },
  {
    field: "H2B7_17",
    headerName:
      "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Area to Keep Dead Bodies)",
  },
  {
    field: "H2B7_18",
    headerName:
      "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible)(Tele-Medicine Facility)",
  },
  {
    field: "H2B8_0",
    headerName:
      "2B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments? (choice=Services Provided to the patients are clearly defined, displayed prominrntly.)",
  },
  {
    field: "H2B8_1",
    headerName:
      "2B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments? (choice=Name of doctor and nursing staff on duty are displayed and updates.)",
  },
  {
    field: "H2B8_2",
    headerName:
      "2B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments? (choice=List of available drugs are displayed.)",
  },
  {
    field: "H2B8_3",
    headerName:
      "2B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments? (choice=All the relevant information is displayed for the patients and visitors including user charges wherever applicable at the time of procedure/ investigation/admission.)",
  },
  {
    field: "H2B8_4",
    headerName:
      "2B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments? (choice=Important contact numbers including ambulance, blood bank, police and referral centers displayed..)",
  },
  {
    field: "H2B8_5",
    headerName:
      "2B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments? (choice=Display of citizen's charter.)",
  },
  {
    field: "H2B8_6",
    headerName:
      "2B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments? (choice=other)",
    valueGetter: (params) =>
      params.data?.H2B8?.[6]?.length > 0 ? "Other" : "",
  },
  {
    field: "H2B8_6",
    headerName:
      "2B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments? (Other Specify)",
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
    field: "table1_0_Manpower",
    headerName:
      "2C.1 : Which of the following manpower is available at the CHC? (Physician/Family Medicine Specialist)(Manpower)",
  },
  {
    field: "table1_0_Number",
    headerName:
      "2C.1 : Which of the following manpower is available at the CHC? (Physician/Family Medicine Specialist) (Number)",
  },
  {
    field: "table1_0_Availability",
    headerName:
      "2C.1 : Which of the following manpower is available at the CHC? (Physician/Family Medicine Specialist) (availability24 X 7)",
  },
  {
    field: "table1_0_OnSite",
    headerName:
      "2C.1 : Which of the following manpower is available at the CHC? (Physician/Family Medicine Specialist) (onSiteAvailability)",
  },
  {
    field: "table1_0_OnCall",
    headerName:
      "2C.1 : Which of the following manpower is available at the CHC? (Physician/Family Medicine Specialist) (onCallAvailability)",
  },
  {
    field: "table1_1_Manpower",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Surgeon) (Manpower)",
  },
  {
    field: "table1_1_Number",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Surgeon) (Number)",
  },
  {
    field: "table1_1_Availability",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Surgeon) (availability24 X 7)",
  },
  {
    field: "table1_1_OnSite",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Surgeon) (onSiteAvailability)",
  },
  {
    field: "table1_1_OnCall",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Surgeon) (onCallAvailability)",
  },
  {
    field: "table1_2_Manpower",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Obsterician & Gynecologist) (Manpower)",
  },
  {
    field: "table1_2_Number",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Obsterician & Gynecologist) (Number)",
  },
  {
    field: "table1_2_Availability",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Obsterician & Gynecologist) (availability24 X 7)",
  },
  {
    field: "table1_2_OnSite",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Obsterician & Gynecologist) (onSiteAvailability)",
  },
  {
    field: "table1_2_OnCall",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Obsterician & Gynecologist) (onCallAvailability)",
  },
  {
    field: "table1_3_Manpower",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Pediatrician) (Manpower)",
  },
  {
    field: "table1_3_Number",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Pediatrician) (Number)",
  },
  {
    field: "table1_3_Availability",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Pediatrician) (availability24 X 7)",
  },
  {
    field: "table1_3_OnSite",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Pediatrician) (onSiteAvailability)",
  },
  {
    field: "table1_3_OnCall",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Pediatrician) (onCallAvailability)",
  },
  {
    field: "table1_4_Manpower",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Anesthesiologist) (Manpower)",
  },
  {
    field: "table1_4_Number",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Anesthesiologist) (Number)",
  },
  {
    field: "table1_4_Availability",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Anesthesiologist) (availability24 X 7)",
  },
  {
    field: "table1_4_OnSite",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Anesthesiologist) (onSiteAvailability)",
  },
  {
    field: "table1_4_OnCall",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Anesthesiologist) (onCallAvailability)",
  },
  {
    field: "table1_5_Manpower",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Ophthalmologist) (Manpower)",
  },
  {
    field: "table1_5_Number",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Ophthalmologist) (Number)",
  },
  {
    field: "table1_5_Availability",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Ophthalmologist) (availability24 X 7)",
  },
  {
    field: "table1_5_OnSite",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Ophthalmologist) (onSiteAvailability)",
  },
  {
    field: "table1_5_OnCall",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Ophthalmologist) (onCallAvailability)",
  },
  {
    field: "table1_6_Manpower",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Orthopaedician) (Manpower)",
  },
  {
    field: "table1_6_Number",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Orthopaedician) (Number)",
  },
  {
    field: "table1_6_Availability",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Orthopaedician) (availability24 X 7)",
  },
  {
    field: "table1_6_OnSite",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Orthopaedician) (onSiteAvailability)",
  },
  {
    field: "table1_6_OnCall",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Orthopaedician) (onCallAvailability)",
  },
  {
    field: "table1_7_Manpower",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (ENT) (Manpower)",
  },
  {
    field: "table1_7_Number",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (ENT) (Number)",
  },
  {
    field: "table1_7_Availability",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (ENT) (availability24 X 7)",
  },
  {
    field: "table1_7_OnSite",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (ENT) (onSiteAvailability)",
  },
  {
    field: "table1_7_OnCall",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (ENT) (onCallAvailability)",
  },
  {
    field: "table1_8_Manpower",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Microbiologist/Pathologist/Biochemist) (Manpower)",
  },
  {
    field: "table1_8_Number",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Microbiologist/Pathologist/Biochemist) (Number)",
  },
  {
    field: "table1_8_Availability",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Microbiologist/Pathologist/Biochemist) (availability24 X 7)",
  },
  {
    field: "table1_8_OnSite",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Microbiologist/Pathologist/Biochemist) (onSiteAvailability)",
  },
  {
    field: "table1_8_OnCall",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Microbiologist/Pathologist/Biochemist) (onCallAvailability)",
  },
  {
    field: "table1_9_Manpower",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (GDMO) (Manpower)",
  },
  {
    field: "table1_9_Number",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (GDMO) (Number)",
  },
  {
    field: "table1_9_Availability",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (GDMO) (availability24 X 7)",
  },
  {
    field: "table1_9_OnSite",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (GDMO) (onSiteAvailability)",
  },
  {
    field: "table1_9_OnCall",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (GDMO) (onCallAvailability)",
  },
  {
    field: "table1_10_Manpower",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Nurses) (Manpower)",
  },
  {
    field: "table1_10_Number",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Nurses) (Number)",
  },
  {
    field: "table1_10_Availability",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Nurses) (availability24 X 7)",
  },
  {
    field: "table1_10_OnSite",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Nurses) (onSiteAvailability)",
  },
  {
    field: "table1_10_OnCall",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Nurses) (onCallAvailability)",
  },
  {
    field: "table1_11_Manpower",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Data entry operator) (Manpower)",
  },
  {
    field: "table1_11_Number",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Data entry operator) (Number)",
  },
  {
    field: "table1_11_Availability",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Data entry operator) (availability24 X 7)",
  },
  {
    field: "table1_11_OnSite",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Data entry operator) (onSiteAvailability)",
  },
  {
    field: "table1_11_OnCall",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Data entry operator) (onCallAvailability)",
  },
  {
    field: "table1_12_Manpower",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (ECG technician) (Manpower)",
  },
  {
    field: "table1_12_Number",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (ECG technician) (Number)",
  },
  {
    field: "table1_12_Availability",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (ECG technician) (availability24 X 7)",
  },
  {
    field: "table1_12_OnSite",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (ECG technician) (onSiteAvailability)",
  },
  {
    field: "table1_12_OnCall",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (ECG technivian) (onCallAvailability)",
  },
  {
    field: "table1_13_Manpower",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (MLT) (Manpower)",
  },
  {
    field: "table1_13_Number",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (MLT) (Number)",
  },
  {
    field: "table1_13_Availability",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (MLT) (availability24 X 7)",
  },
  {
    field: "table1_13_OnSite",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (MLT) (onSiteAvailability)",
  },
  {
    field: "table1_13_OnCall",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (MLT) (onCallAvailability)",
  },
  {
    field: "table1_14_Manpower",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Pharmacist) (Manpower)",
  },
  {
    field: "table1_14_Number",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Pharmacist) (Number)",
  },
  {
    field: "table1_14_Availability",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Pharmacist) (availability24 X 7)",
  },
  {
    field: "table1_14_OnSite",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Pharmacist) (onSiteAvailability)",
  },
  {
    field: "table1_14_OnCall",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Pharmacist) (onCallAvailability)",
  },
  {
    field: "table1_15_Manpower",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Radiology technician) (Manpower)",
  },
  {
    field: "table1_15_Number",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Radiology technician) (Number)",
  },
  {
    field: "table1_15_Availability",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Radiology technician) (availability24 X 7)",
  },
  {
    field: "table1_15_OnSite",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Radiology technician) (onSiteAvailability)",
  },
  {
    field: "table1_15_OnCall",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Radiology technician) (onCallAvailability)",
  },
  {
    field: "table1_16_Manpower",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Others) (Manpower)",
  },
  {
    field: "table1_16_Manpower(other specify)",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Others Specify) (Manpower)",
  },
  {
    field: "table1_16_Availability",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Others) (Number)",
  },
  {
    field: "table1_16_OnSite",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Others) (availability24 X 7)",
  },
  {
    field: "table1_16_OnCall",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Others) (onSiteAvailability)",
  },
  {
    field: "H2C2",
    headerName:
      "2C.1 Tick the manpower available in your emergency department and provide (Others) (onCallAvailability)",
  },
  {
    field: "H2C2",
    headerName:
      "2C.2 Whether training for emergency care management is being conducted for the staff in the institution?",
  },
  {
    field: "H2C3_0",
    headerName:
      "2C.3 Which of the following emergency care trainings you have undergone? (choice = Trauma & Accidental Injuries)",
  },
  {
    field: "H2C3_1",
    headerName:
      "2C.3 Which of the following emergency care trainings you have undergone? (choice = Burns)",
  },
  {
    field: "H2C3_2",
    headerName:
      "2C.3 Which of the following emergency care trainings you have undergone? (choice = Cardiac emergencies: acute chest pain, acute coronary syndrome (ACS)/ STEMI, Heart failure, Cardiac Arrest)",
  },
  {
    field: "H2C3_3",
    headerName:
      "2C.3 Which of the following emergency care trainings you have undergone? (choice = Stroke)",
  },
  {
    field: "H2C3_4",
    headerName:
      "2C.3 Which of the following emergency care trainings you have undergone? (choice = Acute Breathlessness)",
  },
  {
    field: "H2C3_5",
    headerName:
      "2C.3 Which of the following emergency care trainings you have undergone? (choice = Seizures)",
  },
  {
    field: "H2C3_6",
    headerName:
      "2C.3 Which of the following emergency care trainings you have undergone? (choice = Bites (Animal bite/snake bite/scorpion sting))",
  },
  {
    field: "H2C3_7",
    headerName:
      "2C.3 Which of the following emergency care trainings you have undergone? (choice = Choking/foreign body ingestion)",
  },
  {
    field: "H2C3_8",
    headerName:
      "2C.3 Which of the following emergency care trainings you have undergone? (choice = Poisoning)",
  },
  {
    field: "H2C3_9",
    headerName:
      "2C.3 Which of the following emergency care trainings you have undergone? (choice = PPH)",
  },
  {
    field: "H2C3_10",
    headerName:
      "2C.3 Which of the following emergency care trainings you have undergone? (choice = Pre-Eclampsia)",
  },
  {
    field: "H2C3_11",
    headerName:
      "2C.3 Which of the following emergency care trainings you have undergone? (choice = Neonatal emergencies)",
  },
  {
    field: "H2C3_12",
    headerName:
      "2C.3 Which of the following emergency care trainings you have undergone? (choice = Other)",
    valueGetter: (params) =>
      params.data?.H2C3?.[12]?.length > 0 ? "Other" : "",
  },
  {
    field: "H2C3_12",
    headerName:
      "2C.3 Which of the following emergency care trainings you have undergone? (Other Specify)",
  },
  {
    field: "H2C4_0",
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
    field: "H2D1_0",
    headerName:
      "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Oxygen medicinal gas)",
  },
  {
    field: "H2D1_1",
    headerName:
      "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Atropine)",
  },
  {
    field: "H2D1_2",
    headerName:
      "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Diazepam/Lorazepam)",
  },
  {
    field: "H2D1_3",
    headerName:
      "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Adrenaline)",
  },
  {
    field: "H2D1_4",
    headerName:
      "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Charcoal activated)",
  },
  {
    field: "H2D1_5",
    headerName:
      "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Antisnake venom)",
  },
  {
    field: "H2D1_6",
    headerName:
      "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Pralidoxime (PAM))",
  },
  {
    field: "H2D1_7",
    headerName:
      "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Magnesium sulphate)",
  },
  {
    field: "H2D1_8",
    headerName:
      "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Tetanus immunoglobulin)",
  },
  {
    field: "H2D1_9",
    headerName:
      "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Neostigmine)",
  },
  {
    field: "H2D1_10",
    headerName:
      "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Aspirin)",
  },
  {
    field: "H2D1_11",
    headerName:
      "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Clopidogrel)",
  },
  {
    field: "H2D1_12",
    headerName:
      "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Atorvastatin)",
  },
  {
    field: "H2D1_13",
    headerName:
      "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Misoprostol)",
  },
  {
    field: "H2D1_14",
    headerName:
      "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Labetalol IV)",
  },
  {
    field: "H2D1_15",
    headerName:
      "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Phenobarbitone)",
  },
  {
    field: "H2D1_16",
    headerName:
      "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Phenytoin (inj))",
  },
  {
    field: "H2D1_17",
    headerName:
      "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Plasma volume expander)",
  },
  {
    field: "H2D1_18",
    headerName:
      "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = 3% Saline)",
  },
  {
    field: "H2D1_19",
    headerName:
      "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Dobutamine)",
  },
  {
    field: "H2D1_20",
    headerName:
      "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Streptokinase)",
  },
  {
    field: "H2D1_21",
    headerName:
      "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Tenecteplase)",
  },
  {
    field: "H2D1_22",
    headerName:
      "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Oxytocin)",
  },
  {
    field: "H2D1_23",
    headerName:
      "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Salbutamol sulphate)",
  },
  {
    field: "H2D1_24",
    headerName:
      "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Glucose/ 25 % dextrose)",
  },
  {
    field: "H2D1_25",
    headerName:
      "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Tranexamic acid)",
  },
  {
    field: "H2D1_26",
    headerName:
      "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = tPA IV)",
  },
  {
    field: "H2D1_27",
    headerName:
      "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Methergine)",
  },
  {
    field: "H2D1_28",
    headerName:
      "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Carboprost)",
  },
  {
    field: "H2D2_0",
    headerName:
      "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Mobile bed for Resuscitation)",
  },
  {
    field: "H2D2_1",
    headerName:
      "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Crash Cart (specialized cart for resuscitation))",
  },
  {
    field: "H2D2_2",
    headerName:
      "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Hard Cervical Collar)",
  },
  {
    field: "H2D2_3",
    headerName:
      "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Oxygen Cylinder/Central Oxygen Supply)",
  },
  {
    field: "H2D2_4",
    headerName:
      "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Suction Machine)",
  },
  {
    field: "H2D2_5",
    headerName:
      "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Multipara Monitor (To monitor Heart rate, BP, SPO2[Essential] ECG, Respiration Rate [Desirable] etc))",
  },
  {
    field: "H2D2_6",
    headerName:
      "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Defibrillator with or without external pacer)",
  },
  {
    field: "H2D2_7",
    headerName:
      "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Toothed Forceps, Kocher Forceps, Magill's forceps, Artery forceps)",
  },
  {
    field: "H2D2_8",
    headerName:
      "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = AMBU Bag for adult and Paediatric)",
  },
  {
    field: "H2D2_9",
    headerName:
      "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Basic airway equipment like oropharyngeal nasopharyngeal airway, LMA for adult and pediatric)",
  },
  {
    field: "H2D2_10",
    headerName:
      "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Advanced laryngoscope and endotracheal tube or other similar device)",
  },
  {
    field: "H2D2_11",
    headerName:
      "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Tourniquet)",
  },
  {
    field: "H2D2_12",
    headerName:
      "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Pelvic binder or bed sheets with clips)",
  },
  {
    field: "H2D2_13",
    headerName:
      "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Laryngoscope with all sized blades)",
  },
  {
    field: "H2D2_14",
    headerName:
      "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Endotracheal Tubes of all sizes)",
  },
  {
    field: "H2D2_15",
    headerName:
      "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Laryngeal Mask Airway (LMA))",
  },
  {
    field: "H2D2_16",
    headerName:
      "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Chest Tubes with Water seal drain)",
  },
  {
    field: "H2D2_17",
    headerName:
      "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = ECG Machine)",
  },
  {
    field: "H2D2_18",
    headerName:
      "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Nebulizer)",
  },
  {
    field: "H2D2_19",
    headerName:
      "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Fluid Warmer)",
  },
  {
    field: "H2D2_20",
    headerName:
      "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Infusion pump and Syringe Drivers)",
  },
  {
    field: "H2D2_21",
    headerName:
      "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Spine board with sling and scotch tapes)",
  },
  {
    field: "H2D2_22",
    headerName:
      "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Splints for all types of fracture)",
  },
  {
    field: "H2D2_23",
    headerName:
      "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Non-invasive Ventilators)",
  },
  {
    field: "H2D2_24",
    headerName:
      "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Invasive Ventilators)",
  },
  {
    field: "H2D2_25",
    headerName:
      "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Incubators)",
  },
  {
    field: "table2_0_Adult",
    headerName:
      "2E.1 : Numbers of Patients who Visited ED in Last One Month (Adult (> 18Years))",
  },
  {
    field: "table2_0_Pediatric",
    headerName:
      "2E.1 : Numbers of Patients who Visited ED in Last One Month (Pediatric)",
  },
  {
    field: "table2_0_Broughtdead",
    headerName:
      "2E.1 : Numbers of Patients who Visited ED in Last One Month (Brought dead)",
  },
  {
    field: "table2_0_Deathafterarrival",
    headerName:
      "2E.1 : Numbers of Patients who Visited ED in Last One Month (Death after arrival)",
  },
  {
    field: "table2_0_MLC",
    headerName:
      "2E.1 : Numbers of Patients who Visited ED in Last One Month (MLC)",
  },
  {
    field: "table3_0_Attended",
    headerName:
      "2E.2 : Numbers of Patients who Visited ED in Last One Month (MI - Attended)",
  },
  {
    field: "table3_0_Death",
    headerName:
      "2E.2 : Numbers of Patients who Visited ED in Last One Month (MI - Death)",
  },
  {
    field: "table3_1_Attended",
    headerName:
      "2E.2 : Numbers of Patients who Visited ED in Last One Month (Stroke - Attended)",
  },
  {
    field: "table3_1_Death",
    headerName:
      "2E.2 : Numbers of Patients who Visited ED in Last One Month (Strok - Death)",
  },
  {
    field: "table3_2_Attended",
    headerName:
      "2E.2 : Numbers of Patients who Visited ED in Last One Month (Trauma & Burns - Attended)",
  },
  {
    field: "table3_2_Death",
    headerName:
      "2E.2 : Numbers of Patients who Visited ED in Last One Month (Trauma & Burn - Death)",
  },
  {
    field: "table3_3_Attended",
    headerName:
      "2E.2 : Numbers of Patients who Visited ED in Last One Month (Poisoning - Attended)",
  },
  {
    field: "table3_3_Death",
    headerName:
      "2E.2 : Numbers of Patients who Visited ED in Last One Month (Poisoning - Death)",
  },
  {
    field: "table3_4_Attended",
    headerName:
      "2E.2 : Numbers of Patients who Visited ED in Last One Month (Snake Bite - Attended)",
  },
  {
    field: "table3_4_Death",
    headerName:
      "2E.2 : Numbers of Patients who Visited ED in Last One Month (Snake Bit - Death)",
  },
  {
    field: "table3_5_Attended",
    headerName:
      "2E.2 : Numbers of Patients who Visited ED in Last One Month (Maternal Emergencies-PPH - Attended)",
  },
  {
    field: "table3_5_Death",
    headerName:
      "2E.2 : Numbers of Patients who Visited ED in Last One Month (Maternal Emergencies-PPH - Death)",
  },
  {
    field: "table3_6_Attended",
    headerName:
      "2E.2 : Numbers of Patients who Visited ED in Last One Month (Maternal Emergencies-Eclampsia - Attended)",
  },
  {
    field: "table3_6_Death",
    headerName:
      "2E.2 : Numbers of Patients who Visited ED in Last One Month (Maternal Emergencies-Eclampsia - Death)",
  },
  {
    field: "table3_7_Attended",
    headerName:
      "2E.2 : Numbers of Patients who Visited ED in Last One Month (Neontal Emergencies - Attended)",
  },
  {
    field: "table3_7_Death",
    headerName:
      "2E.2 : Numbers of Patients who Visited ED in Last One Month (Neontal Emergencies - Death)",
  },
  {
    field: "table3_8_Attended",
    headerName:
      "2E.2 : Numbers of Patients who Visited ED in Last One Month (Acute Respiratory Illness - Attended)",
  },
  {
    field: "table3_8_Death",
    headerName:
      "2E.2 : Numbers of Patients who Visited ED in Last One Month (Acute Respiratory Illnes - Death)",
  },
  {
    field: "H2E3_0",
    headerName:
      "2E.3 Which of the following emergency services are delivered at the CHC? (Multiple answers possible) (choice=Triage)",
  },
  {
    field: "H2E3_1",
    headerName:
      "2E.3 Which of the following emergency services are delivered at the CHC? (Multiple answers possible) (choice=Resuscitation)",
  },
  {
    field: "H2E3_2",
    headerName:
      "2E.3 Which of the following emergency services are delivered at the CHC? (Multiple answers possible) (choice=Medico-legal Reporting)",
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
    field: "H2F4_0",
    headerName:
      "2F.4 What key indicators are generated from the emergency management information system? (choice=Numbers by type of emergencies)",
  },
  {
    field: "H2F4_1",
    headerName:
      "2F.4 What key indicators are generated from the emergency management information system? (choice=Length of hospital stay)",
  },
  {
    field: "H2F4_2",
    headerName:
      "2F.4 What key indicators are generated from the emergency management information system? (choice=Turn around time)",
  },
  {
    field: "H2F4_3",
    headerName:
      "2F.4 What key indicators are generated from the emergency management information system? (choice=Disposal time)",
  },
  {
    field: "H2F4_4",
    headerName:
      "2F.4 What key indicators are generated from the emergency management information system? (choice=Number of deaths)",
  },
  {
    field: "H2F4_5",
    headerName:
      "2F.4 What key indicators are generated from the emergency management information system? (choice=Number of Referrals)",
  },
  {
    field: "H2F5",
    headerName:
      "2F.5 Whether time bound management of common emergencies is captured in MIS.",
  },
  {
    field: "H2F6_0",
    headerName:
      "2F.6 Which of the following alet systems does your facility have? (choice = Code blue alert system)",
  },
  {
    field: "H2F6_1",
    headerName:
      "2F.6 Which of the following alet systems does your facility have? (choice = STEMI alert system)",
  },
  {
    field: "H2F6_2",
    headerName:
      "2F.6 Which of the following alet systems does your facility have? (choice = Stroke alert system)",
  },
  {
    field: "H2F6_3",
    headerName:
      "2F.6 Which of the following alet systems does your facility have? (choice = Trauma alert system)",
  },
  {
    field: "H2F7",
    headerName:
      "2F.7 Whether Medical Officer In charge (MO/IC) uses or reviews the data for quality improvement",
  },
  {
    field: "H2F8_0",
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
    field: "H2G4_0",
    headerName:
      "2G.4 If funds are available, which health protection schemes are covering your emergency care system? (choice = PMJAY)",
    valueGetter: (params) => (params.data?.H2G4 == "PMJAY" ? "PMJAY" : ""),
  },
  {
    field: "H2G4_1",
    headerName:
      "2G.4 If funds are available, which health protection schemes are covering your emergency care system? (choice = RKS)",
    valueGetter: (params) => (params.data?.H2G4 == "RKS" ? "RKS" : ""),
  },
  {
    field: "H2G4_2",
    headerName:
      "2G.4 If funds are available, which health protection schemes are covering your emergency care system? (choice = other)",
    valueGetter: (params) =>
      params.data?.H2G4?.split("_")?.[1]?.length > 0 ? "Other" : "",
  },
  {
    field: "H2G4_3",
    headerName:
      "2G.4 If funds are available, which health protection schemes are covering your emergency care system? (Other specify)",
    valueGetter: (params) => params.data?.H2G4?.split("_")?.[1],
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
    field: "H2H8_0",
    headerName: "2H.2.5 Types of audits conducted? (choice = Mortality Audit)",
  },
  {
    field: "H2H8_1",
    headerName: "2H.2.5 Types of audits conducted? (choice = Morbidity Audit)",
  },
  {
    field: "H2H8_2",
    headerName: "2H.2.5 Types of audits conducted? (choice = other)",
  },
  {
    field: "H2H8_3",
    headerName: "2H.2.5 Types of audits conducted? (Other Specify)",
  },
  {
    field: "H2H9",
    headerName:
      "2H.2.6 Any action being taken on Audit report in the last one year?",
  },
  {
    field: "H2I1_0",
    headerName:
      "2I.1 What types of registers are maintained at the CHC? (Multiple answers possible) (choice=OPD/Treatment Register)",
  },
  {
    field: "H2I1_1",
    headerName:
      "2I.1 What types of registers are maintained at the CHC? (Multiple answers possible) (choice=Inventory Register)",
  },
  {
    field: "H2I1_2",
    headerName:
      "2I.1 What types of registers are maintained at the CHC? (Multiple answers possible) (choice=Procedure Register)",
  },
  {
    field: "H2I1_3",
    headerName:
      "2I.1 What types of registers are maintained at the CHC? (Multiple answers possible) (choice=Referral Register)",
  },
  {
    field: "H2I1_4",
    headerName:
      "2I.1 What types of registers are maintained at the CHC? (Multiple answers possible) (choice=Record for handing over and taking over of critical care equipment.)",
  },
  {
    field: "H2I1_5",
    headerName:
      "2I.1 What types of registers are maintained at the CHC? (Multiple answers possible) (choice=Medico-legal register)",
  },
  {
    field: "H2I1_6",
    headerName:
      "2I.1 What types of registers are maintained at the CHC? (Multiple answers possible) (choice=Death Register)",
  },
  {
    field: "H2I1_7",
    headerName:
      "2I.1 What types of registers are maintained at the CHC? (Multiple answers possible) (choice=Patient/Community feedback register)",
  },
  {
    field: "H2I1_8",
    headerName:
      "2I.1 What types of registers are maintained at the CHC? (Multiple answers possible) (choice=other)",
    valueGetter: (params) =>
      params.data?.H2I1?.[8]?.length > 0 ? "Other" : "",
  },
  {
    field: "H2I1_8",
    headerName:
      "2I.1 What types of registers are maintained at the CHC? (Other specify)",
  },
  {
    field: "H2I2_0",
    headerName:
      "2I.2 Which of the following SOPs for the management of common medical emergencies are followed at your CHC? (Select all that apply) (choice=Documents triage guidelines and protocols)",
  },
  {
    field: "H2I2_1",
    headerName:
      "2I.2 Which of the following SOPs for the management of common medical emergencies are followed at your CHC? (Select all that apply) (choice=Standard treatment protocols for emergencies.)",
  },
  {
    field: "H2I2_2",
    headerName:
      "2I.2 Which of the following SOPs for the management of common medical emergencies are followed at your CHC? (Select all that apply) (choice=Transfer policies and procedures.)",
  },
  {
    field: "H2I2_3",
    headerName:
      "2I.2 Which of the following SOPs for the management of common medical emergencies are followed at your CHC? (Select all that apply) (choice=Disaster Management Plan.)",
  },
  {
    field: "H2I2_4",
    headerName:
      "2I.2 Which of the following SOPs for the management of common medical emergencies are followed at your CHC? (Select all that apply) (choice=Policies for handling cases opf death)",
  },
  {
    field: "table4_0_SOP",
    headerName:
      "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (MI - SOP/STW)",
  },
  {
    field: "table4_0_FollowsSOP",
    headerName:
      "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (MI - Follows SOP)",
  },
  {
    field: "table4_1_SOP",
    headerName:
      "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Stroke - SOP/STW)",
  },
  {
    field: "table4_1_FollowsSOP",
    headerName:
      "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Stroke - Follows SOP)",
  },
  {
    field: "table4_2_SOP",
    headerName:
      "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Trauma & Burns - SOP/STW)",
  },
  {
    field: "table4_2_FollowsSOP",
    headerName:
      "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Trauma & Burns - Follows SOP)",
  },
  {
    field: "table4_3_SOP",
    headerName:
      "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Poisoning - SOP/STW)",
  },
  {
    field: "table4_3_FollowsSOP",
    headerName:
      "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Poisoning - Follows SOP)",
  },
  {
    field: "table4_4_SOP",
    headerName:
      "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Snake Bites - SOP/STW)",
  },
  {
    field: "table4_4_FollowsSOP",
    headerName:
      "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Snake Bites - Follows SOP)",
  },
  {
    field: "table4_5_SOP",
    headerName:
      "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Maternal Emergencies-PPH - SOP/STW)",
  },
  {
    field: "table4_5_FollowsSOP",
    headerName:
      "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Maternal Emergencies-PPH - Follows SOP)",
  },
  {
    field: "table4_6_SOP",
    headerName:
      "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Maternal Emergencies-Eclampsia - SOP/STW)",
  },
  {
    field: "table4_6_FollowsSOP",
    headerName:
      "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Maternal Emergencies-Eclampsia - Follows SOP)",
  },
  {
    field: "table4_7_SOP",
    headerName:
      "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Neonatal Emergencies - SOP/STW)",
  },
  {
    field: "table4_7_FollowsSOP",
    headerName:
      "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Neonatal Emergencies - Follows SOP)",
  },
  {
    field: "table4_8_SOP",
    headerName:
      "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Acute Respiratory Illness - SOP/STW)",
  },
  {
    field: "table4_8_FollowsSOP",
    headerName:
      "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Acute Respiratory Illness - Follows SOP)",
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
export const HFAT2ColumnsExport = generateColumns(columns);
