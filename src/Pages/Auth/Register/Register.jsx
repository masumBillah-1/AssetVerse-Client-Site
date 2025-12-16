import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";


const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const {registerUser, signInGoogle} = useAuth();
  const navigate = useNavigate();
  
  const selectedRole = watch("role");


const onSubmit = (data) => {
  setIsSubmitting(true);
  // console.log("Form Data:", data);

  // Step 1 → Firebase Register
  registerUser(data.email, data.password)
    .then(async (result) => {
      // console.log("Firebase User:", result);

      const user = result.user;

      // Step 2 → Prepare data to send to server
      const payload = {
        ...data,
        uid: user.uid,
        photoURL: user.photoURL || data.photoURL || "",
        emailVerified: user.emailVerified,
        createdAt: new Date(),
      };

      // Step 3 → Send to server (MongoDB)
      try {
        const res = await fetch("https://asset-verse-server-site.vercel.app/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const serverResponse = await res.json();
        // console.log("Saved to Server:", serverResponse);

        if (serverResponse.success) {
          // ✅ SweetAlert success
          Swal.fire({
            icon: "success",
            title: "Registration Successful!",
            text: `User ID: ${serverResponse.userId}`,
          }).then(() => {
            // ✅ Navigate to home page after success
            navigate("/");
          });
          
        } else {
          // ❌ SweetAlert server error
          Swal.fire({
            icon: "error",
            title: "Registration Failed",
            text: serverResponse.error || "Something went wrong on server!",
          });
        }

      } catch (error) {
        // console.log("Server Error:", error);
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: error.message,
        });
      }
    })
    .catch((error) => {
      // console.log("Firebase Error:", error);
      Swal.fire({
        icon: "error",
        title: "Firebase Error",
        text: error.message,
      });
    })
    .finally(() => {
      setIsSubmitting(false);
    });
};


  const handleNext = () => {
    // Validate current step fields before moving to next
    if (currentStep === 1) {
      const name = watch("name");
      const email = watch("email");
      const password = watch("password");
      const dob = watch("dateOfBirth");
      
      if (name && email && password && dob) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      const role = watch("role");
      if (role) {
        if (role === "hr") {
          setCurrentStep(3);
        } else {
          // If employee, submit directly
          handleSubmit(onSubmit)();
        }
      }
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };



const handleSignIn = () => {

    signInGoogle()
        .then(async (result) => {

            const gUser = result.user;
            // console.log("Google User:", gUser);

            const userInfo = {
                name: gUser.displayName,
                email: gUser.email,
                photoURL: gUser.photoURL,
                role: "", // Empty role for new users
                password: "",
                dateOfBirth: "",
            };

            // 1️⃣ Check user exists or not
            let checkRes;
            let checkData;

            try {
                checkRes = await fetch(
                    `https://asset-verse-server-site.vercel.app/users/check?email=${gUser.email}`
                );
                checkData = await checkRes.json();
            } catch (err) {
                toast.error("Server error while checking user!");
                return;
            }

            // 2️⃣ If NEW USER → save to server and go to role selection page
            if (!checkData.found) {
                try {
                    // Save new user to database without role
                    const saveRes = await fetch("https://asset-verse-server-site.vercel.app/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(userInfo)
                    });

                    const saveData = await saveRes.json();

                    if (saveRes.ok) {
                        toast.success("Welcome! Please select your role.");
                        
                        // Navigate to role selection page
                        navigate("/select-role");
                    } else {
                        toast.error(saveData.message || "Failed to create account!");
                    }

                } catch  {
                    // console.error("Error saving user:", err);
                    toast.error("Failed to save user data!");
                }
                return;
            }

            // 3️⃣ If USER ALREADY EXISTS
            const existingUser = checkData.user;

            // Check if user has a valid role and complete profile
            if (!existingUser.role || existingUser.role === "") {
                // User exists but no role set → go to role selection
                toast.success("Please complete your profile.");
                navigate("/select-role");
                return;
            }

            // Check if employee without dateOfBirth → incomplete profile
            if (existingUser.role === "employee" && !existingUser.dateOfBirth) {
                toast.success("Please complete your profile.");
                navigate("/select-role");
                return;
            }

            // Check if HR without company details → incomplete profile
            if (existingUser.role === "hr" && !existingUser.companyName) {
                toast.success("Please complete your profile.");
                navigate("/select-role");
                return;
            }

            // 4️⃣ User has valid role and complete profile → login success
            toast.success("Login Successful!");

            if (existingUser.role === "hr") {
                navigate("/hr-dashboard");
            } else if (existingUser.role === "employee") {
                navigate("/em-dashboard");
            } else {
                toast.error("Invalid user role!");
            }

        })
        .catch(() => {
            // console.log("Google Error:", error);
            toast.error("Google Login Failed!");
        });

};




  return (
    <div className="min-h-screen flex">
      <title>Register</title>
      {/* Left Side - Image & Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 relative overflow-hidden sticky top-0 h-screen">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
          <div className="max-w-md space-y-6">
            {/* Logo/Icon */}
            <div className="flex gap-10 justify-center items-center">

            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-8">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            
            <h1 className="text-4xl font-bold leading-tight">
              Welcome to Your<br />HR Management<br />Platform
            </h1>
            




            </div>
            <p className="text-xl text-emerald-100">
              Join thousands of companies managing their workforce efficiently with our powerful tools.
            </p>
            
            {/* Progress Steps */}
            <div className="mt-10 space-y-4">
              <div className={`flex items-center gap-3 ${currentStep >= 1 ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-white text-emerald-900' : 'bg-white/20 text-white'}`}>
                  {currentStep > 1 ? '✓' : '1'}
                </div>
                <span className="text-lg">Basic Information</span>
              </div>
              <div className={`flex items-center gap-3 ${currentStep >= 2 ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-white text-emerald-900' : 'bg-white/20 text-white'}`}>
                  {currentStep > 2 ? '✓' : '2'}
                </div>
                <span className="text-lg">Select Role</span>
              </div>
              <div className={`flex items-center gap-3 ${currentStep >= 3 ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-white text-emerald-900' : 'bg-white/20 text-white'}`}>
                  3
                </div>
                <span className="text-lg">Company Details (HR)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 overflow-y-auto bg-gradient-to-br from-slate-50 to-emerald-50">
        <div className="flex items-center justify-center min-h-screen p-6 sm:p-12">
          <div className="w-full max-w-md py-8">
            {/* Mobile Logo */}
            <div className="lg:hidden flex justify-center mb-8">
              <div className="w-16 h-16 bg-emerald-800 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            <div className="space-y-5">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
                    <p className="text-gray-600">Step 1 of 3 - Basic Information</p>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input 
                      {...register("name", { required: "Name is required" })} 
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input 
                      {...register("email", { 
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })} 
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                      type="email" 
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <input 
                      {...register("password", { 
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters"
                        }
                      })} 
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                      type="password" 
                      placeholder="••••••••"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <input 
                      {...register("dateOfBirth", { required: "Date of birth is required" })} 
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                      type="date"
                    />
                    {errors.dateOfBirth && (
                      <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>
                    )}
                  </div>

                  {/* Profile Image URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Image URL (Optional)
                    </label>
                    <input 
                      {...register("photoURL")} 
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                      type="url"
                      placeholder="https://example.com/your-photo.jpg"
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter a direct link to your profile image</p>
                  </div>

                  {/* Next Button */}
                  <button 
                    onClick={handleNext}
                    className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Next Step →
                  </button>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-gradient-to-br from-slate-50 to-emerald-50 text-gray-500">Or continue with</span>
                    </div>
                  </div>

                {/* Google Sign-In Button */}
            <button 
              onClick={handleSignIn}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg border border-gray-300 transition-all duration-200 flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign up with Google
            </button>


                  {/* Login Link */}
                  <p className="text-center text-gray-600 text-sm">
                    Already have an account?{" "}
                    <Link to={'/login'} className="text-emerald-700 hover:text-emerald-800 font-medium">
                      Sign in
                    </Link>
                  </p>
                </div>
              )}

              {/* Step 2: Role Selection */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Select Your Role</h2>
                    <p className="text-gray-600">Step 2 of 3 - Choose how you'll use the platform</p>
                  </div>

                  {/* Role Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      I am a...
                    </label>
                    <div className="grid grid-cols-1 gap-4">
                      <label className="relative cursor-pointer">
                        <input 
                          {...register("role", { required: "Please select a role" })} 
                          type="radio" 
                          value="hr"
                          className="peer sr-only"
                        />
                        <div className="p-6 bg-white border-2 border-gray-300 rounded-xl peer-checked:border-emerald-600 peer-checked:bg-emerald-50 transition-all hover:border-emerald-400">
                          <div className="flex items-center gap-4">
                            <svg className="w-12 h-12 text-gray-600 peer-checked:text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <div className="flex-1">
                              <h3 className="font-bold text-lg text-gray-800">HR Manager</h3>
                              <p className="text-sm text-gray-600">Manage employees, track attendance, and oversee company operations</p>
                            </div>
                          </div>
                        </div>
                      </label>

                      <label className="relative cursor-pointer">
                        <input 
                          {...register("role", { required: "Please select a role" })} 
                          type="radio" 
                          value="employee"
                          className="peer sr-only"
                        />
                        <div className="p-6 bg-white border-2 border-gray-300 rounded-xl peer-checked:border-emerald-600 peer-checked:bg-emerald-50 transition-all hover:border-emerald-400">
                          <div className="flex items-center gap-4">
                            <svg className="w-12 h-12 text-gray-600 peer-checked:text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <div className="flex-1">
                              <h3 className="font-bold text-lg text-gray-800">Employee</h3>
                              <p className="text-sm text-gray-600">Access your work schedule, submit timesheets, and view pay information</p>
                            </div>
                          </div>
                        </div>
                      </label>
                    </div>
                    {errors.role && (
                      <p className="text-red-500 text-sm mt-2">{errors.role.message}</p>
                    )}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex gap-3">
                    <button 
                      onClick={handleBack}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-all duration-200"
                    >
                      ← Back
                    </button>
                    <button 
                      onClick={handleNext}
                      className="flex-1 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      {selectedRole === "employee" ? "Complete Registration" : "Next Step →"}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: HR Details */}
              {currentStep === 3 && selectedRole === "hr" && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Company Details</h2>
                    <p className="text-gray-600">Step 3 of 3 - Tell us about your company</p>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <input 
                        {...register("companyName", { required: "Company name is required" })} 
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                        placeholder="Your Company Name"
                      />
                      {errors.companyName && (
                        <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Logo URL (Optional)
                      </label>
                      <input 
                        {...register("companyLogo")} 
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                        placeholder="https://example.com/logo.png"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-3">
                    <button 
                      onClick={handleBack}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-all duration-200"
                    >
                      ← Back
                    </button>
                    <button 
                      onClick={handleSubmit(onSubmit)}
                      disabled={isSubmitting}
                      className="flex-1 btn bg-emerald-800 cursor-pointer hover:bg-emerald-900 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Creating Account..." : "Complete Registration ✓"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;