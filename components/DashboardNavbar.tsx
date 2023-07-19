import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActive } from "../lib/utils";

const ROUTES = [
  { path: "/", label: "home" },
  { path: "/dashboard", label: "dashboard" },
  { path: "/dashboard/sweets", label: "list" },
];

const DashboardNavbar = () => {
  const pathname = usePathname();

  return (
    <ul className="flex flex-row justify-center text-white gap-6">
      {ROUTES.map((route) => {
        const { label, path } = route;
        return (
          <li
            className={`m-2 uppercase ${isActive(pathname, path)}`}
            key={label}
          >
            <Link href={path}>{label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default DashboardNavbar;
