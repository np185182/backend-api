import React, { useEffect } from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrderTrend from './components/OrderTrend';
import { useQuery, gql } from "@apollo/client";

import { DAYS } from './shared/config';
import { NewUsersDTO } from './shared/dto/newUsersDto';
import SwipeableTemporaryDrawer from './components/NewUsersComponents/sideBar';
import BarsClick from './components/mycomponents/barchart';
import StyledDrawer from './components/NewUsersComponents/sideBar';
import { DataFromGraphql } from './shared/utils/Graphql/gqlHelper';
import NewUsers from './components/NewUsersComponents/NewUser';
//import newUserSlice, { gettingnewUsersDates, settingnewUsersDates } from './shared/utils/redux/reducers/newUserReducer';
import { AppDispatch } from '../src/shared/utils/redux/store';
import { useAppDispatch,useAppSelector } from './shared/utils/redux/selectors/hooks';
import { Fetchnewusersdata,  } from './shared/utils/redux/reducers/newUserReducer';
import PersistentDrawerRight from './components/NewUsersComponents/SideBarDemo';
import NewUserDemo from './containers/newCustomers/newUserDemo';

  

function App() {

  const dispatch = useAppDispatch();

  
  dispatch(Fetchnewusersdata())

  const original:any=[]
  return (
   <div className="hello" style={{marginTop:0}}>
      {/* <header style={{paddingTop:0,paddingBottom:30}}><NavBar/></header> */}
      <Router>
        <Routes>
          <Route path='/a' element={<NewUserDemo/>}/>
          <Route path='/' element={<NewUsers />}/>
          <Route path='/s' element={<PersistentDrawerRight />}/>
          <Route path="/Order" element={<OrderTrend orderList={original} />} />
        </Routes>
      </Router></div>
    
  );
}

export default App;
