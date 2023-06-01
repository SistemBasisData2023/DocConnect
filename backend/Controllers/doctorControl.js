const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const pool = require('../db');

const doctorControl = {
  // Doctor registration
  doctorSignUp: async (req, res) => {
    const { 
      name,
      email,
      number, 
      gender, 
      department,  
      password } = req.body;
    console.log(req.body);

    try {
      const doctorCheck = await pool.query('SELECT * FROM doctors WHERE email = $1', [
        email
      ]);

      if (doctorCheck.rows.length > 0) {
        return res.status(401).json('Doctor is already registered');
      }

      const salt = await bcrypt.genSalt(8);
      const byPassword = await bcrypt.hash(password, salt);

      const doctor_id = Date.now().toString();

      const doctorRegisterQuery = `INSERT INTO doctors (doctor_id, name, email, number, gender, department, password) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
      const doctorRegisterVal = [doctor_id, name, email, number, gender, department, byPassword];

      await pool.query(doctorRegisterQuery, doctorRegisterVal);
  
      res.status(200).json({ message: 'Doctor registration successfull'});

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },

  // Doctor log in
  doctorSignIn: async (req, res) => {
    const { email, password } = req.body;
    try {
      const doctorSigned = await pool.query(`SELECT * FROM doctors WHERE email = $1`, [
        email
      ]);
      
      if (doctorSigned.rows.length === 0 || 
        doctorSigned.rows.length < 0) {
        return res.status(400).json('Doctor not found');
      }

      if (doctorSigned.rows.length > 0) {
        bcrypt.compare(password, doctorSigned.rows[0].password, (err, compareResult) => {
          if(compareResult == true) {
            res.send(`Welcome back doctor ${doctorSigned.rows[0].name}`);
            console.log('Doctor login successful');
          }
        })
      }

    } catch {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },

  // Delete doctor account
  doctorDelete: async (req, res) => {
    try {
      const { doctor_id } = req.params;
      console.log(req.params);
      const doctorDeleteCheck = await pool.query('SELECT * FROM doctors WHERE doctor_id = $1', [
        doctor_id
      ]);

      if (doctorDeleteCheck.rowCount === 0) {
        return res.status(404).json('Doctor not found');
      }

      const doctorDeleteQuery = 'DELETE FROM doctors WHERE doctor_id = $1';
      const doctorDeleteVal = [doctor_id];
      await pool.query(doctorDeleteQuery, doctorDeleteVal);

      res.status(200).json({ message: 'Doctor account deletion successful'});

    } catch (error) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },

  
}

module.exports = doctorControl;