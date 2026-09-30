import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getMe,
  logoutUser,
  refreshToken,
} from "../api/authApi.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);


  // ==========================================
  // LOGIN
  // ==========================================
  const login = useCallback((token, userData) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setAccessToken(token);
    setUser(userData);
  }, []);


  // ==========================================
  // LOGOUT
  // ==========================================
  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      setAccessToken(null);
      setUser(null);
    }
  }, []);


  // ==========================================
  // RESTORE LOGIN
  // ==========================================
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const savedToken =
          localStorage.getItem("accessToken");

        const savedUser =
          localStorage.getItem("user");

        // Local user + token available
        if (savedToken && savedUser) {
          const parsedUser = JSON.parse(savedUser);

          setAccessToken(savedToken);
          setUser(parsedUser);

          // Verify token
          try {
            const data = await getMe(savedToken);

            if (data?.user) {
              setUser(data.user);

              localStorage.setItem(
                "user",
                JSON.stringify(data.user)
              );
            }
          } catch {
            // Access token expired
            try {
              const refreshData =
                await refreshToken();

              if (refreshData?.accessToken) {
                setAccessToken(
                  refreshData.accessToken
                );

                localStorage.setItem(
                  "accessToken",
                  refreshData.accessToken
                );

                const meData = await getMe(
                  refreshData.accessToken
                );

                if (meData?.user) {
                  setUser(meData.user);

                  localStorage.setItem(
                    "user",
                    JSON.stringify(meData.user)
                  );
                }
              }
            } catch {
              localStorage.removeItem(
                "accessToken"
              );

              localStorage.removeItem("user");

              setAccessToken(null);
              setUser(null);
            }
          }
        }
      } catch (error) {
        console.error(
          "Restore session error:",
          error
        );

        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        setAccessToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);


  const value = useMemo(
    () => ({
      user,
      accessToken,
      loading,
      isLoggedIn: Boolean(user && accessToken),
      login,
      logout,
    }),
    [
      user,
      accessToken,
      loading,
      login,
      logout,
    ]
  );


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}


// ==========================================
// useAuth
// ==========================================
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}