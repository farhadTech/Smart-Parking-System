import api, { API_BASE_URL } from "./api";
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
  window.location.href = `${ API_BASE_URL }/oauth2/authorization/google`;
};

export const loginWithGithub = () => {
  window.location.href = `${ API_BASE_URL }/oauth2/authorization/github`;
};