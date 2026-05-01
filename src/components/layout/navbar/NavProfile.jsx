import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";

const NavProfile = ({ user, onLogout }) => {
  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-ghost btn-circle avatar border-2 border-transparent hover:border-denflix-primary transition-all shadow-lg"
      >
        <div className="w-10 rounded-full bg-neutral flex items-center justify-center overflow-hidden">
          {user?.photoURL ? (
            <img 
              src={user.photoURL} 
              alt={user.displayName || "User Profile"} 
              referrerPolicy="no-referrer"
            />
          ) : (
            <AiOutlineUser className="text-white text-2xl" />
          )}
        </div>
      </label>
      
      <ul
        tabIndex={0}
        className="mt-3 z-[1] p-3 shadow-2xl menu menu-sm dropdown-content bg-black/90 backdrop-blur-xl rounded-xl w-60 border border-white/10"
      >
        <div className="px-4 py-2 mb-2 border-b border-white/5">
          <p className="text-white font-bold truncate">{user?.displayName || "User"}</p>
          <p className="text-gray-400 text-xs truncate">{user?.email}</p>
        </div>

        <li>
          <Link to="/profile" className="text-white py-2 hover:bg-white/10 transition-colors">
            My Profile
          </Link>
        </li>
        <li>
          <Link to="/settings" className="text-white py-2 hover:bg-white/10 transition-colors">
            Settings
          </Link>
        </li>
        
        <div className="divider before:bg-white/5 after:bg-white/5 my-1"></div>
        
        <li>
          <button
            onClick={onLogout}
            className="text-red-500 py-2 font-bold hover:bg-red-500/10 transition-colors"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default NavProfile;