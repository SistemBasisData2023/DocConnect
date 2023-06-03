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
      
      const salt = await bcrypt.genSalt(8);
      const byPassword = await bcrypt.hash(password, salt);

      const doctor_id = crypto.randomUUID();
      const account_id = crypto.randomUUID();

      const acoountRegisterQuery = `INSERT INTO account (account_id, email, password, role) VALUES ($1, $2, $3, 'DOCTOR')`;
      const accountRegisterVal = [account_id, email, byPassword];

      await pool.query(acoountRegisterQuery, accountRegisterVal);

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
      
      if (doctorSigned.rows.length === 0 || 
        doctorSigned.rows.length < 0) {
        return res.status(400).json('Doctor not found');
      }

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
  }

  
}

module.exports = doctorControl;