import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing

const About = () => {
  return (
    <div className='flex flex-col items-center my-10'>
      {/* About Section Card */}
      <div className='border rounded-lg shadow-md p-6 my-6 md:w-2/4'>
        <p>At Caring Nannies, we understand that choosing the right caregiver for your children is one of the most important decisions a parent can make. Our journey began with a mission to provide families with trustworthy and nurturing nannies who prioritize the well-being and development of your little ones.</p>
        <p>Since our inception, we've dedicated ourselves to connecting families with highly qualified nannies who offer a wide range of services tailored to meet the unique needs of each family. From daily care to specialized activities, we ensure that our caregivers are not only skilled but also passionate about what they do.</p>
      </div>

      {/* Our Mission Card */}
      <div className='border rounded-lg shadow-md p-6 my-6 md:w-2/4'>
        <b className='text-gray-800 text-lg'>Our Mission</b>
        <p className='text-gray-600'>At Caring Nannies, our mission is to empower families by providing reliable and compassionate childcare solutions. We strive to create lasting relationships between families and nannies, ensuring peace of mind for parents and a safe, loving environment for children.</p>
      </div>

      {/* Why Choose Us Section */}
      <div className='text-xl py-4'>
        <p className='text-2xl font-bold text-center'>WHY CHOOSE US</p>
      </div>
      
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mb-20'>
        <div className='border rounded-lg shadow-md p-6 flex flex-col gap-3'>
          <b className='text-lg'>Quality Care:</b>
          <p className='text-gray-600'>We thoroughly vet and select each nanny to ensure they meet our high standards of care and professionalism.</p>
        </div>
        <div className='border rounded-lg shadow-md p-6 flex flex-col gap-3'>
          <b className='text-lg'>Flexibility:</b>
          <p className='text-gray-600'>Our services are designed to accommodate your family's specific needs, from part-time to full-time care.</p>
        </div>
        <div className='border rounded-lg shadow-md p-6 flex flex-col gap-3'>
          <b className='text-lg'>Exceptional Support:</b>
          <p className='text-gray-600'>Our dedicated team is here to assist you every step of the way, ensuring your satisfaction and peace of mind.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
