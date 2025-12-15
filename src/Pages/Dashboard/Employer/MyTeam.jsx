import React, { useState, useEffect } from 'react';
import { Users, Mail, Calendar, Gift, Building2, UserCheck, AlertCircle } from 'lucide-react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';



const MyTeam = () => {
  const PRIMARY = "#063A3A";
  const ACCENT = "#CBDCBD";

  const { user } = useAuth();
  const axios = useAxiosSecure();

  const [mongoUser, setMongoUser] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [hrInfo, setHrInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // ✅ NEW: Multi-company support
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [companyOptions, setCompanyOptions] = useState([]);

  // Fetch MongoDB user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.email) {
        try {
          const { data } = await axios.get(`/users/${user.email}`);
          if (data.success) {
            setMongoUser(data.user);
            
            // ✅ Set default company (first one)
            if (data.user.affiliatedCompanies?.length > 0) {
              setSelectedCompanyId(data.user.affiliatedCompanies[0]);
            }
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };
    fetchUserData();
  }, [user?.email, axios]);

  // ✅ Fetch all company options (HR info for each affiliated company)
  useEffect(() => {
    const fetchCompanyOptions = async () => {
      if (mongoUser?.affiliatedCompanies?.length > 0) {
        try {
          const options = await Promise.all(
            mongoUser.affiliatedCompanies.map(async (companyId) => {
              try {
                // Fetch HR by _id (companyId)
                const { data } = await axios.get(`/users/by-id/${companyId}`);
                if (data.success) {
                  return {
                    id: companyId,
                    name: data.user.companyName,
                    logo: data.user.companyLogo
                  };
                }
              } catch (err) {
                console.error(`Error fetching company ${companyId}:`, err);
              }
              return null;
            })
          );
          
          setCompanyOptions(options.filter(Boolean));
        } catch (error) {
          console.error('Error fetching company options:', error);
        }
      }
    };

    if (mongoUser) {
      fetchCompanyOptions();
    }
  }, [mongoUser, axios]);

  // Fetch team members based on selected company
  useEffect(() => {
    const fetchTeamData = async () => {
      if (selectedCompanyId) {
        try {
          setLoading(true);

          // Fetch HR info by companyId (HR's _id)
          const { data: hrData } = await axios.get(`/users/by-id/${selectedCompanyId}`);
          if (hrData.success) {
            setHrInfo(hrData.user);
          }

          // Fetch all employees in this company
          const { data: membersData } = await axios.get(`/employees/company/${selectedCompanyId}`);
          if (membersData.success) {
            // Include HR in the team
            const allMembers = [hrData.user, ...membersData.employees];
            setTeamMembers(allMembers);
          }
        } catch (error) {
          console.error('Error fetching team:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    if (selectedCompanyId) {
      fetchTeamData();
    }
  }, [selectedCompanyId, axios]);

  // Calculate upcoming birthdays
  const getUpcomingBirthdays = () => {
    const today = new Date();
    const upcomingBirthdays = teamMembers
      .filter(member => member.dateOfBirth)
      .map(member => {
        const birthDate = new Date(member.dateOfBirth);
        const thisYearBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
        
        if (thisYearBirthday < today) {
          thisYearBirthday.setFullYear(today.getFullYear() + 1);
        }

        const daysLeft = Math.ceil((thisYearBirthday - today) / (1000 * 60 * 60 * 24));

        return {
          ...member,
          daysLeft,
          formattedDate: birthDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        };
      })
      .filter(member => member.daysLeft <= 30) // Next 30 days
      .sort((a, b) => a.daysLeft - b.daysLeft)
      .slice(0, 4); // Max 4 birthdays

    return upcomingBirthdays;
  };

  const upcomingBirthdays = getUpcomingBirthdays();

  if (loading && !mongoUser) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#063A3A]"></div>
      </div>
    );
  }

  if (!mongoUser?.affiliatedCompanies?.length) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center bg-yellow-50 border border-yellow-200 rounded-xl p-8">
          <AlertCircle className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Company Affiliation</h3>
          <p className="text-gray-600">You are not affiliated with any company yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6" style={{ ['--primary']: PRIMARY, ['--accent']: ACCENT }}>
      {/* ✅ Company Selector - Only show if multiple companies */}
      {companyOptions.length > 1 && (
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Select Company
          </label>
          <select
            value={selectedCompanyId}
            onChange={(e) => setSelectedCompanyId(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[var(--primary)] focus:outline-none text-gray-800 font-medium"
          >
            {companyOptions.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Company Info Card */}
      <div className="bg-gradient-to-r from-[var(--primary)] to-teal-600 rounded-2xl p-6 shadow-lg text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {hrInfo?.companyLogo ? (
              <img 
                src={hrInfo.companyLogo} 
                alt="Company Logo" 
                className="w-16 h-16 rounded-full object-cover bg-white p-1"
              />
            ) : (
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Building2 className="w-8 h-8" />
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold">{hrInfo?.companyName || 'Company'}</h2>
              <p className="text-white/80 flex items-center gap-2 mt-1">
                <UserCheck className="w-4 h-4" />
                {teamMembers.length} Team Members
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/70">Your Role</p>
            <p className="text-lg font-bold capitalize">{mongoUser.role}</p>
          </div>
        </div>
      </div>

      {/* Upcoming Birthdays */}
      {upcomingBirthdays.length > 0 && (
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 shadow-lg text-white">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Gift className="w-6 h-6" />
            🎂 Upcoming Birthdays
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {upcomingBirthdays.map((member, i) => (
              <div key={i} className="bg-white/20 backdrop-blur-sm p-4 rounded-xl flex items-center space-x-4 hover:bg-white/30 transition-all">
                <img 
                  src={member.photoURL || 'https://i.ibb.co/ygZpQ9Y/default-avatar.png'} 
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold">{member.name}</p>
                  <p className="text-sm flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {member.formattedDate} • {member.daysLeft} {member.daysLeft === 1 ? 'day' : 'days'} left
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Team Members List */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-[var(--primary)] mb-4 flex items-center gap-2">
          <Users className="w-6 h-6" />
          Team Members
        </h3>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)] mx-auto"></div>
          </div>
        ) : teamMembers.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Users className="w-16 h-16 mx-auto mb-3 opacity-20" />
            <p>No team members found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {teamMembers.map((member) => (
              <div 
                key={member._id} 
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
              >
                <div className="flex items-center space-x-4">
                  <img 
                    src={member.photoURL || 'https://i.ibb.co/ygZpQ9Y/default-avatar.png'} 
                    alt={member.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-[var(--primary)]"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-[var(--primary)]">{member.name}</p>
                      {member.role === 'hr' && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                          HR Manager
                        </span>
                      )}
                      {member.email === user?.email && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                          You
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                      <Mail className="w-3 h-3" />
                      {member.email}
                    </p>
                    {member.dateOfBirth && (
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" />
                        DOB: {new Date(member.dateOfBirth).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-semibold">
                    {member.role === 'hr' ? 'Manager' : 'Employee'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Team Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-3xl font-bold text-gray-800">{teamMembers.length}</p>
          <p className="text-sm text-gray-600">Total Members</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <Gift className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <p className="text-3xl font-bold text-gray-800">{upcomingBirthdays.length}</p>
          <p className="text-sm text-gray-600">Upcoming Birthdays</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <Building2 className="w-8 h-8 text-teal-600 mx-auto mb-2" />
          <p className="text-3xl font-bold text-gray-800">{companyOptions.length}</p>
          <p className="text-sm text-gray-600">{companyOptions.length === 1 ? 'Company' : 'Companies'}</p>
        </div>
      </div>
    </div>
  );
};

export default MyTeam;