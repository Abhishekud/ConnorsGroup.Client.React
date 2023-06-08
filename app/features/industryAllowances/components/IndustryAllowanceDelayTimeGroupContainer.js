import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import React, {PureComponent} from 'react';
import {toggleAllowanceTimeGroup} from '../actions';
import {
  allowanceSelector,
  makeConstantAllowanceTimeGroupCollapsedSelector,
  allowanceDelayTimesSelector,
} from '../selectors/pages/details';
import IndustryAllowanceDelayTimeGroup from './IndustryAllowanceDelayTimeGroup';
import {DELAY} from '../../allowances/constants/allowanceTimeTypes';
import {allowanceDefinitions} from '../../allowances/constants';

class IndustryAllowanceDelayTimeContainer extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleToggleAllowanceTimeGroup() {
    this.props.toggleAllowanceTimeGroup(DELAY);
  }

  render() {
    const {allowance, allowanceTimes, collapsed} = this.props;

    return (
      <IndustryAllowanceDelayTimeGroup
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

function mapStateToProps() {
  const allowanceTimeGroupCollapsedSelector = makeConstantAllowanceTimeGroupCollapsedSelector(DELAY);

  return state => ({
    allowance: allowanceSelector(state),
    allowanceTimes: allowanceDelayTimesSelector(state),
    collapsed: allowanceTimeGroupCollapsedSelector(state),
  });
}

export default withRouter(connect(
  mapStateToProps,
  {
    toggleAllowanceTimeGroup,
  }
)(IndustryAllowanceDelayTimeContainer));
