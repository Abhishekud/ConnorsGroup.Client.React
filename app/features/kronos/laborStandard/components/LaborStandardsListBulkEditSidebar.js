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
import {LaborStandardsListBulkEditForm} from './';
import {
  setLaborStandardsListBulkEditModelProperty,
  bulkUpdateLaborStandards,
  toggleLaborStandardsListBulkEditSidebar,
  loadKronosLaborPeriodsList,
  loadKronosLaborDriversList,
  loadKronosTasksList,
} from '../actions';
import {bulkEditSidebarShownSelector} from '../selectors/pages/list';
import {
  modelSelector,
  savingSelector,
  dirtySelector,
  laborPeriodOptionsSelector,
  laborDriverOptionsSelector,
  taskOptionsSelector,
  validationErrorsSelector,
} from '../selectors/sidebars/bulkEditLaborStandards';
import wfdSelector from '../../shared/selectors/wfdSelector';

class LaborStandardsListBulkEditSidebar extends Component {
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
    this.props.toggleLaborStandardsListBulkEditSidebar();
  }

  handleCheckboxChange(e) {
    const {id, checked} = e.target;
    this.props.setLaborStandardsListBulkEditModelProperty(id, checked);
  }

  handleFieldChange(e) {
    const {name, value} = e.target;
    this.props.setLaborStandardsListBulkEditModelProperty(name, value);
  }

  handleSwitchChange(e) {
    const name = e.target.props.id;
    const {value} = e.target;
    this.props.setLaborStandardsListBulkEditModelProperty(name, value);
  }

  handleEdit() {}

  handleSave(e) {
    e.preventDefault();
    const {bulkUpdateLaborStandards, selectedLaborStandardIds, reloadLaborStandards, toggleLaborStandardsListBulkEditSidebar, model, filter, allStandardsSelected, router} = this.props;

    bulkUpdateLaborStandards(selectedLaborStandardIds.keySeq().toArray(), model, filter, allStandardsSelected)
      .then(() => {
        reloadLaborStandards();
        toggleLaborStandardsListBulkEditSidebar();
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to update the selected labor standards.', 'Error'));
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
      isWfd,
      canEdit,
    } = this.props;

    if (!isOpen) return null;

    return (
      <Sidebar className="">
        <EditSidebarSectionHeaderActions
          workingModel={model}
          editing saving={saving} dirty={dirty}
          onEdit={this.handleEdit} onCancel={this.handleCancelEdit} onSave={this.handleSave} hasPermission={canEdit} />
        <div className="sidebar-scrollable">
          <SidebarSection
            className=""
            title="Assign Labor Period & Driver"
            collapsible>
            <LaborStandardsListBulkEditForm
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
        </div>
      </Sidebar>
    );
  }
}

LaborStandardsListBulkEditSidebar.propTypes = {
  reloadLaborStandards: PropTypes.func.isRequired,
  selectedLaborStandardIds: PropTypes.instanceOf(Map).isRequired,
  allStandardsSelected: PropTypes.bool.isRequired,
  filter: PropTypes.object,
  laborPeriods: PropTypes.instanceOf(List).isRequired,
  laborDrivers: PropTypes.instanceOf(List).isRequired,
  tasks: PropTypes.instanceOf(List).isRequired,
  model: PropTypes.instanceOf(Map).isRequired,
  dirty: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  isOpen: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    model: modelSelector(state),
    saving: savingSelector(state),
    dirty: dirtySelector(state),
    validationErrors: validationErrorsSelector(state),
    isOpen: bulkEditSidebarShownSelector(state),
    laborPeriods: laborPeriodOptionsSelector(state),
    laborDrivers: laborDriverOptionsSelector(state),
    tasks: taskOptionsSelector(state),
    isWfd: wfdSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    setLaborStandardsListBulkEditModelProperty,
    bulkUpdateLaborStandards,
    loadKronosLaborDriversList,
    loadKronosLaborPeriodsList,
    loadKronosTasksList,
    toggleLaborStandardsListBulkEditSidebar,
  }
)(LaborStandardsListBulkEditSidebar));
