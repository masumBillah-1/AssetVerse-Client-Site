import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast'; // ← import toast
import useAuth from '../../../Hooks/useAuth';
import { useNavigate, useLocation } from 'react-router';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (data) => {
  setIsSubmitting(true);
  console.log(data);

  signInUser(data.email, data.password)
    .then(result => {
      console.log(result.user);
      toast.success("Login Successful!");
      navigate(location?.state?.from || '/');
    })
    .catch(error => {
      console.log(error);

      // যদি user না থাকে, Register page এ পাঠাও
      if (error.code === "auth/user-not-found") {
        toast.error("Account not found! Redirecting to Register...");
        navigate('/register');
      } else {
        // অন্য কোনো Firebase error হলে শুধু দেখাও
        toast.error(error.message);
      }
    })
    .finally(() => setIsSubmitting(false));
};



  return (
    <div className="min-h-screen flex bg-gradient-to-r from-[#063A3A] to-[#0A4D4D]">
      
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
              type="button"
              onClick={() => console.log("Google sign in")}
              className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
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
              Don't have an account?
            </p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <a href="#" className="text-center py-2 px-4 border border-[#063A3A] rounded-lg text-[#063A3A] hover:bg-[#063A3A] hover:text-white transition-all">
                Join as Employee
              </a>
              <a href="#" className="text-center py-2 px-4 border border-[#063A3A] rounded-lg text-[#063A3A] hover:bg-[#063A3A] hover:text-white transition-all">
                Join as HR
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const { signInUser } = useAuth();

//   const location = useLocation();
//   const navigate = useNavigate();

//   const handleLogin = async (data) => {
//     try {
//       const result = await signInUser(data.email, data.password);
//       console.log("Logged in:", result.user);
//       navigate(location?.state || "/");
//     } catch (error) {
//       console.error("Login error:", error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#063A3A] px-4">

//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-[#CBDCBD]"
//       >

//         {/* Header */}
//         <div className="text-center mb-6">
//           <h2 className="text-4xl font-black text-[#063A3A]">Welcome Back</h2>
//           <p className="text-gray-600">Login to AssetVerse</p>
//         </div>

//         {/* FORM */}
//         <motion.form
//           onSubmit={handleSubmit(handleLogin)}
//           initial={{ opacity: 0, x: -40 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5 }}
//           className="space-y-4"
//         >

//           {/* Email */}
//           <div>
//             <label className="text-sm font-semibold text-[#063A3A]">Email</label>
//             <input
//               {...register("email", { required: true })}
//               className="input input-bordered w-full border-[#063A3A]/40 focus:border-[#063A3A] focus:ring-[#063A3A]"
//               placeholder="Enter your email"
//             />
//             {errors.email && <p className="text-red-600 text-xs">Email is required</p>}
//           </div>

//           {/* Password */}
//           <div>
//             <label className="text-sm font-semibold text-[#063A3A]">Password</label>
//             <input
//               {...register("password", { required: true, minLength: 6 })}
//               type="password"
//               className="input input-bordered w-full border-[#063A3A]/40 focus:border-[#063A3A] focus:ring-[#063A3A]"
//               placeholder="Enter your password"
//             />
//             {errors.password?.type === "minLength" && (
//               <p className="text-red-600 text-xs">Password must be at least 6 characters</p>
//             )}
//           </div>

//           {/* Forgot Password */}
//           <div className="flex justify-end">
//             <Link
//               to="/forget-password"
//               state={location.state}
//               className="text-sm text-[#063A3A] hover:underline"
//             >
//               Forgot password?
//             </Link>
//           </div>

//           {/* Login Button */}
//           <button
//             className="btn w-full bg-[#CBDCBD] text-[#063A3A] font-bold hover:bg-[#b4c3c3]"
//           >
//             Login
//           </button>

//           {/* Register Link */}
//           <p className="text-center text-sm">
//             Don’t have an account?{" "}
//             <Link to="/register" className="font-semibold text-[#063A3A]">
//               Register
//             </Link>
//           </p>

//         </motion.form>

//         {/* Divider */}
//         <div className="text-center my-4 text-gray-400">OR</div>

//         {/* Social Login */}
//         <motion.div
//           initial={{ opacity: 0, y: 25 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <SocialLogin />
//         </motion.div>

//       </motion.div>
//     </div>
//   );
// };

// export default Login;
