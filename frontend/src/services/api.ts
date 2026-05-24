import axios from "axios";

const api = axios.create( {
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
} );

api.interceptors.request.use( ( config ) => {
  const token = localStorage.getItem( "smart_parking_token" );

  const isValidJwt =
    token &&
    token !== "null" &&
    token !== "undefined" &&
    token.split( "." ).length === 3;

  if ( isValidJwt ) {
    config.headers.Authorization = `Bearer ${ token }`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
} );

export default api;