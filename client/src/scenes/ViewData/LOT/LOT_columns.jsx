import generateColumns from "./../generateColumns";
import getOptionsIndex from "./../getOptionsIndex";

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
  {
    field: "LOTA9",
    headerName: "GPS Coordinates:",
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
    headerName: "Arrival Time:",
  },
  {
    field: "LOTB2",
    headerName: "Triaged Time",
  },
  {
    field: "LOTB3",
    headerName: "Vital Sign Assessment Time",
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
  },
  {
    field: "LOTC2",
    headerName: "Thrombolysis",
  },
  {
    field: "LOTC2_TimeStamp",
    headerName: "Thrombolysis Time",
  },
  {
    field: "LOTC3",
    headerName: "PCI",
  },
  {
    field: "LOTC3_TimeStamp",
    headerName: "PCI Time",
  },
  {
    field: "LOTC_Remark",
    headerName: "Remark",
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
  },
  {
    field: "LOTD2",
    headerName: "Thrombolysis",
  },
  {
    field: "LOTD2_TimeStamp",
    headerName: "Thrombolysis Time",
  },
  {
    field: "LOTD3",
    headerName: "Thrombectomy",
  },
  {
    field: "LOTD3_TimeStamp",
    headerName: "Thrombectomy Time",
  },
  {
    field: "LOTD_Remark",
    headerName: "Remark",
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
  },
  {
    field: "LOTE2",
    headerName: "Radiology Investigation",
  },
  {
    field: "LOTE2_TimeStamp",
    headerName: "Radiology Investigation Time",
  },
  {
    field: "LOTE3",
    headerName: "Shifted to OT",
  },
  {
    field: "LOTE3_TimeStamp",
    headerName: "Shifted to OT Time",
  },
  {
    field: "LOTE4",
    headerName: "IV Tranexamic Acid",
  },
  {
    field: "LOTE4_TimeStamp",
    headerName: "IV Tranexamic Acid Time",
  },
  {
    field: "LOTE_Remark",
    headerName: "Remark",
  },
  // Oxygen Therapy Initiation
  // Bronchodilators Initiation time
  // Medication Administration (Antibiotics)
  // Remarks
  {
    field: "LOTF1",
    headerName: "Oxygen Therapy Initiation",
  },
  {
    field: "LOTF1_TimeStamp",
    headerName: "Oxygen Therapy Initiation Time",
  },
  {
    field: "LOTF2",
    headerName: "Bronchodilators Initiation",
  },
  {
    field: "LOTF2_TimeStamp",
    headerName: "Bronchodilators Initiation Time",
  },
  {
    field: "LOTF3",
    headerName: "Medication Administration (Antibiotics)",
  },
  {
    field: "LOTF3_TimeStamp",
    headerName: "Medication Administration (Antibiotics) Time",
  },
  {
    field: "LOTF_Remark",
    headerName: "Remark",
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
  },
  {
    field: "LOTG2",
    headerName: "Identification of Toxidrome",
  },
  {
    field: "LOTG2_TimeStamp",
    headerName: "Identification of Toxidrome Time",
  },
  {
    field: "LOTG_Remark",
    headerName: "Remark",
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
  },
  {
    field: "LOTH2",
    headerName: "Blood Transfusion given",
  },
  {
    field: "LOTH2_TimeStamp",
    headerName: "Blood Transfusion given Time",
  },
  {
    field: "LOTH3",
    headerName: "Surgical Intervention done",
  },
  {
    field: "LOTH3_TimeStamp",
    headerName: "Surgical Intervention done Time",
  },
  {
    field: "LOTH4",
    headerName: "Tranexamic acid given",
  },
  {
    field: "LOTH4_TimeStamp",
    headerName: "Tranexamic acid given Time",
  },
  {
    field: "LOTH_Remark",
    headerName: "Remark",
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
  },
  {
    field: "LOTI2",
    headerName: "Blood product",
  },
  {
    field: "LOTI2_TimeStamp",
    headerName: "Blood product Time",
  },
  {
    field: "LOTI3",
    headerName: "Tranexamic acid",
  },
  {
    field: "LOTI3_TimeStamp",
    headerName: "Tranexamic acid Time",
  },
  {
    field: "LOTI4",
    headerName: "Delivery Timing",
  },
  {
    field: "LOTI4_TimeStamp",
    headerName: "Delivery Timing Time",
  },
  {
    field: "LOTI_Remark",
    headerName: "Remark",
  },
  // Anti-venom Administration
  // ASV ( Mention N of vials)
  // Remarks
  {
    field: "LOTJ1",
    headerName: "Anti-venom Administration",
  },
  {
    field: "LOTJ1_TimeStamp",
    headerName: "Anti-venom Administration Time",
  },
  {
    field: "LOTJ2",
    headerName: "ASV (Mention N of vials)",
  },
  {
    field: "LOTJ2_TimeStamp",
    headerName: "ASV Time",
  },
  {
    field: "LOTJ_Remark",
    headerName: "Remark",
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
  },
  {
    field: "LOTK2",
    headerName: "Disposal from Emergency Department",
  },
  {
    field: "LOTK2_TimeStamp",
    headerName: "Disposal from Emergency Department Time",
  },
  {
    field: "LOTK_Remark",
    headerName: "Remark",
  },
];

export const LOTColumns = generateColumns(columns);
