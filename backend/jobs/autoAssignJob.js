import cron from "node-cron";
import { assignComplaintsFIFO } from "../controllers/hostelAdminController.js";

// Schedule to run every night at 11:00 PM
cron.schedule("0 23 * * *", async () => {
  console.log("🕐 Running nightly complaint assignment job...");

  try {
    await assignComplaintsFIFO();
    console.log("✅ Nightly assignment completed successfully.");
  } catch (error) {
    console.error("❌ Error in nightly assignment job:", error);
  }
});

console.log("⏳ Auto-assignment job initialized...");
