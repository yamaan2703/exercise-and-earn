import Cookies from "js-cookie";

// Types
export type CookieName = string;
export type CookieValue = string;
export type CookieOptions = Cookies.CookieAttributes | undefined;

// Function to set a cookie
const setCookie = (
  name: CookieName,
  value: CookieValue
  // options?: CookieOptions
): void => {
  Cookies.set(name, value, { secure: true });
};

// Function to get a cookie
const getCookie = (name: CookieName): string | undefined | null => {
  return Cookies.get(name);
};

// Function to remove a cookie
const removeCookie = (name: CookieName): void => {
  Cookies.remove(name);
};

export { getCookie, removeCookie, setCookie };
