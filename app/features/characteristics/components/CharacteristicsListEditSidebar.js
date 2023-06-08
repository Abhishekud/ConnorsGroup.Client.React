import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  Sidebar,
  SidebarSection,
  EditSidebarSectionHeaderActions,
} from '../../layout/components';
import {
  setEditCharacteristicModelProperty,
  setBulkEditCharacteristicModelProperty,
  setEditCharacteristicModelSetValue,
  setBulkEditCharacteristicModelSetValue,
  updateCharacteristic,
  bulkUpdateCharacteristics,
  showDeleteCharacteristic,
  closeCharacteristicsListEditSidebar,
  renameCharacteristic,
  loadCharacteristicsList,
} from '../actions';
import {
  showSelector,
  modelSelector,
  savingSelector,
  validationErrorsSelector,
  sortedCharacteristicSetsSelector,
  columnClickTargetSelector,
} from '../selectors/sidebars/edit';

import {selectedCharacteristicSetIdSelector, selectedBulkEditCharacteristicSetIdSelector, visibleCharacteristicSetsColumnsSelector} from '../selectors/pages/list';
import CreateEditCharacteristicForm from './CreateEditCharacteristicForm';
import DeleteCharacteristicModal from './DeleteCharacteristicModal';
import {handleApiError, toastr} from '../../shared/services';
import {withRouter} from 'react-router';
import {
  makeSelectListOptionsArrayWithBlankSelector,
  makeSelectListOptionsArraySelector,
} from '../../selectListOptions/selectors';
import {
  DEPARTMENTS,
  ACTIVE_STATUSES,
} from '../../selectListOptions/constants/selectListTypes';
import {departmentNameSelector} from '../../shared/selectors/components/settings';
import {Button} from 'react-bootstrap';
import CreateBulkEditCharacteristicForm from './CreateBulkEditCharacteristicForm';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {CHARACTERISTICS_EDIT} from '../../authentication/constants/permissions';

class CharacteristicsListEditSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidUpdate() {
    const {closeCharacteristicsListEditSidebar, model, selectedCharacteristics, selectedBulkEditCharacteristicSetId} = this.props;
    if ((model.get('rowModel') && selectedCharacteristics.size > 0) ||
      (selectedBulkEditCharacteristicSetId && model.has(Number(selectedBulkEditCharacteristicSetId[0])) && selectedCharacteristics.size === 0)) {
      setTimeout(() => closeCharacteristicsListEditSidebar());
    }
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setEditCharacteristicModelProperty(name, value);
  }

  handleBulkFieldChange(event) {
    const {name, value} = event.target;
    const {selectedBulkEditCharacteristicSetId} = this.props;
    const index = Number(selectedBulkEditCharacteristicSetId[0]);
    this.props.setBulkEditCharacteristicModelProperty(name, value, index);
  }

  handleSetValueChange(event) {
    const {name, value} = event.target;
    this.props.setEditCharacteristicModelSetValue(Number(name), value);
  }

  handleBulkSetValueChange(event) {
    const {name, value} = event.target;
    const {selectedBulkEditCharacteristicSetId} = this.props;
    const index = Number(selectedBulkEditCharacteristicSetId[0]);
    this.props.setBulkEditCharacteristicModelSetValue(Number(name), value, index);
  }

  save() {
    const {
      updateCharacteristic,
      model,
      reloadCharacteristics,
      closeCharacteristicsListEditSidebar,
      router,
    } = this.props;

    updateCharacteristic(model)
      .then(() => {
        closeCharacteristicsListEditSidebar();
        reloadCharacteristics();
      })
      .catch(error =>
        handleApiError(
          error,
          router,
          'An error occurred while attempting to update the Characteristic.'
        )
      );
  }

  bulkSave() {
    const {
      bulkUpdateCharacteristics,
      model,
      filtersModel,
      closeCharacteristicsListEditSidebar,
      selectedBulkEditCharacteristicSetId,
      reloadCharacteristics,
      router,
      departmentId,
      allCharacteristicsSelected,
      visibleCharacteristicSetsColumns,
    } = this.props;
    const characteristicSetIds = visibleCharacteristicSetsColumns.map(a => a.get('id'));
    bulkUpdateCharacteristics(model, selectedBulkEditCharacteristicSetId, filtersModel, departmentId, allCharacteristicsSelected, characteristicSetIds.toJS())
      .then(response => {
        if (response.value.data.backgrounded) {
          toastr.success('The bulk update request has been submitted. You will receive an email when it has completed.', 'Request submitted');
        } else {
          reloadCharacteristics();
        }
        closeCharacteristicsListEditSidebar();
      })
      .catch(error => {
        handleApiError(
          error,
          router,
          'An error occurred while attempting to update the Characteristic.'
        );
      }
      );
  }

  handleSave(event) {
    event.preventDefault();
    this.save();
  }

  handleBulkSave(event) {
    event.preventDefault();
    this.bulkSave();
  }

  handleCancel() {
    const {selectedBulkEditCharacteristicSetId} = this.props;
    this.props.closeCharacteristicsListEditSidebar(selectedBulkEditCharacteristicSetId);
  }

  handleCheckboxChange(e) {
    const {id, checked, name} = e.target;
    const {selectedBulkEditCharacteristicSetId} = this.props;
    const index = Number(selectedBulkEditCharacteristicSetId[0]);
    if (id === 'updateValue') {
      this.props.setBulkEditCharacteristicModelSetValue(name, checked, index, true);
    }
    this.props.setBulkEditCharacteristicModelProperty(id, checked, index);
  }

  handleDelete() {
    const {model, showDeleteCharacteristic} = this.props;
    showDeleteCharacteristic(model);
  }

  handleRename() {
    const {model, renameCharacteristic, router} = this.props;
    renameCharacteristic(model)
      .then(() => {
        toastr.success('Characteristic successfully renamed.');
        this.save();
      })
      .catch(error =>
        handleApiError(
          error,
          router,
          'An error occurred while attempting to update the characteristic.'
        )
      );
  }
  handleCharacteristicWhereUsed() {
    const {router, model} = this.props;
    if (model.get('isUsedForStandard')) {
      router.push(`/characteristics-where-used/${model.get('id')}?return=characteristics%3Freturn%3Dtrue`);
    } else {
      toastr.error('Standards not found where characteristic used.');
    }
  }

  render() {
    const {
      show,
      model,
      saving,
      validationErrors,
      characteristicSets,
      activeStatuses,
      selectedCharacteristicSetId,
      selectedBulkEditCharacteristicSetId,
      selectedCharacteristics,
      departmentName,
      departments,
      columnClickTarget,
      canEdit,
      reloadCharacteristics,
    } = this.props;
    if (!show) return null;


    if ((model.get('rowModel'))) {
      return (
        <Sidebar className="characteristics-list-edit-sidebar">
          <EditSidebarSectionHeaderActions
            workingModel={model}
            hasPermission={canEdit}
            editing
            saving={saving}
            onSave={this.handleSave}
            onCancel={this.handleCancel}
            editActions={
              canEdit && <> <Button
                bsStyle="default"
                className="delete report-button"
                bsSize="small"
                disabled={saving}
                onClick={this.handleDelete}>
                <i className="fa fa-trash-o" title="Delete" />
              </Button> <Button
                bsStyle="default"
                className="delete"
                bsSize="small"
                disabled={!model.get('isUsedForStandard')}
                onClick={this.handleCharacteristicWhereUsed}>
                <i className="fa fa-search" title="Where Used" />
              </Button>
              </>
            } />
          <div className="sidebar-scrollable">
            <SidebarSection
              className="characteristic"
              title="Edit Characteristic"
              collapsible={false}>
              <CreateEditCharacteristicForm
                model={model}
                disabled={!canEdit}
                validationErrors={validationErrors}
                characteristicSets={characteristicSets}
                activeStatuses={activeStatuses}
                focusOnCharacteristicSetId={selectedCharacteristicSetId}
                departmentName={departmentName}
                departments={departments}
                saving={saving}
                onFieldChange={this.handleFieldChange}
                onSetValueChange={this.handleSetValueChange}
                onRename={this.handleRename}
                onSubmit={this.handleSave}
                columnClickTarget={columnClickTarget} />
            </SidebarSection>
            <DeleteCharacteristicModal reloadCharacteristics={reloadCharacteristics} />
          </div>
        </Sidebar>
      );
    } else if ((model.has(Number(selectedBulkEditCharacteristicSetId[0])))) {
      let inactiveUpdate = false;
      selectedCharacteristics.forEach(selectedCharacteristicsKey => {
        if (selectedCharacteristicsKey.get('status') === 'Inactive') {
          inactiveUpdate = true;
          return;
        }
      });


      const index = Number(selectedBulkEditCharacteristicSetId[0]);
      return (
        <Sidebar className="characteristics-list-edit-sidebar">
          <EditSidebarSectionHeaderActions
            inactiveUpdate={inactiveUpdate}
            focusOnCharacteristicSetId={index}
            workingModel={model}
            hasPermission={canEdit}
            editing
            saving={saving}
            onSave={this.handleBulkSave}
            onCancel={this.handleCancel} />
          <div className="sidebar-scrollable">
            <SidebarSection
              className="characteristic"
              title="Edit Characteristic"
              collapsible={false}>
              <CreateBulkEditCharacteristicForm
                inactiveUpdate={inactiveUpdate}
                model={model}
                disabled={!canEdit}
                validationErrors={validationErrors}
                characteristicSets={characteristicSets}
                activeStatuses={activeStatuses}
                focusOnCharacteristicSetId={index}
                departmentName={departmentName}
                departments={departments}
                saving={saving}
                onCheckboxChange={this.handleCheckboxChange}
                onFieldChange={this.handleBulkFieldChange}
                onSetValueChange={this.handleBulkSetValueChange}
                onRename={this.handleRename}
                onSubmit={this.handleBulkSave} />
            </SidebarSection>
            <DeleteCharacteristicModal reloadCharacteristics={reloadCharacteristics} />
          </div>
        </Sidebar>
      );
    }
    return null;
  }
}

