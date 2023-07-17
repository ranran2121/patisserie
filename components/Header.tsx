import Link from "next/link";
import Navbar from "./Navbar";
import Image from "next/image";
import img from "../assets/logo.jpeg";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import DashboardNavbar from "./DashboardNavbar";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <header className="flex flex-col items-center p-12 bg-color2 h-fit relative">
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
      <h1 className="mt-4 text-2xl font-semibold">
        Mary & Luana&apos;s patisserie
      </h1>
      {router.pathname === "/dashboard" ? <DashboardNavbar /> : <Navbar />}

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
