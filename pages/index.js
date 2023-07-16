import { useState } from "react";
import Sweet from "@/components/Sweet";
import { getSweets } from "@/lib/sweets_crud";
import { format } from "date-fns";
import Modal from "@/components/Modal";
Modal;

const Home = (props) => {
  const { sweets } = props;
  const [showModal, setShowModal] = useState(false);
  const [sweet, setSweet] = useState(null);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-wrap content-center justify-center height w-screen">
      {sweets.length > 0 &&
        sweets.map((sweet) => {
          return (
            <div
              key={sweet.id}
              id={sweet.id}
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
      {showModal && (
        <Modal showModal={showModal} closeModal={closeModal} sweet={sweet} />
      )}
      {!sweets ||
        (sweets.length == 0 && (
          <p className="capitalize">Baking in progress</p>
        ))}
    </div>
  );
};

export default Home;

export async function getServerSideProps(context) {
  let sweets = await getSweets();
  for (const sweet of sweets) {
    sweet.madeAt = format(sweet.madeAt, "u-MM-dd");
    const discount = calcDiscount(sweet.madeAt);
    sweet.discount = discount;
  }
  sweets = sweets.filter((sweet) => sweet.discount > 0);

  return {
    props: { sweets },
  };
}

function calcDiscount(date) {
  let today = format(new Date(), "u-MM-dd");
  today = new Date(today).getTime();
  let sweetDate = new Date(date).getTime();
  const hoursPassed = (today - sweetDate) / (1000 * 60 * 60);

  if (hoursPassed < 24) {
    return 1;
  }
  if (hoursPassed >= 24 && hoursPassed < 48) {
    return 0.2;
  }
  if (hoursPassed >= 48 && hoursPassed < 72) {
    return 0.8;
  }

  return 0;
}
