import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";

export const Logout: React.FC = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className=" mb-10  p-4 flex justify-between items-center bg-transparent">
      <button
        onClick={handleLogout}
        className="px-14 py-2 bg-[#E08733] font-inter rounded-xl text-white hover:bg-[#794e0a] duration-700"
      >
        Cerrar Sesión
      </button>
    </header>
  );
};
