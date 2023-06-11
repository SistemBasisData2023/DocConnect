<p align="center">
  <img src="https://github.com/SistemBasisData2023/DocConnect/assets/88538229/cd72c456-0243-4048-8685-c45e557eb29a" width="350" title="hover text">

</p>

<p align="center">
  <i align="center">A patient-to-doctor web portal 💉</i>
</p>

<p align ="center">
  <a href="#contributors">Contributors</a> •
  <a href="#overview">Overview</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#language-and-tools">Language and Tools</a> •
  <a href="#tables">Tables</a> •
  <a href="#flowchart">Flowchart</a> •
  <a href="#relational-table-and-uml">Relational Table and UML</a> •
  <a href="#Progress-Report">Progress Report</a> 
</p>

![BG](https://github.com/SistemBasisData2023/DocConnect/assets/88538229/1badd467-b4cf-43c3-abf8-0eff6c688cb4)

## Contributors
This is a database management system final project made by group B2  :

- [Muhammad Suhaili](https://github.com/aleeein) - 2106731535
- [Zulfikar Hadzalic](https://github.com/ZulfikarHadzalic) - 2106636224
- [Shabrina Kamiliya Wiyana](https://github.com/skamiliya) - 2106733894 

as undergraduates of Computer Engineering Major, Department of Electrical Engineering, Faculty of Engineering, Universitas Indonesia.

## Overview
This website is a platform that provides patients being able to make online appointments with specialized doctors. There are three main roles that could be taken as : an **admin**, a **patient**, or **doctor**. Each of them has their own features and actions on this 

😷 Here's what we provide for patients:

- Register their accounts and login using them.
- Make appointments according to the doctors schedule and their respective department.
- Review their appointments based on their doctors decision that has the following status: **PENDING**, **ACCEPTED**, and **REJECTED**.

👨‍⚕️ Here's what we provide for doctors:

- Register their accounts and login using them.
- Make a schedule where they would be available to serve patients.
- Review patients appointment and have the decision to accept or reject their appointment.

🏥 Here's what we provide for admins:

- Having full control/CRUD operations for doctors' departments.
- View all doctors and patients lists.

## How To Use

1. Clone the repo in the terminal to your local directory 
```sh
git clone https://github.com/SistemBasisData2023/DocConnect
```
2. Install the dependencies
```sh
npm install
```
3. Run the server at ```localhost:5000``` on your local browser
```sh
npm run server
```
4. Open ```localhost:5000/views/login``` to proceed to the login page

## Postman Documentation and Examples
[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/24288698/2s93sc5t35) 


## Language and Tools

<p float = "left">
<img alt="JS" src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black">
<img alt="express" src="https://img.shields.io/badge/express.js-%23404d59.svg?style=flat-square&logo=express&logoColor=%2361DAFB">
<img alt="postgres" src="https://img.shields.io/badge/postgres-%23316192.svg?style=flat-square&logo=postgresql&logoColor=white" />
<img alt="html" src="https://img.shields.io/badge/html5-%23E34F26.svg?style=flat-square&logo=html5&logoColor=white" />
<img alt="css" src="https://img.shields.io/badge/css3-%231572B6.svg?style=flat-square&logo=css3&logoColor=white" />
<img alt="bootstrap" src="https://img.shields.io/badge/bootstrap-%238511FA.svg?style=flat-square&logo=bootstrap&logoColor=white" />
</p>

## Tables

### 1.  ```Patients```
This table is used to store patient information when registering on the website.
```
1. Patient_ID
2. Name
3. Phone Number
4. Address
5. Gender
6. Account_ID
```

### 2.  ```Doctors```
This table is used to store doctor information when registering on the website.
```
1. Doctors_ID
2. Account_ID
3. Department_ID
4. Name
5. NIP
6. Phone Number
7. Gender
```

### 3.  ```Account```
This table is used to store doctors and patients account information. 
```
1. Account_ID
2. Email
3. Password
4. Role
```

### 4.  ```Appointment```
This table is used to store appointment information when patients make appointments.
```
1. Appointment_ID
2. Patient_ID
3. Schedule_ID
4. Description
5. Status
```

### 5.  ```Schedule```
This table is used to store schedule information when doctors input their schedule.
```
1. Schedule_ID
2. Doctor_ID
3. Date
4. Time
```

### 6.  ```Department```
This table is used to store departments name and their ID.
```
1. Department_ID
2. Department_Name
```

## Flowchart
<details>
  <summary>Click to view </summary>

```Flowchart```

<img width="7068" alt="Flowchart" src="https://github.com/SistemBasisData2023/DocConnect/assets/88538229/8515ba4f-832a-41f9-888c-dbf5d0ce1478">

</details>

---

## Relational Table and UML

<details>
  <summary>Click to view</summary>

  ```UML```

  ![drawSQL-roughview-export-2023-06-07](https://github.com/SistemBasisData2023/DocConnect/assets/88538229/d02dbab3-569f-4ed6-ae0c-361553709e71)

 ```Relational Table```

  ![Figma Design](https://github.com/skamiliya/DocConnect/blob/1dbc3dbe07003a58df283410ed17c8b5574a0a75/ERD.png) 

</details>

## Progress Report

<details>
  <summary>Click to view</summary>

  ```Progress Report```

- First Report (Click thumbnail below):
<div align="center">
<a href="https://youtu.be/ZUChd-FVUlU">
</a>
</div>

 - Second Report (Click thumbnail below):
    <div align="center">
<a href="https://youtu.be/bN1Se6Y4qYA">
</a>
</div>

 </details>








