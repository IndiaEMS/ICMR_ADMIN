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
        valueSetter: (params) => {
          if (column.valueSetter) {
            return column.valueSetter(params);
          }
          if (!column.field) return false;

          const fieldParts = column.field.split("_");
          let data = params.data;

          for (let i = 0; i < fieldParts.length - 1; i++) {
            const key = fieldParts[i];
            if (!data[key]) {
              data[key] = isNaN(fieldParts[i + 1]) ? {} : []; // Create object or array if undefined
            }
            data = data[key]; // Move deeper
          }

          // Set the final value
          data[fieldParts[fieldParts.length - 1]] = params.newValue;
          return true; // Return true for successful update
        },
        // valueSetter: (params) => {
        //   console.log(params);

        //   const field = params.colDef.field; // Get field name from column definition
        //   if (!field) return "";

        //   // Handle 'table_*' pattern where table data is stored in a nested structure
        //   if (field.startsWith("table")) {
        //     const keys = field.split("_");
        //     return keys.reduce((acc, key) => acc?.[key], params.data);
        //   }

        //   // Handle 'nested_object_field' pattern (e.g., "B10_1" where B10 is an array or object)
        //   if (field.includes("_") && !field.startsWith("_")) {
        //     const keys = field.split("_");
        //     let value = params.data;

        //     for (const key of keys) {
        //       if (!value) return "";
        //       value = value?.[key]; // Navigate deeper into the structure
        //     }

        //     return value;
        //   }

        //   console.log(params);

        //   // Default case: return the direct field value
        //   return params.data?.[field] ?? "";
        // },
      };
    }
  });
};

export default generateColumns;
