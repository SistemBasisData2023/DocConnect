import React from 'react';
import loginImg from '../images/BG.png';
import HeaderImg from '../images/Header.png';

export default function LoginPage() {
  return (
    <div className=''>
      <img className='relative top-0 left-0 w-8/12' src={HeaderImg} alt="Header Image" />
      <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
        <div className='hidden sm:block'>
          <img className='w-full h-full object-cover' src={loginImg} alt="Login Image" />
        </div>
        <div className='bg-[#EDF1FA] flex flex-col justify-center'>
          <p className='text-center text-gray-500 text-lg mb-4'>
            Welcome to DocConnect! Sign in to experience the convenience of making appointments with your desired doctors.
          </p>
          <form className='max-w-[400px] w-full mx-auto bg-blue-300 p-8 px-8 rounded-lg'>
                    <h2 className='text-4xl text-[#1c40ab] font-bold text-center'>SIGN IN</h2>
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label className='text-black font-extralight'>Email/Usernaame</label>
                        <input className='rounded-lg bg-white-500 mt-2 p-2 focus:border-blue-500 focus:bg-blue-200 focurs:outline-none' type="text" />
                    </div>
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label className='text-black font-extralight'>Password</label>
                        <input className='rounded-lg bg-white-700 mt-2 p-2 focus:border-blue-500 focus:bg-blue-200 focurs:outline-none' type="password" />
                    </div>
                    <a href='UserAccountDetail.html'>
                        <button className='w-full my-5 py-2 bg-[#0d2d68] shadow-lg shadow-teal-500/10 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>
                            Sign In
                        </button>
                    </a>
                    <p>Din't have Account? Register Now</p>
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