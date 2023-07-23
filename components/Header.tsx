import React from "react";
import Link from "next/link";
import Navbar from "./Navbar";
import Image from "next/image";
import img from "../assets/logo.jpeg";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import DashboardNavbar from "./DashboardNavbar";

const Header = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <header className="flex flex-col items-center py-8 bg-color2 h-fit relative">
      <Link href="/">
        <Image
          src={img}
          alt="logo"
          className="dark:invert"
          width={100}
          height={24}
          priority
        />
      </Link>
      <h1 className="mt-4 text-2xl font-semibold text-center">
        Mary & Luana&apos;s patisserie
      </h1>
      {pathname.includes("dashboard") ? <DashboardNavbar /> : <Navbar />}

      {!session ? (
        <Link href="/login" className="login-btn">
          Login
        </Link>
      ) : (
        <button
          className="login-btn"
          onClick={() =>
            signOut({
              callbackUrl: `${window.location.origin}/api/auth/logout`,
            })
          }
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
