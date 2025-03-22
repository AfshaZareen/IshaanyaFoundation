import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Card, CardContent, Button, Typography } from "@mui/material";

const studentData = [
  { name: "Student A", score: 85 },
  { name: "Student B", score: 78 },
  { name: "Student C", score: 92 },
  { name: "Student D", score: 70 },
  { name: "Student E", score: 88 },
];

const overallData = [
  { name: "Excellent", value: 40, color: "#4CAF50" }, // Green
  { name: "Good", value: 30, color: "#2196F3" }, // Blue
  { name: "Average", value: 20, color: "#FFC107" }, // Yellow
  { name: "Below Average", value: 10, color: "#FF5722" } // Red 
];

const currentStudent = studentData[0]; // Example: Student A
const averageScore = studentData.reduce((acc, s) => acc + s.score, 0) / studentData.length;

let performanceAnalysis = "";
if (currentStudent.score >= averageScore + 10) {
  performanceAnalysis = "Excellent! You are performing above the class average.";
} else if (currentStudent.score >= averageScore - 5) {
  performanceAnalysis = "Good job! You are close to the class average.";
} else {
  performanceAnalysis = "Needs Improvement! Focus more on weaker areas.";
}

// 🔹 Download Report Function
function downloadReport() {
  const reportElement = document.body; // You can replace this with a more specific ref
  html2canvas(reportElement).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 180, 160);
    pdf.save("Student_Report.pdf");
  });
}

function StudentAssessment() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      {/* 🔹 Individual Student Performance */}
      <Card style={{ marginBottom: "20px", padding: "15px" }}>
        <CardContent>
          <Typography variant="h5">{currentStudent.name}'s Performance</Typography>
          <Typography variant="body1">Score: {currentStudent.score}</Typography>
          <Typography variant="body1">Class Average: {averageScore.toFixed(2)}</Typography>
          <Typography variant="body1" style={{ fontWeight: "bold", marginTop: "10px", color: currentStudent.score >= averageScore ? "#00C49F" : "#00C49F" }}>
            {performanceAnalysis}
          </Typography>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[{ name: currentStudent.name, score: currentStudent.score }, { name: "Class Avg", score: averageScore }]}>
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="score" fill={currentStudent.score >= averageScore ? "#FF6F61" : "#00C49F"} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 🔹 Improved Overall Class Performance (Pie Chart) */}
      <Card style={{ marginBottom: "20px", padding: "15px" }}>
        <CardContent>
          <Typography variant="h5">Overall Class Performance</Typography>
          <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={overallData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={110}
              innerRadius={50}
              paddingAngle={3}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              labelPosition="outside"
              labelStyle={{ fontSize: "14px", fontWeight: "bold" }}
            >
              {overallData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" layout="horizontal" />
          </PieChart>
        </ResponsiveContainer>

        </CardContent>
      </Card>

      {/* 🔹 Download Report Button */}
      <Button variant="contained" color="primary" onClick={downloadReport}>
        Download Report
      </Button>
    </div>
  );
}

export default StudentAssessment;


