import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useAuth } from "../../features/auth/AuthContext";
import type { UserRole } from "../../types/auth.types";

const OAuthCallbackPage = () => {
  const navigate = useNavigate();
  const [ searchParams ] = useSearchParams();
  const { saveAuth } = useAuth();

  useEffect( () => {
    const token = searchParams.get( "token" );
    const role = ( searchParams.get( "role" ) || "USER" ) as UserRole;
    const name = searchParams.get( "name" ) || "OAuth User";
    const email = searchParams.get( "email" ) || "oauth@example.com";

    if ( !token ) {
      navigate( "/login" );
      return;
    }

    saveAuth( {
      token,
      user: {
        name,
        email,
        role,
      },
    } );

    if ( role === "ADMIN" ) {
      navigate( "/admin/dashboard" );
    } else {
      navigate( "/user/dashboard" );
    }
  }, [ navigate, saveAuth, searchParams ] );

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-slate-950">
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow">
        <h1 className="text-2xl font-bold text-white">Completing login...</h1>
        <p className="mt-2 text-blue-300">
          Please wait while we redirect you.
        </p>
      </div>
    </div>
  );
};

export default OAuthCallbackPage;