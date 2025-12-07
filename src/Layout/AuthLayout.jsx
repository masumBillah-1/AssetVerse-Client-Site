import React from 'react';

import { Outlet } from 'react-router';
// eslint-disable-next-line no-unused-vars


const AuthLayout = () => {
    return (
        <div className="min-h-screen flex bg-white">


    

                {/* Form container (centered outlet) */}
              
                    <div className="w-full max-w-md border-gray-100">
                        <Outlet/>
                    </div>
            
   



        </div>
    );
};

export default AuthLayout;
