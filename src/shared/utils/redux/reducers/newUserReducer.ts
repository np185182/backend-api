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
  isDrawerOpen:boolean;
  isLineOrBar:boolean;
  tempcompanieslist:String[];
};
const fromdate:Date=new Date()
fromdate.setDate((fromdate.getDate()-60))
const todate:Date=new Date()

const InitialState: initialstatetypes = {
  __typename : "",
  fromDate:fromdate.toLocaleDateString(),
  toDate: todate.toLocaleDateString(),
  newUsersdata: [],
  isDrawerOpen:false,
  isLineOrBar:true,
  tempcompanieslist:[]
  
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
    toggleDrawer:(state,action:PayloadAction<boolean>)=>{
      state.isDrawerOpen=action.payload
    },
    toggleLineOrBar:(state,action:PayloadAction<boolean>)=>{
      state.isLineOrBar=action.payload
    },
    updateCompaniesList:(state,action:PayloadAction<String[]>)=>{
      state.tempcompanieslist=action.payload
    }
    
  },
  extraReducers:(builder)=>{
    builder.addCase(Fetchnewusersdata.fulfilled,(state,action:PayloadAction<NewUsersDTO[]>)=>{
      
      state.newUsersdata=action.payload
    })
  }
  }
);
export default newUserSlice.reducer;
export const { settingfromdate, settingtodate,toggleDrawer,toggleLineOrBar,updateCompaniesList} =
  newUserSlice.actions;
