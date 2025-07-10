import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PointType {
  id?: number;
  contractId: number;
  name: string;
  value: number;
}

const initialState: PointType[] = [];

const pointSlice = createSlice({
  name: "points",
  initialState,
  reducers: {
    addPoint: (state, action: PayloadAction<PointType>) => {
      const exists = state.some(p => p.id === action.payload.id);
      if (!exists) state.push(action.payload);
    },
    updatePoint: (state, action: PayloadAction<PointType>) => {
      return state.map(p =>
        p.id === action.payload.id ? action.payload : p
      );
    },
    deletePoint: (state, action: PayloadAction<number>) => {
      return state.filter(p => p.id !== action.payload);
    },
    clearPoints: () => []
  }
});

export const { addPoint, updatePoint, deletePoint, clearPoints } = pointSlice.actions;
export default pointSlice.reducer;
