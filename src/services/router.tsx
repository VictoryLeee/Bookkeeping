import React from 'react';
import { Redirect } from 'react-router-dom';
import DetailPage from '../pages/detail/DetailPage';
import ChartPage from '../pages/chart/ChartPage';
import { RouteConfig } from 'react-router-config';

export const ROUTE_CONFIG: RouteConfig[] = [
    {
      path: '/',
      exact: true,
      component: DetailPage,
    },
    {
      path: '/chart',
      exact: true,
      component: ChartPage,
    },
    {
      render: () => <Redirect to={'/'} />,
    },
  ]