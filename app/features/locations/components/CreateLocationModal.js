import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {CreateEditModal} from '../../shared/components';
import CreateEditLocationForm from './CreateEditLocationForm';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/create';
import {
  cancelCreateLocation,
  createLocation,
  selectLocation,
  setCreateLocationModelProperty} from '../actions';
import React, {Component} from 'react';
import {
  locationNameSelector,
} from '../../shared/selectors/components/settings';
import {
  locationParentNameSelector,
} from '../../orgHierarchyLevels/selectors/pages/list';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {makeSelectListOptionsArrayWithBlankSelector} from '../../selectListOptions/selectors';
import {
  LOCATION_PROFILES,
  LOCATION_PARENTS,
} from '../../selectListOptions/constants/selectListTypes';
import kronosEnabledSelector from '../../kronos/shared/selectors/kronosEnabledSelector';

class CreateLocationModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setCreateLocationModelProperty(name, value);
  }

  handleActiveDateChange(date) {
    this.props.setCreateLocationModelProperty('activeDate', date);
  }

  handleInactiveDateChange(date) {
    this.props.setCreateLocationModelProperty('inactiveDate', date);
  }


  handleSave(event) {
    event.preventDefault();

    const {createLocation, model, locationName, router, onCreateLocation} = this.props;

    createLocation(model)
      .then(response => {
        onCreateLocation(response.action.payload.data.locationListEntry);
      })
      .catch(error => handleApiError(error, router, `An error occurred while attempting to add this ${locationName}.`, 'Error'));
  }

  render() {
    const {
      handleCancel, saving, show, model, validationErrors, locationName, locationParentName,
      locationProfiles, locationParents, kronosEnabled} = this.props;

    const form =
      <CreateEditLocationForm
        editing
        saving={saving}
        onFieldChange={this.handleFieldChange}
        onSubmit={this.handleSave}
        validationErrors={validationErrors}
        locationProfiles={locationProfiles}
        locationParents={locationParents}
        locationName={locationName}
        locationParentName={locationParentName}
        onActiveDateChange={this.handleActiveDateChange}
        onInactiveDateChange={this.handleInactiveDateChange}
        kronosEnabled={kronosEnabled}
        model={model} />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title={`New ${locationName}`}
        form={form}
        onCancel={handleCancel}
        onSave={this.handleSave} />
    );
  }
}

function mapStateToProps(state) {
  const locationProfilesSelector = makeSelectListOptionsArrayWithBlankSelector(LOCATION_PROFILES);
  const locationParentsSelector = makeSelectListOptionsArrayWithBlankSelector(LOCATION_PARENTS);

  return {
    saving: savingSelector(state),
    show: showSelector(state),
    model: modelSelector(state),
    validationErrors: validationErrorsSelector(state),
    locationName: locationNameSelector(state),
    locationProfiles: locationProfilesSelector(state),
    locationParents: locationParentsSelector(state),
    locationParentName: locationParentNameSelector(state),
    kronosEnabled: kronosEnabledSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelCreateLocation,
    setCreateLocationModelProperty,
    createLocation,
    selectLocation,
  }
)(CreateLocationModal));
