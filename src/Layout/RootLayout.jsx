import React from 'react';
import { Outlet } from 'react-router';

import Navbar from '../Pages/Shared/Navbar/Navbar';
import Footer from '../Pages/Shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div>

                  <div className='min-h-screen flex flex-col'>
            <nav>
                <Navbar />
            </nav>
            <main className='grow'>
                <Outlet />
            </main>

            <Footer/>
       
        </div>

            
            
        </div>
    );
};

export default RootLayout;