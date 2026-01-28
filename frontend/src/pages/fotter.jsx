
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';
const Footer = () => {
  return (
    <div>
      <div className='mt-3'>
      <div className="flex mt-2  p-3 bg-black justify-end items-center m">
              <a > <FaInstagram className="text-white mr-4 cursor-pointer hover:text-blue-500 "style={{ fontSize: '24px' }} /></a> 
              <a> <FaFacebook className="text-white mr-4 cursor-pointer hover:text-blue-500 "style={{ fontSize: '24px' }} /></a> 
              <a >  <FaTiktok className="text-white cursor-pointer hover:text-blue-500 "style={{ fontSize: '24px' }} /></a> 
      </div>
      </div>
    </div>
  )
}

export default Footer
