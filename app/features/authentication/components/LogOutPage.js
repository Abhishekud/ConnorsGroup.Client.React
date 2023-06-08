import {connect} from 'react-redux';
import {logOut} from '../actions';
import {withRouter} from 'react-router';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import LoadingOverlay from 'react-loading-overlay';

class LogOutPage extends Component {
  componentDidMount() {
    const {logOut} = this.props;

    logOut();
    setTimeout(() => {
      window.location.href = `${process.env.API_BASE_URL}authentication/log-out?redirectUri=${encodeURIComponent(process.env.APP_BASE_URL)}`;
    });
  }

  render() {
    return <LoadingOverlay active text="Logging out..." className="loading-overlay" />;
  }
}

LogOutPage.propTypes = {
  logOut: PropTypes.func.isRequired,
};

export default withRouter(connect(
  null,
  {
    logOut,
  }
)(LogOutPage));
