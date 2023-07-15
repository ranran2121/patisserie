import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

const ROUTES = { home: "/", dashboard: "/dashboard", login: "/login" };

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  function isActive(route) {
    return router.pathname == route ? "active" : "";
  }

  return (
    <ul className="flex flex-row justify-center">
      {/* <li className={`m-2 ${isActive(ROUTES.sweets)}`}>
        <Link href={ROUTES.home}>Sweets</Link>
      </li> */}
      <li className={`m-2 ${isActive(ROUTES.login)}`}>
        {!session ? (
          <Link href={ROUTES.login}>Login</Link>
        ) : (
          <button
            onClick={() =>
              signOut({
                callbackUrl: `${window.location.origin}/api/auth/logout`,
              })
            }
          >
            Logout
          </button>
        )}
      </li>
    </ul>
  );
};

export default Navbar;
