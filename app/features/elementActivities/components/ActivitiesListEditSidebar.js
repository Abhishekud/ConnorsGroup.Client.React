import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {List} from 'immutable';
import {
  mapSelectedOptionsToValues,
} from '../../forms/services';
import {
  Sidebar,
  SidebarSection,
  EditSidebarSectionHeaderActions,
} from '../../layout/components';
import {
  setEditActivityModelProperty,
  updateActivity,
  showDeleteActivity,
  closeActivitiesListEditSidebar,
} from '../actions';
import {
  showSelector,
  modelSelector,
  savingSelector,
  validationErrorsSelector,
} from '../selectors/sidebars/edit';
import CreateEditActivityForm from './CreateEditActivityForm';
import DeleteActivityModal from './DeleteActivityModal';
import {handleApiError} from '../../shared/services';
import {ELEMENT_ACTIVITIES} from '../../selectListOptions/constants/selectListTypes';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {withRouter} from 'react-router';
import {Button} from 'react-bootstrap';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {ELEMENTS_LIST_MANAGEMENT} from '../../authentication/constants/permissions';

class ActivitiesListEditSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {tagName, multiple} = event.target;

    if (tagName === 'SELECT' && multiple) {
      this.handleMultiSelectFieldChange(event);
    } else {
      this.handleInputFieldChange(event);
    }
  }

  handleMultiSelectFieldChange(event) {
    const {name, options} = event.target;
    this.props.setEditActivityModelProperty(name, List(mapSelectedOptionsToValues(options)));
  }

  handleInputFieldChange(event) {
    const {name, value} = event.target;
    this.props.setEditActivityModelProperty(name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {updateActivity, model, loadSelectListOptions, closeActivitiesListEditSidebar, router} = this.props;

    updateActivity(model)
      .then(() => {
        loadSelectListOptions(ELEMENT_ACTIVITIES);
        closeActivitiesListEditSidebar();
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to update the Activity.'));
  }

  handleCancel() {
    this.props.closeActivitiesListEditSidebar();
  }

  handleDelete() {
    const {model, showDeleteActivity} = this.props;
    showDeleteActivity(model);
  }

  render() {
    const {
      show,
      model,
      saving,
      validationErrors,
      canEdit,
    } = this.props;

    if (!show) return null;

    return (
      <Sidebar className="units-of-measure-list-edit-sidebar">
        <EditSidebarSectionHeaderActions
          workingModel={model}
          editing saving={saving}
          onSave={this.handleSave} onCancel={this.handleCancel}
          hasPermission={canEdit}
          editActions={
            canEdit && <Button bsStyle="default" className="delete" bsSize="small" disabled={saving} onClick={this.handleDelete}>
              <i className="fa fa-trash-o" title="Delete" />
            </Button>
          } />
        <div className="sidebar-scrollable">
          <SidebarSection
            className="unit-of-measure" title="Edit Activity" collapsible={false}>
            <CreateEditActivityForm
              model={model}
              validationErrors={validationErrors}
              saving={saving}
              onFieldChange={this.handleFieldChange}
              onSubmit={this.handleSave}
              disabled={!canEdit} />
          </SidebarSection>
          <DeleteActivityModal />
        </div>
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  const canEditSelector = makeCurrentUserHasPermissionSelector(ELEMENTS_LIST_MANAGEMENT);
  return {
    show: showSelector(state),
    model: modelSelector(state),
    saving: savingSelector(state),
    validationErrors: validationErrorsSelector(state),
    canEdit: canEditSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    setEditActivityModelProperty,
    updateActivity,
    showDeleteActivity,
    closeActivitiesListEditSidebar,
    loadSelectListOptions,
  }
)(ActivitiesListEditSidebar));
