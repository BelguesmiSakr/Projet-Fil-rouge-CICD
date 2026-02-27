import { useState, useEffect } from "react";
import { LuPencilLine } from "react-icons/lu";
import { MdDeleteForever } from "react-icons/md";
import { FaCheckSquare } from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const ContactCard = ({ contact, setContacts, setNotification }) => {
  const [update, setUpdate] = useState(false);
  const [currenContact, setCurrenContact] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  useEffect(
    () =>
      setCurrenContact({
        firstName: contact.firstName,
        lastName: contact.lastName,
        phoneNumber: contact.phoneNumber,
      }),
    [contact]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrenContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handelUpdateCancel = () => {
    setCurrenContact({
      firstName: contact.firstName,
      lastName: contact.lastName,
      phoneNumber: contact.phoneNumber,
    });
    setUpdate(false);
  };

  const handelUpdate = async (e) => {
    e.preventDefault();
    try {
      const responce = await axios.patch(
        `${baseURL}/contact/${contact._id}`,
        currenContact
      );
      if (responce.status === 200) {
        setNotification("contact updated succefully");
        setUpdate(false);
      }
    } catch (error) {
      if (error.response) {
        setNotification(error.response.data.message || "Something went wrong");
      } else if (error.request) {
        setNotification("No response from server");
      } else {
        setNotification(error.message);
      }
    }
  };

  const handelDelete = async () => {
    try {
      const responce = await axios.delete(`${baseURL}/contact/${contact._id}`);
      if (responce.status === 200) {
        setNotification("contact deleted succefully");
        setContacts((prev) => prev.filter((item) => item._id !== contact._id));
      }
    } catch (error) {
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
      onSubmit={handelUpdate}
      className="flex justify-between gap-10 w-full p-3 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 shadow-lg"
    >
      <div className="relative z-0 w-full mb-2 group">
        {update ? (
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required={true}
            value={currenContact.firstName}
            onChange={handleChange}
          />
        ) : (
          <div className="pt-2">{currenContact.firstName}</div>
        )}
        <label
          htmlFor="firstName"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          First Name
        </label>
      </div>
      <div className="relative z-0 w-full mb-2 group">
        {update ? (
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={currenContact.lastName}
            onChange={handleChange}
          />
        ) : (
          <div className="pt-2">{currenContact.lastName || "- - -"}</div>
        )}
        <label
          htmlFor="lastName"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Last Name
        </label>
      </div>
      <div className="relative z-0 w-full mb-2 group">
        {update ? (
          <input
            type="tel"
            pattern="^\+?[0-9 ]*$"
            name="phoneNumber"
            id="phoneNumber"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required={true}
            value={currenContact.phoneNumber}
            onChange={handleChange}
          />
        ) : (
          <div className="pt-2">{currenContact.phoneNumber}</div>
        )}
        <label
          htmlFor="phoneNumber"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Phone Number
        </label>
      </div>
      {!update && (
        <div className="flex items-center gap-1.5">
          <LuPencilLine
            onClick={() => setUpdate(true)}
            title="Update contact"
            className="text-2xl cursor-pointer hover:text-blue-500 text-blue-400 transition-colors"
          />
          <MdDeleteForever
            onClick={handelDelete}
            title="Delete contact permanently"
            className="text-2xl cursor-pointer hover:text-red-500 text-red-400 transition-colors"
          />
        </div>
      )}
      {update && (
        <div className="flex gap-1.5">
          <button type="submit">
            <FaCheckSquare
              title="Confirm update"
              className="text-2xl cursor-pointer hover:text-green-500 text-green-400 transition-colors"
            />
          </button>
          <button>
            <MdCancelPresentation
              onClick={handelUpdateCancel}
              title="Cancel update"
              className="text-2xl cursor-pointer hover:text-red-500 text-red-400 transition-colors"
            />
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactCard;
