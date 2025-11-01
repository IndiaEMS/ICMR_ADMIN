import generateColumns from "../generateColumns";
import getOptionsIndex from "../getOptionsIndex";

const columns = [
  {
    headerName: "Record ID",
    field: "id",
    checkboxSelection: true,
    headerCheckboxSelection: false,
    width: 250,
    editable: false,
    valueGetter: (params) => params.data?._id,
  },
  {
    headerName: "Unique Code",
    field: "uniqueCode",
    editable: false,
  },
  {
    field: "LOTA1",
    headerName: "Assessor's Name:",
  },
  {
    field: "LOTA2_DATE",
    headerName: "Date:",
    valueGetter: (params) => params.data?.LOTA2_DATE,
  },
  {
    field: "LOTA3",
    headerName: "Code:",
  },
  //     "4. Healthcare Facility Name: "
  // "5. Healthcare Facility Address: "
  // "6. Name of the hospital Superintendent:"
  // "7. Contact Number of the hospital Superintendent:"
  // "8. Email ID:"
  // "10. Type of Health Care Facility?"
  {
    field: "LOTA4",
    headerName: "Healthcare Facility Name:",
  },
  {
    field: "LOTA5",
    headerName: "Healthcare Facility Address:",
  },
  {
    field: "LOTA6",
    headerName: "Name of the hospital Superintendent:",
  },
  {
    field: "LOTA7",
    headerName: "Contact Number of the hospital Superintendent:",
  },
  {
    field: "LOTA8",
    headerName: "Email ID:",
  },
  // {
  //   field: "LOTA9",
  //   headerName: "GPS Coordinates:",
  // },
  {
    field: "LOTA9_latitude",
    headerName: "GPS_1",
    // valueGetter: (params) => params?.data?.LOTA9?.latitude,
  },
  {
    field: "LOTA9_longitude",
    headerName: "GPS_2",
    // valueGetter: (params) => params?.data?.LOTA9?.longitude,
  },
  {
    field: "LOTA9_district",
    headerName: "District",
    // valueGetter: (params) => params?.data?.LOTA9?.district,
  },
  {
    field: "LOTA9_state",
    headerName: "State",
    // valueGetter: (params) => params?.data?.LOTA9?.state,
  },
  {
    field: "LOTA10",
    headerName: "Type of Health Care Facility?",
  },
  {
    field: "LOTA11",
    headerName: "Type of Medical Emergency?",
  },
  {
    field: "LOTB1",
    headerName: "Arrival",
  },
  {
    field: "LOTB1_Time",
    headerName: "Arrival Time:",
    valueGetter: (params) => params.data?.LOTB1_Time,
  },
  {
    field: "LOTB2",
    headerName: "Triaged",
  },
  {
    field: "LOTB2_Time",
    headerName: "Triaged",
    valueGetter: (params) => params.data?.LOTB2_Time,
  },
  {
    field: "LOTB3",
    headerName: "Vital Sign Assessment",
  },
  {
    field: "LOTB3_Time",
    headerName: "Vital Sign Assessment",
    valueGetter: (params) => params.data?.LOTB3_Time,
  },
  {
    field: "LOTB4",
    headerName: "Patient ID",
  },
  {
    field: "LOTC1",
    headerName: "ECG Taken",
  },
  {
    field: "LOTC1_TimeStamp",
    headerName: "ECG Taken Time",
    valueGetter: (params) => params.data?.LOTC1_TimeStamp,
  },
  {
    field: "LOTC2",
    headerName: "Thrombolysis",
  },
  {
    field: "LOTC2_TimeStamp",
    headerName: "Thrombolysis Time",
    valueGetter: (params) => params.data?.LOTC2_TimeStamp,
  },
  {
    field: "LOTC3",
    headerName: "PCI",
  },
  {
    field: "LOTC3_TimeStamp",
    headerName: "PCI Time",
    valueGetter: (params) => params.data?.LOTC3_TimeStamp,
  },
  // {
  //   field: "LOTC4",
  //   headerName: "Referred to Higher Center",
  // },
  // {
  //   field: "LOTC4_TimeStamp",
  //   headerName: "Referred to Higher Center Time",
  //   valueGetter: (params) => params.data?.LOTC4_TimeStamp,
  // },
  // // Disposal from Emergency Department
  // {
  //   field: "LOTC5",
  //   headerName: "Disposal from Emergency Department",
  // },
  // {
  //   field: "LOTC5_TimeStamp",
  //   headerName: "Disposal from Emergency Department Time",
  //   valueGetter: (params) => params.data?.LOTC5_TimeStamp,
  // },
  {
    field: "LOTC_Remark",
    headerName: "Remark",
    valueGetter : (params) => params.data?.LOTC_Remark,
  },
  //   CT Taken
  // Thrombolysis
  // Thrombectomy
  {
    field: "LOTD1",
    headerName: "CT Taken",
  },
  {
    field: "LOTD1_TimeStamp",
    headerName: "CT Taken Time",
    valueGetter: (params) => params.data?.LOTD1_TimeStamp,
  },
  {
    field: "LOTD2",
    headerName: "Thrombolysis",
  },
  {
    field: "LOTD2_TimeStamp",
    headerName: "Thrombolysis Time",
    valueGetter: (params) => params.data?.LOTD2_TimeStamp,
  },
  {
    field: "LOTD3",
    headerName: "Thrombectomy",
  },
  {
    field: "LOTD3_TimeStamp",
    headerName: "Thrombectomy Time",
    valueGetter: (params) => params.data?.LOTD3_TimeStamp,
  },
  // {
  //   field: "LOTD4",
  //   headerName: "Referred to Higher Center",
  // },
  // {
  //   field: "LOTD4_TimeStamp",
  //   headerName: "Referred to Higher Center Time",
  //   valueGetter: (params) => params.data?.LOTD4_TimeStamp,
  // },
  // {
  //   field: "LOTD5",
  //   headerName: "Disposal from Emergency Department",
  // },
  // {
  //   field: "LOTD5_TimeStamp",
  //   headerName: "Disposal from Emergency Department Time",
  //   valueGetter: (params) => params.data?.LOTD5_TimeStamp,
  // },
  {
    field: "LOTD_Remark",
    headerName: "Remark",
    valueGetter : (params) => params.data?.LOTD_Remark,
  },
  // Point of Care investigation
  // Radiology Investigation
  // Shifted to OT
  // IV Tranexamic Acid
  {
    field: "LOTE1",
    headerName: "Point of Care investigation",
  },
  {
    field: "LOTE1_TimeStamp",
    headerName: "Point of Care investigation Time",
    valueGetter: (params) => params.data?.LOTE1_TimeStamp,
  },
  {
    field: "LOTE2",
    headerName: "Radiology Investigation",
  },
  {
    field: "LOTE2_TimeStamp",
    headerName: "Radiology Investigation Time",
    valueGetter: (params) => params.data?.LOTE2_TimeStamp,
  },
  {
    field: "LOTE3",
    headerName: "Shifted to OT",
  },
  {
    field: "LOTE3_TimeStamp",
    headerName: "Shifted to OT Time",
    valueGetter: (params) => params.data?.LOTE3_TimeStamp,
  },
  // Blood Transfusion
  {
    field: "LOTE4",
    headerName: "IV Tranexamic Acid",
  },
  {
    field: "LOTE4_TimeStamp",
    headerName: "IV Tranexamic Acid Time",
    valueGetter: (params) => params.data?.LOTE4_TimeStamp,
  },
  {
    field: "LOTE5",
    headerName: "IV Tranexamic Acid",
  },
  {
    field: "LOTE5_TimeStamp",
    headerName: "IV Tranexamic Acid Time",
    valueGetter: (params) => params.data?.LOTE5_TimeStamp,
  },
  // {
  //   field: "LOTE6",
  //   headerName: "Referred to Higher Center",
  // },
  // {
  //   field: "LOTE6_TimeStamp",
  //   headerName: "Referred to Higher Center Time",
  //   valueGetter: (params) => params.data?.LOTE6_TimeStamp,
  // },
  // {
  //   field: "LOTE7",
  //   headerName: "Disposal from Emergency Department",
  // },
  // {
  //   field: "LOTE7_TimeStamp",
  //   headerName: "Disposal from Emergency Department Time",
  //   valueGetter: (params) => params.data?.LOTE7_TimeStamp,
  // },
  {
    field: "LOTE_Remark",
    headerName: "Remark",
    valueGetter : (params) => params.data?.LOTE_Remark,
  },
  {
    field: "LOTF1",
    headerName: "Oxygen Therapy Initiation",
  },
  {
    field: "LOTF1_TimeStamp",
    headerName: "Oxygen Therapy Initiation Time",
    valueGetter: (params) => params.data?.LOTF1_TimeStamp,
  },
  {
    field: "LOTF2",
    headerName: "Bronchodilators Initiation",
  },
  {
    field: "LOTF2_TimeStamp",
    headerName: "Bronchodilators Initiation Time",
    valueGetter: (params) => params.data?.LOTF2_TimeStamp,
  },
  {
    field: "LOTF3",
    headerName: "Medication Administration (Antibiotics)",
  },
  {
    field: "LOTF3_TimeStamp",
    headerName: "Medication Administration (Antibiotics) Time",
    valueGetter: (params) => params.data?.LOTF3_TimeStamp,
  },
  //   Referred to Higher Center
  // Disposal from Emergency Department
  // {
  //   field: "LOTF4",
  //   headerName: "Referred to Higher Center",
  // },
  // {
  //   field: "LOTF4_TimeStamp",
  //   headerName: "Referred to Higher Center Time",
  //   valueGetter: (params) => params.data?.LOTF4_TimeStamp,
  // },
  // {
  //   field: "LOTF5",
  //   headerName: "Disposal from Emergency Department",
  // },
  // {
  //   field: "LOTF5_TimeStamp",
  //   headerName: "Disposal from Emergency Department Time",
  //   valueGetter: (params) => params.data?.LOTF5_TimeStamp,
  // },
  {
    field: "LOTF_Remark",
    headerName: "Remark",
    valueGetter : (params) => params.data?.LOTF_Remark,
  },
  // Antidote Given
  // Identification of Toxidrome
  // Remarks
  {
    field: "LOTG1",
    headerName: "Antidote Given",
  },
  {
    field: "LOTG1_TimeStamp",
    headerName: "Antidote Given Time",
    valueGetter: (params) => params.data?.LOTG1_TimeStamp,
  },
  {
    field: "LOTG2",
    headerName: "Identification of Toxidrome",
  },
  {
    field: "LOTG2_TimeStamp",
    headerName: "Identification of Toxidrome Time",
    valueGetter: (params) => params.data?.LOTG2_TimeStamp,
  },
  // {
  //   field: "LOTG3",
  //   headerName: "Referred to Higher Center",
  // },
  // {
  //   field: "LOTG3_TimeStamp",
  //   headerName: "Referred to Higher Center Time",
  //   valueGetter: (params) => params.data?.LOTG3_TimeStamp,
  // },
  // {
  //   field: "LOTG4",
  //   headerName: "Disposal from Emergency Department",
  // },
  // {
  //   field: "LOTG4_TimeStamp",
  //   headerName: "Disposal from Emergency Department Time",
  //   valueGetter: (params) => params.data?.LOTG4_TimeStamp,
  // },
  {
    field: "LOTG_Remark",
    headerName: "Remark",
    valueGetter : (params) => params.data?.LOTG_Remark,
  },
  // Shifted to OT
  // Blood Transfusion given
  // Surgical Intervention done
  // Tranexamic acid given
  // Remarks
  {
    field: "LOTH1",
    headerName: "Shifted to OT",
  },
  {
    field: "LOTH1_TimeStamp",
    headerName: "Shifted to OT Time",
    valueGetter: (params) => params.data?.LOTH1_TimeStamp,
  },
  {
    field: "LOTH2",
    headerName: "Blood Transfusion given",
  },
  {
    field: "LOTH2_TimeStamp",
    headerName: "Blood Transfusion given Time",
    valueGetter: (params) => params.data?.LOTH2_TimeStamp,
  },
  {
    field: "LOTH3",
    headerName: "Surgical Intervention done",
  },
  {
    field: "LOTH3_TimeStamp",
    headerName: "Surgical Intervention done Time",
    valueGetter: (params) => params.data?.LOTH3_TimeStamp,
  },
  {
    field: "LOTH4",
    headerName: "Tranexamic acid given",
  },
  {
    field: "LOTH4_TimeStamp",
    headerName: "Tranexamic acid given Time",
    valueGetter: (params) => params.data?.LOTH4_TimeStamp,
  },
  //   Referred to Higher Center
  // Disposal from Emergency Department
  // {
  //   field: "LOTH5",
  //   headerName: "Referred to Higher Center",
  // },
  // {
  //   field: "LOTH5_TimeStamp",
  //   headerName: "Referred to Higher Center Time",
  //   valueGetter: (params) => params.data?.LOTH5_TimeStamp,
  // },
  // {
  //   field: "LOTH6",
  //   headerName: "Disposal from Emergency Department",
  // },
  // {
  //   field: "LOTH6_TimeStamp",
  //   headerName: "Disposal from Emergency Department Time",
  //   valueGetter: (params) => params.data?.LOTH6_TimeStamp,
  // },
  {
    field: "LOTH_Remark",
    headerName: "Remark",
    valueGetter : (params) => params.data?.LOTH_Remark,
  },
  //   Shifted to OT
  // Blood product
  // Tranexamic acid
  // Delivery Timing
  // Remarks
  {
    field: "LOTI1",
    headerName: "Shifted to OT",
  },
  {
    field: "LOTI1_TimeStamp",
    headerName: "Shifted to OT Time",
    valueGetter: (params) => params.data?.LOTI1_TimeStamp,
  },
  {
    field: "LOTI2",
    headerName: "Blood transfusion",
  },
  {
    field: "LOTI2_TimeStamp",
    headerName: "Blood transfusion Time",
    valueGetter: (params) => params.data?.LOTI2_TimeStamp,
  },
  {
    field: "LOTI3",
    headerName: "Tranexamic acid",
  },
  {
    field: "LOTI3_TimeStamp",
    headerName: "Tranexamic acid Time",
    valueGetter: (params) => params.data?.LOTI3_TimeStamp,
  },
  {
    field: "LOTI4",
    headerName: "Delivery Timing",
  },
  {
    field: "LOTI4_TimeStamp",
    headerName: "Delivery Timing Time",
    valueGetter: (params) => params.data?.LOTI4_TimeStamp,
  },
  // Referred to Higher Center
  // Disposal from Emergency Department
  // {
  //   field: "LOTI5",
  //   headerName: "Referred to Higher Center",
  // },
  // {
  //   field: "LOTI5_TimeStamp",
  //   headerName: "Referred to Higher Center Time",
  //   valueGetter: (params) => params.data?.LOTI5_TimeStamp,
  // },
  // {
  //   field: "LOTI6",
  //   headerName: "Disposal from Emergency Department",
  // },
  // {
  //   field: "LOTI6_TimeStamp",
  //   headerName: "Disposal from Emergency Department Time",
  //   valueGetter: (params) => params.data?.LOTI6_TimeStamp,
  // },
  {
    field: "LOTI_Remark",
    headerName: "Remark",
    valueGetter : (params) => params.data?.LOTI_Remark,
  },
  // Identification of Toxidrome
  // 20 WBCT 
  // Anti-venom Administration
  // ASV ( Mention N of vials)
  // Remarks
  {
    field: "LOTJ1",
    headerName: "Identification of Toxidrome",
  },
  {
    field: "LOTJ1_TimeStamp",
    headerName: "Identification of Toxidrome Time",
    valueGetter: (params) => params.data?.LOTJ1_TimeStamp,
  },
  {
    field: "LOTJ2",
    headerName: "WBCT",
  },
  {
    field: "LOTJ2_TimeStamp",
    headerName: "WBCT Time",
    valueGetter: (params) => params.data?.LOTJ2_TimeStamp,
  },
  {
    field: "LOTJ3",
    headerName: "Anti-venom Administration",
  },
  {
    field: "LOTJ3_TimeStamp",
    headerName: "Anti-venom Administration Time",
    valueGetter: (params) => params.data?.LOTJ3_TimeStamp,
  },
  {
    field: "LOTJ4",
    headerName: "ASV ( Mention N of vials)",
  },
  {
    field: "LOTJ4_TimeStamp",
    headerName: "ASV ( Mention N of vials) Time",
    valueGetter: (params) => params.data?.LOTJ4_TimeStamp,
  },
  // Referred to Higher Center
  // Disposal from Emergency Department
  // {
  //   field: "LOTJ5",
  //   headerName: "Referred to Higher Center",
  // },
  // {
  //   field: "LOTJ5_TimeStamp",
  //   headerName: "Referred to Higher Center Time",
  //   valueGetter: (params) => params.data?.LOTJ5_TimeStamp,
  // },
  // {
  //   field: "LOTJ6",
  //   headerName: "Disposal from Emergency Department",
  // },
  // {
  //   field: "LOTJ6_TimeStamp",
  //   headerName: "Disposal from Emergency Department Time",
  //   valueGetter: (params) => params.data?.LOTJ6_TimeStamp,
  // },
  {
    field: "LOTJ_Remark",
    headerName: "Remark",
    valueGetter : (params) => params.data?.LOTJ_Remark,
  },
  // Fluid Resuscitation Initiation
  // Disposal from Emergency Department
  // Remarks
  {
    field: "LOTK1",
    headerName: "Fluid Resuscitation Initiation",
  },
  {
    field: "LOTK1_TimeStamp",
    headerName: "Fluid Resuscitation Initiation Time",
    valueGetter: (params) => params.data?.LOTK1_TimeStamp,
  },
  // Referred to Higher Center 
  // {
  //   field: "LOTK2",
  //   headerName: "Referred to Higher Center",
  // },
  // {
  //   field: "LOTK2_TimeStamp",
  //   headerName: "Referred to Higher Center Time",
  //   valueGetter: (params) => params.data?.LOTK2_TimeStamp,
  // },
  {
    field: "LOTK3",
    headerName: "Disposal from Emergency Department",
  },
  {
    field: "LOTK3_TimeStamp",
    headerName: "Disposal from Emergency Department Time",
    valueGetter: (params) => params.data?.LOTK3_TimeStamp,
  },
  {
    field: "LOTK_Remark",
    headerName: "Remark",
    valueGetter : (params) => params.data?.LOTK_Remark,
  },
];

export const LOTFinalColumnsExport = generateColumns(columns);
