// import React from 'react'
// import { Dialog } from 'primereact/dialog';
// import { ErrorMessage, Field, Formik, yupToFormErrors } from 'formik';
// import * as yup from "yup";
// import { Calendar } from 'primereact/calendar';
// import { toast } from 'sonner';
// import { Dropdown } from 'primereact/dropdown';
// import { useState } from 'react';
// import { useGetuserrforsearchQuery } from '../../query/user.query';
// import { useGetproductforsearchQuery } from '../../query/product.query';
// import LoadingPage from '../User/components/LoadingPage';
// import { useAddorderMutation } from '../../query/order.query';
// // import { useRegisterconsumerMutation } from '../../../query/user.query';
// const Model = ({visible,setVisible}) => {
// //   const [registerconsumer ,registerconsumerResponse]=useRegisterconsumerMutation()
// const { isLoading: isLoadingUser, isFetching: isFetchingUser, data: userData } = useGetuserrforsearchQuery({});
// const { isLoading: isLoadingProduct, isFetching: isFetchingProduct, data: productData } = useGetproductforsearchQuery({});
// const [addorder,addorderResponse]=useAddorderMutation()
// const [selectedCountry, setSelectedCountry] = useState(null);
// if (isLoadingUser||isFetchingUser){
//   return <LoadingPage/>
// }else{
//   console.log(JSON.stringify(userData))
// }
// if (isLoadingProduct || isFetchingProduct) {
//   return <LoadingPage />;
// }else{
//   console.log(JSON.stringify(productData))
// }
//     const selectedCountryTemplate = (option, props) => {
//         if (option) {
//             return (
//                 <div className="flex align-items-center">
//                     <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code}`} style={{ width: '18px' }} />
//                     <div>{option.name}-{option.mobile}</div>
//                 </div>
//             );
//         }

//         return <span>{props.placeholder}</span>;
//     };
//     const selectedProductTemplate = (option, props) => {
//         if (option) {
//             return (
//                 <div className="flex align-items-center">
//                     <img alt={option.productname} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code}`} style={{ width: '18px' }} />
//                     <div>{option.productname}</div>
//                 </div>
//             );
//         }

//         return <span>{props.placeholder}</span>;
//     };

//     const countryOptionTemplate = (option) => {
//       return (
//           <div className="flex align-items-center">
//               <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag `} style={{ width: '18px' }} />
//               <div>{option.name}-{option.phone}</div>
//           </div>
//       );
//     }
//     const productOptionTemplate = (option) => {
//       return (
//           <div className="flex align-items-center">
//               <img alt={option.productname} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag `} style={{ width: '18px' }} />
//               <div>{option.productname}</div>
//           </div>
//       );
//     }
//   const validationScheme=yup.object({
//     user: yup.mixed().required("User is required"),
//     product:yup.mixed().required("product is required")
//   //   name: yup.string().required("Name is required"),
//   //   email: yup.string().email("email must be valid").required("Email is reuired"),
//   //   phone:yup.string().required("mobile is required"),
//   //   address: yup.string().required("address is required "),
//   //   dob: yup.strin g().required("DOB is required")
//   })

//   const initialValues={
//     user:null,
//     order_date:new Date(),
//     product:null
//     }
//     const handlesubmit= async(e,{resetForm})=>{
//       try {
//         // console.log(e)
//         const { data, error } = await addorder({...e,user:e.user._id});
//         // console.log(data)
//         toast.success("added user")
//         resetForm()
//         setVisible(!visible)
//         if (error) {
//           toast.error(error.data.message);
//           return;  
//         }
//       } catch (e) {
//         toast.error(e)
//       }
//     }
//   return (
//   <>
//         <Dialog header="Add order" position='top' visible={visible} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
//             {/* <p className="m-0"> */}
//               <Formik initialValues={initialValues} validationSchema={validationScheme} onSubmit={handlesubmit}>
//                 {({values,setFieldValue,handleSubmit})=>(
                  
//                   <form  onSubmit={handleSubmit}>
//                   <div className='flex justify-center flex-col p-1'>
//                   <label htmlFor='name'>user<span className='text-red-800'>*</span></label>
//                   {/* <Field id="name" name="name" className="rounded-lg bg-slate-100  py-2 px-2 outline-none "></Field> */}
//                   <div className="card flex justify-content-center">
//             {/* <Dropdown value={values.user} onChange={(e) => setFieldValue("user",e.value)} options={data && data.user} optionLabel="user" placeholder="Select a Country" 
//                 filter valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} className="w-full md:w-14rem" filterPlaceholder='enter the name of user' emptyFilterMessage="user not register"/> */}
//                                                   <Dropdown value={values.user} onChange={(e) => setFieldValue('user', e.value)} filterBy='name' options={userData && userData.users} filterPlaceholder='Search User By Name' optionLabel="user" placeholder="Select a User"
//                                   emptyFilterMessage="No User Found"
//                                   emptyMessage="You Have No User"
//                                       filter valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} className="w-full my-2 border outline-none  ring-0" />
//         </div> 
//                   <ErrorMessage name='name' component={"p"} className='text-red-500'></ErrorMessage>
                  
                                   
//                   <label htmlFor='Calender'>Date of order<span className='text-red-800'>*</span></label>
//                   <Calendar maxDate={new Date()} placeholder='enter the date' inputClassName='' value={values.order_date} onChange={(e)=>{setFieldValue('order_date',e.value)}} id="order_date" name="order_date" className="rounded-lg bg-slate-100  py-2 px-2 outline-none "></Calendar>
//                   <ErrorMessage name='dob' component={"p"} className='text-red-500'></ErrorMessage>

