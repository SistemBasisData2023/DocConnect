CREATE TABLE patients (
patient_id bigint PRIMARY KEY,
name text NOT NULL,
email text NOT NULL,
number bigint NOT NULL,
address text NOT NULL,
gender text NOT NULL,
password text NOT NULL
);

CREATE TABLE doctors (
doctor_id bigint PRIMARY KEY,
name text NOT NULL,
email text UNIQUE NOT NULL,
number bigint NOT NULL,
gender text NOT NULL,
department text NOT NULL,
password text NOT NULL
);


