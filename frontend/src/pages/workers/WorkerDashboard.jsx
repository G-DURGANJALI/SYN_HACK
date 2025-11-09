import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function WorkerDashboard() {
  const navigate = useNavigate();

  // ---------- Tasks ----------
  const [tasks, setTasks] = useState([
    { tokenNumber: 30, subject: "Fix ceiling fan in Room 214", hostelBlock: "V.G. Bhide, Room F-110", date: "2025-11-06", status: "Assigned" },
    { tokenNumber: 23, subject: "Repair water tap in washroom", hostelBlock: "M.S. Swaminathan, Room S-22", date: "2025-11-05", status: "In Progress" },
    { tokenNumber: 17, subject: "Replace broken window pane", hostelBlock: "J.C. Bose, Room F-80", date: "2025-11-03", status: "Completed" },
    { tokenNumber: 12, subject: "Check corridor lights", hostelBlock: "V.G. Bhide, Room G-10", date: "2025-11-04", status: "Rejected" },
  ]);
  const [filter, setFilter] = useState("All");

  // ---------- Availability ----------
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [tomorrow, setTomorrow] = useState("");

  const timeOptions = ["9am–11am", "11am–1pm", "2pm–4pm", "4pm–6pm", "After 6pm"];

  useEffect(() => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    setTomorrow(t.toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    const checkAvailability = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/workers/availability", {
          withCredentials: true,
        });
        const hasTomorrow = (data?.availability || []).some(
          (slot) =>
            new Date(slot.date).toDateString() === new Date(tomorrow).toDateString()
        );
        if (!hasTomorrow) setShowAvailabilityModal(true);
      } catch (error) {
        console.error("checkAvailability error:", error);
      }
    };
    if (tomorrow) checkAvailability();
  }, [tomorrow]);

  const toggleSlot = (slot) => {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const handleSubmitAvailability = async () => {
    if (selectedSlots.length === 0) {
      toast.error("Select at least one time slot!");
      return;
    }
    try {
      await axios.post(
        "http://localhost:5000/api/worker/availability",
        { date: tomorrow, timeSlots: selectedSlots },
        { withCredentials: true }
      );
      toast.success("Tomorrow’s availability saved!");
      setShowAvailabilityModal(false);
    } catch (error) {
      console.error("Error setting availability:", error);
      toast.error("Failed to set availability");
    }
  };

  // ---------- Stats ----------
  const stats = useMemo(() => {
    const total = tasks.length;
    const assigned = tasks.filter((t) => t.status.toLowerCase() === "assigned").length;
    const inProgress = tasks.filter((t) => t.status.toLowerCase() === "in progress").length;
    const completed = tasks.filter((t) => t.status.toLowerCase() === "completed").length;
    return { total, assigned, inProgress, completed };
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    if (filter === "All") return tasks;
    return tasks.filter((t) => t.status.toLowerCase() === filter.toLowerCase());
  }, [tasks, filter]);

  // ---------- Actions ----------
  const handleLogout = () => navigate("/login");
  const handleView = (task) => alert(`Viewing Token #${task.tokenNumber}: ${task.subject}`);
  const handleStart = (task) => {
    setTasks((prev) =>
      prev.map((t) => (t.tokenNumber === task.tokenNumber ? { ...t, status: "In Progress" } : t))
    );
  };
  const handleComplete = (task) => {
    setTasks((prev) =>
      prev.map((t) => (t.tokenNumber === task.tokenNumber ? { ...t, status: "Completed" } : t))
    );
  };
  const handleUploadProof = (task) => {
    navigate(`/worker/tasks/${task.tokenNumber}/upload-proof`, { state: { task } });
  };

  // ---------- Color mapping ----------
  const colorMap = {
    blue: { border: "border-blue-600", bgLight: "bg-blue-100", text: "text-blue-600" },
    yellow: { border: "border-yellow-500", bgLight: "bg-yellow-100", text: "text-yellow-600" },
    green: { border: "border-green-600", bgLight: "bg-green-100", text: "text-green-600" },
    red: { border: "border-red-600", bgLight: "bg-red-100", text: "text-red-600" },
    gray: { border: "border-gray-500", bgLight: "bg-gray-100", text: "text-gray-700" },
  };

  const statusToColor = {
    assigned: "blue",
    "in progress": "yellow",
    completed: "green",
    rejected: "red",
  };

  // ---------- Subcomponents ----------
  function StatCard({ title, value, colorKey, iconPath }) {
    const c = colorMap[colorKey] || colorMap.blue;
    return (
      <div className={`bg-white rounded-xl shadow-sm p-4 border ${c.border}`}>
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

  function TaskRow({ task, onView, onStart, onComplete, onProof }) {
    const statusColor = statusToColor[task.status?.toLowerCase()] || "gray";
    const colorClasses = colorMap[statusColor];
    const date = new Date(task.date || Date.now());
    const dateStr = date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

    return (
      <tr className="hover:bg-gray-50 transition duration-150">
        <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{task.tokenNumber}</td>
        <td className="px-3 py-3 text-sm text-gray-700">{task.subject}</td>
        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">{task.hostelBlock}</td>
        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">{dateStr}</td>
        <td className="px-3 py-3 whitespace-nowrap text-sm">
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClasses.bgLight} ${colorClasses.text}`}>
            {task.status}
          </span>
        </td>
        <td className="px-3 py-3 whitespace-nowrap text-sm">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => onView(task)} className="text-blue-600 hover:text-blue-800 font-semibold text-sm px-2 py-1 rounded">
              View
            </button>
            {task.status.toLowerCase() === "assigned" && (
              <button onClick={() => onStart(task)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-xs">
                Start
              </button>
            )}
            {task.status.toLowerCase() === "in progress" && (
              <button onClick={() => onComplete(task)} className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs">
                Complete
              </button>
            )}
            <button onClick={() => onProof(task)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded text-xs">
              Upload Proof
            </button>
          </div>
        </td>
      </tr>
    );
  }

  function TaskCard({ task, onView, onStart, onComplete, onProof }) {
    const statusColor = statusToColor[task.status?.toLowerCase()] || "gray";
    const colorClasses = colorMap[statusColor];
    const date = new Date(task.date || Date.now());
    const dateStr = date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

    return (
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-700">Token #{task.tokenNumber}</span>
              <span className="text-xs text-gray-500">{dateStr}</span>
            </div>
            <p className="text-gray-900 font-semibold mt-2">{task.subject}</p>
            <p className="text-xs text-gray-500 mt-1">{task.hostelBlock}</p>
          </div>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${colorClasses.bgLight} ${colorClasses.text}`}>
            {task.status}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          <button onClick={() => onView(task)} className="text-sm bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-md">
            View
          </button>
          {task.status.toLowerCase() === "assigned" && (
            <button onClick={() => onStart(task)} className="text-sm bg-yellow-500 text-white px-3 py-1 rounded-md">
              Start
            </button>
          )}
          {task.status.toLowerCase() === "in progress" && (
            <button onClick={() => onComplete(task)} className="text-sm bg-green-600 text-white px-3 py-1 rounded-md">
              Complete
            </button>
          )}
          <button onClick={() => onProof(task)} className="text-sm bg-indigo-600 text-white px-3 py-1 rounded-md">
            Upload Proof
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16">
            <div className="flex items-center gap-2">
              <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2v-7H3v7a2 2 0 002 2z" />
              </svg>
              <span className="ml-1 text-lg md:text-xl font-bold text-gray-800">Worker Dashboard</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-gray-700 font-medium">Welcome, Worker</span>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Task Overview</h1>
          <p className="text-sm text-gray-600">Check your assigned jobs and update their progress</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <StatCard title="Total" value={stats.total} colorKey="blue" iconPath="M9 12h6m-6 4h6" />
          <StatCard title="Assigned" value={stats.assigned} colorKey="blue" iconPath="M12 8v4l3 3" />
          <StatCard title="In Progress" value={stats.inProgress} colorKey="yellow" iconPath="M3 12h18" />
          <StatCard title="Completed" value={stats.completed} colorKey="green" iconPath="M9 12l2 2 4-4" />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="flex gap-2">
            {["All", "Assigned", "In Progress", "Completed", "Rejected"].map((option) => (
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
              onClick={() => navigate("/worker/history")}
              className="inline-flex items-center bg-white border border-gray-200 text-gray-700 font-semibold px-3 py-2 rounded-lg hover:bg-gray-50 text-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v8m4-4H8" />
              </svg>
              View History
            </button>
          </div>
        </div>

        {/* Table / Cards */}
        <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-3">
            <h2 className="text-white font-semibold">
              {filter === "All" ? "All Tasks" : `${filter} Tasks`}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  {["Token", "Subject", "Hostel", "Date", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTasks.length === 0 ? (
                  <tr>
                    <td className="p-6 text-center text-gray-500" colSpan={6}>
                      No {filter.toLowerCase()} tasks found.
                    </td>
                  </tr>
                ) : (
                  filteredTasks.map((t) => (
                    <TaskRow
                      key={t.tokenNumber}
                      task={t}
                      onView={handleView}
                      onStart={handleStart}
                      onComplete={handleComplete}
                      onProof={handleUploadProof}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden mt-3">
          {filteredTasks.length === 0 ? (
            <div className="text-center text-gray-500 py-6">No {filter.toLowerCase()} tasks found.</div>
          ) : (
            filteredTasks.map((t) => (
              <TaskCard
                key={t.tokenNumber}
                task={t}
                onView={handleView}
                onStart={handleStart}
                onComplete={handleComplete}
                onProof={handleUploadProof}
              />
            ))
          )}
        </div>
      </div>

      {/* Availability Modal */}
      {showAvailabilityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Tomorrow’s Availability</h2>
            <p className="text-sm text-gray-600 mb-4">
              Select time slots when you’re free on {new Date(tomorrow).toDateString()}:
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {timeOptions.map((slot) => (
                <button
                  key={slot}
                  onClick={() => toggleSlot(slot)}
                  className={`px-3 py-2 rounded-lg text-sm border ${
                    selectedSlots.includes(slot)
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAvailabilityModal(false)}
                className="px-3 py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Skip
              </button>
              <button
                onClick={handleSubmitAvailability}
                className="px-3 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
