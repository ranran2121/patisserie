import { useSession } from "next-auth/react";

const Dahsboard = () => {
  const { data: session, status } = useSession();
  console.log("SESSION", session);
  return <div>index</div>;
};

export default Dahsboard;
