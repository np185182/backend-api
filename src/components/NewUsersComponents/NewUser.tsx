import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  Chart,
  ChartItem,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import * as React from "react";
import './newUsers.css';

import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers-pro";
import {
  DateRangePicker,
  DateRange,
} from "@mui/x-date-pickers-pro/DateRangePicker";

import {
  Button,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  styled,
  useTheme,
} from "@mui/material";

import "./newUsers.css";
import { useEffect, useState } from "react";
import StyledDrawer from "./sideBar";
import BarsClick from "../mycomponents/NewUserChart";

import { DataFromGraphql } from "../../shared/utils/Graphql/gqlHelper";
import { NewUsersDTO } from "../../shared/dto/newUsersDto";
import {
 
  Fetchnewusersdata,
  settingfromdate,
  settingtodate,
} from "../../shared/utils/redux/reducers/newUserReducer";
import {
  useAppDispatch,
  useAppSelector,
} from "../../shared/utils/redux/selectors/hooks";
import { type } from "os";
import { ActiveElement } from "chart.js/dist/plugins/plugin.tooltip";
import { ChartEvent } from "chart.js/dist/core/core.plugins";
import { AppDispatch } from "../../shared/utils/redux/store";
import { useApolloClient } from "@apollo/client";
import { NewUser_BarOptions,NewUser_LineOptions } from "../../shared/config";
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import NavBar from "../NavBar";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);


export default function NewUsers() {
  
  const dispatch: AppDispatch = useAppDispatch();
  
  const defaultdates = useAppSelector((state) => state.NewUser);

  const newusersdatafromstore:NewUsersDTO[] = useAppSelector(
    (state) => state.NewUser.newUsersdata
  );
  const lineoptions={
    responsive: true,
    scales: {
      x: {
        grid: {
          display: true,
        },
      },
      y: {
        grid: {
          display: true,
        },
      },
    },
    plugins: {
      label:false,
      legend: {
        display:false,
        position: "top" as const,
      },
      title: {
        
        display: false,
        text: "New Enrollments",
        fontSize:100,
      },
    },
    onClick: (event: ChartEvent, chartelement: ActiveElement[]) => {
      if (chartelement.length === 1) {
        const tempdate = newusersdatafromstore.map((item)=>item.companyCreatedTimeStamp)[chartelement[0].index];
        const x = newusersdatafromstore.find(
          (item) => item.companyCreatedTimeStamp === tempdate
        );
        
        setIsDrawerOpen(true);
        setlistofcompanies(x?.namesOfCompanies);
      }
    }
  }
  const Handleclickes=(event: ChartEvent, chartelement: ActiveElement[]) => {
    if (chartelement.length === 1) {
      const tempdate = newusersdatafromstore.map((item)=>item.companyCreatedTimeStamp)[chartelement[0].index];
      const x = newusersdatafromstore.find(
        (item) => item.companyCreatedTimeStamp === tempdate
      );
      
      setIsDrawerOpen(true);
      setlistofcompanies(x?.namesOfCompanies);
    }
  }
  const baroptions={
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      label:false,
      legend: {
        position:"top" as const,
      },
      title: {
        display: false,
        text: "New Enrollments",
        fontSize:100,
      },
    },
    onClick:Handleclickes 
  }
const [listofcompanies, setlistofcompanies] = useState<String[] | undefined>(
    []
  );

  const Data = {
    labels: newusersdatafromstore.map((item)=>item.companyCreatedTimeStamp),

    datasets: [
      {
        label: "New Registrations",
        data: newusersdatafromstore.map((item)=>item.frequency),
        backgroundColor: "#55B74E",
        borderColor: "#55B74E",
        pointBackgroundColor: "#537FE7",
        pointRadius: 5,
        pointHoverRadius: 10,
      },
    ],
  };
  const [isLine, SetLine] = useState(true);
  const [IsDrawerOpen, setIsDrawerOpen] = useState(false);
  const fromdate:Date=new Date()
  fromdate.setDate((fromdate.getDate()-60))
  const [from, setfrom] = useState<Date>(fromdate);
  var [to, setto] = useState<Date>(new Date());
  return (
    <>
      <div className="FullnewUserContainer">
      <header style={{padding:0,margin:0}}><NavBar/></header>
      
        <div className="newUser_date_selection_box">
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
          </div>
        <div className="submit-btn"> 
          <Button
            variant="contained"
            style={{ position:'absolute', bottom: 100, left: 100}}
            onClick={() => {
              dispatch(settingfromdate(from.toLocaleDateString()!));
              dispatch(settingtodate(to.toLocaleDateString()!));
            }}
          >
            Submit
          </Button></div>
          
          
        </div>

        <div className="newUser_chartcomponent">
          {isLine ? (
            <Bar data={Data} options={baroptions} />
          ) : (
            <Line data={Data} options={lineoptions} />
          )}
          <div className="bothbuttons">
            <div className="linechart-btn">
              <Button
                variant="contained"
                style={{ height: 25 }}
                onClick={() => SetLine(false)}
              >
                LineChart
              </Button>
            </div>
            <div className="barchart-btn">
              <Button
                variant="contained"
                style={{ height: 25}}
                onClick={() => SetLine(true)}
              >
                BarChart
              </Button>
            </div>
          </div>
          </div>
        <Drawer
          anchor="right"
          open={IsDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
          }}
          PaperProps={{
            elevation: 10,
            sx: {
              width: 300,
              flexShrink: 100,
              '& .MuiDrawer-paper': {
                width: 100,
              },
              padding: 3,
              marginTop: 15,
              
              height: 500,
              color: "black",
              backgroundColor: "white",
              borderRadius: 5,
            },
          }}
        >
          <div>
            <List>
              <h1>Companies List</h1>
              {listofcompanies?.map((text, index) => (
               
                <ListItem style={{padding:0,marginTop:0}}>
                  
      <AddBusinessOutlinedIcon style={{fill: '#0072ea'}}/>
      
                  <ListItemText
                  primaryTypographyProps={{paddingLeft:1,fontSize: '19px',fontFamily: 'Playfair',fontWeight:'bold' }}
                   primary={text} />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
      </div>
    </>
  );
}
