import { createSlice } from "@reduxjs/toolkit";

const operationsSlice = createSlice({
    name: "operations",
    initialState:{
        entry:[],
        outflow:[],
        total: 0,
    }
});

export const {entry, outflow, total} = operationsSlice.actions;
export default operationsSlice.reducer;