import { Bar, getElementAtEvent } from "react-chartjs-2";
import { BarProps, TooltipItem, TooltipModel } from 'chart.js';

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
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarsClick(){
    
    const Data = {
        labels: ["sun", "mon", "tues", "wedn", "thurs", "fri", "sat"],
    
        datasets: [
          {
            label: "Display Data",
            data: [10, 30, 50, 40, 30, 80, 60],
            backgroundColor: "#55B74E",
            borderWidth: 1,
            borderColor: "black",
          },
        ],
      };
      const options = {
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
          legend: {
            position: "top" as const,
          },
          title: {
            display: true,
    
            text: "New User Details",
          },
        },
      };
      const chartRef=useRef<BarProps>(null);
    //   let handlebarclick = (e: any) => {
    
    //     if(getElementAtEvent(chartRef.current,e).length>0){
    //         const datapoint=getElementAtEvent(chartRef.current,e)[0].index;
    //     }
    //     // if (chartRef.current) {
    //     //     const chartInstance = chartRef.current.chartInstance;
    //     //     if (chartInstance) {
    //     //       const activeElements = chartInstance.getElementsAtEventForMode(e.nativeEvent, 'nearest', { intersect: true }, true);
    //     //       if (activeElements.length > 0) {
    //     //         const index = (activeElements[0] as TooltipItem).index;
    //     //         console.log('Data point index:', index);
    //     //       }
    //     //     }
    //     //   }
       
    //   };
      return(<>
      {/* <Bar data={Data} options={options} style={{padding:30}} onClick={handlebarclick} ref={chartRef}/></>) */}</>)
}