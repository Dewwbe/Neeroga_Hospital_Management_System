import express from 'express';
import { DoctorShedule } from '../models/DoctorShedule.js'; // Assuming the model is in this path

const router = express.Router();

// Route to create a new Doctor Schedule
router.post('/', async (req, res) => {
  try {
    const { DoctorID, DoctorName, Specialization, Date, TimeSlots,AppointmentFee, MaxAppointments, Location } = req.body;

    // Validate required fields
    if (
      !DoctorID || 
      !DoctorName || 
      !Specialization || 
      !Date || 
      !TimeSlots || 
      !AppointmentFee||
      !MaxAppointments || 
      !Location
    ) {
      return res.status(400).send({ message: 'Send all required fields: DoctorID, DoctorName, Specialization, Date, TimeSlots, MaxAppointments, Location' });
    }

    const newShedule = {
      DoctorID,
      DoctorName,
      Specialization,
      Date,
      TimeSlots,
      AppointmentFee,
      MaxAppointments,
      Location,
    };

    const createdShedule = await DoctorShedule.create(newShedule);
    return res.status(201).send(createdShedule);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to get all Doctor Schedules
router.get('/', async (req, res) => {
  try {
    const schedules = await DoctorShedule.find({});
    return res.status(200).json({
      count: schedules.length,
      data: schedules,
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to get a Doctor Schedule by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = await DoctorShedule.findById(id);

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    return res.status(200).json(schedule);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to update a Doctor Schedule by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSchedule = await DoctorShedule.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedSchedule) {
      return res.status(404).send({ message: 'Schedule not found' });
    }

    res.status(200).send(updatedSchedule);
  } catch (error) {
    console.error('Error updating schedule:', error.message);
    res.status(500).send({ message: 'Server error' });
  }
});

// Route to delete a Doctor Schedule by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await DoctorShedule.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    return res.status(200).send({ message: 'Schedule deleted successfully' });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send({ message: error.message });
  }
});

// Example route definition
router.get('/appointment-fee/:DoctorID', async (req, res) => {
  try {
      const { DoctorID } = req.params; // Ensure the parameter name matches the route
      const schedule = await DoctorShedule.findOne({ DoctorID }); // Use the variable directly

      if (!schedule) {
          return res.status(404).json({ message: 'Schedule not found for this DoctorID' });
      }

      return res.status(200).json({ fee: schedule.AppointmentFee });
  } catch (error) {
      console.error('Error fetching appointment fee:', error.message);
      res.status(500).send({ message: error.message });
  }
});




router.get('/doctors/:doctorId', async (req, res) => {
  try {
      console.log('Received request for doctor ID:', req.params.doctorId); // Log the doctorId received

      // Query by DoctorID, not by the default _id
      const doctor = await DoctorShedule.findOne({ DoctorID: req.params.doctorId });

      if (!doctor) {
          console.log('Doctor not found for ID:', req.params.doctorId); // Log if doctor is not found
          return res.status(404).json({ message: 'Doctor not found' });
      }

      // Log the found doctor details (excluding sensitive information if any)
      console.log('Doctor found:', doctor); // Log the doctor object

      // Return only the name of the doctor
      res.json({ Name: doctor.Name });
  } catch (error) {
      console.error('Error fetching doctor details:', error); // Log the error for debugging
      res.status(500).json({ message: 'Server error' });
  }
});





export default router;
