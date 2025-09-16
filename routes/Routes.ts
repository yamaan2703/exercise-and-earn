export const Routes = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  USERS: "/users",
  USERS_DETAIL: (id: string) => `/user-detail/${id}`,
  PRODUCTS: "/products",
  PRODUCTS_DETAIL: (id: string) => `/product-detail/${id}`,
  GIFTS: "/gifts",
  GIFTS_DETAIL: (id: string) => `/gift-detail/${id}`,
  PRIVACY_POLICY: "/privacy-policy",
  TERMS_AND_CONDITIONS: "/terms-and-conditions",
};
