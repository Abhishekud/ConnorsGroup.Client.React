import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {DepartmentsListPage} from '../../departments/components';
import {ClassificationsListPage} from '../../classifications/components';
import {JobClassesListPage} from '../../jobClasses/components';
import {LaborCategoriesListPage} from '../../laborCategories/components';
import {UnitsOfMeasureListPage} from '../../unitsOfMeasure/components';
import {VolumeDriversListPage} from '../../volumeDrivers/components';
import {StandardFilingFieldOptionsListPage} from '../../standardFilingFieldOptions/components';
import {
  STANDARDS_LIST_OPTION_DEPARTMENTS,
  STANDARDS_LIST_OPTION_CLASSIFICATIONS,
  STANDARDS_LIST_OPTION_JOB_CLASSES,
  STANDARDS_LIST_OPTION_LABOR_CATEGORIES,
  STANDARDS_LIST_OPTION_UNITS_OF_MEASURE,
  STANDARDS_LIST_OPTION_VOLUME_DRIVERS,
} from '../constants/listOptions';
import {selectedStandardsListTypeSelector} from '../selectors';

export class StandardsListManagementPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {selectedStandardsListType} = this.props;

    switch (selectedStandardsListType) {
      case STANDARDS_LIST_OPTION_DEPARTMENTS:
        return <DepartmentsListPage />;
      case STANDARDS_LIST_OPTION_CLASSIFICATIONS:
        return <ClassificationsListPage />;
      case STANDARDS_LIST_OPTION_JOB_CLASSES:
        return <JobClassesListPage />;
      case STANDARDS_LIST_OPTION_LABOR_CATEGORIES:
        return <LaborCategoriesListPage />;
      case STANDARDS_LIST_OPTION_UNITS_OF_MEASURE:
        return <UnitsOfMeasureListPage />;
      case STANDARDS_LIST_OPTION_VOLUME_DRIVERS:
        return <VolumeDriversListPage />;
      default:
        return <StandardFilingFieldOptionsListPage selectedStandardFilingFieldId={selectedStandardsListType} />;
    }
  }
}

function mapStateToProps(state) {
  return {
    selectedStandardsListType: selectedStandardsListTypeSelector(state),
  };
}

export default withRouter(connect(mapStateToProps, {})(StandardsListManagementPage));
