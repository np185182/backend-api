import React from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrderTrend from './components/OrderTrend';
import { useQuery, gql } from "@apollo/client";
import { Li, OrderTrendDto } from './shared/dto/orderTrendDto';
import { DAYS } from './shared/config';

const FILMS_QUERY = gql`
  query HelloGetData($input : Int!){
    ordertrend(days : $input){
      OrderDate
      AttemptedOrders
      CompletedOrders
      TotalOrders
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery<Li>(FILMS_QUERY, {
    variables: { input: DAYS },
  });

  const li: OrderTrendDto[] | undefined = data?.ordertrend;

  var original: OrderTrendDto[] = [];

  li?.map((e: OrderTrendDto) => {
    original.push(e);
  })
  

  return (
    <div className="hello">
      <NavBar />
      <Router>
        <Routes>
          <Route path="/order" element={<OrderTrend orderList={original} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
