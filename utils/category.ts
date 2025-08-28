import axios from "axios";

export interface Category {
  id: number;
  name: string;
}

export async function readCategories(): Promise<Category[]> {
  try {
    const config = {
      headers: { Authorization: process.env.BEARER_API_TOKEN },
    };
    const response = await axios.get(
      process.env.EXPO_PUBLIC_API_URL + "/api/categories/",
      config
    );
    const categories = response?.data?.data ?? [];
    console.log("categories loaded");
    return categories;
  } catch (error) {
    console.error(error);
    return [];
  }
}
