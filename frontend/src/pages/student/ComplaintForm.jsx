// src/components/ComplaintForm.jsx
import React, { useState, useRef, useMemo, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) || "http://localhost:5000";

const MAX_IMAGES = 5;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_AUDIO_SIZE = 12 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const ALLOWED_AUDIO_TYPES = ["audio/mpeg", "audio/mp3", "audio/wav", "audio/ogg", "audio/webm"];

function nextNDates(n) {
  const days = [];
  const now = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    days.push(d);
  }
  return days;
}
function formatDateShort(d) {
  try {
    return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  } catch (e) {
    return d.toDateString();
  }
}

export default function ComplaintForm() {
  const navigate = useNavigate();

  // form fields
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [hostel, setHostel] = useState("V.G. Bhide");
  const [room, setRoom] = useState("");
  const [category, setCategory] = useState("Electrical");

  // files & recording
  const [images, setImages] = useState([]); // File[]
  const [imageUrls, setImageUrls] = useState([]); // object URLs for previews
  const [audioFile, setAudioFile] = useState(null); // File
  const [recording, setRecording] = useState(false);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);

  // availability: single time slot for entire week
  const days = useMemo(() => nextNDates(5), []);
  const [availStart, setAvailStart] = useState("09:00");
  const [availEnd, setAvailEnd] = useState("11:00");

  // upload state
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // hidden inputs refs
  const imagesInputRef = useRef(null);
  const audioInputRef = useRef(null);

  // cleanup created object URLs on unmount or when images change
  useEffect(() => {
    return () => {
      imageUrls.forEach((u) => {
        try {
          URL.revokeObjectURL(u);
        } catch (e) {
          // ignore
        }
      });
    };
  }, [imageUrls]);

  // validation helpers
  const validateImage = (file) => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) return "Unsupported image format";
    if (file.size > MAX_IMAGE_SIZE) return `Image too large (max ${MAX_IMAGE_SIZE / (1024 * 1024)}MB)`;
    return null;
  };
  const validateAudio = (file) => {
    if (!ALLOWED_AUDIO_TYPES.includes(file.type)) return "Unsupported audio format";
    if (file.size > MAX_AUDIO_SIZE) return `Audio too large (max ${MAX_AUDIO_SIZE / (1024 * 1024)}MB)`;
    return null;
  };

  // file pickers
  const openImagesPicker = () => imagesInputRef.current?.click();
  const openAudioPicker = () => audioInputRef.current?.click();

  const handleImagesChange = (e) => {
    try {
      const chosen = Array.from(e.target.files || []);
      if (chosen.length === 0) return;
      for (const f of chosen) {
        const err = validateImage(f);
        if (err) {
          toast.error(err);
          return;
        }
      }
      const combined = [...images, ...chosen].slice(0, MAX_IMAGES);
      setImages(combined);

      // revoke old urls then set new
      imageUrls.forEach((u) => {
        try {
          URL.revokeObjectURL(u);
        } catch {}
      });
      const urls = combined.map((f) => {
        try {
          return URL.createObjectURL(f);
        } catch (err) {
          console.error("URL.createObjectURL failed:", err);
          return "";
        }
      });
      setImageUrls(urls);
    } catch (err) {
      console.error("handleImagesChange error:", err);
      toast.error("Failed to process images");
    } finally {
      // reset input so selecting same file again triggers change
      if (imagesInputRef.current) imagesInputRef.current.value = "";
    }
  };

  const removeImage = (idx) => {
    try {
      setImages((prev) => {
        const next = prev.filter((_, i) => i !== idx);
        // rebuild urls safely
        imageUrls.forEach((u) => {
          try {
            URL.revokeObjectURL(u);
          } catch {}
        });
        const newUrls = next.map((f) => {
          try {
            return URL.createObjectURL(f);
          } catch {
            return "";
          }
        });
        setImageUrls(newUrls);
        return next;
      });
    } catch (err) {
      console.error("removeImage error:", err);
    }
  };

  const handleAudioChange = (e) => {
    try {
      const f = e.target.files?.[0];
      if (!f) return;
      const err = validateAudio(f);
      if (err) return toast.error(err);
      setAudioFile(f);
    } catch (err) {
      console.error("handleAudioChange error:", err);
      toast.error("Failed to load audio");
    } finally {
      if (audioInputRef.current) audioInputRef.current.value = "";
    }
  };

  const removeAudio = () => setAudioFile(null);

  // recording
  const startRecording = async () => {
    if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      return toast.error("Recording not supported in this browser");
    }
    if (typeof window.MediaRecorder === "undefined") {
      return toast.error("MediaRecorder not available in this browser");
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      recorderRef.current = mr;
      chunksRef.current = [];
      mr.ondataavailable = (ev) => chunksRef.current.push(ev.data);
      mr.onstop = () => {
        try {
          const blob = new Blob(chunksRef.current, { type: "audio/webm" });
          const file = new File([blob], `recording-${Date.now()}.webm`, { type: "audio/webm" });
          const err = validateAudio(file);
          if (err) toast.error(err);
          else setAudioFile(file);
        } catch (err) {
          console.error("recording onstop error:", err);
          toast.error("Recording failed");
        } finally {
          try {
            stream.getTracks().forEach((t) => t.stop());
          } catch {}
        }
      };
      mr.start();
      setRecording(true);
    } catch (err) {
      console.error("startRecording error:", err);
      toast.error("Could not access microphone");
    }
  };
  const stopRecording = () => {
    try {
      if (recorderRef.current && recorderRef.current.state !== "inactive") recorderRef.current.stop();
    } catch (err) {
      console.error("stopRecording error:", err);
    } finally {
      setRecording(false);
    }
  };

  // submit form: build availability array using single slot for all days
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!subject.trim() || !description.trim() || !room.trim()) return toast.error("Please fill required fields");
      if (!availStart || !availEnd) return toast.error("Please select availability start and end time");
      if (availStart >= availEnd) return toast.error("Start time must be earlier than end time");

      const availabilityArray = days.map((d) => ({
        date: d.toISOString().slice(0, 10),
        slots: [{ start: availStart, end: availEnd }],
      }));

      const fd = new FormData();
      fd.append("subject", subject);
      fd.append("description", description);
      fd.append("Hostel_Name", hostel);
      fd.append("Room_Number", room);
      fd.append("category", category);
      images.forEach((f) => fd.append("attachments", f));
      if (audioFile) fd.append("attachments", audioFile);
      fd.append("availability", JSON.stringify(availabilityArray));

      setLoading(true);
      setProgress(0);
      await axios.post(`${API}/api/complaints`, fd, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (p) => {
          const pct = Math.round((p.loaded * 100) / (p.total || 1));
          setProgress(pct);
        },
      });
      toast.success("Complaint submitted");
      navigate(-1);
    } catch (err) {
      console.error("submit error:", err);
      toast.error(err?.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-50 py-10 relative">
      <ToastContainer />

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow relative">
        {/* ❌ Close Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition text-xl font-bold"
          title="Go back"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-3">Complaint Form</h2>
        <p className="text-sm text-gray-500 mb-4">
          Please fill out the form below to submit your complaint.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Subject *</label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-sky-300 outline-none"
              placeholder="e.g. Fan not working"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-sky-300 outline-none"
              placeholder="Describe the issue..."
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700">Hostel</label>
              <select value={hostel} onChange={(e) => setHostel(e.target.value)} className="w-full mt-2 p-2 border rounded-md">
                <option>V.G. Bhide</option>
                <option>M.S. Swaminathan</option>
                <option>Anandibai Joshi</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Room Number *</label>
              <input value={room} onChange={(e) => setRoom(e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="e.g. B-203" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full mt-2 p-2 border rounded-md">
              <option>Electrical</option>
              <option>Maintenance</option>
              <option>Technical</option>
            </select>
          </div>

          {/* Photos */}
          <div>
            <label className="text-sm font-medium text-gray-700">Photos (max {MAX_IMAGES})</label>
            <div className="mt-2 flex items-center gap-3">
              <button type="button" onClick={openImagesPicker} className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-4 py-2 rounded-full shadow">📷 Upload Photos</button>
              <div className="text-sm text-gray-500">Max {MAX_IMAGES} images · {MAX_IMAGE_SIZE / (1024 * 1024)}MB each</div>
            </div>
            <input ref={imagesInputRef} onChange={handleImagesChange} type="file" accept="image/*" multiple className="hidden" />
            {imageUrls.length > 0 && (
              <div className="mt-3 flex gap-2 flex-wrap">
                {imageUrls.map((u, i) => (
                  <div key={i} className="relative">
                    {u ? <img src={u} alt={`preview-${i}`} className="w-24 h-24 object-cover rounded-md border" /> : <div className="w-24 h-24 bg-gray-100 rounded-md" />}
                    <button type="button" onClick={() => removeImage(i)} className="absolute -top-2 -right-2 bg-white border rounded-full p-1 shadow text-sm">✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Audio */}
          <div>
            <label className="text-sm font-medium text-gray-700">Audio (optional)</label>
            <div className="mt-2 flex items-center gap-2">
              <button type="button" onClick={openAudioPicker} className="bg-white border px-3 py-2 rounded-md">Attach Audio</button>
              {!recording ? <button type="button" onClick={startRecording} className="px-3 py-2 bg-indigo-600 text-white rounded-md">Record</button> : <button type="button" onClick={stopRecording} className="px-3 py-2 bg-red-500 text-white rounded-md">Stop</button>}
              <div className="text-sm text-gray-500">Attach a short voice note (optional)</div>
            </div>
            <input ref={audioInputRef} onChange={handleAudioChange} type="file" accept="audio/*" className="hidden" />
            {audioFile && (
              <div className="mt-3 flex items-center gap-3">
                <audio controls src={audioFile ? URL.createObjectURL(audioFile) : undefined} />
                <div className="text-sm text-gray-600">{audioFile.name} • {(audioFile.size / (1024 * 1024)).toFixed(2)} MB</div>
                <button type="button" onClick={removeAudio} className="ml-auto text-sm text-red-500">Remove</button>
              </div>
            )}
          </div>

          {/* Single availability slot for entire week */}
          <div>
            <label className="text-sm font-medium text-gray-700">Pick one time you'll be available for the next five days</label>
            <p className="text-xs text-gray-500 mt-1">This single time range will be applied to each of the next five calendar days:</p>
            <div className="mt-2 flex gap-3 items-center">
              <div className="text-sm text-gray-700">From</div>
              <input type="time" value={availStart} onChange={(e) => setAvailStart(e.target.value)} className="p-2 border rounded-md" />
              <div className="text-sm text-gray-700">To</div>
              <input type="time" value={availEnd} onChange={(e) => setAvailEnd(e.target.value)} className="p-2 border rounded-md" />
            </div>

            <div className="mt-3 text-sm text-gray-600">
              {days.map((d, i) => (
                <div key={i}>{formatDateShort(d)} — {availStart} to {availEnd}</div>
              ))}
            </div>
          </div>

          {loading && <div className="w-full bg-gray-100 h-2 rounded overflow-hidden"><div className="h-full bg-sky-500" style={{ width: `${progress}%` }} /></div>}

          <div className="flex justify-end">
            <button type="submit" disabled={loading} className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:scale-105 transition disabled:opacity-60">
              {loading ? `Uploading ${progress}%` : "Submit Complaint"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
