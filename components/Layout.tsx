import { FC } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Roboto } from "next/font/google";

type LayoutProp = {
  children: React.ReactNode;
};

const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});
const Layout: FC<LayoutProp> = ({ children }) => {
  return (
    <div
      className={`${roboto.className} min-h-screen flex flex-col justify-start`}
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
