import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import {
  Sidebar,
  SidebarSection,
  EditSidebarSectionHeaderActions,
} from '../../layout/components';
import {
  cancelEditStandardDetails,
  createStandardRevision,
  editStandardDetails,
  hideConfirmUpdateStandard,
  hideStandardToProductionComment,
  loadStandard,
  setStandardDetailFilingFieldModelProperty,
  setStandardDetailModelProperty,
  showConfirmUpdateStandard,
  showDeleteStandard,
  showDuplicateStandard,
  showStandardToProductionComment,
  toggleStandardStatusLogComment,
  updateStandard,
} from '../actions';
import {
  getFilingFieldsAsSelectListOptions,
} from '../../selectListOptions/actions';
import {timeFormatSelector} from '../../shared/selectors/components/timeFormatSelector';
import {
  editingSelector,
  idSelector,
  modelSelector,
  openSelector,
  pristineModelSelector,
  savingSelector,
  sortedStatusLogsArraySelector,
  validationErrorsSelector,
} from '../selectors/sidebars/standardDetails';
import {
  standardUnitsOfMeasureArraySelector,
} from '../selectors/sidebars/standardUnitsOfMeasure';
import {standardItemsSelector, isPreviousRevisionSelector, defaultCharacteristicSetNameSelector} from '../selectors/pages/standardProfile';
import {
  departmentNameSelector,
  partFamilyNameSelector,
  enablePartsSelector,
} from '../../shared/selectors/components/settings';
import {
  makeSelectListOptionsArrayWithBlankSelector,
  makeSelectListOptionsArraySelector,
  filingFieldsSelectListOptionsSelector,
} from '../../selectListOptions/selectors';
import {
  ALLOWANCES,
  CLASSIFICATIONS,
  DEPARTMENTS,
  JOB_CLASSES,
  LABOR_CATEGORIES,
  PART_FAMILIES,
  STANDARD_STATUSES,
} from '../../selectListOptions/constants/selectListTypes';
import {STATUS_ORDER, PRODUCTION, ARCHIVE} from '../constants/standardStatuses';
import StandardDetailsForm from './StandardDetailsForm';
import StandardUnitsOfMeasure from './StandardUnitsOfMeasure';
import {handleApiError, trimStatusSelections} from '../../shared/services';
import DeleteStandardModal from './DeleteStandardModal';
import DuplicateStandardModal from './DuplicateStandardModal';
import ConfirmUpdateStandardModal from './ConfirmUpdateStandardModal';
import ProductionCommentModal from './ProductionCommentModal';
import {makeSelectListOptionsForDepartmentArraySelector} from '../../attributes/selectors/selectListOptions';
import {STANDARD_ELEMENT} from '../constants/standardItemTypes';
import {lowestElementStatus} from '../services';
import {withRouter} from 'react-router';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {STANDARDS_EDIT, STANDARDS_MANAGE_PRODUCTION, BETA_FEATURES_ACCESS} from '../../authentication/constants/permissions';

class StandardProfileSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    this.props.getFilingFieldsAsSelectListOptions();
  }

  handleEdit() {
    this.props.editStandardDetails();
  }

  handleCancelEdit() {
    this.props.cancelEditStandardDetails();
  }

  handleClickComment(commentId) {
    this.props.toggleStandardStatusLogComment(commentId);
  }

  confirmStatusChangeNeeded() {
    const {standardItems, model, pristineModel} = this.props;

    if (model.get('status') === pristineModel.get('status')) return false;

    if (model.get('status') === ARCHIVE) return false;

    const standardElements = standardItems.filter(si => si.get('type') === STANDARD_ELEMENT);
    if (standardElements.size <= 0) return false;

    const lowestStatus = lowestElementStatus(standardElements);

    if (!lowestStatus) return false;

    const lowestStatusIndex = STATUS_ORDER.findIndex(s => s === lowestStatus);
    const newStatusIndex = STATUS_ORDER.findIndex(s => s === model.get('status'));

    return (lowestStatusIndex < newStatusIndex);
  }

  handleSave() {
    const {router, updateStandard, loadStandard, id, model, hideStandardToProductionComment} = this.props;
    hideStandardToProductionComment();
    updateStandard(id, model)
      .then(() => loadStandard(id))
      .catch(error => {
        handleApiError(error, router, 'An error occurred while attempting to update the standard details.');
      });
  }

  handleConfirmProductionComment() {
    const {showStandardToProductionComment, hideConfirmUpdateStandard, id, model, pristineModel} = this.props;
    hideConfirmUpdateStandard();
    if (pristineModel.get('status') !== model.get('status') && model.get('status') === PRODUCTION) {
      showStandardToProductionComment(id, model, pristineModel.get('status'), this.handleSave);
    } else {
      this.handleSave();
    }
  }

  handleConfirmStatusChanges() {
    const {showConfirmUpdateStandard, id, model, pristineModel} = this.props;

    if (this.confirmStatusChangeNeeded()) {
      showConfirmUpdateStandard(id, model, pristineModel.get('status'), this.handleConfirmProductionComment);
      return;
    }

    this.handleConfirmProductionComment();
  }

  handleFieldChange(e) {
    const {name, value} = e.target;
    this.props.setStandardDetailModelProperty(name, value);
  }

  handleFilingFieldChange(e) {
    const {id, value} = e.target;
    const propertyValue = (value === '') ? null : Number(value);
    this.props.setStandardDetailFilingFieldModelProperty(id, propertyValue);
  }

  handleDelete() {
    const {id, model, showDeleteStandard} = this.props;

    showDeleteStandard(new Map({id, name: model.get('name')}));
  }

  handleDuplicate() {
    const {id, model, showDuplicateStandard} = this.props;

    showDuplicateStandard(id, model.set('name', `${model.get('name')} - Copy`));
  }

  handleNewRevision() {
    const {createStandardRevision, loadStandard, id, router} = this.props;
    createStandardRevision(id)
      .then(() => loadStandard(id))
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to create a new revision.'));
  }

  render() {
    const {
      open,
      model,
      pristineModel,
      editing,

      allowances,
      classifications,
      attributes,
      departments,
      jobClasses,
      laborCategories,
      statuses,
      statusLogs,
      saving,
      validationErrors,
      departmentName,
      filingFields,
      partsEnabled,
      partFamilies,
      partFamilyName,
      isPreviousRevision,

      standardUnitsOfMeasure,
      timeFormat,

      canEdit,
      canManageProduction,
      defaultCharacteristicSetName,
      hasBetaAccess,
    } = this.props;

    if (!open) return null;

    const needsManageProduction = (pristineModel.get('status') === PRODUCTION || pristineModel.get('status') === ARCHIVE);
    return (
      <Sidebar className="standard-profile">
        {isPreviousRevision ? null : <EditSidebarSectionHeaderActions
          workingModel={model}
          editing={editing} saving={saving} hasPermission={canEdit && !needsManageProduction || needsManageProduction && canManageProduction}
          onEdit={this.handleEdit} onCancel={this.handleCancelEdit} onSave={this.handleConfirmStatusChanges}
          nonEditActions={
            canEdit && <span>
              <Button bsSize="small" disabled={saving} onClick={this.handleDuplicate}>
                <i className="fa fa-files-o" title="Duplicate" />
              </Button>
              {canEdit && (pristineModel.get('status') === PRODUCTION || pristineModel.get('status') === ARCHIVE) && <Button bsSize="small" disabled={saving} onClick={this.handleNewRevision} className="revision">
                <i className="fa fa-retweet" title="New Revision" />
              </Button>}
            </span>
          }
          editActions={
            canEdit && <Button bsStyle="default" className="delete" bsSize="small" disabled={saving} onClick={this.handleDelete}>
              <i className="fa fa-trash-o" title="Delete" />
            </Button>
          } />}
        <div className="sidebar-scrollable">
          <SidebarSection
            className="standard-details"
            title="Details"
            collapsible>
            <StandardDetailsForm
              model={model} validationErrors={validationErrors}
              creating={false}
              editing={editing}
              saving={saving}
              disabled={!canEdit || needsManageProduction && !canManageProduction}
              canManageProduction={canManageProduction}
              departmentName={departmentName}
              onFieldChange={this.handleFieldChange}
              onFilingFieldChange={this.handleFilingFieldChange}
              onClickComment={this.handleClickComment}
              filingFields={filingFields}
              allowances={allowances}
              classifications={classifications}
              attributes={attributes}
              departments={departments}
              jobClasses={jobClasses}
              laborCategories={laborCategories}
              statuses={trimStatusSelections(statuses, pristineModel.get('status'), canManageProduction)}
              statusLogs={statusLogs}
              showStatusComment={(model.get('status') !== pristineModel.get('status'))}
              currentStatus={pristineModel.get('status')}
              partsEnabled={partsEnabled}
              partFamilies={partFamilies}
              partFamilyName={partFamilyName} />
          </SidebarSection>

          <div className="standard-characteristic-set">
            <h4 className="sidebar-title">Default Characteristic Set</h4>
            {defaultCharacteristicSetName && <span>{defaultCharacteristicSetName}</span>}
          </div>

          <SidebarSection
            className="standard-units-of-measure"
            title="Units Of Measure"
            collapsible>
            <StandardUnitsOfMeasure
              standardUnitsOfMeasure={standardUnitsOfMeasure}
              timeFormat={timeFormat}
              hasBetaAccess={hasBetaAccess} />
          </SidebarSection>
          <DeleteStandardModal />
          <DuplicateStandardModal />
          <ConfirmUpdateStandardModal />
          <ProductionCommentModal />
        </div>
      </Sidebar>
    );
  }
}

