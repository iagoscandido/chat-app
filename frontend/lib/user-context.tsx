"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface IUserContext {
  userId: string | null;
  userName: string | null;
  login: (id: string, name: string) => void;
  logout: () => void;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem("english_partner_user_id");
    const storedName = localStorage.getItem("english_partner_user_name");
    if (storedId && storedName) {
      setTimeout(() => {
        setUserId(storedId);
        setUserName(storedName);
      }, 0);
    }
  }, []);

  const login = (id: string, name: string) => {
    localStorage.setItem("english_partner_user_id", id);
    localStorage.setItem("english_partner_user_name", name);
    setUserId(id);
    setUserName(name);
  };

  const logout = () => {
    localStorage.removeItem("english_partner_user_id");
    localStorage.removeItem("english_partner_user_name");
    setUserId(null);
    setUserName(null);
  };

  return (
    <UserContext.Provider value={{ userId, userName, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
