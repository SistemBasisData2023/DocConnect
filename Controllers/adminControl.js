const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const pool = require('../db');
const { uuid } = require('uuidv4');
const crypto = require('crypto');

const adminControl = {

  showAllDoctors: async (req, res) => {
    try {
      const {} = req.body;

      const showDoc = await pool.query(`SELECT * FROM doctors`, []);

      if (showDoc.rows.length === 0) return res.status(201).json('Empty lists'); 

      const result = {};
      result[`message`] = `All doctors: `;
      result[`data`] = showDoc.rows;
      res.status(201).json(result);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  
  },

  showAllPatients: async (req, res) => {
    try {
      const {} = req.body;

      const showPatient = await pool.query(`SELECT * FROM patients`, []);

      if (showPatient.rows.length === 0) return res.status(201).json('Empty lists');
      const result = {};
      result[`message`] = `All patients: `;
      result[`data`] = showPatient.rows;
      res.status(201).json(result);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  
  },

  addDepartment: async (req, res) => {
    const { 
      department_id, 
      department_name } = req.body;

    console.log(req.body);

    try {
      // Check if the department name or id already existed
      const checkDepart = await pool.query(`SELECT * FROM department WHERE department_id = $1 OR department_name = $2`, [
        department_id, department_name
      ]);

      if (checkDepart.rows.length > 0) {
        return res.status(401).json('Department already existed');
      }

      // If the condition above is not met, add data
      const addDepartQuery = `INSERT INTO department (department_id, department_name) VALUES ($1, $2) RETURNING *`;
      const addDepartVal = [department_id, department_name];

      await pool.query(addDepartQuery, addDepartVal);

      const departRes = addDepartQuery.rows[0];
      const result = {};
      result[`message`] = `Department added`;
      result[`data`] = departRes.rows;
      res.status(201).json(result);  
    
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }

  },

  showDepartment: async (req, res) => {
    const {} = req.body;
    
    try {
      // Show all departments
      const showDepartQuery = `SELECT * FROM department`;
      const showDepartResult = await pool.query(showDepartQuery);

      const result = {};
      result[`message`] = `Department Shown`;
      result[`data`] = showDepartResult.rows;
      res.status(200).json(result);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
    
  },

  updateDepartment: async (req, res) => {
    const { department_id } = req.params;
    const { department_name } = req.body;

    try {
      const upDepart = await pool.query(`UPDATE department SET department_name = $1 WHERE department_id = $2 RETURNING *`, [
        department_name, department_id
      ]);

      // Check if the data exists
      if (upDepart.rows.length === 0 || upDepart.rows.length < 0) return res.status(400).json('Department data not found');

      // If exists, update the department name
      const result = {};
      result[`message`] = `Updated department data: `;
      result[`data`] = upDepart.rows;
      res.status(200).json(result);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },

  deleteDepartment: async (req, res) => {
    const { department_id } = req.params;

    try {
      const deleteDepart = await pool.query(`DELETE FROM department WHERE department_id = $1 RETURNING *`, [
        department_id
      ]);

      // Check if the data exists
      if (deleteDepart.rows.length === 0 || 
        deleteDepart.rows.length < 0) {
        return res.status(400).json('Department data not found');
      }

      // If exists, delete the data
      const result = {};
      result[`message`] = `Department deleted: `;
      result[`data`] = deleteDepart.rows;
      res.status(200).json(result);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },

};

module.exports = adminControl;