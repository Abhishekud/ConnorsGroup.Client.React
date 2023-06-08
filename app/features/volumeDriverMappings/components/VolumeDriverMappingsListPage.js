import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Dropdown, MenuItem, Button} from 'react-bootstrap';
import pluralize from 'pluralize';
import _ from 'lodash';
import {fromJS} from 'immutable';
import {navigationGroups, layout} from '../../shared/constants';
import {Select} from '../../forms/components';
import {
  AutoSizer,
} from 'react-virtualized';
import {
  ClearFiltersButton,
  ClearSortsButton,
  CustomizableGrid,
  GridConfigurationButton,
  GridConfigurationSidebar,
  ResetLockedColumnsButton,
  ClearHiddenColumnsButton,
  PersistGridConfiguration,
} from '../../customizableGrid/components';
import {
  sortedVolumeDriverMappingSetsSelector,
  sortSelector,
  selectedVolumeDriverMappingIdSelector,
  selectedDepartmentIdSelector,
  columnsConfigurationSelector,
  filterSelector,
  columnsSelector,
  showGridConfigurationSelector,
  selectedVolumeDriverMappingsSelector,
  hideClearFiltersButtonSelector,
  hideClearSortsButtonSelector,
  showResetButtonSelector,
  showHiddenButtonSelector,
  showLockButtonSelector,
  savingSelector,
  hiddenColumnsSelector,
  persistConfigurationSelector,
  cachedGridConfigurationSelector,
  isVolumeDriverMappingsLoadedSelector,
  showColumnReorderConfirmModalSelector,
  reorderedColumnDetailSelector,
  lastReorderedColumnModelSelector,
  activeBackgroundJobsSelector,
  loadingSelector,
} from '../selectors/pages/list';
import {
  loadVolumeDriverMappingsList,
  sortVolumeDriverMappingsList,
  toggleVolumeDriverMappingsListFiltersSidebar,
  toggleVolumeDriverMappingGridConfigurationSidebar,
  toggleVolumeDriverMappingColumnVisibility,
  REORDER_VOLUME_DRIVER_MAPPING_COLUMN,
  showCreateVolumeDriverMapping,
  selectVolumeDriverMapping,
  clearSelectedVolumeDriverMapping,
  toggleVolumeDriverMappingSetsSidebar,
  showCreateVolumeDriverMappingSet,
  showImportVolumeDriverMappings,
  filterVolumeDriverMappingsList,
  clearVolumeDriverMappingsListFilters,
  clearVolumeDriverMappingsListSorts,
  toggleVolumeDriverMappingColumnLock,
  resetVolumeDriverMappingColumns,
  showHiddenVolumeDriverMappingColumns,
  reorderVolumeDriverMappingGridColumns,
  loadVolumeDriverMappingColumns,
  resetLockedVolumeDriverMappingColumns,
  reorderVolumeDriverMappingColumn,
  loadVolumeDriverMappingSetsList,
  cancelColumnReorder,
} from '../actions';
import {
  MainContent,
  NavigationSidebar,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../layout/components';
import VolumeDriverMappingsListEditSidebar from './VolumeDriverMappingsListEditSidebar';
import CreateVolumeDriverMappingModal from './CreateVolumeDriverMappingModal';
import CreateVolumeDriverMappingSetModal from './CreateVolumeDriverMappingSetModal';
import VolumeDriverMappingSetsSidebar from './VolumeDriverMappingSetsSidebar';
import ImportVolumeDriverMappingsModal from './ImportVolumeDriverMappingsModal';
import ImportVolumeDriverMappingsValidationErrorsModal from './ImportVolumeDriverMappingsValidationErrorsModal';
import {
  appliedCountSelector as appliedFiltersCountSelector,
  showSelector as showFiltersSelector,
  modelSelector as filterValuesSelector,
} from '../selectors/sidebars/filters';
import {
  showSelector as showCategoriesSelector,
} from '../selectors/sidebars/sets';
import {
  showSelector as showSidebarSelector,
  showSelector as showSetsSelector,
} from '../selectors/sidebars/edit';
import React, {Component} from 'react';
import {getReorderedGridColumnDetails, handleApiError, toggleLockReorderColumns, toggleVisibilityReorderColumns, modelsArrayToMapById, exportDownloader} from '../../shared/services';
import {departmentNameSelector} from '../../shared/selectors/components/settings';
import {DEPARTMENTS} from '../../selectListOptions/constants/selectListTypes';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {makeSelectListOptionsArraySelector} from '../../selectListOptions/selectors';
import {Tooltip} from '@progress/kendo-react-tooltip';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {BETA_FEATURES_ACCESS, PROFILING_VOLUME_DRIVER_MAPPING_CREATE, PROFILING_VOLUME_DRIVER_MAPPING_EXPORT, PROFILING_VOLUME_DRIVER_MAPPING_UPDATE} from '../../authentication/constants/permissions';
import {POLL_INTERVAL, VOLUME_DRIVER_MAPPINGS_IMPORTER} from '../../shared/constants/backgroundJobs';
import {ALLOWED_MAX_COLUMN_LOCKS} from '../../customizableGrid/constants/columnConfigurations';
import {ColumnReorderConfirmModal} from '../../shared/components';
import {DEBOUNCE_TIMEOUT} from '../../shared/constants/debounceTimeout';
import {PAGE_SIZE} from '../../shared/constants/virtualPaging';
import {DEFAULT_TAKE_SIZE} from '../../shared/constants/defaultTakeSize';
import {mergeVolumeDriverMappingsListData, addNewVolumeDriverMappingSetToVolumeDriverMappings} from '../services';
import {persistGridConfiguration, retrieveGridConfiguration, updateCachedGridConfiguration} from '../../customizableGrid/actions';
import {
  VOLUME_DRIVER_MAPPINGS as VOLUME_DRIVER_MAPPINGS_GRID,
} from '../../customizableGrid/constants/grids';
import {pollBackgroundJobs} from '../../shared/actions';

class VolumeDriverMappingsListPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      skip: 0,
      volumeDriverMappings: [],
      total: 0,
    };

    this.reloadListDebounce = _.debounce(() => {
      this.reloadVolumeDriverMappings();
    }, DEBOUNCE_TIMEOUT);
    this.pageSize = PAGE_SIZE / 2;
    autoBind(this);
  }

  componentDidMount() {
    const {
      loadVolumeDriverMappingSetsList,
      loadSelectListOptions,
      router,
      departmentName,
    } = this.props;

    loadSelectListOptions(DEPARTMENTS)
      .then(() => {
        const {departments} = this.props;
        const departmentId = departments.length ? departments[0].value : 0;
        loadVolumeDriverMappingSetsList(departmentId).then(() => this.requestData(0));
      })
      .catch(error => handleApiError(error, router, `An error occurred while attempting to load the available ${pluralize(departmentName)}.`, 'Error'));

    this.pollTimer = setInterval(this.checkBackgroundJobs, POLL_INTERVAL);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.columns.size !== this.props.columns.size || prevProps.saving !== this.props.saving ||
      prevProps.isVolumeDriverMappingsLoaded !== this.props.isVolumeDriverMappingsLoaded ||
      prevProps.cachedGridConfig?.size !== this.props.cachedGridConfig?.size) {
      this.props.loadVolumeDriverMappingColumns(this.props.columns);
    }
    if (!_.isEqual(prevProps?.filter, this.props?.filter) || !_.isEqual(prevProps?.sort, this.props?.sort)) {
      this.reloadListDebounce();
    }
  }

  componentWillUnmount() {
    clearInterval(this.pollTimer);
    this.pollTimer = null;
  }

  checkBackgroundJobs() {
    const {pollBackgroundJobs} = this.props;
    pollBackgroundJobs([VOLUME_DRIVER_MAPPINGS_IMPORTER]);
  }

  requestIfNeeded(skip) {
    const {volumeDriverMappings} = this.state;
    for (let i = skip; i < skip + this.pageSize - 1 && i < volumeDriverMappings.length; i++) {
      if (typeof volumeDriverMappings[i].id === 'undefined') {
        this.requestData(skip);
        return;
      }
    }
  }

  reloadVolumeDriverMappings() {
    this.setState({
      skip: 0,
      volumeDriverMappings: [],
      total: 0,
    });
    this.requestData(0);
  }

  requestData(skipParameter) {
    if (this.requestInProgress) return;
    this.requestInProgress = true;
    const skip = Math.max(skipParameter - this.pageSize, 0);
    const {router, loadVolumeDriverMappingsList, departments, selectedDepartmentId, sort, filter} = this.props;
    let departmentId = selectedDepartmentId;
    if (!departmentId) departmentId = departments.length ? _.first(departments).value : 0;

    loadVolumeDriverMappingsList(departmentId, skip, DEFAULT_TAKE_SIZE, sort, filter)
      .then(result => {
        const {total, volumeDriverMappings} = result.value.data;
        const volumeDriverMappingsData = skipParameter === 0
          ? new Array(total).fill().map((e, i) => ({index: i}))
          : this.state.volumeDriverMappings;
        const mergedVolumeDriverMappingsListData = mergeVolumeDriverMappingsListData(volumeDriverMappings, volumeDriverMappingsData, skip);
        this.setState({
          volumeDriverMappings: mergedVolumeDriverMappingsListData,
          total,
        });
        this.requestInProgress = false;
        this.requestIfNeeded(skip);
      })
      .catch(error => {
        this.requestInProgress = false;
        handleApiError(error, router, 'An error occurred while attempting to load the Volume Driver Mappings list.', 'error');
      }).finally(() => {
        this.requestInProgress = false;
      });
  }

  handleSort({sort}) {
    if (Object.entries(sort).length === 0) {
      this.props.clearVolumeDriverMappingsListSorts();
    } else {
      this.props.sortVolumeDriverMappingsList(sort);
    }
    this.reloadListDebounce();
  }


  handleRowClick({dataItem, nativeEvent}) {
    const {columnsConfiguration} = this.props;
    const columnIndex = nativeEvent.srcElement.cellIndex;
    const columnClickTarget = columnsConfiguration.getIn([columnIndex, 'title']);
    const {selectedVolumeDriverMappingId, selectVolumeDriverMapping, clearSelectedVolumeDriverMapping} = this.props;
    const {volumeDriverMappings} = this.state;
    volumeDriverMappings.forEach(dataKey => {
      if (dataKey.id === dataItem.id) {
        if (dataItem.id === selectedVolumeDriverMappingId) clearSelectedVolumeDriverMapping();
        else selectVolumeDriverMapping(fromJS(dataKey), dataItem.id, columnClickTarget);
      }
    });
  }

  handlePageChange(event) {
    if (event.page.skip === this.state.skip) return;
    const skip = isNaN(event.page.skip) ? 0 : event.page.skip;
    this.requestIfNeeded(skip);
    this.setState({skip});
  }

  handleValueClick(volumeDriverId, volumeDriverSetId, columnName) {
    const {volumeDriverMappings, selectedVolumeDriverMappingId, selectVolumeDriverMapping, clearSelectedVolumeDriverMapping} = this.props;
    if (volumeDriverId === selectedVolumeDriverMappingId) clearSelectedVolumeDriverMapping();
    else selectVolumeDriverMapping(volumeDriverMappings.find(c => c.get('id') === volumeDriverId), volumeDriverSetId, columnName);
  }

  handleExportImportTemplate() {
    const {selectedDepartmentId} = this.props;
    exportDownloader(`${process.env.API_BASE_URL}volume-driver-mappings/import/template/${selectedDepartmentId}`);
  }

  handleSelectDepartment(event) {
    const departmentId = event.target.value;
    this.setState({
      volumeDriverMappings: [],
      total: 0,
      skip: 0,
    });
    const {loadVolumeDriverMappingSetsList} = this.props;
    loadVolumeDriverMappingSetsList(departmentId).then(() => this.reloadVolumeDriverMappings());
  }

  formatVolumeDriverMappingsDataForPresentation() {
    const {volumeDriverMappings, skip} = this.state;
    return volumeDriverMappings.slice(skip, skip + PAGE_SIZE);
  }

  handleCreateVolumeDriverMappingSet(newVolumeDriverMappingSetValues) {
    const {volumeDriverMappings} = this.state;
    this.setState({loading: true});
    const volumeDriverMappingValuesByVolumeDriverMappingsId = modelsArrayToMapById(
      newVolumeDriverMappingSetValues.volumeDriverMappingValues,
      'volumeDriverMappingId'
    );
    volumeDriverMappings.forEach((volumeDriverMapping, index) => {
      if (typeof volumeDriverMapping.id !== 'undefined') {
        volumeDriverMappings[index] = addNewVolumeDriverMappingSetToVolumeDriverMappings(
          volumeDriverMapping,
          volumeDriverMappingValuesByVolumeDriverMappingsId
        );
      }
    }
    );
    this.setState({
      volumeDriverMappings,
      loading: false,
    });
  }

  handleFilter({filter}) {
    this.props.filterVolumeDriverMappingsList(filter);
    this.reloadListDebounce();
  }

  setToggleColumnLock(field, lock) {
    const {columns, toggleVolumeDriverMappingColumnLock} = this.props;
    const finalColumnsList = toggleLockReorderColumns(field, lock, columns);
    toggleVolumeDriverMappingColumnLock(field, lock, finalColumnsList);
  }

  setToggleColumnVisibility(field, visibility) {
    const {columns, hiddenColumns, toggleVolumeDriverMappingColumnVisibility} = this.props;
    const {selectedColumn, columnsList} = toggleVisibilityReorderColumns(field, visibility, columns, hiddenColumns);
    toggleVolumeDriverMappingColumnVisibility(field, visibility, columnsList, selectedColumn);
    this.reloadListDebounce();
  }

  setResetReorderedColumns() {
    const {loadVolumeDriverMappingColumns, resetVolumeDriverMappingColumns} = this.props;
    resetVolumeDriverMappingColumns().then(() => loadVolumeDriverMappingColumns(this.props.columns));
  }

  handleResetLockedColumns() {
    const {loadVolumeDriverMappingColumns, resetLockedVolumeDriverMappingColumns} = this.props;
    resetLockedVolumeDriverMappingColumns().then(() => loadVolumeDriverMappingColumns(this.props.columns));
  }

  handleShowHiddenColumns() {
    const {loadVolumeDriverMappingColumns, showHiddenVolumeDriverMappingColumns} = this.props;
    showHiddenVolumeDriverMappingColumns().then(() => loadVolumeDriverMappingColumns(this.props.columns));
  }

  handleClearFilters() {
    this.props.clearVolumeDriverMappingsListFilters();
    this.reloadListDebounce();
  }

  handleClearSorts() {
    this.props.clearVolumeDriverMappingsListSorts();
    this.reloadListDebounce();
  }

  handleReorderColumn(event) {
    const {columns, reorderVolumeDriverMappingColumn} = this.props;
    const reorderedColumnDetail = getReorderedGridColumnDetails(event, columns);
    if (!reorderedColumnDetail) return;
    const {columnKey, oldIndex, newIndex} = reorderedColumnDetail;
    reorderVolumeDriverMappingColumn(columnKey, oldIndex, newIndex);

  }

  handleConfirmColumnReorder() {
    const {reorderVolumeDriverMappingColumn, lastReorderedColumnModel} = this.props;
    reorderVolumeDriverMappingColumn(lastReorderedColumnModel.columnKey, lastReorderedColumnModel.oldIndex, lastReorderedColumnModel.newIndex);
  }

  reloadVolumeDriverMappingSetsAndList() {
    const {selectedDepartmentId, loadVolumeDriverMappingSetsList} = this.props;
    loadVolumeDriverMappingSetsList(selectedDepartmentId).then(() => this.reloadVolumeDriverMappings());
  }

  render() {
    const {
      volumeDriverMappingSets,
      showCategories,
      sort,
      handleToggleCategoriesSidebar,
      handleShowCreateVolumeDriverMapping,
      handleShowCreateVolumeDriverMappingSet,
      handleShowImportVolumeDriverMappings,
      selectedDepartmentId,
      toggleGridConfigurationSidebar,
      departments,
      columnsConfiguration,
      columns,
      filter,
      showSidebar,
      showGridConfiguration,
      showSets,
      canCreate,
      canUpdate,
      canExport,
      hideClearFiltersButton,
      hideClearSortsButton,
      showResetButton,
      showHiddenButton,
      showLockButton,
      persistConfiguration,
      persistGridConfiguration,
      retrieveGridConfiguration,
      updateCachedGridConfiguration,
      showColumnReorderConfirmModal,
      reorderedColumnDetail,
      cancelColumnReorder,
      activeBackgroundJobs,
      loading,
      hasBetaAccess,
    } = this.props;

    const {
      skip,
      total,
    } = this.state;

    const show = Boolean(showSidebar || showSets);
    let importStatus = null;
    if (activeBackgroundJobs) {
      importStatus = <i className="fa fa-spinner fa-spin" title="Import in progress" />;
    }
    return (
      <Page pageClassName="volumeDriverMappings-list-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Volume Driver Mappings</PageTitle>
          <PageHeaderActions>
            <ClearFiltersButton hide={hideClearFiltersButton} onClear={this.handleClearFilters} />
            <ClearSortsButton hide={hideClearSortsButton} onClear={this.handleClearSorts} />
            <ResetLockedColumnsButton hide={showLockButton} onClear={this.handleResetLockedColumns} />
            <ClearHiddenColumnsButton hide={showHiddenButton} onClear={this.handleShowHiddenColumns} />
            {importStatus}
            {canExport && <Dropdown id="export" className="header-button" pullRight disabled={departments.length === 0 || activeBackgroundJobs}>
              <Dropdown.Toggle noCaret><i className="fa fa-file-excel-o" /></Dropdown.Toggle>
              <Dropdown.Menu>
                <MenuItem eventKey="1" onClick={this.handleExportImportTemplate}>
                  Download Volume Driver Mapping Import Template
                </MenuItem>
              </Dropdown.Menu>
            </Dropdown>}
            {(canCreate || canUpdate) && <Dropdown id="volumeDriverMappings-list-actions" className="header-button" pullRight disabled={activeBackgroundJobs}>
              <Dropdown.Toggle noCaret>
                <i className="fa fa-plus" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {canCreate && <MenuItem eventKey="1" onClick={handleShowCreateVolumeDriverMapping}>
                  New Volume Driver Mapping
                </MenuItem>}
                {canCreate && <MenuItem eventKey="2" onClick={handleShowCreateVolumeDriverMappingSet}>
                  New Volume Driver Mapping Set
                </MenuItem>}
                {canUpdate && <MenuItem eventKey="3" onClick={handleShowImportVolumeDriverMappings}>
                  Import Volume Driver Mappings
                </MenuItem>}
              </Dropdown.Menu>
            </Dropdown>}

            <div className="flyout-button">
              <Button className={showCategories ? 'btn-wheat' : 'btn-default'} onClick={handleToggleCategoriesSidebar}>
                <i className="fa fa-list-ul" />
              </Button>
            </div>
            <GridConfigurationButton openSidebar={toggleGridConfigurationSidebar} closeSidebar={toggleGridConfigurationSidebar} showGridConfiguration={showGridConfiguration} />
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={hasBetaAccess ? navigationGroups.VOLUME_DRIVERS : navigationGroups.PROFILING} />
          <MainContent loading={loading}>
            <div className="volume-driver-mapping-grid-header-section">
              <div>
                <Select
                  id="departmentId"
                  formGroupClassName="departments-selector"
                  onChange={this.handleSelectDepartment}
                  value={selectedDepartmentId}
                  options={departments} />
              </div>
              {this.setToggleColumnLock && !columns.first().get('lockable') &&
              <div className="column-lock-warning">
                <h5 className="text-danger">Note: Maximum {ALLOWED_MAX_COLUMN_LOCKS} columns can be locked</h5>
              </div>}
            </div>
            <AutoSizer>
              {({width, height}) => (
                <Tooltip openDelay={100} position="top" anchorElement="target">
                  <CustomizableGrid
                    noFromJs
                    data={this.formatVolumeDriverMappingsDataForPresentation()}
                    style={{width: width + (show * layout.SIDEBAR_WIDTH), height: height - 50}}
                    sort={sort}
                    onSort={this.handleSort}
                    filter={filter}
                    onFilter={this.handleFilter}
                    onRowClick={this.handleRowClick}
                    take={this.pageSize}
                    total={total} skip={skip}
                    onPageChange={this.handlePageChange}
                    columns={columns}
                    toggleColumnLock={this.setToggleColumnLock} toggleColumnVisibility={this.setToggleColumnVisibility} reorderable
                    onColumnReorder={this.handleReorderColumn}
                    showColumnContextMenu />
                </Tooltip>
              )}
            </AutoSizer>
          </MainContent>
          <GridConfigurationSidebar dropActionId={REORDER_VOLUME_DRIVER_MAPPING_COLUMN} columns={columnsConfiguration}
            show={showGridConfiguration} toggleColumnVisibility={this.setToggleColumnVisibility}
            toggleColumnLock={this.setToggleColumnLock} handleResetGridConfiguration={this.setResetReorderedColumns}
            showResetGridConfiguration={showResetButton} />
          <PersistGridConfiguration gridId={VOLUME_DRIVER_MAPPINGS_GRID} configuration={persistConfiguration} persist={persistGridConfiguration} retrieve={retrieveGridConfiguration}
            updateCachedConfiguration={updateCachedGridConfiguration} />
          <VolumeDriverMappingsListEditSidebar reloadVolumeDriverMappings={this.reloadListDebounce} />
          <VolumeDriverMappingSetsSidebar reloadVolumeDriverMappings={this.reloadListDebounce} />
          <CreateVolumeDriverMappingModal volumeDriverMappingSets={volumeDriverMappingSets} reloadVolumeDriverMappings={this.reloadListDebounce} />
          <CreateVolumeDriverMappingSetModal volumeDriverMappingSets={volumeDriverMappingSets} onCreateVolumeDriverMappingSet={this.handleCreateVolumeDriverMappingSet} />
          <ImportVolumeDriverMappingsModal reloadVolumeDriverMappings={this.reloadVolumeDriverMappingSetsAndList} />
          <ImportVolumeDriverMappingsValidationErrorsModal />
          <ColumnReorderConfirmModal show={showColumnReorderConfirmModal}
            column={reorderedColumnDetail} onConfirm={this.handleConfirmColumnReorder}
            onCancel={cancelColumnReorder} processing={false} />
        </PageBody>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const departmentsSelector = makeSelectListOptionsArraySelector(DEPARTMENTS);
  const canCreateSelector = makeCurrentUserHasPermissionSelector(PROFILING_VOLUME_DRIVER_MAPPING_CREATE);
  const canUpdateSelector = makeCurrentUserHasPermissionSelector(PROFILING_VOLUME_DRIVER_MAPPING_UPDATE);
  const canExportSelector = makeCurrentUserHasPermissionSelector(PROFILING_VOLUME_DRIVER_MAPPING_EXPORT);
  const hasBetaAccessSelector = makeCurrentUserHasPermissionSelector(BETA_FEATURES_ACCESS);

  return {
    sort: sortSelector(state),
    showGridConfiguration: showGridConfigurationSelector(state),
    volumeDriverMappingSets: sortedVolumeDriverMappingSetsSelector(state),
    selectedVolumeDriverMappingId: selectedVolumeDriverMappingIdSelector(state),
    appliedFiltersCount: appliedFiltersCountSelector(state),
    showFilters: showFiltersSelector(state),
    filterValues: filterValuesSelector(state),
    showCategories: showCategoriesSelector(state),
    departmentName: departmentNameSelector(state),
    departments: departmentsSelector(state),
    selectedDepartmentId: selectedDepartmentIdSelector(state),
    columns: columnsSelector(state),
    columnsConfiguration: columnsConfigurationSelector(state),
    filter: filterSelector(state),
    selectedVolumeDriverMappings: selectedVolumeDriverMappingsSelector(state),
    showSidebar: showSidebarSelector(state),
    showSets: showSetsSelector(state),
    canCreate: canCreateSelector(state),
    canUpdate: canUpdateSelector(state),
    canExport: canExportSelector(state),
    hideClearFiltersButton: hideClearFiltersButtonSelector(state),
    hideClearSortsButton: hideClearSortsButtonSelector(state),
    showResetButton: showResetButtonSelector(state),
    showHiddenButton: showHiddenButtonSelector(state),
    showLockButton: showLockButtonSelector(state),
    hiddenColumns: hiddenColumnsSelector(state),
    saving: savingSelector(state),
    persistConfiguration: persistConfigurationSelector(state),
    cachedGridConfig: cachedGridConfigurationSelector(state),
    isVolumeDriverMappingsLoaded: isVolumeDriverMappingsLoadedSelector(state),
    showColumnReorderConfirmModal: showColumnReorderConfirmModalSelector(state),
    reorderedColumnDetail: reorderedColumnDetailSelector(state),
    lastReorderedColumnModel: lastReorderedColumnModelSelector(state),
    activeBackgroundJobs: activeBackgroundJobsSelector(state),
    loading: loadingSelector(state),
    hasBetaAccess: hasBetaAccessSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleToggleFiltersSidebar: toggleVolumeDriverMappingsListFiltersSidebar,
    handleToggleCategoriesSidebar: toggleVolumeDriverMappingSetsSidebar,
    toggleVolumeDriverMappingColumnVisibility,
    loadVolumeDriverMappingsList,
    sortVolumeDriverMappingsList,
    handleShowCreateVolumeDriverMapping: showCreateVolumeDriverMapping,
    selectVolumeDriverMapping,
    clearSelectedVolumeDriverMapping,
    handleShowCreateVolumeDriverMappingSet: showCreateVolumeDriverMappingSet,
    handleShowImportVolumeDriverMappings: showImportVolumeDriverMappings,
    toggleGridConfigurationSidebar: toggleVolumeDriverMappingGridConfigurationSidebar,
    loadSelectListOptions,
    filterVolumeDriverMappingsList,
    clearVolumeDriverMappingsListFilters,
    clearVolumeDriverMappingsListSorts,
    toggleVolumeDriverMappingColumnLock,
    resetVolumeDriverMappingColumns,
    reorderVolumeDriverMappingGridColumns,
    showHiddenVolumeDriverMappingColumns,
    loadVolumeDriverMappingColumns,
    resetLockedVolumeDriverMappingColumns,
    reorderVolumeDriverMappingColumn,
    loadVolumeDriverMappingSetsList,
    persistGridConfiguration,
    retrieveGridConfiguration,
    updateCachedGridConfiguration,
    cancelColumnReorder,
    pollBackgroundJobs,
  }
)(VolumeDriverMappingsListPage));
