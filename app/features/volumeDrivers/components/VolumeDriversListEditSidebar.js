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
  setEditVolumeDriverModelProperty,
  updateVolumeDriver,
  showDeleteVolumeDriver,
  closeVolumeDriversListEditSidebar,
  loadVolumeDriverSelectListOptions,
} from '../actions';
import {
  showSelector,
  modelSelector,
  savingSelector,
  validationErrorsSelector,
  dirtySelector,
} from '../selectors/sidebars/edit';
import {
  departmentNameSelector,
} from '../../shared/selectors/components/settings';
import {makeSelectListOptionsArraySelector} from '../../selectListOptions/selectors';
import CreateEditVolumeDriverForm from './CreateEditVolumeDriverForm';
import DeleteVolumeDriverModal from './DeleteVolumeDriverModal';
import {handleApiError} from '../../shared/services';
import {DEPARTMENTS} from '../../selectListOptions/constants/selectListTypes';
import {withRouter} from 'react-router';
import {Button} from 'react-bootstrap';

class VolumeDriversListEditSidebar extends Component {
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
    this.props.setEditVolumeDriverModelProperty(name, List(mapSelectedOptionsToValues(options)));
  }

  handleInputFieldChange(event) {
    const {name, value} = event.target;
    this.props.setEditVolumeDriverModelProperty(name, value);
  }

  handleSave(event) {
    event.preventDefault();

    const {updateVolumeDriver, model, loadVolumeDriverSelectListOptions, closeVolumeDriversListEditSidebar, router} = this.props;

    updateVolumeDriver(model)
      .then(() => {
        loadVolumeDriverSelectListOptions();
        closeVolumeDriversListEditSidebar();
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to update the Volume Driver.'));
  }

  handleCancel() {
    this.props.closeVolumeDriversListEditSidebar();
  }

  handleDelete() {
    const {model, showDeleteVolumeDriver} = this.props;
    showDeleteVolumeDriver(model);
  }

  render() {
    const {
      show,
      model,
      saving,
      departmentName,
      departments,
      validationErrors,
      dirty,
      canManageStandardList,
    } = this.props;

    if (!show) return null;

    return (
      <Sidebar className="volume-drivers-list-edit-sidebar">
        <EditSidebarSectionHeaderActions
          workingModel={model}
          editing saving={saving} dirty={dirty}
          onSave={this.handleSave} onCancel={this.handleCancel}
          hasPermission={canManageStandardList}
          editActions={
            canManageStandardList && <Button bsStyle="default" className="delete" bsSize="small" disabled={saving} onClick={this.handleDelete}>
              <i className="fa fa-trash-o" title="Delete" />
            </Button>
          } />
        <div className="sidebar-scrollable">
          <SidebarSection className="volume-driver" title="Edit Volume Driver" collapsible={false}>
            <CreateEditVolumeDriverForm
              model={model}
              validationErrors={validationErrors}
              saving={saving}
              onFieldChange={this.handleFieldChange}
              departmentName={departmentName}
              departments={departments}
              onSubmit={this.handleSave}
              disabled={!canManageStandardList} />
          </SidebarSection>
          <DeleteVolumeDriverModal />
        </div>
      </Sidebar>
    );
  }
}

function mapStateToProps(state) {
  const departmentsSelector = makeSelectListOptionsArraySelector(DEPARTMENTS);
  return {
    show: showSelector(state),
    model: modelSelector(state),
    saving: savingSelector(state),
    departments: departmentsSelector(state),
    departmentName: departmentNameSelector(state),
    validationErrors: validationErrorsSelector(state),
    dirty: dirtySelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    setEditVolumeDriverModelProperty,
    updateVolumeDriver,
    showDeleteVolumeDriver,
    closeVolumeDriversListEditSidebar,
    loadVolumeDriverSelectListOptions,
  }
)(VolumeDriversListEditSidebar));
