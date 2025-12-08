import React from 'react';

import { Outlet } from 'react-router';
// eslint-disable-next-line no-unused-vars


const AuthLayout = () => {
    return (
        <div>


    

                {/* Form container (centered outlet) */}
              
                    <div >
                        <Outlet/>
                    </div>
            
   



        </div>
    );
};

export default AuthLayout;
