import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function StudentRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    student_id: '',
    Hostel_Name: '',
    Room_Number: '',
    contact_Number: '',
    profilePic: null,
  });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      setLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long!');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...rest } = formData;

      // Create FormData for sending files + text
      const dataToSend = new FormData();

      // Append all non-file fields
      Object.keys(rest).forEach((key) => {
        if (key !== "profilePic") {
          dataToSend.append(key, rest[key]);
        }
      });

      // Append file only if selected
      if (rest.profilePic) {
        dataToSend.append("profilePic", rest.profilePic);
      }

      // API call
      const response = await axios.post('/api/student/register', dataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success('Registration successful! Please login.');
        navigate('/login/student');
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden my-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white text-center">
          <div className="mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14l9-5-9-5-9 5 9 5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">Student Registration</h1>
          <p className="text-blue-100">Join as a student in the Hostel Grievance System</p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="p-8">
          {/* Name */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Student ID */}
          <div className="mb-6">
            <label
              htmlFor="student_id"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Student ID
            </label>
            <input
              id="student_id"
              name="student_id"
              type="text"
              placeholder="Enter your student ID"
              value={formData.student_id}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your college email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Hostel Name & Room Number */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="Hostel_Name"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Hostel Name
              </label>
              <select
                id="Hostel_Name"
                name="Hostel_Name"
                value={formData.Hostel_Name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                <option value="">Select hostel</option>
                <option value="Hostel A">Hostel A</option>
                <option value="Hostel B">Hostel B</option>
                <option value="Hostel C">Hostel C</option>
                <option value="Hostel D">Hostel D</option>
                <option value="Hostel E">Hostel E</option>
                <option value="Hostel F">Hostel F</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="Room_Number"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Room Number
              </label>
              <input
                id="Room_Number"
                name="Room_Number"
                type="text"
                placeholder="Enter room number"
                value={formData.Room_Number}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Contact Number */}
          <div className="mb-6">
            <label
              htmlFor="contact_Number"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Contact Number
            </label>
            <input
              id="contact_Number"
              name="contact_Number"
              type="tel"
              placeholder="Enter your contact number"
              value={formData.contact_Number}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Profile Picture Upload (Optional) */}
          <div className="mb-6">
            <label
              htmlFor="profilePic"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Profile Picture (Optional)
            </label>

            {/* File Input */}
            <input
              id="profilePic"
              name="profilePic"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setFormData({
                  ...formData,
                  profilePic: file, // store File object instead of URL
                });

                // Show preview
                if (file) {
                  const previewURL = URL.createObjectURL(file);
                  setPreview(previewURL);
                }
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:border-transparent transition bg-white"
            />

            {/* Preview Selected Image */}
            {preview && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-1">Preview:</p>
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="w-24 h-24 object-cover rounded-full border"
                />
              </div>
            )}
          </div>


          {/* Password Fields */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

          {/* Login Redirect */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login/student"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Login here
              </Link>
            </p>
          </div>

          {/* Back to Role Selection */}
          <div className="mt-4 text-center">
            <Link
              to="/"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Back to Role Selection
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentRegister;
