import React, {Component} from 'react';
import {withRouter} from 'react-router';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import {Button} from 'react-bootstrap';
import {
  Sidebar,
  SidebarSection,
  EditSidebarSectionHeaderActions,
} from '../../layout/components';
import {
  toggleStandardProfileBulkEditSidebar,
  setStandardProfileBulkEditModelProperty,
  showStandardElementFrequencyFormulaModal,
  showConfirmBulkDeleteSelectedStandardItems,
  selectAllStandardElementsForBulkEdit,
  bulkUpdateStandardElements,
  loadStandard,
} from '../actions';
import {
  openSelector,
  modelSelector,
  savingSelector,
  validationErrorsSelector,
} from '../selectors/sidebars/bulkEditElements';
import {
  idSelector,
  isArchivedElementSelectedSelector,
  standardItemsSelector,
  standardItemsSelectedSelector,
  selectedStandardElementGroupIdsSelector,
} from '../selectors/pages/standardProfile';
import {frequencyFormulaEditModes} from '../constants';
import StandardProfileBulkEditForm from './StandardProfileBulkEditForm';
import {ARCHIVE, PRODUCTION} from '../constants/standardStatuses';
import {departmentIdSelector} from '../selectors/sidebars/standardDetails';
import {makeUnitOfMeasureSelectListOptionsForDepartmentArraySelector} from '../../unitsOfMeasure/selectors/selectListOptions';
import {handleApiError, toastr} from '../../shared/services';
import {STANDARD_ELEMENT} from '../constants/standardItemTypes';
import {BETA_FEATURES_ACCESS} from '../../authentication/constants/permissions';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';

class StandardProfileBulkEditSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleCancelEdit() {
    this.props.toggleStandardProfileBulkEditSidebar();
  }

  handleEdit() {
  }

  handleSave(e) {
    e.preventDefault();
    const {router, bulkUpdateStandardElements, id, model, loadStandard, toggleStandardProfileBulkEditSidebar, selectedItems} = this.props;
    if (selectedItems.size === 0) {
      toastr.error('No steps selected.', 'Error');
      return;
    }
    if (selectedItems.filter(i => i.get('type') === STANDARD_ELEMENT).size === 0) {
      toastr.error('No elements selected to update.', 'Error');
      return;
    }
    if (!model.get('updateFrequencyFormula') &&
      !model.get('updateUnitOfMeasureId') &&
      !model.get('updateUnitOfMeasureId') &&
      !model.get('updateInternal') &&
      !model.get('updateMachineAllowance')) {
      toastr.error('Nothing to update.', 'Error');
      return;
    }
    bulkUpdateStandardElements(id, model, selectedItems.keySeq().toArray())
      .then(() => {
        loadStandard(id);
        toggleStandardProfileBulkEditSidebar();
      })
      .catch(error => {
        handleApiError(error, router, 'An error occurred while attempting to update the selected standard elements.');
      });
  }

  handleFieldChange(e) {
    const {name, value} = e.target;
    this.props.setStandardProfileBulkEditModelProperty(name, value);
  }

  handleCheckboxChange(e) {
    const {id, checked} = e.target;
    this.props.setStandardProfileBulkEditModelProperty(id, checked);
  }

  handleDelete() {
    const {id, selectedItems, showConfirmBulkDeleteSelectedStandardItems, selectedStandardElementGroupIds} = this.props;
    showConfirmBulkDeleteSelectedStandardItems(new Map({id, selectedElementIds: selectedItems.keySeq().toArray(), selectedStandardElementGroupIds}));
  }

  handleEditFormula() {
    const {showStandardElementFrequencyFormulaModal, model} = this.props;
    if (!model.get('updateFrequencyFormula')) return;
    showStandardElementFrequencyFormulaModal(-1, model.get('frequencyFormula'), frequencyFormulaEditModes.EDIT_STANDARD_BULK_EDIT_FREQUENCY);
  }

  handleSelectAll() {
    const {selectAllStandardElementsForBulkEdit, standardItems} = this.props;
    const ids = standardItems.map(x => x.get('id'));
    selectAllStandardElementsForBulkEdit(ids);
  }

  handleBulkCopyStandardItems() {
    const {toggleStandardProfileBulkEditSidebar, onBulkCopyStandardItems} = this.props;
    toggleStandardProfileBulkEditSidebar();
    onBulkCopyStandardItems();
  }

  render() {
    const {
      open,
      model,
      selectedItems,

      saving,
      validationErrors,

      standardUnitsOfMeasure,
      isArchivedElementSelected,
      hasBetaAccess,
    } = this.props;

    if (!open || selectedItems.size === 0 || status === PRODUCTION || status === ARCHIVE) return null;

    const editActions = <span>
      <Button className="btn btn-sm btn-default pull-right" disabled={saving} onClick={this.handleSelectAll}>Select All</Button>
      <Button className="btn btn-sm btn-default pull-right btn-copy-selected" disabled={saving || isArchivedElementSelected} onClick={this.handleBulkCopyStandardItems}>Copy Selected</Button>
    </span>;
    return (
      <Sidebar className="standard-profile">
        <EditSidebarSectionHeaderActions
          workingModel={model}
          editing saving={saving}
          onEdit={this.handleEdit} onCancel={this.handleCancelEdit} onSave={this.handleSave}
          editActions={editActions} />
        <div className="sidebar-scrollable">
          {isArchivedElementSelected && <div className="warning">One or more selected elements are archived and cannot be copied.</div>}
          <SidebarSection
            className="standard-details"
            title="Step Details"
            collapsible>
            <StandardProfileBulkEditForm
              model={model} validationErrors={validationErrors}
              selectedItems={selectedItems}
              creating={false} editing saving={saving}
              unitsOfMeasure={standardUnitsOfMeasure}
              onFieldChange={this.handleFieldChange}
              onCheckboxChange={this.handleCheckboxChange}
              onEditFormula={this.handleEditFormula}
              onSubmit={this.handleSave}
              onDelete={this.handleDelete}
              hasBetaAccess={hasBetaAccess} />
          </SidebarSection>
        </div>
      </Sidebar>
    );
  }
}

function makeMapStateToProps() {
  return state => {
    const unitOfMeasureOptions = makeUnitOfMeasureSelectListOptionsForDepartmentArraySelector(state);
    const departmentId = departmentIdSelector(state);
    const hasBetaAccessSelector = makeCurrentUserHasPermissionSelector(BETA_FEATURES_ACCESS);

    return {
      open: openSelector(state),

      id: idSelector(state),
      model: modelSelector(state),
      saving: savingSelector(state),
      validationErrors: validationErrorsSelector(state),
      standardItems: standardItemsSelector(state),
      selectedItems: standardItemsSelectedSelector(state),
      isArchivedElementSelected: isArchivedElementSelectedSelector(state),
      selectedStandardElementGroupIds: selectedStandardElementGroupIdsSelector(state),

      standardUnitsOfMeasure: unitOfMeasureOptions(departmentId),
      hasBetaAccess: hasBetaAccessSelector(state),
    };
  };
}

export default withRouter(connect(
  makeMapStateToProps,
  {
    toggleStandardProfileBulkEditSidebar,
    setStandardProfileBulkEditModelProperty,
    showStandardElementFrequencyFormulaModal,
    showConfirmBulkDeleteSelectedStandardItems,
    selectAllStandardElementsForBulkEdit,
    bulkUpdateStandardElements,
    loadStandard,
  }
)(StandardProfileBulkEditSidebar));