function mapStateToProps(state) {
  const departmentsSelector = makeSelectListOptionsArrayWithBlankSelector(DEPARTMENTS);
  const activeStatusesSelector = makeSelectListOptionsArraySelector(ACTIVE_STATUSES);
  const canEditSelector = makeCurrentUserHasPermissionSelector(CHARACTERISTICS_EDIT);

  return {
    show: showSelector(state),
    model: modelSelector(state),
    selectedCharacteristicSetId: selectedCharacteristicSetIdSelector(state),
    selectedBulkEditCharacteristicSetId: selectedBulkEditCharacteristicSetIdSelector(state),
    activeStatuses: activeStatusesSelector(state),
    saving: savingSelector(state),
    validationErrors: validationErrorsSelector(state),
    characteristicSets: sortedCharacteristicSetsSelector(state),
    departments: departmentsSelector(state),
    departmentName: departmentNameSelector(state),
    columnClickTarget: columnClickTargetSelector(state),
    canEdit: canEditSelector(state),
    visibleCharacteristicSetsColumns: visibleCharacteristicSetsColumnsSelector(state),
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    {
      setEditCharacteristicModelProperty,
      setBulkEditCharacteristicModelProperty,
      setEditCharacteristicModelSetValue,
      setBulkEditCharacteristicModelSetValue,
      updateCharacteristic,
      bulkUpdateCharacteristics,
      showDeleteCharacteristic,
      closeCharacteristicsListEditSidebar,
      renameCharacteristic,
      loadCharacteristicsList,
    }
  )(CharacteristicsListEditSidebar)
);
