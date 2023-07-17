import Link from "next/link";
import Navbar from "./Navbar";
import Image from "next/image";
import img from "../assets/logo.jpeg";

const Header = () => {
  return (
    <header className="flex flex-col items-center p-12 bg-color2 h-fit">
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
      <Navbar />
    </header>
  );
};

export default Header;
