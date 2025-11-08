import React, { useState } from "react";

function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const assignWorker = () => {
    alert("Worker assigned successfully!");
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Hostel Complaint Management System
        </h1>
        <p className="text-gray-600">
          Admin Dashboard - Monitor and manage all complaints
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Complaints</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">34</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Resolved</p>
              <h3 className="text-3xl font-bold text-green-600 mt-1">18</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Pending</p>
              <h3 className="text-3xl font-bold text-yellow-600 mt-1">12</h3>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <svg
                className="w-8 h-8 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Rejected</p>
              <h3 className="text-3xl font-bold text-red-600 mt-1">4</h3>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-lg shadow mb-8 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Category-wise Complaints
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Electrical", total: 12, res: 7, pend: 4, rej: 1 },
            { name: "Maintenance", total: 10, res: 5, pend: 4, rej: 1 },
            { name: "Technical (WiFi/LAN)", total: 12, res: 6, pend: 4, rej: 2 },
          ].map((cat, idx) => (
            <div key={idx} className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">{cat.name}</h3>
              <p className="text-2xl font-bold text-blue-600">{cat.total}</p>
              <div className="mt-2 text-sm text-gray-600">
                <span className="text-green-600">{cat.res} Resolved</span> •{" "}
                <span className="text-yellow-600">{cat.pend} Pending</span> •{" "}
                <span className="text-red-600">{cat.rej} Rejected</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Worker Ratings */}
      <div className="bg-white rounded-lg shadow mb-8 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Department Worker Ratings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { dept: "Electrical Department", rating: "★★★★☆", score: "4.2/5" },
            { dept: "Maintenance Department", rating: "★★★★★", score: "4.7/5" },
            { dept: "Technical Department", rating: "★★★★☆", score: "3.9/5" },
          ].map((d, i) => (
            <div key={i} className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">{d.dept}</h3>
              <div className="flex items-center mb-2">
                <span className="text-yellow-500 text-xl">{d.rating}</span>
                <span className="ml-2 text-gray-600">{d.score}</span>
              </div>
              <p className="text-sm text-gray-600">Based on completed tasks</p>
            </div>
          ))}
        </div>
      </div>

      {/* Complaints Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">All Complaints</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "ID",
                  "Student Details",
                  "Room",
                  "Category",
                  "Issue",
                  "Status",
                  "Assigned To",
                  "Action",
                ].map((h, i) => (
                  <th
                    key={i}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Example row */}
              <tr className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  #001
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  AJMEERA RAHUL (BT23CSE033)
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">S-34</td>
                <td className="px-6 py-4 text-sm text-gray-700">Electrical</td>
                <td className="px-6 py-4 text-sm text-gray-700">Fan not working</td>
                <td className="px-6 py-4 text-sm font-semibold text-yellow-600">
                  Pending
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  Rajesh Kumar
                </td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={openModal}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Assign
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Assignment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold mb-4">Assign Worker</h3>
            <select className="w-full border rounded p-2 mb-4">
              <option value="">Select Worker</option>
              <option value="Rajesh Kumar">Rajesh Kumar (Electrical)</option>
              <option value="Suresh Verma">Suresh Verma (Electrical)</option>
              <option value="Amit Sharma">Amit Sharma (Maintenance)</option>
              <option value="Vijay Singh">Vijay Singh (Maintenance)</option>
              <option value="Prakash Yadav">Prakash Yadav (Technical)</option>
              <option value="Manoj Tiwari">Manoj Tiwari (Technical)</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={assignWorker}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
