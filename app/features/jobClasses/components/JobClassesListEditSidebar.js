import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  Sidebar,
  SidebarSection,
  EditSidebarSectionHeaderActions,
} from '../../layout/components';
import {
  setEditJobClassModelProperty,
  updateJobClass,
  showDeleteJobClass,
  closeJobClassesListEditSidebar,
} from '../actions';
import {
  showSelector,
  modelSelector,
  savingSelector,
  validationErrorsSelector,
  dirtySelector,
} from '../selectors/sidebars/edit';
import CreateEditJobClassForm from './CreateEditJobClassForm';
import DeleteJobClassModal from './DeleteJobClassModal';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {JOB_CLASSES} from '../../selectListOptions/constants/selectListTypes';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {Button} from 'react-bootstrap';

class JobClassesListEditSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setEditJobClassModelProperty(name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {updateJobClass, closeJobClassesListEditSidebar, loadSelectListOptions, model, router} = this.props;

    updateJobClass(model)
      .then(() => {
        closeJobClassesListEditSidebar();
        loadSelectListOptions(JOB_CLASSES);
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to update the Job Class.'));
  }

  handleCancel() {
    this.props.closeJobClassesListEditSidebar();
  }

  handleDelete() {
    const {model, showDeleteJobClass} = this.props;
    showDeleteJobClass(model);
  }

  render() {
    const {
      show,
      model,
      saving,
      validationErrors,
      dirty,
      canManageStandardList,
    } = this.props;

    if (!show) return null;

    return (
      <Sidebar className="jobClasses-list-edit-sidebar">
        <EditSidebarSectionHeaderActions
          workingModel={model}
          editing saving={saving}
          dirty={dirty}
          onCancel={this.handleCancel}
          onSave={this.handleSave}
          hasPermission={canManageStandardList}
          editActions={
            canManageStandardList && <Button bsStyle="default" className="delete" bsSize="small" disabled={saving} onClick={this.handleDelete}>
              <i className="fa fa-trash-o" title="Delete" />
            </Button>
          } />
        <div className="sidebar-scrollable">
          <SidebarSection className="job-class" title="Edit Job Class" collapsible={false} />
          <CreateEditJobClassForm
            model={model}
            validationErrors={validationErrors}
            saving={saving}
            onFieldChange={this.handleFieldChange}
            onSubmit={this.handleSave}
            disabled={!canManageStandardList} />
          <DeleteJobClassModal />
        </div>
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  return {
    show: showSelector(state),
    model: modelSelector(state),
    saving: savingSelector(state),
    validationErrors: validationErrorsSelector(state),
    dirty: dirtySelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    setEditJobClassModelProperty,
    updateJobClass,
    showDeleteJobClass,
    closeJobClassesListEditSidebar,
    loadSelectListOptions,
  }
)(JobClassesListEditSidebar));
