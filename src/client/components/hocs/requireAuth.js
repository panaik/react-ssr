import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// Higher Order Components are Functions
export default ChildComponent => {
  class RequireAuth extends Component {
    render() {
      switch (this.props.auth) {
        case false:
          return <Redirect to="/" />; //Redirect to root route if authenticated fails or not signed in
        case null:
          return <div>Loading...</div>;
        default:
          return <ChildComponent {...this.props} />;
        // pass any props passed to HOC to the ChildComponent as well
        // if the user is authenticated then return the ChildComponent, which could be AdminsListPage
        //  as we want to show AdminsListPage only if user is authenticated and signed in
      }
    }
  }

  function mapStateToProps({ auth }) {
    return { auth };
  }

  return connect(mapStateToProps)(RequireAuth);
};
