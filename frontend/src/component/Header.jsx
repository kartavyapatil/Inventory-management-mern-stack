import React from 'react'
import {useDispatch ,useSelector} from 'react-redux'
import { toggleslider,collapsedSidebar, sliderbarslicePath } from '../slice/sliderbar.slice';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoLogOutOutline } from "react-icons/io5";
import { removeUser } from '../slice/user.slice';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const dispatch = useDispatch();
   const selector = useSelector(sliderbarslicePath);
   const navigate =useNavigate()
   const sidebarHandler=()=>{
    dispatch(toggleslider({}))
   }
   const sidebarHandelercollapse=()=>{
    dispatch(collapsedSidebar({}))
   }

   const logout=()=>{
    try {
      localStorage.removeItem("token");
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.log(error)
    }
   }
  return (
    <>
    <header>
      <nav className='flex justify-between items-center shadow-sm'>
        <div className='start'>
          <button className='lg:hidden' onClick={sidebarHandler}>collaps {selector.toggle ? 'yes' :'no'} </button>
          <button className='hidden lg:flex pl-4 ml-3' onClick={sidebarHandelercollapse}><GiHamburgerMenu size={27} /></button>
        </div>
        <div className='end'>
          <button className='pl-4 ml-3' onClick={logout}><IoLogOutOutline size={27} /></button>

        </div>
      </nav>
    </header>
    </>
  )
}

export default Header
