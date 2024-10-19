import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from "../../components/Spinner";
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const ShowDoctor = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:5000/doctors'); // Adjust API endpoint if needed
                if (response.data && Array.isArray(response.data.data)) {
                    setDoctors(response.data.data); // Access the array of doctors here
                } else {
                    console.error("Invalid data format:", response.data);
                }
            } catch (error) {
                console.error("Error fetching doctors:", error);
                setError("Failed to fetch doctors.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchDoctors();
    }, []);
    
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const filteredDoctors = doctors.filter(doctor =>
        Object.values(doctor).some(value =>
            value.toString().toLowerCase().includes(searchQuery)
        )
    );

    return (
        <div className='p-6 bg-gray-100 min-h-screen'>
            <li>
                <Link to="/" className="text-green-800 hover:text-green-600">Home</Link>
            </li>
            <h1 className="show-Doctors-title text-3xl my-4 text-green-800">Doctor's List</h1>
            <div className='flex flex-col md:flex-row justify-between items-center mb-6'>
                <label htmlFor="search" className="sr-only">Search doctors</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Search doctors..."
                    className='text-lg my-4 p-2 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                    onChange={handleSearchChange}
                />
                <div className="flex items-center space-x-4">
                    <Link to='/doctors/create' className="flex items-center">
                        <MdOutlineAddBox className='text-green-800 text-4xl' />
                    </Link>
                </div>
            </div>

            {loading ? (
                <Spinner />
            ) : error ? (
                <div className="text-red-600">{error}</div>
            ) : (
                <table className='w-full border border-green-500 rounded-lg bg-white'>
                    <thead>
                        <tr className='bg-green-100'>
                            <th className='p-4 border border-green-300'>Doctor ID</th>
                            <th className='p-4 border border-green-300'>Doctor Name</th>
                            <th className='p-4 border border-green-300'>Specialization</th>
                            <th className='p-4 border border-green-300'>Contact No</th>
                            <th className='p-4 border border-green-300'>Email</th>
                            <th className='p-4 border border-green-300'>Address</th>
                            <th className='p-4 border border-green-300'>BasicSalary</th>
                            <th className='p-4 border border-green-300'>Description</th>
                            <th className='p-4 border border-green-300'>Password</th>

                            <th className='p-4 border border-green-300'>Working Hospitals</th> {/* New header */}
                            <th className='p-4 border border-green-300'>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDoctors.map((doctor) => (
                            <tr key={doctor._id} className='text-center bg-white even:bg-green-50'>
                                <td className='p-4 border border-green-300'>{doctor.DoctorID}</td>
                                <td className='p-4 border border-green-300'>{doctor.Name}</td>
                                <td className='p-4 border border-green-300'>{doctor.Specialization}</td>
                                <td className='p-4 border border-green-300'>{doctor.ContactNo}</td>
                                <td className='p-4 border border-green-300'>{doctor.Email}</td>
                                <td className='p-4 border border-green-300'>{doctor.Address}</td>
                                <td className='p-4 border border-green-300'>{doctor.BasicSalary}</td>
                                <td className='p-4 border border-green-300'>{doctor.Description}</td>
                                <td className='p-4 border border-green-300'>{doctor.Password}</td>
                                <td className='p-4 border border-green-300'>
                                    {doctor.WorkingHospitals.map(hospital => 
                                        `${hospital.HospitalName} (${hospital.HospitalAddress})`
                                    ).join(', ')}
                                </td>
                                <td className='p-4 border border-green-300'>
                                    <div className='flex justify-center gap-4'>
                                        <Link to={`/doctors/details/${doctor._id}`}>
                                            <BsInfoCircle className='text-2xl text-green-800 hover:text-green-600' />
                                        </Link>
                                        <Link to={`/doctors/edit/${doctor._id}`}>
                                            <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-yellow-500' />
                                        </Link>
                                        <Link to={`/doctors/delete/${doctor._id}`}>
                                            <MdOutlineDelete className='text-2xl text-red-600 hover:text-red-500' />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            )}
        </div>
    );
};

export default ShowDoctor;
