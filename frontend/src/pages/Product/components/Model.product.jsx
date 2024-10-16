// import React from 'react'
// import { Dialog } from 'primereact/dialog';
// import { ErrorMessage, Field, Formik, yupToFormErrors } from 'formik';
// import * as yup from "yup";
// // import { Calendar } from 'primereact/calendar';
// // import { toast } from 'sonner';
// // import { Button } from 'primereact/button';
// // import { useCounter } from 'primereact/hooks';
// // import { IoMdAdd } from "react-icons/io";
// // import { FaMinus } from "react-icons/fa";
// // import { GrPowerReset } from "react-icons/gr";
// const Product = ({visible,setVisible}) => {
//     // const [registerconsumer ,registerconsumerResponse]=useRegisterconsumerMutation()
//     // const { count, increment, decrement, reset } = useCounter(0);
//   const validationScheme=yup.object({
//     productnamename: yup.string().required("Name is required"),
//     qunatity:yup.string().required("qunatity is required"),
//     Details: yup.string().required("details is required "),
//   })

//   const initialValues={
//     productname:"",
//     qunatity:"",
//     Details:"",
//     }
//     const handlesubmit= async(e,{resetForm})=>{
//     //   try {
//     //     /*console.log(e)*/
//     //     const { data, error } = await registerconsumer(e);
//     //     // console.log(data)
//     //   if (error) {
//     //     toast.error(error.data.message);
//     //     return;  
//     //   }
//     //   // console.log(data,error)
      
      


//     //     toast.success("added user")
//     //     resetForm()
//     //     setVisible(!visible)
//     //   } catch (e) {
//     //     toast.error(e)
//     //   }
//     try{
//         console.log(e)
//     resetForm()
//     setVisible(!visible)
// } catch (e) {
//     //     toast.error(e)
//       }
//     }
//   return (
//     <div>
//       <Dialog header="Add User" position='top' visible={visible} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
//             {/* <p className="m-0"> */}
//               <Formik initialValues={initialValues} validationSchema={validationScheme} onSubmit={handlesubmit}>
//                 {({values,setFieldValue,handleSubmit})=>(
                  
//                   <form  onSubmit={handleSubmit}>
//                   <div className='flex justify-center flex-col p-1'>

//                   <label htmlFor='productname'>Product Name<span className='text-red-800'>*</span></label>
//                   <Field id="productname" name="productname" className="rounded-lg bg-slate-100  py-2 px-2 outline-none "></Field>
//                   <ErrorMessage name='productname' component={"p"} className='text-red-500'></ErrorMessage>
                  
//                   <label htmlFor='qunatity'>Qunatity<span className='text-red-800'>*</span></label>
//                   <div className="flex flex-wrap gap-4">
//                   <Field id="qunatity" name="qunatity"  className="rounded-lg bg-slate-100  py-2 px-2 outline-none "></Field>
//                      {/* <Button icon="pi pi-plus" className=" p-button-outlined p-button-rounded p-button-success" onClick={increment}><IoMdAdd size={23}/></Button>
//                      <Button icon="pi pi-minus" className="p-button-outlined p-button-rounded" onClick={decrement}><FaMinus size={23}/></Button>
//                      <Button icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger" onClick={reset}><GrPowerReset size={23}/></Button> */}
//                   </div>
//                   <ErrorMessage name='qunatity' component={"p"} className='text-red-500'></ErrorMessage>
                
//                   <label htmlFor='Details'>Details<span className='text-red-800'>*</span></label>
//                   <Field id="Details" name="Details" className="rounded-lg bg-slate-100  py-2 px-2 outline-none "></Field>
//                   <ErrorMessage name='Details' component={"p"} className='text-red-500'></ErrorMessage>

//                   <button type="submit" className='m-3 p-2 bg-purple-500 text-black font-sans text-xl'>Submit</button>
//                 </div>
//                 </form>
//                   )}
//               </Formik>

//         </Dialog>
//     </div>
//   )
// }

// export default Product




import React from 'react';
import { Dialog } from 'primereact/dialog';
import { ErrorMessage, Field, Formik } from 'formik';
import * as yup from "yup";
import {useAddproductMutation} from "../../../query/product.query"
import { toast } from 'sonner';
const Product = ({ visible, setVisible }) => {

    const[addproduct,addproductresponse]=useAddproductMutation()
    const validationScheme = yup.object({
        productname: yup.string().required("Name is required"),
        qunatity: yup.number().required("Quantity is required"),
        Details: yup.string().required("Details are required"),
    });

    const initialValues = {
        productname: "",
        qunatity: "",
        Details: "",
    };

    const handlesubmit = async (e, { resetForm }) => {
        try {
            const{data,error}=await addproduct(e)
            console.log(e);  // This should now log the form values
            if (error) {
                toast.error(error.data.message);
                return;  
              }
            toast.success("added user")
            resetForm();
            setVisible(!visible);
        } catch (err) {
            console.error(err);
            toast.error(e)
        }
    };

    return (
        <div>
            <Dialog header="Add User" position='top' visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                <Formik initialValues={initialValues} validationSchema={validationScheme} onSubmit={handlesubmit}>
                    {({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
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

                                <button type="submit" className='m-3 p-2 bg-purple-500 text-black font-sans text-xl'>Submit</button>
                            </div>
                        </form>
                    )}
                </Formik>
            </Dialog>
        </div>
    );
}

export default Product;
