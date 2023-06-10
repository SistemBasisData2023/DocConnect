import React, { useState } from 'react';
import loginImg from '../images/BG.png';

export default function DoctorOrUser() {
  const [isDoctorFormHovered, setIsDoctorFormHovered] = useState(false);
  const [isPatientFormHovered, setIsPatientFormHovered] = useState(false);

  const handleDoctorFormHover = () => {
    setIsDoctorFormHovered(true);
  };

  const handleDoctorFormLeave = () => {
    setIsDoctorFormHovered(false);
  };

  const handlePatientFormHover = () => {
    setIsPatientFormHovered(true);
  };

  const handlePatientFormLeave = () => {
    setIsPatientFormHovered(false);
  };

  return (
    <div
      className="text-white"
      style={{
        backgroundImage: `url(${loginImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat'
      }}
    >
      <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
        <div className='bg-trans flex flex-col justify-center'>
          <p className='text-center text-black bg-sky-50 text-lg mb-4'>
            Join as a doctor and create your profile to connect with patients. Let them book appointments and consult with you.
          </p>
          <form
            className={`max-w-[400px] w-full mx-auto bg-blue-300 p-8 px-8 rounded-lg ${
              isDoctorFormHovered ?' animate-bounce animate-bounce-delay' : ''
            }`}
            onMouseEnter={handleDoctorFormHover}
            onMouseLeave={handleDoctorFormLeave}
          >
            <a href='DocAccountDetails.html'>
              <button className='w-full my-5 py-2 bg-[#0d2d68] shadow-lg shadow-teal-500/10 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>
                LOGIN AS DOCTOR
              </button>
            </a>
            <p>Don't have an account? Register Now</p>
            <a href='DocRegisterPage.html'>
              <button className='w-full my-5 py-2 bg-[#0d2d68] shadow-lg shadow-teal-500/10 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>
                Register
              </button>
            </a>
          </form>
        </div>
        <div className='bg-trans flex flex-col justify-center'>
          <p className='text-center text-black bg-sky-50 text-lg mb-4'>
            Take control of your health journey today. Signing up and booking appointments with the best doctors.
          </p>
          <form
            className={`max-w-[400px] w-full mx-auto bg-blue-300 p-8 px-8 rounded-lg ${
              isPatientFormHovered ? 'animate-bounce animate-bounce-delay' : ''
            }`}
            onMouseEnter={handlePatientFormHover}
            onMouseLeave={handlePatientFormLeave}
          >
            <a href='UserAccountDetails.html'>
              <button className='w-full my-5 py-2 bg-[#0d2d68] shadow-lg shadow-teal-500/10 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>
                LOGIN AS PATIENT
              </button>
            </a>
            <p>Don't have an account? Register Now</p>
            <a href='RegisterUser.jsx'>
              <button className='w-full my-5 py-2 bg-[#0d2d68] shadow-lg shadow-teal-500/10 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>
                Register
              </button>
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}
