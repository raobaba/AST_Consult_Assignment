const express = require("express");
require('dotenv').config(); 
const cors = require("cors"); 
const Connection = require("./Config/db.js");
const app = express();
app.use(express.json()); 
app.use(cors());  
Connection();  
app.listen(process.env.PORT, () =>
 console.log(`Server is running successfully on PORT ${process.env.PORT}`)
 ); 
 