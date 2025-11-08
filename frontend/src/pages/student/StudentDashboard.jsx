// src/components/StudentDashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Tailwind color mapping
const colorMap = {
  blue: { border: "border-blue-600", bgLight: "bg-blue-100", text: "text-blue-600" },
  yellow: { border: "border-yellow-500", bgLight: "bg-yellow-100", text: "text-yellow-600" },
  green: { border: "border-green-600", bgLight: "bg-green-100", text: "text-green-600" },
  red: { border: "border-red-600", bgLight: "bg-red-100", text: "text-red-600" },
};

const statusToColor = {
  pending: "yellow",
  open: "yellow",
  assigned: "blue",
  accepted: "blue",
  resolved: "green",
  rejected: "red",
};

// Stat card component
function StatCard({ title, value, colorKey, iconPath }) {
  const c = colorMap[colorKey] || colorMap.blue;
  return (
    <div className={`bg-white rounded-xl shadow-sm p-4 ${c.border}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-xs font-semibold">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className={`${c.bgLight} p-2 rounded-full`}>
          <svg className={`w-6 h-6 ${c.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} />
          </svg>
        </div>
      </div>
    </div>
  );
}

// Complaint row for desktop/tablet
function ComplaintRow({ comp, onView }) {
  const statusColor = statusToColor[comp.status?.toLowerCase()] || "blue";
  const colorClasses = colorMap[statusColor];
  const idLabel = comp.id || "—";
  const date = new Date(comp.date || Date.now());
  const dateStr = date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

  return (
    <tr className="hover:bg-gray-50 transition duration-150">
      <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{idLabel}</td>
      <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">{comp.category}</td>
      <td className="px-3 py-3 text-sm text-gray-700">{comp.subject}</td>
      <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">{dateStr}</td>
      <td className="px-3 py-3 whitespace-nowrap text-sm">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClasses.bgLight} ${colorClasses.text}`}>
          {comp.status}
        </span>
      </td>
      <td className="px-3 py-3 whitespace-nowrap text-sm">
        <button
          onClick={() => onView(comp)}
          className="text-blue-600 hover:text-blue-800 font-semibold text-sm px-2 py-1 rounded"
        >
          View
        </button>
      </td>
    </tr>
  );
}

// Mobile card view for a complaint
function ComplaintCard({ comp, onView }) {
  const statusColor = statusToColor[comp.status?.toLowerCase()] || "blue";
  const colorClasses = colorMap[statusColor];
  const date = new Date(comp.date || Date.now());
  const dateStr = date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">{comp.category}</span>
            <span className="text-xs text-gray-500">{dateStr}</span>
          </div>
          <p className="text-gray-900 font-semibold mt-2">{comp.subject}</p>
          <p className="text-xs text-gray-500 mt-1">{comp.id}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${colorClasses.bgLight} ${colorClasses.text}`}>
            {comp.status}
          </span>
          <button
            onClick={() => onView(comp)}
            className="text-sm bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}

// Main component
export default function StudentDashboard() {
  const navigate = useNavigate();

  // Dummy complaint data
  const dummyComplaints = [
    { id: "#GR001", category: "Electrical", subject: "Room light not working", date: "2025-11-05", status: "Pending" },
    { id: "#GR002", category: "Plumbing", subject: "Water leakage in washroom", date: "2025-10-30", status: "Resolved" },
    { id: "#GR003", category: "Internet", subject: "No Wi-Fi connection in Block A", date: "2025-10-20", status: "Rejected" },
    { id: "#GR004", category: "Cleaning", subject: "Room not cleaned for 3 days", date: "2025-11-06", status: "Assigned" },
    { id: "#GR005", category: "Electrical", subject: "Fan not working", date: "2025-11-03", status: "Resolved" },
  ];

  const [complaints] = useState(dummyComplaints);
  const [filter, setFilter] = useState("All");

  // Derived stats
  const stats = {
    total: complaints.length,
    pending: complaints.filter((c) => ["pending", "assigned"].includes(c.status.toLowerCase())).length,
    resolved: complaints.filter((c) => c.status.toLowerCase() === "resolved").length,
    rejected: complaints.filter((c) => c.status.toLowerCase() === "rejected").length,
  };

  const filteredComplaints =
    filter === "All" ? complaints : complaints.filter((c) => c.status.toLowerCase() === filter.toLowerCase());

  const handleLogout = () => navigate("/login");
  const handleView = (comp) => alert(`Viewing details for ${comp.subject}`);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-white shadow sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16">
            <div className="flex items-center gap-2">
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" />
              </svg>
              <span className="ml-1 text-lg md:text-xl font-bold text-gray-800">Hostel Grievance System</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-gray-700 font-medium">Welcome, Student</span>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Student Dashboard</h1>
          <p className="text-sm text-gray-600">Manage and track your hostel complaints</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <StatCard title="Total" value={stats.total} colorKey="blue" iconPath="M9 12h6m-6 4h6" />
          <StatCard title="Pending" value={stats.pending} colorKey="yellow" iconPath="M12 8v4l3 3" />
          <StatCard title="Resolved" value={stats.resolved} colorKey="green" iconPath="M9 12l2 2 4-4" />
          <StatCard title="Rejected" value={stats.rejected} colorKey="red" iconPath="M10 14l2-2" />
        </div>

        {/* Actions & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="flex gap-2">
            {["All", "Pending", "Resolved", "Rejected"].map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  filter === option ? "bg-indigo-600 text-white shadow" : "bg-white text-gray-700 border border-gray-200"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => navigate("/complaintform")}
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-3 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 text-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Raise Complaint
            </button>
          </div>
        </div>

        {/* Desktop table (hidden on small screens) */}
        <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3">
            <h2 className="text-white font-semibold">{filter === "All" ? "All Complaints" : `${filter} Complaints`}</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  {["ID", "Category", "Subject", "Date", "Status", "Action"].map((h) => (
                    <th key={h} className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredComplaints.length === 0 ? (
                  <tr>
                    <td className="p-6 text-center text-gray-500" colSpan={6}>No {filter.toLowerCase()} complaints found.</td>
                  </tr>
                ) : (
                  filteredComplaints.map((c) => <ComplaintRow key={c.id} comp={c} onView={handleView} />)
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile list (visible on small screens) */}
        <div className="md:hidden mt-3">
          {filteredComplaints.length === 0 ? (
            <div className="text-center text-gray-500 py-6">No {filter.toLowerCase()} complaints found.</div>
          ) : (
            filteredComplaints.map((c) => <ComplaintCard key={c.id} comp={c} onView={handleView} />)
          )}
        </div>
      </div>
    </div>
  );
}
