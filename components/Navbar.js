import Link from "next/link";
import { useRouter } from "next/router";

const ROUTES = { home: "/", dashboard: "/dashboard" };

const Navbar = () => {
  const router = useRouter();
  function isActive(route) {
    return router.pathname == route ? "active" : "";
  }

  return (
    <ul className="flex flex-row justify-center">
      {/* <li className={`m-2 ${isActive(ROUTES.sweets)}`}>
        <Link href={ROUTES.home}>Sweets</Link>
      </li> */}
      <li className={`m-2 ${isActive(ROUTES.about)}`}>
        <Link href={ROUTES.dashboard}>Login</Link>
      </li>
    </ul>
  );
};

export default Navbar;
