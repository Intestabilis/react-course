import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

// we're using fetcher and useFetcher hook there to update order's priority (so to write data, same principle with using route without navigation)

function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  return (
    // to write we're using Form component provided by fetcher (like other Form from react rotuer)
    // difference: submitting default Router Form creates a new navigation (navigate away from the page), while
    // fetcher.Form won't navigate away and simply submit form + revalidate the page

    // Revalidation mean's that React Router knows that data has change as a result of an action, so it will refetch the data and re-render the page

    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

// once again, we're creating an action to write actual logic

export async function action({ request, params }) {
  // setting priority to true on current order. Usually with data updating there'll be a couple inputs in fetcher.Form, but there we have only button
  // (so we don't need to read any data from the request). When we have inputs, we're using request to get this data (as in other actions, using await request.formData())

  // very simple data updating - we're just always set's priority to true when button is clicked
  const data = { priority: true };

  // we're using params to get current id and then sending a request to our API
  await updateOrder(params.orderId, data);

  return null;
}

// once again, to connect it all we must write it in routes definition (App.jsx, react router)
