import React from 'react';
import { Link } from 'react-router';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const ForgotPassword = () => {
    return (
        <div className='flex flex-col justify-center items-center'>

            {/* FORM ANIMATION */}
            <motion.form
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className='space-y-3 py-2'>
                    <h2 className='text-4xl font-bold text-[#acc857]'>Forgot Password</h2>
                    <p className='text-[14px]'>Enter your email address and we’ll send <br />you a reset link.</p>
                </div>

                <fieldset className="fieldset w-xs">

                    <label className="label">Email</label>
                    <input type="email" className="input border-[#caeb66] focus:border-[#caeb66] focus:ring-1 focus:ring-[#caeb66] focus:outline-none"placeholder="Email" />

                    

                    <button className="btn bg-[#caeb66] mt-4">Send</button>

                    <p>
                        Remember your password? 
                        <Link to={'/login'} className="text-[#caeb66]">Login</Link>
                    </p>
                </fieldset>
            </motion.form> 

           

        </div>
    );
};

export default ForgotPassword;