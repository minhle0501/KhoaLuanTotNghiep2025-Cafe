import React from 'react'

//label áp dụng trong latestcompilation và bestchoice
const Label = ({text1, text2}) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
        <p className='text-amber-600 text-4xl'>{text1} <span className='text-amber-500 font-medium  text-2xl'>{text2}</span></p>
        <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-white'></p>
    </div>
  )
}
export default Label