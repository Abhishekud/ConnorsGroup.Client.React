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
} from '../selectors/pages/details';
import IndustryAllowanceRestTime from './IndustryAllowanceRestTime';
import {REST} from '../../allowances/constants/allowanceTimeTypes';

class IndustryAllowanceRestTimeContainer extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleToggleAllowanceTimeGroup() {
    this.props.toggleAllowanceTimeGroup(REST);
  }

  render() {
    const {name, totalRestTime, collapsed, allowance, includedPaidBreaksMinutes, excludedPaidBreaksMinutes, totalIncludedAndExcludedPaidBreaksMinutes, restOffsetMinutes, totalRestMinutes} = this.props;

    return (
      <IndustryAllowanceRestTime
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

function mapStateToProps() {
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
  mapStateToProps,
  {
    toggleAllowanceTimeGroup,
  }
)(IndustryAllowanceRestTimeContainer));
