import React, { useState,useEffect } from 'react'
import { toast } from 'sonner';
import { Dialog } from 'primereact/dialog';
import * as yup from "yup";
import { Calendar } from 'primereact/calendar';
import { ErrorMessage, Field, Formik, yupToFormErrors } from 'formik';
import { useGetAllConsumerdetailsQuery, useUpdateMutation } from '../../../query/user.query';
import { Button } from 'primereact/button';
import LoadingPage from './LoadingPage';
const Update = ({visible,setVisible,_id}) => {
  const [updateconsumer,updateconsumerResponse]=useUpdateMutation()
  const [currentId, setCurrentId] = useState(_id);

  useEffect(() => {
    setCurrentId(_id);
  }, [_id]);

  const { data, isLoading, error } = useGetAllConsumerdetailsQuery(currentId, {
    skip: !currentId,
  });
  if (isLoading){
    return <LoadingPage/>
  }
  // console.log(data)
  // console.log(_id)
    const validationScheme=yup.object({
        name: yup.string().required("Name is required"),
        email: yup.string().email("email must be valid").required("Email is reuired"),
        phone:yup.string().required("mobile is required"),
        address: yup.string().required("address is required "),
        dob: yup.string().required("DOB is required")
      })
    
      const initialValues={
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone,
        address: data.user.address,
        dob: new Date(data.user.dob)
        // name:"",
        // email:"",
        // mobile:"",
        // address:"",
        // dob:""
        }
        const handlesubmit= async(e,{setValues})=>{
          try {
            // console.log(e)
            const { data, error } = await updateconsumer({data:e,_id:currentId});
            // console.log(data)
            console.log(currentId)
          if (error) {
            toast.error(error.data.message);
            return;  
          }
          console.log(data,error)
          
          
    
    
            toast.success("updated user")
            // resetForm()
            setValues({
              name:e.name,
              email:e.email,
              phone:e.phone,
              address:e.address,
              dob:new Date(e.dob)
            })
            setVisible(!visible)
          } catch (error) {
            toast.error(error)
          }
        }
  return (
    <div>
      <Dialog header="update User" position='top' visible={visible} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
              <Formik initialValues={initialValues} validationSchema={validationScheme} onSubmit={handlesubmit}>
                {({values,setFieldValue,handleSubmit})=>(
                  
                  <form  onSubmit={handleSubmit}>
                  <div className='flex justify-center flex-col p-1'>
                  <label htmlFor='name'>Name<span className='text-red-800'>*</span></label>
                  <Field id="name" name="name" className="rounded-lg bg-slate-100  py-2 px-2 outline-none "></Field>
                  <ErrorMessage name='name' component={"p"} className='text-red-500'></ErrorMessage>
                  
                  <label htmlFor='email'>Email<span className='text-red-800'>*</span></label>
                  <Field id="email" name="email" className="rounded-lg bg-slate-100  py-2 px-2 outline-none "></Field>
                  <ErrorMessage name='email' component={"p"} className='text-red-500'></ErrorMessage>
                  
                  <label htmlFor='phone'>Mobile<span className='text-red-800'>*</span></label>
                  <Field id="phone" name="phone" className="rounded-lg bg-slate-100  py-2 px-2 outline-none "></Field>
                  <ErrorMessage name='phone' component={"p"} className='text-red-500'></ErrorMessage>
                 
                  <label htmlFor='address'>Address<span className='text-red-800'>*</span></label>
                  <Field id="address" name="address" className="rounded-lg bg-slate-100  py-2 px-2 outline-none "></Field>
                  <ErrorMessage name='address' component={"p"} className='text-red-500'></ErrorMessage>
                  
                  <label htmlFor='Calender'>DOB<span className='text-red-800'>*</span></label>
                  <Calendar maxDate={new Date()} placeholder='enter the date' inputClassName='' value={values.dob} onChange={(e)=>{setFieldValue('dob',e.value)}} id="dob" name="dob" className="rounded-lg bg-slate-100  py-2 px-2 outline-none "></Calendar>
                  <ErrorMessage name='dob' component={"p"} className='text-red-500'></ErrorMessage>
                  <Button type="submit" className='m-3 p-2 bg-purple-500 text-black font-sans text-xl'>Submit</Button>
                </div>
                </form>
                  )}
              </Formik>
</Dialog>
    </div>
  )
}

export default Update
