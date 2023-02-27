import { createAsyncThunk, createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { act } from "@testing-library/react";
import axios, { AxiosResponse } from "axios";
import dayjs, { Dayjs } from "dayjs";
import { NewUsersDTO } from "../../../dto/newUsersDto";
import { DataFromGraphql } from "../../Graphql/gqlHelper";
import { RootState, AppDispatch } from "../store";

type initialstatetypes = {
  __typename : string,
  fromDate: string;
  toDate: string;
  newUsersdata: NewUsersDTO[];
};
const fromdate:Date=new Date()
fromdate.setDate((fromdate.getDate()-60))
const todate:Date=new Date()

const InitialState: initialstatetypes = {
  __typename : "",
  fromDate:fromdate.toLocaleDateString(),
  toDate: todate.toLocaleDateString(),
  newUsersdata: [],
};
 export const Fetchnewusersdata=createAsyncThunk(
  'newusersdata/fetch',
  async () => {
    try
    {const response:NewUsersDTO[] = DataFromGraphql();
      return response;
    }
    catch(err){
      console.log(err)
      return []; 
    }
     })

const newUserSlice:Slice<initialstatetypes> = createSlice({
  name: "NewUsers",
  initialState: InitialState,
  reducers: {
    settingfromdate: (state, action:PayloadAction<string>) => {
      console.log(state.fromDate+"="+action.payload)
      state.fromDate = action.payload;
      console.log(state.fromDate  )
    },
    settingtodate: (state, action:PayloadAction<string>) => {
      state.toDate = action.payload;
    },
    
  },
 
  }
);
export default newUserSlice.reducer;
export const { settingfromdate, settingtodate } =
  newUserSlice.actions;
