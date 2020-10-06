import { Container } from "@material-ui/core";
import React from "react";
import "./App.css";
import { MatTableBulkDelete } from "./MatTableBulkDelete";

function App() {
  return (
    <Container maxWidth="md">
      <MatTableBulkDelete />
    </Container>
  );
}

export default App;
