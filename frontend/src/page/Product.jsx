import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

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
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    } else {
      setProductData(fakeProduct);
      setImage(fakeProduct.image[0]);
    }
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 bg-white text-black transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto" alt="product" />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="star" className="w-3.5" />
            <img src={assets.star_icon} className="w-3.5" />
            <img src={assets.star_icon} className="w-3.5" />
            <img src={assets.star_icon} className="w-3.5" />
            <img src={assets.star_dull_icon} className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-700 md:w-4/5">{productData.description}</p>
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
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-white border text-black px-8 py-3 text-sm active:bg-gray-300"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-700 mt-5 flex flex-col gap-1">
            <p>Sản phẩm chính hãng 100%.</p>
            <p>Hỗ trợ thanh toán khi nhận hàng cho sản phẩm này.</p>
            <p>Chính sách đổi trả dễ dàng trong vòng 7 ngày.</p>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm bg-white text-black">chi tiết sản phẩm</b>
          <p className="border px-5 py-3 text-sm bg-white text-black">đánh giá(122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-700">
          <p>
           Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed quae, doloremque aperiam nihil provident ex, perspiciatis vel placeat accusamus veritatis, distinctio blanditiis reiciendis vero et dicta quidem quibusdam nobis fuga.
          </p>
          <p>
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia repellat itaque dolor earum labore optio accusamus repudiandae officia? Dicta aspernatur dolorum quibusdam sed molestiae eum fugit illum nulla repudiandae dolore!
          </p>
        </div>
      </div>
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
