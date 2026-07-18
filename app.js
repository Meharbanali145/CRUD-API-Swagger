const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.get("/", (req, res) => {
    res.status(200).send("Hello Server");
});

app.get("/api", (req, res) => {
  res.status(200).json({
    name: "Task API",
    version: "1.0",
    endpoints: ["/tasks"],
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date(),
  });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});