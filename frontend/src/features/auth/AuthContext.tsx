import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { AuthResponse, AuthUser } from "../../types/auth.types";

type AuthContextType = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  saveAuth: ( auth: AuthResponse ) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>( undefined );

const TOKEN_KEY = "smart_parking_token";
const USER_KEY = "smart_parking_user";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ( { children }: AuthProviderProps ) => {
  const [ user, setUser ] = useState<AuthUser | null>( null );
  const [ token, setToken ] = useState<string | null>( null );
  const [ isLoading, setIsLoading ] = useState( true );

  const saveAuth = ( auth: AuthResponse ) => {
    localStorage.setItem( TOKEN_KEY, auth.token );
    localStorage.setItem( USER_KEY, JSON.stringify( auth.user ) );

    setToken( auth.token );
    setUser( auth.user );
  };

  const logout = () => {
    localStorage.removeItem( TOKEN_KEY );
    localStorage.removeItem( USER_KEY );

    setToken( null );
    setUser( null );

    window.location.href = "/login";
  };

  useEffect( () => {
    const storedToken = localStorage.getItem( TOKEN_KEY );
    const storedUser = localStorage.getItem( USER_KEY );

    if ( storedToken && storedUser ) {
      try {
        setToken( storedToken );
        setUser( JSON.parse( storedUser ) );
      } catch {
        localStorage.removeItem( TOKEN_KEY );
        localStorage.removeItem( USER_KEY );
      }
    }

    setIsLoading( false );
  }, [] );

  return (
    <AuthContext.Provider
      value={ {
        user,
        token,
        isAuthenticated: Boolean( token && user ),
        isLoading,
        saveAuth,
        logout,
      } }
    >
      { children }
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext( AuthContext );

  if ( !context ) {
    throw new Error( "useAuth must be used inside AuthProvider" );
  }

  return context;
};