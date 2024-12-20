import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Pizza_Banner from "../Assets/Images/pizza-banner.webp";
import Fifty_Off_Promo_Banner from "../Assets/Images/50-off-promo-banner.webp";
import Fifty_Off_Discount_banner from "../Assets/Images/50-off-discount-banner.webp";
import Cashabck_Order from "../Assets/Images/cashabck-order.webp";
import Launch_Deal_banner from "../Assets/Images/launch-deal-banner.webp";
import lava_cake from "../Assets/Images/lava-cake.webp";

const images = [
  Pizza_Banner,
  Fifty_Off_Discount_banner,
  Fifty_Off_Promo_Banner,
  Cashabck_Order,
  Launch_Deal_banner,
  lava_cake,
];

const SliderComp = () => {
  return (
    <Swiper
      className="mt-20"
      modules={[Navigation, Autoplay]}
      slidesPerView={1}
      navigation
      speed={1200}
      loop={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: true,
      }}
    >
      {images?.map((image) => (
        <SwiperSlide key={image}>
          <img src={image} alt={image} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SliderComp;
