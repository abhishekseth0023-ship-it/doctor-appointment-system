const express = require("express");
const router = express.Router();

const {
  bookAppointment,
  getMyAppointments,
  cancelAppointment,
  getDoctorAppointments,
  updateAppointmentStatus
} = require("../controllers/appointmentController");

const authMiddleware = require("../middleware/authMiddleware");

// Patient routes
router.post("/book", authMiddleware, bookAppointment);
router.get("/my", authMiddleware, getMyAppointments);
router.put("/cancel/:id", authMiddleware, cancelAppointment);

// Doctor routes
router.get("/doctor", authMiddleware, getDoctorAppointments);
router.put("/:id/status", authMiddleware, updateAppointmentStatus);

module.exports = router;
