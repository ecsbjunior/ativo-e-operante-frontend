import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Complaints from '../pages/Complaints';
import ProblemType from '../pages/ProblemType';
import CompetentOrgan from '../pages/CompetentOrgan';
import Complaint from '../pages/Complaint';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact/>
      <Route component={Complaints} path="/complaints" exact/>
      <Route component={Complaint} path="/complaints/:id"/>
      <Route component={ProblemType} path="/problem-types"/>
      <Route component={CompetentOrgan} path="/competent-organs"/>
    </BrowserRouter>
  );
};

export default AppRoutes;