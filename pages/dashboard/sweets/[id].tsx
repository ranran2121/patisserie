import SweetForm from "@/components/SweetForm";
import { getSweet } from "@/lib/sweets_crud";
import { calcDiscount } from "@/lib/utils";
import { SweetType, SweetTypeFe } from "@/types";
import { format } from "date-fns";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

const Edit = (props: { sweetFe: SweetTypeFe }) => {
  const { sweetFe } = props;
  return (
    <div className="md:min-h-[581px] py-4 flex flex-col justify-center mx-auto content-center">
      <SweetForm sweetFe={sweetFe} />
    </div>
  );
};

export default Edit;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  let sweetFe: SweetTypeFe | null = null;

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  try {
    const sweet: SweetType | null = await getSweet(Number(context?.params?.id));
    if (sweet) {
      const sweetDate = format(sweet.madeAt, "u-MM-dd");
      const discount = calcDiscount(sweetDate);
      sweetFe = { ...sweet, discount, madeAt: sweetDate };
    }

    return {
      props: { session, sweetFe },
    };
  } catch (e) {
    return {
      props: { session, sweetFe },
    };
  }
};
