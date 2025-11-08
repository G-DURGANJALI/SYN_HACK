import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function AdminRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    Hostel_Name: '',
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
    <div className="bg-gradient-to-br from-indigo-50 to-purple-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden my-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white text-center">
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
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">Admin Registration</h1>
          <p className="text-indigo-100">Join as an admin in the Hostel Grievance System</p>
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
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
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>

          {/* Hostel Name */}
          <div className="mb-6">
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

          {/* Login Redirect */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                to="/hostel-admin/login"
                className="text-indigo-600 hover:text-indigo-800 font-semibold"
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

export default AdminRegister;

