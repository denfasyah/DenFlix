import { Link } from "react-router-dom";
const NavBrand = ({url}) => {
  return (
    <div>
      <Link
        to={url}
        className="text-denflix-primary text-2xl mr-8 font-extrabold tracking-tighter"
      >
        DENFLIX
      </Link>
    </div>
  );
};

export default NavBrand;
