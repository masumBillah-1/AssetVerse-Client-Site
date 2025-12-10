import React from 'react';

const EmployeeList = ({ employees, removeFromTeam, PRIMARY, ACCENT }) => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-[var(--primary)] mb-4 flex items-center">
        <Users className="w-5 h-5 mr-2" /> Employees
      </h3>
      <div className="space-y-3">
        {employees.map((e) => (
          <div key={e.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">{e.image}</div>
              <div>
                <p className="font-bold text-[var(--primary)]">{e.name}</p>
                <p className="text-sm text-gray-600">{e.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-semibold">{e.assetCount} Assets</span>
              <button onClick={() => removeFromTeam(e.id, e.affiliations?.[0]?.company || "")} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-semibold">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
};

export default EmployeeList;



