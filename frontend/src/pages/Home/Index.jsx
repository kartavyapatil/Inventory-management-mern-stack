import React from 'react'
import BasicChart from './component/BasicChart'
import PieChart from './component/PieChart'
import Bar from './component/Bar'
import Todo from './component/Todo'
import logo from "../../assets/logo.png"


const Index = () => {

  return (
    <div>
     
       <div className="text-4xl shadow-sm font-sans py-3 flex items-center gap-4"><span><img src={logo} className='w-16 ml-3 mt-2' alt="logo" /></span> DashBoard </div>
      
      <Bar/>
      <div className='w-[100%] flex  justify-around items-center bg-slate-100'>
      <BasicChart/>
      <Todo/>

      {/* <PieChart/> */}
      </div>
    </div>
  )
}

export default Index
