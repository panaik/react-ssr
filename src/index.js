// const express = require('express');
// const React = require('react');
// const renderToString = require('react-dom/server').renderToString;
// const Home = require('./client/components/Home').default;

import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

const app = express();

// this second argument proxyReqOptDecorator is only needed because the way this proxy server is setup by Stephen
// to get around with some security error with Google OAuth flow
app.use(
  '/api',
  proxy('http://react-ssr-api.herokuapp.com', {
    proxyReqOptDecorator(opts) {
      opts.headers['x-forwarded-host'] = 'localhost:3000';
      return opts;
    }
  })
);

app.use(express.static('public'));

app.get('*', (req, res) => {
  const store = createStore(req);

  // this way of creating store is different than how we would normally follow in browser side React Redux app
  // Some logic to initialize and load data into the store

  // matchRoutes takes routes configuration array and the route that user is attempting to view
  // console.log(matchRoutes(Routes, req.path));
  // the map function will return an array of promises, as each loadData function returns a promise
  // e.g. one promise could represent a network request made to fetch some data
  // so once that promise is resolved we can render that component or app
  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => {
      return route.loadData ? route.loadData(store) : null;
    })
    .map(promise => {
      // route.loadData returns a promise
      // so we need to check if a promise is present or null from the above ternary expression
      // if its a promise, we create a new Promise
      if (promise) {
        return new Promise((resolve, reject) => {
          // whenever the original promise resolves, we will instantly call this new Promise's passed 'resolve' function
          // we will also call resolve if the original promise fails, the new Promise's catch block runs
          promise.then(resolve).catch(resolve);
        });
      }
    });

  // console.log(promises);

  // the context object lets us connect/communicate the Static Router to Express,
  // so that we can set the response status based on whether route was matched or not
  // example, if there is no route matched, then we show the NotFoundPage, and need to set the
  // response status to 404 in the returned Express response
  Promise.all(promises).then(() => {
    const context = {};
    const content = renderer(req, store, context);

    // to set the response status check if the rendered component set context.notFound to true
    // if its true then set response status to 404
    // console.log(context);

    // this 'if' will handle redirects when user is attempt to navigating to /admins if the user is not authenticated
    if (context.url) {
      return res.redirect(301, context.url);
    }

    if (context.notFound) {
      res.status(404);
    }

    res.send(content);
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
