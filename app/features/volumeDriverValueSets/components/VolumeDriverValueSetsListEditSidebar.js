import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import {withRouter} from 'react-router';
import {handleApiError, toastr} from '../../shared/services';
import _ from 'lodash';
import {
  Sidebar,
  SidebarSection,
  EditSidebarSectionHeaderActions,
} from '../../layout/components';
import {
  closeVolumeDriverValueSetsListEditSidebar,
  setEditVolumeDriverValueSetModelProperty,
  updateVolumeDriverValueSet,
  toggleConfirmDefaultVolumeDriverValueSet,
  toggleImportVolumeDriverValuesValidationErrors,
  showDeleteVolumeDriverValueSet,
} from '../actions';
import {
  showSelector,
  modelSelector,
  savingSelector,
  validationErrorsSelector,
  showConfirmDefaultSelector,
} from '../selectors/sidebars/edit';
import CreateEditVolumeDriverValueSetForm from './CreateEditVolumeDriverValueSetForm';
import ConfirmDefaultVolumeDriverValueSet from './ConfirmDefaultVolumeDriverValueSet';
import DeleteVolumeDriverValueSetModal from './DeleteVolumeDriverValueSetModal';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {PROFILING_VOLUME_DRIVER_VALUE_SETS_UPDATE} from '../../authentication/constants/permissions';

class VolumeDriverValueSetsListEditSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleUpdateVolumeDriverValueSet() {
    const {updateVolumeDriverValueSet, model, router, closeVolumeDriverValueSetsListEditSidebar} = this.props;
    updateVolumeDriverValueSet(model)
      .then(() => closeVolumeDriverValueSetsListEditSidebar())
      .catch(error => {
        const {status} = error.response || {};
        if (status === 400 && this.props.validationErrors.get('_')) {
          toastr.error(this.props.validationErrors.get('_').join('<br />'));
          closeVolumeDriverValueSetsListEditSidebar();
          return;
        }
        handleApiError(error, router, 'An error occurred while attempting to update this Volume Driver Value Set.', 'Error');
        if (!error.response.status) throw error;
      });
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    let message = '';
    const setNameContainsDefault = (name === 'name' ? value.match(/\(Default\)/i) : null);
    if (setNameContainsDefault) {
      message = `Volume driver value set name can not include '${_.first(setNameContainsDefault)}' word.`;
    }

    this.props.setEditVolumeDriverValueSetModelProperty(name, value, message);
  }

  handleCancel() {
    this.props.closeVolumeDriverValueSetsListEditSidebar();
  }

  handleConfirm() {
    this.handleUpdateVolumeDriverValueSet();
    this.props.toggleConfirmDefaultVolumeDriverValueSet();
  }

  handleDelete() {
    const {model, showDeleteVolumeDriverValueSet} = this.props;
    showDeleteVolumeDriverValueSet(model);
  }

  handleSave(event) {
    event.preventDefault();
    const {model, toggleConfirmDefaultVolumeDriverValueSet} = this.props;

    if (!model.get('isDefaultDisabled') && model.get('isDefault')) {
      toggleConfirmDefaultVolumeDriverValueSet();
    } else {
      this.handleUpdateVolumeDriverValueSet();
    }
  }

  handleSelectedVolumeDriverValueSet() {
    const {router, model} = this.props;
    router.push(`volume-driver-value-sets/${model.get('id')}/volume-driver-values`);
  }

  render() {
    const {
      show,
      model,
      saving,
      validationErrors,
      canEdit,
      showConfirmDefault,
      toggleConfirmDefaultVolumeDriverValueSet,
    } = this.props;

    const message = (
      <span>
        Are you sure you want to update this VDV Set as <b>Default</b>?
      </span>
    );

    if (!show) return null;

    return (
      <>
        <ConfirmDefaultVolumeDriverValueSet
          show={showConfirmDefault}
          message={message}
          saving={saving}
          onCancel={toggleConfirmDefaultVolumeDriverValueSet}
          onConfirm={this.handleConfirm} />
        <Sidebar className="volume-drivers-value-sets-list-edit-sidebar">
          <EditSidebarSectionHeaderActions
            workingModel={model}
            editing
            saving={saving}
            onSave={this.handleSave}
            onCancel={this.handleCancel}
            hasPermission={canEdit}
            editActions={canEdit && <>
              <Button
                bsStyle="default"
                className="delete report-button"
                bsSize="small"
                disabled={model.get('isDefaultDisabled') || saving}
                onClick={this.handleDelete}>
                <i className="fa fa-trash-o" title="Delete" />
              </Button><Button
                bsStyle="default"
                className="delete"
                bsSize="small"
                onClick={this.handleSelectedVolumeDriverValueSet}>
                <i className="fa fa-search" title="Show Volume Driver Values" />
              </Button></>
            } />
          <div className="sidebar-scrollable">
            <SidebarSection className="volumeDriverValueSets" title="Edit Volume Driver Value Set" collapsible={false}>
              <CreateEditVolumeDriverValueSetForm
                model={model}
                validationErrors={validationErrors}
                saving={saving}
                onFieldChange={this.handleFieldChange}
                formRef={this.formRef}
                onSubmit={this.handleSave}
                disabled={!canEdit}
                isDefaultDisabled={canEdit ? model.get('isDefaultDisabled') : !canEdit}
                editing />
            </SidebarSection>
            <DeleteVolumeDriverValueSetModal />
          </div>
        </Sidebar>
      </>
    );
  }
}

function mapStateToProps(state) {
  const canEditSelector = makeCurrentUserHasPermissionSelector(PROFILING_VOLUME_DRIVER_VALUE_SETS_UPDATE);
  return {
    show: showSelector(state),
    model: modelSelector(state),
    saving: savingSelector(state),
    validationErrors: validationErrorsSelector(state),
    canEdit: canEditSelector(state),
    showConfirmDefault: showConfirmDefaultSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    closeVolumeDriverValueSetsListEditSidebar,
    setEditVolumeDriverValueSetModelProperty,
    updateVolumeDriverValueSet,
    toggleConfirmDefaultVolumeDriverValueSet,
    toggleImportVolumeDriverValuesValidationErrors,
    showDeleteVolumeDriverValueSet,
  }
)(VolumeDriverValueSetsListEditSidebar));
