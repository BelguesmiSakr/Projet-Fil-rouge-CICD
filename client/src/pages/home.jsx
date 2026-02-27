import { useNavigate } from "react-router-dom";
import ContactIllustration from "../assets/undraw_connecting-teams_nnjy.svg";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen bg-[url('/concept-composition-with-telephone.jpg')] bg-cover bg-center">
      <div className="flex items-center p-5 justify-between ">
        <div className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent drop-shadow-lg">
          My Contacts
        </div>
        <div
          onClick={() => navigate("/login")}
          className="cursor-pointer text-xl text-gray-700 hover:underline"
        >
          Login/Register
        </div>
      </div>
      <div className="px-20 pt-20">
        <h1 className="text-4xl font-bold mb-2">Welcome to My Contacts</h1>
        <p className="text-2xl text-center text-gray-500 max-w-md mb-6">
          Keep all your contacts organized in one place. Add new friends, update
          details, and manage your network easily.
        </p>
      </div>
      <div className="flex items-center justify-end w-full">
        <img
          src={ContactIllustration}
          alt="Contact illustration"
          className="w-100 h-auto mb-6"
        />
      </div>
    </div>
  );
};

export default Home;
