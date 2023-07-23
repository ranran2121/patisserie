import React from "react";
import SweetsList from "@/components/SweetsList";
import { getSweets } from "@/lib/sweets_crud";
import { calcDiscount, choseColor } from "@/lib/utils";
import { SweetType, SweetTypeFe } from "@/types";
import { format } from "date-fns";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import axios from "axios";
import { useRouter } from "next/navigation";

const List = (props: {
  sweetsFe: SweetTypeFe[];
  staleSweets: SweetTypeFe[];
}) => {
  const { sweetsFe, staleSweets } = props;
  const router = useRouter();

  const handleOnClick = async () => {
    try {
      await axios.delete("/api/sweets", { data: { staleSweets } });
      router.refresh();
    } catch (err) {}
  };

  return (
    <div className="md:min-h-[581px] py-4 flex flex-col justify-center mx-auto content-center">
      <div className="w-full md:w-[80%] px-4 mx-auto mb-6 md:text-center relative">
        <h2 className="text-center font-semibold text-2xl inline">
          Our sweets
        </h2>
        {staleSweets.length > 0 && (
          <button
            onClick={handleOnClick}
            className="btn inline absolute top-0 right-2"
          >
            Remove stale
          </button>
        )}
      </div>

      <SweetsList sweetsFe={sweetsFe} />
    </div>
  );
};

export default List;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  let sweetsFe: SweetTypeFe[] | [] = [];
  let staleSweets: SweetTypeFe[] | null = [];
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
        const color = choseColor(discount);

        const sweetFe = { ...sweet, discount, madeAt: sweetDate, color };

        return sweetFe;
      });

      staleSweets = sweetsFe.filter((sweet) => {
        return sweet.discount === 0;
      });
    }

    return {
      props: { session, sweetsFe, staleSweets },
    };
  } catch (e) {
    return {
      props: { session, sweetsFe, staleSweets },
    };
  }
};
