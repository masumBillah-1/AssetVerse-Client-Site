import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import useAuth from '../../../Hooks/useAuth';
import { useNavigate, useLocation } from 'react-router';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signInUser, signInGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (data) => {
    setIsSubmitting(true);

    signInUser(data.email, data.password)
      .then(() => {
        toast.success("✅ Login Successful!");
        navigate(location?.state?.from || '/');
      })
      .catch((error) => {
        console.log("Firebase error:", error.code, error.message);

        if (error.code === "auth/invalid-credential") {
          toast.error("❌ Email or password is incorrect!");
        } else if (error.code === "auth/user-not-found") {
          toast.error("❌ Account not found. Please register first!");
          setTimeout(() => navigate("/register"), 1500);
        } else {
          toast.error("❌ Login failed. Please try again!");
        }
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleSignIn = async () => {
    try {
      const result = await signInGoogle();
      const gUser = result.user;

      const email = gUser.email?.trim().toLowerCase();
      console.log("🔍 Checking Google user email:", email);

      // ✅ Check if user exists in database
      const response = await fetch(
        `https://asset-verse-server-site.vercel.appusers/check?email=${encodeURIComponent(email)}`
      );

      if (!response.ok) {
        toast.error("❌ Server error while checking user!");
        return;
      }

      const checkData = await response.json();
      console.log("📊 Check result:", checkData);

      // ❌ User না থাকলে register page এ পাঠান
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

      // ✅ User আছে কিন্তু role নেই - role select করতে পাঠান
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

      // ✅ User আছে এবং role আছে - dashboard এ পাঠান
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

    } catch (error) {
      console.error("❌ Google Sign-In Error:", error);
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
        <div className="relative z-10 flex flex-col justify-center items-center w-full h-full p-16 text-white">
          <h1 className="text-6xl font-extrabold mb-6">AssetVerse</h1>
          <p className="text-xl mb-10 text-gray-200 text-center">
            Manage your corporate assets and workforce efficiently with our platform.
          </p>
          {/* Illustration */}
          <div className="w-full max-w-md">
            <svg viewBox="0 0 400 300" className="w-full">
              <rect x="100" y="80" width="200" height="180" fill="#ffffff" opacity="0.1" rx="12"/>
              <circle cx="200" cy="140" r="30" fill="#ffffff" opacity="0.2"/>
              <rect x="185" y="150" width="30" height="40" fill="#ffffff" opacity="0.2" rx="4"/>
            </svg>
          </div>
          {/* Trust Indicators */}
          <div className="mt-12 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#063A3A] font-bold">✓</div>
              <span>Secure authentication</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#063A3A] font-bold">✓</div>
              <span>Trusted by 100+ companies</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#063A3A] font-bold">✓</div>
              <span>24/7 Support Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white ">
        <div className="w-full max-w-md p-10">
          <h2 className="text-4xl font-bold text-[#063A3A] text-center mb-6">Welcome Back</h2>
          <p className="text-center text-gray-500 mb-8">
            Sign in to continue to AssetVerse
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email" }
                })}
                type="email"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#063A3A] focus:border-transparent outline-none transition-all"
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })}
                type="password"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#063A3A] focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-gray-700">
                <input type="checkbox" {...register("remember")} className="w-4 h-4 border-gray-300 rounded focus:ring-2 focus:ring-[#063A3A]" />
                Remember me
              </label>
              <a href="#" className="text-sm text-[#063A3A] hover:underline">Forgot Password?</a>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#063A3A] text-white font-semibold rounded-lg hover:bg-[#0A4D4D] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-4 text-gray-400">Or continue with</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            {/* Google Sign-In */}
            <button
              onClick={handleSignIn}
              type="button"
              className="w-full flex cursor-pointer items-center justify-center gap-3 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>

            {/* Register Links */}
            <p className="text-center text-gray-500 mt-6">
              Don't have an account?{' '}
              <a href="/register" className="text-[#063A3A] font-semibold hover:underline">
                Register here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;