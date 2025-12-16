import React, { useState } from 'react';
import { Link } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import useAuth from '../../../Hooks/useAuth';

const ForgetPassword = () => {
    const { forgetPassword } = useAuth()
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);



    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!email) {
            toast.error('Please enter your email address');
            setLoading(false);
            return;
        }

        try {
            await forgetPassword(email);
            toast.success('Password reset email sent! Please check your inbox.');
            setEmail('');
        } catch (error) {
            // console.log(error);
            if (error.code === 'auth/user-not-found') {
                toast.error('No user found with this email address');
            } else if (error.code === 'auth/invalid-email') {
                toast.error('Invalid email address');
            } else {
                toast.error('Failed to send reset email. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6" style={{ fontFamily: 'Inter, sans-serif' }}>
            <Toaster position="bottom-right" reverseOrder={false} />
            
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <div className="bg-green-100 p-4 rounded-full">
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                stroke="#36a136"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                    Forgot Password?
                </h2>
                <p className="text-center text-gray-600 text-sm mb-6">
                    Enter your email address and we'll send you a link to reset your password
                </p>

                {/* Form */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-3 text-gray-400">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleResetPassword}
                        disabled={loading}
                        className="w-full bg-green-800 text-white py-3 rounded-lg hover:bg-green-900 transition-colors font-medium cursor-pointer disabled:bg-gray-400"
                    >
                        {loading ? 'Sending...' : 'Reset Password'}
                    </button>
                </div>

                {/* Back to Login */}
                <div className="text-center mt-6">
                    <Link
                        to="/login"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;