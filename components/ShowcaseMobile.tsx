import { useState } from "react";
import Sweet from "@/components/Sweet";
import Modal from "@/components/Modal";
import { SweetTypeFe } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Message from "@/components/Message";
import "swiper/css";
import "swiper/css/pagination";

const ShowcaseMobile = (props: { sweetsFe: [] | SweetTypeFe[] }) => {
  const { sweetsFe } = props;
  const [showModal, setShowModal] = useState(false);
  const [sweet, setSweet] = useState<SweetTypeFe | null>(null);

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div className="md:hidden">
      {sweetsFe.length > 0 && (
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          direction="horizontal"
          slideToClickedSlide={true}
          centeredSlides={true}
          pagination={{ clickable: true }}
        >
          {sweetsFe.map((sweet: SweetTypeFe, index) => {
            return (
              <div
                key={String(sweet.id) + sweet.name}
                id={String(sweet.id)}
                onClick={() => {
                  setSweet(sweet);
                  setShowModal(true);
                }}
                className="cursor-pointer"
              >
                <SwiperSlide>
                  <Sweet sweet={sweet} />
                </SwiperSlide>
              </div>
            );
          })}
        </Swiper>
      )}
      {showModal && <Modal closeModal={closeModal} sweet={sweet} />}
    </div>
  );
};

export default ShowcaseMobile;
