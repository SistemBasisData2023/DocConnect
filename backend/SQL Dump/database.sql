CREATE TABLE patients (
patient_id VARCHAR(36) NOT NULL PRIMARY KEY,
account_id VARCHAR(36) NOT NULL,
name text NOT NULL,
number bigint NOT NULL,
address text NOT NULL,
gender text NOT NULL,
CONSTRAINT patients_fk FOREIGN KEY (account_id) REFERENCES account(account_id)
);

CREATE TABLE doctors (
doctor_id VARCHAR(36) NOT NULL PRIMARY KEY,
account_id VARCHAR(36) NOT NULL,
department_id VARCHAR(36) NOT NULL,
name text NOT NULL,
nip bigint NOT NULL,
number bigint NOT NULL,
gender text NOT NULL,
department text NOT NULL,
CONSTRAINT doctors_acc FOREIGN KEY (account_id) REFERENCES account(account_id),
CONSTRAINT doctors_dept FOREIGN KEY (department_id) REFERENCES department(department_id)
);

CREATE TABLE account (
account_id VARCHAR(36) NOT NULL PRIMARY KEY,
email text UNIQUE NOT NULL,
password text NOT NULL,
role text NOT NULL
);

CREATE TABLE schedule (
schedule_id VARCHAR(36) NOT NULL PRIMARY KEY,
doctor_id VARCHAR(36) NOT NULL,
date date NOT NULL,
time time NOT NULL,
CONSTRAINT schedule_doc FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
);

CREATE TABLE appointment (
appointment_id VARCHAR(36) NOT NULL PRIMARY KEY,
patient_id VARCHAR(36) NOT NULL,
schedule_id VARCHAR(36) NOT NULL,
description text NOT NULL, 
status text NOT NULL,
appointment_date date NOT NULL,
CONSTRAINT patients_app FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
CONSTRAINT patients_sched FOREIGN KEY (schedule_id) REFERENCES schedule(schedule_id)
);

CREATE TABLE department (
department_id VARCHAR(36) NOT NULL PRIMARY KEY,
department_name text NOT NULL
);

/*-----------------------*/
/*      ROUTE PATIENT    */
/*-----------------------*/

/*register patients*/
INSERT INTO accounts (email, password, role) VALUES (email, password, role);
INSERT INTO patients (name, number, address, gender) VALUES (name, number, address, gender);

/*login patients*/
SELECT account_id FROM accounts WHERE (email, password) = (email, password);
SELECT * FROM patients WHERE patients.account_id = account.account_id; //check role

/*lihat schedule (route patient)*/
SELECT * FROM doctors FULL OUTER JOIN department; //lihat dokter
SELECT * FROM schedule WHERE doctor_id = ; //tampil jadwal
SELECT shcedule_id FROM appointment OUTER JOIN schedule WHERE appointment

select s.*, case when a.id is not null then 1 else 0 end as is_booked from schedule s
left join appointment a on a.schedule_id = s.schedule_id and extract('week' from current_date) = extract('week' from s.appointment_date)

/*bikin appointment (route patient)*/
INSERT INTO appointment (appointment_id, patient_id, schedule_id, description, status, appointment_date);

/* lihat (review) appoint */
SELECT * FROM appointment WHERE patient_id = ;


/*-----------------------*/
/*      ROUTE ADMIN      */
/*-----------------------*/

/*crud doctor*/
INSERT INTO accounts (email, password, role) VALUES (email, password, role);
INSERT INTO doctors (name, nip, number, gender, department, gender) VALUES (name, nip, number, gender, department, gender);

/*crud department*/
INSERT INTO department (department_name) VALUES (department_name);

INSERT INTO department (department_id, department_name) VALUES ('1', 'Organs');

/*-----------------------*/
/*      ROUTE DOCTOR     */
/*-----------------------*/

/* login doctor*/
SELECT account_id FROM accounts WHERE (email, password) = (email, password);
SELECT * FROM doctors WHERE doctors.account_id = account.account_id; //check role

/* bikin schedule (route doctor)*/
INSERT INTO schedule (shcedule_id, doctor_id, date, time) VALUES (schedule_id, doctor_id, date, time);

/* approve reject appoint */
SELECT a.* FROM appointment a JOIN schedule s ON a.schedule_id = s.schedule_id WHERE s.doctor_id;
UPDATE department SET status = 'APPROVED';
UPDATE department SET status = 'REJECTED';


ALTER TABLE doctors DROP column department;