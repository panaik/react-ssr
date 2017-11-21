import React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from './components/Header';
import { fetchCurrentUser } from './actions';

// any child routes that get matched during the matchRoutes process,
// we will passed into the App component as a prop called route
// renderRoutes will convert those routes into components and render them
const App = ({ route }) => {
  return (
    <div>
      <Header />
      {renderRoutes(route.routes)}
    </div>
  );
};

// instead of writing a separate loadData function, we will just write it inline here
// also we only to pass dispatch to the function and not the entire Redux store
export default {
  component: App,
  loadData: ({ dispatch }) => dispatch(fetchCurrentUser())
};
