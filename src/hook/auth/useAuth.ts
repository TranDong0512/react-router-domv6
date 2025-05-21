/** @format */

import { useState, useEffect } from "react";

interface AuthState {
  isAuthenticated: boolean;
  user: {
    email: string;
  } | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>(() => {
    if (typeof window !== "undefined") {
      const storedAuth = localStorage.getItem("auth");
      if (storedAuth) {
        return JSON.parse(storedAuth);
      }
    }
    return { isAuthenticated: false, user: null };
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth", JSON.stringify(authState));
    }
  }, [authState]);

  const login = async (email: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    setAuthState({
      isAuthenticated: true,
      user: { email },
    });
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
    });
  };

  return {
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    login,
    logout,
  };
}
