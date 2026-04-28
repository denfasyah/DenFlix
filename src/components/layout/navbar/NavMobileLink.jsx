import { Link } from "react-router-dom";

const NavMobileLink = ({ url, title, onClick, className = "" }) => (
  <Link
    to={url}
    onClick={onClick}
    className={`text-white font-bold py-2 border-b border-white/5 last:border-none ${className}`}
  >
    {title}
  </Link>
);

export default NavMobileLink;