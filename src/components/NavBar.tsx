import { FaBell, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-[#5b6520] text-white p-4 h-12 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
        <img
          src="src/assets/army_logo.png"
          alt="Logo"
          className="h-10 w-10 mr-5"
        />
        <h1 className="text-xl font-bold">Sri Lanka Army</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-700 rounded-full">
          <FaBell className="h-6 w-6" />
        </button>
        <button className="p-2 hover:bg-gray-700 rounded-full">
          <FaUserCircle className="h-6 w-6" />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
