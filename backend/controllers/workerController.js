import Worker from "../models/Worker.js";

export const setAvailability = async (req, res) => {
  try {
    const { date, timeSlots } = req.body;

    if (!date || !timeSlots || timeSlots.length === 0)
      return res.status(400).json({ message: "Date and time slots required" });

    const worker = await Worker.findById(req.worker._id);
    if (!worker) return res.status(404).json({ message: "Worker not found" });

    // Remove any old availability for the same date
    worker.availability = worker.availability.filter(
      (slot) => new Date(slot.date).toDateString() !== new Date(date).toDateString()
    );

    // Add new availability
    timeSlots.forEach((slot) =>
      worker.availability.push({ date: new Date(date), timeSlot: slot })
    );

    await worker.save();
    res.status(200).json({ message: "Availability updated successfully", availability: worker.availability });
  } catch (error) {
    console.error("setAvailability error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAvailability = async (req, res) => {
  try {
    const worker = await Worker.findById(req.worker._id);
    if (!worker) return res.status(404).json({ message: "Worker not found" });
    res.status(200).json({ availability: worker.availability });
  } catch (error) {
    console.error("getAvailability error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
