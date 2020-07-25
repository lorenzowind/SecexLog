import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import ManualSearch from '../pages/ManualSearch';
import AutomaticSearch from '../pages/AutomaticSearch';
import ResultSearch from '../pages/ResultSearch';

// Authenticated Routes
import Dashboard from '../pages/Dashboard';
import ListingData from '../pages/CRUD/ListingData';

import CityForm from '../pages/CRUD/CityForm';
import HolidayForm from '../pages/CRUD/HolidayForm';
import ModalForm from '../pages/CRUD/ModalForm';
import PathForm from '../pages/CRUD/PathForm';
import ProviderForm from '../pages/CRUD/ProviderForm';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={ManualSearch} />
    <Route path="/automatic-search" component={AutomaticSearch} />
    <Route path="/result-search" component={ResultSearch} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/listing-data" component={ListingData} isPrivate />

    <Route path="/city-form" component={CityForm} isPrivate />
    <Route path="/holiday-form" component={HolidayForm} isPrivate />
    <Route path="/modal-form" component={ModalForm} isPrivate />
    <Route path="/path-form" component={PathForm} isPrivate />
    <Route path="/provider-form" component={ProviderForm} isPrivate />
  </Switch>
);

export default Routes;
