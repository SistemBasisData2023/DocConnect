import React from 'react';
import loginImg from '../images/BG.png';


export default function UserRegisterPage() {
    return (
        <div
            className="text-white"
            style={{
                backgroundImage: `url(${loginImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'repeat',
            }}
        >
            <div className='relative'>
                <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
                    <div className='hidden sm:block'>
                    <p className='text-center text-gray-500 bg-[#EDF1FA] text-lg mb-4 mt-11'>
                            Ready to join DocConnect and experience a new level of convenience in managing your healthcare? Register now and unlock a world of seamless appointment booking with your preferred doctors. Take control of your health journey today!
                        </p>
                    </div>
                    <div className=' flex flex-col justify-center'>
                        
                        <form className='max-w-[400px] w-full mx-auto  bg-blue-300 p-8 px-8 rounded-lg h-'>
                            <h2 className='text-4xl text-[#1c40ab] font-bold text-center'>REGISTER</h2>
                                <div className='flex flex-col text-gray-400 py-2'>
                                    <label className='text-black font-extralight'>Email/Username</label>
                                    <input className='rounded-lg bg-white-500 mt-2 p-2 focus:border-blue-500 focus:bg-blue-200 focurs:outline-none' type="text" />
                                </div>
                                <div className='flex flex-col text-gray-400 py-2'>
                                    <label className='text-black font-extralight'>Password</label>
                                    <input className='rounded-lg bg-white-700 mt-2 p-2 focus:border-blue-500 focus:bg-blue-200 focurs:outline-none' type="password" />
                                </div>
                                <div className='flex flex-col text-gray-400 py-2'>
                                    <label className='text-black font-extralight'>Name</label>
                                    <input className='rounded-lg bg-white-700 mt-2 p-2 focus:border-blue-500 focus:bg-blue-200 focurs:outline-none' type="text" />
                                </div>
                                <div className='flex flex-col text-gray-400 py-2'>
                                    <label className='text-black font-extralight'>Gender</label>
                                    <select className='rounded-lg bg-white-700 mt-2 p-2 focus:border-blue-500 focus:bg-blue-200 focus:outline-none'>
                                        <option value='female'>Female</option>
                                        <option value='male'>Male</option>
                                    </select>
                                </div>
                                <div className='flex flex-col text-gray-400 py-2'>
                                    <label className='text-black font-extralight'>Contact</label>
                                    <input className='rounded-lg bg-white-700 mt-2 p-2 focus:border-blue-500 focus:bg-blue-200 focurs:outline-none' type="number" />
                                </div>
                                <div className='flex flex-col text-gray-400 py-2'>
                                    <label className='text-black font-extralight'>Address</label>
                                    <input className='rounded-lg bg-white-700 mt-2 p-2 focus:border-blue-500 focus:bg-blue-200 focurs:outline-none' type="address" />
                                </div>
                                <a href='UserAccountDetails.html'>
                                <button className='w-full my-5 py-2 bg-[#0d2d68] shadow-lg shadow-teal-500/10 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>
                                    Register
                                </button>
                            </a>

                            </form>
                          
                       
                    </div>
                </div>
            </div>
        </div>
    );
}
