export const Routes = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  USERS: "/users",
  USERS_DETAIL: (id: string) => `/user-detail/${id}`,
  PRODUCTS: "/products",
  PRODUCTS_DETAIL: (id: string) => `/product-detail/${id}`,
  ADD_PRODUCT: "/add-product",
  ORDERS: "/orders",
  ORDER_HISTORY: "/order-history",
  PRIVACY_POLICY: "/privacy-policy",
  TERMS_AND_CONDITIONS: "/terms-and-conditions",
};
