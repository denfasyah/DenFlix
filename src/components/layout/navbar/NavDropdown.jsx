import { AiOutlineCaretDown } from "react-icons/ai";

const NavDropdown = ({ title, children, navLinkStyle, underlineStyle }) => (
  <div className="dropdown dropdown-hover">
    <label tabIndex={0} className={navLinkStyle}>
      {title} <AiOutlineCaretDown className="text-xs" />
      <span className={underlineStyle}></span>
    </label>
    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-2xl bg-denflix-secondary rounded-lg w-52 border border-white/10">
      {children}
    </ul>
  </div>
);

export default NavDropdown;