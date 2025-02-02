const generateColumns = (columns) => {
  return columns.map((column) => {
    if (column.children && column.children.length > 0) {
      return {
        ...column,
        children: generateColumns(column.children), // Recursively generate child columns
      };
    } else {
      return {
        field: column.field,
        headerName: column.headerName,
        checkboxSelection: column.checkboxSelection,
        headerCheckboxSelection: column.headerCheckboxSelection,
        valueFormatter: column.valueFormatter,
        editable: column.editable,
        cellEditor: column.cellEditor,
        cellEditorParams: column.cellEditorParams,
        valueGetter: (params) => {
          if (column.valueGetter) {
            return column.valueGetter(params);
          } else if (column.field?.startsWith("table")) {
            return params.data?.[column.field?.split("_")[0]]?.[
              column.field?.split("_")[1]
            ]?.[column.field?.split("_")[2]];
          } else if (
            column.field?.includes("_") &&
            !column.field?.startsWith("_")
          ) {
            if (Array.isArray(params.data?.[column.field?.split("_")[0]])) {
              return params.data?.[column.field?.split("_")[0]]?.[
                column.field?.split("_")[1]
              ];
            } else {
              return params.data?.[column.field?.split("_")[0]]?.[
                column.field?.split("_")[1]
              ];
            }
          } else {
            return params?.data?.[column.field] ?? "";
          }
        },
      };
    }
  });
};

export default generateColumns;
