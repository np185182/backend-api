import React, { useEffect, useState } from 'react'
import { OrderTrendDto, gType } from '../shared/dto/orderTrendDto';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Portal, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import '../shared/css/NavBar.css';
import { Bar } from 'react-chartjs-2';
import { GRAPH_OPTIONS } from '../shared/config';
import { DUMMY_DATA } from '../shared/global_constants';


const Compare = (props: { orderMap: Map<String, OrderTrendDto> }) => {
    const [value, setValue] = useState<Dayjs | null>(null);
    const [dateList, SetDateList] = useState<(OrderTrendDto)[]>([]);
    const [graphData,SetGraphData] = useState<gType>(DUMMY_DATA);

    const minimum : String = Array.from(props.orderMap)[0][0];
    const maximum : String = Array.from(props.orderMap)[props.orderMap.size-1][0];
    
    const handleDelete = (e: OrderTrendDto) => {
        SetDateList(dateList.filter(item => item != e));
    }

    useEffect(()=>{
        var temp_graphData = {
            labels: dateList.map((item) => item.OrderDate.slice(0, 10)),
            datasets: [
                {
                  label: 'AttemptedOrders',
                  data: dateList.map((item) => item.AttemptedOrders),
                  borderColor: '#FA8231',
                  backgroundColor: '#FA8231',
                },
                {
                  label: 'CompletedOrders',
                  data: dateList.map((item) => item.CompletedOrders),
                  borderColor: '#3C40C6',
                  backgroundColor: '#3C40C6',
                },
                {
                  label: 'TotalOrders',
                  data: dateList.map((item) => item.TotalOrders),
                  borderColor: '#55B74E',
                  backgroundColor: '#55B74E',
                },
              ],
        }
        SetGraphData(temp_graphData);
    },[dateList]);
    return (
        <div className="compareTab">

            <div className="stats_bar">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker onYearChange={undefined} className="sha"
                        value={value}
                        // minDate={minimum}
                        // maxDate={maximum}
                        // maxDate={}
                        onChange={(newValue) => {
                            setValue(newValue);
                            const monthVal : number = newValue?.get('month')! + 1;
                            const mVal : string = monthVal<10?'0'+monthVal:monthVal.toString();
                            const val: string = newValue?.get('year').toString()! + '-' + mVal + '-' + newValue?.get('date').toString()!;
                            if(props.orderMap.has(val))
                                SetDateList([...dateList, props.orderMap.get(val)!]);
                            else
                                alert('Date not found');
                            setValue(null);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <div className="dateListbox">
                    {
                        dateList.map((e: OrderTrendDto) => {
                            return (
                                <div className="chipObject">
                                    <p>{e.OrderDate}</p>
                                    <p onClick={() => handleDelete(e)}>x</p>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
                <Bar options={GRAPH_OPTIONS} data={graphData}/>
        </div>
    )
}

export default Compare;
