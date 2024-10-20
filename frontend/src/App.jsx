import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Home.jsx'; // Update the import statement
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import Profile from './components/Profile.jsx';
import CreateAppointment from './pages/Appointment/CreateAppointment.jsx';
import Payment from './pages/Appointment/payment.jsx';
import DoctorRegister from './pages/Appointment/doctor.jsx';
import DoctorDetails from './pages/Appointment/doctordetails.jsx';
import AllAppointments from './pages/Appointment/AllApointments.jsx';
import Navbar from './components/Navbar.jsx';

import StockReport from './pages/dataAnalysis/stockreport.jsx';
import AddStocks from './pages/dataAnalysis/AddStocks.jsx';
import DoctorsReport from './pages/dataAnalysis/DoctorsReport.jsx'; // Only keep this one
import AdminDash from './pages/dataAnalysis/AdminDash.jsx';
import AdminDashboard from './pages/AdminDashBoard.jsx';

import DoctorCards from './pages/Doctor/DoctorCards.jsx';
import SpecializationCard from './pages/Doctor/SpecializationCard';
import ShowAllDoctors from './pages/Doctor/ShowAllDoctors';
import ReadOneDoctor from './pages/Doctor/ReadOneDoctor';
import CreateDoctor from './pages/Doctor/CreateDoctor';
import EditDoctor from './pages/Doctor/EditDoctor';
import DeleteDoctor from './pages/Doctor/DeleteDoctor';
import DoctorLogin from './components/DoctorLogin';
import ReadOneHome from './pages/Doctor/ReadOneHome';

import CreateDoctorSchedule from './pages/DoctorShedule/CreateDoctorShedule.jsx';
import DeletedoctorShedule from './pages/DoctorShedule/DeleteDoctorShedule.jsx';
import EditDoctorSchedule from './pages/DoctorShedule/EditDoctorShedule.jsx';
import ReadOneDoctorShedule from './pages/DoctorShedule/ReadOneDoctorShedule';
import ShowAllDoctorsShedule from './pages/DoctorShedule/ShowAllDoctorsShedule';

import MyAppoitments from './pages/Doctor/MyAppointments.jsx';
import MyShedule from './pages/Doctor/MyShedule';

import CreateHospital from './pages/Hospital/CreateHospital.jsx';
import DeleteHospital from './pages/Hospital/DeleteHospital.jsx';
import EditHospital from './pages/Hospital/EditHospital.jsx';
import ReadOneHospital from './pages/Hospital/ReadOneHospital';
import ShowAllHospital from './pages/Hospital/ShowAllHospital';

import AppointmentsTable from './pages/Appointment/AllAppointmentTable.jsx';



const App = () => {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Navbar user={user} />
      <Routes>
        <Route path='/' element={<HomePage user={user} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/stockreport" element={<StockReport />} />
        <Route path="/addstock" element={<AddStocks />} />
        <Route path="/doctoreport" element={<DoctorsReport />} />
        <Route path="/admindash" element={<AdminDash />} />

        {/* Doctor Routes */}
        <Route path='/doctors/cards' element={<DoctorCards />} />
        <Route path='/SpecializationCard' element={<SpecializationCard />} />
        <Route path='/doctors/alldoctors' element={<ShowAllDoctors />} />
        <Route path='/doctors/details/:id' element={<ReadOneDoctor />} />
        <Route path='/doctors/create' element={<CreateDoctor />} />
        <Route path='/doctors/edit/:id' element={<EditDoctor />} />
        <Route path='/doctors/delete/:id' element={<DeleteDoctor />} />
        <Route path='/doctorlogin' element={<DoctorLogin />} />
        <Route path="/docHome/:id" element={<ReadOneHome />} />

        
        <Route path='/doctorShedules/alldoctorShedules' element={<ShowAllDoctorsShedule/>} />
        <Route path='/doctorShedules/create' element={<CreateDoctorSchedule/>} />
        <Route path='/doctorShedules/details/:id' element={<ReadOneDoctorShedule />} />
        <Route path='/doctorShedules/edit/:id' element={<EditDoctorSchedule />} />
        <Route path='/doctorShedules/delete/:id' element={<DeletedoctorShedule/>} />

        <Route path='/myAppointments/:id' element={<MyAppoitments/>} />
        <Route path='/myShedule/:doctorId' element={<MyShedule/>} />

        <Route path='/Hospital/allHospital' element={<ShowAllHospital/>} />
        <Route path='/Hospital/create' element={<CreateHospital/>} />
        <Route path='/Hospital/details/:id' element={<ReadOneHospital />} />
        <Route path='/Hospital/edit/:id' element={<EditHospital />} />
        <Route path='/Hospital/delete/:id' element={<DeleteHospital/>} />

        <Route path="/appointments" element={<CreateAppointment />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/register" element={<DoctorRegister />} />
        <Route path="/doctors" element={<DoctorDetails />} />
        <Route path="/all" element={<AllAppointments />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/AppointmentsTable" element={<AppointmentsTable />} />

       
      </Routes>
    </BrowserRouter>
  );
};

export default App;
