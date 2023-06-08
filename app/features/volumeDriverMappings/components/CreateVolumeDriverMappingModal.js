import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {fromJS, List} from 'immutable';
import {CreateEditModal} from '../../shared/components';
import CreateEditVolumeDriverMappingForm from './CreateEditVolumeDriverMappingForm';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/create';
import {selectedDepartmentIdSelector} from '../selectors/pages/list';
import {
  cancelCreateVolumeDriverMapping,
  createVolumeDriverMapping,
  selectVolumeDriverMapping,
  setCreateVolumeDriverMappingModelProperty,
  setCreateVolumeDriverMappingModelSetValue,
} from '../actions';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {makeVolumeDriverSelectListOptionsForDepartmentArraySelector} from '../../volumeDrivers/selectors/selectListOptions';
import {makeUnitOfMeasureSelectListOptionsForDepartmentArraySelector} from '../../unitsOfMeasure/selectors/selectListOptions';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {PROFILING_VOLUME_DRIVER_MAPPING_CREATE} from '../../authentication/constants/permissions';

class CreateVolumeDriverMappingModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setCreateVolumeDriverMappingModelProperty(name, value);
  }

  handleSetValueChange(event) {
    const {name, value} = event.target;
    this.props.setCreateVolumeDriverMappingModelSetValue(Number(name), value);
  }

  handleSave(event) {
    event.preventDefault();

    const {createVolumeDriverMapping, selectVolumeDriverMapping, model, router, reloadVolumeDriverMappings} = this.props;

    createVolumeDriverMapping(model)
      .then(response => {
        if (reloadVolumeDriverMappings) reloadVolumeDriverMappings();
        selectVolumeDriverMapping(fromJS(response.action.payload.data));
        return response;
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to add this Volume Driver Mapping.', 'Error'));
  }

  render() {
    const {
      handleCancel,
      saving,
      show,
      model,
      validationErrors,
      volumeDriverOptions,
      unitOfMeasureOptions,
      volumeDriverMappingSets,
      canCreate,
    } = this.props;

    const form =
      <CreateEditVolumeDriverMappingForm
        saving={saving}
        disabled={!canCreate}
        onFieldChange={this.handleFieldChange}
        onSetValueChange={this.handleSetValueChange}
        onSubmit={this.handleSave}
        validationErrors={validationErrors}
        model={model}
        focusOnVolumeDriverMappingSetId={null}
        volumeDriverOptions={volumeDriverOptions}
        unitOfMeasureOptions={unitOfMeasureOptions}
        volumeDriverMappingSets={volumeDriverMappingSets} />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title="New Volume Driver Mapping"
        form={form}
        onCancel={handleCancel}
        onSave={this.handleSave} />
    );
  }
}

CreateVolumeDriverMappingModal.propTypes = {
  volumeDriverOptions: PropTypes.instanceOf(Array).isRequired,
  unitOfMeasureOptions: PropTypes.instanceOf(Array).isRequired,
  volumeDriverMappingSets: PropTypes.instanceOf(List).isRequired,
};

function makeMapStateToProps() {
  return state => {
    const volumeDriverOptions = makeVolumeDriverSelectListOptionsForDepartmentArraySelector(state);
    const unitOfMeasureOptions = makeUnitOfMeasureSelectListOptionsForDepartmentArraySelector(state);
    const departmentId = selectedDepartmentIdSelector(state);
    const canCreateSelector = makeCurrentUserHasPermissionSelector(PROFILING_VOLUME_DRIVER_MAPPING_CREATE);

    return {
      saving: savingSelector(state),
      show: showSelector(state),
      model: modelSelector(state),
      volumeDriverOptions: volumeDriverOptions(departmentId),
      unitOfMeasureOptions: unitOfMeasureOptions(departmentId),
      validationErrors: validationErrorsSelector(state),
      canCreate: canCreateSelector(state),
    };
  };
}

export default withRouter(connect(
  makeMapStateToProps,
  {
    handleCancel: cancelCreateVolumeDriverMapping,
    setCreateVolumeDriverMappingModelProperty,
    setCreateVolumeDriverMappingModelSetValue,
    createVolumeDriverMapping,
    selectVolumeDriverMapping,
  }
)(CreateVolumeDriverMappingModal));
