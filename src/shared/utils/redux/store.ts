import { configureStore } from "@reduxjs/toolkit";
import newUserSlice from './reducers/newUserReducer';

 const store =configureStore({
    reducer:{
        NewUser:newUserSlice
    }
})

export type AppDispatch = typeof store.dispatch
//export const useAppDispatch: () => AppDispatch = useDispatch 
export type RootState = ReturnType<typeof store.getState>

export default store

