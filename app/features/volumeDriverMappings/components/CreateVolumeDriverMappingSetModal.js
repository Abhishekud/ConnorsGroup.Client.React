import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {List} from 'immutable';
import {CreateEditModal} from '../../shared/components';
import CreateVolumeDriverMappingSetForm from './CreateVolumeDriverMappingSetForm';
import {
  savingSelector,
  showSelector,
  modelSelector,
  validationErrorsSelector,
} from '../selectors/modals/createSet';
import {selectedDepartmentIdSelector} from '../selectors/pages/list';
import {
  cancelCreateVolumeDriverMappingSet,
  createVolumeDriverMappingSet,
  setCreateVolumeDriverMappingSetModelProperty,
  loadVolumeDriverMappingSetSelectListOptions,
} from '../actions';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {PROFILING_VOLUME_DRIVER_MAPPING_CREATE} from '../../authentication/constants/permissions';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';

class CreateVolumeDriverMappingSetModal extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setCreateVolumeDriverMappingSetModelProperty(name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {createVolumeDriverMappingSet, model, selectedDepartmentId, router, onCreateVolumeDriverMappingSet, loadVolumeDriverMappingSetSelectListOptions} = this.props;

    createVolumeDriverMappingSet(selectedDepartmentId, model)
      .then(response => {
        onCreateVolumeDriverMappingSet(response.value.data);
        loadVolumeDriverMappingSetSelectListOptions();
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to add this Volume Driver Mapping Set.', 'Error'));
  }

  render() {
    const {
      handleCancel,
      saving,
      canCreate,
      show,
      model,
      validationErrors,
      volumeDriverMappingSets,
    } = this.props;

    const form =
      <CreateVolumeDriverMappingSetForm
        saving={saving}
        onFieldChange={this.handleFieldChange}
        onCategoryValueChange={this.handleSetValueChange}
        onSubmit={this.handleSave}
        validationErrors={validationErrors}
        disabled={!canCreate}
        model={model}
        volumeDriverMappingSets={volumeDriverMappingSets} />;

    return (
      <CreateEditModal
        show={show}
        saving={saving}
        title="New Volume Driver Mapping Set"
        form={form}
        onCancel={handleCancel}
        onSave={this.handleSave} />
    );
  }
}

CreateVolumeDriverMappingSetModal.propTypes = {
  volumeDriverMappingSets: PropTypes.instanceOf(List).isRequired,
};

function mapStateToProps(state) {
  const canCreateSelector = makeCurrentUserHasPermissionSelector(PROFILING_VOLUME_DRIVER_MAPPING_CREATE);
  return {
    saving: savingSelector(state),
    show: showSelector(state),
    model: modelSelector(state),
    validationErrors: validationErrorsSelector(state),
    selectedDepartmentId: selectedDepartmentIdSelector(state),
    canCreate: canCreateSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleCancel: cancelCreateVolumeDriverMappingSet,
    setCreateVolumeDriverMappingSetModelProperty,
    createVolumeDriverMappingSet,
    loadVolumeDriverMappingSetSelectListOptions,
  }
)(CreateVolumeDriverMappingSetModal));
