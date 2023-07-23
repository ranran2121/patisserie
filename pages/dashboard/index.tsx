import React from "react";
import SweetForm from "@/components/SweetForm";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

const Dashboard = () => {
  return (
    <div className="md:min-h-[581px] py-4 flex flex-col justify-center mx-auto content-center">
      <SweetForm sweetFe={null} />
    </div>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: { session } };
};
