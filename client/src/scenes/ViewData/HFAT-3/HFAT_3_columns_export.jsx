import generateColumns from "../generateColumns";
import getOptionsIndex from "./../getOptionsIndex";

// Column Definitions: Defines the columns to be displayed.
const columns = [
  {
    field: "_id",
    headerName: "Record ID",
    checkboxSelection: true,
    headerCheckboxSelection: true,
    valueGetter: (params) => params.data?._id,
  },
  {
    field: "H3A2",
    headerName: "Unique Code",
  },
  { field: "H3A1", headerName: "3A.1 Assessor's Name:" },
  {
    field: "date",
    headerName: "Date:",
    valueFormatter: (params) => params.data?.HFAT3_DATE,
  },
  {
    field: "H3A2",
    headerName: "3A.2 State:",
    valueFormatter: (params) =>
      `${params.value.split("_")[0]}_${params.value.split("_")[1]}`,
  },
  { field: "H3A3", headerName: "3A.3 Block Name:" },
  { field: "H3A4", headerName: "3A.4 Healthcare Facility Name" },
  { field: "H3A5", headerName: "3A.5 Healthcare Facility Address" },
  { field: "H3A6", headerName: "3A.6 Name of the Medical Officer" },
  { field: "H3A7", headerName: "3A.7 Contact Number of the Medical Officer:" },
  { field: "H3A8", headerName: "3A.8 Email ID:" },
  { field: "H3A9_latitude", headerName: "3A.9 GPS Coordinates:" },
  { field: "H3A9_longitude", headerName: "3A.9 GPS Coordinates" },
  { field: "H3A9_district", headerName: "3A.9 District" },
  { field: "H3A9_state", headerName: "3A.9 State" },
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
    field: "H3B7_0",
    headerName:
      "3B.7 Which of the following infrastructure requirements for emergency are available at the PHC? (Multiple answers possible) (choice=Emergency Registration Counter)",
  },
  {
    field: "H3B7_1",
    headerName:
      "3B.7 Which of the following infrastructure requirements for emergency are available at the PHC? (Multiple answers possible) (choice=Waiting Area for patients/attendants)",
  },
  {
    field: "H3B7_2",
    headerName:
      "3B.7 Which of the following infrastructure requirements for emergency are available at the PHC? (Multiple answers possible) (choice=Plaster Room/Suturing Room/Minor OT)",
  },
  {
    field: "H3B7_3",
    headerName:
      "3B.7 Which of the following infrastructure requirements for emergency are available at the PHC? (Multiple answers possible) (choice=Point of Care Lab)",
  },
  {
    field: "H3B7_4",
    headerName:
      "3B.7 Which of the following infrastructure requirements for emergency are available at the PHC? (Multiple answers possible) (choice=Area to Keep Dead Bodies)",
  },
  {
    field: "H3B7_5",
    headerName:
      "3B.7 Which of the following infrastructure requirements for emergency are available at the PHC? (Multiple answers possible) (choice=Demarcate Duty Rooms for Doctors and Nurses)",
  },
  {
    field: "H3B7_6",
    headerName:
      "3B.7 Which of the following infrastructure requirements for emergency are available at the PHC? (Multiple answers possible) (choice=Computerized Registration)",
  },
  {
    field: "H3B7_7",
    headerName:
      "3B.7 Which of the following infrastructure requirements for emergency are available at the PHC? (Multiple answers possible) (choice=Triage Area)",
  },
  {
    field: "H3B7_8",
    headerName:
      "3B.7 Which of the following infrastructure requirements for emergency are available at the PHC? (Multiple answers possible) (choice=Resuscitation Area)",
  },
  {
    field: "H3B7_9",
    headerName:
      "3B.7 Which of the following infrastructure requirements for emergency are available at the PHC? (Multiple answers possible) (choice=Decontamination Facility)",
  },
  {
    field: "H3B7_10",
    headerName:
      "3B.7 Which of the following infrastructure requirements for emergency are available at the PHC? (Multiple answers possible) (choice=Security Services)",
  },
  {
    field: "H3B7_11",
    headerName:
      "3B.7 Which of the following infrastructure requirements for emergency are available at the PHC? (Multiple answers possible) (choice=Designated Parking Area for Ambulance)",
  },
  {
    field: "H3B7_12",
    headerName:
      "3B.7 Which of the following infrastructure requirements for emergency are available at the PHC? (Multiple answers possible) (choice=Wheelchair Trolley and Stretcher Bay)",
  },
  {
    field: "H3B7_13",
    headerName:
      "3B.7 Which of the following infrastructure requirements for emergency are available at the PHC? (Multiple answers possible) (choice=IT infrastructure for providing teleconsultation services)",
  },
  {
    field: "H3B7_14",
    headerName:
      "3B.7 Which of the following infrastructure requirements for emergency are available at the PHC? (Multiple answers possible) (choice=Adequate illumination at the entrance & access road to PHC especially at night.)",
  },
  {
    field: "H3B7_15",
    headerName:
      "3B.7 Which of the following infrastructure requirements for emergency are available at the PHC? (Multiple answers possible) (choice=Availability of Wheelchair or stretcher for easy Access)",
  },
  {
    field: "H3B7_16",
    headerName:
      "3B.7 Which of the following infrastructure requirements for emergency are available at the PHC? (Multiple answers possible) (choice=Ward is easily accessible from the OPD)",
  },
  {
    field: "H3B7_17",
    headerName:
      "3B.7 Which of the following infrastructure requirements for emergency are available at the PHC? (Multiple answers possible) (choice=Ward is easily accessible from the OPD)",
  },
  {
    field: "H3B7",
    headerName:
      "3B.7 Which of the following infrastructure requirements for emergency are available at the PHC?",
    valueGetter: (params) => getOptionsIndex(params.data?.H3B7),
  },
  {
    field: "H3B8_0",
    headerName:
      "3B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments? (choice=Services Provided Clearly Defined and Displayed)",
  },
  {
    field: "H3B8_1",
    headerName:
      "3B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments? (choice=The name of the facility is prominently displayed in front of the hospital building)",
  },
  {
    field: "H3B8_2",
    headerName:
      "3B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments? (choice=Display of citizens charter)",
  },
  {
    field: "H3B8_3",
    headerName:
      "3B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments? (choice=Direction to PHC is displayed from the Access Road.)",
  },
  {
    field: "H3B8_4",
    headerName:
      "3B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments? (choice=Facility layout with Directions to different departments displayed.)",
  },
  {
    field: "H3B8_5",
    headerName:
      "3B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments? (choice=Name of the facility is prominently displayed in front of the hospital building.)",
  },
  {
    field: "H3B8_6",
    headerName:
      "3B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments? (choice=All functional areas identified by their respective signage.)",
  },
  {
    field: "H3B8_7",
    headerName:
      "3B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments? (choice=Availability of complaint box and display of process for grievance re-addressed and whom to contact is displayed)",
  },
  {
    field: "H3B8_8",
    headerName:
      "3B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments? (choice=None of the above)",
  },
  {
    field: "H3B8",
    headerName:
      "3B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments?",
    valueGetter: (params) => getOptionsIndex(params.data?.H3B8),
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
    field: "table1_0_Manpower",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (MO MBBS) (Manpower)",
  },
  {
    field: "table1_0_Number",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (MO MBBS) (Number)",
  },
  {
    field: "table1_0_availability247",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (MO MBBS) (availability24 X 7)",
  },
  {
    field: "table1_0_onSiteAvailability",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (MO MBBS) (onSiteAvailability)",
  },
  {
    field: "table1_0_onCallAvailability",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (MO MBBS) (onCallAvailability)",
  },
  {
    field: "table1_1_Manpower",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Specialist for Medicine) (Manpower)",
  },
  {
    field: "table1_1_Number",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Specialist for Medicine) (Number)",
  },
  {
    field: "table1_1_availability247",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Specialist for Medicine) (availability24 X 7)",
  },
  {
    field: "table1_1_onSiteAvailability",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Specialist for Medicine) (onSiteAvailability)",
  },
  {
    field: "table1_1_onCallAvailability",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Specialist for Medicine) (onCallAvailability)",
  },
  {
    field: "table1_2_Manpower",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Specialist for Pediatrics) (Manpower)",
  },
  {
    field: "table1_2_Number",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Specialist for Pediatrics) (Number)",
  },
  {
    field: "table1_2_availability247",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Specialist for Pediatrics) (availability24 X 7)",
  },
  {
    field: "table1_2_onSiteAvailability",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Specialist for Pediatrics) (onSiteAvailability)",
  },
  {
    field: "table1_2_onCallAvailability",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Specialist for Pediatrics) (onCallAvailability)",
  },
  {
    field: "table1_3_Manpower",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Specialist for Ophthalmology) (Manpower)",
  },
  {
    field: "table1_3_Number",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Specialist for Ophthalmology) (Number)",
  },
  {
    field: "table1_3_availability247",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Specialist for Ophthalmology) (availability24 X 7)",
  },
  {
    field: "table1_3_onSiteAvailability",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Specialist for Ophthalmology) (onSiteAvailability)",
  },
  {
    field: "table1_3_onCallAvailability",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Specialist for Ophthalmology) (onCallAvailability)",
  },
  {
    field: "table1_4_Manpower",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Specialist Obstetrics & Gynecologist) (Manpower)",
  },
  {
    field: "table1_4_Number",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Specialist Obstetrics & Gynecologist) (Number)",
  },
  {
    field: "table1_4_availability247",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Specialist Obstetrics & Gynecologist) (availability24 X 7)",
  },
  {
    field: "table1_4_onSiteAvailability",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Specialist Obstetrics & Gynecologist) (onSiteAvailability)",
  },
  {
    field: "table1_4_onCallAvailability",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Specialist Obstetrics & Gynecologist) (onCallAvailability)",
  },
  {
    field: "table1_5_Manpower",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Staff Nurses) (Manpower)",
  },
  {
    field: "table1_5_Number",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Staff Nurses) (Number)",
  },
  {
    field: "table1_5_availability247",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Staff Nurses) (availability24 X 7)",
  },
  {
    field: "table1_5_onSiteAvailability",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Staff Nurses) (onSiteAvailability)",
  },
  {
    field: "table1_5_onCallAvailability",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Staff Nurses) (onCallAvailability)",
  },
  {
    field: "table1_6_Manpower",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Pharmacist) (Manpower)",
  },
  {
    field: "table1_6_Number",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Pharmacist) (Number)",
  },
  {
    field: "table1_6_availability247",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Pharmacist) (availability24 X 7)",
  },
  {
    field: "table1_6_onSiteAvailability",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Pharmacist) (onSiteAvailability)",
  },
  {
    field: "table1_6_onCallAvailability",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Pharmacist) (onCallAvailability)",
  },
  {
    field: "table1_7_Manpower",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Lab technician) (Manpower)",
  },
  {
    field: "table1_7_Number",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Lab technician) (Number)",
  },
  {
    field: "table1_7_availability247",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Lab technician) (availability24 X 7)",
  },
  {
    field: "table1_7_onSiteAvailability",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Lab technician) (onSiteAvailability)",
  },
  {
    field: "table1_7_onCallAvailability",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Lab technician) (onCallAvailability)",
  },
  {
    field: "table1_8_Manpower",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Dressor) (Manpower)",
  },
  {
    field: "table1_8_Number",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Dressor) (Number)",
  },
  {
    field: "table1_8_availability247",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Dressor) (availability24 X 7)",
  },
  {
    field: "table1_8_onSiteAvailability",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Dressor) (onSiteAvailability)",
  },
  {
    field: "table1_8_onCallAvailability",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Dressor) (onCallAvailability)",
  },
  {
    field: "table1_9_Manpower",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Data entry operator) (Manpower)",
  },
  {
    field: "table1_9_Number",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Data entry operator) (Number)",
  },
  {
    field: "table1_9_availability247",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Data entry operator) (availability24 X 7)",
  },
  {
    field: "table1_9_onSiteAvailability",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Data entry operator) (onSiteAvailability)",
  },
  {
    field: "table1_9_onCallAvailability",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Data entry operator) (onCallAvailability)",
  },
  {
    field: "table1_10_Manpower",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Sanitation staff) (Manpower)",
  },
  {
    field: "table1_10_Number",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Sanitation staff) (Number)",
  },
  {
    field: "table1_10_availability247",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Sanitation staff) (availability24 X 7)",
  },
  {
    field: "table1_10_onSiteAvailability",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Sanitation staff) (onSiteAvailability)",
  },
  {
    field: "table1_10_onCallAvailability",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Sanitation staff) (onCallAvailability)",
  },
  {
    field: "table1_11_Manpower",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Other) (Manpower)",
  },
  {
    field: "table1_11_Manpower_other specify",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Other Specify)",
    valueGetter: (params) => params.data?.table1?.[11]?.otherSpecify,
  },
  {
    field: "table1_11_Number",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Other) (Number)",
  },
  {
    field: "table1_11_availability247",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Other) (availability24 X 7)",
  },
  {
    field: "table1_11_onSiteAvailability",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Other) (onSiteAvailability)",
  },
  {
    field: "table1_11_onCallAvailability",
    headerName:
      "3C.1 : Tick the manpower available in your emergency department and provide numbers (Other) (onCallAvailability)",
  },
  {
    field: "H3C2",
    headerName:
      "3C.2 Whether training for emergency care management is being conducted for the staff in the institution?",
  },
  {
    field: "H3C3_0",
    headerName:
      "3C.3 : If Yes to 3C.2, Which of the following emergency care trainings you have undergone? (choice = Trauma & Accidental Injuries)",
  },
  {
    field: "H3C3_1",
    headerName:
      "3C.3 : If Yes to 3C.2, Which of the following emergency care trainings you have undergone? (choice = Burns)",
  },
  {
    field: "H3C3_2",
    headerName:
      "3C.3 : If Yes to 3C.2, Which of the following emergency care trainings you have undergone? (choice = Cardiac emergencies: acute chest pain, acute coronary syndrome (ACS)/ STEMI, Heart failure, Cardiac Arrest)",
  },
  {
    field: "H3C3_3",
    headerName:
      "3C.3 : If Yes to 3C.2, Which of the following emergency care trainings you have undergone? (choice = Stroke)",
  },
  {
    field: "H3C3_4",
    headerName:
      "3C.3 : If Yes to 3C.2, Which of the following emergency care trainings you have undergone? (choice = Acute Breathlessness)",
  },
  {
    field: "H3C3_5",
    headerName:
      "3C.3 : If Yes to 3C.2, Which of the following emergency care trainings you have undergone? (choice = Seizures)",
  },
  {
    field: "H3C3_6",
    headerName:
      "3C.3 : If Yes to 3C.2, Which of the following emergency care trainings you have undergone? (choice = Bites (Animal bite/snake bite/scorpion sting))",
  },
  {
    field: "H3C3_7",
    headerName:
      "3C.3 : If Yes to 3C.2, Which of the following emergency care trainings you have undergone? (choice = Choking/foreign body ingestion)",
  },
  {
    field: "H3C3_8",
    headerName:
      "3C.3 : If Yes to 3C.2, Which of the following emergency care trainings you have undergone? (choice = Poisoning)",
  },
  {
    field: "H3C3_9",
    headerName:
      "3C.3 : If Yes to 3C.2, Which of the following emergency care trainings you have undergone? (choice = PPH)",
  },
  {
    field: "H3C3_10",
    headerName:
      "3C.3 : If Yes to 3C.2, Which of the following emergency care trainings you have undergone? (choice = Pre-Eclampsia)",
  },
  {
    field: "H3C3_11",
    headerName:
      "3C.3 : If Yes to 3C.2, Which of the following emergency care trainings you have undergone? (choice = Neonatal emergencies)",
  },
  {
    field: "H3C3_12",
    headerName:
      "3C.3 : If Yes to 3C.2, Which of the following emergency care trainings you have undergone? (choice = other)",
    valueGetter: (params) =>
      params.data?.H3C3?.[12]?.length > 0 ? "Other" : "",
  },
  {
    field: "H3C3_12",
    headerName:
      "3C.3 : If Yes to 3C.2, Which of the following emergency care trainings you have undergone? (other specify)",
  },
  {
    field: "H3C4",
    headerName:
      "3C.4 : If Yes, Frequency of training on emergency care in a year?",
    valueGetter: (params) => params.data?.H3C4?.split(":")[0],
  },
  {
    field: "H3C4",
    headerName:
      "3C.4 : Frequency of training on emergency care in a year? (other specify)",
    valueGetter: (params) => params.data?.H3C4?.split(":")[1],
  },
  { field: "H3C5", headerName: "3C.5 When was the last training conducted?" },
  {
    field: "H3D1_0",
    headerName:
      "3D.1 : Which of the following emergency drugs are available at the PHC? (choice = Oxygen medicinal gas)",
  },
  {
    field: "H3D1_1",
    headerName:
      "3D.1 : Which of the following emergency drugs are available at the PHC? (choice = Atropine)",
  },
  {
    field: "H3D1_2",
    headerName:
      "3D.1 : Which of the following emergency drugs are available at the PHC? (choice = Diazepam/Lorazepam)",
  },
  {
    field: "H3D1_3",
    headerName:
      "3D.1 : Which of the following emergency drugs are available at the PHC? (choice = Adrenaline)",
  },
  {
    field: "H3D1_4",
    headerName:
      "3D.1 : Which of the following emergency drugs are available at the PHC? (choice = Charcoal activated)",
  },
  {
    field: "H3D1_5",
    headerName:
      "3D.1 : Which of the following emergency drugs are available at the PHC? (choice = Antisnake venom)",
  },
  {
    field: "H3D1_6",
    headerName:
      "3D.1 : Which of the following emergency drugs are available at the PHC? (choice = Pralidoxime (PAM))",
  },
  {
    field: "H3D1_7",
    headerName:
      "3D.1 : Which of the following emergency drugs are available at the PHC? (choice = Magnesium sulphate)",
  },
  {
    field: "H3D1_8",
    headerName:
      "3D.1 : Which of the following emergency drugs are available at the PHC? (choice = Tetanus immunoglobulin)",
  },
  {
    field: "H3D1_9",
    headerName:
      "3D.1 : Which of the following emergency drugs are available at the PHC? (choice = Neostigmine)",
  },
  {
    field: "H3D1_10",
    headerName:
      "3D.1 : Which of the following emergency drugs are available at the PHC? (choice = Aspirin)",
  },
  {
    field: "H3D1_11",
    headerName:
      "3D.1 : Which of the following emergency drugs are available at the PHC? (choice = Clopidogrel)",
  },
  {
    field: "H3D1_12",
    headerName:
      "3D.1 : Which of the following emergency drugs are available at the PHC? (choice = Atorvastatin)",
  },
  {
    field: "H3D1_13",
    headerName:
      "3D.1 : Which of the following emergency drugs are available at the PHC? (choice = Misoprostol)",
  },
  {
    field: "H3D1_14",
    headerName:
      "3D.1 : Which of the following emergency drugs are available at the PHC? (choice = Labetalol IV)",
  },
  {
    field: "H3D1_15",
    headerName:
      "3D.1 : Which of the following emergency drugs are available at the PHC? (choice = Phenobarbitone)",
  },
  {
    field: "H3D1_16",
    headerName:
      "3D.1 : Which of the following emergency drugs are available at the PHC? (choice = Phenytoin (inj))",
  },
  {
    field: "H3D1_17",
    headerName:
      "3D.1 : Which of the following emergency drugs are available at the PHC? (choice = Plasma volume expander)",
  },
  {
    field: "H3D1_18",
    headerName:
      "3D.1 : Which of the following emergency drugs are available at the PHC? (choice = 3% Saline)",
  },
  {
    field: "H3D1_19",
    headerName:
      "3D.1 : Which of the following emergency drugs are available at the PHC? (choice = Dobutamine)",
  },
  {
    field: "H3D1_20",
    headerName:
      "3D.1 : Which of the following emergency drugs are available at the PHC? (choice = Streptokinase)",
  },
  {
    field: "H3D1_21",
    headerName:
      "3D.1 : Which of the following emergency drugs are available at the PHC? (choice = Tenecteplase)",
  },
  {
    field: "H3D1_22",
    headerName:
      "3D.1 : Which of the following emergency drugs are available at the PHC? (choice = Oxytocin)",
  },
  {
    field: "H3D1_23",
    headerName:
      "3D.1 : Which of the following emergency drugs are available at the PHC? (choice = Salbutamol sulphate)",
  },
  {
    field: "H3D1_24",
    headerName:
      "3D.1 : Which of the following emergency drugs are available at the PHC? (choice = Glucose/ 25 % dextrose)",
  },
  {
    field: "H3D1_25",
    headerName:
      "3D.1 : Which of the following emergency drugs are available at the PHC? (choice = Tranexamic acid)",
  },
  {
    field: "H3D1_26",
    headerName:
      "3D.1 : Which of the following emergency drugs are available at the PHC? (choice = tPA IV)",
  },
  {
    field: "H3D1_27",
    headerName:
      "3D.1 : Which of the following emergency drugs are available at the PHC? (choice = Methergine)",
  },
  {
    field: "H3D1_28",
    headerName:
      "3D.1 : Which of the following emergency drugs are available at the PHC? (choice = Carboprost)",
  },
  {
    field: "H3D1",
    headerName:
      "3D.1 : Which of the following emergency drugs are available at the PHC?",
    valueGetter: (params) => getOptionsIndex(params.data?.H2D1),
  },
  {
    field: "H3D2_0",
    headerName:
      "3D.2 : Which of the following emergency equipment is available at the PHC? (choice = Mobile bed for Resuscitation)",
  },
  {
    field: "H3D2_1",
    headerName:
      "3D.2 : Which of the following emergency equipment is available at the PHC? (choice = Crash Cart (Specialized Cart for Resuscitation))",
  },
  {
    field: "H3D2_2",
    headerName:
      "3D.2 : Which of the following emergency equipment is available at the PHC? (choice = Hard Cervical Collar)",
  },
  {
    field: "H3D2_3",
    headerName:
      "3D.2 : Which of the following emergency equipment is available at the PHC? (choice = Oxygen Cylinder/Central Oxygen Supply)",
  },
  {
    field: "H3D2_4",
    headerName:
      "3D.2 : Which of the following emergency equipment is available at the PHC? (choice = Suction Machine)",
  },
  {
    field: "H3D2_5",
    headerName:
      "3D.2 : Which of the following emergency equipment is available at the PHC? (choice = Multipara Monitor (To monitor Heart rate, BP, SPO2[Essential] ECG, Respiration Rate [Desirable] etc))",
  },
  {
    field: "H3D2_6",
    headerName:
      "3D.2 : Which of the following emergency equipment is available at the PHC? (choice = Defibrillator with or without External Pacer)",
  },
  {
    field: "H3D2_7",
    headerName:
      "3D.2 : Which of the following emergency equipment is available at the PHC? (choice = Toothed Forceps, Kocher Forceps, Magill's forceps, Artery forceps)",
  },
  {
    field: "H3D2_8",
    headerName:
      "3D.2 : Which of the following emergency equipment is available at the PHC? (choice = AMBU Bag for Adult and Paediatric)",
  },
  {
    field: "H3D2_9",
    headerName:
      "3D.2 : Which of the following emergency equipment is available at the PHC? (choice = Basic airway equipment like oropharyngeal nasopharyngeal airway, LMA for adult and pediatric)",
  },
  {
    field: "H3D2_10",
    headerName:
      "3D.2 : Which of the following emergency equipment is available at the PHC? (choice = Advanced Laryngoscope and Endotracheal Tube or Other Similar Device)",
  },
  {
    field: "H3D2_11",
    headerName:
      "3D.2 : Which of the following emergency equipment is available at the PHC? (choice = Tourniquet)",
  },
  {
    field: "H3D2_12",
    headerName:
      "3D.2 : Which of the following emergency equipment is available at the PHC? (choice = Pelvic Binder or Bed Sheets with Clips)",
  },
  {
    field: "H3D2_13",
    headerName:
      "3D.2 : Which of the following emergency equipment is available at the PHC? (choice = Laryngoscope with all sized Blades)",
  },
  {
    field: "H3D2_14",
    headerName:
      "3D.2 : Which of the following emergency equipment is available at the PHC? (choice = Endotracheal Tubes of all sizes)",
  },
  {
    field: "H3D2_15",
    headerName:
      "3D.2 : Which of the following emergency equipment is available at the PHC? (choice = Laryngeal Mask Airway (LMA))",
  },
  {
    field: "H3D2_16",
    headerName:
      "3D.2 : Which of the following emergency equipment is available at the PHC? (choice = Chest Tubes with Water seal drain)",
  },
  {
    field: "H3D2_17",
    headerName:
      "3D.2 : Which of the following emergency equipment is available at the PHC? (choice = ECG Machine)",
  },
  {
    field: "H3D2_18",
    headerName:
      "3D.2 : Which of the following emergency equipment is available at the PHC? (choice = Nebulizer)",
  },
  {
    field: "H3D2_19",
    headerName:
      "3D.2 : Which of the following emergency equipment is available at the PHC? (choice = Fluid Warmer)",
  },
  {
    field: "H3D2_20",
    headerName:
      "3D.2 : Which of the following emergency equipment is available at the PHC? (choice = Infusion Pump and Syringe Drivers)",
  },
  {
    field: "H3D2_21",
    headerName:
      "3D.2 : Which of the following emergency equipment is available at the PHC? (choice = Spine Board with Sling and Scotch Tapes)",
  },
  {
    field: "H3D2_22",
    headerName:
      "3D.2 : Which of the following emergency equipment is available at the PHC? (choice = Splints for all types of Fracture)",
  },
  {
    field: "H3D2_23",
    headerName:
      "3D.2 : Which of the following emergency equipment is available at the PHC? (choice = Non-invasive Ventilators)",
  },
  {
    field: "H3D2_24",
    headerName:
      "3D.2 : Which of the following emergency equipment is available at the PHC? (choice = Invasive Ventilators)",
  },
  {
    field: "H3D2_25",
    headerName:
      "3D.2 : Which of the following emergency equipment is available at the PHC? (choice = Incubators)",
  },
  {
      field: "H3D2",
      headerName:
      "3D.2 : Which of the following emergency equipment is available at the PHC?",
      valueGetter: (params) => getOptionsIndex(params.data?.H2D2),
  },
  {
    field: "table2_0_Adult",
    headerName:
      "3E.1 : Numbers of Patients who Visited ED in Last One Month (Adult (> 18Years))",
  },
  {
    field: "table2_0_Pediatric",
    headerName:
      "3E.1 : Numbers of Patients who Visited ED in Last One Month (Pediatric)",
  },
  {
    field: "table2_0_Broughtdead",
    headerName:
      "3E.1 : Numbers of Patients who Visited ED in Last One Month (Brought dead)",
  },
  {
    field: "table2_0_Deathafterarrival",
    headerName:
      "3E.1 : Numbers of Patients who Visited ED in Last One Month (Death after arrival)",
  },
  {
    field: "table2_0_MLC",
    headerName:
      "3E.1 : Numbers of Patients who Visited ED in Last One Month (MLC)",
  },
  {
    field: "table3_0_Attended",
    headerName:
      "3E.2 : Numbers of Patients Attended in ED and Deaths in Last One Year (Jan - Dec 2023) (MI - Attended)",
  },
  {
    field: "table3_0_Death",
    headerName:
      "3E.2 : Numbers of Patients Attended in ED and Deaths in Last One Year (Jan - Dec 2023) (MI - Death)",
  },
  {
    field: "table3_1_Attended",
    headerName:
      "3E.2 : Numbers of Patients Attended in ED and Deaths in Last One Year (Jan - Dec 2023) (Stroke - Attended)",
  },
  {
    field: "table3_1_Death",
    headerName:
      "3E.2 : Numbers of Patients Attended in ED and Deaths in Last One Year (Jan - Dec 2023) (Stroke - Death)",
  },
  {
    field: "table3_2_Attended",
    headerName:
      "3E.2 : Numbers of Patients Attended in ED and Deaths in Last One Year (Jan - Dec 2023) (Trauma & Burns - Attended)",
  },
  {
    field: "table3_2_Death",
    headerName:
      "3E.2 : Numbers of Patients Attended in ED and Deaths in Last One Year (Jan - Dec 2023) (Trauma & Burns - Death)",
  },
  {
    field: "table3_3_Attended",
    headerName:
      "3E.2 : Numbers of Patients Attended in ED and Deaths in Last One Year (Jan - Dec 2023) (Poisoning - Attended)",
  },
  {
    field: "table3_3_Death",
    headerName:
      "3E.2 : Numbers of Patients Attended in ED and Deaths in Last One Year (Jan - Dec 2023) (Poisoning - Death)",
  },
  {
    field: "table3_4_Attended",
    headerName:
      "3E.2 : Numbers of Patients Attended in ED and Deaths in Last One Year (Jan - Dec 2023) (Snake Bites - Attended)",
  },
  {
    field: "table3_4_Death",
    headerName:
      "3E.2 : Numbers of Patients Attended in ED and Deaths in Last One Year (Jan - Dec 2023) (Snake Bites - Death)",
  },
  {
    field: "table3_5_Attended",
    headerName:
      "3E.2 : Numbers of Patients Attended in ED and Deaths in Last One Year (Jan - Dec 2023) (Maternal Emergencies-PPH - Attended)",
  },
  {
    field: "table3_5_Death",
    headerName:
      "3E.2 : Numbers of Patients Attended in ED and Deaths in Last One Year (Jan - Dec 2023) (Maternal Emergencies-PPH - Death)",
  },
  {
    field: "table3_6_Attended",
    headerName:
      "3E.2 : Numbers of Patients Attended in ED and Deaths in Last One Year (Jan - Dec 2023) (Maternal Emergencies- Eclampsia - Attended)",
  },
  {
    field: "table3_6_Death",
    headerName:
      "3E.2 : Numbers of Patients Attended in ED and Deaths in Last One Year (Jan - Dec 2023) (Maternal Emergencies- Eclampsia - Death)",
  },
  {
    field: "table3_7_Attended",
    headerName:
      "3E.2 : Numbers of Patients Attended in ED and Deaths in Last One Year (Jan - Dec 2023) (Neonatal Emergencies - Attended)",
  },
  {
    field: "table3_7_Death",
    headerName:
      "3E.2 : Numbers of Patients Attended in ED and Deaths in Last One Year (Jan - Dec 2023) (Neonatal Emergencies - Death)",
  },
  {
    field: "table3_8_Attended",
    headerName:
      "3E.2 : Numbers of Patients Attended in ED and Deaths in Last One Year (Jan - Dec 2023) (Acute Respiratory Illness - Attended)",
  },
  {
    field: "table3_8_Death",
    headerName:
      "3E.2 : Numbers of Patients Attended in ED and Deaths in Last One Year (Jan - Dec 2023) (Acute Respiratory Illness - Death)",
  },
  {
    field: "H3E3_0",
    headerName:
      "3E.3 Which of the following emergency services are delivered at the PHC? (Multiple answers possible) (choice=Triage)",
  },
  {
    field: "H3E3_1",
    headerName:
      "3E.3 Which of the following emergency services are delivered at the PHC? (Multiple answers possible) (choice=Resuscitation)",
  },
  {
    field: "H3E3_2",
    headerName:
      "3E.3 Which of the following emergency services are delivered at the PHC? (Multiple answers possible) (choice=Medico-legal Reporting)",
  },
  {
    field: "H3E3_3",
    headerName:
      "3E.3 Which of the following emergency services are delivered at the PHC? (Multiple answers possible) (choice=None of the above)",
  },
  {
    field: "H3E3",
    headerName:
      "3E.3 Which of the following emergency services are delivered at the PHC?",
      valueGetter: (params) => getOptionsIndex(params.data?.H3E3),
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
    field: "H3F4_0",
    headerName:
      "3F.4 What key indicators are generated from the emergency management information system? (choice=Numbers by type of emergencies)",
  },
  {
    field: "H3F4_1",
    headerName:
      "3F.4 What key indicators are generated from the emergency management information system? (choice=Length of hospital stay)",
  },
  {
    field: "H3F4_2",
    headerName:
      "3F.4 What key indicators are generated from the emergency management information system? (choice=Turn around time)",
  },
  {
    field: "H3F4_3",
    headerName:
      "3F.4 What key indicators are generated from the emergency management information system? (choice=Disposal time)",
  },
  {
    field: "H3F4_4",
    headerName:
      "3F.4 What key indicators are generated from the emergency management information system? (choice=Number of deaths)",
  },
  {
    field: "H3F4_5",
    headerName:
      "3F.4 What key indicators are generated from the emergency management information system? (choice=Number of Referrals)",
  },
  {
    field: "H3F4",
    headerName:
      "3F.4 What key indicators are generated from the emergency management information system?",
      valueGetter: (params) => getOptionsIndex(params.data?.H3F4),
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
      "2F.7 If Yes , How often per week get Pre-Hospital Notification during an emergency?",
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
    field: "H3H4",
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
    field: "H3H8_0",
    headerName: "3H.2.5 Types of audits conducted? (choice = Mortality Audit)",
  },
  {
    field: "H3H8_1",
    headerName: "3H.2.5 Types of audits conducted? (choice = Morbidity Audit)",
  },
  {
    field: "H3H8_2",
    headerName: "3H.2.5 Types of audits conducted? (choice = other)",
    valueGetter: (params) =>
      params.data?.H3H8?.[2]?.length > 0 ? "Other" : "",
  },
  {
    field: "H3H8_2",
    headerName: "3H.2.5 Types of audits conducted? (Other Specify)",
  },
  {
    field: "H3H8",
    headerName: "3H.2.5 Types of audits conducted?",
    valueGetter: (params) => getOptionsIndex(params.data?.H3H8),
  },
  {
    field: "H3H9",
    headerName:
      "3H.2.6 Any action being taken on Audit report in the last one year?",
  },
  {
    field: "H3I1_0",
    headerName:
      "3I.1 What types of registers are maintained at the PHC? (Multiple answers possible) (choice=OPD/Treatment Register)",
  },
  {
    field: "H3I1_1",
    headerName:
      "3I.1 What types of registers are maintained at the PHC? (Multiple answers possible) (choice=Inventory Register)",
  },
  {
    field: "H3I1_2",
    headerName:
      "3I.1 What types of registers are maintained at the PHC? (Multiple answers possible) (choice=Referral Register)",
  },
  {
    field: "H3I1_3",
    headerName:
      "3I.1 What types of registers are maintained at the PHC? (Multiple answers possible) (choice=Record for handing over and taking over of critical care equipment.)",
  },
  {
    field: "H3I1_4",
    headerName:
      "3I.1 What types of registers are maintained at the PHC? (Multiple answers possible) (choice=Medico-legal register)",
  },
  {
    field: "H3I1_5",
    headerName:
      "3I.1 What types of registers are maintained at the PHC? (Multiple answers possible) (choice=Patient/Community feedback register)",
  },
  {
    field: "H3I1_6",
    headerName:
      "3I.1 What types of registers are maintained at the PHC? (Multiple answers possible) (choice=At Risk Register for vulnerable patients)",
  },
  {
    field: "H3I1_7",
    headerName:
      "3I.1 What types of registers are maintained at the PHC? (Multiple answers possible) (choice=Emergency Register)",
  },
  {
    field: "H3I1_8",
    headerName:
      "3I.1 What types of registers are maintained at the PHC? (Multiple answers possible) (choice=Mapping of the other Facilities in the block/district)",
  },
  {
    field: "H3I1_9",
    headerName:
      "3I.1 What types of registers are maintained at the PHC? (Multiple answers possible) (choice=Other)",
    valueFormatter: (params) => (params.value?.length > 0 ? "Other" : ""),
  },
  {
    field: "H3I1_9",
    headerName:
      "3I.1 What types of registers are maintained at the PHC? (Multiple answers possible) (Other specify)",
  },
  {
    field: "H3I1",
    headerName:
      "3I.1 What types of registers are maintained at the PHC?",
      valueGetter: (params) => getOptionsIndex(params.data?.H3I1),
  },
  {
    field: "H3I2_0",
    headerName:
      "3I.2 Which of the following SOPs for the management of common medical emergencies are followed at your PHC? (Select all that apply) (choice=Use of Standard guidelines for triage)",
  },
  {
    field: "H3I2_1",
    headerName:
      "3I.2 Which of the following SOPs for the management of common medical emergencies are followed at your PHC? (Select all that apply) (choice=Post Exposure prophylaxis protocols.)",
  },
  {
    field: "H3I2_2",
    headerName:
      "3I.2 Which of the following SOPs for the management of common medical emergencies are followed at your PHC? (Select all that apply) (choice=Protocols for communication among health care teams and with patients and relatives.)",
  },
  {
    field: "H3I2_3",
    headerName:
      "3I.2 Which of the following SOPs for the management of common medical emergencies are followed at your PHC? (Select all that apply) (choice=Disaster management plan.)",
  },
  {
    field: "H3I2_4",
    headerName:
      "3I.2 Which of the following SOPs for the management of common medical emergencies are followed at your PHC? (Select all that apply) (choice=None of the Above)",
    valueGetter: (params) =>
      params.data.H3I2?.[4] === "None of the Above"
        ? params.data.H3I2?.[4]
        : "",
  },
  {
    field: "H3I2_5",
    headerName:
      "3I.2 Which of the following SOPs for the management of common medical emergencies are followed at your PHC? (Select all that apply) (choice=Other)",
    valueGetter: (params) =>
      params.data?.H3I2?.[params.data?.H3I2?.length - 1] != "None of the Above"
        ? params.data?.H3I2?.[params.data?.H3I2?.length - 1]?.length > 0
          ? "Other"
          : ""
        : "",
  },
  {
    field: "H3I2_5",
    headerName:
      "3I.2 Which of the following SOPs for the management of common medical emergencies are followed at your PHC? (Select all that apply) (choice=Other specify)",
    valueGetter: (params) =>
      params.data.H3I2?.[params.data?.H3I2?.length - 1] != "None of the Above"
        ? params.data.H3I2?.[params.data?.H3I2?.length - 1]?.length > 0
          ? params.data.H3I2?.[params.data?.H3I2?.length - 1]
          : ""
        : "",
  },
  {
    field: "H3I2",
    headerName:
      "3I.2 Which of the following SOPs for the management of common medical emergencies are followed at your PHC?",
      valueGetter: (params) => getOptionsIndex(params.data?.H3I2),
  },
  {
    field: "table4_0_SOP",
    headerName:
      "3I.3 : Whether having Emergency condition specific SOP/STW for emergency care? (MI - SOP/STW)",
  },
  {
    field: "table4_0_FollowsSOP",
    headerName:
      "3I.3 : Whether having Emergency condition specific SOP/STW for emergency care? (MI - Follows SOP)",
  },
  {
    field: "table4_1_SOP",
    headerName:
      "3I.3 : Whether having Emergency condition specific SOP/STW for emergency care? (Stroke - SOP/STW)",
  },
  {
    field: "table4_1_FollowsSOP",
    headerName:
      "3I.3 : Whether having Emergency condition specific SOP/STW for emergency care? (Stroke - Follows SOP)",
  },
  {
    field: "table4_2_SOP",
    headerName:
      "3I.3 : Whether having Emergency condition specific SOP/STW for emergency care? (Trauma & Burns - SOP/STW)",
  },
  {
    field: "table4_2_FollowsSOP",
    headerName:
      "3I.3 : Whether having Emergency condition specific SOP/STW for emergency care? (Trauma & Burns - Follows SOP)",
  },
  {
    field: "table4_3_SOP",
    headerName:
      "3I.3 : Whether having Emergency condition specific SOP/STW for emergency care? (Poisoning - SOP/STW)",
  },
  {
    field: "table4_3_FollowsSOP",
    headerName:
      "3I.3 : Whether having Emergency condition specific SOP/STW for emergency care? (Poisoning - Follows SOP)",
  },
  {
    field: "table4_4_SOP",
    headerName:
      "3I.3 : Whether having Emergency condition specific SOP/STW for emergency care? (Snake Bites - SOP/STW)",
  },
  {
    field: "table4_4_FollowsSOP",
    headerName:
      "3I.3 : Whether having Emergency condition specific SOP/STW for emergency care? (Snake Bites - Follows SOP)",
  },
  {
    field: "table4_5_SOP",
    headerName:
      "3I.3 : Whether having Emergency condition specific SOP/STW for emergency care? (Maternal Emergencies-PPH - SOP/STW)",
  },
  {
    field: "table4_5_FollowsSOP",
    headerName:
      "3I.3 : Whether having Emergency condition specific SOP/STW for emergency care? (Maternal Emergencies-PPH - Follows SOP)",
  },
  {
    field: "table4_6_SOP",
    headerName:
      "3I.3 : Whether having Emergency condition specific SOP/STW for emergency care? (Maternal Emergencies-Eclampsia - SOP/STW)",
  },
  {
    field: "table4_6_FollowsSOP",
    headerName:
      "3I.3 : Whether having Emergency condition specific SOP/STW for emergency care? (Maternal Emergencies-Eclampsia - Follows SOP)",
  },
  {
    field: "table4_7_SOP",
    headerName:
      "3I.3 : Whether having Emergency condition specific SOP/STW for emergency care? (Neonatal Emergencies - SOP/STW)",
  },
  {
    field: "table4_7_FollowsSOP",
    headerName:
      "3I.3 : Whether having Emergency condition specific SOP/STW for emergency care? (Neonatal Emergencies - Follows SOP)",
  },
  {
    field: "table4_8_SOP",
    headerName:
      "3I.3 : Whether having Emergency condition specific SOP/STW for emergency care? (Acute Respiratory Illness - SOP/STW)",
  },
  {
    field: "table4_8_FollowsSOP",
    headerName:
      "3I.3 : Whether having Emergency condition specific SOP/STW for emergency care? (Acute Respiratory Illness - Follows SOP)",
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

export const HFAT3ColumnsExport = generateColumns(columns);
