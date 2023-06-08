import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';

import {
  activeBackgroundJobsSelector,
  backgroundJobStartedSelector,
} from '../selectors/modals';
import {backgroundJobFinished} from '../actions';
import {pollBackgroundJobs} from '../../shared/actions';
import {POLL_INTERVAL} from '../../shared/constants/backgroundJobs';
import {pollTimer} from '../../shared/services';

class Notifications extends Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);

    pollTimer.set(this.checkBackgroundJobs, POLL_INTERVAL);
  }

  componentDidMount() {}

  componentWillUnmount() {
    pollTimer.clear();
  }

  checkBackgroundJobs() {
    const {pollBackgroundJobs, backgroundJobTypes, activeBackgroundJobs, backgroundJobStarted} = this.props;
    pollBackgroundJobs(backgroundJobTypes);
    if (!activeBackgroundJobs && backgroundJobStarted) {
      this.props.backgroundJobFinished();
    }
  }

  render() {
    return (
      <span />
    );
  }
}

function mapStateToProps(state) {
  return {
    activeBackgroundJobs: activeBackgroundJobsSelector(state),
    backgroundJobStarted: backgroundJobStartedSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    backgroundJobFinished,
    pollBackgroundJobs,
  }
)(Notifications));
