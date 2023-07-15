import { useSession } from "next-auth/react";

const Home = () => {
  const { data: session, status } = useSession();
  console.log("SESSION", session);
  return <div className="flex flex-wrap"></div>;
};

export default Home;
