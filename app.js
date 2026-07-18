const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.get("/", (req, res) => {
    res.status(200).send("Hello Server");
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});