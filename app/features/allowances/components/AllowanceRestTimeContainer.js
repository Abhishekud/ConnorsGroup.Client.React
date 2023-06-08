import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import React, {PureComponent} from 'react';
import {toggleAllowanceTimeGroup} from '../actions';
import {
  totalRestTimeSelector,
  makeConstantAllowanceTimeGroupCollapsedSelector,
  allowanceSelector,
  includedPaidBreaksSelector,
  excludedPaidBreaksSelector,
  totalIncludedAndExcludedPaidBreaksSelector,
  restOffsetMinutesSelector,
  totalRestMinutesSelector,
} from '../selectors/pages/builder';
import AllowanceRestTime from './AllowanceRestTime';
import {REST} from '../constants/allowanceTimeTypes';

class AllowanceRestTimeContainer extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleToggleAllowanceTimeGroup() {
    const {toggleAllowanceTimeGroup} = this.props;
    toggleAllowanceTimeGroup(REST);
  }

  render() {
    const {name, totalRestTime, collapsed, allowance, includedPaidBreaksMinutes, excludedPaidBreaksMinutes, totalIncludedAndExcludedPaidBreaksMinutes, restOffsetMinutes, totalRestMinutes} = this.props;

    return (
      <AllowanceRestTime
        name={name}
        totalRestTimeAllowedMinutes={allowance.totalRestTimeAllowedMinutes}
        totalRestTimeAllowedPercent={allowance.totalRestTimeAllowedPercent}
        includedPaidBreaksMinutes={includedPaidBreaksMinutes}
        excludedPaidBreaksMinutes={excludedPaidBreaksMinutes}
        totalIncludedAndExcludedPaidBreaksMinutes={totalIncludedAndExcludedPaidBreaksMinutes}
        restOffsetMinutes={restOffsetMinutes}
        totalRestMinutes={totalRestMinutes}
        totalRestTime={totalRestTime}
        collapsed={collapsed}
        onToggle={this.handleToggleAllowanceTimeGroup} />
    );
  }
}

function makeMapStateToProps() {
  const allowanceTimeGroupCollapsedSelector = makeConstantAllowanceTimeGroupCollapsedSelector(REST);

  return state => ({
    totalRestTime: totalRestTimeSelector(state),
    allowance: allowanceSelector(state),
    includedPaidBreaksMinutes: includedPaidBreaksSelector(state),
    excludedPaidBreaksMinutes: excludedPaidBreaksSelector(state),
    totalIncludedAndExcludedPaidBreaksMinutes: totalIncludedAndExcludedPaidBreaksSelector(state),
    restOffsetMinutes: restOffsetMinutesSelector(state),
    totalRestMinutes: totalRestMinutesSelector(state),
    collapsed: allowanceTimeGroupCollapsedSelector(state),
  });
}

export default withRouter(connect(
  makeMapStateToProps,
  {
    toggleAllowanceTimeGroup,
  }
)(AllowanceRestTimeContainer));
