import React, { useState ,useEffect} from 'react';
import { LuView } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';
import { toast } from 'sonner';
import { Dialog } from 'primereact/dialog';
import { useDeleteorderMutation } from '../../query/order.query';
// import Update from './Update';

const Tablecard = ({ data,loading }) => {
  const [selectedConsumerId, setSelectedConsumerId] = useState(null);
  const[updateID,setupdateID]=useState(false)
  const[deleteorder,deleteorderResponse]=useDeleteorderMutation()
  // const { data:consumer, isLoading, error } = useGetAllConsumerdetailsQuery(selectedConsumerId, {
    // skip: !selectedConsumerId
  // });
  console.log(`this is data of productname ${data}`)
  const [visibleconfirmdialog, setVisibleconfirmdialog] = useState(false);
  const[visibledialog,setvisibledialog]=useState(false);
  const[visible,setVisible]=useState(false)
  const [editConsumerId, setEditConsumerId] = useState(null);

  const handlerdelete=(_id)=>{
    console.log(_id)
    setVisibleconfirmdialog(true)
    confirmDialog({   
      visible:{visibleconfirmdialog} ,
      onHide:setVisibleconfirmdialog(false),
      message:"Are you sure you want to proceed?",
      header:"Confirmation",
      accept:async()=>{
        try {
          console.log(_id)
            const { data, error } = await deleteorder(_id);
            console.log(data)
               if (error) {
                  toast.error(error.data.message);
                    return;
                  }
                  toast.success(data.msg);
                } catch (e) {
                  toast.error(e.message);
                }
              },
              reject:()=>{
                console.log("reject for "+_id);
      }
    

    })
  }  
        
        return (
          <>
          <ConfirmDialog/>
    <table className="w-4/5 text-sm text-left  text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
                  <tr>  
                      <th scope="col" className="px-6 py-3">
                      Costomer name
                      </th>
                      <th scope="col" className="px-6 py-3">
                      email
                      </th>
                      <th scope="col" className="px-6 py-3">
                          product
                      </th>
                      <th scope="col" className="px-6 py-3">
                          quantity
                      </th>
                      <th scope="col" className="px-6 py-3">
                      Action

                      </th>
                  </tr>
              </thead>
              <tbody>
                {data.orders && data.orders.length>0 && data.orders.map((c,i)=>{
                  return <tr key={i} className="bg-white border-b">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {c.consumerdetails.name}
                  </th>
                  <td className="px-6 py-4">
                    {c.consumerdetails.email}
                  </td>
                  <td className="px-6 py-4">
                    {c.productdetails.productname}
                  </td>
                  <td className="px-6 py-4">
                    {c.productdetails.qunatity}
                  </td>
                  <td className="px-6 py-4">
                    
                    <Button 
                      onClick={() => handlerdelete(c._id)} className='bg-red-500 p-2 rounded-md m-2'
                    >
                      <RiDeleteBin6Line color='white' size={27} />
                    </Button>
                    
                  </td>
                  
                </tr>
                })}
              </tbody>
          </table>
          {setupdateID && editConsumerId && (
        <Update visible={visible} setVisible={setVisible} _id={editConsumerId} />
      )}
    {/* <Update visible={visible} setVisible={setVisible} _id={editConsumerId}/> */}
      
    </>
  );
};

export default Tablecard;
