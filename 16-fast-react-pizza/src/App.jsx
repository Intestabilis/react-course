import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./ui/Home";
import Error from "./ui/Error";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Order, { loader as orderLoader } from "./features/order/Order";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import { action as UpdateOrderAction } from "./features/order/UpdateOrder";
import AppLayout from "./ui/AppLayout";

// function for defining routes; We're passing an array of objects where each object is one route
// creating and using router like this enabling data loading and new features like that starting from React Router 6.4
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    // there is a special way of handling errors in this syntax - we define error element
    // errors are bubbling up if not handled in children routes, so we can specify in right here in parent element
    errorElement: <Error />,
    // nested Routes
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        // we can also place error inside child element so then it will appear inside parent element (in this case in appLayout when smth goes wrong with menu)
        // so basically we still will see other elements of layout such as Header CartOverview etc.
        errorElement: <Error />,
        // 2. providing a loader function to the route
        loader: menuLoader,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        // we're specifying actions for forms similar to loaders
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        errorElement: <Error />,
        loader: orderLoader,
        // connecting action from a child component (UpdateOrder) - that works fine
        action: UpdateOrderAction,
      },
    ],
  },
]);

// Loaders in React Router: somewhere we create a function that fetches data, then provide it to one of routes, then route will fetch data as soon as app goes that route
// once the data arrived, it provided to the page component itself using a custom hook
// 1. create a loader 2. provide a loader 3. provide a data to a page

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
