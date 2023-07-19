import Link from "next/link";
import { useRouter } from "next/router";
import { isActive } from "../lib/utils";

const ROUTES = [
  { path: "/", label: "home" },
  { path: "/dashboard", label: "dashboard" },
  { path: "/dashboard/sweets", label: "list" },
];

const DashboardNavbar = () => {
  const router = useRouter();

  return (
    <ul className="flex flex-row justify-center text-white gap-6">
      {ROUTES.map((route, index) => {
        const { label, path } = route;
        return (
          <li
            className={`m-2 uppercase ${isActive(router.pathname, path)}`}
            key={index}
          >
            <Link href={path}>{label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default DashboardNavbar;
