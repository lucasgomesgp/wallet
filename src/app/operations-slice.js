import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ref, set, onValue } from "firebase/database";
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

export const getEntrysOrOuts = createAsyncThunk(
  "operations/getEntryOrOut",
  async ({ userId, type }) => {
    const operationRef = ref(database, `operations/${userId}/${type}`);
    onValue(operationRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        return data;
      }
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
      window.location.pathname = "/dashboard/entry/list";
    },
    [createEntryOrOutOperation.rejected]: (state) => {
      toast.success("Problema na operação!");
    },
    [getEntrysOrOuts.fulfilled]: (state, action) => {
      state.entry = action.payload;
    },
    [getEntrysOrOuts.rejected]: (state, action) => {
      toast.error("Erro ao buscar!");
      state.entry = [];
    }
  },
});

export const { entry, outflow, total } = operationsSlice.actions;
export default operationsSlice.reducer;
