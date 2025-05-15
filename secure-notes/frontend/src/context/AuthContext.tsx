// src/context/AuthContext.tsx
import React, { createContext, useContext, useState } from "react";
import { login as apiLogin, register as apiRegister } from "../api/auth";

interface AuthContextType {
  token: string | null;
  login: (u: string, p: string) => Promise<void>;
  register: (u: string, p: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  const login = async (u: string, p: string) => {
    const res = await apiLogin(u, p);
    setToken(res.data.token);
    localStorage.setItem("token", res.data.token);
  };

  const register = async (u: string, p: string) => {
    await apiRegister(u, p);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
