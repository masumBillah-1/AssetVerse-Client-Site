import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL:'https://asset-verse-server-site.vercel.app'
})

const useAxiosSecure = () => {

    const {user,logOut} = useAuth();
    const navigate = useNavigate()

    useEffect(()=>{

        const reqInterceptors = axiosSecure.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${user?.accessToken}`;
            return config;
        })



        const resInterceptors = axiosSecure.interceptors.response.use((response)=> {
            return response
        },(error)=> {
            // console.log(error);
            const statusCode = error?.response?.status;
            if(statusCode === 401 || statusCode === 403){
                logOut()
                .then(()=> {

                    navigate('/login');

                })
            }

            return Promise.reject(error)
        })


        return ()=> {
            axiosSecure.interceptors.request.eject(reqInterceptors)
            axiosSecure.interceptors.response.eject(resInterceptors)
        }

    
    },[user, logOut, navigate])


    return axiosSecure;
};

export default useAxiosSecure;
