import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "../features/auth/AuthContext";
import { ThemeProvider } from "../features/theme/ThemeContext";

const AppProviders = ( { children }: { children: ReactNode; } ) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        { children }

        <Toaster
          position="top-right"
          toastOptions={ {
            duration: 2500,
            style: {
              background: "#0f172a",
              color: "#ffffff",
              border: "1px solid #1e293b",
            },
            success: {
              iconTheme: {
                primary: "#22c55e",
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#ffffff",
              },
            },
          } }
        />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default AppProviders;