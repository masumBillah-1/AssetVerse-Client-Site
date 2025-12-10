import { Users } from 'lucide-react';
import React from 'react';

const MyTeam = ({ employees, selectedCompany, setSelectedCompany,PRIMARY ,ACCENT }) => {


    const companies = ["TechCorp BD", "InnovateLabs", "GlobalSolutions"];

  const upcomingBirthdays = [
    { name: "John Doe", date: "Dec 15", image: "👨", daysLeft: 9 },
    { name: "Jane Smith", date: "Dec 22", image: "👩", daysLeft: 16 },
  ];
    return (
        <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <label className="block text-sm font-bold text-[var(--primary)] mb-3">Select Company</label>
        <select value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--primary)] font-semibold">
          {companies.map((company, i) => (
            <option key={i} value={company}>{company}</option>
          ))}
        </select>
      </div>

      <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 shadow-lg text-white">
        <h3 className="text-2xl font-bold mb-4">🎂 Upcoming Birthdays</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {upcomingBirthdays.map((b, i) => (
            <div key={i} className="bg-white/20 p-4 rounded-xl flex items-center space-x-4">
              <span className="text-3xl">{b.image}</span>
              <div>
                <p className="font-bold">{b.name}</p>
                <p className="text-sm">📅 {b.date} • {b.daysLeft} days left</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-[var(--primary)] mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2" /> Team Members
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
                <button className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-semibold">Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    );
};

export default MyTeam;




// // ===========================================
// // MY TEAM PAGE COMPONENT (Employee View)
// // ===========================================
// function MyTeamPage({ employees, selectedCompany, setSelectedCompany, PRIMARY, ACCENT }) {
//   const companies = ["TechCorp BD", "InnovateLabs", "GlobalSolutions"];

//   const upcomingBirthdays = [
//     { name: "John Doe", date: "Dec 15", image: "👨", daysLeft: 9 },
//     { name: "Jane Smith", date: "Dec 22", image: "👩", daysLeft: 16 },
//   ];

//   return (
//     <div className="space-y-6">
//       <div className="bg-white rounded-2xl p-6 shadow-lg">
//         <label className="block text-sm font-bold text-[var(--primary)] mb-3">Select Company</label>
//         <select value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--primary)] font-semibold">
//           {companies.map((company, i) => (
//             <option key={i} value={company}>{company}</option>
//           ))}
//         </select>
//       </div>

//       <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 shadow-lg text-white">
//         <h3 className="text-2xl font-bold mb-4">🎂 Upcoming Birthdays</h3>
//         <div className="grid md:grid-cols-2 gap-4">
//           {upcomingBirthdays.map((b, i) => (
//             <div key={i} className="bg-white/20 p-4 rounded-xl flex items-center space-x-4">
//               <span className="text-3xl">{b.image}</span>
//               <div>
//                 <p className="font-bold">{b.name}</p>
//                 <p className="text-sm">📅 {b.date} • {b.daysLeft} days left</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="bg-white rounded-2xl shadow-lg p-6">
//         <h3 className="text-xl font-bold text-[var(--primary)] mb-4 flex items-center">
//           <Users className="w-5 h-5 mr-2" /> Team Members
//         </h3>
//         <div className="space-y-3">
//           {employees.map((e) => (
//             <div key={e.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100">
//               <div className="flex items-center space-x-4">
//                 <div className="text-3xl">{e.image}</div>
//                 <div>
//                   <p className="font-bold text-[var(--primary)]">{e.name}</p>
//                   <p className="text-sm text-gray-600">{e.email}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <span className="px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-semibold">{e.assetCount} Assets</span>
//                 <button className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-semibold">Remove</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
