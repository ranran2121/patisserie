import React, { useState } from "react";
import Sweet from "@/components/Sweet";
import Modal from "@/components/Modal";
import { SweetTypeFe } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import Message from "@/components/Message";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
          modules={[Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          direction="horizontal"
          slideToClickedSlide={true}
          centeredSlides={true}
          pagination={{ clickable: true }}
          navigation={true}
        >
          {sweetsFe.map((sweet: SweetTypeFe, index) => {
            return (
              <SwiperSlide key={sweet.id} style={{ zIndex: 0 }}>
                <div
                  onClick={() => {
                    setSweet(sweet);
                    setShowModal(true);
                  }}
                >
                  <Sweet sweet={sweet} />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
      {showModal && <Modal closeModal={closeModal} sweet={sweet} />}{" "}
      {sweetsFe.length == 0 && <Message message={"baking in progress"} />}
    </div>
  );
};

export default ShowcaseMobile;
