import { FC } from "react";
import Footer from "./Footer";
import Header from "./Header";

type LayoutProp = {
  children: React.ReactNode;
};

const Layout: FC<LayoutProp> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
