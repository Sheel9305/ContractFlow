import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ContractType {
  id?: number;
  name: string;
  startDate: string;
  endDate: string;
}

const initialState: ContractType[] = [];

const contractSlice = createSlice({
  name: "contracts",
  initialState,
  reducers: {
    addContract: (state, action: PayloadAction<ContractType>) => {
      const exists = state.some((contract) => contract.id === action.payload.id);
      if (!exists) {
        state.push(action.payload);
      }
    },
    updateContract: (state, action: PayloadAction<ContractType>) => {
      return state.map((contract) =>
        contract.id === action.payload.id ? action.payload : contract
      );
    },
    deleteContract: (state, action: PayloadAction<number>) => {
      return state.filter((contract) => contract.id !== action.payload);
    },
    clearContract: () => {}
  },
});

export const {addContract, updateContract, deleteContract, clearContract } =
  contractSlice.actions;
export default contractSlice.reducer;
