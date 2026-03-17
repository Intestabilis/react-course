import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CitiesProvider } from "./context/CitiesContext";
import { AuthProvider } from "./context/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Homepage from "./pages/Homepage";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

// lazy-loading with code splitting using lazy() function from React and JS dynamic import
// and also with use of Suspense API

const Homepage = lazy(() => import("./pages/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          {/* using Suspense API for loading spinner while page dynamically loading */}
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              {/* defining elements like this we are able to pass props in them */}
              <Route index element={<Homepage />} />
              {/* <Route path="/" element={<Homepage />} /> */}
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                {/* index route - default child route that's gonna be matched if no other matches */}
                <Route
                  index
                  element={
                    // Navigate - component for programmatic navigation, not much used after useNavigate hook, but still useful for cases like this, navigating to smth by default
                    // (basically redirect)
                    // replace keyword replacing with current element in the history stack (so we can go back from this default route)
                    <Navigate to="cities" replace>
                      <CityList />
                    </Navigate>
                  }
                ></Route>
                <Route path="cities" element={<CityList />}></Route>
                {/* dynamic routing */}
                <Route path="cities/:id" element={<City />}></Route>
                <Route path="countries" element={<CountryList />}></Route>
                <Route path="form" element={<Form />}></Route>
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
