import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {withRouter} from 'react-router';
import {AutoSizer} from 'react-virtualized';
import {PropTypes} from 'prop-types';
import {Select} from '../../forms/components';
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
  CheckboxHeaderCell,
  GridConfigurationButton,
  GridConfigurationSidebar,
  ClearFiltersButton,
  ClearSortsButton,
  ResetLockedColumnsButton,
  ClearHiddenColumnsButton,
  PersistGridConfiguration,
} from '../../customizableGrid/components';
import {ALLOWED_MAX_COLUMN_LOCKS} from '../../customizableGrid/constants/columnConfigurations';
import {navigationGroups} from '../../shared/constants';
import makeCurrentUserHasPermissionSelector from '../../authentication/selectors/currentUser/makeCurrentUserHasPermissionSelector';
import {PROFILING_LOCATION_MAPPING_EDIT, PROFILING_LOCATION_MAPPING_EXPORT} from '../../authentication/constants/permissions';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {
  clearSelectedLocation,
  loadLocationMappingList,
  loadLocationMappingPage,
  selectLocation,
  showImportLocationMapping,
  sortLocationMappingList,
  toggleDepartmentForLocation,
  REORDER_LOCATION_MAPPING_COLUMN,
  toggleLocationMappingColumnVisibility,
  toggleLocationMappingGridConfigurationSidebar,
  filterLocationMappingList,
  pageLocationMappingList,
  toggleSelectLocationMapping,
  selectAllLocationMapping,
  selectBulkEditLocationMapping,
  clearLocationMappingFilters,
  clearLocationMappingSorts,
  toggleLocationMappingColumnLock,
  resetLocationMappingColumns,
  reorderLocationMappingColumn,
  showHiddenLocationMappingColumns,
  loadLocationMappingColumns,
  resetLockedLocationMappingColumns,
  cancelColumnReorder,
} from '../actions';
import {
  loadingSelector,
  savingSelector,
  dataSelector,
  sortSelector,
  selectedLocationIdSelector,
  selectedDepartmentIdSelector,
  columnsSelector,
  columnsConfigurationSelector,
  showGridConfigurationSelector,
  filterSelector,
  tableDataSelector,
  pagingSelector,
  totalLocationMappingsSelector,
  selectedLocationDepartmentSelector,
  sortedLocationsArraySelector,
  hideClearFiltersButtonSelector,
  showResetButtonSelector,
  showHiddenButtonSelector,
  showLockButtonSelector,
  hiddenColumnsSelector,
  lastReorderedColumnModelSelector,
  reorderedColumnDetailSelector,
  showColumnReorderConfirmModalSelector,
  cachedGridConfigurationSelector,
  persistConfigurationSelector,
  isLocationMappingLoadedSelector,
} from '../selectors/pages/locationMappingList';
import {
  locationNameSelector,
  departmentNameSelector,
} from '../../shared/selectors/components/settings';
import {loadOrgHierarchyLevelsList} from '../../orgHierarchyLevels/actions';
import {loadAllOrgHierarchyLevelOptionsList} from '../../orgHierarchyLevelOptions/actions';
import {makeSelectListOptionsArraySelector} from '../../selectListOptions/selectors';
import {DEPARTMENTS} from '../../selectListOptions/constants/selectListTypes';
import LocationMappingListEditSidebar from './LocationMappingListEditSidebar';
import BulkLocationMappingListEditSidebar from './BulkLocationMappingListEditSidebar';
import ImportLocationMappingModal from './ImportLocationMappingModal';
import ImportLocationMappingValidationErrorsModal from './ImportLocationMappingValidationErrorsModal';
import pluralize from 'pluralize';
import {getReorderedGridColumnDetails, handleApiError, toggleLockReorderColumns, toggleVisibilityReorderColumns} from '../../shared/services';
import {BulkEditButton} from '../../shared/components/buttons';
import {
  showSelector as showEditSelector,
  showBulkSelector as showBulkEditSelector,
} from '../selectors/sidebars/editLocationMapping';
import hideClearSortsButtonSelector from '../selectors/pages/locationMappingList/hideClearSortsButtonSelector';
import {ColumnReorderConfirmModal} from '../../shared/components';
import {persistGridConfiguration, retrieveGridConfiguration, updateCachedGridConfiguration} from '../../customizableGrid/actions';
import {
  LOCATION_MAPPING as LOCATION_MAPPING_GRID,
} from '../../customizableGrid/constants/grids';
import {loadVolumeDriverMappingSetSelectListOptions} from '../../volumeDriverMappings/actions';

class LocationMappingListPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {
      departmentName, loadLocationMappingPage, loadSelectListOptions, loadLocationMappingList, router, locationName,
      loadOrgHierarchyLevelsList,
      loadAllOrgHierarchyLevelOptionsList, loadVolumeDriverMappingSetSelectListOptions,
    } = this.props;

    loadLocationMappingPage();
    loadVolumeDriverMappingSetSelectListOptions();
    loadSelectListOptions(DEPARTMENTS)
      .then(() => {
        const {departmentsSelectList} = this.props;
        const departmentId = departmentsSelectList.length ? departmentsSelectList[0].value : 0;

        loadLocationMappingList(departmentId)
          .catch(error => handleApiError(error, router, `An error occurred while attempting to load the ${locationName} Mapping list.`, 'Error'));
      })
      .catch(error => handleApiError(error, router, `An error occurred while attempting to load the available ${pluralize(departmentName)}.`, 'Error'));

    loadOrgHierarchyLevelsList()
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load organization hierarchies.'));

    loadAllOrgHierarchyLevelOptionsList()
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load organization hierarchies.'));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isLocationMappingLoaded !== this.props.isLocationMappingLoaded ||
      prevProps.columns.size !== this.props.columns.size ||
      prevProps.cachedGridConfig?.size !== this.props.cachedGridConfig?.size) {
      const {loadLocationMappingColumns, columns} = this.props;
      loadLocationMappingColumns(columns);
    }
  }

  handleSort({sort}) {
    this.props.sortLocationMappingList(sort);
    if (Object.entries(sort).length === 0) {
      this.props.clearLocationMappingSorts();
    }
  }

  handleExportImportTemplate() {
    const {selectedDepartmentId} = this.props;
    window.location.href = `${process.env.API_BASE_URL}locations/import/department-template/${selectedDepartmentId}`;
  }

  handleSelectDepartmentDropDown(event) {
    const departmentId = event.target.value;
    const {locationName, loadLocationMappingList, router, loadVolumeDriverMappingSetSelectListOptions} = this.props;
    if (departmentId) {
      loadLocationMappingList(departmentId).then(() => loadVolumeDriverMappingSetSelectListOptions())
        .catch(error => handleApiError(error, router, `An error occurred while attempting to load the ${locationName} Mapping list.`, 'Error'));
    }
  }

  handleSelectAllDepartments(column) {
    const {filteredLocationMappingList, selectedDepartmentId, toggleDepartmentForLocation} = this.props;
    const anyChecked = filteredLocationMappingList.some(location => location.get(column));
    const models = [];

    filteredLocationMappingList.forEach(location => {
      const locationId = location.get('id');

      if (location.get(column) === anyChecked) {
        models.push({locationId, remove: anyChecked});
      }
    });

    toggleDepartmentForLocation(models, selectedDepartmentId);
  }

  handleSelectDepartment({dataItem, field}) {
    const {toggleDepartmentForLocation, router, locationName, selectedDepartmentId, selectedLocationId, clearSelectedLocation} = this.props;

    const locationId = dataItem.id;
    const remove = dataItem[field];

    toggleDepartmentForLocation([{locationId, remove}], selectedDepartmentId)
      .catch(error => handleApiError(error, router, `An error occurred while attempting to update the ${locationName} Mapping.`));

    if (dataItem[field] && dataItem.id === selectedLocationId) {
      clearSelectedLocation();
    }
  }

  renderHeader(tdElement, headerProps) {
    if (headerProps.field === 'checked') {
      return (
        <CheckboxHeaderCell field={headerProps.field} title={headerProps.title}
          data={this.props.filteredLocationMappingList} saving={false} onClick={this.handleSelectAllDepartments} />
      );
    }

    return tdElement;
  }

  handleFilter({filter}) {
    this.props.filterLocationMappingList(filter);
  }

  handleTableRowClick({dataItem}) {
    const {filteredLocationMappingList, clearSelectedLocation, selectedLocationId, selectLocation} = this.props;
    if (selectedLocationId === dataItem.id) {
      clearSelectedLocation();
    } else if (dataItem.checked) {
      const newSelection = filteredLocationMappingList.find(l => l.get('id') === dataItem.id);
      selectLocation(newSelection);
    }
  }

  handlePageChange(event) {
    this.props.pageLocationMappingList(event.page.skip);
  }

  handleToggleSelect({dataItem}) {
    const {toggleSelectLocationMapping} = this.props;
    toggleSelectLocationMapping(dataItem.id);
  }

  handleSelectAll() {
    const {filteredLocationsList, selectedLocations, selectAllLocationMapping} = this.props;
    selectAllLocationMapping(filteredLocationsList.map(locationsKey => locationsKey.get('id')), Boolean(selectedLocations.size === 0));
  }

  handleBulkEdit({dataItem}) {
    const {selectBulkEditLocationMapping, filteredLocationsList, selectedLocations, clearSelectedLocation} = this.props;
    if (dataItem) clearSelectedLocation();
    else {
      const selectedLocationsKey = Object.keys(selectedLocations.toJS());
      selectBulkEditLocationMapping(selectedLocations, selectedLocationsKey, filteredLocationsList);
    }
  }

  setResetReorderedColumns() {
    const {loadLocationMappingColumns, resetLocationMappingColumns} = this.props;
    resetLocationMappingColumns().then(() => loadLocationMappingColumns(this.props.columns));
  }

  handleResetLockedColumns() {
    const {loadLocationMappingColumns, resetLockedLocationMappingColumns} = this.props;
    resetLockedLocationMappingColumns().then(() => loadLocationMappingColumns(this.props.columns));
  }

  handleShowHiddenColumns() {
    const {loadLocationMappingColumns, showHiddenLocationMappingColumns} = this.props;
    showHiddenLocationMappingColumns().then(() => loadLocationMappingColumns(this.props.columns));
  }

  handleClearFilters() {
    this.props.clearLocationMappingFilters();
  }

  handleClearSorts() {
    this.props.clearLocationMappingSorts();
  }

  handleReorderColumn(event) {
    const {columns, reorderLocationMappingColumn} = this.props;
    const reorderedColumnDetail = getReorderedGridColumnDetails(event, columns);
    if (!reorderedColumnDetail) return;
    const {columnKey, oldIndex, newIndex} = reorderedColumnDetail;
    reorderLocationMappingColumn(columnKey, oldIndex, newIndex);
  }

  setToggleColumnLock(field, lock) {
    const {columns, toggleLocationMappingColumnLock} = this.props;
    const finalColumnsList = toggleLockReorderColumns(field, lock, columns);
    toggleLocationMappingColumnLock(field, lock, finalColumnsList);
  }

  setToggleColumnVisibility(field, visibility) {
    const {columns, hiddenColumns, toggleLocationMappingColumnVisibility} = this.props;
    const {selectedColumn, columnsList} = toggleVisibilityReorderColumns(field, visibility, columns, hiddenColumns);
    toggleLocationMappingColumnVisibility(field, visibility, columnsList, selectedColumn);
  }

  handleConfirmColumnReorder() {
    const {reorderLocationMappingColumn, lastReorderedColumnModel} = this.props;
    reorderLocationMappingColumn(lastReorderedColumnModel.columnKey, lastReorderedColumnModel.oldIndex, lastReorderedColumnModel.newIndex);
  }

  render() {
    const {
      loading,
      saving,
      sort,
      columns,
      locationName,
      handleShowImportLocationMapping,
      showFilter,
      selectedDepartmentId,
      departmentsSelectList,
      columnsConfiguration,
      showGridConfiguration,
      filter,
      paging,
      totalLocationMappings,
      pagedLocations,
      selectedLocations,
      showBulkEditSidebar,
      canEdit,
      canExport,
      hideClearFiltersButton,
      hideClearSortsButton,
      showResetButton,
      showHiddenButton,
      showLockButton,
      toggleGridConfigurationSidebar,
      cancelColumnReorder,
      reorderedColumnDetail,
      showColumnReorderConfirmModal,
      persistConfiguration,
      persistGridConfiguration,
      retrieveGridConfiguration,
      updateCachedGridConfiguration,
    } = this.props;
    return (
      <Page pageClassName="location-mapping-list-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>{locationName} Mapping</PageTitle>
          <PageHeaderActions align="right">
            <ClearFiltersButton hide={hideClearFiltersButton} onClear={this.handleClearFilters} />
            <ClearSortsButton hide={hideClearSortsButton} onClear={this.handleClearSorts} />
            <ResetLockedColumnsButton hide={showLockButton} onClear={this.handleResetLockedColumns} />
            <ClearHiddenColumnsButton hide={showHiddenButton} onClear={this.handleShowHiddenColumns} />
            {canEdit && <BulkEditButton isVisible={selectedLocations.size > 0} isOpen={showBulkEditSidebar} onClick={this.handleBulkEdit} />}
            {canExport && <div className="flyout-button">
              <Button className={showFilter ? 'btn-wheat' : 'btn-default'}
                title={`Download ${locationName} Mapping Import Template`}
                onClick={this.handleExportImportTemplate} disabled={saving || !selectedDepartmentId}>
                <i className="fa fa-file-excel-o" />
              </Button>
            </div>}
            {canEdit && <div className="flyout-button">
              <Button className={showFilter ? 'btn-wheat' : 'btn-default'}
                title={`Import ${locationName} Mappings`}
                onClick={handleShowImportLocationMapping} disabled={saving || !selectedDepartmentId}>
                <i className="fa fa-plus" />
              </Button>
            </div>}
            <GridConfigurationButton openSidebar={toggleGridConfigurationSidebar} closeSidebar={toggleGridConfigurationSidebar} showGridConfiguration={showGridConfiguration} />
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.PROFILING} />
          <MainContent loading={loading}>
            <div className="location-mapping-grid-header-section">
              <div>
                <Select
                  id="departmentId"
                  formGroupClassName="departments-selector"
                  onChange={this.handleSelectDepartmentDropDown}
                  value={selectedDepartmentId}
                  options={departmentsSelectList} />
              </div>
              {this.setToggleColumnLock && !columns.first().get('lockable') &&
              <div className="column-lock-warning">
                <h5 className="text-danger">Note: Maximum {ALLOWED_MAX_COLUMN_LOCKS} columns can be locked</h5>
              </div>}
            </div>
            <AutoSizer>
              {({width, height}) => (
                <CustomizableGrid style={{width, height: height - 50}}
                  columns={columns} data={pagedLocations} headerCellRender={this.renderHeader}
                  onItemChange={this.handleSelectDepartment} selectedField="selected"
                  onFilter={this.handleFilter} filter={filter}
                  sort={sort} onSort={this.handleSort}
                  onRowClick={this.handleTableRowClick}
                  onPageChange={this.handlePageChange} total={totalLocationMappings}
                  onSelectedChange={canEdit ? this.handleToggleSelect : null}
                  onHeaderSelectedChange={canEdit ? this.handleSelectAll : null}
                  skip={paging.get('skip')} take={paging.get('take')}
                  toggleColumnLock={this.setToggleColumnLock} toggleColumnVisibility={this.setToggleColumnVisibility} reorderable
                  onColumnReorder={this.handleReorderColumn} showColumnContextMenu />
              )}
            </AutoSizer>
          </MainContent>
          <LocationMappingListEditSidebar canEdit={canEdit} />
          <BulkLocationMappingListEditSidebar canEdit={canEdit} />
          <GridConfigurationSidebar dropActionId={REORDER_LOCATION_MAPPING_COLUMN} columns={columnsConfiguration}
            show={showGridConfiguration} toggleColumnVisibility={this.setToggleColumnVisibility}
            toggleColumnLock={this.setToggleColumnLock} handleResetGridConfiguration={this.setResetReorderedColumns}
            showResetGridConfiguration={showResetButton} />
          <PersistGridConfiguration gridId={LOCATION_MAPPING_GRID} configuration={persistConfiguration} persist={persistGridConfiguration} retrieve={retrieveGridConfiguration}
            updateCachedConfiguration={updateCachedGridConfiguration} />
        </PageBody>
        <ImportLocationMappingModal canEdit={canEdit} />
        <ImportLocationMappingValidationErrorsModal canEdit={canEdit} />
        <ColumnReorderConfirmModal show={showColumnReorderConfirmModal} column={reorderedColumnDetail} onConfirm={this.handleConfirmColumnReorder} onCancel={cancelColumnReorder} processing={false} />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const departmentsSelector = makeSelectListOptionsArraySelector(DEPARTMENTS);
  const canEditSelector = makeCurrentUserHasPermissionSelector(PROFILING_LOCATION_MAPPING_EDIT);
  const canExportSelector = makeCurrentUserHasPermissionSelector(PROFILING_LOCATION_MAPPING_EXPORT);

  return {
    loading: loadingSelector(state),
    saving: savingSelector(state),
    departmentsSelectList: departmentsSelector(state),
    sort: sortSelector(state),
    filter: filterSelector(state),
    selectedLocationId: selectedLocationIdSelector(state),
    selectedDepartmentId: selectedDepartmentIdSelector(state),
    locationName: locationNameSelector(state),
    departmentName: departmentNameSelector(state),

    columns: columnsSelector(state),
    columnsConfiguration: columnsConfigurationSelector(state),
    showGridConfiguration: showGridConfigurationSelector(state),
    filteredLocationMappingList: dataSelector(state),
    pagedLocations: tableDataSelector(state),
    paging: pagingSelector(state),
    totalLocationMappings: totalLocationMappingsSelector(state),

    selectedLocations: selectedLocationDepartmentSelector(state),
    sortedLocationsArraySelector: sortedLocationsArraySelector(state),
    filteredLocationsList: dataSelector(state),
    showEditSidebar: showEditSelector(state),
    showBulkEditSidebar: showBulkEditSelector(state),
    canEdit: canEditSelector(state),
    canExport: canExportSelector(state),
    hideClearFiltersButton: hideClearFiltersButtonSelector(state),
    hideClearSortsButton: hideClearSortsButtonSelector(state),
    showResetButton: showResetButtonSelector(state),
    showHiddenButton: showHiddenButtonSelector(state),
    showLockButton: showLockButtonSelector(state),
    hiddenColumns: hiddenColumnsSelector(state),
    showColumnReorderConfirmModal: showColumnReorderConfirmModalSelector(state),
    reorderedColumnDetail: reorderedColumnDetailSelector(state),
    lastReorderedColumnModel: lastReorderedColumnModelSelector(state),
    persistConfiguration: persistConfigurationSelector(state),
    cachedGridConfig: cachedGridConfigurationSelector(state),
    isLocationMappingLoaded: isLocationMappingLoadedSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadLocationMappingList,
    loadLocationMappingPage,
    loadSelectListOptions,
    sortLocationMappingList,
    selectLocation,
    clearSelectedLocation,
    toggleDepartmentForLocation,
    handleShowImportLocationMapping: showImportLocationMapping,
    toggleGridConfigurationSidebar: toggleLocationMappingGridConfigurationSidebar,
    toggleLocationMappingColumnVisibility,
    filterLocationMappingList,
    pageLocationMappingList,
    loadOrgHierarchyLevelsList,
    loadAllOrgHierarchyLevelOptionsList,
    toggleSelectLocationMapping,
    selectAllLocationMapping,
    selectBulkEditLocationMapping,
    clearLocationMappingFilters,
    clearLocationMappingSorts,
    toggleLocationMappingColumnLock,
    resetLocationMappingColumns,
    reorderLocationMappingColumn,
    showHiddenLocationMappingColumns,
    loadLocationMappingColumns,
    resetLockedLocationMappingColumns,
    cancelColumnReorder,
    persistGridConfiguration,
    retrieveGridConfiguration,
    updateCachedGridConfiguration,
    loadVolumeDriverMappingSetSelectListOptions,
  }
)(LocationMappingListPage));

LocationMappingListPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  departmentsSelectList: PropTypes.array.isRequired,
  sort: PropTypes.object.isRequired,
  filter: PropTypes.object,
  selectedLocationId: PropTypes.number,
  selectedDepartmentId: PropTypes.number,
  locationName: PropTypes.string.isRequired,
  departmentName: PropTypes.string.isRequired,
  columns: PropTypes.object.isRequired,
  columnsConfiguration: PropTypes.object.isRequired,
  showGridConfiguration: PropTypes.bool.isRequired,
  filteredLocationMappingList: PropTypes.object.isRequired,
  pagedLocations: PropTypes.object.isRequired,
  paging: PropTypes.object.isRequired,
  totalLocationMappings: PropTypes.number.isRequired,

  loadLocationMappingList: PropTypes.func.isRequired,
  loadLocationMappingPage: PropTypes.func.isRequired,
  loadSelectListOptions: PropTypes.func.isRequired,
  sortLocationMappingList: PropTypes.func.isRequired,
  selectLocation: PropTypes.func.isRequired,
  clearSelectedLocation: PropTypes.func.isRequired,
  toggleDepartmentForLocation: PropTypes.func.isRequired,
  handleShowImportLocationMapping: PropTypes.func.isRequired,
  toggleGridConfigurationSidebar: PropTypes.func.isRequired,
  toggleLocationMappingColumnVisibility: PropTypes.func.isRequired,
  filterLocationMappingList: PropTypes.func.isRequired,
  pageLocationMappingList: PropTypes.func.isRequired,
  loadOrgHierarchyLevelsList: PropTypes.func.isRequired,
  loadAllOrgHierarchyLevelOptionsList: PropTypes.func.isRequired,
};
