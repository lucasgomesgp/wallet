import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ref, set, child, get, remove } from "firebase/database";
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

export const getValuesToHome = createAsyncThunk(
  "operations/getValuesToHome",
  async ({ userId }) => {
    try {
      const valuesRef = ref(database);
      const entry = await get(child(valuesRef, `operations/${userId}/entry`));
      const out = await get(child(valuesRef, `operations/${userId}/out`));
      const entrys = [];
      const outs = [];
      let totalEntrys = 0;
      let totalOuts = 0;
      let total = 0;

      entry.forEach((value) => {
        let item = value.val();
        item.key = value.key;
        totalEntrys += parseFloat(item.value);
        total+= parseFloat(item.value);
        entrys.push(item);
      });

      out.forEach((value) => {
        let item = value.val();
        item.key = value.key;
        totalOuts += parseFloat(item.value);
        total-= parseFloat(item.value);
        outs.push(item);
      });

      if (entry.exists() || out.exists()) {
        return {
          entrys,
          outs,
          totalEntrys,
          totalOuts,
          total,
        };
      }
    } catch (err) {
      toast.error("Erro ao buscar os valores!");
      return err;
    }
  }
);

export const getEntrysOrOuts = createAsyncThunk(
  "operations/getEntryOrOut",
  async ({ userId, type }) => {
    try {
      const operationRef = ref(database);
      const snapshot = await get(
        child(operationRef, `operations/${userId}/${type}`)
      );
      let data = [];
      snapshot.forEach((current) => {
        let item = current.val();
        item.key = current.key;
        data.push(item);
      });
      if (snapshot.exists()) {
        return data;
      }
    } catch (err) {
      toast.error("Erro ao fazer a listagem!");
      return err;
    }
  }
);

export const removeEntryOrOuts = createAsyncThunk(
  "operations/removeEntryOrOuts",
  async ({ userId, type, key }) => {
    try {
      await remove(ref(database, `operations/${userId}/${type}/${key}`));
      toast.success("Removido com sucesso!");
    } catch (err) {
      toast.error(
        `Erro ao remover a ${type === "entry" ? "entrada" : "saída"}!`
      );
      return err;
    }
  }
);

const operationsSlice = createSlice({
  name: "operations",
  initialState: {
    entry: [],
    outflow: [],
    total: 0,
    totalEntrys: 0,
    totalOuts: 0,
  },
  reducers: {},
  extraReducers: {
    [createEntryOrOutOperation.fulfilled]: (state) => {
      toast.success("Operação realizada com sucesso!");
      let path = "";
      if (window.location.pathname === "/dashboard/entry/new") {
        path = "/dashboard/entry/list";
      } else {
        path = "/dashboard/out/list";
      }
      window.location.pathname = path;
    },
    [createEntryOrOutOperation.rejected]: (state) => {
      toast.success("Problema na operação!");
    },
    [getEntrysOrOuts.fulfilled]: (state, action) => {
      const {
        meta: { arg },
      } = action;
      if (arg.type === "entry") {
        state.entry = action.payload;
      } else {
        state.outflow = action.payload;
      }
    },
    [getEntrysOrOuts.rejected]: (state, action) => {
      toast.error("Erro ao buscar!");
      state.entry = [];
      state.outflow = [];
    },
    [getValuesToHome.fulfilled]: (state, action) => {
      if(action.payload !== undefined){
        state.entry = action.payload.entrys;
        state.outflow = action.payload.outs;
        state.total = action.payload.total;
        state.totalEntrys = action.payload.totalEntrys;
        state.totalOuts = action.payload.totalOuts;
      }
    },
    [getValuesToHome.rejected]: (state, action) => {
      toast.error("Erro ao buscar!");
      state.entry = [];
      state.outflow = [];
    },
    [removeEntryOrOuts.fulfilled]: (state, action) => {
      window.location.reload();
    },
    [removeEntryOrOuts.rejected]: (state, action) => {
      window.location.reload();
    },
  },
});

export const { entry, outflow, total } = operationsSlice.actions;
export default operationsSlice.reducer;
