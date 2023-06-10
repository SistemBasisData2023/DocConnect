const pool = require('../db');
const bcrypt = require('bcrypt');

const frontendControl = {
    loginSignup : async (req,res) => {
        return res.render("loginPage", {});
    },

    doctorOrUser: async(req,res) => {
        return res.render('doctorOrUser', {});
    },

    docRegist: async (req, res) => {
        const showDepartQuery = `SELECT * FROM department`;
        const showDepartResult = await pool.query(showDepartQuery);
        const data = showDepartResult.rows;
        return res.render('docRegisterPage', {dept: data});
    },

    userRegist: async (req, res) => {
        return res.render('userRegisterPage', {});
    },

    docReviewAppointment: async(req,res) => {
        const appointmentId = req.query.appointmentId;
        try {
            const query = await pool.query(`select a.appointment_id, dep.department_name,  p."name" patient_name, s."date", s."time" from appointment a 
            join schedule s on s.schedule_id = a.schedule_id 
            join doctors d on d.doctor_id = s.doctor_id 
            join department dep on dep.department_id = d.department_id
            join patients p on p.patient_id = a.patient_id
            where a.appointment_id = $1`, [appointmentId]);
            const data = query.rows[0];
            return res.render("docReviewAppointment", {data: data});
        } catch (error) {
            console.log(err);
            return res.status(500).send('Server error');
        }
    },
    
    docMakeSchedule: async(req,res) => {
        const doctorId = req.query.doctorId;
        try {
            const query = await pool.query(`select d.doctor_id, d."name", dep.department_id, dep.department_name  from doctors d 
            join department dep on dep.department_id = d.department_id
            where d.doctor_id = $1`, [doctorId]);
            const data = query.rows[0];
            return res.render("docMakeSchedule", {data: data});
        } catch (error) {
            console.log(error);
            return res.status(500).send('Server error');
        }
        
    },

    docSchedule: async(req,res) => {
        const doctorId = req.query.doctorId;
        try {
            const showApp = await pool.query(`
            SELECT a.appointment_id, p."name" AS patient_name, s."date", s."time", a.description, a.status FROM appointment a 
            JOIN schedule s ON a.schedule_id = s.schedule_id 
            JOIN patients p ON p.patient_id = a.patient_id 
            WHERE s.doctor_id = $1`, 
            [
              doctorId
            ]);
            console.log(showApp.rows);
            return res.render("docSchedule", {data: showApp.rows});
          } catch (err) {
            console.log(err);
            return res.status(500).send('Server error');
          }
    },

    docHome: async(req,res) => {
        return res.render("docHome", {});
    },

    docDetails: async(req,res) => {
        const { doctorId } = req.params;
        const query = await pool.query(`select d.doctor_id, d."name", d."number", d.gender, d.nip, d.department_id, dep.department_name, a.email from doctors d 
        join department dep on dep.department_id = d.department_id
        join account a on a.account_id = d.account_id
        where d.doctor_id = $1 `, [doctorId]);
        const data = query.rows[0];
        return res.render("docAccountDetails", {data: data});
    },

    userMakeAppointment: async(req, res) => {
        const showDepartResult = await pool.query(`SELECT * FROM department`);
        const data = showDepartResult.rows;
        const docQuery = await pool.query(`select * from doctors`);
        const docData = docQuery.rows;
        return res.render("makeAppointment", {dept: data, doc: docData});
    },

    userReviewAppointment: async(req, res) => {
        const appointmentId = req.query.appointmentId;
        const query = await pool.query(`select a.appointment_id, d."name" doctor_name, dep.department_name, s."date", s."time" from appointment a 
        join schedule s on s.schedule_id = a.schedule_id
        join doctors d on d.doctor_id = s.doctor_id
        join department dep on dep.department_id = d.department_id
        where a.appointment_id  = $1`, [appointmentId]);
        const data = query.rows[0];
        return res.render("userReviewAppointment", {data: data});
    },

    userHome: async(req,res) => {
        return res.render("userHome", {});
    },

    userDetails: async(req,res) => {
        const { patientId } = req.params;
        const query = await pool.query(`select p.*, a.email from patients p 
        join account a on a.account_id = p.account_id
        where p.patient_id = $1`, [patientId]);
        const data = query.rows[0];
        return res.render("userAccountDetails", {data: data});
    },

    userMyAppointment: async(req,res) => {
        const { patientId } = req.params;
        const query = await pool.query(`select a.appointment_id, dep.department_name, d."name" doctor_name, s."date", s."time", a.status from appointment a
        join schedule s on s.schedule_id = a.schedule_id
        join doctors d on d.doctor_id = s.doctor_id
        join department dep on dep.department_id = d.department_id
        where a.patient_id  = $1`, [patientId]);
        const data = query.rows
        return res.render("userMyAppointment", {data: data});
    }, 

    login: async(req, res) => {
            const { email, password } = req.body;
        try {
        const account = await pool.query(`SELECT * FROM account WHERE email = $1`, [
            email
        ]);
        
        // Check if the email exists
        if (account.rows.length === 0 || 
            account.rows.length < 0) {
            return res.status(400).json('user not found');
        }

        // Then compare the password
        if (account.rows.length > 0) {
            bcrypt.compare(password, account.rows[0].password, async (err, compareResult) => {
            if(compareResult == true) {
                const role =  account.rows[0].role;
                let userOrDoctor = {};
                if(role === 'DOCTOR'){
                    const testDoctor = await pool.query(`SELECT * FROM doctors WHERE account_id = $1`, 
                    [account.rows[0].account_id]);
                    userOrDoctor = testDoctor.rows[0];
                } else if(role === 'PATIENT'){
                    const testPatient = await pool.query(`SELECT * FROM patients WHERE account_id = $1`, 
                    [account.rows[0].account_id]);
                    userOrDoctor = testPatient.rows[0];
                }
                const result = {};
                result[`message`] = `Welcome back ` + userOrDoctor.name;
                result['role'] = account.rows[0].role;
                result[`data`] = userOrDoctor;
                res.status(200).json(result);
                console.log('login successful');
            } else {
                return res.status(401).json('Password did not match');
            }
            })
        }

        } catch(err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    }
}

module.exports = frontendControl;