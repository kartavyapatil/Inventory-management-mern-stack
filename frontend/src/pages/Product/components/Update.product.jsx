import React, { useState,useEffect } from 'react'
import { toast } from 'sonner';
import { Dialog } from 'primereact/dialog';
import * as yup from "yup";
import { Calendar } from 'primereact/calendar';
import { ErrorMessage, Field, Formik, yupToFormErrors } from 'formik';
import { useGetallproductbyidQuery, useUpdateMutation } from '../../../query/product.query';
import { Button } from 'primereact/button';
import LoadingPage from '../../User/components/LoadingPage';
const Update = ({visible,setVisible,_id}) => {
  const [updateconsumer,updateconsumerResponse]=useUpdateMutation()
  const [currentId, setCurrentId] = useState(_id);

  useEffect(() => {
    setCurrentId(_id);
  }, [_id]);

  const { data, isLoading, error } = useGetallproductbyidQuery(currentId, {
    skip: !currentId,
  });
  if (isLoading){
    return <LoadingPage/>
  }
  // console.log(data)
  // console.log(_id)
    const validationScheme=yup.object({
        productname: yup.string().required("Name is required"),
        qunatity: yup.string().required("Quantity is required"),
        Details: yup.string().required("Details are required"),
      })
    
      const initialValues={
        productname: data.user.productname,
        qunatity: data.user.qunatity,
        Details: data.user.Details,
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
                productname:e.productname,
                qunatity:e.qunatity,
                Details:e.Details
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
                  <label htmlFor='productname'>Product Name<span className='text-red-800'>*</span></label>
                                <Field id="productname" name="productname" className="rounded-lg bg-slate-100 py-2 px-2 outline-none" />
                                <ErrorMessage name='productname' component={"p"} className='text-red-500' />

                                <label htmlFor='qunatity'>Quantity<span className='text-red-800'>*</span></label>
                                <div className="flex flex-wrap gap-4">
                                    <Field id="qunatity" name="qunatity" className="rounded-lg bg-slate-100 py-2 px-2 outline-none" />
                                </div>
                                <ErrorMessage name='qunatity' component={"p"} className='text-red-500' />

                                <label htmlFor='Details'>Details<span className='text-red-800'>*</span></label>
                                <Field id="Details" name="Details" className="rounded-lg bg-slate-100 py-2 px-2 outline-none" />
                                <ErrorMessage name='Details' component={"p"} className='text-red-500' />

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
