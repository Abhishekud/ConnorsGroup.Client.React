import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  Sidebar,
  SidebarSection,
  EditSidebarSectionHeaderActions,
} from '../../layout/components';
import {
  setEditDepartmentModelProperty,
  updateDepartment,
  showDeleteDepartment,
  closeDepartmentsListEditSidebar,
} from '../actions';
import {
  showSelector,
  modelSelector,
  savingSelector,
  validationErrorsSelector,
  dirtySelector,
} from '../selectors/sidebars/edit';
import {
  loadAttributesList,
} from '../../attributes/actions';
import CreateEditDepartmentForm from './CreateEditDepartmentForm';
import DeleteDepartmentModal from './DeleteDepartmentModal';
import {handleApiError} from '../../shared/services';
import {DEPARTMENTS} from '../../selectListOptions/constants/selectListTypes';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {
  departmentNameSelector,
} from '../../shared/selectors/components/settings';
import {withRouter} from 'react-router';
import {Button} from 'react-bootstrap';

class DepartmentsListEditSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {router} = this.props;
    this.props.loadAttributesList()
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the attributes list.', 'Error'));
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setEditDepartmentModelProperty(name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {updateDepartment, model, loadSelectListOptions, closeDepartmentsListEditSidebar, departmentName, router} = this.props;

    updateDepartment(model)
      .then(() => {
        loadSelectListOptions(DEPARTMENTS);
        closeDepartmentsListEditSidebar();
      })
      .catch(error => handleApiError(error, router, `An error occurred while attempting to update the ${departmentName}.`));
  }

  handleCancelEdit() {
    this.props.closeDepartmentsListEditSidebar();
  }

  handleDelete() {
    const {model, showDeleteDepartment} = this.props;
    showDeleteDepartment(model);
  }

  render() {
    const {
      show,
      model,
      saving,
      dirty,
      validationErrors,
      departmentName,
      canManageStandardList,
    } = this.props;

    if (!show) return null;

    return (
      <Sidebar className="departments-list-edit-sidebar">
        <EditSidebarSectionHeaderActions
          workingModel={model}
          editing saving={saving} dirty={dirty}
          onCancel={this.handleCancelEdit} onSave={this.handleSave}
          hasPermission={canManageStandardList}
          editActions={
            canManageStandardList && <Button bsStyle="default" className="delete" bsSize="small" disabled={saving} onClick={this.handleDelete}>
              <i className="fa fa-trash-o" title="Delete" />
            </Button>
          } />
        <div className="sidebar-scrollable">
          <SidebarSection className="department" title={`Edit ${departmentName}`} collapsible={false}>
            <CreateEditDepartmentForm
              model={model}
              validationErrors={validationErrors}
              saving={saving}
              onFieldChange={this.handleFieldChange}
              onSubmit={this.handleSave}
              disabled={!canManageStandardList} />
          </SidebarSection>
          <DeleteDepartmentModal />
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
    dirty: dirtySelector(state),
    validationErrors: validationErrorsSelector(state),
    departmentName: departmentNameSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    setEditDepartmentModelProperty,
    updateDepartment,
    showDeleteDepartment,
    closeDepartmentsListEditSidebar,
    loadSelectListOptions,
    loadAttributesList,
  }
)(DepartmentsListEditSidebar));
