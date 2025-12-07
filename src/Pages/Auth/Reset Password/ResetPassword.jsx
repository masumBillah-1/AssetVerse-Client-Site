import React from 'react';
import { Link } from 'react-router';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const ResetPassword = () => {
    return (
         <div className='flex flex-col justify-center items-center'>

            {/* FORM ANIMATION */}
            <motion.form
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className='space-y-3 py-2'>
                    <h2 className='text-4xl font-bold text-[#acc857]'>Reset Password</h2>
                    <p>Reset your password</p>
                </div>

                <fieldset className="fieldset w-xs">

                    <label className="label">New Password</label>
                    <input type="password" className="input border-[#caeb66] focus:border-[#caeb66] focus:ring-1 focus:ring-[#caeb66] focus:outline-none"placeholder="Password" />

                    <label className="label">Confirm Password</label>
                    <input type="password" className="input border-[#caeb66] focus:border-[#caeb66] focus:ring-1 focus:ring-[#caeb66] focus:outline-none"placeholder="Password" />
                    <div>
                        <Link to="/forget-password" className="link link-hover cursor-pointer">
                                    Forgot password?
                        </Link>
                    </div>

                    <button className="btn bg-[#caeb66] mt-4">Register</button>

                    <p>
                        Don’t have any account? 
                        <Link to={'/register'} className="text-[#caeb66]"> Register</Link>
                    </p>

                    <p className='text-center'>OR</p>
                </fieldset>
            </motion.form>

            {/* GOOGLE BUTTON ANIMATION */}
            <motion.div 
                className='w-80'
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
                <button className="btn w-full bg-white text-black border-[#e5e5e5]">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <g>
                            <path d="m0 0H512V512H0" fill="#fff"></path>
                            <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                            <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                            <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                            <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                        </g>
                    </svg>
                    Login with Google
                </button>
            </motion.div>

        </div>
    );
};

export default ResetPassword;