import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  makeSelectListOptionsArraySelector,
} from '../../selectListOptions/selectors';
import {
  ELEMENT_UNITS_OF_MEASURE,
  ELEMENT_ACTIVITIES,
  ELEMENT_STATUSES,
} from '../../selectListOptions/constants/selectListTypes';
import {
  Sidebar,
  SidebarSection,
  EditSidebarSectionHeaderActions,
} from '../../layout/components';
import ConfirmOpenMassUpdateModal from './ConfirmOpenMassUpdateModal';
import DeleteElementModal from './DeleteElementModal';
import DuplicateElementModal from './DuplicateElementModal';
import {
  deleteElement,
  editNonMOSTElement,
  setEditNonMOSTElementWorkingModelProperty,
  updateNonMOSTElement,
  cancelEditNonMOSTElement,
  showDeleteElement,
  showDuplicateElement,
  toggleNonMOSTElementStatusLogComment,
} from '../actions';
import {
  showSelector,
  pristineModelSelector,
  workingModelSelector,
  editingSelector,
  savingSelector,
  validationErrorsSelector,
  sortedStatusLogsArraySelector,
} from '../selectors/sidebars/nonMOSTElementProfile';
import EditNonMOSTElementForm from './EditNonMOSTElementForm';
import {handleApiError, trimStatusSelections} from '../../shared/services';
import {withRouter} from 'react-router';
import {elementTypes} from '../constants';
import {PRODUCTION, ARCHIVE} from '../../standards/constants/standardStatuses';
import {Button} from 'react-bootstrap';
import {showConfirmOpenMassUpdate} from '../actions/showConfirmOpenMassUpdate';
import {ELEMENTS_EDIT, ELEMENTS_MANAGE_PRODUCTION} from '../../authentication/constants/permissions';
import makeCurrentUserHasPermissionSelector from '../../authentication/selectors/currentUser/makeCurrentUserHasPermissionSelector';

class NonMOSTElementProfileSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setEditNonMOSTElementWorkingModelProperty(name, value);
  }

  handleClickComment(commentId) {
    this.props.toggleNonMOSTElementStatusLogComment(commentId);
  }

  handleSave(event) {
    event.preventDefault();

    const {showConfirmOpenMassUpdate, updateNonMOSTElement, pristineModel, workingModel, router} = this.props;

    if (pristineModel.get('status') === PRODUCTION && workingModel.get('status') === ARCHIVE && pristineModel.get('productionStandardsCount') > 0) {
      showConfirmOpenMassUpdate();
      return;
    }
    updateNonMOSTElement(workingModel)
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to update the Element.'));
  }

  handleDelete() {
    const {pristineModel, showDeleteElement} = this.props;
    showDeleteElement(pristineModel);
  }

  handleDuplicate() {
    const {pristineModel, showDuplicateElement} = this.props;
    showDuplicateElement(pristineModel.set('name', `${pristineModel.get('name')} - Copy`), elementTypes.TIMED);
  }

  handleCancel() {
    this.props.cancelEditNonMOSTElement();
  }

  render() {
    const {
      show,
      workingModel,
      pristineModel,
      editing,
      saving,
      validationErrors,
      elementUnitsOfMeasure,
      elementActivities,
      elementStatuses,
      handleEdit,
      statusLogs,
      canEdit,
      canManageProduction,
    } = this.props;

    if (!show) return null;

    const needsManageProduction = (pristineModel.get('status') === PRODUCTION || pristineModel.get('status') === ARCHIVE);
    return (
      <Sidebar closeable={false}>
        <EditSidebarSectionHeaderActions
          workingModel={workingModel}
          editing={editing} saving={saving} hasPermission={canEdit && !needsManageProduction || needsManageProduction && canManageProduction}
          onEdit={handleEdit} onSave={this.handleSave} onCancel={this.handleCancel}
          nonEditActions={
            canEdit && <Button bsSize="small" disabled={saving} onClick={this.handleDuplicate}>
              <i className="fa fa-files-o" title="Duplicate" />
            </Button>
          }
          editActions={
            canEdit && <Button bsStyle="default" className="delete" bsSize="small" disabled={saving} onClick={this.handleDelete}>
              <i className="fa fa-trash-o" title="Delete" />
            </Button>
          } />
        <div className="sidebar-scrollable">
          <SidebarSection
            title="Details" collapsible={false}>
            <EditNonMOSTElementForm
              model={workingModel}
              currentStatus={pristineModel.get('status')}
              validationErrors={validationErrors}
              unitsOfMeasure={elementUnitsOfMeasure}
              activities={elementActivities}
              canEdit={canEdit}
              canManageProduction={canManageProduction}
              statuses={trimStatusSelections(elementStatuses, pristineModel.get('status'), canManageProduction)}
              statusLogs={statusLogs}
              showStatusComment={(workingModel.get('status') !== pristineModel.get('status'))}
              editing={editing}
              saving={saving}
              onFieldChange={this.handleFieldChange}
              onClickComment={this.handleClickComment}
              onSubmit={this.handleSave} />
          </SidebarSection>
          <DeleteElementModal />
          <DuplicateElementModal />
          <ConfirmOpenMassUpdateModal elementType={elementTypes.TIMED} />
        </div>
      </Sidebar>
    );
  }
}

function makeMapStateToProps() {
  const elementUnitsOfMeasureSelector = makeSelectListOptionsArraySelector(ELEMENT_UNITS_OF_MEASURE);
  const elementActivitiesSelector = makeSelectListOptionsArraySelector(ELEMENT_ACTIVITIES);
  const elementStatusesSelector = makeSelectListOptionsArraySelector(ELEMENT_STATUSES);
  const canEditSelector = makeCurrentUserHasPermissionSelector(ELEMENTS_EDIT);
  const canManageProductionSelector = makeCurrentUserHasPermissionSelector(ELEMENTS_MANAGE_PRODUCTION);

  return state => ({
    show: showSelector(state),
    pristineModel: pristineModelSelector(state),
    workingModel: workingModelSelector(state),
    editing: editingSelector(state),
    saving: savingSelector(state),
    validationErrors: validationErrorsSelector(state),
    elementUnitsOfMeasure: elementUnitsOfMeasureSelector(state),
    elementActivities: elementActivitiesSelector(state),
    elementStatuses: elementStatusesSelector(state),
    statusLogs: sortedStatusLogsArraySelector(state),
    canEdit: canEditSelector(state),
    canManageProduction: canManageProductionSelector(state),
  });
}

export default withRouter(connect(
  makeMapStateToProps,
  {
    deleteElement,
    handleEdit: editNonMOSTElement,
    setEditNonMOSTElementWorkingModelProperty,
    updateNonMOSTElement,
    cancelEditNonMOSTElement,
    showDeleteElement,
    showDuplicateElement,
    toggleNonMOSTElementStatusLogComment,
    showConfirmOpenMassUpdate,
  }
)(NonMOSTElementProfileSidebar));
