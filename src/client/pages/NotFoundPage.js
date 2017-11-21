import React from 'react';

// staticContext comes as a prop from the StaticRouter to all rendered components
// we need to default the value of staticContext to be empty object,
// because in React client side app, staticContext will be not defined as there is no StaticRouter in client react app
const NotFoundPage = ({ staticContext = {} }) => {
  staticContext.notFound = true;
  return <h1>Oops, route not found.</h1>;
};

export default {
  component: NotFoundPage
};
