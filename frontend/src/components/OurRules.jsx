import React from 'react'
import { assets } from '../assets/assets'

//các chính sách trong home của giao diện
const OurRules = () => {
    return (
        <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>

            <div>
                <img src={assets.exchange_icon} alt='' className='w-12 m-auto mb-5' style={{ filter: 'invert(1)' }} //chỉnh lại màu sắc cho img cho trường hợp ko dùng text-white cho font-awesome
                />
                <p className='font-semibold text-white'>Simple Exchange Policy</p>
                <p className='text-white'>Free exchange for your convenience</p>
            </div>
            <div>
                <img src={assets.quality_icon} alt='' className='w-12 m-auto mb-5 ' />
                <p className='font-semibold text-white'>7 Days Return Policy</p>
                <p className='text-white'>We provide 7 days free return policy</p>
            </div>
            <div>
                <img src={assets.support_img} alt='' className='w-12 m-auto mb-5 ' style={{ filter: 'invert(1)' }} //chỉnh lại màu sắc cho img cho trường hợp ko dùng text-white cho font-awesome
                />
                <p className='font-semibold text-white'>Best customer support</p>
                <p className='text-white'>We provide 24/7 customer support</p>
            </div>

        </div>
    )
}

export default OurRules