export const CSTRows = (data) =>
  data.map((row) => {
    // console.log(row);
    const Member_Data = row.Emergency_Data
      ? row.Emergency_Data.reduce((acc, item, index) => {
          acc[`Emergency_Data_${index}_Name`] = item?.Name;
          acc[`Emergency_Data_${index}_Age`] = item?.Age;
          acc[`Emergency_Data_${index}_Sex`] = item?.Sex;
          acc[`Emergency_Data_${index}_MemberID`] = item?.MemberID;

          return acc;
        }, {})
      : {};
    const B_Data = row.Emergency_Data
      ? row.Emergency_Data.reduce((acc, item, index) => {
          acc[`Emergency_Data_${index}_Name`] = item?.Name;
          acc[`Emergency_Data_${index}_Age`] = item?.Age;
          acc[`Emergency_Data_${index}_Sex`] = item?.Sex;
          acc[`Emergency_Data_${index}_MemberID`] = item?.MemberID;

          return acc;
        }, {})
      : {};

    return {
      id: row._id,
      AA1: row.AA1,
      AA2: row.AA2,
      AA3: row.AA3,
      AA4: row.AA4,
      AB1: row.AB1,
      AB2: row.AB2,
      AB3: row.AB3,
      AB4_latitude: row.AB4?.latitude,
      AB4_longitude: row.AB4?.longitude,
      AB4_district: row.AB4?.district,
      AB4_state: row.AB4?.state,
      AB5: row.AB5,
      AB6: row.AB6,
      AC1: row.AC1,
      AC2_1: row.AC2_1,
      // Emergency_Data: row.Emergency_Data,
      ...Member_Data,
      AC3: row.AC3,
      AC4: row.AC4,
      AC5: row.AC5,
      AC6: row.AC6,
      AC6_1_if: row.AC6_1_if,
      AC6_2: row.AC6_2?.[0],
      AC7: row.AC7_1,
      AC7_1_if: row.AC7_1_if,
      AC7_2: row.AC7_2 ? row.AC7_2.join(", ") : "",
      AC8: row.AC8_1,
      AC8_1_if: row.AC8_1_if,
      AC8_2: row.AC8_2 ? row.AC8_2.join(", ") : "",
      AC9: row.AC9_1,
      AC9_1_if: row.AC9_1_if,
      AC9_2: row.AC9_2 ? row.AC9_2.join(", ") : "",
      AC10: row.AC10_1,
      AC10_1_if: row.AC10_1_if,
      AC10_2: row.AC10_2 ? row.AC10_2.join(", ") : "",
      AC11_1: row.AC11_1,
      AC11_1_if: row.AC11_1_if,
      AC11_2: row.AC11_2,
      AC11_2_if: row.AC11_2_if,
      AC11_3: row.AC11_3 ? row.AC11_3.join(", ") : "",
      AC11_4: row.AC11_4,
      AC11_4_if: row.AC11_4_if,
      AC11_5: row.AC11_5 ? row.AC11_5.join(", ") : "",
      AC12_1: row.AC12_1,
      AC12_1_if: row.AC12_1_if,
      AC12_2: row.AC12_2 ? row.AC12_2.join(", ") : "",
      AC13_1: row.AC13_1,
      AC13_1_if: row.AC13_1_if,
      AC13_2: row.AC13_2 ? row.AC13_2.join(", ") : "",
      AC14_1: row.AC14_1,
      AC14_1_if: row.AC14_1_if,
      AC14_2: row.AC14_2 ? row.AC14_2.join(", ") : "",
      AC15_1: row.AC15_1,
      AC15_2: row.AC15_2,
      AC15_4_0: row.AC15_4?.[0],
      Ac15_4_1: row.Ac15_4?.[1],
      AC15_4_2: row.AC15_4?.[2],
      AC15_4_3: row.AC15_4?.[3],
      AC15_4_4: row.AC15_4?.[4],
      AC15_4_5: row.AC15_4?.[5],
      AC15_4_6: row.AC15_4?.[6],
      AC15_4_7: row.AC15_4?.[7],
      AC15_4_8: row.AC15_4?.[8],
      AC15_4_9: row.AC15_4?.[9]?.length > 0 ? "Other" : "",
      AC15_4_9_other_specify: row.AC15_4?.[9],
    };
  });
