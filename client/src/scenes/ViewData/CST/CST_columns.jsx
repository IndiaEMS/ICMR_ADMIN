const generateEmergencyColumns = (data) => {
  const maxMembers = Math.max(
    ...(data ?? []).map((row) => row.Emergency_Data?.length || 0)
  );

  return Array.from({ length: maxMembers }, (_, index) => {
    const columns = [
      { field: `Name`, headerName: "Name" },
      { field: `Age`, headerName: "Age" },
      { field: `Sex`, headerName: "Sex" },
      { field: `MemberID`, headerName: "MemberID" },
    ];

    return columns.map((column) => ({
      field: column.field,
      headerName: column.headerName,
      valueGetter: (params) => {
        const member = params?.data?.Emergency_Data?.[index];

        return member ? member[column.field] : "";
      },
    }));
  }).flat();
};
const generateBColumns = (data) => {
  const maxMembers = Math.max(
    ...(data ?? []).map((row) => row.Emergency_Data?.length || 0)
  );

  return Array.from({ length: maxMembers }, (_, index) => {
    const columns = [
      {
        field: "B0",
        headerName:
          "B.0 When did the Patient (Name of the patient from the list) suffered with this condition?",
      },
      { field: "B1", headerName: "B.1 Marital satus:" },
      { field: "B2", headerName: "B.2 Level of education:" },
      { field: "B3", headerName: "B.3 Occupation:" },
      {
        field: "B4_0",
        headerName:
          "B.4 Which of the following Health Insurance coverage you or the person with emergency condition or the deceased had? (Choice = Private cashless)",
      },
      {
        field: "B4_1",
        headerName:
          "B.4 Which of the following Health Insurance coverage you or the person with emergency condition or the deceased had? (Choice = Private reimbursement)",
      },
      {
        field: "B4_2",
        headerName:
          "B.4 Which of the following Health Insurance coverage you or the person with emergency condition or the deceased had? (Choice = Central Health Insurance Scheme (Ayushmaan Bharat/ CGHS / etc.))",
      },
      {
        field: "B4_3",
        headerName:
          "B.4 Which of the following Health Insurance coverage you or the person with emergency condition or the deceased had? (Choice = State Health Insurance Scheme)",
      },
      {
        field: "B4_4",
        headerName:
          "B.4 Which of the following Health Insurance coverage you or the person with emergency condition or the deceased had? (Choice = Community Health Insurance Programme)",
      },
      {
        field: "B4_5",
        headerName:
          "B.4 Which of the following Health Insurance coverage you or the person with emergency condition or the deceased had? (Choice = None)",
      },
      {
        field: "B4_6",
        headerName:
          "B.4 Which of the following Health Insurance coverage you or the person with emergency condition or the deceased had? (Choice = Prefer not to disclose/ Refuse)",
      },
      {
        field: "B4_7",
        headerName:
          "B.4 Which of the following Health Insurance coverage you or the person with emergency condition or the deceased had? (Choice = Don’t Know)",
      },
      { field: "B5_dt", headerName: "B.5 When did this incident take place?" },
      {
        field: "B10",
        headerName:
          "B.10 At the start of symptoms was any medication taken/ given at home to alleviate symptoms?",
      },
      {
        field: "B11_if",
        headerName: "B.11 If yes, what medication was given?",
      },
      {
        field: "B12",
        headerName: "B.12 Which was the first symptom recognised as serious?",
      },
      {
        field: "B13",
        headerName: "B.13 Who first recognized the symptoms to be serious?",
      },
      {
        field: "B13",
        headerName:
          "B.13 Who first recognized the symptoms to be serious? (other specify)",
      },
      {
        field: "B14",
        headerName:
          "B.14 What was your first course of action on identifying the emergency condition?",
      },
      {
        field: "B15",
        headerName:
          "B.15 If Home visit by a doctor, then which type of doctor visited to attend the emergency patient?",
      },
      {
        field: "B15",
        headerName:
          "B.15 If Home visit by a doctor, then which type of doctor visited to attend the emergency patient? (Other specify)",
      },
      {
        field: "B16",
        headerName:
          "B.16 Who suggested you visit the healthcare facility for emergency care?",
      },
      {
        field: "B16",
        headerName:
          "B.16 Who suggested you visit the healthcare facility for emergency care? (Other Specify)",
      },
      {
        field: "B17",
        headerName:
          "B.17 How much time did it take to decide to seek care or call an ambulance or any transport after recognizing the symptom? (In Min/Hour)",
        valueGetter: (params) =>
          `${params?.B17_1 ?? ""} ${params?.B17_2 ? ":" : ""} ${
            params?.B17_2 ?? ""
          }`,
      },
      {
        field: "B18",
        headerName:
          "B.18 How did you or the patient reach the first health care facility?",
      },
      {
        field: "B18",
        headerName:
          "B.18 How did you or the patient reach the first health care facility? (Other specify)",
      },
      {
        field: "B19",
        headerName:
          "B.19 What type of transport was used to reach the first health care facility?",
      },
      {
        field: "B19",
        headerName:
          "B.19 What type of transport was used to reach the first health care facility? (Other specify)",
      },
      {
        field: "B20",
        headerName:
          "B.20 If Govt. Ambulance, Which ambulance service you opted for?",
      },
      {
        field: "B20",
        headerName:
          "B.20 If Govt. Ambulance, Which ambulance service you opted for? (Other Specify)",
      },
      {
        field: "B21",
        headerName:
          "B.21 Were there any problems in arranging for transport of the patient?",
        valueGetter: (params) => params?.B21?.split(":")[0],
      },
      {
        field: "B21",
        headerName:
          "B.21 Were there any problems in arranging for transport of the patient? (other specify)",
        valueGetter: (params) => params?.B21?.split(":")[1],
      },
      {
        field: "B22",
        headerName:
          "B.22 How much time the ambulance/ any transport took to reach the point of incident? (In Min/Hour)",
        valueGetter: (params) =>
          `${params?.B22_1 ?? ""} ${params?.B22_2 ? ":" : ""} ${
            params?.B22_2 ?? ""
          }`,
      },
      {
        field: "B23",
        headerName:
          "B.23 How much time the ambulance/ any transport took to reach the first facility from the point of incident? (in minutes/ hours)",
        valueGetter: (params) =>
          `${params?.B23_1 ?? ""} ${params?.B23_2 ? ":" : ""} ${
            params?.B23_2 ?? ""
          }`,
      },
      {
        field: "B24",
        headerName: "B.24 Which type of facility did you visit first?",
      },
      {
        field: "B24",
        headerName:
          "B.24 Which type of facility did you visit first? (Other Specify)",
      },
      { field: "B25", headerName: "B.25 What was the name of the facility?" },
      {
        field: "B26_0",
        headerName:
          "B.26 Who suggested you the above-mentioned facility for emergency care? (choice = Self)",
      },
      {
        field: "B26_1",
        headerName:
          "B.26 Who suggested you the above-mentioned facility for emergency care? (choice = Family members)",
      },
      {
        field: "B26_2",
        headerName:
          "B.26 Who suggested you the above-mentioned facility for emergency care? (choice = Neighbour)",
      },
      {
        field: "B26_3",
        headerName:
          "B.26 Who suggested you the above-mentioned facility for emergency care? (choice = ASHA/AWW)",
      },
      {
        field: "B26_4",
        headerName:
          "B.26 Who suggested you the above-mentioned facility for emergency care? (choice = ANM)",
      },
      {
        field: "B26_5",
        headerName:
          "B.26 Who suggested you the above-mentioned facility for emergency care? (choice = CHO)",
      },
      {
        field: "B26_5",
        headerName:
          "B.26 Who suggested you the above-mentioned facility for emergency care? (Other Specify)",
      },
      {
        field: "B27",
        headerName:
          "B.27 How long after reaching the first HCF (in emergency) was the patient attended?",
      },
      {
        field: "B28",
        headerName: "B.28 Who attended the patient at the first HCF?",
      },
      {
        field: "B29",
        headerName: "B.29 Was any treatment started at the HCF?",
      },
      {
        field: "B30",
        headerName:
          "B.30 Were any laboratory &/or radiology investigations done at the HCF?",
      },
      {
        field: "B31",
        headerName: "B.31 How much time was spent in investigations?",
      },
      {
        field: "B32",
        headerName: "B.32 Was the patient shifted to ICU/ CCU/ HDU at HCF?",
      },
      {
        field: "B33",
        headerName:
          "B.33 What was the final outcome of visiting the first facility or home visit by Doctor?",
      },
      {
        field: "B34",
        headerName:
          "B.34 What was the final diagnosis on consultation with the doctor or mentioned in the final discharge summary?",
      },
    ];

    return columns.map((column) => ({
      field: column.field,
      headerName: column.headerName,
      valueGetter: (params) => {
        const member = params?.data?.Emergency_Data?.[index];
        if (column.valueGetter) {
          return column.valueGetter(member);
        } else {
          if (Array.isArray(member?.[column.field.split("_")[0]])) {
            return member?.[column.field.split("_")[0]]?.[
              column.field.split("_")[1]
            ];
          } else {
            return member ? member[column.field] : "";
          }
        }

        // if (Array.isArray(member?.[column.field.split("_")[0]])) {
        //   return member?.[column.field.split("_")[0]]?.[
        //     column.field.split("_")[1]
        //   ];
        // }

        // return member ? member[column.field] : "";
      },
    }));
  }).flat();
};

