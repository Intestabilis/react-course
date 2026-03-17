import { createSlice } from "@reduxjs/toolkit";
// makes things easier: 1) automatically creates action creators 2) we no longer need switch statement (default case also handled automatically)
// 3) we can now "mutate" state inside reducers (internally works with Immer library, that converts it to immutable logic inside)

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

// accepts an object of options
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    // by default accepting only one value, which becomes action.payload

    deposit(state, action) {
      // mutable logic, we no longer return entire state creating new object
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      // to accept more than 1 argument, we have to use reducer(){} as our default reducer and use prepare() before it,
      // in which return new object which then be the payload in reducer

      // ofc we also can already pass an object as one and only argument-payload and then we don't have to do this
      // also we can do any other preparations before reducer
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },

      reducer(state, action) {
        // typical guard clause, but we don't need to return state
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

// console.log(accountSlice);

// Exports

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

// to create Thunk we can use createAsyncThunk method from Redux Toolkit, but now it's gonna be simplier to just reuse function created before
// it will automatically work since Thunks are auto provided in Redux Toolkit

export function deposit(amount, currency) {
  // type: name of the slice / name of the reducer
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });

    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`,
    );

    const data = await res.json();

    const converted = data.rates.USD;

    dispatch({ type: "account/deposit", payload: converted });
  };
}

export default accountSlice.reducer;
