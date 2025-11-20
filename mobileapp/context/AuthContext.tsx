// app/context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

interface AuthContextProps {
  user: any;
  logout: () => Promise<void>;
}
 
export const AuthContext = createContext<AuthContextProps>({
  user: null,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  const logout = async () => await signOut(auth);

  return <AuthContext.Provider value={{ user, logout }}>{children}</AuthContext.Provider>;
};
