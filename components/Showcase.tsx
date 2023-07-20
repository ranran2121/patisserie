import { useState } from "react";
import Sweet from "@/components/Sweet";
import Modal from "@/components/Modal";
import { SweetTypeFe } from "@/types";
import Message from "@/components/Message";

const Showcase = (props: { sweetsFe: [] | SweetTypeFe[] }) => {
  const { sweetsFe } = props;
  const [showModal, setShowModal] = useState(false);
  const [sweet, setSweet] = useState<SweetTypeFe | null>(null);

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div className="hidden md:flex md:flex-wrap md:content-center md:justify-center md:min-h-[581px] py-4 md:w-screen">
      {sweetsFe.length > 0 &&
        sweetsFe.map((sweet: SweetTypeFe) => {
          return (
            <div
              key={String(sweet.id)}
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
      {sweetsFe.length == 0 && <Message message={"baking in progress"} />}
    </div>
  );
};

export default Showcase;
