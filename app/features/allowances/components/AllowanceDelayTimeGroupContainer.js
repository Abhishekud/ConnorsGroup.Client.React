import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import React, {PureComponent} from 'react';
import {toggleAllowanceTimeGroup} from '../actions';
import {
  allowanceSelector,
  makeConstantAllowanceTimeGroupCollapsedSelector,
  allowanceDelayTimesSelector,
} from '../selectors/pages/builder';
import AllowanceDelayTimeGroup from './AllowanceDelayTimeGroup';
import {DELAY} from '../constants/allowanceTimeTypes';
import {allowanceDefinitions} from '../constants';

class AllowanceDelayTimeContainer extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleToggleAllowanceTimeGroup() {
    const {toggleAllowanceTimeGroup} = this.props;
    toggleAllowanceTimeGroup(DELAY);
  }

  render() {
    const {allowance, allowanceTimes, collapsed} = this.props;

    return (
      <AllowanceDelayTimeGroup
        name="Delay Time"
        definition={allowanceDefinitions.DELAY_TIME}
        totalDelayTimePercent={allowance.totalDelayTimePercent}
        totalDelayTimeMinutes={allowance.totalDelayTimeMinutes}
        allowanceTimes={allowanceTimes}
        collapsed={collapsed}
        onToggle={this.handleToggleAllowanceTimeGroup} />
    );
  }
}

function makeMapStateToProps() {
  const allowanceTimeGroupCollapsedSelector = makeConstantAllowanceTimeGroupCollapsedSelector(DELAY);

  return state => ({
    allowance: allowanceSelector(state),
    allowanceTimes: allowanceDelayTimesSelector(state),
    collapsed: allowanceTimeGroupCollapsedSelector(state),
  });
}

export default withRouter(connect(
  makeMapStateToProps,
  {
    toggleAllowanceTimeGroup,
  }
)(AllowanceDelayTimeContainer));
