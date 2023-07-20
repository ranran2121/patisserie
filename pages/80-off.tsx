import { useState } from "react";
import { getSweets } from "@/lib/sweets_crud";
import { format } from "date-fns";
import { SweetType, SweetTypeFe } from "@/types";
import { calcDiscount } from "../lib/utils";
import ShowcaseMobile from "@/components/ShowcaseMobile";
import Showcase from "@/components/Showcase";
import Message from "@/components/Message";

const EightyOff = (props: { sweetsFe: [] | SweetTypeFe[] }) => {
  const { sweetsFe } = props;

  return (
    <>
      {/* Layout for mobile */}
      <ShowcaseMobile sweetsFe={sweetsFe} />
      {/* Layout for tablet and desktop */}
      <Showcase sweetsFe={sweetsFe} />
      {sweetsFe.length == 0 && <Message message={"baking in progress"} />}
    </>
  );
};

export default EightyOff;

export async function getServerSideProps(context: any) {
  let sweetsFe: SweetTypeFe[] | [] = [];
  try {
    const sweets: SweetType[] | null = await getSweets();

    if (sweets) {
      sweetsFe = sweets
        .map((sweet) => {
          const sweetDate = format(sweet.madeAt, "u-MM-dd");
          const discount = calcDiscount(sweetDate);

          const sweetFe = { ...sweet, discount, madeAt: sweetDate };

          return sweetFe;
        })
        .filter((sweet) => sweet.discount === 0.2);
    }

    return {
      props: { sweetsFe },
    };
  } catch (e) {
    return {
      props: { sweetsFe },
    };
  }
}
