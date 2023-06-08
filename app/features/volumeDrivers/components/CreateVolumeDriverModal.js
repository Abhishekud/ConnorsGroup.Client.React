import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {CreateEditModal} from '../../shared/components';
import CreateEditVolumeDriverForm from './CreateEditVolumeDriverForm';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/create';
import {
  departmentNameSelector,
} from '../../shared/selectors/components/settings';
import {
  cancelCreateVolumeDriver,
  createVolumeDriver,
  selectVolumeDriver,
  setCreateVolumeDriverModelProperty,
  loadVolumeDriverSelectListOptions,
} from '../actions';
import {makeSelectListOptionsArrayWithBlankSelector} from '../../selectListOptions/selectors';
import {fromJS} from 'immutable';
import React, {Component} from 'react';
import {DEPARTMENTS} from '../../selectListOptions/constants/selectListTypes';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';

class CreateVolumeDriverModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setCreateVolumeDriverModelProperty(name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {createVolumeDriver, selectVolumeDriver, model, loadVolumeDriverSelectListOptions, router} = this.props;

    createVolumeDriver(model)
      .then(response => {
        selectVolumeDriver(fromJS(response.action.payload.data));
        loadVolumeDriverSelectListOptions();
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to add this Volume Driver.', 'Error'));
  }

  render() {
    const {handleCancel, saving, show, model, validationErrors, departmentName, departments} = this.props;

    const form =
      <CreateEditVolumeDriverForm
        saving={saving}
        onFieldChange={this.handleFieldChange}
        onSubmit={this.handleSave}
        departmentName={departmentName}
        departments={departments}
        validationErrors={validationErrors}
        model={model} />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title="New Volume Driver"
        form={form}
        onCancel={handleCancel}
        onSave={this.handleSave} />
    );
  }
}

function mapStateToProps(state) {
  const departmentsSelector = makeSelectListOptionsArrayWithBlankSelector(DEPARTMENTS);

  return {
    saving: savingSelector(state),
    show: showSelector(state),
    model: modelSelector(state),
    validationErrors: validationErrorsSelector(state),
    departments: departmentsSelector(state),
    departmentName: departmentNameSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelCreateVolumeDriver,
    setCreateVolumeDriverModelProperty,
    createVolumeDriver,
    selectVolumeDriver,
    loadVolumeDriverSelectListOptions,
  }
)(CreateVolumeDriverModal));
