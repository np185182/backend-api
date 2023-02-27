import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import "../NewUsersComponents/SideBarDemo.css";
import { Bar, Line } from 'react-chartjs-2';
import { ChartEvent, ActiveElement } from 'chart.js';
import NavBar from '../NavBar';
import { from } from '@apollo/client';
import { TextField, Button } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { settingfromdate, settingtodate } from '../../shared/utils/redux/reducers/newUserReducer';
import { useState } from 'react';
import { NewUsersDTO } from '../../shared/dto/newUsersDto';
import { AppDispatch } from '../../shared/utils/redux/store';
import { useAppDispatch, useAppSelector } from '../../shared/utils/redux/selectors/hooks';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';

const drawerWidth = 270;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));






export default function PersistentDrawerRight() {
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const newusersdatafromstore:NewUsersDTO[] = useAppSelector(
    (state) => state.NewUser.newUsersdata
  );
  const Data = {
    labels: newusersdatafromstore.map((item)=>item.companyCreatedTimeStamp),

    datasets: [
      {
        label: "New Registrations",
        data:newusersdatafromstore.map((item)=>item.frequency) ,
        backgroundColor: "#55B74E",
        borderColor: "#55B74E",
        pointBackgroundColor: "#537FE7",
        pointRadius: 5,
        pointHoverRadius: 10,
      },
    ],
  };
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
        if (chartelement.length>0) {
            setOpen(true);
          console.log("Bar is clicked")
            // handleDrawerOpen()
         
        }
        else{
          setOpen(false)
        }
       
      }
    
  }
   const [isLine, SetLine] = useState(true);
  const [IsDrawerOpen, setIsDrawerOpen] = useState(false);
  const fromdate:Date=new Date()
  fromdate.setDate((fromdate.getDate()-60))
  const [from, setfrom] = useState<Date>(fromdate);
  var [to, setto] = useState<Date>(new Date());
  const dispatch: AppDispatch = useAppDispatch();

  const defaultdates = useAppSelector((state) => state.NewUser);
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
    onClick: (event: ChartEvent, chartelement: ActiveElement[]) => {
      if (chartelement.length === 1) {
        const tempdate = newusersdatafromstore.map((item)=>item.companyCreatedTimeStamp)[chartelement[0].index];
        const x = newusersdatafromstore.find(
          (item) => item.companyCreatedTimeStamp === tempdate
        );
        setOpen(true)
        setIsDrawerOpen(true);
        setlistofcompanies(x?.namesOfCompanies!);
      }
    }
  }
  const [listofcompanies, setlistofcompanies] = useState<String[]>(
    []
  );
 


 

  return (
    <Box display={'flex'}>
    <Main open={open} >
    <header><NavBar/></header>
    <div className="FullnewUserContainer">
    
    
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
      {/* <div className="submit-btn">  */}
        <Button
          variant="contained"
          style={{ 
            marginLeft:67,textAlign:'center',alignSelf:'center',paddingTop:10,marginTop:100}}
          onClick={() => {
            dispatch(settingfromdate(from.toLocaleDateString()!));
            dispatch(settingtodate(to.toLocaleDateString()!));
          }}
        >
          Submit
        </Button>
        
        
      </div>

      <div className="newUser_chartcomponent">
        {isLine ? (
          <Bar data={Data} options={baroptions} />
        ) : (
          <Line data={Data} options={baroptions} />
        )}
</div><div className="bothbuttons">
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

        </Main>
        <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
       
          <IconButton onClick={()=>setOpen(false)}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        
        <Divider />
           <List>
  <h2> Enrolled Companies</h2>
  {listofcompanies?.map((text, index) => (
    <ListItem style={{padding:0,marginTop:0}}>
      <h3 style={{ paddingRight: 19 }}>  </h3>
      <AddBusinessOutlinedIcon style={{fill: '#0072ea'}}/>
      <ListItemText 
      primaryTypographyProps={{paddingLeft:1,fontSize: '19px',fontFamily: 'Playfair',fontWeight:'bold' }} 
        primary={text} 
       
      />
    </ListItem>
  ))}
</List>
        
       
      </Drawer></Box>
  );
}
