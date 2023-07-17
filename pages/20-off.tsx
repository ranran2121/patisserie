import { useState } from "react";
import Sweet from "@/components/Sweet";
import { getSweets } from "@/lib/sweets_crud";
import { format } from "date-fns";
import Modal from "@/components/Modal";
import { SweetType, SweetTypeFe } from "@/types";
import { calcDiscount } from "../lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const EightyOff = (props: { sweetsFe: [] | SweetTypeFe[] }) => {
  const { sweetsFe } = props;
  const [showModal, setShowModal] = useState(false);
  const [sweet, setSweet] = useState<SweetTypeFe | null>(null);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
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
            {sweetsFe.map((sweet: SweetTypeFe) => {
              return (
                <div
                  key={sweet.id}
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
      </div>
      <div className="hidden md:flex md:flex-wrap md:content-center md:justify-center md:container md:w-screen">
        {sweetsFe.length > 0 &&
          sweetsFe.map((sweet: SweetTypeFe) => {
            return (
              <div
                key={sweet.id}
                id={String(sweet.id)}
                onClick={() => {
                  setSweet(sweet);
                  setShowModal(true);
                }}
                className="cursor-pointer"
              >
                <Sweet sweet={sweet} />
              </div>
            );
          })}
        {showModal && <Modal closeModal={closeModal} sweet={sweet} />}
        {sweetsFe.length == 0 && (
          <p className="capitalize font-bold text-3xl bg-color2 p-4">
            No sweets at this fare
          </p>
        )}
      </div>
    </>
  );
};

export default EightyOff;

export async function getServerSideProps(context: any) {
  const sweets: SweetType[] | null = await getSweets();
  let sweetsFe: SweetTypeFe[] | [] = [];
  if (sweets) {
    sweetsFe = sweets
      .map((sweet) => {
        const sweetDate = format(sweet.madeAt, "u-MM-dd");
        const discount = calcDiscount(sweetDate);

        const sweetFe = { ...sweet, discount, madeAt: sweetDate };

        return sweetFe;
      })
      .filter((sweet) => sweet.discount === 0.8);
  }

  return {
    props: { sweetsFe },
  };
}
