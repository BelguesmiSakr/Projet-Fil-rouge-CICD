import { useEffect, useState, useLayoutEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import NavBare from "../components/navBare";
import AddContact from "../components/addContact";
import ContactCard from "../components/contactCard";
const baseURL = import.meta.env.VITE_BASE_URL;

const ContactManager = () => {
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [FilteredContacts, setFilteredContacts] = useState([]);
  const [notification, setNotification] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useLayoutEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("authToken");
      }
    }
  }, []);

  useEffect(() => {
    if (user?.user_id) {
      axios
        .get(`${baseURL}/contact/${user.user_id}`)
        .then((res) => setContacts(res.data))
        .catch((err) => console.error("Error fetching contacts", err));
    }
  }, [user]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredContacts(contacts);
    } else {
      setFilteredContacts(
        contacts.filter((c) =>
          `${c.firstName} ${c.lastName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, contacts]);

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      setNotification("");
    }, 1500);
    return () => clearTimeout(timer);
  }, [notification]);

  return (
    <div className="h-screen bg-[url('/top-view-blue-monday-concept-composition-with-telephone.jpg')] bg-cover bg-fixed">
      <NavBare userName={user?.userName} />
      {notification && (
        <div
          className={`fixed top-58 z-20 right-8 bg-green-500/50 text-white p-2 shadow-2xl transition-opacity duration-1000 ease-in-out ${
            notification ? "opacity-100" : "opacity-0"
          }`}
        >
          {notification}
        </div>
      )}
      <div className="flex flex-col gap-6 w-full px-2">
        <AddContact
          user_id={user?.user_id}
          setContacts={setContacts}
          setNotification={setNotification}
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search contacts..."
          className="w-full max-w-md px-4 py-2 border-gray-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {FilteredContacts.length ? (
          <div className="flex flex-col gap-6">
            {FilteredContacts.map((contact) => (
              <ContactCard
                key={contact._id}
                contact={contact}
                setContacts={setContacts}
                setNotification={setNotification}
              />
            ))}
          </div>
        ) : (
          <div className="text-4xl text-center">Contact List ...</div>
        )}
      </div>
    </div>
  );
};

export default ContactManager;
