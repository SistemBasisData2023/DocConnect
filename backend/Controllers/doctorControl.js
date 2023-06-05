const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const pool = require('../db');
const { uuid } = require('uuidv4');
const crypto = require('crypto');


const doctorControl = {
  // Doctor registration
  doctorSignUp: async (req, res) => {
    const { 
      name,
      nip,
      email,
      number, 
      gender, 
      department_id,  
      password } = req.body;
    console.log(req.body);

    try {
      const checkDoctor = await pool.query(`SELECT * FROM doctors WHERE nip = $1`, [
        nip
      ]);

      if (checkDoctor.rows.length > 0) return res.status(400).json('Account already registered');

      const salt = await bcrypt.genSalt(8);
      const byPassword = await bcrypt.hash(password, salt);

      const doctor_id = crypto.randomUUID();
      const account_id = crypto.randomUUID();

      // Insert the data to account table with doctor role
      const acoountRegisterQuery = `INSERT INTO account (account_id, email, password, role) VALUES ($1, $2, $3, 'DOCTOR')`;
      const accountRegisterVal = [account_id, email, byPassword];

      await pool.query(acoountRegisterQuery, accountRegisterVal);

      // Insert the data to doctor table
      const doctorRegisterQuery = `INSERT INTO doctors (doctor_id, account_id, department_id, name, nip, number, gender) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
      const doctorRegisterVal = [doctor_id, account_id, department_id, name, nip, number, gender];

      await pool.query(doctorRegisterQuery, doctorRegisterVal);
  
      res.status(200).json({ message: 'Doctor registration successful' });

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },

  // Doctor log in
  doctorSignIn: async (req, res) => {
    const { email, password } = req.body;
    try {
      const doctorSigned = await pool.query(`SELECT * FROM account WHERE email = $1`, [
        email
      ]);
      
      // Check if the email exists
      if (doctorSigned.rows.length === 0 || 
        doctorSigned.rows.length < 0) {
        return res.status(400).json('Doctor not found');
      }

      // Then compare the password
      if (doctorSigned.rows.length > 0) {
        bcrypt.compare(password, doctorSigned.rows[0].password, async (err, compareResult) => {
          if(compareResult == true) {
            const testDoctor = await pool.query(`SELECT * FROM doctors WHERE account_id = $1`, 
            [doctorSigned.rows[0].account_id]);
            const doctorResult = testDoctor.rows[0];
            const result = {};
            result[`message`] = `Welcome back ` + doctorResult.name;
            result[`data`] = doctorResult;
            res.status(200).json(result);
            console.log('Doctor login successful');
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

  makeSchedule: async (req, res) => {
    const { doctor_id, date, time } = req.body;
    const schedule_id = crypto.randomUUID();

    try {
      // Check if the schedule has already been added or duplicated
      const schedCheck = await pool.query('SELECT COUNT(*) FROM schedule WHERE doctor_id = $1 AND date = $2 AND time = $3', [
        doctor_id,
        date,
        time
      ]);
    
      const duplicateCount = schedCheck.rows[0].count;
    
      if (duplicateCount > 0) {
        return res.status(401).json('Schedule has been made');
      }

      // If the condition above is not met, insert the schedule
      const schedData = await pool.query(`INSERT INTO schedule (schedule_id, doctor_id, date, time) VALUES ($1, $2, $3, $4) RETURNING *`, 
      [schedule_id, doctor_id, date, time]);
      const schedRes = schedData.rows[0];
      const result = {};
      result[`message`] = `Schedule added`;
      result[`data`] = schedRes;
      res.status(200).json(result);

    } catch (error) {
      console.log(error);
      res.status(500).send('Server error');
    }
  },

  showAppointment: async (req, res) => {

    const { doctor_id } = req.params;
    console.log(doctor_id);
    //const { schedule_id } = req.body;

    try {
      const showApp = await pool.query(`
      SELECT a.appointment_id, p."name" AS patient_name, s."date", s."time", a.description, a.status FROM appointment a 
      JOIN schedule s ON a.schedule_id = s.schedule_id 
      JOIN patients p ON p.patient_id = a.patient_id 
      WHERE s.doctor_id = $1`, 
      [
        doctor_id
      ]);

      if (showApp.rows.length === 0) return res.status(400).json('Appointment not found');

      const result = {};
      result[`message`] = `All appointments:`;
      result[`data`] = showApp.rows;
      res.status(200).json(result);
      
    } catch (err) {
      console.log(err);
      res.status(500).send('Server error');
      
    }
  },

  statusAppointment: async (req, res) => {

    const { status, appointment_id } = req.body;

    try {
      const statusApp = await pool.query (`UPDATE appointment SET status = $1 WHERE appointment_id = $2 RETURNING *`, [
        status, appointment_id
      ]);

      if (statusApp.rows.length === 0) return res.status(400).json('Appointment not found');

      const result = {};
      result[`message`] = `Appointments updated:`;
      result[`data`] = statusApp.rows;
      res.status(200).json(result);
      
    } catch (err) {
      console.log(err);
      res.status(500).send('Server error');

    }
  }

};

module.exports = doctorControl;