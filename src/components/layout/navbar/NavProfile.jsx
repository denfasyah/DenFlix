import { Link } from "react-router-dom";
import { AiOutlineUser} from "react-icons/ai";
const NavProfile = ({onLogout}) => {
  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-ghost btn-circle avatar border-2 border-transparent hover:border-denflix-primary transition-all"
      >
        <div className="w-10 rounded-full bg-denflix-primary flex items-center justify-center">
          <AiOutlineUser className="text-black text-2xl" />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="mt-3 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-denflix-secondary rounded-lg w-52 border border-white/10"
      >
        <li>
          <Link to="/profile" className="text-white py-2">
            My Profile
          </Link>
        </li>
        <li>
          <Link to="/settings" className="text-white py-2">
            Settings
          </Link>
        </li>
        <hr className="border-white/10 my-1" />
        <li>
          <button
            onClick={onLogout}
            className="text-red-500 py-2 font-bold"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default NavProfile;
