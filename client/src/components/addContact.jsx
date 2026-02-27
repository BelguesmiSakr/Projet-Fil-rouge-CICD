import { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const baseURL = import.meta.env.VITE_BASE_URL;

const AddContact = ({ user_id, setContacts, setNotification }) => {
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setContact((prev) => ({ ...prev, user_id }));
  }, [user_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(contact);
      const responce = await axios.post(`${baseURL}/contact/add`, contact);
      if (responce.status === 201) {
        setNotification("contact added succefully");
        setLoading(false);
        setContacts((prev) => [
          { ...contact, _id: responce.data._id },
          ...prev,
        ]);
        setContact((prev) => ({
          ...prev,
          firstName: "",
          lastName: "",
          phoneNumber: "",
        }));
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setNotification(error.response.data.message || "Something went wrong");
      } else if (error.request) {
        setNotification("No response from server");
      } else {
        setNotification(error.message);
      }
    }
  };

  return (
    <form
      onSubmit={handelSubmit}
      className="flex justify-between gap-10 w-full mt-5 p-6 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 shadow-lg"
    >
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="firstName"
          id="firstName"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required={true}
          value={contact.firstName}
          onChange={handleChange}
        />
        <label
          htmlFor="firstName"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          First Name
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="lastName"
          id="lastName"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          value={contact.lastName}
          onChange={handleChange}
        />
        <label
          htmlFor="lastName"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Last Name
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="tel"
          pattern="^\+?[0-9 ]*$"
          name="phoneNumber"
          id="phoneNumber"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required={true}
          value={contact.phoneNumber}
          onChange={handleChange}
        />
        <label
          htmlFor="phoneNumber"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Phone Number
        </label>
      </div>
      <button
        type="submit"
        className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        {loading ? (
          <AiOutlineLoading3Quarters className="animate-spin text-3xl text-white" />
        ) : (
          "Add Contact"
        )}
      </button>
    </form>
  );
};

export default AddContact;
