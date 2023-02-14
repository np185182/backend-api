import { Button } from '@mui/material';
import React, { useState } from 'react';
import Statistics from './Statistics';
import Compare from './Compare';
import { OrderTrendDto } from '../shared/dto/orderTrendDto';

const OrderTrend = (props : {orderList : OrderTrendDto[]})=>{
    const [isStats, SetStats] = useState(true);

    const mapList = new Map();
    
    props.orderList.map((e : OrderTrendDto)=>{
        e = {...e,OrderDate : e.OrderDate.slice(0,10)}
        mapList.set(e.OrderDate,e);
    });

    const handleStatsClick = () => {
        SetStats(true);
    }
    const handleCompareClick = () => {
        SetStats(false);
    }

    return (
        <div className="order_trend">
            <div className="toggle_trend">
                <Button variant={isStats?"contained":"outlined"} onClick={handleStatsClick}>Statistics</Button>
                <Button variant={!isStats?"contained":"outlined"} onClick={handleCompareClick}>Customise & Compare</Button>
            </div>
            {isStats ? <Statistics orderList={props.orderList}/> : <Compare orderMap={mapList}/>}
        </div>
    )
}

export default OrderTrend;
