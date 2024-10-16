import React, { useState ,useEffect} from 'react';
import { LuView } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { useDeleteproductMutation, useGetallproductbyidQuery } from '../../../query/product.query';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';
import { toast } from 'sonner';
import { Dialog } from 'primereact/dialog';
import Update from './Update.product';

const Tablecard = ({ data,loading }) => {
  const [selectedConsumerId, setSelectedConsumerId] = useState(null);
  const [deleteproduct, deleteproductResponse] = useDeleteproductMutation();
  const[updateID,setupdateID]=useState(false)
  const { data:consumer, isLoading, error } = useGetallproductbyidQuery(selectedConsumerId, {
    skip: !selectedConsumerId
  });
  const [visibleconfirmdialog, setVisibleconfirmdialog] = useState(false);
  const[visibledialog,setvisibledialog]=useState(false);
  const[visible,setVisible]=useState(false)
  const [editConsumerId, setEditConsumerId] = useState(null);

  const handlerdelete=(_id)=>{
    setVisibleconfirmdialog(true)
    confirmDialog({
      visible:{visibleconfirmdialog} ,
      onHide:setVisibleconfirmdialog(false),
      message:"Are you sure you want to proceed?",
      header:"Confirmation",
      accept:async()=>{
        try {
          console.log("hfg")
            const { data, error } = await deleteproduct(_id);
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

  // const updatebutton=()=>{
    
  // }
  const showdetails = (id) => {
    setSelectedConsumerId(id);
    setvisibledialog(true);
  };
  const handleEdit = (id) => {
    setEditConsumerId(id);
    // setVisible(!visible);
    setTimeout(() => {
      setVisible(true);
    }, 500); // 1seconds delay
  };
        
        
        return (
          <>
    <ConfirmDialog/>
    <Dialog header="product Information" visible={visibledialog} style={{ width: '50vw' }} onHide={() => {if (!visibledialog) return; setvisibledialog(false); }}>
    {consumer ? (
          <div>
            <p><strong>product name:</strong> {consumer.user.productname}</p>
            <p><strong>quantity:</strong> {consumer.user.qunatity}</p>
            <p><strong>details:</strong> {consumer.user.Details}</p>
            
          </div>
        ) : (
          <p>Loading...</p>
        )}
    </Dialog>
    

    <table className="w-4/5 text-sm text-left  text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
                  <tr>  
                      <th scope="col" className="px-6 py-3">
                      Product name
                      </th>
                      <th scope="col" className="px-6 py-3">
                      quantity
                      </th>
                      <th scope="col" className="px-6 py-3">
                          details
                      </th>
                      <th scope="col" className="px-6 py-3">
                      Action

                      </th>
                  </tr>
              </thead>
              <tbody>
                {data.users && data.users.length>0 && data.users.map((c,i)=>{
                  // console.log(c)
                  return <tr key={i} className="bg-white border-b">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {c.productname}
                  </th>
                  <td className="px-6 py-4">
                    {c.qunatity}
                  </td>
                  <td className="px-6 py-4">
                    {c.Details}
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() =>handleEdit(c._id)} className='bg-orange-400 p-2 rounded-md m-2'>
                      <FaEdit color='white' size={27} />
                    </button>
                    <Button 
                      onClick={() => handlerdelete(c._id)}  loading={deleteproductResponse.isLoading}  className='bg-red-500 p-2 rounded-md m-2'
                    >
                      <RiDeleteBin6Line color='white' size={27} />
                    </Button>
                    <button onClick={()=>{showdetails(c._id)}} className='bg-green-400 p-2 rounded-md m-2'>
                      <LuView size={27} color='white' />
                    </button>
                  </td>
                  
                </tr>
                })}
              </tbody>
          </table>
           {setupdateID && editConsumerId && (
        <Update visible={visible} setVisible={setVisible} _id={editConsumerId}/>
      )}
    {/* <Update visible={visible} setVisible={setVisible} _id={editConsumerId}/> */}
       
    </>
  );
};

export default Tablecard;
