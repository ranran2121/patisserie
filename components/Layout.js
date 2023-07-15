import Footer from "./Footer";
import Header from "./Header";

const Layout = (props) => {
  const { children, routes, meta, location } = props;

  return (
    <>
      <Header />
      {children}
      <Footer routes={routes} />
    </>
  );
};

export default Layout;
