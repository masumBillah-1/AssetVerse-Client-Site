import React, { useEffect } from 'react';

import { Outlet, useLocation } from 'react-router';
// eslint-disable-next-line no-unused-vars


const AuthLayout = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

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
