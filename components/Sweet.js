import Image from "next/image";
import { format } from "date-fns";
import img from "../assets/general_cake.jpeg";

const Sweet = ({ sweet }) => {
  const { name, price, discount } = sweet;

  return (
    <div className="border-2 border-orange-500 rounded-2xl mx-4 my-2 p-4 bg-orange-300 w-60 h-56 flex flex-col content-center text-center">
      <div>
        <h3 className="capitalize font-semibold text-2xl mb-2">{name}</h3>
        <Image
          src={img}
          alt="cake"
          className="m-auto"
          width={100}
          height={24}
        />
      </div>

      <p className="mt-4 capitalize">
        price: {discount ? (price * discount).toFixed(1) : price}$
      </p>
      {discount !== 1 && (
        <p className="bg-yellow-500">{(1 - discount) * 100} % off</p>
      )}
    </div>
  );
};

export default Sweet;
