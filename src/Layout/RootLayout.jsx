import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';

import Navbar from '../Pages/Shared/Navbar/Navbar';
import Footer from '../Pages/Shared/Footer/Footer';
import { UserProvider } from '../context/UserContext';

const RootLayout = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        // If there's a hash, scroll to that section
        if (hash) {
            setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        } else {
            // Otherwise scroll to top
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);

    return (
        <UserProvider>
            <div className='min-h-screen flex flex-col'>
                <nav>
                    <Navbar />
                </nav>
                <main className='grow'>
                    <Outlet />
                </main>

                <Footer/>
            </div>
        </UserProvider>
    );
};

export default RootLayout;