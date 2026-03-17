import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

const URL = "http://localhost:8000";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        alert(`error fetching data: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* defining elements like this we are able to pass props in them */}
        <Route index element={<Homepage />} />
        {/* <Route path="/" element={<Homepage />} /> */}
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          {/* index route - default child route that's gonna be matched if no other matches */}
          <Route
            index
            element={
              // Navigate - component for programmatic navigation, not much used after useNavigate hook, but still useful for cases like this, navigating to smth by default
              // (basically redirect)
              // replace keyword replacing with current element in the history stack (so we can go back from this default route)
              <Navigate to="cities" replace>
                <CityList cities={cities} isLoading={isLoading} />
              </Navigate>
            }
          ></Route>
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          ></Route>
          {/* dynamic routing */}
          <Route path="cities/:id" element={<City />}></Route>
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          ></Route>
          <Route path="form" element={<Form />}></Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
