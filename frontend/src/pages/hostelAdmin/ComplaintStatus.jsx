import React from "react";

function ComplaintStatus() {
  const handleStatusUpdate = (e) => {
    e.preventDefault();
    alert("Complaint status updated successfully!");
  };

  const handleSchedule = (e) => {
    e.preventDefault();
    alert("Repair schedule submitted successfully!");
  };

  const handleFeedback = (e) => {
    e.preventDefault();
    alert("Feedback submitted successfully!");
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
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
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                ></path>
              </svg>
              <span className="ml-2 text-xl font-bold text-gray-800">
                Hostel Grievance System
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/student-dashboard"
                className="text-gray-700 hover:text-blue-600 font-semibold transition"
              >
                Dashboard
              </a>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <a
            href="/student-dashboard"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            Back to Dashboard
          </a>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Complaint Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Complaint Info */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">
                  Complaint Details
                </h2>
                <span className="text-white text-sm font-semibold">ID: #GR001</span>
              </div>

              <div className="p-6 space-y-4">
                {[
                  ["Category", "Electrical Issues"],
                  ["Priority", "High"],
                  ["Subject", "Room light not working"],
                  [
                    "Description",
                    "The main ceiling light in my room has stopped working since yesterday evening. The tube light might need replacement or there could be an electrical issue.",
                  ],
                  ["Location", "Room 204, Block A"],
                  ["Student Name", "John Doe"],
                  ["Student ID", "STU12345"],
                  ["Contact", "+91-9876543210"],
                  ["Submitted On", "Nov 05, 2025 at 2:30 PM"],
                ].map(([label, value], i) => (
                  <div key={i} className="flex items-start">
                    <div className="flex-shrink-0 w-32 text-gray-600 font-semibold">
                      {label}:
                    </div>
                    <div className="text-gray-800">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Update Section */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Update Status</h2>
              </div>

              <div className="p-6">
                <form className="space-y-6" onSubmit={handleStatusUpdate}>
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-3">
                      Current Status
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        {
                          value: "not-started",
                          color: "red",
                          label: "Not Started",
                          icon: (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          ),
                        },
                        {
                          value: "in-progress",
                          color: "yellow",
                          label: "In Progress",
                          checked: true,
                          icon: (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          ),
                        },
                        {
                          value: "completed",
                          color: "green",
                          label: "Completed",
                          icon: (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          ),
                        },
                      ].map((s, i) => (
                        <label key={i} className="relative cursor-pointer">
                          <input
                            type="radio"
                            name="status"
                            value={s.value}
                            defaultChecked={s.checked}
                            className="peer sr-only"
                          />
                          <div
                            className={`border-2 border-gray-300 rounded-lg p-4 text-center transition peer-checked:border-${s.color}-500 peer-checked:bg-${s.color}-50 hover:border-${s.color}-300`}
                          >
                            <div
                              className={`w-10 h-10 mx-auto mb-2 rounded-full bg-${s.color}-100 flex items-center justify-center`}
                            >
                              <svg
                                className={`w-6 h-6 text-${s.color}-600`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                {s.icon}
                              </svg>
                            </div>
                            <span className="text-sm font-semibold text-gray-700">
                              {s.label}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="statusNotes"
                      className="block text-gray-700 text-sm font-semibold mb-2"
                    >
                      Status Notes
                    </label>
                    <textarea
                      id="statusNotes"
                      rows="3"
                      placeholder="Add notes about the current status..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300 shadow-lg hover:shadow-xl"
                  >
                    Update Status
                  </button>
                </form>
              </div>
            </div>

            {/* Schedule Work Section */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white">
                  Schedule Repair Work
                </h2>
              </div>

              <div className="p-6">
                <form className="space-y-6" onSubmit={handleSchedule}>
                  <div>
                    <label
                      htmlFor="scheduleDate"
                      className="block text-gray-700 text-sm font-semibold mb-2"
                    >
                      Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="scheduleDate"
                      type="date"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-3">
                      Time Slot (2-hour slots)
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        "08:00 AM - 10:00 AM",
                        "10:00 AM - 12:00 PM",
                        "12:00 PM - 02:00 PM",
                        "02:00 PM - 04:00 PM",
                        "04:00 PM - 06:00 PM",
                        "06:00 PM - 08:00 PM",
                      ].map((slot, i) => (
                        <label key={i} className="relative cursor-pointer">
                          <input
                            type="radio"
                            name="timeSlot"
                            value={slot}
                            className="peer sr-only"
                          />
                          <div className="border-2 border-gray-300 rounded-lg p-3 text-center transition peer-checked:border-blue-600 peer-checked:bg-blue-50 hover:border-blue-300">
                            <span className="text-sm font-semibold text-gray-700">
                              {slot}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="assignedTo"
                      className="block text-gray-700 text-sm font-semibold mb-2"
                    >
                      Assigned Technician
                    </label>
                    <select
                      id="assignedTo"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                      <option value="">Select technician</option>
                      <option value="tech1">Ramesh Kumar - Electrician</option>
                      <option value="tech2">Suresh Verma - Plumber</option>
                      <option value="tech3">Mahesh Singh - Carpenter</option>
                      <option value="tech4">
                        Rajesh Sharma - General Maintenance
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="scheduleNotes"
                      className="block text-gray-700 text-sm font-semibold mb-2"
                    >
                      Additional Notes
                    </label>
                    <textarea
                      id="scheduleNotes"
                      rows="3"
                      placeholder="Any special instructions or requirements..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold py-3 rounded-lg hover:from-green-700 hover:to-teal-700 transition duration-300 shadow-lg hover:shadow-xl"
                  >
                    Schedule Repair
                  </button>
                </form>
              </div>
            </div>

            {/* Feedback Section */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Provide Feedback</h2>
              </div>

              <div className="p-6">
                <form onSubmit={handleFeedback} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-3">
                      Rate the Service Quality
                    </label>
                    <div className="flex items-center justify-center gap-3 py-4">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <label
                          key={n}
                          className="cursor-pointer group"
                          title={`${n} Star${n > 1 ? "s" : ""}`}
                        >
                          <input
                            type="radio"
                            name="rating"
                            value={n}
                            className="peer sr-only"
                          />
                          <svg
                            className="w-12 h-12 text-gray-300 peer-checked:text-yellow-400 group-hover:text-yellow-300 transition"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="feedbackText"
                      className="block text-gray-700 text-sm font-semibold mb-2"
                    >
                      Comments
                    </label>
                    <textarea
                      id="feedbackText"
                      rows="3"
                      placeholder="Share your experience..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold py-3 rounded-lg hover:from-yellow-600 hover:to-orange-600 transition duration-300 shadow-lg hover:shadow-xl"
                  >
                    Submit Feedback
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplaintStatus;
