import React from 'react';
// import { Route } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import UsersListPage, { loadData } from './pages/UsersListPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminsListPage from './pages/AdminsListPage';

// This was before introducing react-router-config
// export default () => {
//   return (
//     <div>
//       <Route exact path="/" component={Home} />
//       <Route path="/users" component={UsersList} />
//     </div>
//   );
// };

// <Route path="/hi" component={() => 'Hi'} />

// so we need to follow this approach of defining an array of routes
// instead of using traditional JSX approach like above, if we are using the react-router-config package
// this is needed for SSR - in order to figure out what components would have rendered (based on or given some url)

// The HomePage and UsersListPage components will be nested inside App component
// We did not tie a path to the App component, that means it will always be displayed on the screen
export default [
  {
    ...App,
    routes: [
      {
        // component: HomePage,
        // in order to resolve importing loadData funcs (naming conflict) from multiple Pages,
        // we can just import an object from each component { component: UsersList, loadData: loadData}
        // and use spread operator to pass it to the routes array Here
        ...HomePage,
        path: '/',
        exact: true
      },
      {
        ...AdminsListPage,
        path: '/admins'
      },
      {
        // loadData,
        // component: UsersListPage,
        ...UsersListPage,
        path: '/users'
      },
      {
        ...NotFoundPage
        // by not providing a path react router will show this component if could not find a match any other defined routes
      }
    ]
  }
];
