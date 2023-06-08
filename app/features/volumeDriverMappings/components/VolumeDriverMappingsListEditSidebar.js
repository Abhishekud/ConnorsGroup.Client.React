import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  Sidebar,
  SidebarSection,
  EditSidebarSectionHeaderActions,
} from '../../layout/components';
import {
  setEditVolumeDriverMappingModelProperty,
  setEditVolumeDriverMappingModelSetValue,
  updateVolumeDriverMapping,
  showDeleteVolumeDriverMapping,
  closeVolumeDriverMappingsListEditSidebar,
} from '../actions';
import {
  showSelector,
  modelSelector,
  savingSelector,
  validationErrorsSelector,
  sortedVolumeDriverMappingSetsSelector,
  columnClickTargetSelector,
} from '../selectors/sidebars/edit';
import {
  selectedVolumeDriverMappingSetIdSelector,
  selectedDepartmentIdSelector,
} from '../selectors/pages/list';
import CreateEditVolumeDriverMappingForm from './CreateEditVolumeDriverMappingForm';
import DeleteVolumeDriverMappingModal from './DeleteVolumeDriverMappingModal';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {Button} from 'react-bootstrap';
import {makeVolumeDriverSelectListOptionsForDepartmentArraySelector} from '../../volumeDrivers/selectors/selectListOptions';
import {makeUnitOfMeasureSelectListOptionsForDepartmentArraySelector} from '../../unitsOfMeasure/selectors/selectListOptions';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {PROFILING_VOLUME_DRIVER_MAPPING_UPDATE} from '../../authentication/constants/permissions';

class VolumeDriverMappingsListEditSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setEditVolumeDriverMappingModelProperty(name, value);
  }

  handleSetValueChange(event) {
    const {name, value} = event.target;
    this.props.setEditVolumeDriverMappingModelSetValue(Number(name), value);
  }

  handleSave(event) {
    event.preventDefault();

    const {updateVolumeDriverMapping, closeVolumeDriverMappingsListEditSidebar, model, router, reloadVolumeDriverMappings} = this.props;

    updateVolumeDriverMapping(model)
      .then(() => {
        closeVolumeDriverMappingsListEditSidebar();
        reloadVolumeDriverMappings();
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to update the Volume Driver Mapping.'));
  }

  handleCancel() {
    this.props.closeVolumeDriverMappingsListEditSidebar();
  }

  handleDelete() {
    const {model, showDeleteVolumeDriverMapping} = this.props;
    showDeleteVolumeDriverMapping(model);
  }

  render() {
    const {
      show,
      model,
      saving,
      validationErrors,
      volumeDriverMappingSets,
      selectedVolumeDriverMappingSetId,
      volumeDriverOptions,
      unitOfMeasureOptions,
      columnClickTarget,
      canUpdate,
      reloadVolumeDriverMappings,
    } = this.props;
    if (!show) return null;
    return (
      <Sidebar className="volume-driver-mappings-list-edit-sidebar">
        <EditSidebarSectionHeaderActions
          workingModel={model}
          editing saving={saving}
          hasPermission={canUpdate}
          onSave={this.handleSave} onCancel={this.handleCancel}
          editActions={
            canUpdate && <Button bsStyle="default" className="delete" bsSize="small" disabled={saving} onClick={this.handleDelete}>
              <i className="fa fa-trash-o" title="Delete" />
            </Button>
          } />
        <div className="sidebar-scrollable">
          <SidebarSection className="volume-driver-mapping" title="Edit Volume Driver Mapping" collapsible={false}>
            <CreateEditVolumeDriverMappingForm
              model={model}
              validationErrors={validationErrors}
              volumeDriverMappingSets={volumeDriverMappingSets}
              focusOnVolumeDriverMappingSetId={selectedVolumeDriverMappingSetId}
              saving={saving}
              disabled={!canUpdate}
              onFieldChange={this.handleFieldChange}
              onSetValueChange={this.handleSetValueChange}
              onSubmit={this.handleSave}
              volumeDriverOptions={volumeDriverOptions}
              unitOfMeasureOptions={unitOfMeasureOptions}
              columnClickTarget={columnClickTarget} />
          </SidebarSection>
          <DeleteVolumeDriverMappingModal reloadVolumeDriverMappings={reloadVolumeDriverMappings} />
        </div>
      </Sidebar>
    );
  }
}

function makeMapStateToProps() {
  return state => {
    const volumeDriverOptions = makeVolumeDriverSelectListOptionsForDepartmentArraySelector(state);
    const unitOfMeasureOptions = makeUnitOfMeasureSelectListOptionsForDepartmentArraySelector(state);
    const departmentId = selectedDepartmentIdSelector(state);
    const canUpdateSelector = makeCurrentUserHasPermissionSelector(PROFILING_VOLUME_DRIVER_MAPPING_UPDATE);

    return {
      show: showSelector(state),
      model: modelSelector(state),
      saving: savingSelector(state),
      volumeDriverOptions: volumeDriverOptions(departmentId),
      unitOfMeasureOptions: unitOfMeasureOptions(departmentId),
      validationErrors: validationErrorsSelector(state),
      volumeDriverMappingSets: sortedVolumeDriverMappingSetsSelector(state),
      selectedVolumeDriverMappingSetId: selectedVolumeDriverMappingSetIdSelector(state),
      columnClickTarget: columnClickTargetSelector(state),
      canUpdate: canUpdateSelector(state),
    };
  };
}

export default withRouter(connect(
  makeMapStateToProps,
  {
    setEditVolumeDriverMappingModelProperty,
    setEditVolumeDriverMappingModelSetValue,
    updateVolumeDriverMapping,
    showDeleteVolumeDriverMapping,
    closeVolumeDriverMappingsListEditSidebar,
  }
)(VolumeDriverMappingsListEditSidebar));
