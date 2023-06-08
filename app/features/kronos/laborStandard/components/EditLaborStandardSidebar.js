import React, {Component} from 'react';
import {withRouter} from 'react-router';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import {Map, List} from 'immutable';
import {
  Sidebar,
  SidebarSection,
  EditSidebarSectionHeaderActions,
} from '../../../layout/components';
import {handleApiError} from '../../../shared/services';
import {EditLaborStandardForm} from './';
import {
  setEditLaborStandardModelProperty,
  loadKronosLaborPeriodsList,
  loadKronosLaborDriversList,
  loadKronosTasksList,
  selectKronosLaborStandard,
  updateLaborStandard,
} from '../actions';
import {
  modelSelector,
  savingSelector,
  dirtySelector,
  laborPeriodOptionsSelector,
  laborDriverOptionsSelector,
  taskOptionsSelector,
  showSelector,
  validationErrorsSelector,
  exportMessageSelector,
  successSelector,
} from '../selectors/sidebars/editLaborStandard';
import {ExportMessages} from '../../shared/components';
import wfdSelector from '../../shared/selectors/wfdSelector';

class EditLaborStandardSidebar extends Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  componentDidMount() {
    const {router, loadKronosLaborDriversList, loadKronosLaborPeriodsList, loadKronosTasksList} = this.props;

    loadKronosLaborPeriodsList()
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the list of Kronos labor periods.', 'Error'));
    loadKronosLaborDriversList()
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the list of Kronos labor drivers.', 'Error'));
    loadKronosTasksList()
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the list of Kronos Tasks.', 'Error'));
  }

  handleCancelEdit() {
    this.props.clearSelection();
  }

  handleCheckboxChange(e) {
    const {id, checked} = e.target;
    this.props.setEditLaborStandardModelProperty(id, checked);
  }

  handleFieldChange(e) {
    const {name, value} = e.target;
    this.props.setEditLaborStandardModelProperty(name, value);
  }

  handleSwitchChange(e) {
    const name = e.target.props.id;
    const {value} = e.target;
    this.props.setEditLaborStandardModelProperty(name, value);
  }

  handleSave(e) {
    e.preventDefault();
    const {updateLaborStandard, reloadLaborStandards, model, router, clearSelection} = this.props;

    updateLaborStandard(model)
      .then(() => {
        clearSelection();
        reloadLaborStandards();
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to update the labor standard.', 'Error'));
  }

  handleSidebarOpened() {
    const {selectedLaborStandard} = this.props;
    selectKronosLaborStandard(selectedLaborStandard);
  }

  render() {
    const {
      model,
      saving,
      isOpen,
      dirty,
      validationErrors,
      laborPeriods,
      laborDrivers,
      tasks,
      successStatus,
      message,
      isWfd,
      canEdit,
    } = this.props;

    if (!isOpen) return null;

    return (
      <Sidebar className="">
        <EditSidebarSectionHeaderActions
          workingModel={model}
          editing saving={saving} dirty={dirty}
          onEdit={this.handleEdit}
          onCancel={this.handleCancelEdit}
          onSave={this.handleSave}
          hasPermission={canEdit} />
        <div className="sidebar-scrollable">
          <SidebarSection
            className=""
            title="Assign Labor Period & Driver"
            collapsible>
            <EditLaborStandardForm
              model={model}
              saving={saving}
              laborPeriods={laborPeriods}
              laborDrivers={laborDrivers}
              tasks={tasks}
              validationErrors={validationErrors}
              onCheckboxChange={this.handleCheckboxChange}
              onFieldChange={this.handleFieldChange}
              onSwitchChange={this.handleSwitchChange}
              onSubmit={this.handleSave}
              isWfd={isWfd}
              disabled={!canEdit} />
          </SidebarSection>
          <SidebarSection
            className=""
            title="Export Status"
            collapsible>
            <ExportMessages successStatus={successStatus} message={message} />
          </SidebarSection>
        </div>
      </Sidebar>
    );
  }
}

EditLaborStandardSidebar.propTypes = {
  reloadLaborStandards: PropTypes.func.isRequired,
  laborPeriods: PropTypes.instanceOf(List).isRequired,
  laborDrivers: PropTypes.instanceOf(List).isRequired,
  tasks: PropTypes.instanceOf(List).isRequired,
  model: PropTypes.instanceOf(Map).isRequired,
  dirty: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  isOpen: PropTypes.bool.isRequired,
  updateLaborStandard: PropTypes.func.isRequired,
  clearSelection: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    model: modelSelector(state),
    saving: savingSelector(state),
    dirty: dirtySelector(state),
    validationErrors: validationErrorsSelector(state),
    isOpen: showSelector(state),
    laborPeriods: laborPeriodOptionsSelector(state),
    laborDrivers: laborDriverOptionsSelector(state),
    tasks: taskOptionsSelector(state),
    successStatus: successSelector(state),
    message: exportMessageSelector(state),
    isWfd: wfdSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    setEditLaborStandardModelProperty,
    loadKronosLaborDriversList,
    loadKronosLaborPeriodsList,
    loadKronosTasksList,
    updateLaborStandard,
  }
)(EditLaborStandardSidebar));
