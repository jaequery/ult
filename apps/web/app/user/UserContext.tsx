"use client";

import { UserById } from "@shared/interfaces";
import { useTrpc } from "@web/contexts/TrpcContext";
import Cookies from "js-cookie";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface UserProviderProps {
  children: ReactNode; // More generic type to allow any valid React child/children
}

export interface UserContextState {
  currentUser: UserById | null; // Explicitly allow for user to be undefined or null
  setCurrentUser: Dispatch<SetStateAction<UserById | null>> | null; // Allow null here
  accessToken: string | null;
  setAccessToken: (accessToken: string, expiresIn: string) => void;
  logout: () => void;
  isAuthenticating: boolean;
}

// Define a default context value that matches the shape of UserContextState
const defaultContextValue: UserContextState = {
  currentUser: null, // Default to null, but now it's explicitly part of the context type
  setCurrentUser: null,
  accessToken: "af",
  setAccessToken: (accessToken: string, expiresIn: string) => {},
  logout: () => {},
  isAuthenticating: true,
};

// Context creation with a default value that matches the expected shape
const UserContext = createContext<UserContextState>(defaultContextValue);

// Provider Component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserById | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true); // Initially true, assuming authentication check is in progress
  const { trpcAsync } = useTrpc();
  const trpcAsyncRef = useRef(trpcAsync);

  useEffect(() => {
    const fetchUser = async () => {
      const tokenFromCookie = Cookies.get("jwtAccessToken");
      if (tokenFromCookie) {
        setIsAuthenticating(true); // Begin authentication check only if token exists
        try {
          const userJwt =
            await trpcAsyncRef.current.userRouter.verifyAccessToken.query({
              accessToken: tokenFromCookie,
            });
          if (userJwt.user.verifiedAt) {
            setCurrentUser(userJwt.user);
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          // Optionally, handle error state here
        }
        setIsAuthenticating(false); // End authentication check
      } else {
        // Immediately consider authentication check complete if no token
        setIsAuthenticating(false);
      }
    };
    fetchUser();
  }, [token, trpcAsyncRef]);

  // Provide both user and setUser to the context value
  const contextValue = {
    currentUser,
    setCurrentUser,
    accessToken: token,
    setAccessToken: (token: string, expiresIn: string) => {
      const expires = parseExpiresIn(expiresIn);
      Cookies.set("jwtAccessToken", token, {
        expires,
        secure: true,
        sameSite: "Strict",
      });
      setToken(token);
    },
    logout: () => {
      setCurrentUser(null);
      setToken(null);
      Cookies.remove("jwtAccessToken", {
        secure: true,
        sameSite: "Strict",
      });
    },
    isAuthenticating,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

// Hook for easy context usage
export const useUserContext = () => useContext(UserContext);

function parseExpiresIn(expiresIn: string) {
  const unit = expiresIn.slice(-1);
  const value = parseInt(expiresIn.slice(0, -1), 10);
  switch (unit) {
    case "h": // hours
      return value / 24; // Convert hours to days
    case "d": // days
      return value;
    default:
      return undefined; // Default case, might be useful to handle 's' for seconds or other formats
  }
}
