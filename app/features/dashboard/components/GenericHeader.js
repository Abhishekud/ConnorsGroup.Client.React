import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import {
  clearSelectedDashboardLaborProjectionsData,
} from '../actions';
import {
  selectedLocationNameSelector,
  selectedLocationDescriptionSelector,
  selectedLocationProfileNameSelector,
} from '../selectors/pages/dashboard';
import {
  locationNameSelector,
} from '../../shared/selectors/components/settings';

class GenericHeader extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleResetLocation() {
    this.props.clearSelectedDashboardLaborProjectionsData(false);
  }

  render() {
    const {children, selectedLocationName, selectedLocationDescription, selectedLocationProfileName, locationName} = this.props;
    return (
      <div className="header-info">
        <div className="title-block">
          <div className="title">
            {selectedLocationName}
            <div className="description">{selectedLocationDescription}</div>
          </div>
          <div className="sub-title">{selectedLocationProfileName}</div>
        </div>
        <div className="reset-location">
          {children}
          <Button onClick={this.handleResetLocation}>Reset {locationName}</Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedLocationName: selectedLocationNameSelector(state),
    selectedLocationDescription: selectedLocationDescriptionSelector(state),
    selectedLocationProfileName: selectedLocationProfileNameSelector(state),
    locationName: locationNameSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {
    clearSelectedDashboardLaborProjectionsData,
  }
)(GenericHeader);
