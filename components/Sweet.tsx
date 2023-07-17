import Image from "next/image";
import img from "../assets/general_cake.jpeg";
import { SweetTypeFe } from "@/types";
import Badge from "./Badge";

const Sweet = (props: { sweet: SweetTypeFe }) => {
  const { sweet } = props;
  const { name, price, discount } = sweet;

  return (
    <div className="border-2 border-color1 rounded-2xl mx-auto mt-4 mb-8 md:mx-4 md:my-2 p-4 bg-color3 w-60 h-56 flex flex-col content-center text-center relative">
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
    </div>
  );
};

export default Sweet;
