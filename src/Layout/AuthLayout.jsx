import React from 'react';
import Logo from '../Components/Logo';
import { Outlet } from 'react-router';
import authimg from '../assets/authImage.png';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex bg-white">

            {/* LEFT SIDE */}
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex-1 flex flex-col pl-5 py-3 "
            >
                {/* Logo top */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mb-5"
                >
                    <Logo />
                </motion.div>

                {/* Form container (centered outlet) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="flex flex-1 justify-center items-center"
                >
                    <div className="w-full max-w-md border-gray-100">
                        <Outlet />
                    </div>
                </motion.div>
            </motion.div>

            {/* RIGHT SIDE IMAGE */}
            <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="flex-1 bg-yellow-50 flex justify-center items-center p-10"
            >
                <motion.img
                    src={authimg}
                    alt="Authentication"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                    className="max-w-full h-auto object-contain drop-shadow-lg"
                />
            </motion.div>

        </div>
    );
};

export default AuthLayout;
