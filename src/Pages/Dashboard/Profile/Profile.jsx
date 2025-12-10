import { User } from 'lucide-react';
import React from 'react';

const Profile = ({ role, PRIMARY, ACCENT }) => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg max-w-2xl">
      <h3 className="text-xl font-bold text-[var(--primary)] mb-4 flex items-center">
        <User className="w-5 h-5 mr-2" /> Profile
      </h3>
      <p className="text-gray-600">Current Role: {role}</p>
      <div className="mt-4">
        <label className="block text-sm font-semibold text-[var(--primary)] mb-2">Company Logo (demo)</label>
        <input className="w-full px-4 py-2 border rounded-lg" placeholder="Upload / change logo" />
      </div>
    </div>
    );
};

export default Profile;

