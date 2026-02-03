const Appointment = require("../models/Appointment");
const User = require("../models/User");

// PATIENT: Book Appointment
const bookAppointment = async (req, res) => {
  try {
    const { doctorId, appointmentDate } = req.body;

    if (!doctorId || !appointmentDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Only patient can book
    if (req.user.role !== "patient") {
      return res.status(403).json({ message: "Only patients can book appointments" });
    }

    // Check doctor exists
    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor: doctorId,
      appointmentDate
    });

    return res.status(201).json({
      message: "Appointment booked",
      appointment
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};


// PATIENT: Get My Appointments

const getMyAppointments = async (req, res) => {
  try {
    if (req.user.role !== "patient") {
      return res.status(403).json({ message: "Access denied" });
    }

    const appointments = await Appointment.find({
      patient: req.user._id
    }).populate("doctor", "name specialization");

    return res.status(200).json(appointments);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// PATIENT: Cancel Appointment

const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      patient: req.user._id  
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Only allow cancelling pending appointments
    if (appointment.status !== "pending") {
      return res.status(400).json({ message: "Cannot cancel this appointment" });
    }

    appointment.status = "cancelled";
    await appointment.save();

    res.status(200).json({
      message: "Appointment cancelled",
      appointment
    });

  } catch (error) {
    console.error("Cancel error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// DOCTOR: Get Appointments

const getDoctorAppointments = async (req, res) => {
  try {
    if (req.user.role !== "doctor") {
      return res.status(403).json({ message: "Access denied" });
    }

    const appointments = await Appointment.find({
      doctor: req.user._id
    }).populate("patient", "name email");

    return res.status(200).json(appointments);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};


// DOCTOR: Approve / Reject

const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (req.user.role !== "doctor") {
      return res.status(403).json({ message: "Only doctors can update status" });
    }

    if (!["approved", "rejected","completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.doctor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    appointment.status = status;
    await appointment.save();

    return res.status(200).json({
      message: "Appointment status updated",
      appointment
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  bookAppointment,
  getMyAppointments,
  cancelAppointment,
  getDoctorAppointments,
  updateAppointmentStatus
};

