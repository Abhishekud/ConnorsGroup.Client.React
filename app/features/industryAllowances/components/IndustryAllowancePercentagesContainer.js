import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import React, {PureComponent} from 'react';
import {toggleAllowanceTimeGroup} from '../actions';
import {
  allowanceSelector,
  makeConstantAllowanceTimeGroupCollapsedSelector,
} from '../selectors/pages/details';
import IndustryAllowancePercentages from './IndustryAllowancePercentages';
import {PERCENTAGES} from '../../allowances/constants/allowanceTimeTypes';

class IndustryAllowancePercentagesContainer extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleToggleAllowanceTimeGroup() {
    this.props.toggleAllowanceTimeGroup(PERCENTAGES);
  }

  render() {
    const {name, allowance, collapsed} = this.props;

    return (
      <IndustryAllowancePercentages
        name={name}
        allowance={allowance}
        collapsed={collapsed}
        onToggle={this.handleToggleAllowanceTimeGroup} />
    );
  }
}

function mapStateToProps() {
  const allowanceTimeGroupCollapsedSelector = makeConstantAllowanceTimeGroupCollapsedSelector(PERCENTAGES);

  return state => ({
    allowance: allowanceSelector(state),
    collapsed: allowanceTimeGroupCollapsedSelector(state),
  });
}

export default withRouter(connect(
  mapStateToProps,
  {
    toggleAllowanceTimeGroup,
  }
)(IndustryAllowancePercentagesContainer));
