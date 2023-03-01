import { Bar, getElementAtEvent, Line } from "react-chartjs-2";
import { ActiveElement, BarProps, ChartEvent, TooltipItem, TooltipModel } from 'chart.js';
import { toggleDrawer, toggleLineOrBar, updateCompaniesList } from "../../shared/utils/redux/reducers/newUserReducer";

import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartComponent,
} from "chart.js";
import { useState, useRef } from "react";
import { NewUsersDTO } from "../../shared/dto/newUsersDto";
import { useAppDispatch, useAppSelector } from "../../shared/utils/redux/selectors/hooks";
import { Button, ToggleButton } from "@mui/material";
import { AppDispatch } from "../../shared/utils/redux/store";
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarsClick(style:any){
  const dispatch:AppDispatch=useAppDispatch()
  const newusersdatafromstore:NewUsersDTO[] = useAppSelector(
    (state) => state.NewUser.newUsersdata
  );

  const [listofcompanies, setlistofcompanies] = useState<String[]>(
    []
  );
  const chartref=useRef(null)
  const  Handleclickes=(event: ChartEvent, chartelement: ActiveElement[]) => {
    
    if (chartelement.length >= 1) {
      
      console.log("bar is clicked");
    
      const tempdate = newusersdatafromstore.map((item)=>item.companyCreatedTimeStamp)[chartelement[0].index];
      const x = newusersdatafromstore.find(
        (item) => item.companyCreatedTimeStamp === tempdate
      );
      dispatch(toggleDrawer(true))
      dispatch(updateCompaniesList(x?.namesOfCompanies!));
    }
    else{
      console.log("bar not clikced")
      dispatch(toggleDrawer(false))
    }
   
  }
  
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
    onClick: Handleclickes
    
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
        display:false,
        position:"top" as const,
      },
      title: {
        display: false,
        text: "New Enrollments",
        fontSize:100,
      },
    },
    onClick: Handleclickes
  }
  const isLine=useAppSelector(state=>state.NewUser.isLineOrBar)
  

      return(<>
      
      {isLine ? (
          <Bar data={Data} options={baroptions} ref={chartref} />
        ) : (
          <Line data={Data} options={lineoptions} />
        )}
        <div className="bothbuttons">
          <div className="linechart-btn">
            <Button
              variant="contained"
              style={{ height: 25 }}
              onClick={() => 
                dispatch(toggleLineOrBar(false))}
            >
              LineChart
            </Button>
          </div>
          <div className="barchart-btn">
            <Button
              variant="contained"
              style={{ height: 25}}
              onClick={() => dispatch(toggleLineOrBar(true))}
            >
              BarChart
            </Button>
          </div>
        </div>
      
      </>)
    
}


