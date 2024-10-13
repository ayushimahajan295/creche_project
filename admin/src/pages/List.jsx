import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

<<<<<<< HEAD
const List = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchList = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post(backendUrl + '/api/nanny/list');
      console.log(response.data);
=======
const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/nanny/list', {}, {
        headers: { Authorization: `Bearer ${token}` } // Include token in headers
      });
      console.log(response.data); // Log the response data for debugging
>>>>>>> 5022549007facf901d2234bae4b035eb969f7880
      if (response.data.success) {
        setList(response.data.nannies.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
<<<<<<< HEAD
    } finally {
      setLoading(false); // Stop loading
=======
    }
  };

  const removeNanny = async (id) => {
    try {
      const response = await axios.delete(backendUrl + '/api/nanny/remove/' + id, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
>>>>>>> 5022549007facf901d2234bae4b035eb969f7880
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className='mb-2'>All Nannies List</p>
      <div className='flex flex-col gap-2'>
        {/* ------- List Table Title ---------- */}
        <div className='hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Profile Picture</b>
          <b>Full Name</b>
          <b>Age</b>
          <b>Experience</b>
<<<<<<< HEAD
        </div>

        {/* ------ Nanny List ------ */}
        {loading ? (
          <p>Loading...</p>
        ) : list.length === 0 ? (
          <p>No nannies found</p>
        ) : (
          list.map((item) => (
            <div className='grid grid-cols-[1fr_2fr_1fr_1fr_1fr]' key={item._id}>
              <img className='w-12' src={item.profilePicture || '/path/to/default/image.jpg'} alt={`${item.firstName} ${item.lastName}`} />
              <p>{item.firstName} {item.lastName}</p>
              <p>{item.age}</p>
              <p>{item.experience}</p>
              {/* Removed the action column */}
            </div>
          ))
        )}
=======
          <b className='text-center'>Action</b>
        </div>

        {/* ------ Nanny List ------ */}
        {list.map((item) => (
          <div className='grid grid-cols-[1fr_2fr_1fr_1fr]' key={item._id}>
            <img className='w-12' src={item.profilePicture} alt="" />
            <p>{item.firstName} {item.lastName}</p>
            <p>{item.age}</p>
            <p>{item.experience}</p>
            <p onClick={() => removeNanny(item._id)} className='cursor-pointer'>X</p>
          </div>
        ))}
>>>>>>> 5022549007facf901d2234bae4b035eb969f7880
      </div>
    </>
  );
};

export default List;
