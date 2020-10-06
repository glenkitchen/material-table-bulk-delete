import { Button, Grid } from "@material-ui/core";
import MaterialTable, { Column, Options } from "material-table";
import React, { useEffect, useState } from "react";

export const MatTableBulkDelete = () => {
  const [mode, setMode] = useState<"add" | "update" | "delete">("add");
  const [options, setOptions] = useState(createOptions(mode));

  useEffect(() => {
    setOptions(createOptions(mode));
  }, [mode]);

  return (
    <div>
      <Grid container spacing={2} style={{ marginBottom: 16 }}>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            disabled={mode !== "delete"}
            onClick={() => {
              //console.log("data", JSON.stringify(data, null, 2));

              // get data that has been checked
              const checkedData = data.filter(
                (datum: any) => datum.tableData.checked === true
              );
              console.log(
                "MatTableBulkDelete -> checkedData",
                JSON.stringify(checkedData, null, 2)
              );

              // checked data with id
              const checkedIds = checkedData
                .filter((datum: any) => datum.id)
                .map(({ id }: any) => id);
              console.log(
                "MatTableBulkDelete -> checkedIds",
                JSON.stringify(checkedIds, null, 2)
              );

              // checked data without ids
              const checkedNonIds = checkedData.filter(
                (datum: any) => !datum.id
              );
              console.log(
                "MatTableBulkDelete -> checkedNonIds",
                JSON.stringify(checkedNonIds, null, 2)
              );

              // TODO
              // Mutate checkedIds
              // Add checkedNonIds back to data (which will be updated after deletion mutation)

              setMode("add");
            }}
          >
            Save Deletions
          </Button>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            disabled={mode !== "delete"}
            onClick={() => {
              setMode("add");
            }}
          >
            Cancel Deletions
          </Button>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            disabled={mode === "delete"}
            onClick={() => {
              setMode("delete");
            }}
          >
            Bulk Delete
          </Button>
        </Grid>
      </Grid>
      <MaterialTable
        columns={columns}
        data={data}
        options={options}
        title="Material Table Bulk Delete Example"
      />
    </div>
  );
};

interface Product {
  id?: number;
  code: string;
  name: string;
}

const columns: Column<Product>[] = [
  {
    field: "id",
    title: "Id",
  },
  {
    field: "code",
    title: "Code",
  },
  {
    field: "name",
    title: "Name",
  },
];

const data: Product[] = [
  {
    id: 1,
    code: "Code 1",
    name: "Name 1",
  },
  {
    id: 2,
    code: "Code 2",
    name: "Name 2",
  },
  {
    code: "Code 3",
    name: "Name 3",
  },
  {
    code: "Code 4",
    name: "Name 4",
  },
];

const createOptions = (mode: "add" | "update" | "delete"): Options<Product> => {
  if (mode === "delete") {
    return {
      selection: true,
    };
  }
  return {};
};
