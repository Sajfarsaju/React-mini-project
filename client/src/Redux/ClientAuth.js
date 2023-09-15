import { createSlice } from "@reduxjs/toolkit";

export const ClientAuth = createSlice({
    name: "Client",
    initialState: {
        Token: null,
    },
    reducers: {
        ClientLogin(state, action) {
            state.Token = action.payload.token;
        },
        ClientLogout(state, action) {
            state.Token = "";
        },
    },
});
export const { ClientLogin, ClientLogout } = ClientAuth.actions;
export default ClientAuth.reducer;
