import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../Hooks/useAuth';

const Login = () => {

    const {register,handleSubmit, formState:{errors} } = useForm()


    const {signInUser} = useAuth();

    const location = useLocation()
    const navigate = useNavigate()

    const handleLogin = (data)=> {
        console.log(data)

        signInUser(data.email, data.password)
        .then(result=> {
            console.log(result.user)
            navigate(location?.state || '/')
        })
        .then(error=> {
            console.log(error)
        })

    }
    


    return (
        <div className='flex flex-col justify-center items-center'>

            {/* FORM ANIMATION */}
            <motion.form onSubmit={handleSubmit(handleLogin)}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className='space-y-3 py-2'>
                    <h2 className='text-4xl font-bold text-[#acc857]'>Welcome Back</h2>
                    <p>Login with ZapShift</p>
                </div>

                <fieldset className="fieldset w-xs">

                    <label className="label">Email</label>
                    <input {...register('email',{required:true})} type="email" className="input border-[#caeb66] focus:border-[#caeb66] focus:ring-1 focus:ring-[#caeb66] focus:outline-none"placeholder="Email" />
                    {
                        errors.email?.type === 'required' && <p className="text-red-800 text-[10px]">Eamil is required</p>
                    }



                    <label className="label">Password</label>
                    <input {...register('password',{required:true,minLength: 8 })} type="password" className="input border-[#caeb66] focus:border-[#caeb66] focus:ring-1 focus:ring-[#caeb66] focus:outline-none"placeholder="Password" />
                    {
                        errors.password?.type === "minLength" && <p className='text-red-800 text-[10px]'>Password must be 6 character</p>
                    }


                    <div>
                        <Link state={location.state} to="/forget-password" className="link link-hover cursor-pointer">
                                    Forgot password?
                        </Link>
                    </div>

                    <button className="btn bg-[#caeb66] mt-4">Login</button>

                    <p>
                        Don’t have any account? 
                        <Link to={'/register'} className="text-[#caeb66]"> Register</Link>
                    </p>

                    <p className='text-center'>OR</p>
                </fieldset>
            </motion.form>

            {/* GOOGLE BUTTON ANIMATION */}
            <motion.div 
                className='w-80'
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
                <SocialLogin/>
            </motion.div>

        </div>
    );
};

export default Login;
