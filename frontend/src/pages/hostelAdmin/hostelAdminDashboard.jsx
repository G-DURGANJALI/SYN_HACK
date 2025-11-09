import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function StatCard({ title, value, className }) {
  return (
    <div className={`rounded-2xl p-4 shadow ${className}`}>
      <div className="text-xs text-gray-700 font-semibold">{title}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}

function AdminComplaintCard({ c, onView }) {
  const pendingish = ["pending", "in progress"].includes((c.status || "").toLowerCase());
  const resolved = (c.status || "").toLowerCase() === "resolved";

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col sm:flex-row justify-between items-start gap-4">
      <div className="flex-1 pr-2">
        <div className="flex items-start gap-3">
          {/* small category pill */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-50 to-sky-50 flex items-center justify-center text-indigo-600 font-semibold">
              {c.category?.[0] || "?"}
            </div>
          </div>

          <div className="min-w-0">
            <div className="text-sm text-gray-500">
              {c.category} • {c.Hostel_Name} • {c.Room_Number}
            </div>
            <h3 className="font-semibold text-lg mt-1 truncate">{c.subject}</h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{c.description}</p>
          </div>
        </div>
      </div>

      <div className="w-full sm:w-44 flex flex-col items-end gap-3">
        <div
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            resolved ? "bg-green-50 text-green-700" : pendingish ? "bg-yellow-50 text-yellow-700" : "bg-blue-50 text-blue-700"
          }`}
        >
          {c.status}
        </div>

        <div className="w-full flex flex-col gap-2">
          <button
            onClick={() => onView(c)}
            className="w-full px-3 py-2 bg-white border rounded-lg text-sm font-medium hover:shadow-sm"
          >
            View Complaint
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HostelAdminPortal({ hostelName = "V.G. Bhide" }) {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        // Uncomment and adapt to use real backend:
        // const res = await axios.get(`${apiBase}/api/complaints`, { params: { hostel: hostelName }, withCredentials: true });
        // setComplaints(res.data || []);

        // Demo data:
        setComplaints([
          {
            _id: "C-1001",
            subject: "Fan not working",
            description: "Ceiling fan in B-203 making loud buzzing sound.",
            category: "Electrical",
            Hostel_Name: hostelName,
            Room_Number: "B-203",
            status: "pending",
            createdAt: new Date().toISOString(),
          },
          {
            _id: "C-1002",
            subject: "Leaking pipe",
            description: "Water leaking from ceiling near washbasin.",
            category: "Maintenance",
            Hostel_Name: hostelName,
            Room_Number: "A-102",
            status: "In Progress",
            createdAt: new Date().toISOString(),
          },
          {
            _id: "C-1003",
            subject: "WiFi down",
            description: "No connectivity since morning on 3rd floor.",
            category: "Technical",
            Hostel_Name: hostelName,
            Room_Number: "C-310",
            status: "Resolved",
            createdAt: new Date().toISOString(),
          },
        ]);
      } catch (e) {
        console.error(e);
        toast.error("Could not load complaints");
      }
    };
    load();
  }, [hostelName]);

  const filtered = complaints.filter((c) => {
    if (filter !== "All" && c.status.toLowerCase() !== filter.toLowerCase()) return false;
    if (categoryFilter !== "All" && c.category?.toLowerCase() !== categoryFilter.toLowerCase()) return false;
    if (query && !(`${c.subject} ${c.description} ${c.Room_Number}`.toLowerCase().includes(query.toLowerCase()))) return false;
    return true;
  });

  const counts = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status.toLowerCase() === "pending").length,
    inProgress: complaints.filter((c) => c.status.toLowerCase() === "in progress").length,
    resolved: complaints.filter((c) => c.status.toLowerCase() === "resolved").length,
  };

  const handleView = (c) => navigate(`/students/complaint`);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pb-24">
      <ToastContainer />
      <nav className="bg-white shadow sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={"https://i.pravatar.cc/100?img=12"} alt="warden" className="w-10 h-10 rounded-full object-cover border" />
            <div>
              <div className="font-bold">Warden — R. Sharma</div>
              <div className="text-xs text-gray-500">{hostelName}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <input
                placeholder="Search complaints..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="px-3 py-2 border rounded-lg w-64"
              />
            </div>
            {/* no raise complaint button here (admin view) */}
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <StatCard title="Total" value={counts.total} className="bg-gradient-to-br from-pink-50 to-pink-100" />
          <StatCard title="Pending / In Progress" value={counts.pending + counts.inProgress} className="bg-gradient-to-br from-yellow-50 to-yellow-100" />
          <StatCard title="Resolved" value={counts.resolved} className="bg-gradient-to-br from-green-50 to-green-100" />
        </div>

        <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="p-2 border rounded">
            {["All", "Pending", "In Progress", "Resolved"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>

          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="p-2 border rounded">
            {["All", "Electrical", "Maintenance", "Technical"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>

          <div className="w-full sm:w-auto">
            <div className="block sm:hidden mt-2">
              <input
                placeholder="Search complaints..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="px-3 py-2 border rounded-lg w-full"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center text-gray-500 py-6">No complaints</div>
          ) : (
            filtered.map((c) => (
              <AdminComplaintCard key={c._id} c={c} onView={handleView} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
