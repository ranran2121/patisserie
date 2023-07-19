import SweetsList from "@/components/SweetsList";
import { getSweets } from "@/lib/sweets_crud";
import { calcDiscount } from "@/lib/utils";
import { SweetType, SweetTypeFe } from "@/types";
import { format } from "date-fns";
import { GetSessionParams, getSession } from "next-auth/react";

const List = (props: { sweetsFe: SweetTypeFe[] }) => {
  const { sweetsFe } = props;
  return (
    <div className="md:min-h-[581px] py-4 flex flex-col justify-center mx-auto content-center">
      <h2 className="text-center font-semibold text-2xl mb-6">Our sweets</h2>
      <SweetsList sweetsFe={sweetsFe} />
    </div>
  );
};

export default List;

export async function getServerSideProps(
  context: GetSessionParams | undefined
) {
  const session = await getSession(context);
  let sweetsFe: SweetTypeFe[] | [] = [];

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  try {
    const sweets: SweetType[] | null = await getSweets();

    if (sweets) {
      sweetsFe = sweets.map((sweet) => {
        const sweetDate = format(sweet.madeAt, "u-MM-dd");
        const discount = calcDiscount(sweetDate);

        const sweetFe = { ...sweet, discount, madeAt: sweetDate };

        return sweetFe;
      });
    }

    return {
      props: { session, sweetsFe },
    };
  } catch (e) {
    return {
      props: { session, sweetsFe },
    };
  }
}
