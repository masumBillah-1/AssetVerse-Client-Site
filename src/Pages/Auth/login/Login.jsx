import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import useAuth from '../../../Hooks/useAuth';
import { useNavigate, useLocation, Link } from 'react-router';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { signInUser, signInGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      await signInUser(data.email, data.password);
      
      // Check user role from database
      const email = data.email.trim().toLowerCase();
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/check?email=${encodeURIComponent(email)}`
      );

      if (response.ok) {
        const checkData = await response.json();
        
        if (checkData.found && checkData.user) {
          const userRole = checkData.user.role;
          
          toast.success("✅ Login Successful!");
          
          setTimeout(() => {
            if (userRole === "hr") {
              navigate("/hr-dashboard");
            } else if (userRole === "employee") {
              navigate("/em-dashboard");
            } else {
              navigate(location?.state?.from || '/');
            }
          }, 1000);
          return;
        }
      }
      
      // Fallback if role check fails
      toast.success("✅ Login Successful!");
      navigate(location?.state?.from || '/');
      
    } catch (error) {
      // console.log("Firebase error:", error.code, error.message);

      if (error.code === "auth/invalid-credential") {
        toast.error("❌ Email or password is incorrect!");
      } else if (error.code === "auth/user-not-found") {
        toast.error("❌ Account not found. Please register first!");
        setTimeout(() => navigate("/register"), 1500);
      } else {
        toast.error("❌ Login failed. Please try again!");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignIn = async () => {
  try {
    const result = await signInGoogle();
    const gUser = result.user;

    const email = gUser.email?.trim().toLowerCase();

    // ✅ Check if user exists in database
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/check?email=${encodeURIComponent(email)}`
    );

    if (!response.ok) {
      toast.error("❌ Server error while checking user!");
      return;
    }

    const checkData = await response.json();

    if (!checkData.found) {
      toast.error("❌ Account not found! Please register first.");
      setTimeout(() => {
        navigate("/register", { 
          state: { 
            fromGoogle: true,
            googleUser: {
              name: gUser.displayName,
              email: gUser.email,
              photoURL: gUser.photoURL
            }
          }
        });
      }, 1500);
      return;
    }

    const existingUser = checkData.user;

    if (!existingUser.role || existingUser.role === "") {
      toast.success("✅ Please complete your profile.");
      setTimeout(() => {
        navigate("/select-role", { 
          state: { 
            email: existingUser.email,
            name: existingUser.name,
            photoURL: existingUser.photoURL
          }
        });
      }, 1000);
      return;
    }

    toast.success("✅ Login Successful!");
    setTimeout(() => {
      if (existingUser.role === "hr") {
        navigate("/hr-dashboard");
      } else if (existingUser.role === "employee") {
        navigate("/em-dashboard");
      } else {
        toast.error("❌ Invalid user role!");
        navigate("/");
      }
    }, 1000);

  } catch {
    toast.error("❌ Google Login Failed! Please try again.");
  }
};

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-[#063A3A] to-[#0A4D4D]">

      <title>Login</title>


      {/* 🔔 Toast container */}
      <Toaster position="top-right" reverseOrder={false} />
      
      {/* Left Side - Branding / Illustration */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#063A3A] to-[#0A4D4D] opacity-90"></div>
        <div className="relative z-10 flex flex-col justify-center items-center w-full h-full px-12 text-white">
          {/* Logo/Brand */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-extrabold mb-3 text-white dark:text-white">AssetVerse</h1>
            <p className="text-base text-gray-200 dark:text-gray-200">
              Manage your corporate assets efficiently
            </p>
          </div>

          {/* Illustration */}
          <div className="w-full max-w-xs mb-6">
            <svg viewBox="0 0 400 300" className="w-full">
              <rect x="100" y="80" width="200" height="180" fill="#ffffff" opacity="0.1" rx="12"/>
              <circle cx="200" cy="140" r="30" fill="#ffffff" opacity="0.2"/>
              <rect x="185" y="150" width="30" height="40" fill="#ffffff" opacity="0.2" rx="4"/>
            </svg>
          </div>

          {/* Trust Indicators */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#063A3A] font-bold text-sm">✓</div>
              <span className="text-sm text-white dark:text-white">Secure authentication</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#063A3A] font-bold text-sm">✓</div>
              <span className="text-sm text-white dark:text-white">Trusted by 100+ companies</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#063A3A] font-bold text-sm">✓</div>
              <span className="text-sm text-white dark:text-white">24/7 Support Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white dark:bg-gray-900 p-6">
        <div className="w-full max-w-md">
          {/* Back to Home Button */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#063A3A] dark:hover:text-[#CBDCBD] transition-colors mb-4 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <h2 className="text-3xl font-bold text-[#063A3A] dark:text-white text-center mb-3">Welcome Back</h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-6 text-sm">
            Sign in to continue to AssetVerse
          </p>
          {/* Register Links */}
            <p className="text-center text-gray-500 dark:text-gray-400 mb-6 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#063A3A] dark:text-[#CBDCBD] font-semibold hover:underline">
                Register here
              </Link>
            </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email" }
                })}
                type="email"
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#063A3A] dark:focus:ring-[#CBDCBD] focus:border-transparent outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <div className="relative">
                <input
                  {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })}
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#063A3A] dark:focus:ring-[#CBDCBD] focus:border-transparent outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <input type="checkbox" {...register("remember")} className="w-4 h-4 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-[#063A3A] dark:focus:ring-[#CBDCBD] bg-white dark:bg-gray-800" />
                Remember me
              </label>
              
              <Link to={'/forget-password'} className="text-sm text-[#063A3A] dark:text-[#CBDCBD] hover:underline">Forgot Password?</Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-[#063A3A] dark:bg-[#CBDCBD] text-white dark:text-[#063A3A] font-semibold rounded-lg hover:bg-[#0A4D4D] dark:hover:bg-[#B8CCA8] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
              <span className="px-3 text-gray-400 dark:text-gray-500 text-sm">Or continue with</span>
              <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
            </div>

            {/* Google Sign-In */}
            <button
              onClick={handleSignIn}
              type="button"
              className="w-full flex cursor-pointer items-center justify-center gap-2 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm">Sign in with Google</span>
            </button>

            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;