import React, { useState, useEffect } from 'react';
import { 
  User, Building2, Package, Users, Edit2, Save, X, Briefcase, 
  Mail, Calendar, Shield, Award, TrendingUp, FileText, Clock,
  CheckCircle, AlertCircle, CreditCard, Crown, Zap, ArrowUpCircle
} from 'lucide-react';

import useAuth from '../../../Hooks/useAuth';
import useRole from '../../../Hooks/useRole';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Link } from 'react-router';

const Profile = () => {
  const PRIMARY = '#06393a';
  const ACCENT = '#0a5557';
  const LIGHT_BG = '#f0f9f9';
  const CARD_BG = '#ffffff';
  
  const axios = useAxiosSecure();
  const { user } = useAuth();
  const { role: userRole, isLoading: roleLoading } = useRole();

  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    photoURL: '', 
    companyName: '', 
    companyLogo: '',
    dateOfBirth: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [assignedAssets, setAssignedAssets] = useState([]);
  const [hrStats, setHrStats] = useState({ 
    totalAssets: 0, 
    totalRequests: 0, 
    employeesCount: 0,
    pendingRequests: 0,
    assignedAssets: 0
  });
  const [teamMembers, setTeamMembers] = useState([]);
  const [affiliatedCompanies, setAffiliatedCompanies] = useState([]);

  useEffect(() => {
    if (user?.email) fetchProfileData();
  }, [user?.email]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/users/${user.email}`);
      if (res.data.success) {
        const data = res.data.user;
        setProfileData(data);
        setFormData({
          name: data.name || '',
          photoURL: data.photoURL || '',
          companyName: data.companyName || '',
          companyLogo: data.companyLogo || '',
          dateOfBirth: data.dateOfBirth || ''
        });

        if (data.role === 'hr') {
          // Fetch HR statistics
          const [assetsRes, requestsRes, employeesRes] = await Promise.all([
            axios.get(`/assets?companyId=${data._id}`),
            axios.get(`/requests?companyId=${data._id}`),
            axios.get(`/employees/company/${data._id}`)
          ]);
          
          const assets = assetsRes.data || [];
          const requests = requestsRes.data || [];
          const employees = employeesRes.data.employees || [];
          
          setHrStats({
            totalAssets: assets.length,
            totalRequests: requests.length,
            employeesCount: employees.length,
            pendingRequests: requests.filter(r => r.requestStatus === 'pending').length,
            assignedAssets: requests.filter(r => r.requestStatus === 'approved').length
          });
          
          setTeamMembers(employees);
        } else if (data.role === 'employee') {
          // Fetch employee's assigned assets
          const assetsRes = await axios.get(`/requests?employeeEmail=${data.email}`);
          const allRequests = assetsRes.data || [];
          setAssignedAssets(allRequests.filter(a => a.requestStatus === 'approved'));
          
          // Fetch affiliated companies details
          if (data.affiliatedCompanies && data.affiliatedCompanies.length > 0) {
            const companiesData = await Promise.all(
              data.affiliatedCompanies.map(async (companyId) => {
                try {
                  const hrRes = await axios.get(`/users/by-id/${companyId}`);
                  if (hrRes.data.success) {
                    return {
                      companyId,
                      companyName: hrRes.data.user.companyName,
                      companyLogo: hrRes.data.user.companyLogo,
                      hrName: hrRes.data.user.name,
                      hrEmail: hrRes.data.user.email
                    };
                  }
                } catch  {
                  // console.error('Error fetching company:', err);
                  return null;
                }
              })
            );
            setAffiliatedCompanies(companiesData.filter(c => c !== null));
          }
        }
      }
    } catch  {
      // console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      setSaving(true);
      const updateData = {
        name: formData.name,
        photoURL: formData.photoURL,
        dateOfBirth: formData.dateOfBirth,
        role: profileData.role
      };
      
      if (profileData.role === 'hr') {
        updateData.companyName = formData.companyName;
        updateData.companyLogo = formData.companyLogo;
      }
      
      const res = await axios.patch(`/users/update-role/${user.email}`, updateData);
      if (res.data.success) {
        setIsEditing(false);
        fetchProfileData();
        alert('✅ Profile updated successfully!');
      }
    } catch  {
      // console.error(err);
      alert('❌ Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const getSubscriptionBadge = (subscription) => {
    const badges = {
      basic: { text: 'Basic', color: 'bg-blue-100 text-blue-700', icon: Package },
      premium: { text: 'Premium', color: 'bg-purple-100 text-purple-700', icon: Crown },
      enterprise: { text: 'Enterprise', color: 'bg-amber-100 text-amber-700', icon: Zap }
    };
    return badges[subscription] || badges.basic;
  };

  if (loading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: LIGHT_BG }}>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-t-transparent" 
               style={{ borderColor: PRIMARY, borderTopColor: 'transparent' }}></div>
          <p className="mt-4 text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: LIGHT_BG }}>
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto mb-4 text-red-500" />
          <p className="text-xl font-semibold text-gray-700">Profile not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4" style={{ backgroundColor: LIGHT_BG }}>
      <div className="max-w-7xl mx-auto">
        {/* Header Card */}
        <div className="bg-gradient-to-br from-[#06393a] to-[#0a5557] rounded-3xl shadow-2xl p-8 mb-8 text-white relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Profile Image */}
            <div className="relative group">
              {isEditing ? (
                <div className="space-y-2">
                  <img
                    src={formData.photoURL || profileData.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.name)}&size=200&background=06393a&color=fff`}
                    alt="Profile"
                    className="w-32 h-32 rounded-2xl border-4 border-white/30 shadow-xl object-cover"
                  />
                  <input 
                    type="text" 
                    name="photoURL" 
                    value={formData.photoURL} 
                    onChange={handleInputChange}
                    placeholder="Photo URL"
                    className="w-32 px-2 py-1 rounded text-xs text-gray-700 border border-white/30"
                  />
                </div>
              ) : (
                <img
                  src={profileData.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.name)}&size=200&background=06393a&color=fff`}
                  alt="Profile"
                  className="w-32 h-32 rounded-2xl border-4 border-white/30 shadow-xl object-cover transform transition-transform group-hover:scale-105"
                />
              )}
              <div className="absolute -bottom-2 -right-2 bg-white text-[#06393a] p-2 rounded-xl shadow-lg">
                {profileData.role === 'hr' ? <Building2 size={20} /> : <User size={20} />}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              {isEditing ? (
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange}
                  className="text-3xl font-bold mb-2 bg-white/10 border border-white/30 rounded-lg px-4 py-2 w-full max-w-md text-white placeholder-white/50"
                  placeholder="Full Name"
                />
              ) : (
                <h1 className="text-4xl font-bold mb-2 tracking-tight">{profileData.name}</h1>
              )}
              
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="flex items-center gap-2 text-white/90">
                  <Mail size={16} />
                  {profileData.email}
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-sm font-semibold capitalize">
                  {profileData.role}
                </span>
                {profileData.role === 'hr' && profileData.subscription && (
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${getSubscriptionBadge(profileData.subscription).color}`}>
                    {React.createElement(getSubscriptionBadge(profileData.subscription).icon, { size: 14 })}
                    {getSubscriptionBadge(profileData.subscription).text}
                  </span>
                )}
              </div>

              {profileData.dateOfBirth && (
                <div className="flex items-center gap-2 text-white/80 mb-2">
                  <Calendar size={16} />
                  <span>Born: {new Date(profileData.dateOfBirth).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              )}

              {profileData.createdAt && (
                <div className="flex items-center gap-2 text-white/80">
                  <Clock size={16} />
                  <span>Member since: {new Date(profileData.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long'
                  })}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="bg-white text-[#06393a] px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-white/90 transition-all shadow-lg transform hover:scale-105"
                >
                  <Edit2 size={18} />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button 
                    onClick={handleSaveChanges} 
                    disabled={saving}
                    className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-green-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save size={18} />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button 
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: profileData.name || '',
                        photoURL: profileData.photoURL || '',
                        companyName: profileData.companyName || '',
                        companyLogo: profileData.companyLogo || '',
                        dateOfBirth: profileData.dateOfBirth || ''
                      });
                    }} 
                    disabled={saving}
                    className="bg-white/20 backdrop-blur text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-white/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Role-Specific Content */}
        {profileData.role === 'hr' ? (
          // HR Dashboard
          <div className="space-y-6">
            {/* Company Information Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-[#06393a] rounded-xl">
                  <Building2 size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Company Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company Details */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Company Name</label>
                    {isEditing ? (
                      <input 
                        type="text" 
                        name="companyName" 
                        value={formData.companyName} 
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#06393a] transition-colors"
                        placeholder="Enter company name"
                      />
                    ) : (
                      <p className="text-lg font-medium text-gray-800 flex items-center gap-2">
                        {profileData.companyName || 'Not set'}
                      </p>
                    )}
                  </div>

                  {isEditing && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-2">Company Logo URL</label>
                      <input 
                        type="text" 
                        name="companyLogo" 
                        value={formData.companyLogo} 
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#06393a] transition-colors"
                        placeholder="Enter logo URL"
                      />
                    </div>
                  )}

                  {!isEditing && profileData.companyLogo && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-2">Company Logo</label>
                      <img 
                        src={profileData.companyLogo} 
                        alt="Company Logo" 
                        className="h-16 w-auto object-contain bg-gray-50 p-2 rounded-lg border-2 border-gray-200"
                      />
                    </div>
                  )}
                </div>

                {/* Package Info */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-[#06393a] to-[#0a5557] rounded-xl p-5 text-white">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium opacity-90">Employee Capacity</span>
                      <Package size={20} />
                    </div>
                    <div className="text-3xl font-bold mb-2">
                      {profileData.currentEmployees || 0} / {profileData.packageLimit || 5}
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-white h-full rounded-full transition-all duration-500"
                        style={{ width: `${((profileData.currentEmployees || 0) / (profileData.packageLimit || 5)) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs mt-2 opacity-75">
                      {profileData.packageLimit - (profileData.currentEmployees || 0)} slots remaining
                    </p>
                  </div>

                  <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Crown size={18} className="text-amber-600" />
                      <span className="font-semibold text-amber-800">Current Plan</span>
                    </div>
                    <p className="text-2xl font-bold text-amber-900 capitalize">
                      {profileData.subscription || 'Basic'}
                    </p>
                    <Link to={'/hr-dashboard/upgrade-package'} className="mt-3 w-full bg-amber-600 text-white py-2 rounded-lg font-semibold hover:bg-amber-700 transition-colors flex items-center justify-center gap-2">
                      <ArrowUpCircle size={16} />
                      Upgrade Package
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 transform transition-transform hover:scale-105">
                <div className="flex items-center justify-between mb-2">
                  <Package size={24} className="text-blue-500" />
                  <span className="text-3xl font-bold text-gray-800">{hrStats.totalAssets}</span>
                </div>
                <p className="text-gray-600 font-medium">Total Assets</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 transform transition-transform hover:scale-105">
                <div className="flex items-center justify-between mb-2">
                  <FileText size={24} className="text-purple-500" />
                  <span className="text-3xl font-bold text-gray-800">{hrStats.totalRequests}</span>
                </div>
                <p className="text-gray-600 font-medium">Total Requests</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-amber-500 transform transition-transform hover:scale-105">
                <div className="flex items-center justify-between mb-2">
                  <AlertCircle size={24} className="text-amber-500" />
                  <span className="text-3xl font-bold text-gray-800">{hrStats.pendingRequests}</span>
                </div>
                <p className="text-gray-600 font-medium">Pending Requests</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 transform transition-transform hover:scale-105">
                <div className="flex items-center justify-between mb-2">
                  <Users size={24} className="text-green-500" />
                  <span className="text-3xl font-bold text-gray-800">{hrStats.employeesCount}</span>
                </div>
                <p className="text-gray-600 font-medium">Team Members</p>
              </div>
            </div>

            {/* Team Members */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-[#06393a] rounded-xl">
                  <Users size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">My Team</h2>
                <span className="ml-auto bg-[#06393a] text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {teamMembers.length} {teamMembers.length === 1 ? 'Member' : 'Members'}
                </span>
              </div>

              {teamMembers.length === 0 ? (
                <div className="text-center py-12">
                  <Users size={48} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500 text-lg font-medium">No team members yet</p>
                  <p className="text-gray-400 mt-2">Employees will appear here once they join your company</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {teamMembers.map((member, idx) => (
                    <div 
                      key={idx} 
                      className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border-2 border-gray-200 hover:border-[#06393a] transition-all hover:shadow-md"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={member.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=100&background=06393a&color=fff`}
                          alt={member.name}
                          className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 truncate">{member.name}</h3>
                          <p className="text-sm text-gray-500 truncate">{member.email}</p>
                          <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                            Active
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          // Employee Dashboard
          <div className="space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-[#06393a] rounded-xl">
                  <User size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">Date of Birth</label>
                  {isEditing ? (
                    <input 
                      type="date" 
                      name="dateOfBirth" 
                      value={formData.dateOfBirth} 
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#06393a] transition-colors"
                    />
                  ) : (
                    <p className="text-lg font-medium text-gray-800">
                      {profileData.dateOfBirth 
                        ? new Date(profileData.dateOfBirth).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })
                        : 'Not set'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">Member Since</label>
                  <p className="text-lg font-medium text-gray-800">
                    {profileData.createdAt 
                      ? new Date(profileData.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long',
                          day: 'numeric'
                        })
                      : 'Unknown'}
                  </p>
                </div>
              </div>
            </div>

            {/* Affiliated Companies */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-[#06393a] rounded-xl">
                  <Building2 size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Affiliated Companies</h2>
                <span className="ml-auto bg-[#06393a] text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {affiliatedCompanies.length}
                </span>
              </div>

              {affiliatedCompanies.length === 0 ? (
                <div className="text-center py-8">
                  <Building2 size={40} className="mx-auto mb-3 text-gray-300" />
                  <p className="text-gray-500 font-medium">Not affiliated with any company yet</p>
                  <p className="text-gray-400 text-sm mt-1">Request assets from companies to join them</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Logo</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Company Name</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">HR Manager</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {affiliatedCompanies.map((company, idx) => (
                        <tr 
                          key={idx} 
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-3 px-4">
                            {company.companyLogo ? (
                              <img 
                                src={company.companyLogo} 
                                alt={company.companyName}
                                className="w-10 h-10 rounded-lg bg-gray-100 p-1 object-contain border border-gray-200"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-lg bg-[#06393a] flex items-center justify-center">
                                <Building2 size={20} className="text-white" />
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-semibold text-gray-800">{company.companyName}</p>
                          </td>
                          <td className="py-3 px-4">
                            <p className="text-gray-700">{company.hrName}</p>
                            <p className="text-xs text-gray-500">{company.hrEmail}</p>
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                              <CheckCircle size={12} />
                              Active
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Assets Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-[#06393a] rounded-xl">
                  <Package size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">My Assets</h2>
                <span className="ml-auto bg-[#06393a] text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {assignedAssets.length}
                </span>
              </div>

              {assignedAssets.length === 0 ? (
                <div className="text-center py-8">
                  <Package size={40} className="mx-auto mb-3 text-gray-300" />
                  <p className="text-gray-500 font-medium">No assets assigned yet</p>
                  <p className="text-gray-400 text-sm mt-1">Request assets from your company's HR manager</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Image</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Asset Name</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Type</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Return Type</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Assigned Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignedAssets.map((asset, idx) => (
                        <tr 
                          key={idx} 
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-3 px-4">
                            {asset.assetImage ? (
                              <img 
                                src={asset.assetImage} 
                                alt={asset.assetName}
                                className="w-12 h-12 rounded-lg object-cover border-2 border-gray-200"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-lg bg-[#06393a] flex items-center justify-center">
                                <Package size={20} className="text-white" />
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-semibold text-gray-800">{asset.assetName}</p>
                          </td>
                          <td className="py-3 px-4">
                            <p className="text-gray-700">{asset.assetType}</p>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                              asset.returnType === 'returnable' 
                                ? 'bg-blue-100 text-blue-700' 
                                : 'bg-gray-200 text-gray-700'
                            }`}>
                              {asset.returnType === 'returnable' ? '🔄 Returnable' : '❌ Non-Returnable'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <p className="text-gray-700">
                              {new Date(asset.requestDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
                <Package size={32} className="mb-3 opacity-90" />
                <p className="text-3xl font-bold mb-1">{assignedAssets.length}</p>
                <p className="text-blue-100 font-medium">Total Assets</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
                <CheckCircle size={32} className="mb-3 opacity-90" />
                <p className="text-3xl font-bold mb-1">
                  {assignedAssets.filter(a => a.returnType === 'returnable').length}
                </p>
                <p className="text-green-100 font-medium">Returnable</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
                <Building2 size={32} className="mb-3 opacity-90" />
                <p className="text-3xl font-bold mb-1">{affiliatedCompanies.length}</p>
                <p className="text-purple-100 font-medium">Companies</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