//   return Array.from({ length: maxMembers }, (_, index) => ({
//     field: `Emergency_Data_${index}`,
//     headerName: `Member ${index + 1}`,
//     children: [
//       { field: `Emergency_Data_${index}_Name`, headerName: "Name" },
//       { field: `Emergency_Data_${index}_Age`, headerName: "Age" },
//       { field: `Emergency_Data_${index}_Sex`, headerName: "Sex" },
//       { field: `Emergency_Data_${index}_MemberID`, headerName: "MemberID" },
//     ],
//     // valueGetter: (params) => {
//     //   const member = params.data?.Emergency_Data?.[index];
//     //   return member
//     //     ? `Name: ${member.Name}, Age: ${member.Age}, Sex: ${member.Sex}, MemberID: ${member.MemberID}`
//     //     : null;
//     // },
//   }));
// };

export const CSTColumns = (data) => {
  const emergencyColumns = generateEmergencyColumns(data);
  const BColumns = generateBColumns(data);

  return [
    {
      headerName: "Record ID",
      field: "id",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 250,
      valueGetter: (params) => params.data._id,
    },
    { field: "AA1", headerName: "AA.1 Date & Time:" },
    { field: "AA2", headerName: "AA.2 Site:" },
    { field: "AA3", headerName: "AA.3 Name of the Data Collector:" },
    { field: "AA4", headerName: "AA.4 Respondent ID:" },
    {
      field: "AB1",
      headerName:
        "AB.1 Block [Drop Down Menu of Blocks for Respective District]",
    },
    { field: "AB2", headerName: "AB.2 Type of PSU:" },
    { field: "AB3", headerName: "AB.3 Name of PSU (Town/Village):" },
    { field: "AB4", headerName: "AB.4 GPS Co-ordinates:" },
    { field: "AB5", headerName: "AB.5 Household ID Number:" },
    {
      field: "AB6",
      headerName:
        "AB.6 For how long have you been living in this city/village with your family?",
    },
    {
      field: "AC1",
      headerName:
        "AC.1 How many members are currently residing in his household?",
    },
    ...emergencyColumns, // Spread the dynamically generated columns
    { field: "AC2_1", headerName: "AC.2.1 Name of Respondent?" },
    {
      field: "AC3",
      headerName:
        "AC.3 Are there any other persons such as small children or infants that we have not listed?",
    },
    {
      field: "AC4",
      headerName:
        "AC.4 Are there any other people who may not be members of your family such as domestic servants who usually live here?",
    },
    {
      field: "AC5",
      headerName:
        "AC.5 In the past one year, did any member of this household have any health emergency that could have required any sort of medical attention or treatment?",
    },
    {
      field: "AC6",
      headerName:
        "AC.6.1 In the past one year, did you or any member of this household suffered from sudden injury in Road Traffic Accident/ fracture/ severe fall/ drowning/ stabbing/ gunshot/ any other assault/ any attempt to self-harm/ domestic violence/ homicidal etc.?",
    },
    {
      field: "AC6_1_if",
      headerName:
        "AC6.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
    },
    {
      field: "AC6_2",
      headerName:
        "AC.6.2 If yes, could you please tell who all from your Household suffered with this condition?",
    },
    {
      field: "AC6_2",
      headerName:
        "AC.6.2 If yes, could you please tell who all from your Household suffered with this condition?",
    },
    {
      field: "AC7",
      headerName:
        "AC.7.1 In the past one year, did you or any member of this household suffered from severe/ minor burns etc.",
    },
    {
      field: "AC7_1_if",
      headerName:
        "AC.7.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
    },
    {
      field: "AC7_2",
      headerName:
        "Ac.7.2 If yes, could you please tell who all from your Household suffered with this condition?",
    },
    {
      field: "AC8",
      headerName:
        "AC.8.1 In the past one year, has anyone in your household had a history of heart attack or sudden onset of acute chest pain/ heaviness/ constriction, with possible radiation to the left arm, neck, or back, associated with symptoms such as upper abdominal pain/ palpitations/ dizziness/ profuse sweating, and exacerbated by exertion after meals?",
    },
    {
      field: "AC8_1_if",
      headerName:
        "AC.8.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
    },
    {
      field: "AC8_2",
      headerName:
        "AC.8.2 If yes, could you please tell who all from your Household suffered with this condition?",
    },
    {
      field: "AC9",
      headerName:
        "Ac.9.1 In the past one year, did you or any member of this household suffered with brain stroke or symptoms like sudden onset of weakness, especially one side of the body/ loss of consciousness/ altered sensorium/ Imbalance/ blurred vision/ facial deviation/ drooping of eyelid/ speech abnormality with numbness and tingling sensation, or difficulty in speaking or understanding speech (aphasia), or sudden severe headache with no known cause of one's life (haemorrhagic strokes)?",
    },
    {
      field: "AC9_1_if",
      headerName:
        "AC.9.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
    },
    {
      field: "AC9_2",
      headerName:
        "AC.9.2 If yes, could you please tell who all from your Household suffered with this condition?",
    },
    {
      field: "AC10",
      headerName:
        "AC.10.1 In the past one year, has anyone in your household experienced breathlessness with or without sudden onset of fever/ cough with expectoration/ chest pain (pleuritic)/ fast breathing/ not able to speak complete sentences/ loss of consciousness/ or chest tightness leading to suspicion of pneumonia?",
    },
    {
      field: "AC10_1_if",
      headerName:
        "AC.10.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
    },
    {
      field: "AC10_2",
      headerName:
        "AC.10.2 If yes, could you please tell who all from your Household suffered with this condition?",
    },
    {
      field: "AC11_1",
      headerName:
        "AC.11.1 In the past one year, did any women in your household give birth to a child or had any episode of miscarriage/ abortion?",
    },
    {
      field: "AC11_1_if",
      headerName:
        "AC.11.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
    },
    {
      field: "AC11_2",
      headerName:
        "AC.11.2 If “Yes” to AC.11.1, did women or mother suffer with any condition like vaginal bleeding that required blood transfusion or sudden increase in blood pressure or decreased urine output or loss of fetal movements or loss of consciousness or seizure or fits etc., before / during / after delivery?",
    },
    {
      field: "AC11_2_if",
      headerName:
        "AC.11.2.2 If Yes, What were the symptoms of emergency conditions and first course of action?",
    },
    {
      field: "AC11_3",
      headerName:
        "AC.11.3 If “Yes” to AC.11.2, could you please tell us who suffered with this condition?",
    },
    {
      field: "AC11_4",
      headerName:
        'AC.11.4 If "Yes" to AC.11.1, At the time of birth did the new-born had any issues such as not cried/ delayed cry/ not able to breath/ body getting cold/ minimal limb movement/ blue discoloration/ taken no ICU after delivery/ convulsion/ sudden onset of fever/ difficulty in breast feeding/ excessive diarrhoea/ jaundice or any other condition that required a longer hospital stay before being discharged/ that required a further admission after discharge within the first month of the birth?',
    },
    {
      field: "AC11_4_if",
      headerName:
        "AC.11.4.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
    },
    {
      field: "AC11_5",
      headerName:
        "AC.11.5 If “Yes” to AC.11.4, could you please tell us who suffered with this condition?",
    },
    {
      field: "AC12_1",
      headerName:
        "AC.12.1 In the past one year have you or anyone from your family member been bitten by a snake?",
    },
    {
      field: "AC12_1_if",
      headerName:
        "AC.12.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
    },
    {
      field: "AC12_2",
      headerName:
        "AC.12.2 If “Yes”, could you please tell who all suffered with this condition?",
    },
    {
      field: "AC13_1",
      headerName:
        "AC.13.1 In the past one year, did you or anyone of your family member have a history of accidental/ intentional ingestion of poison/ ingestion or exposure to pesticides/ insecticides/ ingestion of rat poison/ phenyl any hazardous substance/ chemical substance or any other substance that could have required any sort of medical attention or treatment?",
    },
    {
      field: "AC13_1_if",
      headerName:
        "AC.13.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
    },
    {
      field: "AC13_2",
      headerName:
        "AC.13.2 If Yes, Could you please tell who all suffered with this condition?",
    },
    {
      field: "AC14_1",
      headerName:
        "AC.14.1 Apart from the above-mentioned conditions, did anyone suffer from any other conditions that required immediate emergency services?",
    },
    {
      field: "AC14_1_if",
      headerName:
        "AC.14.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
    },
    {
      field: "AC14_2",
      headerName:
        "AC.14.2 If yes, could you please tell who all suffered with this condition?",
    },
    {
      field: "AC15_1",
      headerName:
        "AC.15.1 In the last one year, did any member in your household lost his/her life due to any health emergency condition?",
    },
    {
      field: "AC15_2",
      headerName:
        "AC.15.2 If yes, how many members in your household lost his/her life due to any health emergency condition (Specify)",
    },
    {
      field: "AC15_4_0",
      headerName:
        "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Trauma)",
    },
    {
      field: "AC15_4_1",
      headerName:
        "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Burn: Severe / Minor burns)",
    },
    {
      field: "AC15_4_2",
      headerName:
        "Ac.15.4 What werw the symptoms the deceased complained about? (choice = STEMI)",
    },
    {
      field: "AC15_4_3",
      headerName:
        "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Stroke)",
    },
    {
      field: "AC15_4_4",
      headerName:
        "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Acute Respiratory Illness)",
    },
    {
      field: "AC15_4_5",
      headerName:
        "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Postpartum Haemorrhage & Pre-Eclampsia)",
    },
    {
      field: "AC15_4_6",
      headerName:
        "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Neonatal Emergency)",
    },
    {
      field: "AC15_4_7",
      headerName:
        "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Snake bite)",
    },
    {
      field: "AC15_4_8",
      headerName:
        "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Poisoning)",
    },
    {
      field: "AC15_4_9",
      headerName:
        "Ac.15.4 What werw the symptoms the deceased complained about? (choice = others)",
    },
    {
      field: "AC15_4_9_other_specify",
      headerName:
        "Ac.15.4 What werw the symptoms the deceased complained about? (Others(Specify))",
    },
    ...BColumns,
  ];
};
