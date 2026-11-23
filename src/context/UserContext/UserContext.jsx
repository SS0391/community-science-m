import { createContext, useState } from "react";

const userContext = createContext();

export function UserProvider({ children }) {
  const [registerdUsers, setRegisterdUser] = useState(() => {
    const saved = localStorage.getItem("csm-registerd-users");
    return saved ? JSON.parse(saved) : [];
  });
}
