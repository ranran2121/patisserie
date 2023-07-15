import Footer from "./Footer";
import Header from "./Header";

const Layout = (props) => {
  const { children, routes, meta, location } = props;

  return (
    <div className="flex flex-col h-screen content-between relative">
      <Header />
      {children}
      <Footer routes={routes} />
    </div>
  );
};

export default Layout;
