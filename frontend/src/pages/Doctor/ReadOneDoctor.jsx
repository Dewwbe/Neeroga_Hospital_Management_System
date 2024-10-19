import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';

const ShowDoctor = () => {
  const [doctor, setDoctor] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/doctors/${id}`)
      .then((response) => {
        setDoctor(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className='p-4'>
      <BackButton destination='/doctors/alldoctors' />
      <h1 className='text-3xl my-4'>Show Doctor</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Doctor ID</span>
            <span>{doctor.DoctorID}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Name</span>
            <span>{doctor.Name}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Contact Number</span>
            <span>{doctor.ContactNo}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Email</span>
            <span>{doctor.Email}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Address</span>
            <span>{doctor.Address}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Basic Salary</span>
            <span>{doctor.BasicSalary}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Description</span>
            <span>{doctor.Description}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Password</span>
            <span>{doctor.Password}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Working Hospitals</span>
            <ul>
              {doctor.WorkingHospitals && doctor.WorkingHospitals.length > 0 ? (
                doctor.WorkingHospitals.map((hospital, index) => (
                  <li key={index}>
                    <strong>Hospital Name:</strong> {hospital.HospitalName}, <strong>Address:</strong> {hospital.HospitalAddress}
                  </li>
                ))
              ) : (
                <span>No working hospitals listed.</span>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowDoctor;
