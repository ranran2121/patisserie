import { useSession } from "next-auth/react";

const Dahsboard = () => {
  const { data: session, status } = useSession();

  return <div>index</div>;
};

export default Dahsboard;
