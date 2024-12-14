import { useNavigate } from "react-router-dom";
import ProfileIcon from "../assets/icons/ProfileIcon";
import store from "../store";
import { loginAction } from "../store/slices/auth";
import { useSelector } from "react-redux";

const Navbar = () => {
  const auth_data = useSelector((state) => state.auth.auth_data);
  const navigate = useNavigate();

  function handleLogOut() {
    localStorage.removeItem("pocketbase_auth");
    store.dispatch(loginAction({ token: null }));
    navigate("/login");
    window.location.reload();
  }

  return (
    <nav className="flex flex-row justify-between items-center px-4 py-3 border-b-2 border-b-[#0a3a40] sticky bg-[#000]/30 shadow-xl backdrop-blur-3xl top-0 z-10">
      <span onClick={() => navigate("/feed")} className="cursor-pointer">
        Лента
      </span>
      <div className="flex flex-row gap-4 items-center">
        <div
          onClick={() => navigate(`/profile?id=${auth_data.id}`)}
          className="w-6 h-6 cursor-pointer"
        >
          <ProfileIcon />
        </div>
        <button
          className="border border-[#0a3a40] rounded-lg px-3 py-1 bg-[#0a3a40] text-[#fff]"
          onClick={handleLogOut}
        >
          Выйти
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
