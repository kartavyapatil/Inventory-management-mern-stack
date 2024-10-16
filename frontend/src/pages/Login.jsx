import React from 'react'
import logo from "../assets/logo.png"
import wave from "../assets/wave.svg"
import person from "../assets/loginpageasset.png"
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../query/Auth.query';
import { toast } from 'sonner';


const Login = () => {
   
  const navigate=useNavigate()
  const [loginUser,loginUserResponse]=useLoginUserMutation()
  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = yup.object({
    email: yup.string().email('Invalid email address').required('Required'),
    password: yup.string().required('Required').min(5,"password must be greater than 5 character")
  });
 
  const onSubmitHandler = async (values,{resetForm}) => {
    try {
      const { data, error } = await loginUser(values);
      if (error) {
        toast.error(error.data.message);
        return;
      }

      localStorage.setItem("token",data.token)
      toast.success("login successfull")
      navigate("/")
      resetForm();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className='flex items-center gap-4 h-[10vh] bg-slate-50'>
        <div className='logo'>
          <img src={logo} className='w-16 ml-3 mt-2' alt="logo" />
        </div>
        <div className='logo-name font-serif font-bold text-2xl'>
          Inventory Management System
        </div>
      </div>
      <div className=' flex gap-1 justify-center  bg-slate-50'>
        <div className='w-[45vw]  h-[69.5vh] '>
          <div className='rounded-lg  p-10 bg-white w-full h-[58vh] mt-8'>
            <div className='text-3xl font-serif font-medium flex justify-center p-4'>Login</div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmitHandler} >
            {({ values, setFieldValue, handleSubmit }) => (
                <form onSubmit={handleSubmit} className="flex flex-col p-4 gap-5">
                  <div className="flex  flex-col gap-1">
                    <label htmlFor="email" className='font-serif text-xl'>Email :-</label>
                    {/* <input id='email' name='email' value={values.email} onChange={(e)=>{setFieldValue('email',e.target.value)}} className="rounded-lg bg-slate-200 border-gray-500 py-5 px-2 outline-none h-8 w-[26vw]"  placeholder='Enter Email Address' /> */}
                    <Field id='email' name='email' className="rounded-lg bg-slate-200 border-gray-500 py-5 px-2 outline-none h-8 w-[26vw]"  placeholder='Enter Email Address' />
                    <ErrorMessage component={'p'} className='text-red-500 text-sm' name='email'/>
                  </div>
                  <div className='flex  flex-col gap-1'>
                    <label className='font-serif text-xl' htmlFor='password'>Password :-</label>
                    {/* <input name='password' className="rounded-lg bg-slate-200 border-gray-500 py-5 px-2 outline-none h-8 w-[26vw] " type='password' value={values.password} onChange={(e)=>{setFieldValue('password',e.target.value)}} placeholder='Enter password' /> */}
                    <Field id='password' name='password' className="rounded-lg bg-slate-200 border-gray-500 py-5 px-2 outline-none h-8 w-[26vw] " type='password' placeholder='Enter password' />
                    <ErrorMessage component={'p'} className='text-red-500 text-sm' name='password'/>
                  </div>
                  <button  className='justify-center w-28 font-serif text-xl bg-green-600 rounded-lg p-1 border ' type='submit'>Submit</button>
                  <div className='flex'>
                    <p className='font-serif '>Don't have a Account ? </p>
                    <Link to={'/register'} className='font-semibold text-blue-600'>Register</Link>
                  </div>
                   
                </form>
              )}
            </Formik>
          </div>
        </div>
        <div className='w-[45vw]  h-[69vh] '>
          <img className='absolute h-[80vh] w-[38vw] z-10' src={person} alt="person" />
        </div>
      </div>
      <div className='absolute bottom-0'>
        <img className='bg-slate-50 w-[100vw]' src={wave} alt="wave" />
      </div>

    </>
  );
};


export default Login





// https://github.com/pixegami/python-for-beginners