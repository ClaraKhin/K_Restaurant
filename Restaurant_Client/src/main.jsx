import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { SnackbarProvider } from "notistack"; //Global Notification system ဖြစ်ချင်လို့
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000,
    },
  },
}); // TanStack Query's data freshness policy. App တစ်ခုလုံးအတွက် query behavior ကို ထိန်းချုပ်တဲ့ central brain။ useQuery အားလုံးအတွက် default setting။
//Fetched data ကို ၅ မိနစ်အထိ fresh လို့ယူဆပြီး အဲ့ဒီအချိန်အတွင်း unnecessary refetch မလုပ်

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <SnackbarProvider autoHideDuration={3000}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </SnackbarProvider>
    </Provider>
  </StrictMode>
);
