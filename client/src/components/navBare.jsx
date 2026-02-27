import { FaUserCircle } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const NavBare = ({ userName }) => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <div
      className="sticky top-0 left-0 w-full flex items-center justify-between py-5 px-4 
     backdrop-blur-md bg-white/30 shadow-md border-b border-white/20 z-50"
    >
      <div className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent drop-shadow-lg">
        My Contacts
      </div>
      <div className="flex items-center justify-center gap-2">
        <FaUserCircle className="text-3xl text-blue-500/40" />
        <div>{userName}</div>
        <div className="relative group" onClick={logOut}>
          <IoMdLogOut className="cursor-pointer hover:text-red-500 transition-colors" />
          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default NavBare;
