import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  clearSelectedDashboardLaborProjectionsDepartment,
} from '../actions';
import {
  selectedDepartmentNameSelector,
} from '../selectors/pages/dashboard';
import {
  departmentNameSelector,
} from '../../shared/selectors/components/settings';
import pluralize from 'pluralize';
import {makeClasses} from '../../shared/services';

class Breadcrumbs extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleClearDepartment() {
    this.props.clearSelectedDashboardLaborProjectionsDepartment();
  }

  renderDepartmentInfo() {
    const {departmentName, selectedDepartmentName} = this.props;
    const classes = makeClasses({'item-name': true, 'clickable': selectedDepartmentName !== null});
    return (
      <div className="breadcrumb-item">
        <div className={classes} onClick={this.handleClearDepartment}>{pluralize(departmentName)}</div>
        {selectedDepartmentName === null
          ? null
          : <div className="item-value">{selectedDepartmentName}</div>}
      </div>
    );
  }

  renderStandardInfo() {
    const {selectedDepartmentName} = this.props;
    if (selectedDepartmentName === null) return null;
    return (
      <div className="breadcrumb-item">
        <i className="fa fa-angle-right" />
        <div className="item-name">Standards</div>
      </div>
    );
  }

  render() {
    return (
      <div className="bread-crumbs">
        {this.renderDepartmentInfo()}
        {this.renderStandardInfo()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedDepartmentName: selectedDepartmentNameSelector(state),
    departmentName: departmentNameSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {
    clearSelectedDashboardLaborProjectionsDepartment,
  }
)(Breadcrumbs);
