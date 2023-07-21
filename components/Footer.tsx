const Footer = () => {
  return (
    <footer
      className="h-10 bg-color1 text-white text-center w-full pt-2"
      style={{ marginTop: "auto" }}
    >
      Do you like the website?
      <a
        href="mailto:m.hacke@example.com"
        target="_blank"
        rel="noreferrer"
        className="text-color5 font-semibold underline ml-2"
      >
        Email us
      </a>
    </footer>
  );
};

export default Footer;
