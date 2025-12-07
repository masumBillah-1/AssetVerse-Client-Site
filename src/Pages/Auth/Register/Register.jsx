import React from 'react';
import { Link, useLocation, useNavigate, } from 'react-router';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';



const Register = () => {


    const {register, handleSubmit,} = useForm()

    const axiosSecure = useAxiosSecure()

    const {registerUser} = useAuth();

    const location = useLocation();
    const navigate = useNavigate()


    const handleRegister = (data)=> {

        console.log("after register",data)

        registerUser( data.email,data.password)
        .then(result => {


            const userInfo = {

                email : data.email,
                displayName: data.name
            }

            axiosSecure.post('/users',userInfo)
            .then(res => {
                if(res.data.insertedId){
                    console.log('user all ready created')
                }
            })



            
            console.log(result.user)
            navigate(location.state || '/')
            
        })
        .catch(error => {
            console.log(error)
        })

    }


    










    return (
        <div className='flex flex-col justify-center items-center'>

            {/* FORM ANIMATION */}
            <motion.form onSubmit={handleSubmit(handleRegister)}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className='space-y-3'>
                    <h2 className='text-4xl font-bold text-[#acc857]'>Create an Account</h2>
                    <p>Register with ZapShift</p>
                </div>

                <fieldset className="fieldset w-xs mt-2">

                    <label className="label">Name</label>
                    <input type="text" {...register('name',{required:true})} className="input border-[#caeb66] focus:border-[#caeb66] focus:ring-1 focus:ring-[#caeb66] focus:outline-none"placeholder="Name" autoComplete='name' />

                    <label className="label">Email</label>
                    <input type="email" {...register('email', {required: true})} className="input border-[#caeb66] focus:border-[#caeb66] focus:ring-1 focus:ring-[#caeb66] focus:outline-none"placeholder="Email" />
                    

                    <label className="label">Password</label>
                    <input type="password" {...register('password')} className="input border-[#caeb66] focus:border-[#caeb66] focus:ring-1 focus:ring-[#caeb66] focus:outline-none" placeholder="Password"/>
                    

                    <button className="btn bg-[#caeb66] mt-2">Register</button>

                    <p>
                        Already have an account?{" "}
                        <Link state={location.state} to={'/login'} className="text-[#caeb36]">Login</Link>
                    </p>
                </fieldset>

                <p className='text-center mt-2'>OR</p>
            </motion.form>

            {/* GOOGLE BUTTON ANIMATION */}
            <motion.div
                className='w-80 mt-2'
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
                <button className="btn w-full bg-white text-black border-[#e5e5e5]">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <g>
                            <path d="m0 0H512V512H0" fill="#fff"></path>
                            <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                            <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                            <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                            <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                        </g>
                    </svg>
                    Register with Google
                </button>
            </motion.div>

        </div>
    );
};

export default Register;
