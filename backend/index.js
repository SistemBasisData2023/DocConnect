// Packages used
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const pool = require('./db');

// Routes used
const patientRoute = require('../backend/Routes/patientRoute');

const app = express();

// Connect to database
pool.connect((err) =>{
  if(err){
    console.log(err)
    return
  }
  console.log('Database connected');
});

app.use('/patient', patientRoute);



// Connect to port
const port = process.env.PORT || 5000
app.listen(port , () => {
  console.log(`Server running on port ${port}`)
});