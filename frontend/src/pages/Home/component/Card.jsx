import React from 'react'
const Card = ({name,no,icon}) => {
  return (
    <div className='bg-blue-300 flex  w-[20vw] rounded-md px-5 pb-2 pt-1 p m-6 border-2 shadow-lg border-blue-900'>
        <div className='w-[70%]'>
            <div className='font-sans text-3xl'>{name}</div>
            <div className='font-sans text-xl'>{no}</div>
        </div>
        <div className="w-[30%] flex justify-center items-center">
            {icon}
        </div>
      </div>
  )
}

export default Card
