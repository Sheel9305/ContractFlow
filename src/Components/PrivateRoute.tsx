import React from 'react';
import {RootState} from '../store/store';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute:React.FC<{element: React.ReactElement}> = ({element}) => {

    const isLogged = useSelector((state:RootState) => state.auth.isloggedin);
  return (isLogged ? element : <Navigate to="/login" />);
}

export default PrivateRoute;
