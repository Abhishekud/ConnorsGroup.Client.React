import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  Sidebar,
  SidebarSection,
  EditSidebarSectionHeaderActions,
} from '../../layout/components';
import makeCurrentUserHasPermissionSelector from '../../authentication/selectors/currentUser/makeCurrentUserHasPermissionSelector';
import {PROFILING_LIST_MANAGEMENT} from '../../authentication/constants/permissions';
import {
  setEditOrgHierarchyLevelOptionModelProperty,
  updateOrgHierarchyLevelOption,
  showDeleteOrgHierarchyLevelOption,
  closeEditOrgHierarchyLevelOptionSidebar,
} from '../actions';
import {
  showSelector,
  modelSelector,
  savingSelector,
  validationErrorsSelector,
  orgHierarchyLevelIdSelector,
} from '../selectors/sidebars/edit';
import {
  selectedOrgHierarchyLevelNumberSelector,
  parentOrgHierarchyLevelOptionSelectListOptionsArraySelector,
} from '../selectors/pages/list';
import {
  loadSelectListOptions,
} from '../../selectListOptions/actions';
import {LOCATION_PARENTS} from '../../selectListOptions/constants/selectListTypes';
import CreateEditOrgHierarchyLevelOptionForm from './CreateEditOrgHierarchyLevelOptionForm';
import DeleteOrgHierarchyLevelOptionModal from './DeleteOrgHierarchyLevelOptionModal';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {Button} from 'react-bootstrap';

class EditOrgHierarchyLevelOptionSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setEditOrgHierarchyLevelOptionModelProperty(name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {
      updateOrgHierarchyLevelOption,
      orgHierarchyLevelId,
      model,
      router,
      loadSelectListOptions,
      closeEditOrgHierarchyLevelOptionSidebar,
    } = this.props;

    updateOrgHierarchyLevelOption(orgHierarchyLevelId, model)
      .then(() => {
        loadSelectListOptions(LOCATION_PARENTS);
        closeEditOrgHierarchyLevelOptionSidebar();
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to update the Hierarchy Level.'));
  }

  handleCancel() {
    this.props.closeEditOrgHierarchyLevelOptionSidebar();
  }

  handleDelete() {
    const {model, showDeleteOrgHierarchyLevelOption, orgHierarchyLevelId} = this.props;
    showDeleteOrgHierarchyLevelOption(orgHierarchyLevelId, model);
  }

  render() {
    const {
      show,
      model,
      saving,
      validationErrors,
      selectedOrgHierarchyLevelNumber,
      parentOrgHierarchyLevelOptionSelectListOptions,
      canEdit,
    } = this.props;

    if (!show) return null;

    return (
      <Sidebar>
        <EditSidebarSectionHeaderActions
          workingModel={model}
          editing saving={saving}
          onCancel={this.handleCancel}
          onSave={this.handleSave}
          hasPermission={canEdit}
          editActions={
            canEdit && <Button bsStyle="default" className="delete" bsSize="small" disabled={saving} onClick={this.handleDelete}>
              <i className="fa fa-trash-o" title="Delete" />
            </Button>
          } />
        <div className="sidebar-scrollable">
          <SidebarSection className="orgHierarchyLevelOption" title="Edit Level Option" collapsible={false}>
            <CreateEditOrgHierarchyLevelOptionForm
              model={model}
              validationErrors={validationErrors}
              selectedOrgHierarchyLevelNumber={selectedOrgHierarchyLevelNumber}
              parentOrgHierarchyLevelOptionSelectListOptions={parentOrgHierarchyLevelOptionSelectListOptions}
              saving={saving}
              onFieldChange={this.handleFieldChange}
              onSubmit={this.handleSave}
              disabled={!canEdit} />
          </SidebarSection>
          <DeleteOrgHierarchyLevelOptionModal />
        </div>
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  const canEditSelector = makeCurrentUserHasPermissionSelector(PROFILING_LIST_MANAGEMENT);

  return {
    show: showSelector(state),
    model: modelSelector(state),
    saving: savingSelector(state),
    validationErrors: validationErrorsSelector(state),
    orgHierarchyLevelId: orgHierarchyLevelIdSelector(state),
    selectedOrgHierarchyLevelNumber: selectedOrgHierarchyLevelNumberSelector(state),
    parentOrgHierarchyLevelOptionSelectListOptions: parentOrgHierarchyLevelOptionSelectListOptionsArraySelector(state),
    canEdit: canEditSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    setEditOrgHierarchyLevelOptionModelProperty,
    updateOrgHierarchyLevelOption,
    showDeleteOrgHierarchyLevelOption,
    closeEditOrgHierarchyLevelOptionSidebar,
    loadSelectListOptions,
  }
)(EditOrgHierarchyLevelOptionSidebar));
