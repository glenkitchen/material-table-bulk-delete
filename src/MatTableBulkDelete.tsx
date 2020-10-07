import { Button, Grid, IconButton, makeStyles, Theme } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import MaterialTable, { Column, Options } from "material-table";
import React, { useEffect, useState } from "react";
//import tableIcons from "./TableIcons.js";

export const MatTableBulkDelete = () => {
  const [mode, setMode] = useState<"add" | "update" | "delete">("add");
  const [alwaysShowMode] = useState(true);
  const [isIconButtons] = useState(false);
  const classes = useStyles();
  const [options, setOptions] = useState(createOptions(mode));

  useEffect(() => {
    setOptions(createOptions(mode));
  }, [mode]);

  const renderSaveDeletionsButton = () => {
    return isIconButtons ? (
      <IconButton
        disabled={mode !== "delete"}
        onClick={() => {
          setMode("add");
        }}
      >
        <CheckIcon />
      </IconButton>
    ) : (
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
          const checkedNonIds = checkedData.filter((datum: any) => !datum.id);
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
    );
  };

  const renderCancelDeletionsButton = () => {
    return isIconButtons ? (
      <IconButton
        disabled={mode !== "delete"}
        onClick={() => {
          setMode("add");
        }}
      >
        <ClearIcon />
      </IconButton>
    ) : (
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
    );
  };

  const renderBulkDeleteButton = () => {
    return (
      <Button
        color="primary"
        variant="contained"
        disabled={(mode as any) === "delete"}
        onClick={() => {
          setMode("delete");
        }}
      >
        Bulk Delete
      </Button>
    );
  };

  return (
    <div>
      {alwaysShowMode && (
        <Grid container spacing={2}>
          <Grid item>{renderSaveDeletionsButton()}</Grid>
          <Grid item>{renderCancelDeletionsButton()}</Grid>
          <div className={classes.spacer} />
          <Grid item>{renderBulkDeleteButton()}</Grid>
        </Grid>
      )}
      {!alwaysShowMode && mode === "add" && (
        <Grid container spacing={2} justify="flex-end">
          <Grid item>{renderBulkDeleteButton()}</Grid>
        </Grid>
      )}
      {!alwaysShowMode && mode === "delete" && (
        <Grid container spacing={2} justify="flex-end">
          <Grid item>{renderSaveDeletionsButton()}</Grid>
          <Grid item>{renderCancelDeletionsButton()}</Grid>
        </Grid>
      )}
      <MaterialTable
        columns={columns}
        data={data}
        // editable={{
        //   onBulkUpdate: (changes) =>
        //     new Promise((resolve, reject) => {
        //       setTimeout(() => {
        //         resolve();
        //       }, 1000);
        //     }),
        // }}
        // icons={{
        //   ...tableIcons,
        // }}
        options={options}
        style={{ marginTop: 16 }}
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

const useStyles = makeStyles((theme: Theme) => ({
  spacer: {
    flex: "1 1 10%",
  },
}));

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

const createOptions = (mode: "add" | "update" | "delete"): Options<any> => {
  if (mode === "delete") {
    return {
      selection: true,
    };
  }
  return {};
};
