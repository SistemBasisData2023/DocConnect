const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const pool = require('../db');

const patientControl = {
  patientSignUp: async (req, res) => {
    const { 
      name, 
      email, 
      number, 
      address, 
      gender,
      password } = req.body;
    console.log(req.body);

    try {
      const patientCheck = await pool.query('SELECT * FROM patients WHERE email = $1', [
        email
      ]);

      if (patientCheck.rows.length > 0) {
        return res.status(401).json('Patient already registered');
      }

      const salt = await bcrypt.genSalt(8);
      const byPassword = await bcrypt.hash(password, salt);

      const patient_id = crypto.randomUUID();

      const patientRegisterQuery = `INSERT INTO patients (patient_id, name, email, number, address, gender, password) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
      const patientRegisterVal = [patient_id, name, email, number, address, gender, byPassword];

      await pool.query(patientRegisterQuery, patientRegisterVal);
  
      res.status(201).json({ message: 'Patient registration successfull'});

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
  patientSignIn: async (req, res) => {
    const { email, password } = req.body;
    try {
      const patientSigned = await pool.query(`SELECT * FROM patients WHERE email = $1`, [
        email
      ]);
      
      if (patientSigned.rows.length === 0 || patientSigned.rows.length < 0) {
        return res.status(401).json('Patient not found');
      }

      if (patientSigned.rows.length > 0) {
        bcrypt.compare(password, patientSigned.rows[0].password, (err, compareResult) => {
          if(compareResult == true) {
            res.send(true);
            console.log('Patient login successful');
          }
        })
      }

    } catch {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
}

module.exports = patientControl;

