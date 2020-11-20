import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Signin from '../pages/Signin';

const AuthRoutes = () => {
  return (
    <BrowserRouter>
      <Route component={Signin} path="/" exact/> 
    </BrowserRouter>
  );
};

export default AuthRoutes;