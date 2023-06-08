import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router';
import {ORG_HIERARCHY_LEVELS} from '../../selectListOptions/constants/selectListTypes';
import {makeSelectListOptionsArraySelector} from '../../selectListOptions/selectors';
import {makeClasses} from '../../shared/services';

class NavigationBarItem extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleOnClick(event) {
    const {onClick, disabled} = this.props;
    if (disabled) return;
    onClick(event);
  }

  render() {
    const {name, selected, disabled} = this.props;
    return (
      <div className={makeClasses({'navigation-bar-item': true, selected})}>
        <span className={makeClasses({'clickable': true, disabled})} onClick={this.handleOnClick}>{name}</span>
      </div>
    );
  }
}

NavigationBarItem.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

function makeMapStateToProps() {
  const orgHierarchyLevelsSelector = makeSelectListOptionsArraySelector(ORG_HIERARCHY_LEVELS);

  return state => ({
    orgHierarchyLevels: orgHierarchyLevelsSelector(state),
  });
}

export default withRouter(connect(
  makeMapStateToProps,
  {
  }
)(NavigationBarItem));
