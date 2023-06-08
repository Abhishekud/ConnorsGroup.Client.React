import React, {Component} from 'react';
import {withRouter} from 'react-router';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  Sidebar,
  SidebarSection,
  EditSidebarSectionHeaderActions,
} from '../../layout/components';
import {
  showDeleteSelectedStandards,
  bulkUpdateStandards,
  clearBulkEditStandardsData,
  cancelUpdateStandards,
  loadStandardsList,
  setStandardListBulkEditFilingFieldModelProperty,
  setStandardListBulkEditFilingFieldModelPropertyChecked,
  setStandardsListBulkEditModelProperty,
  toggleStandardsListBulkEditSidebar,
  showConfirmBulkDeleteStandardsRevisions,
} from '../actions';
import {
  ALLOWANCES,
  CLASSIFICATIONS,
  JOB_CLASSES,
  LABOR_CATEGORIES,
  PART_FAMILIES,
  STANDARD_STATUSES,
} from '../../selectListOptions/constants/selectListTypes';
import {
  partFamilyNameSelector,
  enablePartsSelector,
} from '../../shared/selectors/components/settings';
import {
  openSelector,
  modelSelector,
  savingSelector,
  validationErrorsSelector,
} from '../selectors/sidebars/bulkEditStandards';
import {ARCHIVE, PRODUCTION, STATUS_ORDER} from '../constants/standardStatuses';
import {
  highestStandardStatus,
  departmentIdsForStandards,
} from '../services';
import {
  selectedStandardsSelector,
  selectedStandardIdsSelector,
  standardsSelector,
  distinctStandardStatusesSelector,
  activeBulkDeleteBackgroundJobSelector,
} from '../selectors/pages/list';
import {
  appliedModelSelector as filterValuesSelector,
} from '../selectors/sidebars/filters';
import {
  makeSelectListOptionsArrayWithBlankSelector,
  makeSelectListOptionsArraySelector,
  filingFieldsSelectListOptionsSelector,
} from '../../selectListOptions/selectors';
import {makeSelectListOptionsForDepartmentArraySelector} from '../../attributes/selectors/selectListOptions';
import {departmentIdSelector} from '../selectors/sidebars/standardDetails';
import {makeUnitOfMeasureSelectListOptionsForDepartmentArraySelector} from '../../unitsOfMeasure/selectors/selectListOptions';
import StandardsListBulkEditForm from './StandardsListBulkEditForm';
import {handleApiError, toastr} from '../../shared/services';
import {STANDARDS_EDIT, STANDARDS_MANAGE_PRODUCTION} from '../../authentication/constants/permissions';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';

class StandardsListBulkEditSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleCancelEdit() {
    this.props.toggleStandardsListBulkEditSidebar();
  }

  handleEdit() {
  }

  handleSave() {
    const {router, bulkUpdateStandards, id, model, loadStandardsList, filterValues, clearBulkEditStandardsData, selectedStandardIds} = this.props;
    if (selectedStandardIds.size === 0) {
      toastr.error('No items selected.', 'Error');
      return;
    }
    if (!model.get('updateAttributeId') &&
      !model.get('updateJobClassId') &&
      !model.get('updateLaborCategoryId') &&
      !model.get('updateClassificationId') &&
      !model.get('updateAllowanceId') &&
      !model.get('updatePartFamilyId') &&
      !model.get('uppdateApplied') &&
      !model.get('updateFixedVariable') &&
      !model.get('filingFieldsChecked').size === 0) {
      toastr.error('Nothing to update.', 'Error');
      return;
    }
    bulkUpdateStandards(id, model, selectedStandardIds.valueSeq().toArray())
      .then(() => {
        loadStandardsList(filterValues);
        clearBulkEditStandardsData();
      })
      .catch(error => {
        handleApiError(error, router, 'An error occurred while attempting to update the selected standards.');
      });
  }

  handleFilingFieldCheckboxChange(e) {
    const {dataset, checked} = e.target;
    this.props.setStandardListBulkEditFilingFieldModelPropertyChecked(dataset.id, checked);
  }

  handleFilingFieldChange(e) {
    const {dataset, value} = e.target;
    const propertyValue = (value === '') ? null : Number(value);
    this.props.setStandardListBulkEditFilingFieldModelProperty(dataset.id, propertyValue);
  }

  handleFieldChange(e) {
    const {name, value} = e.target;
    this.props.setStandardsListBulkEditModelProperty(name, value);
  }

  handleEffectiveStartDateFieldChange(date) {
    this.props.setStandardsListBulkEditModelProperty('effectiveStartDate', date);
  }

  handleEffectiveEndDateFieldChange(date) {
    this.props.setStandardsListBulkEditModelProperty('effectiveEndDate', date);
  }

  handleCheckboxChange(e) {
    const {id, checked} = e.target;
    this.props.setStandardsListBulkEditModelProperty(id, checked);
  }

  handleDelete() {
    const {selectedStandards, showDeleteSelectedStandards} = this.props;
    showDeleteSelectedStandards(selectedStandards.keySeq().toArray());
  }

  handleDeleteRevisions() {
    const {selectedStandards, showConfirmBulkDeleteStandardsRevisions} = this.props;
    showConfirmBulkDeleteStandardsRevisions(selectedStandards.map(c => c.get('id')));
  }

  render() {
    const {
      open,
      model,
      selectedStandards,
      filingFields,
      allowances,
      classifications,
      attributes,
      jobClasses,
      laborCategories,
      partsEnabled,
      partFamilies,
      partFamilyName,
      statuses,
      standards,
      departmentIds,
      selectedStatuses,
      canEdit,
      canManageProduction,

      saving,
      validationErrors,
      activeBulkDeleteBackgroundJob,
      standardUnitsOfMeasure,
    } = this.props;

    if (!open || selectedStandards.size === 0) return null;

    const highestStatus = highestStandardStatus(selectedStandards);
    if (STATUS_ORDER.indexOf(model.get('status')) < STATUS_ORDER.indexOf(statuses[0].value)) {
      setTimeout(() => this.props.setStandardsListBulkEditModelProperty('status', statuses[0].value));
    }
    if (model.get('updateAttributeId') && departmentIds.length > 1) {
      setTimeout(() => {
        this.props.setStandardsListBulkEditModelProperty('updateAttributeId', false);
        this.props.setStandardsListBulkEditModelProperty('attributeId', null);
      });
    }
    const departmentCount = departmentIdsForStandards(selectedStandards, standards).length;
    const disabled = (selectedStatuses.includes(PRODUCTION) || selectedStatuses.includes(ARCHIVE));
    const needsManageProduction = disabled && !canManageProduction;
    return (
      <Sidebar className="standard-profile">
        <EditSidebarSectionHeaderActions
          workingModel={model} hasPermission={canEdit}
          editing saving={saving} disabled={needsManageProduction}
          onEdit={this.handleEdit} onCancel={this.handleCancelEdit} onSave={this.handleSave} />
        <div className="sidebar-scrollable">
          <SidebarSection
            className="standard-details"
            title="Standard Details"
            collapsible>
            <StandardsListBulkEditForm
              model={model} validationErrors={validationErrors}
              canManageProduction={canManageProduction}
              needsManageProduction={needsManageProduction}
              selectedStandardsCount={selectedStandards.size}
              highestStatus={highestStatus}
              selectedStatuses={selectedStatuses}
              creating={false} editing saving={saving}
              departmentCount={departmentCount}
              statuses={statuses}
              unitsOfMeasure={standardUnitsOfMeasure}
              filingFields={filingFields}
              allowances={allowances}
              classifications={classifications}
              attributes={attributes}
              jobClasses={jobClasses}
              laborCategories={laborCategories}
              partsEnabled={partsEnabled}
              partFamilies={partFamilies}
              partFamilyName={partFamilyName}
              onFilingFieldCheckboxChange={this.handleFilingFieldCheckboxChange}
              onFilingFieldChange={this.handleFilingFieldChange}
              onFieldChange={this.handleFieldChange}
              onEffectiveStartDateFieldChange={this.handleEffectiveStartDateFieldChange}
              onEffectiveEndDateFieldChange={this.handleEffectiveEndDateFieldChange}
              onCheckboxChange={this.handleCheckboxChange}
              onSubmit={this.handleSave}
              onDelete={this.handleDelete}
              onDeleteRevisions={this.handleDeleteRevisions}
              activeBulkDeleteBackgroundJob={activeBulkDeleteBackgroundJob} />
          </SidebarSection>
        </div>
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  const unitOfMeasureOptions = makeUnitOfMeasureSelectListOptionsForDepartmentArraySelector(state);
  const departmentId = departmentIdSelector(state);

  const partFamiliesSelector = makeSelectListOptionsArrayWithBlankSelector(PART_FAMILIES);
  const selectListAllowancesSelector = makeSelectListOptionsArrayWithBlankSelector(ALLOWANCES);
  const selectListClassificationsSelector = makeSelectListOptionsArrayWithBlankSelector(CLASSIFICATIONS);
  const selectListJobClassesSelector = makeSelectListOptionsArrayWithBlankSelector(JOB_CLASSES);
  const selectListLaborCategoriesSelector = makeSelectListOptionsArrayWithBlankSelector(LABOR_CATEGORIES);
  const standardStatusesSelector = makeSelectListOptionsArraySelector(STANDARD_STATUSES);
  const selectListAttributesSelector = makeSelectListOptionsForDepartmentArraySelector(state);
  const model = modelSelector(state);
  const standards = standardsSelector(state);
  const selectedStandards = selectedStandardsSelector(state);
  const departmentIds = departmentIdsForStandards(selectedStandards, standards);
  const canManageProductionSelector = makeCurrentUserHasPermissionSelector(STANDARDS_MANAGE_PRODUCTION);
  const canEditSelector = makeCurrentUserHasPermissionSelector(STANDARDS_EDIT);

  return {
    open: openSelector(state),
    model,
    saving: savingSelector(state),
    validationErrors: validationErrorsSelector(state),
    selectedStandards,

    allowances: selectListAllowancesSelector(state),
    classifications: selectListClassificationsSelector(state),
    attributes: selectListAttributesSelector(departmentIds.length > 0 ? departmentIds[0] : 0),
    departmentIds,
    jobClasses: selectListJobClassesSelector(state),
    laborCategories: selectListLaborCategoriesSelector(state),
    statuses: standardStatusesSelector(state),
    filingFields: filingFieldsSelectListOptionsSelector(state),
    partsEnabled: enablePartsSelector(state),
    partFamilies: partFamiliesSelector(state),
    partFamilyName: partFamilyNameSelector(state),
    standardUnitsOfMeasure: unitOfMeasureOptions(departmentId),
    standards,
    filterValues: filterValuesSelector(state),
    selectedStandardIds: selectedStandardIdsSelector(state),
    selectedStatuses: distinctStandardStatusesSelector(state),
    canManageProduction: canManageProductionSelector(state),
    canEdit: canEditSelector(state),
    activeBulkDeleteBackgroundJob: activeBulkDeleteBackgroundJobSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    showDeleteSelectedStandards,
    showConfirmBulkDeleteStandardsRevisions,
    bulkUpdateStandards,
    cancelUpdateStandards,
    clearBulkEditStandardsData,
    loadStandardsList,
    setStandardListBulkEditFilingFieldModelProperty,
    setStandardListBulkEditFilingFieldModelPropertyChecked,
    setStandardsListBulkEditModelProperty,
    toggleStandardsListBulkEditSidebar,
  }
)(StandardsListBulkEditSidebar));
