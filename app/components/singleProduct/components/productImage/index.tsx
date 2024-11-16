import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface ProductImageProps {
  imageUrl: string;
  discountTag?: number | null;
  title: string;
}

const ProductImage: React.FC<ProductImageProps> = ({
  imageUrl,
  discountTag,
  title,
}) => (
  <Swiper className="w-full" spaceBetween={50} slidesPerView={1}>
    <SwiperSlide>
      <div className=" w-[600px] h-full">
        <img
          src={imageUrl || "/api/placeholder/600/600"}
          alt={title || "Product Image"}
          className="w-full h-full  object-center"
        />
        {discountTag && discountTag > 0 && (
          <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {discountTag}% OFF
          </span>
        )}
      </div>
    </SwiperSlide>
  </Swiper>
);

export default ProductImage;
