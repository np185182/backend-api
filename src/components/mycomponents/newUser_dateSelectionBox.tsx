import { from } from "@apollo/client";
import { TextField, Button } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import { settingfromdate, settingtodate, toggleDrawer } from "../../shared/utils/redux/reducers/newUserReducer";
import { useAppDispatch, useAppSelector } from "../../shared/utils/redux/selectors/hooks";
import { AppDispatch } from "../../shared/utils/redux/store";
import '../NewUsersComponents/SideBarDemo.css';

export default function NewUserDate_selectionBox(){
    const fromdate:Date=new Date()
  fromdate.setDate((fromdate.getDate()-60))
  const [from, setfrom] = useState<Date>(fromdate);
  var [to, setto] = useState<Date>(new Date());
  const dispatch: AppDispatch = useAppDispatch();

  const defaultdates = useAppSelector((state) => state.NewUser);
  const isOpen=useAppSelector((state)=>state.NewUser.isDrawerOpen)
    return(<>
         <div className="FromContainer">
          <div className="datepicker">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                inputFormat="DD/MM/YYYY"
                label="From"
                value={dayjs(defaultdates.fromDate)}
                onChange={(selectedfromdate) => {
                  dispatch(toggleDrawer(false))
                  console.log(
                    "selected date",
                    selectedfromdate?.toDate().toLocaleDateString()
                  );
                  setfrom(selectedfromdate?.toDate()!);}}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
<div className="ToContainer">
         <div className="datepicker">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                inputFormat="DD/MM/YYYY"
                label="To"
                value={dayjs(defaultdates.toDate)}
                onChange={(selectedtodate) => {
                  dispatch(toggleDrawer(false))
                  if(selectedtodate?.toDate()!>from){
                    setto(selectedtodate?.toDate()!);
                  }
                  else{
                    alert("Select the To date After The from Date ")
                 } }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        
    <div className="submit-btn">
        {isOpen ? <Button 
          variant="contained"
           style={{ 
            marginLeft:50,textAlign:'center',alignSelf:'center',paddingTop:10,marginTop:130}}
          onClick={() => {
            dispatch(settingfromdate(from.toLocaleDateString()!));
            dispatch(settingtodate(to.toLocaleDateString()!));
          }}
        >
          Submit
        </Button> : <Button 
          variant="contained"
          style={{ 
            marginLeft:67,textAlign:'center',alignSelf:'center',paddingTop:10,marginTop:130}}
          onClick={() => {
            dispatch(settingfromdate(from.toLocaleDateString()!));
            dispatch(settingtodate(to.toLocaleDateString()!));
          }}
         
        >
          Submit
        </Button>}</div></div>
        </>)
}