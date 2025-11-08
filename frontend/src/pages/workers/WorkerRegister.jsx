import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function WorkerRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    worker_id: '',
    name: '',
    password: '',
    confirmPassword: '',
    role: '',
    contact_Number: '',
    profilePic: '',
  });
  const [loading, setLoading] = useState(false);

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
      const { confirmPassword, ...dataToSend } = formData;
      
      // TODO: Replace with actual API endpoint
      const response = await axios.post('/api/worker/register', dataToSend);
      
      if (response.data.success) {
        toast.success('Registration successful! Please login.');
        navigate('/login/worker');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden my-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white text-center">
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
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">Worker Registration</h1>
          <p className="text-purple-100">Join as a worker in the Hostel Grievance System</p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="p-8">
          {/* Worker ID */}
          <div className="mb-6">
            <label
              htmlFor="worker_id"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Worker ID
            </label>
            <input
              id="worker_id"
              name="worker_id"
              type="text"
              placeholder="Enter your worker ID"
              value={formData.worker_id}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
          </div>

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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
          </div>

          {/* Role */}
          <div className="mb-6">
            <label
              htmlFor="role"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Role/Department
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            >
              <option value="">Select your role/department</option>
              <option value="Electrical">Electrical</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Carpentry">Carpentry</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Security">Security</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Profile Picture URL (Optional) */}
          <div className="mb-6">
            <label
              htmlFor="profilePic"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Profile Picture URL (Optional)
            </label>
            <input
              id="profilePic"
              name="profilePic"
              type="url"
              placeholder="Enter profile picture URL"
              value={formData.profilePic}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

          {/* Login Redirect */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login/worker"
                className="text-purple-600 hover:text-purple-800 font-semibold"
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

export default WorkerRegister;

