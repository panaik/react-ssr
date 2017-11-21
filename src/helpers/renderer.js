// Add all React related stuff on server side in this file,
// so keeping things simple in the server index.js file
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
import Routes from '../client/Routes';

export default (req, store, context) => {
  // const content = renderToString(<Home />);

  // The BrowserRouter has the ability to look directly at the browser's address bar
  // to figure out what the current path is and what set of components it needs to show on the screen

  // The StaticRouter however needs to be told exactly what the current path is that it needs to consider
  // So we need to somehow communicate the current path the user is trying to access to the StaticRouter
  // so that the StaticRouter knows what set of components to show on the screen

  // the current path that StaticRouter needs to consider is present in the original 'req' object
  // that express passed to the router handler inside the index.js file

  // context object passed to StaticRouter gives us the ability to communicate from
  // the rendered component back to this renderer file and the router

  // context object is used for things like setting response status to 404, navigation change, route redirects, etc.

  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );

  // renderStatic function returns an object of all the Helmet tags we loaded up inside the Helmet library
  const helmet = Helmet.renderStatic();

  // helmet.title.toString() - this will pull out any title tag that we setup inside our application,
  // and inject into our HTML template
  // example, see in UsersListPage component usage of <Helmet></Helmet>

  return `
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
        <script src="bundle.js"></script>
      </body>
    </html>
  `;
};
