import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  return (
    <ul className="flex flex-row justify-center text-white gap-2 md:gap-6 w-screen md:w-auto">
      {ROUTES.map((route) => {
        const { label, path } = route;
        return (
          <li
            className={`m-2 uppercase text-sm md:text-xl ${isActive(
              pathname,
              path
            )}`}
            key={label}
          >
            <Link href={path}>{label}</Link>
          </li>
        );
      })}
      {session && (
        <li
          className={`m-2 uppercase text-sm md:text-xl ${isActive(
            pathname,
            PVTROUTE.path
          )}`}
        >
          <Link href={PVTROUTE.path}>{PVTROUTE.label}</Link>
        </li>
      )}
    </ul>
  );
};

export default Navbar;
