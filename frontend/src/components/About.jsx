import React from 'react';

const About = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      {/* About Section */}
      <div className='my-10 flex flex-col md:flex-row gap-16 max-w-5xl'>
        <div className='flex flex-col justify-center gap-6 text-gray-600'>
          <p> was born out of a passion for innovation and a desire to revolutionize the way people work  online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of people from the comfort of their homes.</p>
          <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality people that cater to every taste and preference. ocs an sourced from trusted brands and suppliers.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission at is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className='text-xl py-4'>
        <p className='text-2xl font-bold text-center'>WHY CHOOSE US</p>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20 max-w-5xl'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our team of dedicated professionals is here to assist you, ensuring your satisfaction is our top priority.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
