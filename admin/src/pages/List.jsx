import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const List = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchList = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post(backendUrl + '/api/nanny/list');
      console.log(response.data);
      if (response.data.success) {
        setList(response.data.nannies.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false); // Stop loading
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
      </div>
    </>
  );
};

export default List;
