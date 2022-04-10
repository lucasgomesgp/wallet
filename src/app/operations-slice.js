import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ref, set } from "firebase/database";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { database } from "../../services/firebase.config";

export const createEntryOrOutOperation = createAsyncThunk(
  "operations/createEntryOrOutOperation",
  async ({ userId, type, value, description, date }) => {
    set(ref(database, `operations/${userId}/${type}/${uuidv4()}`), {
      id: uuidv4(),
      value,
      description,
      date,
    });
  }
);
const operationsSlice = createSlice({
  name: "operations",
  initialState: {
    entry: [],
    outflow: [],
    total: 0,
  },
  reducers: {},
  extraReducers: {
    [createEntryOrOutOperation.fulfilled]: (state) => {
      toast.success("Operação realizada com sucesso!");
    },
    [createEntryOrOutOperation.rejected]: (state) => {
      toast.success("Problema na operação!");
    },
  },
});

export const { entry, outflow, total } = operationsSlice.actions;
export default operationsSlice.reducer;
