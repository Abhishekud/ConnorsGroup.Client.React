import _ from 'lodash';
import React, {Component} from 'react';
import {Dropdown, MenuItem, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {withRouter} from 'react-router';
import {AutoSizer} from 'react-virtualized';
import {GridEditCell} from '@progress/kendo-react-grid';
import {handleApiError, toastr, toggleLockReorderColumns, toggleVisibilityReorderColumns, getReorderedGridColumnDetails, exportDownloader} from '../../shared/services';
import {
  MainContent,
  NavigationSidebar,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../layout/components';
import {
  CustomizableGrid,
  CheckboxHeaderCellWithStatus,
  GridConfigurationButton,
  GridConfigurationSidebar,
  BooleanFilterCell,
  ClearFiltersButton,
  ClearSortsButton,
  ResetLockedColumnsButton,
  ClearHiddenColumnsButton,
  PersistGridConfiguration,
  ClearGridConfigurationButton,
} from '../../customizableGrid/components';
import {exportFormatTypes, navigationGroups, timeFormats, exportResponseText} from '../../shared/constants';
import {DEBOUNCE_TIMEOUT} from '../../shared/constants/debounceTimeout';
import {PAGE_SIZE} from '../../shared/constants/virtualPaging';
import makeCurrentUserHasPermissionSelector from '../../authentication/selectors/currentUser/makeCurrentUserHasPermissionSelector';
import {PROFILING_LOCATIONS_EDIT, PROFILING_LOCATIONS_EXPORT, REFLEXIS_INTEGRATION_EDIT} from '../../authentication/constants/permissions';
import {ALLOWED_MAX_COLUMN_LOCKS} from '../../customizableGrid/constants/columnConfigurations';
import {
  loadLocationDepartmentsList,
  showCreateLocation,
  selectLocation,
  clearSelectedLocation,
  showCreateLocationProfile,
  toggleLocationProfilesSidebar,
  updateLocationsDepartment,
  showImportLocations,
  showImportLocationProfiles,
  REORDER_LOCATION_DEPARTMENTS_COLUMN,
  toggleLocationDepartmentsGridColumnVisibility,
  toggleLocationDepartmentsGridConfigurationSidebar,
  selectBulkLocation,
  toggleConfirmSelectAllLocationDepartments,
  toggleLocationDepartmentsGridColumnLock,
  resetLocationDepartmentsGridConfiguration,
  loadLocationProfilesList,
  showHiddenLocationDepartmentsColumns,
  showHiddenLocationsGridConfiguration,
  reorderLocationDepartmentColumns,
  loadLocationDepartmentsColumns,
  resetLockedLocationDepartments,
  filterLocationDepartmentsList,
  sortLocationDepartmentsList,
  clearAllLocationDepartmentsListFilters,
  clearLocationDepartmentsListSort,
  clearColumnOrderAndHiddenColumns,
  reorderLocationDepartmentsColumn,
  cancelColumnReorder,
} from '../actions';
import {
  savingSelector,
  columnsConfigurationSelector,
  showGridConfigurationSelector,
  orgHierarchiesSelector,
  showResetButtonSelector,
  showHiddenButtonSelector,
  showLockButtonSelector,
  hiddenColumnsSelector,
  persistConfigurationSelector,
  filterSelector,
  sortSelector,
  hideClearFiltersButtonSelector,
  hideClearSortsButtonSelector,
  lastReorderedColumnModelSelector,
  showColumnReorderConfirmModalSelector,
  reorderedColumnDetailSelector,
  cachedGridConfigurationSelector,
  hasFilterSortAppliedSelector,
  shouldClientResetGridConfigurationSelector,
  hideClearGridConfigurationButtonSelector,
  activeImportLocationsBackgroundJobSelector,
  backgroundJobStartedSelector,
} from '../selectors/pages/locationDepartmentsList';

import {
  showSelector as showLocationProfilesSidebarSelector,
} from '../selectors/sidebars/profiles';
import {
  locationNameSelector,
  departmentNameSelector,
  configurationReflexisModuleSelector,
} from '../../shared/selectors/components/settings';
import {createExportRequest, pollBackgroundJobs} from '../../shared/actions';
import {
  locationParentNameSelector,
} from '../../orgHierarchyLevels/selectors/pages/list';
import {loadOrgHierarchyLevelsList} from '../../orgHierarchyLevels/actions';
import {loadAllOrgHierarchyLevelOptionsList} from '../../orgHierarchyLevelOptions/actions';
import {
  showSelector as showFiltersSelector,
} from '../selectors/sidebars/filters';
import {
  showSelector as showEditSelector,
  showBulkSelector as showBulkEditSelector,
} from '../selectors/sidebars/edit';
import {BulkEditButton} from '../../shared/components/buttons';
import LocationsListEditSidebar from './LocationsListEditSidebar';
import LocationsListBulkEditSidebar from './LocationsListBulkEditSidebar';
import LocationProfilesSidebar from './LocationProfilesSidebar';
import CreateLocationModal from './CreateLocationModal';
import CreateLocationProfileModal from './CreateLocationProfileModal';
import ImportLocationsModal from './ImportLocationsModal';
import ImportLocationsValidationErrorsModal from './ImportLocationsValidationErrorsModal';
import ImportLocationProfilesModal from './ImportLocationProfilesModal';
import ImportLocationProfilesValidationErrorsModal from './ImportLocationProfilesValidationErrorsModal';
import ConfirmSelectAllLocationDepartmentsModal from './ConfirmSelectAllLocationDepartmentsModal';
import pluralize from 'pluralize';
import {fromJS, Map} from 'immutable';
import {SubmitIntegrationRequestModal, OpenIntegrationModalButton} from '../../reflexis/attribute/components';
import {processingSelector as isSubmittingIntegrationRequestSelector} from '../../reflexis/attribute/selectors/modals/createIntegrationRequest';
import {showCreateLocationIntegrationRequestModal, createReflexisExportRequest} from '../../reflexis/attribute/actions';

import {mergeLocationData} from '../services';
import {persistGridConfiguration, retrieveGridConfiguration, clearGridConfiguration} from '../../customizableGrid/actions';
import {LOCATIONS as LOCATIONS_GRID} from '../../customizableGrid/constants/grids';
import {ColumnReorderConfirmModal} from '../../shared/components';
import {LOCATION_IMPORTER, POLL_INTERVAL} from '../../shared/constants/backgroundJobs';
import {Tooltip} from '@progress/kendo-react-tooltip';
import {TOOLTIP_OPEN_DELAY} from '../../shared/constants/tooltipOpenDelay';

class LocationDepartmentsListPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: true,
      skip: 0,
      locationData: [],
      selectedIds: Map(),
      allLocationsSelected: false,
      selectedLocation: new Map(),
      total: 0,
      createdLocationId: null,
      departmentsList: [],
      createdLocationModel: null,
      reloadSidebarColumns: false,
    };

    autoBind(this);

    this.reloadLocationsListDebounce = _.debounce(() => {
      this.reloadLocationsList();
    }, DEBOUNCE_TIMEOUT);
  }

  componentDidMount() {
    const {router, loadOrgHierarchyLevelsList, loadAllOrgHierarchyLevelOptionsList, loadLocationProfilesList, filter, sort, clearColumnOrderAndHiddenColumns} = this.props;
    clearColumnOrderAndHiddenColumns();
    loadOrgHierarchyLevelsList()
      .then(() => {
        loadAllOrgHierarchyLevelOptionsList()
          .then(() => {
            loadLocationProfilesList();
            this.requestData(filter, sort, 0, true);
          })
          .catch(error => {
            this.setState({loading: false});
            handleApiError(error, router, 'An error occurred while attempting to load organization hierarchy level options.');
          });
      })
      .catch(error => {
        this.setState({loading: false});
        handleApiError(error, router, 'An error occurred while attempting to load organization hierarchies.');
      });

    this.checkBackgroundJobs();
    this.pollTimer = setInterval(this.checkBackgroundJobs, POLL_INTERVAL);
  }

  componentDidUpdate() {
    const {filter, sort, hasFilterSortApplied, shouldClientResetGridConfiguration, loadLocationDepartmentsColumns, clearGridConfiguration} = this.props;
    if (hasFilterSortApplied) {
      this.requestData(filter, sort, 0, true);
    }

    if (shouldClientResetGridConfiguration) {
      clearGridConfiguration(LOCATIONS_GRID).then(() => {
        const {columnsConfiguration, allLocationsSelected, locationName, departmentName} = this.props;
        const columns = columnsConfiguration(allLocationsSelected, this.renderSelectionCell);
        loadLocationDepartmentsColumns(columns);
        this.reloadLocationsList();
        toastr.warning(`Your ${pluralize(locationName).toLowerCase()} grid was reset due to a change in one or more ${departmentName.toLowerCase()}/organization hierarchy level.`);
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.pollTimer);
    this.pollTimer = null;
  }

  checkBackgroundJobs() {
    const {pollBackgroundJobs, filter, sort} = this.props;
    pollBackgroundJobs([LOCATION_IMPORTER])
      .then(() => {
        const {activeImportLocationsBackgroundJob, backgroundJobStarted} = this.props;

        if (!activeImportLocationsBackgroundJob && backgroundJobStarted) {
          this.requestData(filter, sort, 0, true);
        }
      });
  }

  filterVisibleColumns(columns) {
    return columns.filter(c => c.get('included'));
  }

  loadLocationDepartmentsListAndMerge(filter, sort, skip, reload) {

    const {loadLocationDepartmentsList, selectLocation, router, locationName, departmentName} = this.props;
    const {createdLocationModel} = this.state;

    loadLocationDepartmentsList(filter, sort, {skip})
      .then(result => {
        const locationDepartmentsList = result.value.data;

        const locationData = reload
          ? new Array(locationDepartmentsList.total).fill().map((e, i) => ({index: i}))
          : this.state.locationData;
        const mergedLocationData = mergeLocationData(locationDepartmentsList, locationData, skip);
        this.setState({
          locationData: mergedLocationData,
          departmentsList: locationDepartmentsList.departments,
          total: locationDepartmentsList.total,
        }, () => {
          if (createdLocationModel) {
            const selectedLocation = fromJS(createdLocationModel);
            this.setState({selectedLocation, createdLocationModel: null});
            selectLocation(selectedLocation);
          }
        });
        this.requestInProgress = false;
        this.setState({loading: false});
        //Again check for current skip value
        this.requestIfNeeded(this.state.skip);

        //Reload sidebar columns
        if (!this.state.reloadSidebarColumns) {
          const {columnsConfiguration, allLocationsSelected} = this.props;
          const columns = columnsConfiguration(allLocationsSelected, this.renderSelectionCell);
          this.props.loadLocationDepartmentsColumns(this.filterVisibleColumns(columns));
          this.setState({reloadSidebarColumns: true});
        }
      })
      .catch(error => {
        this.setState({loading: false});
        handleApiError(error, router, `An error occurred while attempting to load the ${locationName} ${pluralize(departmentName)} list.`, 'Error');
      });
  }


  handleSort({sort}) {
    this.props.sortLocationDepartmentsList(sort);
    this.reloadLocationsListDebounce();
  }

  handleFilter({filter}) {
    this.props.filterLocationDepartmentsList(filter);
    this.reloadLocationsListDebounce();
  }


  handleToggleSelect({dataItem}) {
    const {id} = dataItem;
    const {selectedLocation, selectedIds} = this.state;
    if (selectedLocation.size > 0) this.clearSelectedLocation();
    this.setState({selectedIds: selectedIds.has(id) ? selectedIds.deleteIn([id]) : selectedIds.setIn([id], true),
    });
  }

  handleTableRowClick({dataItem}) {
    const {selectedIds, selectedLocation, locationData} = this.state;
    const {selectLocation} = this.props;
    if (selectedIds.size <= 0) {
      if (dataItem.id === selectedLocation.get('id')) {
        this.clearSelectedLocation();
      } else {
        const newSelection = locationData.find(l => l.id === dataItem.id);
        selectLocation(Map(newSelection));
        this.setState({selectedLocation: Map(dataItem)});
      }
    }
  }

  clearSelectedLocation() {
    this.props.clearSelectedLocation();
    this.setState({selectedLocation: new Map()});
  }


  renderHeader(tdElement, headerProps) {
    if (headerProps.field.startsWith('department_')) {
      const {partialSelected, allSelected, noneSelected} = this.getCheckboxHeaderCellStatus(headerProps);
      return (
        <CheckboxHeaderCellWithStatus field={headerProps.field} title={headerProps.title}
          disabled={!this.props.canEdit} allSelected={allSelected} noneSelected={noneSelected} partialSelected={partialSelected} saving={false} onClick={this.handleConfirmSelectAllLocationDepartments} />
      );
    }
    return tdElement;
  }

  getCheckboxHeaderCellStatus(headerProps) {
    const {locationData, departmentsList, total} = this.state;

    // We need to fetch the totalSelected location under each department, we can do this by checking the selectedLocationsCount attribute against the department
    // It was observed that while navigating from other sections to locations,in order to keep this from breaking we are checking and defaulting the selectedLocationCount to 0
    const departmentId = headerProps.field.split('_').pop();
    const selectedLocationsCount = (departmentsList.find(dept => dept.id === Number(departmentId))?.selectedLocationsCount ?? 0);
    const partialSelected = (selectedLocationsCount < total) && (selectedLocationsCount !== 0);
    const firstLocationSelected = (locationData[0]?.[headerProps.field] === true);
    const allSelected = !partialSelected && firstLocationSelected;
    const noneSelected = !partialSelected && !firstLocationSelected;

    return {partialSelected, allSelected, noneSelected};
  }

  renderFilterCell(element, filterProps) {
    if (filterProps.field.startsWith('department_')) {
      return (<BooleanFilterCell {...filterProps} />);
    }
    return element;
  }

  handleSelectDepartment({dataItem, field}) {
    const {updateLocationsDepartment, canEdit, filter} = this.props;
    const {departmentsList} = this.state;
    if (!canEdit) return;

    const locationId = dataItem.id;
    const departmentId = parseInt(/department_(\d+)/.exec(field)[1], 10);
    const remove = dataItem[field];

    updateLocationsDepartment([{locationId, remove}], departmentId, false, remove)
      .then(result => {
        this.updateLocations(result.value.data);
        // Reload list if updated department has any filter applied.
        if (filter !== null && typeof filter.filters !== 'undefined' && filter.filters.length > 0) {
          const idx = filter.filters.findIndex(value => value.field === field);
          if (idx !== -1) {
            this.reloadLocationsList();
            return;
          }
        }
        if (remove) {
          departmentsList.find(d => d.id === result.value.data.departmentId).selectedLocationsCount--;
        } else {
          departmentsList.find(d => d.id === result.value.data.departmentId).selectedLocationsCount++;
        }
        this.setState({departmentsList});
      });
  }

  handleSelectAllDepartments(column) {
    this.setState({loading: true});
    const departmentId = parseInt(/department_(\d+)/.exec(column)[1], 10);
    const {updateLocationsDepartment, filter} = this.props;
    const {locationData, departmentsList, total} = this.state;
    const anyChecked = departmentsList.find(d => d.id === departmentId)?.selectedLocationsCount !== 0;//locationData.some(location => location[column] === true);

    const models = [];
    const actualLocations = locationData.filter(r => r.id);
    actualLocations.forEach(location => {
      const locationId = location.id;

      if (location[column] === anyChecked) {
        models.push({locationId, remove: anyChecked});
      }
    });

    updateLocationsDepartment(models, departmentId, true, anyChecked, filter).then(result => {
      // Reload list if updated department has any filter applied.
      if (filter !== null && typeof filter.filters !== 'undefined' && filter.filters.length > 0) {
        const idx = filter.filters.findIndex(value => value.field === column);
        if (idx !== -1) {
          this.reloadLocationsList();
          return;
        }
      }

      this.updateLocations(result.value.data);
      if (anyChecked) {
        departmentsList.find(d => d.id === result.value.data.departmentId).selectedLocationsCount = 0;
      } else {
        departmentsList.find(d => d.id === result.value.data.departmentId).selectedLocationsCount = total;
      }
      this.setState({departmentsList, loading: false});
    });
  }

  updateLocations(data) {
    const {locations, departmentId, profiles} = data;
    const {locationData} = this.state;

    for (const location of locations) {
      const {locationId, remove} = location;
      const loc = locationData.find(x => x.id === locationId);
      loc[`department_${departmentId}`] = !remove;
      locationData[loc.index] = loc;
    }
    for (const profile of profiles) {
      const {locationId, locationProfileId, locationProfileName} = profile;
      const loc = locationData.find(x => x.id === locationId);
      loc.locationProfileId = locationProfileId;
      loc.locationProfileName = locationProfileName;
      locationData[loc.index] = loc;
    }

    this.setState({locationData});
  }

  handleConfirmSelectAllLocationDepartments(column) {
    const {toggleConfirmSelectAllLocationDepartments} = this.props;
    const departmentId = parseInt(/department_(\d+)/.exec(column)[1], 10);
    const {locationData, departmentsList, total} = this.state;
    const updatedDept = departmentsList.find(d => d.id === departmentId);
    const toggleConfirmModel = new Map({
      columnId: column,
      columnName: updatedDept.name,
      appliedCheck: locationData.some(location => location[column] === true),
      partialSelected: (updatedDept.selectedLocationsCount < total) && (updatedDept.selectedLocationsCount !== 0),
    });
    toggleConfirmSelectAllLocationDepartments(toggleConfirmModel);
    return;
  }

  handleCreateLocationExportRequest() {
    const {router, locationName, filter} = this.props;
    const {selectedIds} = this.state;
    this.props.createExportRequest({
      fileName: 'Location',
      filters: JSON.stringify(filter || {}),
      timeFormat: null,
      selectedIds: selectedIds.keySeq(),
      exportFormat: exportFormatTypes.CSV,
    }).then(response => this.handleLocationExportRequest(response.value.data))
      .catch(error => {
        this.setState({loading: false});
        handleApiError(error, router, `An error occurred while attempting to create ${locationName} export request.`);
      });
  }

  handleLocationExportRequest(exportRequestId) {
    exportDownloader(`${process.env.API_BASE_URL}locations/export/${exportRequestId}`);
  }

  handleExportImportProfilesTemplate() {
    exportDownloader(`${process.env.API_BASE_URL}location-profiles/import/template`);
  }

  handleReflexisExportRequest(format) {
    const ids = this.state.allLocationsSelected ? [] : this.state.selectedIds.keySeq();
    const filters = JSON.stringify(this.state.allLocationsSelected ? this.props.filter : null);
    this.props.createExportRequest({
      fileName: 'export-request.OM6',
      filters,
      timeFormat: timeFormats.MINUTES,
      selectedIds: ids,
      exportFormat: format,
    })
      .then(response => this.props.createReflexisExportRequest(response.value.data))
      .then(() => {
        toastr.success(exportResponseText.SUCCESS, exportResponseText.SUCCESS_TITLE);
      })
      .catch(error => {
        console.error(error);
        toastr.error(exportResponseText.FAILURE);
      });
  }

  handleCreateCSVExportRequest() {
    this.handleReflexisExportRequest(exportFormatTypes.CSV);
  }

  handleCreateJsonExportRequest() {
    this.handleReflexisExportRequest(exportFormatTypes.JSON);
  }

  handleSelectAll() {
    const {allLocationsSelected, locationData} = this.state;
    const newAllLocationsSelected = !allLocationsSelected;
    const ids = newAllLocationsSelected ? new Map(locationData.filter(r => r.id).map(key => [key.id, true])) : Map();
    this.setState({
      selectedIds: ids,
      allLocationsSelected: newAllLocationsSelected,
    });
  }

  handleBulkEdit({dataItem}) {
    const {selectBulkLocation} = this.props;
    const {selectedIds, locationData} = this.state;
    const actualLocations = locationData.filter(r => r.id);
    if (dataItem) {
      clearSelectedLocation();
    }
    const id = selectedIds.keySeq().toArray()[0];
    selectBulkLocation(id, fromJS(actualLocations.find(x => x.id === id)));
  }

  async handleClearFilters() {
    const {clearAllLocationDepartmentsListFilters, sort} = this.props;
    clearAllLocationDepartmentsListFilters();
    this.requestData(null, sort, 0, true);
  }

  async handleClearSorts() {
    const {clearLocationDepartmentsListSort, filter} = this.props;
    clearLocationDepartmentsListSort();
    this.requestData(filter, null, 0, true);
  }

  handleTriggerIntegrationClick() {
    const {showCreateLocationIntegrationRequestModal, filter} = this.props;
    const {selectedIds, allLocationsSelected} = this.state;
    showCreateLocationIntegrationRequestModal(selectedIds.keySeq(), allLocationsSelected, filter);
  }

  requestData(filter, sort, skip, reload = false) {
    if (this.requestInProgress) return;
    if (reload) this.setState({loading: true});
    this.requestInProgress = true;
    this.loadLocationDepartmentsListAndMerge(filter, sort, skip, reload);
  }

  requestIfNeeded(skip) {
    const {filter, sort} = this.props;
    for (let i = skip; i < skip + PAGE_SIZE - 1 && i < this.state.locationData.length; i++) {
      if (typeof this.state.locationData[i].id === 'undefined') {
        this.requestData(filter, sort, i);
        return;
      }
    }
  }

  handlePageChange(event) {
    if (event.page.skip === this.state.skip) return;
    // somehow kendo will pass NaN after sorting changes.  :/
    const skip = isNaN(event.page.skip) ? 0 : event.page.skip;
    this.setState({skip});
    this.requestIfNeeded(skip);
  }

  reloadLocationsList() {
    const {filter, sort} = this.props;
    this.setState({
      skip: 0,
      locationData: [],
      selectedIds: Map(),
      allLocationsSelected: false,
      total: 0,
      selectedLocation: new Map(),
    }, () => {
      this.requestData(filter, sort, 0, true);
    });
  }

  formatLocationDepartmentsForPresentation() {
    const {locationData, selectedIds, skip, selectedLocation, allLocationsSelected} = this.state;
    return locationData.slice(skip, skip + PAGE_SIZE).map(l => {
      l.selected = selectedIds.has(l.id) || allLocationsSelected || selectedLocation.size > 0 && l.id === selectedLocation.get('id');
      return l;
    });
  }

  renderSelectionCell(props) {
    const {allLocationsSelected} = this.state;
    const handleChange = allLocationsSelected ? null : this.handleToggleSelect;
    const selected = allLocationsSelected ? true : props.dataItem.selected;
    const dataItem = {...props.dataItem, selected};
    return <GridEditCell {...props} dataItem={dataItem} editor="boolean" onChange={handleChange} />;
  }

  setToggleLocationDepartmentsGridColumnVisibility(field, visibility) {
    const {toggleLocationDepartmentsGridColumnVisibility, columnsConfiguration, allLocationsSelected, hiddenColumns} = this.props;
    const columns = columnsConfiguration(allLocationsSelected, this.renderSelectionCell);
    const {selectedColumn, columnsList} = toggleVisibilityReorderColumns(field, visibility, this.filterVisibleColumns(columns), hiddenColumns);
    toggleLocationDepartmentsGridColumnVisibility(field, visibility, columnsList, selectedColumn);
    this.reloadLocationsListDebounce();
  }

  setResetLocationDepartmentsGridColumns() {
    const {loadLocationDepartmentsColumns, resetLocationDepartmentsGridConfiguration, clearColumnOrderAndHiddenColumns} = this.props;
    clearColumnOrderAndHiddenColumns();
    resetLocationDepartmentsGridConfiguration().then(() => {
      const {columnsConfiguration, allLocationsSelected} = this.props;
      const columns = columnsConfiguration(allLocationsSelected, this.renderSelectionCell);
      loadLocationDepartmentsColumns(columns);
    }
    );
  }

  handleResetLockedGridColumns() {
    const {loadLocationDepartmentsColumns, resetLockedLocationDepartments} = this.props;
    resetLockedLocationDepartments().then(() => {
      const {columnsConfiguration, allLocationsSelected} = this.props;
      const columns = columnsConfiguration(allLocationsSelected, this.renderSelectionCell);
      loadLocationDepartmentsColumns(columns);
    });
  }

  setToggleColumnLock(field, lock) {
    const {toggleLocationDepartmentsGridColumnLock, columnsConfiguration, allLocationsSelected} = this.props;
    const columns = columnsConfiguration(allLocationsSelected, this.renderSelectionCell);
    const lockColumnsList = toggleLockReorderColumns(field, lock, this.filterVisibleColumns(columns));
    toggleLocationDepartmentsGridColumnLock(field, lock, lockColumnsList);
  }

  handleShowHiddenLocationsColumns() {
    const {loadLocationDepartmentsColumns, showHiddenLocationDepartmentsColumns} = this.props;
    showHiddenLocationDepartmentsColumns().then(() => {
      const {columnsConfiguration, allLocationsSelected} = this.props;
      const columns = columnsConfiguration(allLocationsSelected, this.renderSelectionCell);
      loadLocationDepartmentsColumns(columns);
    });
  }

  handleCreateLocation(locationModel) {
    this.setState({createdLocationModel: locationModel});
    this.reloadLocationsList();
  }

  handleReorderColumns(event) {
    const {allLocationsSelected} = this.state;
    const {columnsConfiguration, reorderLocationDepartmentsColumn} = this.props;
    const columns = columnsConfiguration(allLocationsSelected, this.renderSelectionCell);
    const reorderedColumnDetail = getReorderedGridColumnDetails(event, columns);
    if (!reorderedColumnDetail) return;
    const {columnKey, oldIndex, newIndex} = reorderedColumnDetail;
    reorderLocationDepartmentsColumn(columnKey, oldIndex, newIndex);
  }

  handleColumnReorderConfirm() {
    const {reorderLocationDepartmentsColumn, lastReorderedColumnModel} = this.props;
    reorderLocationDepartmentsColumn(lastReorderedColumnModel.columnKey, lastReorderedColumnModel.oldIndex, lastReorderedColumnModel.newIndex);
  }

  handleClearGridConfiguration() {
    const {clearGridConfiguration, loadLocationDepartmentsColumns} = this.props;
    clearGridConfiguration(LOCATIONS_GRID).then(() => {
      const {columnsConfiguration, allLocationsSelected} = this.props;
      const columns = columnsConfiguration(allLocationsSelected, this.renderSelectionCell);
      loadLocationDepartmentsColumns(columns);
      this.reloadLocationsList();
    }
    );
  }

  render() {
    const {
      saving,
      handleShowCreateLocation,
      handleShowCreateLocationProfile,
      handleToggleLocationProfilesSidebar,
      showLocationProfilesSidebar,
      locationName,
      handleShowImportLocations,
      handleShowImportLocationProfiles,
      columnsConfiguration,
      showGridConfiguration,
      showBulkEditSidebar,
      canEdit,
      canExport,
      canReflexisIntegrate,
      reflexis,
      showResetButton,
      showHiddenButton,
      showLockButton,
      persistConfiguration,
      persistGridConfiguration,
      retrieveGridConfiguration,
      filter,
      sort,
      hideClearFiltersButton,
      hideClearSortsButton,
      cancelColumnReorder,
      reorderedColumnDetail,
      showColumnReorderConfirmModal,
      toggleGridConfigurationSidebar,
      hideClearGridConfigurationButton,
      activeImportLocationsBackgroundJob,
    } = this.props;

    const {
      loading,
      selectedIds,
      allLocationsSelected,
      total,
      skip,
    } = this.state;

    const locationsAreSelected = selectedIds.size > 0 || allLocationsSelected;
    let backgroundJobSpinner = null;
    if (activeImportLocationsBackgroundJob) {
      backgroundJobSpinner = <Tooltip openDelay={TOOLTIP_OPEN_DELAY} position="bottom" anchorElement="target"><i className="fa fa-spinner fa-spin" title={`${pluralize(locationName)} import in progress`} /></Tooltip>;
    }
    const columns = columnsConfiguration(allLocationsSelected, this.renderSelectionCell);
    return (
      <Page pageClassName="locations-departments-list-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>{pluralize(locationName)}</PageTitle>
          <PageHeaderActions align="right">
            {backgroundJobSpinner}
            <ClearGridConfigurationButton hide={hideClearGridConfigurationButton} onClear={this.handleClearGridConfiguration} />
            <ClearFiltersButton hide={hideClearFiltersButton} onClear={this.handleClearFilters} />
            <ClearSortsButton hide={hideClearSortsButton} onClear={this.handleClearSorts} />
            <ResetLockedColumnsButton hide={showLockButton} onClear={this.handleResetLockedGridColumns} />
            <ClearHiddenColumnsButton hide={showHiddenButton} onClear={this.handleShowHiddenLocationsColumns} />
            {canEdit && <BulkEditButton isVisible={locationsAreSelected} isOpen={showBulkEditSidebar} onClick={this.handleBulkEdit} />}
            {canExport && <Dropdown id="export" className="btn-default header-button" pullRight disabled={saving}>
              <Dropdown.Toggle noCaret><i className="fa fa-file-excel-o" /></Dropdown.Toggle>
              <Dropdown.Menu>
                <MenuItem eventKey="1" onClick={this.handleCreateLocationExportRequest}>
                  Export {pluralize(locationName)}
                </MenuItem>
                <MenuItem eventKey="2" onClick={this.handleExportImportProfilesTemplate}>
                  Export {locationName} Profiles
                </MenuItem>
                {reflexis &&
                  <MenuItem eventKey="3" onClick={this.handleCreateCSVExportRequest}>
                    Export OM06 file
                  </MenuItem>}
                {reflexis &&
                  <MenuItem eventKey="4" onClick={this.handleCreateJsonExportRequest}>
                    Export JSON file
                  </MenuItem>}
              </Dropdown.Menu>
            </Dropdown>}
            {canEdit && <Dropdown id="add" className="btn-default header-button" pullRight disabled={saving}>
              <Dropdown.Toggle noCaret><i className="fa fa-plus" /></Dropdown.Toggle>
              <Dropdown.Menu>
                <MenuItem eventKey="1" onClick={handleShowCreateLocation}>
                  New {locationName}
                </MenuItem>
                <MenuItem eventKey="2" onClick={handleShowCreateLocationProfile}>
                  New {locationName} Profile
                </MenuItem>
                <MenuItem eventKey="3" onClick={activeImportLocationsBackgroundJob ? null : handleShowImportLocations} disabled={activeImportLocationsBackgroundJob}>
                  Import {pluralize.plural(locationName)}
                </MenuItem>
                <MenuItem eventKey="4" onClick={activeImportLocationsBackgroundJob ? null : handleShowImportLocationProfiles} disabled={activeImportLocationsBackgroundJob}>
                  Import {locationName} Profiles
                </MenuItem>
              </Dropdown.Menu>
            </Dropdown>}
            <div className="flyout-button">
              <Button className={showLocationProfilesSidebar ? 'btn-wheat' : 'btn-default'}
                onClick={handleToggleLocationProfilesSidebar} disabled={saving}>
                <i className="fa fa-list-ul" />
              </Button>
            </div>
            <GridConfigurationButton openSidebar={toggleGridConfigurationSidebar} closeSidebar={toggleGridConfigurationSidebar} showGridConfiguration={showGridConfiguration} />
            {reflexis && canReflexisIntegrate &&
              <OpenIntegrationModalButton isSubmitting={loading} onClick={this.handleTriggerIntegrationClick} />
            }
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.PROFILING} />
          <MainContent loading={loading}><div>{this.setToggleColumnLock && !columns.first().get('lockable') && <div className="column-lock-warning"><span className="text-danger">Note: Maximum {ALLOWED_MAX_COLUMN_LOCKS} columns can be locked</span></div>}</div>
            <AutoSizer>
              {({width, height}) => (
                <CustomizableGrid style={{width, height}}
                  noFromJs
                  data={this.formatLocationDepartmentsForPresentation()}
                  headerCellRender={this.renderHeader} filterCellRender={this.renderFilterCell}
                  onItemChange={this.handleSelectDepartment}
                  skip={skip}
                  total={total}
                  pageSize={PAGE_SIZE}
                  onFilter={this.handleFilter} filter={filter}
                  onSort={this.handleSort} sort={sort}
                  scrollable={'virtual'} onPageChange={this.handlePageChange} rowHeight={40}
                  selectedField="selected" onSelectedChange={this.handleToggleSelect}
                  onHeaderSelectedChange={this.handleSelectAll} onRowClick={this.handleTableRowClick}
                  columns={this.filterVisibleColumns(columns)}
                  toggleColumnLock={this.setToggleColumnLock} toggleColumnVisibility={this.setToggleLocationDepartmentsGridColumnVisibility}
                  reorderable showColumnContextMenu onColumnReorder={this.handleReorderColumns} />
              )}
            </AutoSizer>
          </MainContent>
          <LocationsListEditSidebar reloadLocationsList={this.reloadLocationsList} canEdit={canEdit} clearSelection={this.clearSelectedLocation} selectedLocationIds={selectedIds} />
          <LocationsListBulkEditSidebar reloadLocationsList={this.reloadLocationsList} selectedLocationIds={selectedIds} allLocationsSelected={allLocationsSelected} filter={filter} />
          <LocationProfilesSidebar reloadLocationsList={this.reloadLocationsList} />
          <GridConfigurationSidebar dropActionId={REORDER_LOCATION_DEPARTMENTS_COLUMN} columns={columns} show={showGridConfiguration}
            toggleColumnVisibility={this.setToggleLocationDepartmentsGridColumnVisibility} toggleColumnLock={this.setToggleColumnLock}
            handleResetGridConfiguration={this.setResetLocationDepartmentsGridColumns} showResetGridConfiguration={showResetButton} />
          <PersistGridConfiguration gridId={LOCATIONS_GRID} configuration={persistConfiguration} persist={persistGridConfiguration} retrieve={retrieveGridConfiguration} />
        </PageBody>
        <CreateLocationModal onCreateLocation={this.handleCreateLocation} />
        <CreateLocationProfileModal reloadLocationsList={this.reloadLocationsList} />
        <ImportLocationsModal />
        <ImportLocationsValidationErrorsModal />
        <ImportLocationProfilesModal reloadLocationsList={this.reloadLocationsList} />
        <ImportLocationProfilesValidationErrorsModal />
        <ConfirmSelectAllLocationDepartmentsModal onConfirm={this.handleSelectAllDepartments} />
        <ColumnReorderConfirmModal show={showColumnReorderConfirmModal}
          column={reorderedColumnDetail} onConfirm={this.handleColumnReorderConfirm}
          onCancel={cancelColumnReorder} processing={false} />
        <SubmitIntegrationRequestModal />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const canEditSelector = makeCurrentUserHasPermissionSelector(PROFILING_LOCATIONS_EDIT);
  const canExportSelector = makeCurrentUserHasPermissionSelector(PROFILING_LOCATIONS_EXPORT);
  const canReflexisIntegrateSelector = makeCurrentUserHasPermissionSelector(REFLEXIS_INTEGRATION_EDIT);

  return {
    saving: savingSelector(state),
    showLocationProfilesSidebar: showLocationProfilesSidebarSelector(state),
    locationName: locationNameSelector(state),
    locationParentName: locationParentNameSelector(state),
    departmentName: departmentNameSelector(state),
    showFilter: showFiltersSelector(state),
    columnsConfiguration: columnsConfigurationSelector(state),
    showGridConfiguration: showGridConfigurationSelector(state),
    showEditSidebar: showEditSelector(state),
    showBulkEditSidebar: showBulkEditSelector(state),
    canEdit: canEditSelector(state),
    canExport: canExportSelector(state),
    canReflexisIntegrate: canReflexisIntegrateSelector(state),
    reflexis: configurationReflexisModuleSelector(state),
    isSubmittingIntegrationRequest: isSubmittingIntegrationRequestSelector(state),
    orgHierarchies: orgHierarchiesSelector(state),
    showResetButton: showResetButtonSelector(state),
    hiddenColumns: hiddenColumnsSelector(state),
    showHiddenButton: showHiddenButtonSelector(state),
    showLockButton: showLockButtonSelector(state),
    persistConfiguration: persistConfigurationSelector(state),
    filter: filterSelector(state),
    sort: sortSelector(state),
    hideClearFiltersButton: hideClearFiltersButtonSelector(state),
    hideClearSortsButton: hideClearSortsButtonSelector(state),
    showColumnReorderConfirmModal: showColumnReorderConfirmModalSelector(state),
    reorderedColumnDetail: reorderedColumnDetailSelector(state),
    lastReorderedColumnModel: lastReorderedColumnModelSelector(state),
    cachedGridConfig: cachedGridConfigurationSelector(state),
    hasFilterSortApplied: hasFilterSortAppliedSelector(state),
    shouldClientResetGridConfiguration: shouldClientResetGridConfigurationSelector(state),
    hideClearGridConfigurationButton: hideClearGridConfigurationButtonSelector(state),
    activeImportLocationsBackgroundJob: activeImportLocationsBackgroundJobSelector(state),
    backgroundJobStarted: backgroundJobStartedSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadLocationDepartmentsList,
    handleShowCreateLocation: showCreateLocation,
    handleShowCreateLocationProfile: showCreateLocationProfile,
    handleToggleLocationProfilesSidebar: toggleLocationProfilesSidebar,
    selectLocation,
    clearSelectedLocation,
    updateLocationsDepartment,
    handleShowImportLocations: showImportLocations,
    handleShowImportLocationProfiles: showImportLocationProfiles,
    loadOrgHierarchyLevelsList,
    loadAllOrgHierarchyLevelOptionsList,
    toggleLocationDepartmentsGridColumnVisibility,
    toggleGridConfigurationSidebar: toggleLocationDepartmentsGridConfigurationSidebar,
    selectBulkLocation,
    toggleConfirmSelectAllLocationDepartments,
    createExportRequest,
    showCreateLocationIntegrationRequestModal,
    toggleLocationDepartmentsGridColumnLock,
    resetLocationDepartmentsGridConfiguration,
    resetLockedLocationDepartments,
    loadLocationProfilesList,
    reorderLocationDepartmentColumns,
    showHiddenLocationDepartmentsColumns,
    showHiddenLocationsGridConfiguration,
    loadLocationDepartmentsColumns,
    createReflexisExportRequest,
    persistGridConfiguration,
    retrieveGridConfiguration,
    filterLocationDepartmentsList,
    sortLocationDepartmentsList,
    clearAllLocationDepartmentsListFilters,
    clearLocationDepartmentsListSort,
    clearColumnOrderAndHiddenColumns,
    getReorderedGridColumnDetails,
    cancelColumnReorder,
    reorderLocationDepartmentsColumn,
    clearGridConfiguration,
    pollBackgroundJobs,
  }
)(LocationDepartmentsListPage));
