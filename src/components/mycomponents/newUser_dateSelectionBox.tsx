import { TextField, Button, Typography } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import { newUser_datepickers_Title } from "../../shared/config";
import { settingfromdate, settingtodate, toggleDrawer } from "../../shared/utils/redux/reducers/newUserReducer";
import { useAppDispatch, useAppSelector } from "../../shared/utils/redux/selectors/hooks";
import { AppDispatch } from "../../shared/utils/redux/store";

import '../../containers/newCustomers/newUserDemo.css';



export default function NewUserDate_selectionBox() {
  const fromdate: Date = new Date();
  fromdate.setDate((fromdate.getDate() - 60))
  const [defaultfrom, setfrom] = useState<Date>(fromdate);
  const [defaultto, setto] = useState<Date>(new Date());
  const dispatch: AppDispatch = useAppDispatch();

  const defaultdates = useAppSelector((state) => state.NewUser);
  const isOpen = useAppSelector((state) => state.NewUser.isDrawerOpen)
  return (<div className="newUserDatepickers">
    <Typography className="newUser_datepickers_title"><b>{newUser_datepickers_Title}</b></Typography>
    <div className="FromContainer">
      <div className="datepicker">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            inputFormat="DD/MM/YYYY"
            label="From"
            value={dayjs(defaultdates.fromDate)}
            onChange={(selectedfromdate) => {

              console.log(
                "selected date",
                selectedfromdate?.toDate().toLocaleDateString()
              );
              setfrom(selectedfromdate?.toDate()!);
            }}
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

              if (selectedtodate?.toDate()! > defaultfrom) {
                setto(selectedtodate?.toDate()!);
              }
              else {
                alert("Select the To date After The from Date ")
              }
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>


    </div>
    <div className="submit-btn">
      <Button
        variant="contained"
            style={{backgroundColor:'#54B948'}}
        onClick={() => {
          dispatch(settingfromdate(defaultfrom.toLocaleDateString()!));
          dispatch(settingtodate(defaultto.toLocaleDateString()!));
        }}

      >
        Submit
      </Button></div>

  </div>)
}