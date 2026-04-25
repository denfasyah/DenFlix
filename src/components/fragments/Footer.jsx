const Footer = () => {
  return (
    <div>
      <footer className="bottom-0 left-0 w-full mt-10 footer footer-center bg-denflix-secondary text-denflix-primary p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by Adent
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
