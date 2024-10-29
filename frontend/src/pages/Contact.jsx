import React from 'react';

const Contact = () => {
  return (
    <div>
      {/* Contact Section */}
      <div className='text-center text-2xl pt-10 border-t'>
        <h2 className='font-bold'>CONTACT US</h2>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        {/* Card for Office Information */}
        <div className='bg-white shadow-lg rounded-lg p-6 flex flex-col justify-center items-start gap-6 w-full md:w-1/2'>
          <p className='font-semibold text-xl text-gray-600'>Our Office</p>
          <p className='text-gray-500'>
            Symboisis International University <br /> Lavale ,Pune
          </p>
          <p className='text-gray-500'>
            Tel: +91-9991268863<br /> Email: manager@caringnannies.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
