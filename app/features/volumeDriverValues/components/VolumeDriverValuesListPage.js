import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {Button, Dropdown, MenuItem} from 'react-bootstrap';
import {
  MainContent,
  NavigationSidebar,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../layout/components';
import {Select} from '../../forms/components';
import makeCurrentUserHasPermissionSelector from '../../authentication/selectors/currentUser/makeCurrentUserHasPermissionSelector';
import {PROFILING_VOLUME_DRIVER_VALUES_EXPORT, PROFILING_VOLUME_DRIVER_VALUES_IMPORT, BETA_FEATURES_ACCESS} from '../../authentication/constants/permissions';
import {navigationGroups, exportResponseText} from '../../shared/constants';
import {pollBackgroundJobs, showCreateExportRequest} from '../../shared/actions';
import {
  getVolumeDriverValues,
  importVolumeDriverValues,
  sortVolumeDriverValuesList,
  showImportVolumeDriverValues,
  filterVolumeDriverValuesList,
  pageVolumeDriverValueList,
  clearVolumeDriverValuesListFilters,
  clearVolumeDriverValuesListSorts,
  toggleVolumeDriverValuesColumnLock,
  toggleVolumeDriverValuesColumnVisibility,
  toggleVolumeDriverValuesGridConfigurationSidebar,
  REORDER_VOLUME_DRIVER_VALUES_COLUMN,
  resetVolumeDriverValuesColumns,
  reorderVolumeDriverValuesColumn,
  showHiddenVolumeDriverValuesColumns,
  loadVolumeDriverValuesColumns,
  resetLockedVolumeDriverValuesColumns,
  loadVolumeDriverValuesPage,
  createVolumeDriverValuesExportRequestBackgroundJob,
  cancelColumnReorder,
} from '../actions';
import {
  loadingSelector,
  sortSelector,
  skipSelector,
  takeSelector,
  columnsConfigurationSelector,
  filterSelector,
  totalVolumeDriverValuesSelector,
  dataSelector,
  tableDataSelector,
  hideClearFiltersButtonSelector,
  hideClearSortsButtonSelector,
  columnsSelector,
  showGridConfigurationSelector,
  showResetButtonSelector,
  showHiddenButtonSelector,
  showLockButtonSelector,
  hiddenColumnsSelector,
  selectedVolumeDriverValueSetIdSelector,
  activeVolumeDriverValuesSetExportRequestBackgroundJobSelector,
  showColumnReorderConfirmModalSelector,
  reorderedColumnDetailSelector,
  lastReorderedColumnModelSelector,
  cachedGridConfigurationSelector,
  persistConfigurationSelector,
  isVolumeDriverValuesLoadedSelector,
} from '../selectors/pages/list';
import ImportVolumeDriverValuesModal from './ImportVolumeDriverValuesModal';
import VolumeDriverValuesImportValidationErrorsModal from './VolumeDriverValuesImportValidationErrorsModal';
import {getReorderedGridColumnDetails, handleApiError, toggleLockReorderColumns, toggleVisibilityReorderColumns, toastr, exportDownloader} from '../../shared/services';
import {withRouter, Link} from 'react-router';
import activeBackgroundJobsSelector from '../selectors/pages/list/activeBackgroundJobsSelector';
import {POLL_INTERVAL, VOLUME_DRIVER_VALUES_EXPORTER, VOLUME_DRIVER_VALUE_IMPORTER} from '../../shared/constants/backgroundJobs';
import backgroundJobStartedSelector from '../selectors/pages/list/backgroundJobStartedSelector';
import {
  AutoSizer,
} from 'react-virtualized';
import {ClearFiltersButton,
  ClearSortsButton,
  CustomizableGrid,
  GridConfigurationButton,
  GridConfigurationSidebar,
  ResetLockedColumnsButton,
  ClearHiddenColumnsButton,
  PersistGridConfiguration} from '../../customizableGrid/components';
import {loadOrgHierarchyLevelsList} from '../../orgHierarchyLevels/actions';
import {loadAllOrgHierarchyLevelOptionsList} from '../../orgHierarchyLevelOptions/actions';
import {Tooltip} from '@progress/kendo-react-tooltip';
import {ALLOWED_MAX_COLUMN_LOCKS} from '../../customizableGrid/constants/columnConfigurations';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {VOLUME_DRIVER_VALUE_SETS} from '../../selectListOptions/constants/selectListTypes';
import {makeSelectListOptionsArraySelector} from '../../selectListOptions/selectors';
import {CreateExportRequestModal, ColumnReorderConfirmModal} from '../../shared/components';
import {persistGridConfiguration, retrieveGridConfiguration, updateCachedGridConfiguration} from '../../customizableGrid/actions';
import {
  VOLUME_DRIVER_VALUES as VOLUME_DRIVER_VALUES_GRID,
} from '../../customizableGrid/constants/grids';

class VolumeDriverValuesListPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);

    setTimeout(() => this.checkBackgroundJobs());
    this.pollTimer = setInterval(this.checkBackgroundJobs, POLL_INTERVAL);
  }

  componentDidMount() {
    const {router, loadOrgHierarchyLevelsList, loadAllOrgHierarchyLevelOptionsList, getVolumeDriverValues, loadSelectListOptions, loadVolumeDriverValuesPage, params} = this.props;
    loadVolumeDriverValuesPage();

    loadOrgHierarchyLevelsList().then(() => {
      loadAllOrgHierarchyLevelOptionsList().then(() => {
        loadSelectListOptions(VOLUME_DRIVER_VALUE_SETS)
          .then(() => {
            const defaultVolumeDriverValueSet = this.props.volumeDriverValueSets.find(vdvs => vdvs.label.includes('(Default)'));
            getVolumeDriverValues(params.id ?? defaultVolumeDriverValueSet.value)
              .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Volume Drivers Values list.', 'Error'));
          }
          );
      }).catch(error => handleApiError(error, router, 'An error occurred while attempting to load organization hierarchies options list.'));
    })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load organization hierarchies.'));
  }

  componentDidUpdate(prevProps) {
    const {loadVolumeDriverValuesColumns, columns} = this.props;
    if (prevProps.isVolumeDriverValuesLoaded !== this.props.isVolumeDriverValuesLoaded ||
       prevProps.columns.size !== this.props.columns.size ||
       prevProps.cachedGridConfig?.size !== this.props.cachedGridConfig?.size) {
      loadVolumeDriverValuesColumns(columns);
    }
  }

  componentWillUnmount() {
    clearInterval(this.pollTimer);
    this.pollTimer = null;
  }

  checkBackgroundJobs() {
    const {
      pollBackgroundJobs,
      getVolumeDriverValues,
      router,
      volumeDriverValueSets,
    } = this.props;

    pollBackgroundJobs([VOLUME_DRIVER_VALUE_IMPORTER, VOLUME_DRIVER_VALUES_EXPORTER])
      .then(() => {
        const {activeBackgroundJobs, backgroundJobStarted} = this.props;

        if (!activeBackgroundJobs && backgroundJobStarted) {
          const volumeDriverValueSetId = volumeDriverValueSets.length ? volumeDriverValueSets[0].value : 0;
          getVolumeDriverValues(volumeDriverValueSetId)
            .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Volume Driver Values list.', 'Error'));
        }
      });
  }

  handleExportImportTemplate() {
    exportDownloader(`${process.env.API_BASE_URL}volume-driver-values/import/template/${this.props.selectedVolumeDriverValueSetId}`);
  }

  handleShowImportVolumeDriverValues() {
    const {activeBackgroundJobs, showImportVolumeDriverValues} = this.props;

    if (activeBackgroundJobs) return;

    showImportVolumeDriverValues();
  }

  handleSort({sort}) {
    this.props.sortVolumeDriverValuesList(sort);
  }
  handleFilter({filter}) {
    this.props.filterVolumeDriverValuesList(filter);
  }

  handlePageChange(event) {
    this.props.pageVolumeDriverValueList(event.page.skip);
  }

  setToggleColumnLock(field, lock) {
    const {columns, toggleVolumeDriverValuesColumnLock} = this.props;
    const finalColumnsList = toggleLockReorderColumns(field, lock, columns);
    toggleVolumeDriverValuesColumnLock(field, lock, finalColumnsList);
  }

  setToggleColumnVisibility(field, visibility) {
    const {columns, hiddenColumns, toggleVolumeDriverValuesColumnVisibility} = this.props;
    const {selectedColumn, columnsList} = toggleVisibilityReorderColumns(field, visibility, columns, hiddenColumns);
    toggleVolumeDriverValuesColumnVisibility(field, visibility, columnsList, selectedColumn);
  }

  setResetReorderedColumns() {
    const {resetVolumeDriverValuesColumns, loadVolumeDriverValuesColumns} = this.props;
    resetVolumeDriverValuesColumns().then(() => loadVolumeDriverValuesColumns(this.props.columns));
  }

  handleResetLockedColumns() {
    const {resetLockedVolumeDriverValuesColumns, loadVolumeDriverValuesColumns} = this.props;
    resetLockedVolumeDriverValuesColumns().then(() => loadVolumeDriverValuesColumns(this.props.columns));
  }

  handleShowHiddenColumns() {
    const {showHiddenVolumeDriverValuesColumns, loadVolumeDriverValuesColumns} = this.props;
    showHiddenVolumeDriverValuesColumns().then(() => loadVolumeDriverValuesColumns(this.props.columns));
  }

  handleClearFilters() {
    this.props.clearVolumeDriverValuesListFilters();
  }

  handleClearSorts() {
    this.props.clearVolumeDriverValuesListSorts();
  }

  handleReorderColumns(event) {
    const {columns, reorderVolumeDriverValuesColumn} = this.props;
    const reorderedColumnDetail = getReorderedGridColumnDetails(event, columns);
    if (!reorderedColumnDetail) return;
    const {columnKey, oldIndex, newIndex} = reorderedColumnDetail;
    reorderVolumeDriverValuesColumn(columnKey, oldIndex, newIndex);
  }

  handleSelectVolumeDriverValueSet(event) {
    const volumeDriverValueSetId = event.target.value;
    const {getVolumeDriverValues, router} = this.props;
    if (volumeDriverValueSetId) {
      getVolumeDriverValues(volumeDriverValueSetId)
        .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Volume Driver Values list.', 'Error'));
    }
  }


  handleShowCreateExportVolumeDriverValues() {
    this.props.showCreateExportRequest();
  }

  handleExportRequest(exportRequestId) {
    const {createVolumeDriverValuesExportRequestBackgroundJob, router} = this.props;
    createVolumeDriverValuesExportRequestBackgroundJob(exportRequestId)
      .then(response => {
        if (response.value.data.backgroundedJob) {
          toastr.success(exportResponseText.SUCCESS, exportResponseText.SUCCESS_TITLE);
        } else {
          toastr.error(exportResponseText.FAILURE);
        }
      })
      .catch(error => {
        let errorMessage = 'An error occurred while attempting to export Volume Driver Values (All Sets).';
        if (error.response.status === 500) {
          errorMessage = error.response.data.exceptionMessage;
        }
        handleApiError(error, router, errorMessage, 'Error');
      });
  }

  handleConfirmColumnReorder() {
    const {reorderVolumeDriverValuesColumn, lastReorderedColumnModel} = this.props;
    reorderVolumeDriverValuesColumn(lastReorderedColumnModel.columnKey, lastReorderedColumnModel.oldIndex, lastReorderedColumnModel.newIndex);
  }

  render() {
    const {
      loading,
      sort,
      skip,
      take,
      activeBackgroundJobs,
      columnsConfiguration,
      pageOfVolumeDriverValues,
      filter,
      totalVolumeDriverValues,
      canImport,
      canExport,
      hideClearFiltersButton,
      hideClearSortsButton,
      toggleVolumeDriverValuesGridConfigurationSidebar,
      showGridConfiguration,
      showResetButton,
      columns,
      showHiddenButton,
      showLockButton,
      volumeDriverValueSets,
      selectedVolumeDriverValueSetId,
      hasBetaAccess,
      params,
      activeVolumeDriverValuesSetExportRequestBackgroundJob,
      cancelColumnReorder,
      reorderedColumnDetail,
      showColumnReorderConfirmModal,
      persistConfiguration,
      persistGridConfiguration,
      retrieveGridConfiguration,
      updateCachedGridConfiguration,
    } = this.props;

    let recalcStatus = null;
    if (activeBackgroundJobs) {
      recalcStatus = <i className="fa fa-spinner fa-spin" title={activeVolumeDriverValuesSetExportRequestBackgroundJob ? 'Export in progress' : 'Import in progress'} />;
    }
    const dropdownHeight = hasBetaAccess ? 50 : 0;
    return (
      <Page pageClassName="volume-driver-values-list-page">
        <PageHeader>
          {params.id && <PageHeaderActions>
            <Link to={'/volume-driver-value-sets?return=true'}><i className="fa fa-caret-left" /> Previous</Link>
          </PageHeaderActions>}
          <PageTitle>Volume Driver Values</PageTitle>
          <PageHeaderActions>
            <ClearFiltersButton hide={hideClearFiltersButton} onClear={this.handleClearFilters} />
            <ClearSortsButton hide={hideClearSortsButton} onClear={this.handleClearSorts} />
            <ResetLockedColumnsButton hide={showLockButton} onClear={this.handleResetLockedColumns} />
            <ClearHiddenColumnsButton hide={showHiddenButton} onClear={this.handleShowHiddenColumns} />
            {recalcStatus}
            {canExport && <Dropdown id="export" className="header-button" pullRight disabled={activeBackgroundJobs}>
              <Dropdown.Toggle noCaret><i className="fa fa-file-excel-o" /></Dropdown.Toggle>
              <Dropdown.Menu>
                <MenuItem eventKey="1" onClick={this.handleExportImportTemplate}>
                  {hasBetaAccess ? 'Export Volume Driver Values' : 'Download Volume Driver Value Import Template'}
                </MenuItem>
                {hasBetaAccess && <MenuItem eventKey="2" onClick={this.handleShowCreateExportVolumeDriverValues}>
                  Export Volume Driver Values (All Sets)
                </MenuItem>
                }
              </Dropdown.Menu>
            </Dropdown>}
            {!hasBetaAccess && canImport && <Button disabled={activeBackgroundJobs} className="header-button" onClick={this.handleShowImportVolumeDriverValues}><i className="fa fa-plus" /></Button>}
            <GridConfigurationButton openSidebar={toggleVolumeDriverValuesGridConfigurationSidebar} closeSidebar={toggleVolumeDriverValuesGridConfigurationSidebar} showGridConfiguration={showGridConfiguration} />
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          {!params.id && <NavigationSidebar selectedNavigationGroup={hasBetaAccess ? navigationGroups.VOLUME_DRIVERS : navigationGroups.PROFILING} />}
          <MainContent loading={loading}>
            <div className={hasBetaAccess && 'volume-driver-values-grid-header-section'}>
              <div>
                {hasBetaAccess && <Select
                  id="volumeDriverValueSetId"
                  formGroupClassName="volume-driver-value-sets-selector"
                  onChange={this.handleSelectVolumeDriverValueSet}
                  value={selectedVolumeDriverValueSetId}
                  options={volumeDriverValueSets}
                  disabled={loading} />}
              </div>
              {this.setToggleColumnLock && !columns.first().get('lockable') &&
              <div className="column-lock-warning">
                <span className="text-danger">Note: Maximum {ALLOWED_MAX_COLUMN_LOCKS} columns can be locked</span>
              </div>}
            </div>
            <AutoSizer disableWidth>
              {({width, height}) => (
                <Tooltip openDelay={100} position="top" anchorElement="target">
                  <CustomizableGrid
                    data={pageOfVolumeDriverValues}
                    style={{width, height: height - dropdownHeight}}
                    sort={sort}
                    onSort={this.handleSort}
                    columns={columns}
                    onPageChange={this.handlePageChange}
                    filter={filter}
                    total={totalVolumeDriverValues}
                    skip={skip} take={take}
                    onFilter={this.handleFilter}
                    toggleColumnLock={this.setToggleColumnLock} toggleColumnVisibility={this.setToggleColumnVisibility}
                    onColumnReorder={this.handleReorderColumns}
                    showColumnContextMenu reorderable />
                </Tooltip>
              )}
            </AutoSizer>
          </MainContent>
          <GridConfigurationSidebar dropActionId={REORDER_VOLUME_DRIVER_VALUES_COLUMN} columns={columnsConfiguration}
            show={showGridConfiguration} toggleColumnVisibility={this.setToggleColumnVisibility} toggleColumnLock={this.setToggleColumnLock}
            handleResetGridConfiguration={this.setResetReorderedColumns} showResetGridConfiguration={showResetButton} />
          <PersistGridConfiguration gridId={VOLUME_DRIVER_VALUES_GRID} configuration={persistConfiguration} persist={persistGridConfiguration} retrieve={retrieveGridConfiguration}
            updateCachedConfiguration={updateCachedGridConfiguration} />
        </PageBody>
        <ImportVolumeDriverValuesModal />
        <VolumeDriverValuesImportValidationErrorsModal />
        <CreateExportRequestModal title="Export Volume Driver Values" onExportRequestCreated={this.handleExportRequest} />
        <ColumnReorderConfirmModal show={showColumnReorderConfirmModal} column={reorderedColumnDetail} onConfirm={this.handleConfirmColumnReorder} onCancel={cancelColumnReorder} processing={false} />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const canImportSelector = makeCurrentUserHasPermissionSelector(PROFILING_VOLUME_DRIVER_VALUES_IMPORT);
  const canExportSelector = makeCurrentUserHasPermissionSelector(PROFILING_VOLUME_DRIVER_VALUES_EXPORT);
  const volumeDriverValueSetsSelector = makeSelectListOptionsArraySelector(VOLUME_DRIVER_VALUE_SETS);
  const hasBetaAccessSelector = makeCurrentUserHasPermissionSelector(BETA_FEATURES_ACCESS);

  return {
    loading: loadingSelector(state),
    sort: sortSelector(state),
    skip: skipSelector(state),
    take: takeSelector(state),
    activeBackgroundJobs: activeBackgroundJobsSelector(state),
    backgroundJobStarted: backgroundJobStartedSelector(state),
    columnsConfiguration: columnsConfigurationSelector(state),
    data: dataSelector(state),
    pageOfVolumeDriverValues: tableDataSelector(state),
    filter: filterSelector(state),
    totalVolumeDriverValues: totalVolumeDriverValuesSelector(state),
    canImport: canImportSelector(state),
    canExport: canExportSelector(state),
    hideClearFiltersButton: hideClearFiltersButtonSelector(state),
    hideClearSortsButton: hideClearSortsButtonSelector(state),
    columns: columnsSelector(state),
    showGridConfiguration: showGridConfigurationSelector(state),
    showResetButton: showResetButtonSelector(state),
    showHiddenButton: showHiddenButtonSelector(state),
    hiddenColumns: hiddenColumnsSelector(state),
    showLockButton: showLockButtonSelector(state),
    selectedVolumeDriverValueSetId: selectedVolumeDriverValueSetIdSelector(state),
    volumeDriverValueSets: volumeDriverValueSetsSelector(state),
    hasBetaAccess: hasBetaAccessSelector(state),
    activeVolumeDriverValuesSetExportRequestBackgroundJob: activeVolumeDriverValuesSetExportRequestBackgroundJobSelector(state),
    showColumnReorderConfirmModal: showColumnReorderConfirmModalSelector(state),
    reorderedColumnDetail: reorderedColumnDetailSelector(state),
    lastReorderedColumnModel: lastReorderedColumnModelSelector(state),
    persistConfiguration: persistConfigurationSelector(state),
    cachedGridConfig: cachedGridConfigurationSelector(state),
    isVolumeDriverValuesLoaded: isVolumeDriverValuesLoadedSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    getVolumeDriverValues,
    importVolumeDriverValues,
    sortVolumeDriverValuesList,
    showImportVolumeDriverValues,
    pollBackgroundJobs,
    filterVolumeDriverValuesList,
    loadOrgHierarchyLevelsList,
    loadAllOrgHierarchyLevelOptionsList,
    pageVolumeDriverValueList,
    clearVolumeDriverValuesListFilters,
    clearVolumeDriverValuesListSorts,
    toggleVolumeDriverValuesColumnLock,
    toggleVolumeDriverValuesColumnVisibility,
    toggleVolumeDriverValuesGridConfigurationSidebar,
    resetVolumeDriverValuesColumns,
    reorderVolumeDriverValuesColumn,
    showHiddenVolumeDriverValuesColumns,
    loadVolumeDriverValuesColumns,
    resetLockedVolumeDriverValuesColumns,
    loadSelectListOptions,
    loadVolumeDriverValuesPage,
    showCreateExportRequest,
    createVolumeDriverValuesExportRequestBackgroundJob,
    cancelColumnReorder,
    persistGridConfiguration,
    retrieveGridConfiguration,
    updateCachedGridConfiguration,
  }
)(VolumeDriverValuesListPage));
