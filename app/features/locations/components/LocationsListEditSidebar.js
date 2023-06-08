import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import {
  Sidebar,
  SidebarSection,
  EditSidebarSectionHeaderActions,
} from '../../layout/components';
import {
  setEditLocationModelProperty,
  setBulkEditLocationModelProperty,
  updateLocation,
  bulkUpdateLocation,
  showDeleteLocation,
  showBulkDeleteLocation,
  closeLocationsListEditSidebar,
} from '../actions';
import {
  showSelector,
  modelSelector,
  bulkModelSelector,
  savingSelector,
  validationErrorsSelector,
  dirtySelector,
} from '../selectors/sidebars/edit';
import {
  modelSelector as filterValuesSelector,
} from '../selectors/sidebars/filters';
import CreateEditLocationForm from './CreateEditLocationForm';
import DeleteLocationModal from './DeleteLocationModal';
import {handleApiError} from '../../shared/services';
import {
  configurationReflexisModuleSelector,
  locationNameSelector,
} from '../../shared/selectors/components/settings';
import {
  locationParentNameSelector,
} from '../../orgHierarchyLevels/selectors/pages/list';
import {withRouter} from 'react-router';
import {makeSelectListOptionsArrayWithBlankSelector} from '../../selectListOptions/selectors';
import {
  LOCATION_PROFILES,
  LOCATION_PARENTS,
} from '../../selectListOptions/constants/selectListTypes';
import {Button} from 'react-bootstrap';
import kronosEnabledSelector from '../../kronos/shared/selectors/kronosEnabledSelector';

class LocationsListEditSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidUpdate() {
    const {closeLocationsListEditSidebar, selectedLocationIds, model} = this.props;
    if (model.size > 0 && selectedLocationIds.length > 0) {
      closeLocationsListEditSidebar();
    }
  }

  handleCheckboxChange(event) {
    const {id, checked} = event.target;
    this.props.setBulkEditLocationModelProperty(id, checked);
  }

  handleBulkFieldChange(event) {
    const {name, value} = event.target;
    this.props.setBulkEditLocationModelProperty(name, value);
  }

  handleBulkActiveDateChange(date) {
    this.props.setBulkEditLocationModelProperty('activeDate', date);
  }

  handleBulkInactiveDateChange(date) {
    this.props.setBulkEditLocationModelProperty('inactiveDate', date);
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setEditLocationModelProperty(name, value);
  }

  handleActiveDateChange(date) {
    this.props.setEditLocationModelProperty('activeDate', date);
  }

  handleInactiveDateChange(date) {
    this.props.setEditLocationModelProperty('inactiveDate', date);
  }

  handleSave(event) {
    event.preventDefault();
    const {updateLocation, closeLocationsListEditSidebar, model, locationName, router, reloadLocationsList} = this.props;

    updateLocation(model)
      .then(() => {
        this.props.clearSelection();
        closeLocationsListEditSidebar();
        reloadLocationsList();
      })
      .catch(error => handleApiError(error, router, `An error occurred while attempting to update the ${locationName}.`));
  }

  handleCancelEdit() {
    this.props.clearSelection();
    this.props.closeLocationsListEditSidebar();
  }

  handleDelete() {
    const {model, showDeleteLocation} = this.props;
    showDeleteLocation(model);
  }

  handleNavigationToStatuses() {
    const {router, model} = this.props;
    router.push(`/reflexis/locations/${model.get('id')}/statuses`);
  }

  render() {
    const {
      show,
      model,
      saving,
      dirty,
      validationErrors,
      locationName,
      locationProfiles,
      locationParents,
      locationParentName,
      kronosEnabled,
      canEdit,
      reflexis,
    } = this.props;

    if (!show) return null;
    if (model.size > 0) {
      return (
        <Sidebar className="locations-list-edit-sidebar">
          <EditSidebarSectionHeaderActions
            workingModel={model}
            editing saving={saving} dirty={dirty}
            onCancel={this.handleCancelEdit} onSave={this.handleSave}
            hasPermission={canEdit}
            editActions={
              <>
                {canEdit && <Button bsStyle="default" className="delete" bsSize="small" disabled={saving} onClick={this.handleDelete}>
                  <i className="fa fa-trash-o" title="Delete" />
                </Button>}
                {reflexis && <Button bsStyle="link" bsSize="small" disabled={saving} onClick={this.handleNavigationToStatuses}>
                  Integration Status
                </Button>}
              </>} />
          <div className="sidebar-scrollable">
            <SidebarSection className="location" title={`Edit ${locationName}`} collapsible={false} />
            <CreateEditLocationForm
              model={model}
              validationErrors={validationErrors}
              saving={saving}
              locationName={locationName}
              locationProfiles={locationProfiles}
              locationParentName={locationParentName}
              locationParents={locationParents}
              onActiveDateChange={this.handleActiveDateChange}
              onInactiveDateChange={this.handleInactiveDateChange}
              onFieldChange={this.handleFieldChange}
              onSubmit={this.handleSave}
              kronosEnabled={kronosEnabled} disabled={!canEdit} />
            <DeleteLocationModal reloadLocationsList={this.props.reloadLocationsList} />
          </div>
        </Sidebar>
      );
    }

    return null;
  }
}

function makeMapStateToProps() {
  const locationProfilesSelector = makeSelectListOptionsArrayWithBlankSelector(LOCATION_PROFILES);
  const locationParentsSelector = makeSelectListOptionsArrayWithBlankSelector(LOCATION_PARENTS);

  return state => ({
    show: showSelector(state),
    model: modelSelector(state),
    bulkModel: bulkModelSelector(state),
    saving: savingSelector(state),
    validationErrors: validationErrorsSelector(state),
    locationName: locationNameSelector(state),
    locationProfiles: locationProfilesSelector(state),
    locationParentName: locationParentNameSelector(state),
    locationParents: locationParentsSelector(state),
    dirty: dirtySelector(state),
    filterValues: filterValuesSelector(state),
    kronosEnabled: kronosEnabledSelector(state),
    reflexis: configurationReflexisModuleSelector(state),
  });
}

export default withRouter(connect(
  makeMapStateToProps,
  {
    setEditLocationModelProperty,
    setBulkEditLocationModelProperty,
    updateLocation,
    bulkUpdateLocation,
    showDeleteLocation,
    showBulkDeleteLocation,
    closeLocationsListEditSidebar,
  }
)(LocationsListEditSidebar));

LocationsListEditSidebar.propTypes = {
  saving: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
  model: PropTypes.object.isRequired,
  dirty: PropTypes.bool.isRequired,

  closeLocationsListEditSidebar: PropTypes.func.isRequired,
  updateLocation: PropTypes.func.isRequired,
  setEditLocationModelProperty: PropTypes.func.isRequired,
  setBulkEditLocationModelProperty: PropTypes.func.isRequired,
  showDeleteLocation: PropTypes.func.isRequired,

  validationErrors: PropTypes.object.isRequired,
  locationName: PropTypes.string.isRequired,
  locationProfiles: PropTypes.array.isRequired,
  locationParentName: PropTypes.string,
  locationParents: PropTypes.array.isRequired,
  canEdit: PropTypes.bool,
};
