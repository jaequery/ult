"use client";

import React, { ReactNode, createContext, useContext, useState } from "react";
import { User } from "./User";

interface UserProviderProps {
  children: ReactNode; // More generic type to allow any valid React child/children
}

export interface UserContextState {
  user?: User | null; // Explicitly allow for user to be undefined or null
  setUser?: React.Dispatch<React.SetStateAction<User | null>>; // If you plan to expose setUser
}

// Define a default context value that matches the shape of UserContextState
const defaultContextValue: UserContextState = {
  user: null, // Default to null, but now it's explicitly part of the context type
};

// Context creation with a default value that matches the expected shape
const UserContext = createContext<UserContextState>(defaultContextValue);

// Hook for easy context usage
export const useUserContext = () => useContext(UserContext);

// Provider Component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Provide both user and setUser to the context value
  const contextValue = { user, setUser };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
