import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {
  toggleAllowanceTimeGroup,
  showCreateAllowanceTime,
} from '../actions';
import {
  makeSortedAllowanceTimesOfTypeSelector,
  makeAllowanceTimeGroupCollapsedSelector,
} from '../selectors/pages/builder';
import AllowanceTimeGroup from './AllowanceTimeGroup';

class AllowanceTimeGroupContainer extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleToggleAllowanceTimeGroup() {
    const {allowanceTimeType, toggleAllowanceTimeGroup} = this.props;
    toggleAllowanceTimeGroup(allowanceTimeType);
  }

  handleAddAllowanceTimeToGroup() {
    const {showCreateAllowanceTime, allowanceId, allowanceTimeType} = this.props;
    showCreateAllowanceTime(allowanceId, allowanceTimeType);
  }

  render() {
    const {name, definition, allowanceTimes, allowAdd, collapsed, disabled} = this.props;

    return (
      <AllowanceTimeGroup
        name={name}
        definition={definition}
        allowanceTimes={allowanceTimes}
        collapsed={collapsed}
        disabled={disabled}
        allowAdd={allowAdd}
        onToggle={this.handleToggleAllowanceTimeGroup}
        onAddTime={this.handleAddAllowanceTimeToGroup} />
    );
  }
}

AllowanceTimeGroupContainer.propTypes = {
  allowanceId: PropTypes.number,
  name: PropTypes.string.isRequired,
  definition: PropTypes.string,
  allowanceTimeType: PropTypes.string.isRequired,
  allowAdd: PropTypes.bool,
};

function makeMapStateToProps() {
  const sortedAllowanceTimesOfTypeSelector = makeSortedAllowanceTimesOfTypeSelector();
  const allowanceTimeGroupCollapsedSelector = makeAllowanceTimeGroupCollapsedSelector();

  return (state, ownProps) => ({
    allowanceTimes: sortedAllowanceTimesOfTypeSelector(state, ownProps),
    collapsed: allowanceTimeGroupCollapsedSelector(state, ownProps),
  });
}

export default withRouter(connect(
  makeMapStateToProps,
  {
    toggleAllowanceTimeGroup,
    showCreateAllowanceTime,
  }
)(AllowanceTimeGroupContainer));
