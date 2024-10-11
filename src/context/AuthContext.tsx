"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getUser } from "@/actions/user/getUser";
import { logoutUser } from "@/actions/user/logoutUser"; // Include this for logout action

interface AuthUser {
  success: boolean;
  message?: string;
  user?: {
    name: string;
    email: string;
  };
  error?: string;
}

interface AuthContextProps {
  authUser: AuthUser | null;
  refreshUser: () => Promise<void>;
  loginUser: (user: AuthUser) => void; // Login handler
  logoutUser: () => Promise<void>; // Logout handler
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  const refreshUser = async () => {
    const result: AuthUser = await getUser();
    if (result.success && result.user) {
      setAuthUser(result);
    } else {
      setAuthUser(null);
    }
  };

  const loginUser = (user: AuthUser) => {
    setAuthUser(user); // Set user on login
  };

  const handleLogout = async () => {
    await logoutUser(); // Call server action
    setAuthUser(null); // Clear user on logout
  };

  useEffect(() => {
    refreshUser(); // Fetch user on mount
  }, []);

  return (
    <AuthContext.Provider
      value={{ authUser, refreshUser, loginUser, logoutUser: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
