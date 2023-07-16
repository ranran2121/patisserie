import SweetForm from "@/components/SweetForm";
import { getSession } from "next-auth/react";

const Dashboard = () => {
  return (
    <div className="container flex flex-col justify-center mx-auto content-center">
      <h2 className="text-center font-semibold text-2xl mb-6">
        Let&apos;s Create a sweet
      </h2>
      <SweetForm />
    </div>
  );
};

export default Dashboard;

export async function getServerSideProps(context) {
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
}
