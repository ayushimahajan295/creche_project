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
                console.log(response);
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

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2>Purchased Nannies</h2>
            {purchasedNannies.length > 0 ? (
                <ul>
                    {purchasedNannies.map((nanny) => (
                        <li key={nanny.nannyId}>
                            <p>Name: {nanny.nannyName}</p>
                            <p>Purchase Date: {new Date(nanny.purchaseDate).toLocaleDateString()}</p>
                            <button onClick={() => handleBookAppointment(nanny.nannyId)}>
                                Book Appointment
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No nannies purchased yet.</p>
            )}
        </div>
    );
};

export default PurchasedNannies;
