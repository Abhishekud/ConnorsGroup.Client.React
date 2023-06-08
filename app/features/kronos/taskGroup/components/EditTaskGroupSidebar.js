import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import {
  Sidebar,
  SidebarSection,
  EditSidebarSectionHeaderActions,
} from '../../../layout/components';
import {
  showSelector,
  modelSelector,
  dirtySelector,
  validationErrorsSelector,
  exportMessageSelector,
  successSelector,
} from '../selectors/sidebars/edit';
import {
  cancelEdit,
  saveEdit,
  setPropertyForEdit,
  showDeleteModal,
} from '../actions';
import {TaskGroupForm} from './';
import {handleApiError} from '../../../shared/services';
import {ExportMessages} from '../../shared/components';
import wfdSelector from '../../shared/selectors/wfdSelector';

class EditTaskGroupSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleCancel() {
    this.props.cancelEdit();
  }

  handleSave(event) {
    event.preventDefault();

    const {saveEdit, model, router, reloadList} = this.props;
    saveEdit(model)
      .then(() => {
        reloadList();
      })
      .catch(error => {
        const {status} = error.response || {};
        if (status !== 404 && status !== 400) {
          handleApiError(error, router, 'An error occurred trying to update the Task Group.');
        }
      });
  }

  handleDelete() {
    const {showDeleteModal, model} = this.props;
    showDeleteModal(model);
  }

  handleFieldChange(e) {
    const {id, value} = e.target;
    this.props.setPropertyForEdit(id, value);
  }

  handleCheckboxChange(e) {
    const {id, checked} = e.target;
    this.props.setPropertyForEdit(id, checked);
  }

  render() {
    const {show, saving, model, cancelEdit, dirty, jobs, validationErrors, successStatus, message, isWfd, canEdit} = this.props;

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
            </Button>
          } />
        <div className="sidebar-scrollable">
          <SidebarSection className="kronos-taskGroup" title="Edit Task Group" collapsible={false} />
          <TaskGroupForm
            onFieldChange={this.handleFieldChange}
            onCheckboxChange={this.handleCheckboxChange}
            onSubmit={this.handleSave}
            formValidationErrors={validationErrors}
            jobsList={jobs}
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

EditTaskGroupSidebar.propTypes = {
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
)(EditTaskGroupSidebar));
