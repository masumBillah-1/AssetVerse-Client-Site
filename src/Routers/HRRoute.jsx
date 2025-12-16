import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';


const HRRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const axios = useAxiosSecure();
    const location = useLocation();
    const [userRole, setUserRole] = useState(null);
    const [roleLoading, setRoleLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axios.get(`/users/${user.email}`)
                .then(res => {
                    if (res.data.success) {
                        setUserRole(res.data.user.role);
                    }
                    setRoleLoading(false);
                })
                .catch(() => {
                    // console.error('Role fetch error:', err);
                    setRoleLoading(false);
                });
        }
    }, [user, axios]);

    if (loading || roleLoading) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center">
                <span className="loading loading-ball loading-xl"></span>
                <p className="mt-4 text-gray-600">Verifying access...</p>
            </div>
        );
    }

    if (!user) {
        return <Navigate state={location.pathname} to={'/login'} />;
    }

    if (userRole !== 'hr') {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-red-50">
                <div className="text-center p-8 bg-white rounded-lg shadow-lg">
                    <svg className="w-20 h-20 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
                    <p className="text-gray-600 mb-4">This page is only accessible to HR Managers</p>
                    <button 
                        onClick={() => window.history.back()} 
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return children;
};

export default HRRoute;