import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { logout, reset } from "../store";
import { useDispatch } from "react-redux";
import { AppThunkDispatch } from "../main";
import { toast } from "react-toastify";

interface NavLinkProps {
  children: ReactNode;
  to: string;
}

function NavLink({ children, to }: NavLinkProps) {
  return (
    <li>
      <Link
        to={to}
        className="font-inter text-sm font-bold text-slate-400 transition ease-in-out hover:text-slate-700"
      >
        {children}
      </Link>
    </li>
  );
}

interface NavDropdownItem {
  children: ReactNode;
  to?: string;
  onClick?: (e: unknown) => void;
}

function NavDropdownItem({ children, to, onClick }: NavDropdownItem) {
  return (
    <li className="h-8">
      {to ? (
        <Link
          to={to}
          className="flex h-full w-full items-center justify-end rounded-md px-2 text-right font-inter text-xs hover:bg-slate-200 hover:text-slate-700"
        >
          {children}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className="h-full w-full rounded-md px-2 text-right font-inter text-xs hover:bg-slate-200 hover:text-slate-700"
        >
          {children}
        </button>
      )}
    </li>
  );
}

function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  const handleDropdown = () => setDropdown(!dropdown);
  const dispatch = useDispatch<AppThunkDispatch>();

  const handleOnSettings = () => toast.info("Under maintenance");

  return (
    <nav className="flex h-16 flex-shrink-0 justify-between bg-white px-4 shadow-md xl:px-20">
      <ul className="flex h-full w-full items-center justify-start">
        <h1 className="font-inter text-xl font-bold text-gray-600 xl:text-2xl">
          <span className="text-red-400">Mocks</span>ter
        </h1>
      </ul>
      <ul className="flex h-full w-full items-center justify-end gap-8">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/mocks">Mocks</NavLink>
        <NavLink to="/subjects">Subjects</NavLink>
        <li className="relative h-full">
          <button onClick={handleDropdown} className="h-full text-slate-400">
            <FaUser />
          </button>
          {dropdown && (
            <ul className="absolute -left-28 mt-4 flex w-36 flex-col gap-4 rounded-md bg-white p-2 text-right text-sm font-bold text-gray-400 shadow-md">
              <NavDropdownItem to="/profile">Profile</NavDropdownItem>
              <NavDropdownItem onClick={handleOnSettings}>
                Settings
              </NavDropdownItem>
              <NavDropdownItem
                onClick={() => {
                  dispatch(reset());
                  dispatch(logout());
                }}
              >
                Logout
              </NavDropdownItem>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
