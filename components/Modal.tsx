import React from "react";
import { SweetTypeFe } from "@/types";

const Modal = (props: {
  closeModal: () => void;
  sweet: SweetTypeFe | null;
}) => {
  const { closeModal, sweet } = props;
  return (
    <div className="modal">
      <section className="modal_main">
        <h2 className="uppercase text-xl md:text-3xl bg-color2 p-4 w-[60%] mx-auto">
          {sweet?.name}
        </h2>
        <p className="font-semibold underline">Ingredients:</p>
        <ul className="italic">
          {sweet?.ingredients.map((ingredient: { name: string }) => {
            return <li key={ingredient.name}>{ingredient.name}</li>;
          })}
        </ul>
        <button className="btn mt-6" type="button" onClick={closeModal}>
          Close
        </button>
      </section>
    </div>
  );
};

export default Modal;
