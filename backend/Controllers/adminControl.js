const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const pool = require('../db');
const { uuid } = require('uuidv4');
const crypto = require('crypto');

const adminControl = {

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
      result[`data`] = departRes;
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
      result[`message`] = `Schedule Shown`;
      result[`data`] = showDepartResult;
      res.status(200).json(result);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
    
  },

  deleteDepartment: async (req, res) => {
    const { department_id } = req.body;

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
      result[`data`] = deleteDepart;
      res.status(200).json(result);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },

};

module.exports = adminControl;