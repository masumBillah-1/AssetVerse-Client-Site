import React, { useState, useEffect } from 'react';
import { User, Building2, Package, Users, Edit2, Save, X, Briefcase } from 'lucide-react';
import useAxios from '../../../Hooks/useAxios';
import useAuth from '../../../Hooks/useAuth';
import useRole from '../../../Hooks/useRole';

const Profile = () => {
  const PRIMARY = '#06393a';
  const axios = useAxios();
  const { user } = useAuth();
  const { role: userRole, isLoading: roleLoading } = useRole();

  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({ name: '', photoURL: '', companyName: '', companyLogo: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [assignedAssets, setAssignedAssets] = useState([]);
  const [hrStats, setHrStats] = useState({ totalAssets: 0, totalRequests: 0, employeesCount: 0 });

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
          companyLogo: data.companyLogo || ''
        });

        if (data.role === 'hr') {
          const [assetsRes, requestsRes, employeesRes] = await Promise.all([
            axios.get('/assets'),
            axios.get('/requests'),
            axios.get(`/employees/company/${data.email}`)
          ]);
          setHrStats({
            totalAssets: assetsRes.data.length || 0,
            totalRequests: requestsRes.data.length || 0,
            employeesCount: employeesRes.data.count || 0
          });
        } else if (data.role === 'employee') {
          const assetsRes = await axios.get(`/requests?employeeEmail=${data.email}`);
          setAssignedAssets(assetsRes.data.filter(a => a.requestStatus === 'approved'));
        }
      }
    } catch (err) {
      console.error(err);
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
        companyName: formData.companyName,
        companyLogo: formData.companyLogo
      };
      const res = await axios.patch(`/users/update-role/${user.email}`, updateData);
      if (res.data.success) {
        setIsEditing(false);
        fetchProfileData();
        alert('✅ Profile updated successfully!');
      }
    } catch (err) {
      console.error(err);
      alert('❌ Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading || roleLoading) return <p>Loading...</p>;
  if (!profileData) return <p>Profile not found</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-2xl shadow">
      {/* Common Profile Header */}
      <div className="flex items-center gap-6 mb-6">
        <img
          src={formData.photoURL || profileData.photoURL || 'https://ui-avatars.com/api/?name=User&size=200'}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-gray-200"
        />
        <div>
          {!isEditing ? (
            <h2 className="text-3xl font-bold">{profileData.name}</h2>
          ) : (
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="border rounded px-3 py-2 w-full" />
          )}
          <p className="text-gray-500">{profileData.email}</p>
          <p className="text-gray-500 capitalize">{profileData.role}</p>
        </div>
      </div>

      {/* Role-based UI */}
      {profileData.role === 'hr' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 font-semibold">Company Name</label>
              {!isEditing ? <p>{profileData.companyName || 'Not set'}</p> :
                <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} className="border rounded px-3 py-2 w-full" />}
            </div>
            {isEditing && (
              <div>
                <label className="block text-gray-600 font-semibold">Company Logo URL</label>
                <input type="text" name="companyLogo" value={formData.companyLogo} onChange={handleInputChange} className="border rounded px-3 py-2 w-full" />
              </div>
            )}
          </div>
          <div className="space-y-2 bg-gray-50 p-4 rounded-xl">
            <h3 className="font-bold text-lg">Quick Stats</h3>
            <p>Total Assets: {hrStats.totalAssets}</p>
            <p>Total Requests: {hrStats.totalRequests}</p>
            <p>Employees Count: {hrStats.employeesCount}</p>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="font-bold text-lg mb-4">Assigned Assets</h3>
          {assignedAssets.length === 0 ? (
            <p>No assets assigned</p>
          ) : (
            <ul className="space-y-2">
              {assignedAssets.map((a, idx) => (
                <li key={idx} className="p-3 bg-white border rounded flex justify-between items-center">
                  <span>{a.assetName}</span>
                  <span>{a.assetType}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="bg-blue-600 text-white px-6 py-2 rounded flex items-center gap-2">
            <Edit2 /> Edit Profile
          </button>
        ) : (
          <>
            <button onClick={handleSaveChanges} disabled={saving} className="bg-green-600 text-white px-6 py-2 rounded flex items-center gap-2">
              <Save /> {saving ? 'Saving...' : 'Save'}
            </button>
            <button onClick={() => setIsEditing(false)} disabled={saving} className="bg-gray-300 text-gray-800 px-6 py-2 rounded flex items-center gap-2">
              <X /> Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
