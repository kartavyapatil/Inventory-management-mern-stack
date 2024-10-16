import React from 'react'
import Card from './Card'
import { FaUser } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FiBox } from "react-icons/fi";
import { useGetAllOrdersQuery } from '../../../query/order.query';
import { useGetproductQuery } from '../../../query/product.query';
import { useGetAllConsumerQuery } from '../../../query/user.query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoadingPage from '../../User/components/LoadingPage';
// import LoadingPage from '../User/components/LoadingPage'
const Bar = () => {
  const [SearchParams]=useSearchParams()
  const{data:orderdata ,isLoading:orderisloding }=useGetAllOrdersQuery({query:SearchParams.get("query")||'',page:SearchParams.get("page")||1 })
  const {data:productdata,isLoading:productisloding}=useGetproductQuery({query:SearchParams.get("query")||'',page:SearchParams.get("page")||1 })
  const {data:consumerdata,isLoading:consumerisloding}=useGetAllConsumerQuery({query:SearchParams.get("query")||'',page:SearchParams.get("page")||1 })
console.log(consumerdata)
let numberoforder=null
let numberofproduct=null
let numberofconsumer=null
if(!orderisloding){
  numberoforder=orderdata.numberoforder
}
if(!productisloding){
  numberofproduct=productdata.totalproduct
}
if(!consumerisloding){
  numberofconsumer=consumerdata.totalConsumer
}
  return (
  
    <div >
    <div className='flex w-[100%] justify-center bg-slate-100'>
    {orderisloding ? <><LoadingPage/></>:
      <Card name={"user"} no={numberofconsumer} icon={<FaUser size={40}/>}/>
    }
    {productisloding ? <><LoadingPage/></>:
      <Card name={"product"} no={numberofproduct} icon={<MdOutlineShoppingCart size={40}/>}/>
    }
        {consumerisloding ? <><LoadingPage/></>:
      <Card name={"order"} no={numberoforder} icon={<FiBox size={40}/>}/>
        }
      </div>
    </div>
  )
}

export default Bar
