import { configureStore} from "@reduxjs/toolkit";
import contractReducer from './contractSlice';
import pointReducer from './pointSlice';
import authReducer from './authSlice'

const store=configureStore({
    reducer:{
        contracts:contractReducer,
        points: pointReducer,
        auth:authReducer,
    },
});

export type RootState=ReturnType<typeof store.getState>;
export default store;