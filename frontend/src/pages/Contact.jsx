import React from 'react';

const Contact = () => {
  return (
    <div>
      {/* Contact Section */}
      <div className='text-center text-2xl pt-10 border-t'>
        <h2 className='font-bold'>CONTACT US</h2>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        {/* Removed the image and asset reference */}
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Office</p>
          <p className=' text-gray-500'>54709 Willms Station <br /> Suite 350, Washington, USA</p>
          <p className=' text-gray-500'>Tel: +91 - 57484939033<br /> Email: contact@yourcompany.com</p>
         
        </div>
      </div>
    </div>
  );
};

export default Contact;