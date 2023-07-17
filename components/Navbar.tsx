import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { isActive } from "../lib/utils";

const ROUTES = [
  { path: "/", label: "home" },
  { path: "/20-off", label: "20% off" },
  { path: "/80-off", label: "80% off" },
];
const PVTROUTE = { path: "/dashboard", label: "dashboard" };

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <ul className="flex flex-row justify-center text-white gap-6 w-screen md:w-auto">
      {ROUTES.map((route, index) => {
        const { label, path } = route;
        return (
          <li className={`m-2 ${isActive(router.pathname, path)}`} key={index}>
            <Link href={path}>{label}</Link>
          </li>
        );
      })}
      {session && (
        <li className={`m-2 ${isActive(router.pathname, PVTROUTE.path)}`}>
          <Link href={PVTROUTE.path}>{PVTROUTE.label}</Link>
        </li>
      )}
    </ul>
  );
};

export default Navbar;
