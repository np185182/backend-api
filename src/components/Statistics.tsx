import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,BarElement,Title,Tooltip,Legend, ChartData} from 'chart.js';
import { Line ,Bar} from 'react-chartjs-2';
import { OrderTrendDto, gType } from '../shared/dto/orderTrendDto';
import { DUMMY_DATA } from '../shared/global_constants';
import { GRAPH_OPTIONS } from '../shared/config';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const Statistics = (props : {orderList : OrderTrendDto[]})=>{
    const [isLine,SetLine] = useState(true);

    const data1 : OrderTrendDto[] = props.orderList;
    var Ddata: OrderTrendDto[] = [];

    const [graphData,SetGraphData] = useState<gType>(DUMMY_DATA);


    function  updateDays(days : number){
        Ddata.length=0;
        Ddata=data1.slice(data1.length-1-days,data1.length-1);
        var temp_graphData = {
            labels: Ddata.map((item) => item.OrderDate.slice(0, 10)),
            datasets: [
                {
                  label: 'AttemptedOrders',
                  data: Ddata.map((item) => item.AttemptedOrders),
                  borderColor: '#FA8231',
                  backgroundColor: '#FA8231',
                },
                {
                  label: 'CompletedOrders',
                  data: Ddata.map((item) => item.CompletedOrders),
                  borderColor: '#3C40C6',
                  backgroundColor: '#3C40C6',
                },
                {
                  label: 'TotalOrders',
                  data: Ddata.map((item) => item.TotalOrders),
                  borderColor: '#55B74E',
                  backgroundColor: '#55B74E',
                },
              ],
        }
        SetGraphData(temp_graphData);
    }

    useEffect(()=>{
        updateDays(30);
    },[props.orderList]);

    const handleBarClick = ()=> SetLine(false);
    const handleLineClick = ()=> SetLine(true);

    return (
        <div className='stats_bar'>
            {isLine?<Line options={GRAPH_OPTIONS} data={graphData} /> : <Bar options={GRAPH_OPTIONS} data={graphData}/>}
            <div className="chartCust">
                <Button onClick={handleLineClick}>Line Chart</Button>
                <Button onClick={handleBarClick}>Bar Chart</Button>
            </div>
            <div className="daysCust">
                <Button onClick={()=>updateDays(865)}>865 days</Button>
                <Button onClick={()=>updateDays(365)}>365 days</Button>
                <Button onClick={()=>updateDays(180)}>180 days</Button>
                <Button onClick={()=>updateDays(90)}>90 days</Button>
                <Button onClick={()=>updateDays(60)}>60 days</Button>
                <Button onClick={()=>updateDays(30)}>30 days</Button>
                <Button onClick={()=>updateDays(15)}>15 days</Button>
            </div>
        </div>
    )
}

export default Statistics;