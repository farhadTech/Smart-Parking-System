export const API_URL = "http://localhost:8080/api";

export const getToken = () => {
  return localStorage.getItem( "smart_parking_token" );
};

export const authHeaders = () => {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ token }`,
  };
};