import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const HRRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const axios = useAxiosSecure();
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null);
    const [roleLoading, setRoleLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            console.log("🔍 Fetching role for:", user.email);
            
            axios.get(`/users/${encodeURIComponent(user.email)}/role`)
                .then(res => {
                    console.log("✅ Role response:", res.data);
                    setUserRole(res.data.role);
                    setRoleLoading(false);
                })
                .catch((err) => {
                    console.error('❌ Role fetch error:', err);
                    console.error('Error details:', err.response?.data);
                    
                    // ✅ User not found - stay on current page, don't redirect
                    setRoleLoading(false);
                });
        }
    }, [user, axios, navigate]);

    if (loading || roleLoading) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center">
                <span className="loading loading-ball loading-xl"></span>
                <p className="mt-4 text-gray-600">Verifying access...</p>
            </div>
        );
    }

    if (!user) {
        return <Navigate to={'/login'} />;
    }

    // ✅ Role না পেলে home এ redirect
    if (!userRole) {
        console.log("⚠️ No role found");
        return <Navigate to={'/'} />;
    }

    if (userRole !== 'hr') {
        console.log(`⚠️ Access denied: role is '${userRole}', expected 'hr'`);
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-red-50">
                <div className="text-center p-8 bg-white rounded-lg shadow-lg">
                    <svg className="w-20 h-20 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
                    <p className="text-gray-600 mb-4">This page is only accessible to HR Managers</p>
                    <p className="text-sm text-gray-500 mb-4">Your current role: <span className="font-semibold">{userRole}</span></p>
                    <button 
                        onClick={() => {
                            if (userRole === 'employee') {
                                navigate('/em-dashboard');
                            } else {
                                navigate('/');
                            }
                        }} 
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg"
                    >
                        Go to {userRole === 'employee' ? 'Employee Dashboard' : 'Home'}
                    </button>
                </div>
            </div>
        );
    }

    return children;
};

export default HRRoute;