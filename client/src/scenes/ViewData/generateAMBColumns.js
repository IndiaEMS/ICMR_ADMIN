const generateAMBColumns = (columns) => {
  return columns.map((column) => {
    if (column.children && column.children.length > 0) {
      return {
        ...column,
        children: generateAMBColumns(column.children), // Recursively generate child columns
      };
    } else {
      return {
        field: column.field,
        headerName: column.headerName,
        checkboxSelection: false,
        headerCheckboxSelection: column.headerCheckboxSelection,
        valueFormatter: column.valueFormatter,
        valueGetter: (params) => {
          if (column.field === "AMBid") {
            return params.data?.ambulanceDetails?._id;
          } else if (column.field === "uniqueCode") {
            return params.data?.ambulanceDetails?.uniqueCode;
          } else if (column.valueGetter) {
            return column.valueGetter(params);
          } else if (column.field?.startsWith("table")) {
            return params.data?.ambulanceDetails?.[
              column.field?.split("_")[0]
            ]?.[column.field?.split("_")[1]]?.[column.field?.split("_")[2]];
          } else if (
            column.field?.includes("_") &&
            !column.field?.startsWith("_")
          ) {
            if (
              Array.isArray(
                params.data?.ambulanceDetails?.[column.field?.split("_")[0]]
              )
            ) {
              return params.data?.ambulanceDetails?.[
                column.field?.split("_")[0]
              ]?.[column.field?.split("_")[1]];
            } else {
              return params.data?.ambulanceDetails?.[
                column.field?.split("_")[0]
              ]?.[column.field?.split("_")[1]];
            }
          } else {
            return params?.data?.ambulanceDetails?.[column.field] ?? "";
          }
        },
      };
    }
  });
};

export default generateAMBColumns;
