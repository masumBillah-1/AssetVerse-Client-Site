import React, { Children } from 'react';

import { Navigation } from 'lucide-react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hooks/useAuth';

const PrivateRoute = () => {
    const {user,loading}= useAuth()
    const location = useLocation()

    if(loading){
        return <div className="min-h-screen flex flex-col justify-center items-center">

            <span className="loading loading-ball loading-xl"></span>

        </div>
    }

    if(!user){
        return <Navigate state={location.pathname} to={'/login'}></Navigate>
    }


    return Children
};

export default PrivateRoute;