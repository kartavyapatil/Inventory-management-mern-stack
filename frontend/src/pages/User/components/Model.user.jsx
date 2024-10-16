import React from 'react'
import { Dialog } from 'primereact/dialog';
import { ErrorMessage, Field, Formik, yupToFormErrors } from 'formik';
import * as yup from "yup";
import { Calendar } from 'primereact/calendar';
import { toast } from 'sonner';
import { useRegisterconsumerMutation } from '../../../query/user.query';


const Model = ({visible,setVisible}) => {


  const [registerconsumer ,registerconsumerResponse]=useRegisterconsumerMutation()
  const validationScheme=yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("email must be valid").required("Email is reuired"),
    phone:yup.string().required("mobile is required"),
    address: yup.string().required("address is required "),
    dob: yup.string().required("DOB is required")
  })

  const initialValues={
    name:"",
    email:"",
    phone:"",
    address:"",
    dob:new Date()
    }
    const handlesubmit= async(e,{resetForm})=>{
      try {
        /*console.log(e)*/
        const { data, error } = await registerconsumer(e);
        // console.log(data)
      if (error) {
        toast.error(error.data.message);
        return;  
      }

        toast.success("added user")
        resetForm()
        setVisible(!visible)
      } catch (e) {
        toast.error(e)
      }
    }
  return (
  <>
        <Dialog header="Add User" position='top' visible={visible} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
            {/* <p className="m-0"> */}
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

                  <button type="submit" className='m-3 p-2 bg-purple-500 text-black font-sans text-xl'>Submit</button>
                </div>
                </form>
                  )}
              </Formik>

        </Dialog>
  </>
  )
}

export default Model
