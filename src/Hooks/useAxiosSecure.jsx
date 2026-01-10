import { useEffect } from 'react';
import axios from 'axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Request interceptor
        const reqInterceptors = axiosSecure.interceptors.request.use(
            async (config) => {
                if (user) {
                    try {
                        // ✅ Get fresh Firebase ID token
                        const token = await user.getIdToken();
                        config.headers.Authorization = `Bearer ${token}`;
                        // console.log('✅ Token added to request');
                    } catch (error) {
                        console.error('❌ Error getting token:', error);
                    }
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor
        const resInterceptors = axiosSecure.interceptors.response.use(
            response => response,
            error => {
                const statusCode = error?.response?.status;
                console.log('❌ API Error:', statusCode, error.response?.data);
                
                if (statusCode === 401 || statusCode === 403) {
                    console.log('🔒 Unauthorized - logging out');
                    logOut().then(() => navigate('/login'));
                }
                return Promise.reject(error);
            }
        );

        // Cleanup
        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptors);
            axiosSecure.interceptors.response.eject(resInterceptors);
        };
    }, [user, logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
