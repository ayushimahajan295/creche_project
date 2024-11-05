import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PurchasedNannies = () => {
    const [purchasedNannies, setPurchasedNannies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch purchased nannies data from backend
        const fetchPurchasedNannies = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/nanny/user/purchased-nannies', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log("Fetched Nannies Response:", response);
                setPurchasedNannies(response.data.nannies);
            } catch (error) {
                console.error("Error fetching purchased nannies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPurchasedNannies();
    }, []);

    const handleBookAppointment = (nannyId) => {
        console.log(`Booking appointment for Nanny ID: ${nannyId}`);
        // Redirect to appointment booking page or open a modal for booking
    };

    if (loading) return <div className="text-center py-5">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-5 bg-white rounded-lg shadow-lg mt-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Purchased Nannies</h2>
            {purchasedNannies.length > 0 ? (
                <ul className="space-y-4">
                    {purchasedNannies.map((nanny) => (
                        <li key={nanny.nannyId} className="flex justify-between items-center p-4 border rounded-lg shadow-md bg-gray-100 hover:bg-gray-200 transition duration-200">
                            <div>
                                <p className="text-lg font-semibold text-gray-800">{nanny.nannyName}</p>
                                <p className="text-gray-600">Purchase Date: {new Date(nanny.purchaseDate).toLocaleDateString()}</p>
                            </div>
                            <button 
                                onClick={() => handleBookAppointment(nanny.nannyId)} 
                                className="bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            >
                                Book Appointment
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500">No nannies purchased yet.</p>
            )}
        </div>
    );
};

export default PurchasedNannies;
