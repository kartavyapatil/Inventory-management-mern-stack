import React from 'react'
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
// import { Button } from 'primereact/button';
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";
import  { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Model from "./components/Model.product"
import { useGetproductQuery } from '../../query/product.query';
import LoadingPage from '../User/components/LoadingPage';
import Tablecard from './components/Tablecard';
import logo from "../../assets/logo.png"

const Product = () => {
  const navigate=useNavigate()
  const [SearchParams] = useSearchParams();
  const[search,setsearch]=useState(SearchParams.get("query")||"")
  const [visible,setVisible]=useState(false);
  const {isLoading,data,error}=useGetproductQuery({query:SearchParams.get("query")||'',page:SearchParams.get("page")||1 })
  // console.log(data,isLoading,error)
  // console.log(SearchParams)
  const onnexttpage = () => {
    const page = Number(SearchParams.get("page")) || 1;
      const query = SearchParams.get("query") || '';
      let string = ``;
          if(query){
            string=`?query=${query}&page=${page+1}`
          }else{
            string = `?page=${page + 1}`
          }
      // console.log(page);
      navigate(`/product` + string);
    // console.log(string)
    // console.log(page);
    // console.log(query);
  };
  const perviouspage = () => {
    const page = Number(SearchParams.get("page")) || 1;
      const query = SearchParams.get("query") || '';
      let string = ``;
          if(query){
            string=`?query=${query}&page=${page-1}`
          }else{
            string = `?page=${page - 1}`
          }
      navigate(`/product` + string);
  };
  const onsubmithandler =(e)=>{
    e.preventDefault();
    let string=`?query=${search}&page=${1}`
    navigate(`/product` + string);
    }
  return (
    <>
      <div className="text-4xl shadow-sm font-sans  py-3 flex items-center gap-4"><span><img src={logo} className='w-16 ml-3 mt-2' alt="logo" /></span>Product Information</div>
      <div className="flex justify-around items-center "> 
        <div></div>
        <div className='flex  gap-4'>
        <div className='searchbox flex border border-gray-600 rounded-3xl items-center '>
          <form onSubmit={onsubmithandler}>
          <input className=' m-1 w-[30vw]   focus:outline-none  ' value={search} onChange={(e)=>{
 setsearch(e.target.value)
}} type="text" name=""  />
</form>
          <div className='h-9 w-9 flex justify-center items-center bg-[#2b2b2b] rounded-r-3xl'><FaSearch size={20} style={{color:"white"}}/></div>
        </div>
      </div>
        <button className="m-3 p-2 bg-purple-500 rounded-md" onClick={()=>{setVisible(!visible)}}>Add Product</button>
      </div>  
      <div className=' flex justify-between w-[75vw] p-2'>
          <button title='pervious page' onClick={perviouspage}><IoIosArrowDropleft size={33}/></button>
          <button title='next page' onClick={onnexttpage}><IoIosArrowDropright size={33}/></button>
        </div>  
        <Model visible={visible} setVisible={setVisible}/>
      {isLoading ? <><LoadingPage/></>:
      <div className="flex justify-center overflow-x-auto">
        { 
            <Tablecard data={data}/>
        }
      </div>
      }
    </>
  )
}

export default Product
