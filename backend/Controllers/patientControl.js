const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const pool = require('../db');
const { uuidv4 } = require('uuidv4');
const crypto = require('crypto');


const patientControl = {
  // Patient registration
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
      const salt = await bcrypt.genSalt(8);
      const byPassword = await bcrypt.hash(password, salt);

      const patient_id = crypto.randomUUID();
      const account_id = crypto.randomUUID();

      const acoountRegisterQuery = `INSERT INTO account (account_id, email, password, role) VALUES ($1, $2, $3, 'PATIENT')`;
      const accountRegisterVal = [account_id, email, byPassword];

      await pool.query(acoountRegisterQuery, accountRegisterVal);

      const patientRegisterQuery = `INSERT INTO patients (patient_id, account_id, name, number, address, gender) VALUES ($1, $2, $3, $4, $5, $6)`;
      const patientRegisterVal = [patient_id, account_id, name, number, address, gender];

      await pool.query(patientRegisterQuery, patientRegisterVal);
  
      res.status(201).json({ message: 'Patient registration successful'});

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },

  // Patient log in
  patientSignIn: async (req, res) => {
    const { email, password } = req.body;
    try {
      const patientSigned = await pool.query(`SELECT * FROM account WHERE email = $1`, [
        email
      ]);
      
      if (patientSigned.rows.length === 0 || 
        patientSigned.rows.length < 0) {
        return res.status(401).json('Patient not found');
      }

      if (patientSigned.rows.length > 0) {
        bcrypt.compare(password, patientSigned.rows[0].password, async (err, compareResult) => {
          if(compareResult == true) {
            const testPatient = await pool.query(`SELECT * FROM patients WHERE account_id = $1`, [patientSigned.rows[0].account_id]);
            const patientResult = testPatient.rows[0];
            const result = {};
            result[`message`] = `Welcome back ` + patientResult.name;
            result[`data`] = patientResult;
            res.status(200).json(result);
            console.log('Patient login successful');
          } else {
            return res.status(401).json('Password did not match');
          }
        })
      }

    } catch {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },

  // Make appointment
  bookAppointment: async(req, res) => {
    const {
      patient_id,
      schedule_id,
      description, } = req.body
    
    try {

      const appointment_id = crypto.randomUUID();
      const bookQuery = await pool.query (`INSERT INTO appointment (appointment_id, patient_id, schedule_id, description, status, appointment_date) VALUES ($1, $2, $3, $4, $5, current_date) RETURNING *`, [
        appointment_id, patient_id, schedule_id, description, 'PENDING'
      ]);

      const result = {};
      result[`message`] = `Appointment added: `;
      result[`data`] = bookQuery;
      res.status(200).json(result);
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error'); 
    }

  },

  
  lookAppointment: async (req, res) => {
    const { patient_id } = req.params;
    try {
      const showQuery = await pool.query('SELECT * FROM appointment WHERE patient_id = $1', [
        patient_id
      ]);

      const result = {};
      result[`message`] = `Appointment shown: `;
      result[`data`] = showQuery;
      res.status(200).json(result);
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error'); 
      
    }

  },

};

module.exports = patientControl;