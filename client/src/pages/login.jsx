import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const baseURL = import.meta.env.VITE_BASE_URL;

const Login = () => {
  const navigate = useNavigate();
  const [registerFlag, setRegisterFlag] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageColor, setMessageColor] = useState("text-green-500");

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (registerFlag) {
      try {
        const user = { userName, email, password };
        const responce = await axios.post(`${baseURL}/user/register`, user);
        setMessage(responce.data.message);

        if (responce.status === 201) {
          setRegisterFlag(false);
          setLoading(false);
          setMessageColor("text-green-500");
          setEmail("");
          setUserName("");
          setPassword("");
        }
      } catch (error) {
        setLoading(false);
        setMessageColor("text-red-500");
        if (error.response) {
          setMessage(error.response.data.message || "Something went wrong");
        } else if (error.request) {
          setMessage("No response from server");
        } else {
          setMessage(error.message);
        }
      }
    } else {
      const user = { email, password };
      try {
        const response = await axios.post(`${baseURL}/user/login`, user);
        if (response.status === 200 && response.data.token) {
          localStorage.setItem("authToken", response.data.token);
          navigate("/contact");
        }
      } catch (error) {
        setLoading(false);
        setMessageColor("text-red-500");
        if (error.response) {
          setMessage(error.response.data.message || "Something went wrong");
        } else if (error.request) {
          setMessage("No response from server");
        } else {
          setMessage(error.message);
        }
      }
    }
  };

  return (
    <div className="h-screen bg-[url('/composition-with-telephone.jpg')] bg-cover bg-center flex flex-col justify-center items-center gap-1">
      <div
        onClick={() => navigate("/")}
        className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent drop-shadow-lg cursor-pointer"
      >
        My Contacts
      </div>
      <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-4 w-100">
          <div className="w-full rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight">
                {registerFlag ? "Create an account" : "Login to your account"}
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handelSubmit}>
                {registerFlag && (
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium"
                    >
                      User Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="My name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required={true}
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                )}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="name@company.com"
                    required={true}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required={true}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="flex justify-center items-center gap-4 w-full cursor-pointer bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {registerFlag ? "Create an account" : "Login"}
                  {loading && (
                    <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
                  )}
                </button>
                {message && <p className={`mt-2 ${messageColor}`}>{message}</p>}
                <p className="text-sm font-light">
                  {registerFlag && "Already have an account?"}{" "}
                  <span
                    className="font-medium cursor-pointer text-primary-600 hover:underline"
                    onClick={() => setRegisterFlag(!registerFlag)}
                  >
                    {registerFlag ? " Login here" : "Register here"}
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
