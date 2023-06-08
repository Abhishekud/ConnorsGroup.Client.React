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
  setEditLocationMappingModelProperty,
  updateLocationMapping,
  closeLocationsListEditSidebar,
  setBulkEditLocationModelProperty,
  bulkUpdateLocationDepartment,
  loadLocationMappingList,
  clearSelectedLocation,
} from '../actions';

import {
  showSelector,
  modelSelector,
  savingSelector,
  validationErrorsSelector,
  bulkModelSelector,
  dirtySelector,
  modelSelector as filterValuesSelector,
} from '../selectors/sidebars/editLocationMapping';
import {
  selectedDepartmentIdSelector,
  selectedLocationIdSelector,
  selectedLocationDepartmentSelector,
} from '../selectors/pages/locationMappingList';
import EditLocationDepartmentForm from './EditLocationDepartmentForm';
import {handleApiError} from '../../shared/services';
import {
  departmentNameSelector,
  locationNameSelector,
} from '../../shared/selectors/components/settings';
import {withRouter} from 'react-router';
import {makeVolumeDriverMappingSetSelectListOptionsForDepartmentArraySelector} from '../../volumeDriverMappings/selectors/selectListOptions';
import {makeCharacteristicSetSelectListOptionsForDepartmentArraySelector} from '../../characteristics/selectors/selectListOptions';
import {loadVolumeDriverMappingSetSelectListOptions} from '../../volumeDriverMappings/actions';

class LocationMappingListEditSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidUpdate() {
    const {
      model,
      selectedDepartmentLocations,
      closeLocationsListEditSidebar,
    } = this.props;
    if (selectedDepartmentLocations.size > 0 && model.size > 0) {
      closeLocationsListEditSidebar();
    }
  }

  handleFieldChange(event) {
    const {name, value} = event.target;
    this.props.setEditLocationMappingModelProperty(name, value);
  }

  handleBulkFieldChange(event) {
    const {name, value} = event.target;
    this.props.setBulkEditLocationModelProperty(name, value);
  }

  handleCheckboxChange(event) {
    const {id, checked} = event.target;
    this.props.setBulkEditLocationModelProperty(id, checked);
  }


  handleSave(event) {
    event.preventDefault();
    const {selectedLocationId, updateLocationMapping, closeLocationsListEditSidebar, model, locationName, departmentName, router, loadVolumeDriverMappingSetSelectListOptions} = this.props;

    updateLocationMapping(selectedLocationId, model)
      .then(() => {
        loadVolumeDriverMappingSetSelectListOptions();
        closeLocationsListEditSidebar();
      })
      .catch(error => handleApiError(error, router, `An error occurred while attempting to update the ${locationName} ${departmentName}.`));
  }

  handleBulkSave(event) {
    event.preventDefault();
    const {selectedDepartmentLocations} = this.props;
    const selectedLocationId = (Object.keys(selectedDepartmentLocations.toJS()));
    const {bulkUpdateLocationDepartment, loadLocationMappingList, clearSelectedLocation, bulkModel, locationName, router, id} = this.props;
    const ids = selectedLocationId.map(Number);
    const updateModel = bulkModel.set('selectedLocationId', ids);
    bulkUpdateLocationDepartment(updateModel, selectedLocationId)
      .then(() => {
        loadLocationMappingList(id);
        clearSelectedLocation();
      })

      .catch(error => handleApiError(error, router, `An error occurred while attempting to update the ${locationName}.`));
  }

  handleCancelBulkEdit() {
    this.props.closeLocationsListEditSidebar();
  }

  handleCancelEdit() {
    this.props.closeLocationsListEditSidebar();
  }

  render() {
    const {
      show,
      model,
      saving,
      validationErrors,
      locationName,
      characteristicCategories,
      volumeDriverMappingSets,
      canEdit,
    } = this.props;
    if (!show) return null;
    if (model.size > 0) {
      return (
        <Sidebar className="location-mapping-edit-sidebar">
          <EditSidebarSectionHeaderActions
            workingModel={model}
            editing saving={saving}
            onCancel={this.handleCancelEdit} onSave={this.handleSave} hasPermission={canEdit} />
          <div className="sidebar-scrollable">
            <SidebarSection className="location" title={`Edit ${locationName} Mapping`} collapsible={false} />
            <EditLocationDepartmentForm
              model={model}
              validationErrors={validationErrors}
              saving={saving}
              locationName={locationName}
              characteristicCategories={characteristicCategories}
              volumeDriverMappingSets={volumeDriverMappingSets}
              onActiveDateChange={this.handleActiveDateChange}
              onInactiveDateChange={this.handleInactiveDateChange}
              onFieldChange={this.handleFieldChange}
              onSubmit={this.handleSave} disabled={!canEdit} />
          </div>
        </Sidebar>
      );
    }
    return null;
  }
}

function makeMapStateToProps() {

  return state => {
    const characteristicCategoriesSelector = makeCharacteristicSetSelectListOptionsForDepartmentArraySelector(state);
    const volumeDriverMappingSetsSelector = makeVolumeDriverMappingSetSelectListOptionsForDepartmentArraySelector(state);
    const departmentId = selectedDepartmentIdSelector(state);

    return {
      id: selectedDepartmentIdSelector(state),
      show: showSelector(state),
      model: modelSelector(state),
      bulkModel: bulkModelSelector(state),
      saving: savingSelector(state),
      validationErrors: validationErrorsSelector(state),
      departmentName: departmentNameSelector(state),
      locationName: locationNameSelector(state),
      selectedLocationId: selectedLocationIdSelector(state),
      characteristicCategories: characteristicCategoriesSelector(departmentId),
      volumeDriverMappingSets: volumeDriverMappingSetsSelector(departmentId),
      dirty: dirtySelector(state),
      selectedDepartmentLocations: selectedLocationDepartmentSelector(state),
      filterValues: filterValuesSelector(state),
    };
  };
}

export default withRouter(connect(
  makeMapStateToProps,
  {
    setEditLocationMappingModelProperty,
    updateLocationMapping,
    closeLocationsListEditSidebar,
    clearSelectedLocation,
    setBulkEditLocationModelProperty,
    bulkUpdateLocationDepartment,
    loadLocationMappingList,
    loadVolumeDriverMappingSetSelectListOptions,
  }
)(LocationMappingListEditSidebar));

LocationMappingListEditSidebar.propTypes = {
  show: PropTypes.bool.isRequired,
  model: PropTypes.object.isRequired,
  bulkModel: PropTypes.object.isRequired,
  saving: PropTypes.bool.isRequired,
  validationErrors: PropTypes.object.isRequired,
  departmentName: PropTypes.string.isRequired,
  locationName: PropTypes.string.isRequired,
  selectedLocationId: PropTypes.number,
  characteristicCategories: PropTypes.array.isRequired,
  volumeDriverMappingSets: PropTypes.array.isRequired,
  setEditLocationMappingModelProperty: PropTypes.func.isRequired,
  updateLocationMapping: PropTypes.func.isRequired,
  closeLocationsListEditSidebar: PropTypes.func.isRequired,
  clearSelectedLocation: PropTypes.func.isRequired,
  setBulkEditLocationModelProperty: PropTypes.func.isRequired,
  bulkUpdateLocationDepartment: PropTypes.func.isRequired,
  loadLocationMappingList: PropTypes.func.isRequired,
  canEdit: PropTypes.bool,
};
