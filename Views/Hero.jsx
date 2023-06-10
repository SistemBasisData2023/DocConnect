import React from 'react';
import Typed from 'react-typed';

const Hero = () => {
  return (
    <div className='text-blue bg-blue-100'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-[#699ad2] font-bold p-2'>
        Your Trusted Healthcare Appointment Platform
        </p>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
        Join With DocConnect Community
        </h1>
        <div className='flex justify-center items-center'>
          <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
            Meet Our
          </p>
          <Typed
          className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2'
            strings={['Proffesionals', 'Trusted', 'Verified']}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
        <p className='md:text-2xl text-xl font-bold text-gray-500'>Doctors.</p>
        
      </div>
    </div>
  );
};

export default Hero;