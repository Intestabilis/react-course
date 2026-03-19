import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((store) => store.user);

  const isLoadingAddress = addressStatus === "loading";

  const navigation = useNavigation();
  // we're doing similar check as for loading
  const isSubmitting = navigation.state === "submitting";

  // we can get access to the data returned by connected action (also with custom hook)
  // basically it's for any returned data but the most common usecase is getting errors for UI
  const formErrors = useActionData();
  const [withPriority, setWithPriority] = useState(false);

  const dispatch = useDispatch();

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;
  // thanks to this Form from React Router we don't have to create submitHandler, state variables, loading state etc.
  // syntax and ehh vibe? similar to standard HTML forms
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      {/* to use react router form actions(? not sure that's how it's called) we must use Form component from react router 
       we can use POST, PATCH or DELETE methods there 
      action - path where form should be submitted to, by default will match the closest route so it's not necessary  */}
      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px] top-[3px] z-10 md:right-[5px] md:top-[5px]">
              <Button
                disabled={isLoadingAddress}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to give your order priority?
          </label>
        </div>

        <div>
          {/* hidden input to pass cart into action function when we're submitting the form*/}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting
              ? `Placing order...`
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// when we submit the form it will be intercepted by connected action function (in this case - function below)
// similar to loaders, but for forms and to-server methods (POST PATCH etc.)
export async function action({ request }) {
  // regular Web API, provided by a browser
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log(data);

  // formatting data from the form
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  // console.log(order);

  // Errors handling
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please, give us your correct phone number. We might need it to contact you.";

  // if errors object has at least 1 property (so error as we're adding errors as properties in if clauses)
  if (Object.keys(errors).length > 0) return errors;

  // thanks to simple validation before it will create a new order and redirect only if form fields have correct values

  // createOrder() sending our new order to API, then fetch (from the server) and returns newly created order so we can use it
  const newOrder = await createOrder(order);

  // a hack to use dispatch function there - we still can't use hooks since it's not a component function, so we have to use store directly
  // Do NOT overuse it
  store.dispatch(clearCart());
  // it deactivates a couple of redux's performance optimizations on this page

  // we still can't use hooks there so we can't use navigate function since we're getting this function with hook
  // so instead of it we're using redirect() function from React Router
  // if we return a new response from here React Router will automatically go to url from this response (so from our redirect)
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