//                   <Dropdown value={values.product} onChange={(e) => setFieldValue('product', e.value)} filterBy='productname' options={productData && productData.users} filterPlaceholder='Search product By Name' optionLabel="product" placeholder="Select a product"
//                                   emptyFilterMessage="No product Found"
//                                   emptyMessage="You Have No product"
//                                       filter valueTemplate={selectedProductTemplate} itemTemplate={productOptionTemplate} className="w-full my-2 border outline-none  ring-0" />

//                   <button type="submit" className='m-3 p-2 bg-purple-500 text-black font-sans text-xl'>Submit</button>
//                 </div>
//                 </form>
//                   )}
//               </Formik>

//         </Dialog>
//   </>
//   )
// }

// export default Model



import React from 'react';
import { Dialog } from 'primereact/dialog';
import { ErrorMessage, Field, Formik } from 'formik';
import * as yup from 'yup';
import { Calendar } from 'primereact/calendar';
import { toast } from 'sonner';
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';
import { useGetuserrforsearchQuery } from '../../query/user.query';
import { useGetproductforsearchQuery } from '../../query/product.query';
import LoadingPage from '../User/components/LoadingPage';
import { useAddorderMutation } from '../../query/order.query';

const Model = ({ visible, setVisible }) => {
  const { isLoading: isLoadingUser, isFetching: isFetchingUser, data: userData } = useGetuserrforsearchQuery({});
  const { isLoading: isLoadingProduct, isFetching: isFetchingProduct, data: productData } = useGetproductforsearchQuery({});
  const [addorder, addorderResponse] = useAddorderMutation();

  if (isLoadingUser || isFetchingUser) {
    return <LoadingPage />;
  }
  // } else {
  //   console.log(JSON.stringify(userData));
  // }

  // if (isLoadingProduct || isFetchingProduct) {
  //   return <LoadingPage />;
  // } else {
  //   console.log(JSON.stringify(productData));
  // }

  const selectedCountryTemplate = (option, props) => {
            if (option) {
                return (
                    <div className="flex align-items-center">
                        <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code}`} style={{ width: '18px' }} />
                        <div>{option.name}-{option.mobile}</div>
                    </div>
                );
            }
    
            return <span>{props.placeholder}</span>;
        };
        const selectedProductTemplate = (option, props) => {
            if (option) {
                return (
                    <div className="flex align-items-center">
                        <img alt={option.productname} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code}`} style={{ width: '18px' }} />
                        <div>{option.productname}</div>
                    </div>
                );
            }
    
            return <span>{props.placeholder}</span>;
        };
    
        const countryOptionTemplate = (option) => {
          return (
              <div className="flex align-items-center">
                  <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag `} style={{ width: '18px' }} />
                  <div>{option.name}-{option.phone}</div>
              </div>
          );
        }
        const productOptionTemplate = (option) => {
          return (
              <div className="flex align-items-center">
                  <img alt={option.productname} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag `} style={{ width: '18px' }} />
                  <div>{option.productname}</div>
              </div>
          );
        }
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
    <Dialog header="Add Order" position="top" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
      <Formik initialValues={initialValues} validationSchema={validationScheme} onSubmit={handlesubmit}>
        {({ values, setFieldValue, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className='flex justify-center flex-col p-1'>
              <label htmlFor='user'>User<span className='text-red-800'>*</span></label>
              <Dropdown value={values.user} onChange={(e) => setFieldValue('user', e.value)} options={userData && userData.users} filterBy='name' optionLabel="name" placeholder="Select a User" 
                filter valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} className="w-full md:w-14rem" filterPlaceholder='Search User By Name' 
                emptyFilterMessage="No User Found" emptyMessage="You Have No User" />
              <ErrorMessage name='user' component="p" className='text-red-500' />
             
              <label htmlFor='order_date'>Date of Order<span className='text-red-800'>*</span></label>
              <Calendar maxDate={new Date()} value={values.order_date} onChange={(e) => setFieldValue('order_date', e.value)} id="order_date" name="order_date" className="rounded-lg bg-slate-100 py-2 px-2 outline-none" />
              <ErrorMessage name='order_date' component="p" className='text-red-500' />
{/* 
              <Dropdown value={values.product} onChange={(e) => setFieldValue('product', e.value)} options={productData && productData.products} filterBy='productname' optionLabel="productname" 
                placeholder="Select a Product" emptyFilterMessage="No Product Found" emptyMessage="You Have No Product" 
                filter valueTemplate={selectedCountryTemplate} itemTemplate={selectedCountryTemplate} className="w-full my-2 border outline-none ring-0" />
                 */}
                 <Dropdown value={values.product} onChange={(e) => setFieldValue('product', e.value)} filterBy='productname' options={productData && productData.users} filterPlaceholder='Search product By Name' optionLabel="product" placeholder="Select a product"
                                  emptyFilterMessage="No product Found"
                                  emptyMessage="You Have No product"
                                      filter valueTemplate={selectedProductTemplate} itemTemplate={productOptionTemplate} className="w-full my-2 border outline-none  ring-0" />
              <ErrorMessage name='product' component="p" className='text-red-500' />

              <button type="submit" className='m-3 p-2 bg-purple-500 text-black font-sans text-xl'>Submit</button>
            </div>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

export default Model;
