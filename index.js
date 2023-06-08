// Packages used
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const pool = require('./db');

// Routes used
const adminRoute = require('./Routes/adminRoute');
const patientRoute = require('./Routes/patientRoute');
const doctorRoute = require('./Routes/doctorRoute');
const frontendRoute = require('./Routes/frontendRoute');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

/*Set EJS template Engine*/
app.set('views','./Views');
app.set('view engine','ejs');

// Connect to database
pool.connect((err) =>{
  if(err){
    console.log(err)
    return
  }
  console.log('Database connected');
});

// Executing routes
app.use('/admin', adminRoute);
app.use('/patient', patientRoute);
app.use('/doctor', doctorRoute);
app.use('/views', frontendRoute);

// Connect to port and server
const port = process.env.PORT || 5000
app.listen(port , () => {
  console.log(`Server running on port ${port}`);
});