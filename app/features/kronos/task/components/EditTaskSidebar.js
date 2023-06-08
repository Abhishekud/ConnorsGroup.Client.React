import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import {List} from 'immutable';
import {mapSelectedOptionsToValues} from '../../../forms/services';
import {handleApiError} from '../../../shared/services';
import {
  Sidebar,
  SidebarSection,
  EditSidebarSectionHeaderActions,
} from '../../../layout/components';
import {
  showSelector,
  dirtySelector,
  modelSelector,
  validationErrorsSelector,
  exportMessageSelector,
  successSelector,
} from '../selectors/sidebars/edit';
import {taskGroupsSelector} from '../selectors/pages/list';
import {
  cancelEdit,
  saveEdit,
  setPropertyForEdit,
  showDeleteModal,
} from '../actions';
import {TaskForm} from './';
import ExportMessages from '../../shared/components/ExportMessages';
import wfdSelector from '../../shared/selectors/wfdSelector';

class EditTaskSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleCancel() {
    this.props.cancelEdit();
  }

  handleSave(event) {
    event.preventDefault();

    const {saveEdit, model, router, reloadTasks} = this.props;
    saveEdit(model)
      .then(() => {
        reloadTasks();
      })
      .catch(
        error => {
          const {status} = error.response || {};
          if (status !== 404 && status !== 400) {
            handleApiError(error, router, 'An error occurred trying to update the Task.');
          }
        });
  }

  handleDelete() {
    const {showDeleteModal, model} = this.props;
    showDeleteModal(model);
  }

  handleFieldChange(e) {
    const {tagName, multiple, id, value} = e.target;
    if (tagName === 'SELECT' && multiple) {
      this.handleMultiSelectFieldChange(e);
    } else {
      this.props.setPropertyForEdit(id, value);
    }
  }

  handleMultiSelectFieldChange(e) {
    const {id, options} = e.target;
    this.props.setPropertyForEdit(id, List(mapSelectedOptionsToValues(options)));
  }

  handleCheckboxChange(e) {
    const {id, checked} = e.target;
    this.props.setPropertyForEdit(id, checked);
  }

  render() {
    const {show, saving, model, cancelEdit, dirty, taskGroups, validationErrors, successStatus, message, isWfd, canEdit} = this.props;

    if (!show) return null;

    return (
      <Sidebar>
        <EditSidebarSectionHeaderActions
          workingModel={model}
          editing saving={saving} dirty={dirty}
          onCancel={cancelEdit} onSave={this.handleSave}
          hasPermission={canEdit}
          editActions={
            canEdit && <Button bsStyle="default" className="delete" bsSize="small" disabled={saving} onClick={this.handleDelete}>
              <i className="fa fa-trash-o" title="Delete" />
            </Button>} />
        <div className="sidebar-scrollable">
          <SidebarSection className="kronos-labor-task" title="Edit Task" collapsible={false} />
          <TaskForm
            onFieldChange={this.handleFieldChange}
            onCheckboxChange={this.handleCheckboxChange}
            onSubmit={this.handleSave}
            formValidationErrors={validationErrors}
            taskGroupsList={taskGroups}
            model={model}
            isWfd={isWfd}
            disabled={!canEdit} />
          <SidebarSection className="export-status" title="Export Status" collapsible />
          <ExportMessages successStatus={successStatus} message={message} />
        </div>
      </Sidebar>
    );
  }
}

EditTaskSidebar.propTypes = {
  saving: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
  model: PropTypes.object.isRequired,
  dirty: PropTypes.bool.isRequired,
  canEdit: PropTypes.bool,
  cancelEdit: PropTypes.func.isRequired,
  saveEdit: PropTypes.func.isRequired,

  setPropertyForEdit: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    show: showSelector(state),
    model: modelSelector(state),
    saving: false,
    dirty: dirtySelector(state),
    taskGroups: taskGroupsSelector(state),
    validationErrors: validationErrorsSelector(state),
    successStatus: successSelector(state),
    message: exportMessageSelector(state),
    isWfd: wfdSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps, {
    cancelEdit,
    saveEdit,
    setPropertyForEdit,
    showDeleteModal,
  }
)(EditTaskSidebar));
