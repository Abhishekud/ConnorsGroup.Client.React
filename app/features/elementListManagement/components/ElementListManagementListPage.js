import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {UnitsOfMeasureListPage} from '../../elementUnitsOfMeasure/components';
import {ActivitiesListPage} from '../../elementActivities/components';
import {
  ELEMENT_ACTIVITIES,
  ELEMENT_UNITS_OF_MEASURE,
} from '../constants/listOptions';
import {
  setSelectedElementListOption,
} from '../actions';
import {
  selectedElementListOptionIdSelector,
} from '../selectors/pages/elementListManagement';
import {withRouter} from 'react-router';

class ElementListManagementListPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleListOptionSelected(option) {
    this.props.setSelectedElementListOption(Number(option.target.value));
  }

  render() {
    const {selectedOptionId} = this.props;
    const elementListOptions = [
      {value: ELEMENT_ACTIVITIES, label: 'Activities'},
      {value: ELEMENT_UNITS_OF_MEASURE, label: 'Units Of Measure'},
    ];
    if (selectedOptionId === ELEMENT_ACTIVITIES) {
      return <ActivitiesListPage elementListOptions={elementListOptions} selectedElementListOptionId={selectedOptionId} onListOptionSelected={this.handleListOptionSelected} />;
    }

    return <UnitsOfMeasureListPage elementListOptions={elementListOptions} selectedElementListOptionId={selectedOptionId} onListOptionSelected={this.handleListOptionSelected} />;
  }
}

function mapStateToProps(state) {
  return {
    selectedOptionId: selectedElementListOptionIdSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    setSelectedElementListOption,
  }
)(ElementListManagementListPage));
