require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
  res.send("here")
})

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});

module.exports = app;
