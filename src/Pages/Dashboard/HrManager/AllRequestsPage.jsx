import React from 'react';

const AllRequestsPage = ({ requests, approveRequest, rejectRequest, PRIMARY, ACCENT }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-[var(--primary)] mb-4 flex items-center">
        <FileText className="w-5 h-5 mr-2" /> All Requests
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[var(--primary)]/5">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-[var(--primary)]">Employee</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-[var(--primary)]">Asset</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-[var(--primary)]">Date</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-[var(--primary)]">Status</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-[var(--primary)]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {requests.map((req) => (
              <tr key={req.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">{req.employee}</td>
                <td className="px-6 py-4">{req.asset}</td>
                <td className="px-6 py-4">{req.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-lg font-semibold text-sm ${req.status === "pending" ? "bg-orange-100 text-orange-700" : req.status === "approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {req.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    {req.status === "pending" && (
                      <>
                        <button onClick={() => approveRequest(req.id)} className="px-3 py-1 bg-green-100 text-green-700 rounded-lg">Approve</button>
                        <button onClick={() => rejectRequest(req.id)} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg">Reject</button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRequestsPage;



// function AllRequestsPage({ requests, approveRequest, rejectRequest, PRIMARY, ACCENT }) {
//   return (
//     <div className="bg-white rounded-2xl p-6 shadow-lg">
//       <h3 className="text-xl font-bold text-[var(--primary)] mb-4 flex items-center">
//         <FileText className="w-5 h-5 mr-2" /> All Requests
//       </h3>
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-[var(--primary)]/5">
//             <tr>
//               <th className="px-6 py-4 text-left text-sm font-bold text-[var(--primary)]">Employee</th>
//               <th className="px-6 py-4 text-left text-sm font-bold text-[var(--primary)]">Asset</th>
//               <th className="px-6 py-4 text-left text-sm font-bold text-[var(--primary)]">Date</th>
//               <th className="px-6 py-4 text-left text-sm font-bold text-[var(--primary)]">Status</th>
//               <th className="px-6 py-4 text-left text-sm font-bold text-[var(--primary)]">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {requests.map((req) => (
//               <tr key={req.id} className="hover:bg-gray-50 transition">
//                 <td className="px-6 py-4">{req.employee}</td>
//                 <td className="px-6 py-4">{req.asset}</td>
//                 <td className="px-6 py-4">{req.date}</td>
//                 <td className="px-6 py-4">
//                   <span className={`px-3 py-1 rounded-lg font-semibold text-sm ${req.status === "pending" ? "bg-orange-100 text-orange-700" : req.status === "approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
//                     {req.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="flex space-x-2">
//                     {req.status === "pending" && (
//                       <>
//                         <button onClick={() => approveRequest(req.id)} className="px-3 py-1 bg-green-100 text-green-700 rounded-lg">Approve</button>
//                         <button onClick={() => rejectRequest(req.id)} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg">Reject</button>
//                       </>
//                     )}
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }