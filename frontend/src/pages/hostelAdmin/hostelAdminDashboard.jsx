// src/components/AdminDashboard.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Admin/Warden Dashboard (offline dummy version)
 * - Shows stats
 * - Search + filter complaints
 * - Desktop table + mobile cards
 * - Assign complaint to worker via modal (updates local state)
 * - Change status quickly
 */

// color map
const colorMap = {
  blue: { border: "border-blue-600", bgLight: "bg-blue-100", text: "text-blue-600" },
  yellow: { border: "border-yellow-500", bgLight: "bg-yellow-100", text: "text-yellow-600" },
  green: { border: "border-green-600", bgLight: "bg-green-100", text: "text-green-600" },
  red: { border: "border-red-600", bgLight: "bg-red-100", text: "text-red-600" },
};
const statusToColor = { pending: "yellow", open: "yellow", assigned: "blue", accepted: "blue", resolved: "green", rejected: "red" };

// small stat card
function Stat({ title, value, colorKey }) {
  const c = colorMap[colorKey] || colorMap.blue;
  return (
    <div className={`bg-white rounded-xl shadow-sm p-4 ${c.border}`}>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
  );
}

// desktop row
function ComplaintRow({ c, onView, onOpenAssign, onChangeStatus }) {
  const colorKey = statusToColor[c.status.toLowerCase()] || "blue";
  const colors = colorMap[colorKey];
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-3 py-3 text-sm font-medium text-gray-900">{c.id}</td>
      <td className="px-3 py-3 text-sm text-gray-700">{c.category}</td>
      <td className="px-3 py-3 text-sm text-gray-700">{c.title}</td>
      <td className="px-3 py-3 text-sm text-gray-700">{c.room}</td>
      <td className="px-3 py-3 text-sm">
        <span className={`${colors.bgLight} ${colors.text} px-2 py-1 rounded-full text-xs font-semibold`}>{c.status}</span>
      </td>
      <td className="px-3 py-3 text-sm flex items-center gap-2">
        <button onClick={() => onOpenAssign(c)} className="text-sm bg-indigo-600 text-white px-3 py-1 rounded">Assign</button>
        <select
          value={c.status}
          onChange={(e) => onChangeStatus(c.id, e.target.value)}
          className="text-sm border rounded px-2 py-1"
        >
          {["Pending", "Assigned", "Accepted", "Resolved", "Rejected"].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button onClick={() => onView(c)} className="text-blue-600 text-sm">View</button>
      </td>
    </tr>
  );
}

// mobile card
function ComplaintCard({ c, onView, onOpenAssign, onChangeStatus }) {
  const colorKey = statusToColor[c.status.toLowerCase()] || "blue";
  const colors = colorMap[colorKey];
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-3">
      <div className="flex justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-800">{c.title}</h3>
            <span className="text-xs text-gray-500">({c.id})</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{c.category} • Room {c.room}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`${colors.bgLight} ${colors.text} px-2 py-1 rounded-full text-xs font-semibold`}>{c.status}</span>
          <div className="flex gap-2">
            <button onClick={() => onOpenAssign(c)} className="bg-indigo-600 text-white px-2 py-1 rounded text-sm">Assign</button>
            <button onClick={() => onView(c)} className="text-blue-600 text-sm">View</button>
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <label className="text-xs text-gray-500">Change status:</label>
        <select value={c.status} onChange={(e) => onChangeStatus(c.id, e.target.value)} className="text-sm border rounded px-2 py-1">
          {["Pending", "Assigned", "Accepted", "Resolved", "Rejected"].map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
    </div>
  );
}

// Assign Modal
function AssignModal({ open, onClose, complaint, workers, onAssign }) {
  const [workerId, setWorkerId] = useState(workers?.[0]?.id || "");
  const [priority, setPriority] = useState(complaint?.priority || "Medium");

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4">
        <h3 className="text-lg font-semibold mb-2">Assign Complaint {complaint?.id}</h3>
        <p className="text-sm text-gray-600 mb-3">{complaint?.title}</p>

        <div className="mb-3">
          <label className="block text-xs text-gray-600 mb-1">Choose Worker</label>
          <select value={workerId} onChange={(e) => setWorkerId(e.target.value)} className="w-full border rounded px-3 py-2 text-sm">
            {workers.map((w) => <option key={w.id} value={w.id}>{w.name} — {w.role}</option>)}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-xs text-gray-600 mb-1">Priority</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full border rounded px-3 py-2 text-sm">
            {["Low","Medium","High"].map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-2 rounded bg-gray-100 text-sm">Cancel</button>
          <button onClick={() => onAssign(complaint.id, workerId, priority)} className="px-3 py-2 rounded bg-indigo-600 text-white text-sm">Assign</button>
        </div>
      </div>
    </div>
  );
}

// Main Admin Dashboard
export default function AdminDashboard() {
  const navigate = useNavigate();

  // dummy workers
  const [workers, setWorkers] = useState([
    { id: "w1", name: "Ramesh (Electrical)", role: "Electrician", assigned: 2 },
    { id: "w2", name: "Sita (Plumbing)", role: "Plumber", assigned: 1 },
    { id: "w3", name: "Ajay (Cleaning)", role: "Cleaner", assigned: 0 },
  ]);

  // dummy complaints
  const [complaints, setComplaints] = useState([
    { id: "C1001", category: "Electrical", title: "Room light not working", room: "A-101", status: "Pending", createdAt: "2025-11-05", priority: "Medium", assignedTo: null },
    { id: "C1002", category: "Plumbing", title: "Water leakage in washroom", room: "B-203", status: "Assigned", createdAt: "2025-10-30", priority: "High", assignedTo: "w2" },
    { id: "C1003", category: "Internet", title: "No Wi-Fi in Block A", room: "A-305", status: "Resolved", createdAt: "2025-10-20", priority: "Low", assignedTo: "w4" },
    { id: "C1004", category: "Cleaning", title: "Room not cleaned for 3 days", room: "C-110", status: "Pending", createdAt: "2025-11-06", priority: "Medium", assignedTo: null },
    { id: "C1005", category: "Electrical", title: "Fan not working", room: "A-103", status: "Assigned", createdAt: "2025-11-03", priority: "High", assignedTo: "w1" },
  ]);

  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [assigning, setAssigning] = useState({ open: false, complaint: null });

  // derived stats
  const stats = useMemo(() => {
    const total = complaints.length;
    const pending = complaints.filter(c => c.status === "Pending").length;
    const assigned = complaints.filter(c => c.status === "Assigned").length;
    const resolved = complaints.filter(c => c.status === "Resolved").length;
    return { total, pending, assigned, resolved };
  }, [complaints]);

  // filtered list
  const filtered = useMemo(() => {
    return complaints.filter(c => {
      if (filter !== "All" && c.status !== filter) return false;
      if (query && !`${c.id} ${c.title} ${c.category} ${c.room}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [complaints, filter, query]);

  // handlers
  const openAssignModal = (complaint) => setAssigning({ open: true, complaint });
  const closeAssignModal = () => setAssigning({ open: false, complaint: null });

  const handleAssign = (complaintId, workerId, priority) => {
    setComplaints(prev => prev.map(c => c.id === complaintId ? {...c, assignedTo: workerId, status: "Assigned", priority } : c));
    // update worker load locally
    setWorkers(prev => prev.map(w => w.id === workerId ? {...w, assigned: (w.assigned || 0) + 1} : w));
    closeAssignModal();
  };

  const handleChangeStatus = (complaintId, newStatus) => {
    setComplaints(prev => prev.map(c => c.id === complaintId ? {...c, status: newStatus } : c));
  };

  const handleView = (c) => {
    // In a full app you'd route to details page; for now show simple modal/alert
    alert(`Complaint ${c.id}\n\nTitle: ${c.title}\nCategory: ${c.category}\nRoom: ${c.room}\nStatus: ${c.status}\nAssignedTo: ${c.assignedTo || "—"}`);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <nav className="bg-white shadow sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white font-bold">WG</div>
              <div>
                <div className="font-semibold">Warden Dashboard</div>
                <div className="text-xs text-gray-500">Hostel Management</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleLogout} className="text-sm bg-red-500 text-white px-3 py-1.5 rounded">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-4">
        {/* top stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <Stat title="Total" value={stats.total} colorKey="blue" />
          <Stat title="Pending" value={stats.pending} colorKey="yellow" />
          <Stat title="Assigned" value={stats.assigned} colorKey="blue" />
          <Stat title="Resolved" value={stats.resolved} colorKey="green" />
        </div>

        {/* controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by id/title/room" className="px-3 py-2 border rounded w-64 text-sm" />
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-3 py-2 border rounded text-sm">
              <option>All</option>
              <option>Pending</option>
              <option>Assigned</option>
              <option>Accepted</option>
              <option>Resolved</option>
              <option>Rejected</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-sm text-gray-600">Workers: {workers.length}</div>
            <button onClick={() => alert('Open reports (not implemented)')} className="bg-indigo-600 text-white px-3 py-1.5 rounded text-sm">Reports</button>
          </div>
        </div>

        {/* layout: table (md+) + mobile cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* left: complaints list (spans 2 cols on md) */}
          <div className="md:col-span-2">
            <div className="hidden md:block bg-white rounded shadow overflow-hidden">
              <div className="bg-gray-100 px-4 py-3">
                <strong className="text-sm">{filter === "All" ? "All Complaints" : `${filter} Complaints`}</strong>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {["ID","Category","Title","Room","Status","Actions"].map(h=> <th key={h} className="px-3 py-3 text-xs text-left text-gray-600">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr><td className="p-6 text-center text-gray-500" colSpan={6}>No complaints</td></tr>
                    ) : filtered.map(c => <ComplaintRow key={c.id} c={c} onView={handleView} onOpenAssign={openAssignModal} onChangeStatus={handleChangeStatus} />)}
                  </tbody>
                </table>
              </div>
            </div>

            {/* mobile view */}
            <div className="md:hidden">
              {filtered.length === 0 ? <div className="text-center py-6 text-gray-500">No complaints</div> : filtered.map(c => <ComplaintCard key={c.id} c={c} onView={handleView} onOpenAssign={openAssignModal} onChangeStatus={handleChangeStatus} />)}
            </div>
          </div>

          {/* right: workers panel */}
          <aside className="bg-white rounded shadow p-3">
            <h4 className="font-semibold mb-2">Workers</h4>
            <div className="space-y-2">
              {workers.map(w => (
                <div key={w.id} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <div className="text-sm font-medium">{w.name}</div>
                    <div className="text-xs text-gray-500">{w.role}</div>
                  </div>
                  <div className="text-sm text-gray-600">{w.assigned}</div>
                </div>
              ))}
            </div>

            <div className="mt-3">
              <button onClick={() => alert('Open worker management (not implemented)')} className="w-full bg-green-600 text-white py-2 rounded">Manage Workers</button>
            </div>
          </aside>
        </div>
      </main>

      {/* Assign modal */}
      <AssignModal
        open={assigning.open}
        onClose={closeAssignModal}
        complaint={assigning.complaint}
        workers={workers}
        onAssign={handleAssign}
      />
    </div>
  );
}
