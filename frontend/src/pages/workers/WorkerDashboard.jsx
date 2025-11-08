import React from "react";

function WorkerDashboard() {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow mb-6 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Rajesh Kumar</h1>
            <p className="text-gray-600">Electrical Department</p>
          </div>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
            Logout
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: "Total Assigned",
            value: "8",
            color: "blue",
            iconPath:
              "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
          },
          {
            title: "Completed",
            value: "5",
            color: "green",
            iconPath:
              "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
          },
          {
            title: "In Progress",
            value: "3",
            color: "yellow",
            iconPath:
              "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
          },
          {
            title: "My Rating",
            value: "★★★★☆",
            color: "purple",
            iconPath:
              "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
          },
        ].map((card, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{card.title}</p>
                <h3
                  className={`text-3xl font-bold text-${card.color}-600 mt-1`}
                >
                  {card.title === "My Rating" ? (
                    <span className="text-yellow-500">{card.value}</span>
                  ) : (
                    card.value
                  )}
                </h3>
                {card.title === "My Rating" && (
                  <p className="text-sm text-gray-600 mt-1">4.2/5.0</p>
                )}
              </div>
              <div className={`bg-${card.color}-100 p-3 rounded-full`}>
                <svg
                  className={`w-8 h-8 text-${card.color}-600`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={card.iconPath}
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Complaints Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            My Assigned Complaints
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "ID",
                  "Student Details",
                  "Room",
                  "Issue",
                  "Priority",
                  "Status",
                  "Action",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {[
                {
                  id: "#001",
                  name: "AJMEERA RAHUL",
                  studentId: "30432",
                  roll: "BT23CSE033",
                  room: "S-34",
                  issue: "Fan not working",
                  priority: { text: "High", color: "red" },
                  status: { text: "Resolved", color: "green" },
                  action: "Completed",
                },
                {
                  id: "#005",
                  name: "GHOKSHE TARKESH PRABHAKAR",
                  studentId: "31456",
                  roll: "BT23CSE086",
                  room: "S-73",
                  issue: "Light flickering",
                  priority: { text: "Medium", color: "yellow" },
                  status: { text: "In Progress", color: "yellow" },
                  action: "Update",
                },
                {
                  id: "#007",
                  name: "VIVEK KUMAR",
                  studentId: "30912",
                  roll: "BT23CSE081",
                  room: "S-21",
                  issue: "Tube light not working",
                  priority: { text: "Low", color: "green" },
                  status: { text: "Pending", color: "red" },
                  action: "Update",
                },
              ].map((c, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {c.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {c.name}
                    </div>
                    <div className="text-sm text-gray-500">ID: {c.studentId}</div>
                    <div className="text-sm text-gray-500">{c.roll}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {c.room}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{c.issue}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${c.priority.color}-100 text-${c.priority.color}-800`}
                    >
                      {c.priority.text}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-sm font-semibold text-${c.status.color}-600`}
                    >
                      {c.status.text}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {c.action === "Update" ? (
                      <button className="text-blue-600 hover:text-blue-900 font-medium">
                        Update
                      </button>
                    ) : (
                      <span className="text-gray-400">{c.action}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default WorkerDashboard;
