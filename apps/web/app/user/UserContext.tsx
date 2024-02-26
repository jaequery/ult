"use client";

import { User } from "@prisma/client";
import React, { ReactNode, createContext, useContext, useState } from "react";

interface UserProviderProps {
  children: ReactNode; // More generic type to allow any valid React child/children
}

export interface UserContextState {
  currentUser?: User | null; // Explicitly allow for user to be undefined or null
  setCurrentUser?: React.Dispatch<React.SetStateAction<User | null>>; // If you plan to expose setUser
}

// Define a default context value that matches the shape of UserContextState
const defaultContextValue: UserContextState = {
  currentUser: null, // Default to null, but now it's explicitly part of the context type
};

// Context creation with a default value that matches the expected shape
const UserContext = createContext<UserContextState>(defaultContextValue);

// Hook for easy context usage
export const useUserContext = () => useContext(UserContext);

// Provider Component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Provide both user and setUser to the context value
  const contextValue = { currentUser, setCurrentUser };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
