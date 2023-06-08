import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {
  toggleAllowanceTimeGroup,
} from '../actions';
import {
  makeSortedAllowanceTimesOfTypeSelector,
  makeAllowanceTimeGroupCollapsedSelector,
} from '../selectors/pages/details';
import IndustryAllowanceTimeGroup from './IndustryAllowanceTimeGroup';

class IndustryAllowanceTimeGroupContainer extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleToggleAllowanceTimeGroup() {
    const {allowanceTimeType, toggleAllowanceTimeGroup} = this.props;
    toggleAllowanceTimeGroup(allowanceTimeType);
  }

  render() {
    const {name, definition, allowanceTimes, collapsed} = this.props;
    return (
      <IndustryAllowanceTimeGroup
        name={name}
        definition={definition}
        allowanceTimes={allowanceTimes}
        collapsed={collapsed}
        onToggle={this.handleToggleAllowanceTimeGroup} />
    );
  }
}

IndustryAllowanceTimeGroupContainer.propTypes = {
  name: PropTypes.string.isRequired,
  definition: PropTypes.string,
  allowanceTimeType: PropTypes.string.isRequired,
};

function mapStateToProps() {
  const sortedAllowanceTimesOfTypeSelector = makeSortedAllowanceTimesOfTypeSelector();
  const allowanceTimeGroupCollapsedSelector = makeAllowanceTimeGroupCollapsedSelector();

  return (state, ownProps) => ({
    allowanceTimes: sortedAllowanceTimesOfTypeSelector(state, ownProps),
    collapsed: allowanceTimeGroupCollapsedSelector(state, ownProps),
  });
}

export default withRouter(connect(
  mapStateToProps,
  {
    toggleAllowanceTimeGroup,
  }
)(IndustryAllowanceTimeGroupContainer));
