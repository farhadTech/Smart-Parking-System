import api from "./api";

import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../types/auth.types";

export const loginUser = async (
  data: LoginRequest
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>( "/auth/login", data );
  return response.data;
};

export const registerUser = async (
  data: RegisterRequest
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>( "/auth/register", data );
  return response.data;
};

export const loginWithGoogle = () => {
  alert( "Google login is not connected yet." );
};

export const loginWithGithub = () => {
  alert( "GitHub login is not connected yet." );
};
