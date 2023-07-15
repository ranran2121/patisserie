//import { SunIcon } from "@heroicons/react/24/solid";

const Footer = () => {
  return (
    <footer className="h-10 bg-orange-500 text-white text-center absolute bottom-0 left-0 w-full">
      Do you like the website?
      <a
        href="mailto:m.hacke@example.com"
        target="_blank"
        rel="noreferrer"
        className="text-color5 font-semibold underline ml-2"
      >
        Email us
        {/* <SunIcon className="h-6 w-6 ml-2 inline text-color5 animate-pulse hover:scale-150" /> */}
      </a>
    </footer>
  );
};

export default Footer;
