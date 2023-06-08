/* eslint-disable react/jsx-no-bind */
import {connect} from 'react-redux';
import {fromJS, List} from 'immutable';
import {CreateEditModal} from '../../shared/components';
import CreateEditVolumeDriverMappingVariablesForm from './CreateEditVolumeDriverMappingVariablesForm';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/create';
import {
  cancelCreateVolumeDriverMappingVariables,
  createVolumeDriverMappingVariables,
  selectVolumeDriverMappingVariables,
  setCreateVolumeDriverMappingVariablesModelProperty,
  setCreateVolumeDriverMappingVariablesModelSetValue,
} from '../actions';
import React, {useRef} from 'react';
import {PropTypes} from 'prop-types';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {PROFILING_VOLUME_DRIVER_MAPPING_VARIABLES_CREATE} from '../../authentication/constants/permissions';

function CreateVolumeDriverMappingVariablesModal(props) {
  const {
    handleCancel,
    saving,
    show,
    model,
    validationErrors,
    volumeDriverMappingSets,
    canCreate,
    router,
    reloadVolumeDriverMappingVariables,
    selectedDepartmentId,
  } = props;

  const primaryInputRef = useRef(null);

  const handleFieldChange = event => {
    const {name, value} = event.target;
    props.setCreateVolumeDriverMappingVariablesModelProperty(name, value);
  };

  const handleSetValueChange = event => {
    const {name, value} = event.target;
    props.setCreateVolumeDriverMappingVariablesModelSetValue(Number(name), value);
  };

  const handleSave = event => {
    event.preventDefault();

    const {createVolumeDriverMappingVariables, selectVolumeDriverMappingVariables, model} = props;

    createVolumeDriverMappingVariables(selectedDepartmentId, model)
      .then(response => {
        if (reloadVolumeDriverMappingVariables) reloadVolumeDriverMappingVariables();
        selectVolumeDriverMappingVariables(fromJS(response.action.payload.data));
        return response;
      })
      .catch(error =>
        handleApiError(
          error,
          router,
          'An error occurred while attempting to add this Volume Driver Mapping Variable.',
          'Error'
        )
      );
  };

  const form = (
    <CreateEditVolumeDriverMappingVariablesForm
      saving={saving}
      disabled={!canCreate}
      onFieldChange={handleFieldChange}
      onSetValueChange={handleSetValueChange}
      onSubmit={handleSave}
      validationErrors={validationErrors}
      model={model}
      primaryInputRef={primaryInputRef}
      volumeDriverMappingSets={volumeDriverMappingSets} />
  );

  return (
    <CreateEditModal
      show={show}
      saving={saving}
      title="New Volume Driver Mapping Variables"
      form={form}
      onCancel={handleCancel}
      onSave={handleSave} />
  );
}

CreateVolumeDriverMappingVariablesModal.propTypes = {
  volumeDriverMappingSets: PropTypes.instanceOf(List).isRequired,
};

function makeMapStateToProps() {
  return state => {
    const canCreateSelector = makeCurrentUserHasPermissionSelector(PROFILING_VOLUME_DRIVER_MAPPING_VARIABLES_CREATE);

    return {
      saving: savingSelector(state),
      show: showSelector(state),
      model: modelSelector(state),
      validationErrors: validationErrorsSelector(state),
      canCreate: canCreateSelector(state),
    };
  };
}

export default withRouter(
  connect(makeMapStateToProps, {
    handleCancel: cancelCreateVolumeDriverMappingVariables,
    setCreateVolumeDriverMappingVariablesModelProperty,
    setCreateVolumeDriverMappingVariablesModelSetValue,
    createVolumeDriverMappingVariables,
    selectVolumeDriverMappingVariables,
  })(CreateVolumeDriverMappingVariablesModal)
);
