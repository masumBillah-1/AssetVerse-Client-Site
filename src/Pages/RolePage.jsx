import React, { useState } from 'react';

const API_BASE_URL = 'http://localhost:3000';

// ✅ SweetAlert2 CDN থেকে লোড হবে
const showAlert = (type, title, text) => {
  if (window.Swal) {
    window.Swal.fire({
      icon: type,
      title: title,
      text: text,
      confirmButtonColor: '#047857'
    });
  } else {
    alert(`${title}: ${text}`);
  }
};

const RolePage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ⚠️ Replace with actual user email from Auth Context
  const userEmail = "mb6517640@gmail.com";

  // Load SweetAlert2
  React.useEffect(() => {
    if (!document.getElementById('sweetalert-script')) {
      const script = document.createElement('script');
      script.id = 'sweetalert-script';
      script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
      document.head.appendChild(script);
    }
  }, []);

  const validateStep = () => {
    const newErrors = {};
    
    if (!selectedRole) {
      newErrors.role = 'Please select a role';
    }
    
    if (!dateOfBirth) {
      newErrors.dateOfBirth = 'Date of Birth is required';
    }
    
    if (currentStep === 2) {
      if (!companyName) {
        newErrors.companyName = 'Company Name is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validateStep() || loading) return;

    if (currentStep === 1 && selectedRole === 'employee') {
      setLoading(true);
      await updateUserRole({
        role: 'employee',
        dateOfBirth
      });
    } else if (currentStep === 1 && selectedRole === 'hr') {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setLoading(true);
      await updateUserRole({
        role: 'hr',
        companyName,
        companyLogo: companyLogo || '',
        dateOfBirth,
        packageLimit: 5,
        currentEmployees: 0,
        subscription: 'basic'
      });
    }
  };

  const updateUserRole = async (data) => {
    try {
      console.log('📤 Sending data:', data);
      
      const response = await fetch(`${API_BASE_URL}/users/update-role/${userEmail}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      console.log('📥 Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Result:', result);

      if (result.success) {
        showAlert(
          'success',
          'Registration Complete!',
          'You will be redirected to your dashboard.'
        );
        
        // Navigate after 2 seconds
        setTimeout(() => {
          if (data.role === 'hr') {
            console.log('Navigate to: /hr/dashboard');
            // window.location.href = '/hr/dashboard';
          } else {
            console.log('Navigate to: /employee/dashboard');
            // window.location.href = '/employee/dashboard';
          }
        }, 2000);
      } else {
        showAlert(
          'error',
          'Registration Failed',
          result.message || 'Something went wrong!'
        );
      }
    } catch (error) {
      console.error('❌ API Error:', error);
      showAlert(
        'error',
        'Network Error',
        `Failed to connect to server. Please check if server is running on ${API_BASE_URL}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
    setErrors({});
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Select Your Role</h2>
                <p className="text-gray-600">Step 1 of {selectedRole === 'hr' ? '2' : '1'} - Choose how you'll use the platform</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  I am a...
                </label>
                <div className="grid grid-cols-1 gap-4">
                  <label className="relative cursor-pointer">
                    <input 
                      type="radio" 
                      value="hr"
                      checked={selectedRole === 'hr'}
                      onChange={() => handleRoleChange('hr')}
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
                      type="radio" 
                      value="employee"
                      checked={selectedRole === 'employee'}
                      onChange={() => handleRoleChange('employee')}
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
                  <p className="text-red-500 text-sm mt-2">{errors.role}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input 
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
                )}
              </div>

              <button 
                onClick={handleNext}
                disabled={!selectedRole || !dateOfBirth || loading}
                className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  selectedRole === "employee" ? "Complete Registration ✓" : "Next Step →"
                )}
              </button>
            </div>
          )}

          {currentStep === 2 && selectedRole === "hr" && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Company Details</h2>
                <p className="text-gray-600">Step 2 of 2 - Tell us about your company</p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                    placeholder="Your Company Name"
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Logo URL <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input 
                    value={companyLogo}
                    onChange={(e) => setCompanyLogo(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                    placeholder="https://example.com/logo.png"
                  />
                  {companyLogo && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-2">Preview:</p>
                      <img 
                        src={companyLogo} 
                        alt="Company Logo" 
                        className="h-16 w-16 object-contain border border-gray-200 rounded"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={handleBack}
                  disabled={loading}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50"
                >
                  ← Back
                </button>
                <button 
                  onClick={handleNext}
                  disabled={!companyName || loading}
                  className="flex-1 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Complete Registration ✓"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RolePage;