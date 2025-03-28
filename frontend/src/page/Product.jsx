import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

// Sản phẩm giả định để hiển thị khi không tìm thấy sản phẩm từ dữ liệu thực tế
const fakeProduct = {
  _id: "fake123",
  name: "Cà phê thử nghiệm",
  price: "50.000",
  image: [assets.a_cup, assets.a_cup],
  sizes: ["S", "M", "L"],
  description: "Đây là một sản phẩm thử nghiệm. Thêm vào giỏ hàng để kiểm tra chức năng.",
  category: "coffee",
  subCategory: "arabica",
};

const Product = () => {
  // Lấy productId từ URL
  const { productId } = useParams();
  
  // Lấy dữ liệu sản phẩm từ context
  const { products, currency, addToCart } = useContext(ShopContext);
  
  // State để lưu dữ liệu sản phẩm hiện tại
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState(""); // Hình ảnh sản phẩm hiển thị chính
  const [size, setSize] = useState(""); // Kích thước sản phẩm đã chọn

  // useEffect để tìm sản phẩm dựa vào productId
  useEffect(() => {
    const foundProduct = products.find((item) => item._id === productId);
    
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]); // Chọn hình ảnh đầu tiên làm ảnh chính
    } else {
      setProductData(fakeProduct); // Nếu không tìm thấy, dùng sản phẩm giả
      setImage(fakeProduct.image[0]);
    }
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 bg-white text-black transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Hiển thị danh sách ảnh sản phẩm */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt="product"
              />
            ))}
          </div>
          {/* Hiển thị ảnh sản phẩm chính */}
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto" alt="product" />
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>

          {/* Hiển thị đánh giá sao */}
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="star" className="w-3.5" />
            <img src={assets.star_icon} className="w-3.5" />
            <img src={assets.star_icon} className="w-3.5" />
            <img src={assets.star_icon} className="w-3.5" />
            <img src={assets.star_dull_icon} className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>

          {/* Hiển thị giá sản phẩm */}
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>

          {/* Mô tả sản phẩm */}
          <p className="mt-5 text-gray-700 md:w-4/5">{productData.description}</p>

          {/* Chọn kích thước sản phẩm */}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`border py-2 px-4 bg-gray-200 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Nút thêm vào giỏ hàng */}
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-white border text-black px-8 py-3 text-sm active:bg-gray-300"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />

          {/* Chính sách sản phẩm */}
          <div className="text-sm text-gray-700 mt-5 flex flex-col gap-1">
            <p>Sản phẩm có xuất xứ chính hãng 100%.</p>
            <p>Hỗ trợ thanh toán khi nhận hàng cho sản phẩm này.</p>
          </div>
        </div>
      </div>

      {/* Mô tả chi tiết sản phẩm */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm bg-white text-black">chi tiết sản phẩm</b>
          <p className="border px-5 py-3 text-sm bg-white text-black">đánh giá(122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-700">
          <p>
            <b>Thông tin sản phẩm:</b> {productData.description}
          </p>
        </div>
      </div>

      {/* Hiển thị sản phẩm liên quan */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
