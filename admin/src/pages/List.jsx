import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.post(backendUrl + '/api/nanny/list', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
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
      setLoading(false);
    }
  };

  const removeNanny = async (id) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/nanny/remove/${id}`, {
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
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className='mb-4 text-xl font-bold'>All Nannies List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : list.length === 0 ? (
        <p>No nannies found</p>
      ) : (
        list.map((item) => (
          <div key={item._id} className="bg-white shadow-md rounded-lg p-4 mb-4 w-full">
            <div className="flex items-center justify-between">
              <img 
                className='w-20 h-20 rounded-full object-cover mr-4' 
                src={item.profilePicture || '/path/to/default/image.jpg'} 
                alt={`${item.firstName} ${item.lastName}`} 
              />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{item.firstName} {item.lastName}</h3>
                <p>Age: {item.age}</p>
                <p>Experience: {item.experience}</p>
                <p className="text-sm text-gray-500">Contact: {item.contactEmail}</p>
              </div>
              <div 
                onClick={() => removeNanny(item._id)} 
                className='cursor-pointer text-red-500 hover:text-red-700'
              >
                <span className='text-xl'>&times;</span> {/* Cross icon for removal */}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default List;
