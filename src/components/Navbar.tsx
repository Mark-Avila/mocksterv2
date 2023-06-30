import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

interface NavLinkProps {
  children: ReactNode;
}

function NavLink({ children }: NavLinkProps) {
  return (
    <li>
      <button className="text-sm font-inter text-slate-400 hover:text-slate-700 transition ease-in-out font-bold">
        {children}
      </button>
    </li>
  );
}

function NavDropdownItem({ children }: NavLinkProps) {
  return (
    <li className="h-8">
      <button className="w-full text-right rounded-md hover:bg-slate-200 hover:text-slate-700 px-2 h-full font-inter text-xs">
        {children}
      </button>
    </li>
  );
}

function Navbar() {
  const [dropdown, setDropdown] = useState(false);

  const handleDropdown = () => setDropdown(!dropdown);

  return (
    <nav className="bg-white flex justify-between shadow-md h-16 px-4 xl:px-20">
      <ul className="h-full w-full flex items-center justify-start">
        <h1 className="font-inter text-xl xl:text-2xl font-bold text-gray-600">
          <span className="text-red-400">Mocks</span>ter
        </h1>
      </ul>
      <ul className="h-full gap-8 w-full flex items-center justify-end">
        <NavLink>Home</NavLink>
        <NavLink>Mocks</NavLink>
        <NavLink>Subjects</NavLink>
        <li className="relative h-full">
          <button onClick={handleDropdown} className="text-slate-400 h-full">
            <FaUser />
          </button>
          {dropdown && (
            <ul className="absolute flex flex-col w-36 -left-28 p-2 text-right rounded-md bg-white mt-4 text-gray-400 text-sm font-bold gap-4">
              <NavDropdownItem>Profile</NavDropdownItem>
              <NavDropdownItem>Settings</NavDropdownItem>
              <NavDropdownItem>Logout</NavDropdownItem>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
