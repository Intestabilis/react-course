import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// we can't call this function directly in reducer since reducer completely synchronous (so for this once again we're using thunks (middleware))
// we're passing 2 args: 1. action name 2. async function that will return the payload for the reducer later

// this function will become action creator that we'll call in code
// shouldn't call something with "get" since by convention "get" is for selectors (like in cartSlice)
export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    // Payload of a FULFILLEd state
    // if REJECTED, will add error as a property of an action (?)
    return { position, address };
  },
);
// produce 3 addition action types each for promise states (pending, fulfilled, rejected)

const initialState = {
  username: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },

  // handling action types from thunk in slice
  // so for each type we're adding case with builder to handle it (creating actual reducer)
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        // handling return from fulfilled promise
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        // if promise rejected, error automatically added to action (?)
        // state.error = action.error.message;
        state.error =
          "There was a problem getting your address, make sure to fill this field";
      }),
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;
