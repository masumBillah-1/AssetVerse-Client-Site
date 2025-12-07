import React from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';

const AdminRoute = ({ children }) => {

    const { loading } = useAuth();
    const { role, isLoading } = useRole();

    if (loading || isLoading) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center">
                <span className="loading loading-ball loading-xl"></span>
            </div>
        );
    }

    if (role !== 'Admin') {
        return (
            <div className="min-h-screen">
                <h2 className="text-center">Not Access</h2>
            </div>
        );
    }

    return children;   // ✔ FIXED
};

export default AdminRoute;
