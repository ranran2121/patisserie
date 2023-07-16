import SweetForm from "@/components/SweetForm";
import { useSession, getSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session, status } = useSession();
  console.log("SESSION", session);

  return (
    <div className="container flex flex-col justify-center mx-auto content-center">
      <h2 className="text-center font-semibold text-2xl mb-6">
        Create a sweet
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
