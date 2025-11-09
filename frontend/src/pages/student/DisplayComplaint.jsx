import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // ✅ Added import
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DisplayComplaint() {
  const navigate = useNavigate(); // ✅ Added navigation hook

  // Dummy complaint data
  const [complaint, setComplaint] = useState({
    _id: "C123",
    subject: "Fan not working",
    description:
      "The ceiling fan in Room B-203 is not working since yesterday. It makes a buzzing sound when switched on. Please look into it as soon as possible.",
    category: "Electrical",
    Hostel_Name: "V.G. Bhide",
    Room_Number: "B-203",
    status: "pending",
    attachments: [
      {
        url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=60",
        filename: "fan_issue.jpg",
        fileType: "image",
      },
      {
        url: "https://www.w3schools.com/html/horse.mp3",
        filename: "buzzing_sound.mp3",
        fileType: "audio",
      },
    ],
    createdAt: new Date().toISOString(),
    availability: [
      { date: "2025-11-10", slots: [{ start: "09:00", end: "11:00" }] },
      { date: "2025-11-11", slots: [{ start: "14:00", end: "16:00" }] },
    ],
  });

  const [busy, setBusy] = useState(false);

  // Helper function to simulate status updates
  const handleUpdateStatus = () => {
    setBusy(true);
    setTimeout(() => {
      let newStatus;
      if (complaint.status === "pending") newStatus = "In Progress";
      else if (complaint.status === "In Progress") newStatus = "resolved";
      else newStatus = "resolved";
      setComplaint((prev) => ({ ...prev, status: newStatus }));
      toast.success(`Status updated to "${newStatus}"`);
      setBusy(false);
    }, 1000);
  };

  const handleFillSurvey = () => {
    toast.info("Navigating to Survey Form (demo)");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
      <ToastContainer />
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 relative">
        {/* ❌ Close Button */}
        <button
          onClick={() => navigate(-1)} // ✅ Go back to previous page
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition text-xl font-bold"
          title="Go back"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{complaint.subject}</h1>
            <p className="text-sm text-gray-500 mt-1">
              {complaint.category} • {complaint.Hostel_Name} • Room {complaint.Room_Number}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold self-start md:self-center ${
              complaint.status.toLowerCase() === "resolved"
                ? "bg-green-100 text-green-700"
                : complaint.status.toLowerCase() === "in progress"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {complaint.status}
          </span>
        </div>

        {/* Description */}
        <p className="mt-4 text-gray-700 leading-relaxed">{complaint.description}</p>

        {/* Attachments */}
        {complaint.attachments?.length > 0 && (
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {complaint.attachments.map((a, i) =>
              a.fileType === "image" ? (
                <img
                  key={i}
                  src={a.url}
                  alt={a.filename}
                  className="w-full h-56 object-cover rounded-lg border shadow-sm hover:shadow-md transition"
                />
              ) : (
                <div key={i} className="bg-gray-50 p-3 rounded-lg border">
                  <p className="text-sm text-gray-600 mb-1">{a.filename}</p>
                  <audio controls src={a.url} className="w-full" />
                </div>
              )
            )}
          </div>
        )}

        {/* Availability */}
        {complaint.availability && (
          <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
            <h3 className="text-blue-700 font-semibold mb-2">Availability</h3>
            {complaint.availability.map((day) => (
              <p key={day.date} className="text-sm text-gray-600">
                {day.date} — {day.slots.map((s) => `${s.start} - ${s.end}`).join(", ")}
              </p>
            ))}
          </div>
        )}

        {/* Update Status Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleUpdateStatus}
            disabled={busy || complaint.status === "resolved"}
            className="px-6 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-full shadow hover:from-sky-600 hover:to-blue-700 transition disabled:opacity-60"
          >
            {busy
              ? "Updating..."
              : complaint.status === "resolved"
              ? "Resolved"
              : "Update Status"}
          </button>
        </div>

        {/* Fill Survey Button */}
        {complaint.status.toLowerCase() === "resolved" && (
          <div className="mt-6 text-center">
            <button
              onClick={handleFillSurvey}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full shadow hover:from-blue-600 hover:to-indigo-700 transition"
            >
              Fill Survey
            </button>
          </div>
        )}

        {/* Meta Info */}
        <div className="mt-8 text-xs text-gray-500 border-t pt-3">
          <p>
            <strong>Complaint ID:</strong> {complaint._id}
          </p>
          <p>
            <strong>Submitted:</strong> {new Date(complaint.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
