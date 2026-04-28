import { Link } from "react-router-dom";
const NavList = ({ url, title}) => {
  return (
    <div>
      <li>
        <Link
          to={url}
          className="text-white hover:text-denflix-primary"
        >
          {title}
        </Link>
      </li>
    </div>
  );
};

export default NavList;
