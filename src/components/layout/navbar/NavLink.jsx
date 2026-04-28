import { Link } from "react-router-dom";
const NavLink = ({ url, title, navLinkStyle, underlineStyle }) => {
  return (
    <div>
      <Link to={url} className={navLinkStyle}>
        {title} <span className={underlineStyle}></span>
      </Link>
    </div>
  );
};

export default NavLink;
