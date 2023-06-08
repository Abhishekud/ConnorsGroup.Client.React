import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import {
  Sidebar,
  SidebarSection,
  BulkEditSidebarSectionHeaderActions,
} from '../../layout/components';
import {
  setEditLocationModelProperty,
  setBulkEditLocationModelProperty,
  updateLocation,
  bulkUpdateLocation,
  showDeleteLocation,
  showBulkDeleteLocation,
  closeLocationsListBulkEditSidebar,
} from '../actions';
import {
  showSelector,
  showBulkSelector,
  modelSelector,
  bulkModelSelector,
  savingSelector,
  validationErrorsSelector,
  dirtySelector,
} from '../selectors/sidebars/edit';
import CreateBulkEditLocationForm from './CreateBulkEditLocationForm';
import BulkDeleteLocationModal from './BulkDeleteLocationModal';
import {handleApiError} from '../../shared/services';
import {
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

class LocationsListBulkEditSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidUpdate() {
    const {closeLocationsListBulkEditSidebar, selectedLocationIds, model} = this.props;
    if (model.size > 0 && selectedLocationIds.length <= 0) {
      closeLocationsListBulkEditSidebar();
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

  handleBulkSave(event) {
    event.preventDefault();
    const {bulkUpdateLocation, closeLocationsListBulkEditSidebar, bulkModel, locationName, router, selectedLocationIds, filter, reloadLocationsList, allLocationsSelected} = this.props;
    const updateModel = bulkModel.set('selectedLocationIds', selectedLocationIds.keySeq().toArray())
      .set('filters', filter)
      .set('allLocations', allLocationsSelected);
    bulkUpdateLocation(updateModel, selectedLocationIds.keySeq().toArray())
      .then(() => {
        closeLocationsListBulkEditSidebar();
        reloadLocationsList();
      })

      .catch(error => handleApiError(error, router, `An error occurred while attempting to update the ${locationName}.`));
  }

  handleCancelBulkEdit() {
    this.props.closeLocationsListBulkEditSidebar();
  }

  handleBulkDelete() {
    const {showBulkDeleteLocation, selectedLocationIds} = this.props;
    showBulkDeleteLocation(selectedLocationIds.keySeq().toArray());
  }

  render() {
    const {
      showBulk,
      bulkModel,
      saving,
      dirty,
      validationErrors,
      locationName,
      locationProfiles,
      locationParents,
      locationParentName,
      reloadLocationsList,
      filter,
      allLocationsSelected,
    } = this.props;

    if (!showBulk) return null;
    return (
      <Sidebar className="locations-list-edit-sidebar">
        <BulkEditSidebarSectionHeaderActions
          workingModel={bulkModel}
          editing saving={saving} dirty={dirty}
          onCancel={this.handleCancelBulkEdit} onSave={this.handleBulkSave}
          editActions={
            <Button bsStyle="default" className="delete" bsSize="small" disabled={saving} onClick={this.handleBulkDelete}>
              <i className="fa fa-trash-o" title="Delete" />
            </Button>
          } />
        <div className="sidebar-scrollable">
          <SidebarSection className="location" title={`Edit ${locationName}s`} collapsible={false} />
          <CreateBulkEditLocationForm
            model={bulkModel}
            validationErrors={validationErrors}
            saving={saving}
            locationName={locationName}
            locationProfiles={locationProfiles}
            locationParentName={locationParentName}
            locationParents={locationParents}
            onActiveDateChange={this.handleBulkActiveDateChange}
            onInactiveDateChange={this.handleBulkInactiveDateChange}
            onFieldChange={this.handleBulkFieldChange}
            onCheckboxChange={this.handleCheckboxChange}
            onSubmit={this.handleBulkSave} />
          <BulkDeleteLocationModal reloadLocationsList={reloadLocationsList} filter={filter} allLocationsSelected={allLocationsSelected} />
        </div>
      </Sidebar>
    );
  }
}

function makeMapStateToProps() {
  const locationProfilesSelector = makeSelectListOptionsArrayWithBlankSelector(LOCATION_PROFILES);
  const locationParentsSelector = makeSelectListOptionsArrayWithBlankSelector(LOCATION_PARENTS);

  return state => ({
    show: showSelector(state),
    showBulk: showBulkSelector(state),
    model: modelSelector(state),
    bulkModel: bulkModelSelector(state),
    saving: savingSelector(state),
    validationErrors: validationErrorsSelector(state),
    locationName: locationNameSelector(state),
    locationProfiles: locationProfilesSelector(state),
    locationParentName: locationParentNameSelector(state),
    locationParents: locationParentsSelector(state),
    dirty: dirtySelector(state),
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
    closeLocationsListBulkEditSidebar,
  }
)(LocationsListBulkEditSidebar));

LocationsListBulkEditSidebar.propTypes = {
  reloadLocationsList: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  showBulk: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,

  closeLocationsListBulkEditSidebar: PropTypes.func.isRequired,
  bulkUpdateLocation: PropTypes.func.isRequired,
  setBulkEditLocationModelProperty: PropTypes.func.isRequired,
  showBulkDeleteLocation: PropTypes.func.isRequired,

  validationErrors: PropTypes.object.isRequired,
  locationName: PropTypes.string.isRequired,
  locationProfiles: PropTypes.array.isRequired,
  locationParentName: PropTypes.string,
  locationParents: PropTypes.array.isRequired,
};
