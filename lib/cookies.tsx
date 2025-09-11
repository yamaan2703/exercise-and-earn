import Cookies from "js-cookie";

export type CookieName = string;
export type CookieValue = string;
export type CookieOptions = Cookies.CookieAttributes | undefined;

const setCookie = (
  name: CookieName,
  value: CookieValue,
  options?: CookieOptions
): void => {
  const defaultOptions: CookieOptions = {
    expires: 7,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  };

  Cookies.set(name, value, { ...defaultOptions, ...options });
};

const getCookie = (name: CookieName): string | undefined => {
  return Cookies.get(name);
};

const removeCookie = (name: CookieName): void => {
  Cookies.remove(name, { path: "/" });
};

export { getCookie, removeCookie, setCookie };
