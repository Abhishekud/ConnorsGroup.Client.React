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
  closeLocationsDepartmentListBulkEditSidebar,
  setBulkEditLocationModelProperty,
  bulkUpdateLocationDepartment,
  loadLocationMappingList,
  clearSelectedLocation,
} from '../actions';

import {
  showBulkSelector,
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
import BulkEditLocationDepartmentForm from './BulkEditLocationDepartmentForm';

import {handleApiError} from '../../shared/services';
import {
  departmentNameSelector,
  locationNameSelector,
} from '../../shared/selectors/components/settings';
import {withRouter} from 'react-router';
import {makeVolumeDriverMappingSetSelectListOptionsForDepartmentArraySelector} from '../../volumeDriverMappings/selectors/selectListOptions';
import {makeCharacteristicSetSelectListOptionsForDepartmentArraySelector} from '../../characteristics/selectors/selectListOptions';
import {loadVolumeDriverMappingSetSelectListOptions} from '../../volumeDriverMappings/actions';

class BulkLocationMappingListEditSidebar extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidUpdate() {
    const {
      closeLocationsDepartmentListBulkEditSidebar,
      selectedDepartmentLocations,
    } = this.props;
    if (selectedDepartmentLocations.size < 1) {
      closeLocationsDepartmentListBulkEditSidebar();
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
    const {selectedLocationId, updateLocationMapping, closeLocationsDepartmentListBulkEditSidebar, model, locationName, departmentName, router} = this.props;

    updateLocationMapping(selectedLocationId, model)
      .then(() => closeLocationsDepartmentListBulkEditSidebar())
      .catch(error => handleApiError(error, router, `An error occurred while attempting to update the ${locationName} ${departmentName}.`));
  }

  handleBulkSave(event) {
    event.preventDefault();
    const {selectedDepartmentLocations} = this.props;
    const selectedLocationId = (Object.keys(selectedDepartmentLocations.toJS()));
    const {bulkUpdateLocationDepartment, loadLocationMappingList, closeLocationsDepartmentListBulkEditSidebar, bulkModel, locationName, router, id, loadVolumeDriverMappingSetSelectListOptions} = this.props;
    const ids = selectedLocationId.map(Number);
    const updateModel = bulkModel.set('selectedLocationId', ids);
    bulkUpdateLocationDepartment(updateModel, selectedLocationId)
      .then(() => {
        loadLocationMappingList(id);
        loadVolumeDriverMappingSetSelectListOptions();
        closeLocationsDepartmentListBulkEditSidebar();
      })

      .catch(error => handleApiError(error, router, `An error occurred while attempting to update the ${locationName}.`));
  }

  handleCancelBulkEdit() {
    this.props.closeLocationsDepartmentListBulkEditSidebar();
  }

  handleCancelEdit() {
    this.props.closeLocationsDepartmentListBulkEditSidebar();
  }

  render() {
    const {
      showBulk,
      Saving,
      validationErrors,
      locationName,
      characteristicCategories,
      volumeDriverMappingSets,
      bulkModel,
      dirty,
      canEdit,
    } = this.props;
    if (!showBulk) return null;
    return (
      <Sidebar className="location-mapping-edit-sidebar">
        <EditSidebarSectionHeaderActions
          workingModel={bulkModel}
          editing saving={Saving} dirty={dirty}
          onCancel={this.handleCancelBulkEdit} onSave={this.handleBulkSave} hasPermission={canEdit} />
        <div className="sidebar-scrollable">
          <SidebarSection className="location" title={`Edit ${locationName} Mapping`} collapsible={false} />
          <BulkEditLocationDepartmentForm
            bulkModel={bulkModel}
            validationErrors={validationErrors}
            saving={Saving}
            locationName={locationName}
            characteristicCategories={characteristicCategories}
            volumeDriverMappingSets={volumeDriverMappingSets}
            onCheckboxChange={this.handleCheckboxChange}
            onActiveDateChange={this.handleActiveDateChange}
            onInactiveDateChange={this.handleInactiveDateChange}
            onFieldChange={this.handleBulkFieldChange}
            onSubmit={this.handleSave} disabled={!canEdit} />
        </div>
      </Sidebar>
    );
  }
}

function makeMapStateToProps() {

  return state => {
    const characteristicCategoriesSelector = makeCharacteristicSetSelectListOptionsForDepartmentArraySelector(state);
    const volumeDriverMappingSetsSelector = makeVolumeDriverMappingSetSelectListOptionsForDepartmentArraySelector(state);
    const departmentId = selectedDepartmentIdSelector(state);

    return {
      id: selectedDepartmentIdSelector(state),
      showBulk: showBulkSelector(state),
      model: modelSelector(state),
      bulkModel: bulkModelSelector(state),
      Saving: savingSelector(state),
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
    closeLocationsDepartmentListBulkEditSidebar,
    clearSelectedLocation,
    setBulkEditLocationModelProperty,
    bulkUpdateLocationDepartment,
    loadLocationMappingList,
    loadVolumeDriverMappingSetSelectListOptions,
  }
)(BulkLocationMappingListEditSidebar));

BulkLocationMappingListEditSidebar.propTypes = {
  showBulk: PropTypes.bool.isRequired,
  model: PropTypes.object.isRequired,
  bulkModel: PropTypes.object.isRequired,
  Saving: PropTypes.bool.isRequired,
  validationErrors: PropTypes.object.isRequired,
  departmentName: PropTypes.string.isRequired,
  locationName: PropTypes.string.isRequired,
  selectedLocationId: PropTypes.number,
  characteristicCategories: PropTypes.array.isRequired,
  volumeDriverMappingSets: PropTypes.array.isRequired,
  setEditLocationMappingModelProperty: PropTypes.func.isRequired,
  updateLocationMapping: PropTypes.func.isRequired,
  closeLocationsDepartmentListBulkEditSidebar: PropTypes.func.isRequired,
  dirty: PropTypes.bool.isRequired,
  setBulkEditLocationModelProperty: PropTypes.func.isRequired,
  bulkUpdateLocationDepartment: PropTypes.func.isRequired,
  loadLocationMappingList: PropTypes.func.isRequired,
  canEdit: PropTypes.bool,
};
