import { createContext, useEffect, useState } from "react";

const userContext = createContext();

export function UserProvider({ children }) {
  const [registerdUsers, setRegisterdUser] = useState(() => {
    const saved = localStorage.getItem("csm-registerd-users");
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("csm-user");
    return saved ? JSON.parse(saved) : null;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem("csm-bookings");
    return saved ? JSON.parse(saved) : [];
  });

  // Setup for registrate user using useEffect

  useEffect(() => {
    localStorage.setItem("csm-registerd-users", JSON.stringify(registerdUsers));
  }, [registerdUsers]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("csm-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("csm-user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.getItem("csm-bookings", JSON.stringify(bookings));
  }, [bookings]);

  // registrate user

  const registerUsers = ({ name, email, school, password }) => {
    const exists = registerUsers.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: false, message: "Email is already registrated" };
    }

    const newUser = { name, email, school, password };
    // keep the the list of existing user and add a new with prev - ...prev
    setRegisterdUser((prev) => [...prev, newUser]);
    setUser({ name, email, school });
    return { success: true };
  };

  // give user oppertunity to login with email and password

  const loginUser = (email, password) => {
    const found = registerdUsers.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!found) {
      return { success: false, message: "Wrong password or email" };
    }
    // find user ids(name, email) and password...
    setUser({ name: found.name, email: found.email, school: found.school });
    return { success: true };
  };

  const logoutUser = () => {
    setUser(null);
  };
}
