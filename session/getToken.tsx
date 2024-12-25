export const getToken = async () => {
  const BASE_URL = process.env.EXPO_PUBLIC_BASE_API_URL;
  try {
    const response = await fetch(`${BASE_URL}/api/get_csrf_token`);
    const data = await response.json();
    return data.csrf_token;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
  }
  return null;
};
