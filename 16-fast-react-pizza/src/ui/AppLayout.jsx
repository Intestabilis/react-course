import Header from "./Header";

import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

function AppLayout() {
  // useNavigation to implement loading indicator, NOT use navigate
  const navigation = useNavigation();
  // then we can use this object to implement loading using some of properties (state to check if route is loading/idle/etc)
  const isLoading = navigation.state === "loading";

  // console.log(navigation);

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {/* using loading state to show loader (simply component like spinner, do not confuse with loaders from react router) when state === loading */}
      {isLoading && <Loader />}

      <Header />

      <div className="overflow-auto">
        <main className="mx-auto max-w-3xl">
          {/* same as before: using Outlet to render children routes */}
          <Outlet></Outlet>
        </main>
      </div>

      <CartOverview></CartOverview>
    </div>
  );
}

export default AppLayout;
