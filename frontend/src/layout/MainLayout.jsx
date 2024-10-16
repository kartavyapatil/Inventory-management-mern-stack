import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
 import { useDispatch, useSelector } from 'react-redux'
 import { toggleslider, sliderbarslicePath } from '../slice/sliderbar.slice';
 import { MdSpaceDashboard } from "react-icons/md";
 import { FaFileInvoice } from "react-icons/fa6";
 import { IoIosArrowForward } from "react-icons/io";
 import { IoIosArrowBack } from "react-icons/io";
 import { Link } from 'react-router-dom';
 import { FiBox } from "react-icons/fi";
 import { MdOutlineShoppingCart } from "react-icons/md";
 import { FaUserEdit } from "react-icons/fa";
const MainLayout = ({ children }) => {
    const selector = useSelector(sliderbarslicePath);
    const dispatch=useDispatch()
  return (
    <>
    <div className='flex'>
    <Sidebar collapsed={selector.collapsed} breakPoint='lg' toggled={selector.toggle}>
  <Menu>
    {/* <SubMenu label="Charts" >
      <MenuItem> Pie charts </MenuItem>
      <MenuItem> Line charts </MenuItem>
    </SubMenu> */}
    <MenuItem className='lg:hidden' onClick={()=>dispatch(toggleslider())}>{selector.toggle ?<IoIosArrowBack />:<IoIosArrowForward />}</MenuItem>
    <MenuItem component={<Link to="/"/>} icon={<MdSpaceDashboard size={27} />}> DashBord </MenuItem>
    <MenuItem component={<Link to="/product"/>} icon={<MdOutlineShoppingCart  size={27} />}> Product </MenuItem>
    <MenuItem component={<Link to="/order"/>} icon={<FiBox size={27} />}> Order </MenuItem>
    <MenuItem component={<Link to="/user"/>} icon={<FaUserEdit size={27} />}> User </MenuItem>
    <MenuItem component={<Link to="/about"/>} icon={<FaFileInvoice size={27} />}> About </MenuItem>
  </Menu>
</Sidebar>
    <div className='w-full'>
        {children}
    </div >

    </div>
    </>
  );
};

export default MainLayout;
