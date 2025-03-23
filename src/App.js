import React, { useState } from "react";
import StudentAssessment from "./StudentAssessment";
import ClassPerformance from "./ClassPerformance";
import { Button, Container, Box } from "@mui/material";

function App() {
  const [view, setView] = useState("class"); // Toggle between views

  return (
    <Container sx={{ textAlign: "center", marginTop: 4 }}>
      <Box sx={{ marginBottom: 3 }}>
        <Button variant={view === "individual" ? "contained" : "outlined"} onClick={() => setView("individual")} sx={{ marginRight: 2 }}>
          Individual Student
        </Button>
        <Button variant={view === "class" ? "contained" : "outlined"} onClick={() => setView("class")}>
          Class Performance
        </Button>
      </Box>

      {view === "individual" ? <StudentAssessment /> : <ClassPerformance />}
    </Container>
  );
}

export default App;


