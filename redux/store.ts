import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { loginSlice } from "./slices/loginSlice";
import { userSlice } from "./slices/userSlice";
import { TermsSlice } from "./slices/termsAndConditionSlice";
import { PrivacySlice } from "./slices/privacyPolicySlice";
import { productSlice } from "./slices/productSlice";
import { goalSlice } from "./slices/goalSlice";

export const store = configureStore({
  reducer: {
    [loginSlice.reducerPath]: loginSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
    [TermsSlice.reducerPath]: TermsSlice.reducer,
    [PrivacySlice.reducerPath]: PrivacySlice.reducer,
    [productSlice.reducerPath]: productSlice.reducer,
    [goalSlice.reducerPath]: goalSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      loginSlice.middleware,
      userSlice.middleware,
      TermsSlice.middleware,
      PrivacySlice.middleware,
      productSlice.middleware,
      goalSlice.middleware,
    ]),
});

setupListeners(store.dispatch);

export type ReduxState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
