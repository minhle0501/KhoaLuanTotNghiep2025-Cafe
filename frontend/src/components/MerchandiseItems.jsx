import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

// hiển thị sản phẩm áp dụng trong latestcompilation và bestchoice
const MerchandiseItems = ({ id, image, name, price }) => {

    const { currency } = useContext(ShopContext)

    return (
        <div className='border border-black'>
            <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer'>
                <div className='overflow-hidden'>
                    <img src={image[0]} alt='' className='hover:scale-110 transition ease-in-out' />
                </div>
                <div className='p-2'>
                <p className='pt-3 text-lg text-white'>{name}</p>
                <h1 className='text-sm font-medium text-white'>{currency} {price}</h1>
                </div>
            </Link>
        </div>
    )
}

export default MerchandiseItems