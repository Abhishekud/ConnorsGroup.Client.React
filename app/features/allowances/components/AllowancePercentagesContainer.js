import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import React, {PureComponent} from 'react';
import {toggleAllowanceTimeGroup} from '../actions';
import {
  allowanceSelector,
  makeConstantAllowanceTimeGroupCollapsedSelector,
} from '../selectors/pages/builder';
import AllowancePercentages from './AllowancePercentages';
import {PERCENTAGES} from '../constants/allowanceTimeTypes';

class AllowancePercentagesContainer extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleToggleAllowanceTimeGroup() {
    const {toggleAllowanceTimeGroup} = this.props;
    toggleAllowanceTimeGroup(PERCENTAGES);
  }

  render() {
    const {name, allowance, collapsed} = this.props;

    return (
      <AllowancePercentages
        name={name}
        allowance={allowance}
        collapsed={collapsed}
        onToggle={this.handleToggleAllowanceTimeGroup} />
    );
  }
}

function makeMapStateToProps() {
  const allowanceTimeGroupCollapsedSelector = makeConstantAllowanceTimeGroupCollapsedSelector(PERCENTAGES);

  return state => ({
    allowance: allowanceSelector(state),
    collapsed: allowanceTimeGroupCollapsedSelector(state),
  });
}

export default withRouter(connect(
  makeMapStateToProps,
  {
    toggleAllowanceTimeGroup,
  }
)(AllowancePercentagesContainer));
