import React from 'react';
import { Link } from "react-router";
import logo from '../assets/logo.png';

const Logo = ({ className = "" }) => {
    return (
        <Link to="/" className={`flex items-center gap-2 cursor-pointer ${className}`}>
            
            <img 
                src={logo} 
                alt="Logo" 
                className="w-8 h-8 object-contain"
            />

            <h3 className="text-2xl font-extrabold tracking-tight -ml-5 mt-2">
                Zap<span className="text-primary">Shift</span>
            </h3>

        </Link>
    );
};

export default Logo;
