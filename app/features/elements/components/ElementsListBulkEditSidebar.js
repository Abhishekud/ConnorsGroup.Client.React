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
  bulkUpdateElements,
  clearBulkEditElementsData,
  cancelUpdateElements,
  loadElementsList,
  setElementsListBulkEditModelProperty,
  toggleElementsListBulkEditSidebar,
  showConfirmUpdateElements,
  showDeleteSelectedElements,
} from '../actions';
import {
  ELEMENT_UNITS_OF_MEASURE,
  ELEMENT_ACTIVITIES,
  ELEMENT_STATUSES,
} from '../../selectListOptions/constants/selectListTypes';
import {
  openSelector,
  modelSelector,
  savingSelector,
  validationErrorsSelector,
} from '../selectors/sidebars/bulkEditElements';
import {ARCHIVE, PRODUCTION, STATUS_ORDER} from '../../standards/constants/standardStatuses';
import {
  lowestElementStatus,
  highestElementStatus,
} from '../services';
import {
  selectedElementsSelector,
  elementsSelector,
} from '../selectors/pages/list';
import {
  modelSelector as elementsFiltersSelector,
} from '../selectors/sidebars/filters';
import {
  makeSelectListOptionsArrayWithBlankSelector,
  makeSelectListOptionsArraySelector,
} from '../../selectListOptions/selectors';
import ConfirmUpdateElementsModal from './ConfirmUpdateElementsModal';
import ElementsListBulkEditForm from './ElementsListBulkEditForm';
import {handleApiError, toastr, trimStatusSelections} from '../../shared/services';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {ELEMENTS_EDIT, ELEMENTS_MANAGE_PRODUCTION} from '../../authentication/constants/permissions';

class ElementsListBulkEditSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleCancelEdit() {
    this.props.toggleElementsListBulkEditSidebar();
  }

  handleEdit() {
  }

  handleSave() {
    const {router, bulkUpdateElements, model, loadElementsList, elementsFilters, clearBulkEditElementsData, selectedElements} = this.props;
    if (selectedElements.size === 0) {
      toastr.error('No elements selected.', 'Error');
      return;
    }
    if (!model.get('updateElementActivityId') &&
      !model.get('updateElementUnitOfMeasureId') &&
      !model.get('updateStatus')) {
      toastr.error('Nothing to update.', 'Error');
      return;
    }
    bulkUpdateElements(model, selectedElements.keySeq().toArray())
      .then(() => {
        loadElementsList(elementsFilters);
        clearBulkEditElementsData();
      })
      .catch(error => {
        handleApiError(error, router, 'An error occurred while attempting to update the selected elements.');
      });
  }

  handleFilingFieldCheckboxChange(e) {
    const {dataset, checked} = e.target;
    this.props.setElementListBulkEditFilingFieldModelPropertyChecked(dataset.id, checked);
  }

  handleFilingFieldChange(e) {
    const {dataset, value} = e.target;
    const propertyValue = (value === '') ? null : Number(value);
    this.props.setElementListBulkEditFilingFieldModelProperty(dataset.id, propertyValue);
  }

  handleFieldChange(e) {
    const {name, value} = e.target;
    this.props.setElementsListBulkEditModelProperty(name, value);
  }

  handleCheckboxChange(e) {
    const {id, checked} = e.target;
    this.props.setElementsListBulkEditModelProperty(id, checked);
  }

  handleDelete() {
    const {selectedElements, showDeleteSelectedElements} = this.props;
    showDeleteSelectedElements(selectedElements.keySeq().toArray());
  }

  handleConfirmStatusChanges(e) {
    e.preventDefault();
    const {showConfirmUpdateElements, model} = this.props;

    if (this.confirmStatusChangeNeeded()) {
      showConfirmUpdateElements(model, this.handleSave);
      return;
    }

    this.handleSave();
  }

  confirmStatusChangeNeeded() {
    const {model, elements, selectedElements} = this.props;

    const highestStatus = highestElementStatus(selectedElements, elements);
    const lowestStatus = lowestElementStatus(selectedElements, elements);
    return (model.get('updateStatus') && (model.get('status') !== lowestStatus || model.get('status') !== highestStatus));
  }

  render() {
    const {
      open,
      model,
      selectedElements,
      activities,
      statuses,
      elements,
      departmentIds,
      canEdit,
      canManageProduction,

      saving,
      validationErrors,

      elementUnitsOfMeasure,
    } = this.props;

    if (!open || selectedElements.size === 0) return null;

    const highestStatus = highestElementStatus(selectedElements, elements);
    const allowedStatuses = trimStatusSelections(statuses, highestStatus, canManageProduction);
    if (STATUS_ORDER.indexOf(model.get('status')) < STATUS_ORDER.indexOf(allowedStatuses[0].value)) {
      setTimeout(() => this.props.setElementsListBulkEditModelProperty('status', allowedStatuses[0].value));
    }
    if (model.get('updateAttributeId') && departmentIds.length > 1) {
      setTimeout(() => {
        this.props.setElementsListBulkEditModelProperty('updateAttributeId', false);
        this.props.setElementsListBulkEditModelProperty('attributeId', null);
      });
    }
    const needsManageProduction = (highestStatus === PRODUCTION || highestStatus === ARCHIVE) && !canManageProduction;
    return (
      <Sidebar className="element-profile">
        <EditSidebarSectionHeaderActions
          workingModel={model} disabled={needsManageProduction}
          editing saving={saving} hasPermission={canEdit}
          onEdit={this.handleEdit} onCancel={this.handleCancelEdit} onSave={this.handleConfirmStatusChanges} />
        <div className="sidebar-scrollable">
          <SidebarSection
            className="element-details"
            title="Element Details"
            collapsible>
            <ElementsListBulkEditForm
              model={model} validationErrors={validationErrors}
              selectedElementsCount={selectedElements.size}
              highestStatus={highestStatus}
              needsManageProduction={needsManageProduction}
              creating={false} editing saving={saving}
              statuses={allowedStatuses}
              unitsOfMeasure={elementUnitsOfMeasure}
              activities={activities}
              onFieldChange={this.handleFieldChange}
              onCheckboxChange={this.handleCheckboxChange}
              onDelete={this.handleDelete} />
          </SidebarSection>
        </div>
        <ConfirmUpdateElementsModal />
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  const elementUnitsOfMeasureArraySelector = makeSelectListOptionsArrayWithBlankSelector(ELEMENT_UNITS_OF_MEASURE);
  const activitiesSelector = makeSelectListOptionsArrayWithBlankSelector(ELEMENT_ACTIVITIES);
  const elementStatusesSelector = makeSelectListOptionsArraySelector(ELEMENT_STATUSES);
  const canManageProductionSelector = makeCurrentUserHasPermissionSelector(ELEMENTS_MANAGE_PRODUCTION);
  const canEditSelector = makeCurrentUserHasPermissionSelector(ELEMENTS_EDIT);

  return {
    open: openSelector(state),
    model: modelSelector(state),
    saving: savingSelector(state),
    validationErrors: validationErrorsSelector(state),
    selectedElements: selectedElementsSelector(state),

    statuses: elementStatusesSelector(state),
    activities: activitiesSelector(state),
    elementUnitsOfMeasure: elementUnitsOfMeasureArraySelector(state),
    elements: elementsSelector(state),
    elementsFilters: elementsFiltersSelector(state),
    canManageProduction: canManageProductionSelector(state),
    canEdit: canEditSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    showDeleteSelectedElements,
    bulkUpdateElements,
    cancelUpdateElements,
    clearBulkEditElementsData,
    loadElementsList,
    setElementsListBulkEditModelProperty,
    toggleElementsListBulkEditSidebar,
    showConfirmUpdateElements,
  }
)(ElementsListBulkEditSidebar));
