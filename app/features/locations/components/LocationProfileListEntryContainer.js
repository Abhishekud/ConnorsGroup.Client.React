import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import {handleApiError} from '../../shared/services';
import makeCurrentUserHasPermissionSelector from '../../authentication/selectors/currentUser/makeCurrentUserHasPermissionSelector';
import {PROFILING_LOCATIONS_EDIT} from '../../authentication/constants/permissions';
import {
  editLocationProfile,
  cancelEditLocationProfile,
  setEditLocationProfileModelProperty,
  addEditLocationProfileModelDepartment,
  removeEditLocationProfileModelDepartment,
  updateLocationProfile,
  showDeleteLocationProfile,
} from '../actions';
import {
  makeEditingLocationProfileSelector,
  makeSavingLocationProfileSelector,
  makeValidationErrorsSelector,
} from '../selectors/sidebars/profiles';
import LocationProfileListEntry from './LocationProfileListEntry';
import LocationProfileListEntryEditor from './LocationProfileListEntryEditor';
import {
  departmentNameSelector,
  locationNameSelector,
} from '../../shared/selectors/components/settings';
import {withRouter} from 'react-router';
import {LOCATION_PROFILES} from '../../selectListOptions/constants/selectListTypes';
import {loadSelectListOptions} from '../../selectListOptions/actions';

class LocationProfileListEntryContainer extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleEdit() {
    const {locationProfile, editLocationProfile} = this.props;

    editLocationProfile(locationProfile.get('id'));
  }

  handleCancelEdit() {
    const {locationProfile, cancelEditLocationProfile} = this.props;

    cancelEditLocationProfile(locationProfile.get('id'));
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    const {locationProfile, setEditLocationProfileModelProperty} = this.props;

    setEditLocationProfileModelProperty(locationProfile.get('id'), name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {locationProfile, updateLocationProfile, loadSelectListOptions, locationName, router, reloadLocationsList} = this.props;

    updateLocationProfile(locationProfile)
      .then(() => {
        loadSelectListOptions(LOCATION_PROFILES);
        reloadLocationsList();
      })
      .catch(error => handleApiError(error, router, `An error occurred while attempting to update the ${locationName} Profile.`));
  }

  handleDelete() {
    const {locationProfile, showDeleteLocationProfile} = this.props;

    showDeleteLocationProfile(locationProfile);
  }

  handleAddSelectedItem(id, name) {
    const {locationProfile, addEditLocationProfileModelDepartment} = this.props;

    addEditLocationProfileModelDepartment(locationProfile.get('id'), id, name);
  }

  handleRemoveSelectedItem(id) {
    const {locationProfile, removeEditLocationProfileModelDepartment} = this.props;

    removeEditLocationProfileModelDepartment(locationProfile.get('id'), id);
  }

  render() {
    const {
      pristineLocationProfile,
      locationProfile,
      departments,
      editing,
      saving,
      validationErrors,
      departmentName,
      canEdit,
    } = this.props;

    if (editing) {
      return (
        <LocationProfileListEntryEditor
          locationProfile={locationProfile}
          validationErrors={validationErrors}
          onFieldChange={this.handleFieldChange}
          onSave={this.handleSave}
          onCancel={this.handleCancelEdit}
          onDelete={this.handleDelete}
          departmentName={departmentName}
          departments={departments}
          onAddSelectedItem={this.handleAddSelectedItem}
          onRemoveSelectedItem={this.handleRemoveSelectedItem}
          saving={saving}
          canEdit={canEdit}
          editing />
      );
    }

    return (
      <LocationProfileListEntry
        locationProfile={pristineLocationProfile}
        onEdit={this.handleEdit} canEdit={canEdit} />
    );
  }
}

LocationProfileListEntryContainer.propTypes = {
  locationProfile: PropTypes.instanceOf(Map).isRequired,
  departments: PropTypes.array.isRequired,
};

function makeMapStateToProps() {
  const editingSelector = makeEditingLocationProfileSelector();
  const savingSelector = makeSavingLocationProfileSelector();
  const validationErrorsSelector = makeValidationErrorsSelector();
  const canEditSelector = makeCurrentUserHasPermissionSelector(PROFILING_LOCATIONS_EDIT);

  return (state, ownProps) => ({
    editing: editingSelector(state, ownProps),
    saving: savingSelector(state, ownProps),
    validationErrors: validationErrorsSelector(state, ownProps),
    departmentName: departmentNameSelector(state),
    locationName: locationNameSelector(state),
    canEdit: canEditSelector(state),
  });
}

export default withRouter(connect(
  makeMapStateToProps,
  {
    editLocationProfile,
    cancelEditLocationProfile,
    setEditLocationProfileModelProperty,
    addEditLocationProfileModelDepartment,
    removeEditLocationProfileModelDepartment,
    updateLocationProfile,
    showDeleteLocationProfile,
    loadSelectListOptions,
  }
)(LocationProfileListEntryContainer));
