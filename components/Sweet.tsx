import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import img from "../assets/general_cake.png";
import { SweetTypeFe } from "@/types";
import Badge from "./Badge";

const Sweet = (props: {
  sweet: SweetTypeFe;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setSweet: Dispatch<SetStateAction<SweetTypeFe | null>>;
}) => {
  const { sweet, setShowModal, setSweet } = props;
  const { name, price, discount, quantity } = sweet;

  return (
    <div
      className="border-2 border-color1 rounded-2xl mx-auto mt-4 mb-8 md:mx-4 md:my-2 p-4 bg-color3 w-60 h-60 flex flex-col content-center text-center relative"
      onClick={() => {
        setSweet(sweet);
        setShowModal(true);
      }}
    >
      <div>
        {discount !== 1 && <Badge discount={discount} />}
        <h3 className="capitalize font-semibold text-2xl mb-2">{name}</h3>
        <Image
          src={img}
          alt="cake"
          className="mx-auto"
          width={100}
          height={24}
        />
      </div>

      <p className={`mt-4 capitalize ${discount !== 1 ? "line-through" : ""}`}>
        price: {price}$
      </p>
      {discount !== 1 && (
        <p className="bg-color4">Now: {(price * discount).toFixed(1)}$</p>
      )}
      <p className="text-xs">{quantity} available</p>
    </div>
  );
};

export default Sweet;