function makeMapStateToProps() {
  const selectListAllowancesSelector = makeSelectListOptionsArrayWithBlankSelector(ALLOWANCES);
  const selectListClassificationsSelector = makeSelectListOptionsArrayWithBlankSelector(CLASSIFICATIONS);
  const selectListJobClassesSelector = makeSelectListOptionsArrayWithBlankSelector(JOB_CLASSES);
  const selectListLaborCategoriesSelector = makeSelectListOptionsArrayWithBlankSelector(LABOR_CATEGORIES);
  const selectListDepartmentsSelector = makeSelectListOptionsArrayWithBlankSelector(DEPARTMENTS);
  const standardStatusesSelector = makeSelectListOptionsArraySelector(STANDARD_STATUSES);
  const partFamiliesSelector = makeSelectListOptionsArrayWithBlankSelector(PART_FAMILIES);
  const canEditSelector = makeCurrentUserHasPermissionSelector(STANDARDS_EDIT);
  const canManageProductionSelector = makeCurrentUserHasPermissionSelector(STANDARDS_MANAGE_PRODUCTION);
  const hasBetaAccessSelector = makeCurrentUserHasPermissionSelector(BETA_FEATURES_ACCESS);

  return state => {
    const model = modelSelector(state);
    const selectListAttributesSelector = makeSelectListOptionsForDepartmentArraySelector(state);

    return {
      open: openSelector(state),

      id: idSelector(state),
      model: modelSelector(state),
      pristineModel: pristineModelSelector(state),
      editing: editingSelector(state),
      saving: savingSelector(state),
      validationErrors: validationErrorsSelector(state),

      allowances: selectListAllowancesSelector(state),
      classifications: selectListClassificationsSelector(state),
      attributes: selectListAttributesSelector(model.get('departmentId')),
      jobClasses: selectListJobClassesSelector(state),
      laborCategories: selectListLaborCategoriesSelector(state),
      statuses: standardStatusesSelector(state),
      statusLogs: sortedStatusLogsArraySelector(state),
      departments: selectListDepartmentsSelector(state),
      filingFields: filingFieldsSelectListOptionsSelector(state),
      partsEnabled: enablePartsSelector(state),
      partFamilies: partFamiliesSelector(state),
      partFamilyName: partFamilyNameSelector(state),
      isPreviousRevision: isPreviousRevisionSelector(state),

      standardUnitsOfMeasure: standardUnitsOfMeasureArraySelector(state),
      timeFormat: timeFormatSelector(state),
      departmentName: departmentNameSelector(state),
      standardItems: standardItemsSelector(state),

      canEdit: canEditSelector(state),
      canManageProduction: canManageProductionSelector(state),
      defaultCharacteristicSetName: defaultCharacteristicSetNameSelector(state),
      hasBetaAccess: hasBetaAccessSelector(state),
    };
  };
}

export default withRouter(connect(
  makeMapStateToProps,
  {
    cancelEditStandardDetails,
    createStandardRevision,
    editStandardDetails,
    getFilingFieldsAsSelectListOptions,
    hideConfirmUpdateStandard,
    hideStandardToProductionComment,
    loadStandard,
    setStandardDetailFilingFieldModelProperty,
    setStandardDetailModelProperty,
    showConfirmUpdateStandard,
    showDeleteStandard,
    showDuplicateStandard,
    showStandardToProductionComment,
    toggleStandardStatusLogComment,
    updateStandard,
  }
)(StandardProfileSidebar));
