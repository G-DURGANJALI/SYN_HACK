import React from "react";

function ComplaintForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Complaint submitted successfully!");
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
            <div className="flex items-center">
              <svg
                className="w-12 h-12 mr-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
              </svg>
              <div>
                <h1 className="text-3xl font-bold">Raise a Complaint</h1>
                <p className="text-blue-100 mt-1">
                  Report your hostel issues here
                </p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              {/* Student Information */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-600">
                  Student Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="studentName"
                      className="block text-gray-700 text-sm font-semibold mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      id="studentName"
                      name="studentName"
                      type="text"
                      placeholder="Enter your full name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="studentId"
                      className="block text-gray-700 text-sm font-semibold mb-2"
                    >
                      Student ID
                    </label>
                    <input
                      id="studentId"
                      name="studentId"
                      type="text"
                      placeholder="Student ID"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="hostelBlock"
                      className="block text-gray-700 text-sm font-semibold mb-2"
                    >
                      Hostel Block
                    </label>
                    <select
                      id="hostelBlock"
                      name="hostelBlock"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                      <option value="">Select hostel block</option>
                      {[
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8",
                        "9",
                        "10",
                        "GH1",
                        "GH2",
                      ].map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="roomNumber"
                      className="block text-gray-700 text-sm font-semibold mb-2"
                    >
                      Room Number
                    </label>
                    <input
                      id="roomNumber"
                      type="text"
                      placeholder="Enter your room number"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Complaint Details */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-600">
                  Complaint Details
                </h2>

                <div className="mb-6">
                  <label
                    htmlFor="category"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Complaint Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    <option value="">Select a category</option>
                    {[
                      "Electrical Issues",
                      "Plumbing Issues",
                      "Furniture & Fixtures",
                      "Cleanliness & Hygiene",
                      "Internet & WiFi",
                      "Noise & Disturbance",
                      "Security Issues",
                      "Others",
                    ].map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="priority"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Priority Level <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="priority"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    <option value="">Select priority</option>
                    <option value="low">Low - Can wait a few days</option>
                    <option value="medium">Medium - Should be addressed soon</option>
                    <option value="high">High - Urgent attention needed</option>
                    <option value="critical">
                      Critical - Immediate action required
                    </option>
                  </select>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="subject"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Complaint Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Brief description of the issue"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="description"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Detailed Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    rows="6"
                    placeholder="Provide detailed information about your complaint..."
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition"
                  ></textarea>
                  <p className="text-sm text-gray-500 mt-2">
                    Please be as specific as possible to help us resolve your issue
                    quickly.
                  </p>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300 shadow-lg hover:shadow-xl"
                  >
                    Submit Complaint
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplaintForm;
