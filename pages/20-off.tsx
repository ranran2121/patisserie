import { useState } from "react";
import Sweet from "@/components/Sweet";
import { getSweets } from "@/lib/sweets_crud";
import { format } from "date-fns";
import Modal from "@/components/Modal";
import { SweetType, SweetTypeFe } from "@/types";
import { calcDiscount } from "../lib/utils";

const TwentyOff = (props: { sweetsFe: [] | SweetTypeFe[] }) => {
  const { sweetsFe } = props;
  const [showModal, setShowModal] = useState(false);
  const [sweet, setSweet] = useState<SweetTypeFe | null>(null);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-wrap content-center justify-center height w-screen">
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
          Baking in progress
        </p>
      )}
    </div>
  );
};

export default TwentyOff;

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
