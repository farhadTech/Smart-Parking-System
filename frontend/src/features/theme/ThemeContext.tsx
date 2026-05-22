import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "dark" | "light";

type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: ( theme: Theme ) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>( undefined );

const THEME_KEY = "smart_parking_theme";

export const ThemeProvider = ( { children }: { children: ReactNode; } ) => {
  const [ theme, setThemeState ] = useState<Theme>( "dark" );

  const applyTheme = ( value: Theme ) => {
    setThemeState( value );
    localStorage.setItem( THEME_KEY, value );

    if ( value === "dark" ) {
      document.documentElement.classList.add( "dark" );
    } else {
      document.documentElement.classList.remove( "dark" );
    }
  };

  useEffect( () => {
    const savedTheme = localStorage.getItem( THEME_KEY ) as Theme | null;
    applyTheme( savedTheme || "dark" );
  }, [] );

  const toggleTheme = () => {
    applyTheme( theme === "dark" ? "light" : "dark" );
  };

  return (
    <ThemeContext.Provider
      value={ {
        theme,
        isDark: theme === "dark",
        toggleTheme,
        setTheme: applyTheme,
      } }
    >
      { children }
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext( ThemeContext );

  if ( !context ) {
    throw new Error( "useTheme must be used inside ThemeProvider" );
  }

  return context;
};
