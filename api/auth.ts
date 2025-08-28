import { getToken, saveToken } from "@/utils/storage";
import axios from "axios";
export interface Profile {
  username: string;
  email: string;
  createdAt: string;
  confirmed: boolean;
}

const LOGIN_URL = process.env.EXPO_PUBLIC_API_URL + "/api/auth/local";
const REGISTER_URL =
  process.env.EXPO_PUBLIC_API_URL + "/api/auth/local/register";
const PROFILE_URL = process.env.EXPO_PUBLIC_API_URL + "/api/users/me";

export const login = async (email: string, password: string) => {
  const response = await axios.post(LOGIN_URL, {
    identifier: email,
    password,
  });
  const token = response.data.jwt;
  await saveToken(token);
  return token;
};

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(REGISTER_URL, {
      username,
      email,
      password,
    });
    console.log("Register Response:", response.data);
    const token = response.data.jwt;
    if (!token) {
      throw new Error("Token not found");
    }
    await saveToken(token);
    return token;
  } catch (error: any) {
    console.error(error?.response?.data);
  }
};

export async function getProfile(): Promise<Profile> {
  const token = await getToken();
  const response = await axios.get(PROFILE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const profile = response?.data;
  console.log("Profile Response:", profile);
  return profile;
}
