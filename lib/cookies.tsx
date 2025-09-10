import Cookies from "js-cookie";

export type CookieName = string;
export type CookieValue = string;
export type CookieOptions = Cookies.CookieAttributes | undefined;

const setCookie = (
  name: CookieName,
  value: CookieValue
  // options?: CookieOptions
): void => {
  Cookies.set(name, value, { secure: true });
};

const getCookie = (name: CookieName): string | undefined | null => {
  return Cookies.get(name);
};

const removeCookie = (name: CookieName): void => {
  Cookies.remove(name);
};

export { getCookie, removeCookie, setCookie };
