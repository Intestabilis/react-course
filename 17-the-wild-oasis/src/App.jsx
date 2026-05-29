import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyle";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";

// Setting up the cache and query client with react-query
// we can pass options into a function
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      // data will automatically become stale so as soon as something in back-end changes it will refetch it
      staleTime: 0,
    },
  },
});

function App() {
  /* similar to Redux/Context API/etc */
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard></Dashboard>} />
              <Route path="bookings" element={<Bookings></Bookings>} />
              <Route path="bookings/:bookingId" element={<Booking></Booking>} />
              <Route path="checkin/:bookingId" element={<Checkin></Checkin>} />
              <Route path="cabins" element={<Cabins></Cabins>} />
              <Route path="users" element={<Users></Users>} />
              <Route path="settings" element={<Settings></Settings>} />
              <Route path="account" element={<Account></Account>} />
            </Route>

            <Route path="login" element={<Login></Login>} />
            <Route path="*" element={<PageNotFound></PageNotFound>} />
          </Routes>
        </BrowserRouter>
        {/* react-hot-toast library, really easy + check docs if smth unclear */}
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
