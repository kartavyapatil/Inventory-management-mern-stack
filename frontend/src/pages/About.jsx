import React from 'react'
import { MdAddIcCall } from "react-icons/md";
import logo from "../assets/logo.png"
import { ErrorMessage, Field, Formik } from 'formik';
import * as yup from 'yup';
import video from "../assets/video1.mp4"
import image1 from "../assets/zh-technical-support.png"
import image2 from "../assets/image2.png"
import Footer from './fotter';
const About = () => {
  const validationScheme = yup.object({
    user: yup.mixed().required("User is required"),
    product: yup.mixed().required("Product is required"),
    order_date: yup.string().required("Order date is required"),
  });

  const initialValues = {
    user: null,
    order_date: new Date(),
    product: null,
  };
  const handlesubmit = async (e, { resetForm }) => {
    console.log(e)
    try {
      const { data, error } = await addorder({ ...e, user: e.user._id });
      toast.success("Added order");
      resetForm();
      setVisible(false);
      if (error) {
        toast.error(error.data.message);
        return;
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  return (
      <>
        <div>
            <div className='flex justify-between flex-'>
              <div className='flex items-center gap-4 h-[10vh] bg-slate-50'>
                <div className='logo'>
                  <img src={logo} className='w-16 ml-3 mt-2' alt="logo" />
                </div>
                <div className='logo-name font-serif font-bold text-2xl'>
                  Inventory Management System
                </div>
              </div>
              <div className="bg-green-400 flex justify-center p-2 m-5 rounded-md border-2 border-green-500">
                <button className="flex items-center gap-3 font-sans text-xl">
                  <MdAddIcCall size={23}/> Call us
                </button>
              </div>
            </div>

            <div className='flex'>
              <div className='text-7xl flex items-center h-[75vh] w-[50%] m-5 p-5'>
                Engineered to<br/>
                handle all your<br/>
                inventory needs!!<br/>
              </div>
              <div className='flex items-center h-[75vh] w-[50%] m-5 p-5'>
                <video
                  className='object-cover w-[90%]'
                  src={video}
                  autoPlay
                  loop
                  muted
                  controls={false}
                  disablePictureInPicture
                  disableRemotePlayback
                  playsInline 
                />
              </div>
            </div>
            <div className='flex'>
              <div className=' bg-gray-100 w-[50%] flex justify-center flex-wrap border-gray-600 m-2 p-1'>
                <div className=' w-[20vw] m-3 p-3'><img src={image1} alt="technical-support" /></div>
                <div className='flex flex-wrap justify-center'>
                  <div className='text-2xl font-bold font-sans m-3 p-4'>Visit our help forum for technical support</div>
                  <div className='text-xl font-sans m-3 p-4'>Experiencing issues with a product you're already using? Browse through our help docs, videos, and tutorials, or engage with experts from the Zoho support community.</div>
                  <button className='bg-green-500 m-3 p-4 rounded-md  '>Take me to the help center</button>
                </div>
              </div>
              <div className=' bg-gray-100 w-[50%] flex justify-center flex-wrap border-gray-600 m-2 p-1'>
                <div className=' w-[20vw] m-3 p-3'><img src={image2} alt="technical-support" /></div>
                <div className='flex flex-wrap justify-center'>
                  <div className='text-2xl font-bold font-sans m-3 p-4'>If you can't find what you're looking for...</div>
                  <div className='text-xl font-sans m-3 p-4'>Raise a ticket and detail what you need help with. Our support team will be happy to lend a helping hand!</div>
                  <button className='bg-green-500 m-3 p-4 rounded-md  '>Take me to the help center</button>
                </div>
              </div>
            </div>
            
            <div><Footer/></div>
         </div>
      
        
      </>
  )
}

export default About
