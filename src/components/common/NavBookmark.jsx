import { Link } from "react-router-dom";
import { FaRegBookmark } from "react-icons/fa";
const NavBookmark = () => {
  return (
    <div>
        <Link
            to="/bookmark"
            className="text-white hover:text-denflix-primary transition-colors text-xl"
            title="Bookmarks"
          >
            <FaRegBookmark />
          </Link>
    </div>
  )
}

export default NavBookmark