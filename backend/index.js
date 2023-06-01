// Packages used
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const pool = require('./db');


// Routes used
const patientRoute = require('../backend/Routes/patientRoute');
const doctorRoute = require('../backend/Routes/doctorRoute');

const app = express();


// Middleware
app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));


// Connect to database
pool.connect((err) =>{
  if(err){
    console.log(err)
    return
  }
  console.log('Database connected');
});


// Initiating routes
app.use('/patient', patientRoute);
app.use('/doctor', doctorRoute);


// Connect to port and server
const port = process.env.PORT || 5000
app.listen(port , () => {
  console.log(`Server running on port ${port}`);
});