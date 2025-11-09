// src/components/StudentDashboard.jsx
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

function ComplaintCard({ c, onView, onSurvey }) {
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
          {/* View Complaint -> NAVIGATE to a route (you can change path later) */}
          <button
            onClick={() => onView(c)}
            className="w-full px-3 py-2 bg-white border rounded-lg text-sm font-medium hover:shadow-sm"
          >
            View Complaint
          </button>

          {/* Complete Survey: shown only when NOT resolved -> NAVIGATE to survey route */}
          {!resolved && (
            <button
              onClick={() => onSurvey(c)}
              className="w-full px-3 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-lg text-sm font-semibold hover:scale-105 transition"
            >
              Complete Survey
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  // Dummy user info (replace with logged-in user data)
  const user = {
    name: "Student Name",
    avatar: "https://i.pravatar.cc/100?img=12", // placeholder avatar
    room: "B-203",
    hostel: "V.G. Bhide",
  };

  useEffect(() => {
    // load complaints (demo uses dummy data)
    const load = async () => {
      try {
        // real API call example:
        // const res = await axios.get(`${apiBase}/api/complaints`, { withCredentials: true });
        // setComplaints(res.data);
        setComplaints([
          {
            _id: "1",
            id: "#GR001",
            category: "Electrical",
            subject: "Light not working",
            description: "Flickering lights in my room.",
            Room_Number: "A-101",
            Hostel_Name: "V.G. Bhide",
            status: "pending",
            attachments: [],
            createdAt: new Date().toISOString(),
          },
          {
            _id: "2",
            id: "#GR002",
            category: "Plumbing",
            subject: "Leak in bath",
            description: "Pipe leak near washbasin.",
            Room_Number: "B-203",
            Hostel_Name: "M.S. Swaminathan",
            status: "resolved",
            attachments: [],
            createdAt: new Date().toISOString(),
          },
          {
            _id: "3",
            id: "#GR003",
            category: "Internet",
            subject: "WiFi down",
            description: "No wifi since morning.",
            Room_Number: "C-310",
            Hostel_Name: "Anandibai Joshi",
            status: "In Progress",
            attachments: [],
            createdAt: new Date().toISOString(),
          },
        ]);
      } catch (e) {
        console.error(e);
        toast.error("Could not load complaints");
      }
    };
    load();
  }, []);

  const filtered = complaints.filter((c) => {
    if (filter !== "All" && c.status.toLowerCase() !== filter.toLowerCase()) return false;
    if (query && !(`${c.subject} ${c.category} ${c.id}`.toLowerCase().includes(query.toLowerCase()))) return false;
    return true;
  });

  // handlers that navigate to routes — change these paths anytime
  const handleViewNavigate = (c) => navigate(`/students/complaint`);
  const handleSurveyNavigate = (c) => navigate(`/students/survey`);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pb-24">
      <ToastContainer />
      <nav className="bg-white shadow sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={user.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover border" />
            <div>
              <div className="font-bold">{user.name}</div>
              <div className="text-xs text-gray-500">{user.hostel} • {user.room}</div>
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

            <button
              onClick={() => navigate(`/students/complaintform`)}
              className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-3 py-2 rounded-lg shadow"
            >
              Raise Complaint
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <StatCard title="Total" value={complaints.length} className="bg-gradient-to-br from-pink-50 to-pink-100" />
          <StatCard
            title="Pending / In Progress"
            value={complaints.filter((c) => ["pending", "in progress"].includes(c.status.toLowerCase())).length}
            className="bg-gradient-to-br from-yellow-50 to-yellow-100"
          />
          <StatCard title="Resolved" value={complaints.filter((c) => c.status.toLowerCase() === "resolved").length} className="bg-gradient-to-br from-green-50 to-green-100" />
        </div>

        <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="p-2 border rounded">
            {["All", "Pending", "In Progress", "Resolved", "Rejected"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>

          {/* mobile search visible under filters */}
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
              <div key={c._id}>
                <ComplaintCard c={c} onView={handleViewNavigate} onSurvey={handleSurveyNavigate} />
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
