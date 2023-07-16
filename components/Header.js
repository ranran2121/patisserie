import Navbar from "./Navbar";
import Image from "next/image";
import img from "../assets/logo.jpeg";

const Header = () => {
  return (
    <header className="flex flex-col items-center p-12 bg-orange-400 h-fit">
      <Image
        src={img}
        alt="logo"
        className="dark:invert"
        width={100}
        height={24}
        priority
      />
      <h1 className="mt-4 text-2xl font-semibold">
        Mary & Anne&apos;s patisserie
      </h1>
      <Navbar />
    </header>
  );
};

export default Header;
