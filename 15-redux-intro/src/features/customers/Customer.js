import { useSelector } from "react-redux";

function Customer() {
  // to read data from redux store we're using useSelector hook
  // as single arguments we're using callback function, that takes store as argument and returns desirable redux store value/reducer function (as we name them in combineReducers)
  // const customer = useSelector((store) => store.customer);
  // this useSelector creates a subscription to the store

  // we can do as much data manipulation in this function as we want + we can do any computations here too
  const customer = useSelector((store) => store.customer.fullName);

  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
