import Sweet from "@/components/Sweet";
import { getSweets } from "@/lib/sweets_crud";
import { format } from "date-fns";

const Home = (props) => {
  const { sweets } = props;

  return (
    <div className="flex flex-wrap content-center justify-center md:min-h-[581px]">
      {sweets.length > 0 &&
        sweets.map((sweet) => {
          return (
            <div key={sweet.id}>
              <Sweet sweet={sweet} />
            </div>
          );
        })}
      {!sweets && <p>working</p>}
    </div>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const sweets = await getSweets();
  for (const sweet of sweets) {
    sweet.madeAt = format(sweet.madeAt, "u-MM-dd");
    const discount = calcDiscount(sweet.madeAt);
    sweet.discount = discount;
  }

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
