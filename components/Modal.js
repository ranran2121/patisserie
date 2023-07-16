const Modal = ({ closeModal, sweet }) => {
  return (
    <div className="modal">
      <section className="modal_main">
        <h5 className="font-semibold underline">Ingredients:</h5>
        <ul className="italic">
          {sweet.ingredients.map((ingredient) => {
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
