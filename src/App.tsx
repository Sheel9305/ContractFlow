import React, { useEffect } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Contract from './Pages/Contract';
import Point from './Pages/Point';
import Invoice from './Pages/Invoice';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login';
import PrivateRoute from './Components/PrivateRoute';
import { useDispatch } from 'react-redux';
import { get_contracts } from './api/contracts_api';
import { addContract, clearContract } from './store/contractSlice';
import { get_points } from './api/points_api';
import { addPoint, clearPoints } from './store/pointSlice';


const App: React.FC = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const preload = async () => {

      try {
        const contracts = await get_contracts();
        dispatch(clearContract());
        contracts.data.forEach((contract: any) => dispatch(addContract(contract)));

        const points = await get_points();
        dispatch(clearPoints());
        points.data.forEach((point: any) => dispatch(addPoint(point)));
      } catch (err) {
        console.error("Error preloading data: ", err);
      }
    };

    preload();
  },[dispatch]);


  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={
            <Login />
          } />
          <Route path='/' element={
            <h2> Welcome To Contract Management</h2>
          } />
          <Route path='/contracts' element={
            <PrivateRoute element={
              <Contract />
            } />
          } />
          <Route path='/points' element={
            <PrivateRoute element={
              <Point />
            } />
          } />
          <Route path='/invoice' element={
            <PrivateRoute element={
              <Invoice />
            } />
          } />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App;
