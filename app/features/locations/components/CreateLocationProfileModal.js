import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {CreateEditModal} from '../../shared/components';
import CreateEditLocationProfileForm from './CreateEditLocationProfileForm';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/createProfile';
import {
  cancelCreateLocationProfile,
  createLocationProfile,
  setCreateLocationProfileModelProperty,
  addCreateLocationProfileModelDepartment,
  removeCreateLocationProfileModelDepartment,
} from '../actions';
import React, {Component} from 'react';
import {makeSelectListOptionsArraySelector} from '../../selectListOptions/selectors';
import {DEPARTMENTS, LOCATION_PROFILES} from '../../selectListOptions/constants/selectListTypes';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {
  departmentNameSelector,
  locationNameSelector,
} from '../../shared/selectors/components/settings';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';

class CreateLocationProfileModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setCreateLocationProfileModelProperty(name, value);
  }

  handleAddSelectedItem(id, name) {
    this.props.addCreateLocationProfileModelDepartment(id, name);
  }

  handleRemoveSelectedItem(id) {
    this.props.removeCreateLocationProfileModelDepartment(id);
  }

  handleSave(event) {
    event.preventDefault();

    const {createLocationProfile, loadSelectListOptions, model, locationName, router, reloadLocationsList} = this.props;

    createLocationProfile(model)
      .then(() => {
        loadSelectListOptions(LOCATION_PROFILES);
        reloadLocationsList();
      })
      .catch(error => handleApiError(error, router, `An error occurred while attempting to add this ${locationName} Profile.`, 'Error'));
  }

  render() {
    const {handleCancel, saving, show, model, validationErrors, departments, departmentName, locationName} = this.props;

    const form =
      <CreateEditLocationProfileForm
        editing
        saving={saving}
        onFieldChange={this.handleFieldChange}
        onSubmit={this.handleSave}
        validationErrors={validationErrors}
        model={model}
        departmentName={departmentName}
        departments={departments}
        onAddSelectedItem={this.handleAddSelectedItem}
        onRemoveSelectedItem={this.handleRemoveSelectedItem} />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title={`New ${locationName} Profile`}
        form={form}
        onCancel={handleCancel}
        onSave={this.handleSave} />
    );
  }
}

function mapStateToProps(state) {
  const departmentsSelector = makeSelectListOptionsArraySelector(DEPARTMENTS);

  return {
    saving: savingSelector(state),
    show: showSelector(state),
    model: modelSelector(state),
    validationErrors: validationErrorsSelector(state),
    departments: departmentsSelector(state),
    departmentName: departmentNameSelector(state),
    locationName: locationNameSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelCreateLocationProfile,
    setCreateLocationProfileModelProperty,
    createLocationProfile,
    loadSelectListOptions,
    addCreateLocationProfileModelDepartment,
    removeCreateLocationProfileModelDepartment,
  }
)(CreateLocationProfileModal));
