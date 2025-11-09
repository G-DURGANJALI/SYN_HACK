// src/components/SurveyForm.jsx
import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SurveyForm() {
  const { complaintId } = useParams();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [items, setItems] = useState([""]);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const fileInputRef = useRef(null);
  const api = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const handlePhotoClick = () => fileInputRef.current?.click();
  const onPhotos = (e) => setPhotos(Array.from(e.target.files).slice(0, 5));
  const addItem = () => setItems((prev) => [...prev, ""]);
  const setItem = (i, v) => setItems((prev) => prev.map((p, idx) => (idx === i ? v : p)));

  const submit = async () => {
    if (photos.length === 0) return toast.error("Please upload completion photos");
    if (rating === 0) return toast.error("Please rate the worker");
    const fd = new FormData();
    fd.append("complaintId", complaintId);
    photos.forEach((p) => fd.append("photos", p));
    fd.append("items", JSON.stringify(items.filter((i) => i.trim())));
    fd.append("feedback", feedback);
    fd.append("rating", rating);
    try {
      await axios.post(`${api}/api/complaints/${complaintId}/survey`, fd, { withCredentials: true });
      toast.success("Survey submitted successfully");
      navigate("/"); // Redirect after success
    } catch (e) {
      console.error(e);
      toast.error("Survey submission failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-10 px-4">
      <ToastContainer />
      <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg border border-gray-100 relative">
        {/* ❌ Cross Button */}
        <button
          onClick={() => navigate(-1)} // go back to previous page
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl font-bold transition"
          title="Go back"
        >
          ✕
        </button>

        <h3 className="text-2xl font-bold mb-2 text-gray-800">Completion Survey</h3>
        <p className="text-sm text-gray-500 mb-4">
          Upload completion photos, list items used, give feedback, and rate the worker’s performance.
        </p>

        {/* Upload Photos Section */}
        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700">Completion Photos</label>
          <div className="mt-3">
            <button
              onClick={handlePhotoClick}
              className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-5 py-2 rounded-full text-sm font-semibold shadow transition duration-200 hover:shadow-md"
            >
              📷 Upload Photos
            </button>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={onPhotos}
              ref={fileInputRef}
              className="hidden"
            />
          </div>

          {/* Photo Previews */}
          {photos.length > 0 && (
            <div className="mt-3 flex gap-2 flex-wrap">
              {photos.map((p, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(p)}
                  alt="preview"
                  className="w-20 h-20 object-cover rounded-xl border border-blue-100 shadow-sm"
                />
              ))}
            </div>
          )}
        </div>

        {/* Items Used Section */}
        <div className="mt-5">
          <label className="text-sm font-medium text-gray-700">Items Used</label>
          {items.map((it, i) => (
            <input
              key={i}
              value={it}
              onChange={(e) => setItem(i, e.target.value)}
              placeholder={`Item ${i + 1}`}
              className="w-full mt-2 p-2 border rounded-lg focus:ring-2 focus:ring-sky-400 outline-none"
            />
          ))}
          <button
            onClick={addItem}
            className="mt-2 text-sm text-sky-600 font-medium hover:underline"
          >
            + Add another item
          </button>
        </div>

        {/* Feedback Section */}
        <div className="mt-5">
          <label className="text-sm font-medium text-gray-700">Feedback</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={3}
            placeholder="Write your feedback for the worker..."
            className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Rating Section */}
        <div className="mt-5">
          <label className="text-sm font-medium text-gray-700">Rate the Worker</label>
          <div className="flex mt-2 gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-3xl ${
                  rating >= star ? "text-yellow-400" : "text-gray-300"
                } transition-transform transform hover:scale-110`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={() => navigate(-1)} // Same as cancel
            className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 font-medium hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold shadow hover:from-sky-600 hover:to-blue-700 hover:shadow-lg transform hover:scale-105 transition"
          >
            Submit Survey
          </button>
        </div>
      </div>
    </div>
  );
}
