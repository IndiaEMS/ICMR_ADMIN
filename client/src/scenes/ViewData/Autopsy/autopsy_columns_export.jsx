const column = [
  {
    field: "id",
    headerName: "Record ID",
    checkboxSelection: true,
    headerCheckboxSelection: false,
    width: 250,
    valueGetter: (params) => params.data._id,
  },
  { field: "FA1", headerName: "FA.1 : Name of the respondent:" },
  {
    field: "FA2",
    headerName: "FA.2 : Respondent ID:",
  },
  {
    field: "FA3",
    headerName: "FA.3 : Relationship of respondent with deceased:",
  },
  {
    field: "FA4",
    headerName:
      "FA.4 : Did the respondent live with the deceased during the events that led to death?",
  },
  { field: "FA5", headerName: "FA.5 : Respondent's age in completed years" },
  { field: "FA6", headerName: "FA.6 : Respondent's sex" },
  { field: "FB1", headerName: "FB.1 : Name of the Head of the household:" },
  { field: "FB2", headerName: "FB.2 : Full name of the deceased:" },
  { field: "FB3", headerName: "FB.3 : Name of mother of the deceased:" },
  { field: "FB4", headerName: "FB.4 : Age in days:" },
  { field: "FB5", headerName: "FB.5 : Sex:" },
  {
    field: "FB6",
    headerName: "FB.6 : House address of the deceased (include PIN):",
  },
  { field: "FB7", headerName: "FB.7 : Date of death:" },
  {
    field: "FB8",
    headerName: "FB.8 : Place of death:",
    valueGetter: (member) => member?.FB8?.split(":")[0],
  },
  {
    field: "FB8",
    headerName: "FB.8 : Place of death: (Other Specify)",
    valueGetter: (member) => member?.FB8?.split(":")[1],
  },
  {
    field: "FB9",
    headerName: "FB.9 : What did the respondent think this person die of?",
  },
  {
    field: "FC1",
    headerName: "FC.1 : Did s/he die from an injury or accident?",
  },
  {
    field: "FC2",
    headerName: "FC.2 : If yes, what kind of injury or accident?",
  },
  {
    field: "FC3",
    headerName: "FC.3 : Was the child a single or multiple birth?",
  },
  { field: "FC4", headerName: "FC.4 : Where was s/he born?" },
  { field: "FC5", headerName: "FC.5 : Who attended the delivery?" },
  {
    field: "FC6",
    headerName: "FC.6 : How many months long was the pregnancy?",
  },
  {
    field: "FC7",
    headerName:
      "FC.7 : Was there any complication during the pregnancy, or during labour?",
  },
  { field: "FC8", headerName: "FC.8 : If yes, what complications occurred?" },
  {
    field: "FC9",
    headerName:
      "FC.9 : Did the mother receive 2 doses of tetanus toxoid during pregnancy?",
  },
  {
    field: "FD1",
    headerName:
      "FD.1 : Was the baby born alive (alive if the baby ever cried, moved or breathed)?",
  },
  {
    field: "FD2",
    headerName:
      "FD.2 : Were there any bruises or signs of injury on child's body after the birth?",
  },
  {
    field: "FD3",
    headerName:
      "FD.3 : Did s/he have any visible malformations at birth (very small head, mass on spine, etc.)?",
  },
  { field: "FD4", headerName: "FD.4 : What was the child's size at birth?" },
  {
    field: "FD5",
    headerName: "FD.5 : Was s/he able to breathe immediately after birth?",
  },
  {
    field: "FD6",
    headerName: "FD.6 : If yes, did s/he stop being able to breathe/cry?",
  },
  {
    field: "FD7",
    headerName:
      "FD.7 : If yes, how long (days) after birth did s/he stop breathing/crying?",
  },
  {
    field: "FD8",
    headerName:
      "FD.8 : Was s/he able to suckle normally during the first day of life? (choice = Mother had fits)",
  },
  {
    field: "FD8",
    headerName:
      "FD.8 : Was s/he able to suckle normally during the first day of life? (choice = Excessive bleeding before/during delivery)",
  },
  {
    field: "FD8",
    headerName:
      "FD.8 : Was s/he able to suckle normally during the first day of life? (choice = Waters broke one or more days before contractions started)",
  },
  {
    field: "FD8",
    headerName:
      "FD.8 : Was s/he able to suckle normally during the first day of life? (choice = Prolonged/difficult labour (12 hours or more))",
  },
  {
    field: "FD8",
    headerName:
      "FD.8 : Was s/he able to suckle normally during the first day of life? (choice = Operative delivery)",
  },
  {
    field: "FD8",
    headerName:
      "FD.8 : Was s/he able to suckle normally during the first day of life? (choice = Mother had fever)",
  },
  {
    field: "FD8",
    headerName:
      "FD.8 : Was s/he able to suckle normally during the first day of life? (choice = by delivered bottom or feet first)",
  },
  {
    field: "FD8",
    headerName:
      "FD.8 : Was s/he able to suckle normally during the first day of life? (choice = Baby had cord around neck)",
  },
  {
    field: "FD8",
    headerName:
      "FD.8 : Was s/he able to suckle normally during the first day of life? (choice = Unknown)",
  },
  {
    field: "FD9",
    headerName:
      "FD.9 : If yes, did s/he stop being able to suck in a normal way?",
  },
  {
    field: "FD10",
    headerName:
      "FD.10 : If yes, how long (days) after birth did s/he stop sucking?",
  },
  {
    field: "FE1",
    headerName: "FE.1 : For how many days was s/he sick before death?",
  },
  { field: "FE2", headerName: "FE.2 : Did s/he have fever?" },
  {
    field: "FE3",
    headerName: "FE.3 : If yes, how many days did the fever last?",
  },
  {
    field: "FE4",
    headerName: "FE.4 : Did s/he have any difficulty with breathing?",
  },
  {
    field: "FE5",
    headerName:
      "FE.5 : If yes, for how many days did the difficulty with breathing last?",
  },
  { field: "FE6", headerName: "FE.6 : Did s/he have fast breathing?" },
  {
    field: "FE7",
    headerName: "FE.7 : If yes, for how many days did the fast breathing last?",
  },
  { field: "FE8", headerName: "FE.8 : Did s/he have in-drawing of the chest?" },
  { field: "FE9", headerName: "FE.9 : Did s/he have a cough?" },
  {
    field: "FE10",
    headerName: "FE.10 : Did s/he have grunting (demonstrate)?",
  },
  {
    field: "FE11",
    headerName: "FE.11 : Did his/her nostrils flare with breathing?",
  },
  {
    field: "FE12",
    headerName: "FE.12 : Did s/he have diarrhoea (frequent liquid stools)?",
  },
  {
    field: "FE13",
    headerName:
      "FE.13 : If yes, for how many days were the stools more frequent or liquid?",
  },
  { field: "FE14", headerName: "FE.14 : Did s/he vomit?" },
  {
    field: "FE15",
    headerName:
      "FE.15 : Did s/he have redness around, or discharge from, the birth cord stump?",
  },
  {
    field: "FE16",
    headerName:
      "FE.16 : Did s/he have areas of skin that were red, hot or peeling?",
  },
  {
    field: "FE17",
    headerName:
      "FE.17 : Did s/he have a skin rash with blisters containing pus?",
  },
  { field: "FE18", headerName: "FE.18 : Did s/he have yellow eyes or skin?" },
  {
    field: "FE19",
    headerName: "FE.19 : Did s/he have spasms or fits (convulsions)?",
  },
  {
    field: "FE20",
    headerName: "FE.20 : Did s/he become unresponsive or unconscious?",
  },
  {
    field: "FE21",
    headerName: "FE.21 : Did s/he have a bulging fontanelle (describe)?",
  },
  {
    field: "FE22",
    headerName: "FE.22 : Did the child's body feel cold when touched?",
  },
  { field: "FF", headerName: "FF : Written narrative in local language" },

  { field: "GA1", headerName: "GA1 : Name of the respondent:" },
  { field: "GA2", headerName: "GA2 : Respondent ID:" },
  {
    field: "GA3",
    headerName: "GA3 : Relationship of respondent with deceased:",
  },
  {
    field: "GA4",
    headerName:
      "GA4 : Did the respondent live with the deceased during the events that led to death?",
  },
  { field: "GA5", headerName: "GA5 : Respondent's age in completed years" },
  { field: "GA6", headerName: "GA6 : Respondent's sex" },
  { field: "GB1", headerName: "GB1 : Name of the Head of the household:" },
  { field: "GB2", headerName: "GB2 : Full name of the deceased:" },
  { field: "GB3", headerName: "GB3 : Name of mother of the deceased:" },
  { field: "GB4", headerName: "GB4 : Age in Months or Years" },
  { field: "GB5", headerName: "GB5 : Sex" },
  {
    field: "GB6",
    headerName: "GB6 : Relationship of deceased to head of household:",
  },
  {
    field: "GB7",
    headerName: "GB7 : House address of the deceased (include PIN)",
  },
  { field: "GB8", headerName: "GB8 : Date of death" },
  {
    field: "GB9",
    headerName: "GB9 : Place of death",
    valueGetter: (member) => member?.GB9?.split(":")[0],
  },
  {
    field: "GB9",
    headerName: "GB9 : Place of death (Other Specify)",
    valueGetter: (member) => member?.GB9?.split(":")[1],
  },
  {
    field: "GB10",
    headerName: "GB10 : What did the respondent think this person die of?",
  },
  {
    field: "GC1",
    headerName: "GC1 : Did s/he die from an injury or accident?",
  },
  {
    field: "GC2",
    headerName: "GC2 : If yes, what kind of injury or accident?",
  },
  { field: "GD1", headerName: "GD1 : How was the child's size at birth?" },
  { field: "GD2", headerName: "GD2 : Was s/he born premature?" },
  {
    field: "GD3",
    headerName: "GD3 : If yes, after how many months of pregnancy?",
  },
  { field: "GD4", headerName: "GD4 : Was the child breast-fed?" },
  {
    field: "GD5",
    headerName:
      "GD5 : If yes, did the child stop feeding during the illness that led to death?",
  },
  {
    field: "GE1",
    headerName: "GE1 : For how many days was s/he sick before death?",
  },
  { field: "GE2", headerName: "GE2 : Did s/he have fever?" },
  {
    field: "GE3",
    headerName: "GE3 : If yes, how many days did the fever last?",
  },
  {
    field: "GE4",
    headerName: "GE4 : Was the fever accompanied by chills /rigors?",
  },
  { field: "GE5", headerName: "GE5 : Did s/he have convulsions or fits?" },
  {
    field: "GE6",
    headerName:
      "GE6 : Was s/he unconscious during the illness that led to death?",
  },
  {
    field: "GE7",
    headerName: "GE7 : Did s/he develop stiffness of the whole body?",
  },
  {
    field: "GE8",
    headerName: "GE8 : Did s/he have a stiff neck? (demonstrate)",
  },
  {
    field: "GE9",
    headerName:
      "GE9 : Did s/he have diarrhoea (more frequent or more liquid stools)?",
  },
  { field: "GE10", headerName: "GE10 : If yes, for how many days?" },
  {
    field: "GE11",
    headerName: "GE11 : Was there visible blood in the stools?",
  },
  {
    field: "GE12",
    headerName:
      "GE12 : If s/he had diarrhoea, was s/he given any fluids such as (local term for oral rehydration treatment)?",
  },
  { field: "GE13", headerName: "GE13 : Did s/he have a cough?" },
  { field: "GE14", headerName: "GE14 : If yes, for how many days?" },
  { field: "GE15", headerName: "GE15 : Was it…..?" },
  { field: "GE16", headerName: "GE16 : Did s/he have breathing difficulties?" },
  { field: "GE17", headerName: "GE17 : If yes, how many days?" },
  { field: "GE18", headerName: "GE18 : Did s/he have fast breathing?" },
  { field: "GE19", headerName: "GE19 : Did s/he have in-drawing of chest?" },
  {
    field: "GE20",
    headerName: "GE20 : Did s/he have wheezing? (demonstrate sound)",
  },
  {
    field: "GE21",
    headerName:
      "GE21 : During the breathing problems, did s/he receive any antibiotics?",
  },
  {
    field: "GE22",
    headerName: "GE22 : During the illness, did s/he have abdominal pain?",
  },
  { field: "GE23", headerName: "GE23 : If yes, was the pain in..?" },
  { field: "GE24", headerName: "GE24 : Did s/he have abdominal distention?" },
  { field: "GE25", headerName: "GE25 : Did s/he vomit?" },
  { field: "GE26", headerName: "GE26 : If yes, for how many days?" },
  {
    field: "GE27",
    headerName: "GE27 : Did the eye/skin colour change to yellow?",
  },
  {
    field: "GE28",
    headerName: "GE28 : Did s/he have any skin disease or rash?",
  },
  { field: "GE29", headerName: "GE29 : Was the rash…..?" },
  { field: "GE30", headerName: "GE30 : Was this measles (use local term)?" },
  {
    field: "GE31",
    headerName:
      "GE31 : During the illness that led to death, did s/he become very thin?",
  },
  {
    field: "GE32",
    headerName:
      "GE32 : During the weeks preceding death, did s/he suffer from lack of blood or appear pale?",
  },
  { field: "GE33", headerName: "GE33 : Did s/he have repeated illness?" },
  {
    field: "GE34",
    headerName: "GE34 : If yes, how many illnesses in the past six months?",
  },
  {
    field: "GE35",
    headerName:
      "GE35 : If yes, what were the common associated symptoms with the illness? (choice = Cough)",
  },
  {
    field: "GE35",
    headerName:
      "GE35 : If yes, what were the common associated symptoms with the illness? (choice = Diarrhoea)",
  },
  {
    field: "GE35",
    headerName:
      "GE35 : If yes, what were the common associated symptoms with the illness? (choice = Ear discharge)",
  },
  {
    field: "GE35",
    headerName:
      "GE35 : If yes, what were the common associated symptoms with the illness? (choice = Chills)",
  },
  {
    field: "GE35",
    headerName:
      "GE35 : If yes, what were the common associated symptoms with the illness? (choice = Other)",
  },
  {
    field: "GE35",
    headerName:
      "GE35 : If yes, what were the common associated symptoms with the illness? (choice = Unknown)",
  },
  { field: "GE36", headerName: "GE36 : Was s/he immunized?" },
  {
    field: "GE37",
    headerName: "GE37 : If yes, did s/he receive BCG injection?",
  },
  {
    field: "GE38",
    headerName: "GE38 : If yes, did s/he receive polio drops in the mouth?",
  },
  {
    field: "GE39",
    headerName:
      "GE39 : If yes, did s/he receive an injection for measles (use local term)?",
  },
  { field: "GF", headerName: "GF : Written narrative in local language" },

  { field: "HA1", headerName: "HA.1 : Name of the respondent:" },
  {
    field: "HA2",
    headerName: "HA.2 : Respondent ID: [Will be auto-generated following AA.2]",
  },
  {
    field: "HA3",
    headerName: "HA.3 : Relationship of respondent with deceased:",
  },
  {
    field: "HA4",
    headerName:
      "HA.4 : Did the respondent live with the deceased during the events that led to death?",
  },
  { field: "HA5", headerName: "HA.5 : Respondent's age in completed years" },
  { field: "HA6", headerName: "HA.6 : Respondent's sex" },
  {
    field: "HB1",
    headerName: "HB.1 : Full name of the Head of the household:",
  },
  { field: "HB2", headerName: "HB.2 : Full name of the deceased:" },
  { field: "HB3", headerName: "HB.3 : Age in Years" },
  { field: "HB4", headerName: "HB.4 : Sex" },
  {
    field: "HB5",
    headerName: "HB.5 : For work does s/he have to live away from home?",
  },
  { field: "HB6", headerName: "HB.6 : If yes, how many months in a year?" },
  {
    field: "HB7",
    headerName: "HB.7 : Relationship of deceased to head of household:",
  },
  {
    field: "HB8",
    headerName: "HB.8 : House address of the deceased (include PIN)",
  },
  { field: "HB9", headerName: "HB.9 : Date of death" },
  {
    field: "HB10",
    headerName: "HB.10 : Place of death",
    valueGetter: (member) => member?.HB10?.split(":")[0],
  },
  {
    field: "HB10",
    headerName: "HB.10 : Place of death (Other Specify)",
    valueGetter: (member) => member?.HB10?.split(":")[1],
  },
  {
    field: "HB11",
    headerName: "HB.11 : What did the respondent think this person die of?",
  },
  {
    field: "HC1",
    headerName:
      "HC.1 : Had a doctor ever stated that the deceased had any diseases?",
  },
  {
    field: "HC2",
    headerName: "HC.2 : If yes, what kind of disease the deceased had?",
  },
  {
    field: "HC3",
    headerName:
      "HC.3 : During the last year, did the weight of the deceased change significantly?",
  },
  {
    field: "HC4",
    headerName:
      "HC.4 : Was the deceased taking any medications regularly during the last five years?",
  },
  {
    field: "HD1",
    headerName: "HD.1 : Did s/he smoke tobacco within the last five years?",
  },
  { field: "HD2", headerName: "HD.2 : If yes, how many bidi per day?" },
  { field: "HD3", headerName: "HD.3 : If yes, how many cigarettes per day?" },
  { field: "HD4", headerName: "HD.4 : Any other tobacco smoked?" },
  {
    field: "HD5",
    headerName: "HD.5 : Did s/he chew tobacco within the last five years?",
  },
  {
    field: "HD6",
    headerName: "HD.6 : Did s/he apply tobacco within the last five years?",
  },
  {
    field: "HD7",
    headerName:
      "HD.7 : Did s/he normally drink alcohol (use local term) at least once a week during most weeks?",
  },
  {
    field: "HD8",
    headerName:
      "HD.8 : If yes, normal average number of days per week drink was taken. (1 to 7, or 9. Unknown)",
  },
  {
    field: "HD9",
    headerName:
      "HD.9 : Was s/he a pure vegetarian (consumed no eggs, meat or fish) for the last few years?",
  },
  {
    field: "HD10_1",
    headerName: "HD.10.1 : Was she either known or suspected to be pregnant?",
  },
  {
    field: "HD10_2",
    headerName: "HD.10.2 : Did she die within 42 days of delivery?",
  },
  {
    field: "HD10_3",
    headerName: "HD.10.3 : Did she die within 42 days of abortion?",
  },
  { field: "HE", headerName: "HE : Written narrative in local language" },

  {
    field: "IA1",
    headerName: "IA.1 : Full name of the Head of the household:",
  },
  { field: "IA2", headerName: "IA.2 : Full name of the deceased:" },
  { field: "IA3", headerName: "IA.3 : Was she pregnant?" },
  { field: "IA4", headerName: "IA.4 : If yes, how many months" },
  {
    field: "IA5",
    headerName: "IA.5 : Did she die within 42 days of delivery/abortion?",
  },
  {
    field: "IA6",
    headerName: "IA.6 : Did she receive antenatal care during the pregnancy?",
  },
  {
    field: "IA7",
    headerName:
      "IA.7 : How many times did she receive antenatal care during the pregnancy?",
  },
  {
    field: "IA8",
    headerName: "IA.8 : How many days before death did she deliver/abortion?",
  },
  { field: "IA9", headerName: "IA.9 : Where was the delivery/abortion?" },
  { field: "IA10", headerName: "IA.10 : Who attended the delivery?" },
  { field: "IB1", headerName: "IB.1 : Did she have a caesarean delivery?" },
  {
    field: "IB2",
    headerName:
      "IB.2 : Did she have too much bleeding at the beginning of labour pain?",
  },
  {
    field: "IB3",
    headerName:
      "IB.3 : Did she have too much bleeding during labour (before delivering the baby)?",
  },
  {
    field: "IB4",
    headerName:
      "IB.4 : Did she have too much bleeding after delivering the baby?",
  },
  { field: "IB5", headerName: "IB.5 : Did she have prolonged labour >12hrs?" },
  {
    field: "IB6",
    headerName: "IB.6 : Did she have difficulty in delivering the baby?",
  },
  {
    field: "IB7",
    headerName: "IB.7 : Did she have a forceps or vacuum delivery?",
  },
  {
    field: "IB8",
    headerName: "IB.8 : Did she have difficulty in delivering the placenta?",
  },
  {
    field: "IB9",
    headerName: "IB.9 : Did she have fits and loss of consciousness?",
  },
  {
    field: "IB10",
    headerName:
      "IB.10 : Did she have fits during pregnancy/during labour or after labour?",
  },
  { field: "IB11", headerName: "IB.11 : Did she have fever?" },
  {
    field: "IB12",
    headerName: "IB.12 : Did she have foul smelling discharge?",
  },
  { field: "IC", headerName: "IC : Written narrative in local language" },
];

const generateColumns = (columns) => {
  return columns.map((column) => ({
    field: column.field,
    headerName: column.headerName,
    valueGetter: (params) => {
      // const member = params?.data?.Emergency_Data?.[index];
      if (column.valueGetter) {
        return column.valueGetter(params);
      } else {
        if (Array.isArray(params?.data?.[column.field])) {
          return params?.data?.[column.field.split("_")[0]]?.[
            column.field.split("_")[1]
          ];
        } else {
          return params?.data?.[column.field];
        }
      }
    },
  }));
};

export const AutopsyColumnsExport = [...generateColumns(column)];
