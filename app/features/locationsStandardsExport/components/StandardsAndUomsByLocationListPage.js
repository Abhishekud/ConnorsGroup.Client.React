import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import moment from 'moment';
import {AutoSizer} from 'react-virtualized';
import _, {debounce} from 'lodash';
import pluralize from 'pluralize';
import {
  MainContent,
  NavigationSidebar,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../layout/components';
import {navigationGroups, exportResponseText} from '../../shared/constants';
import {
  REORDER_LOCATIONS_STANDARDS_EXPORT_COLUMN,
  loadContinuousLaborCalculationLocationsStandardsExportList,
  filterLocationsStandardsExportList,
  showExportLocationsStandardsByDate,
  pageLocationsStandardsExportList,
  toggleLocationsStandardsExportGridConfigurationSidebar,
  toggleLocationsStandardsExportColumnVisibility,
  setLocationsStandardsDataSource,
  clearLocationsStandardsExportListFilters,
  loadContinuousLaborCalculationLocationsStandardsExportCount,
  toggleLocationsStandardsExportColumnLock,
  resetLocationsStandardsExportColumns,
  createLocationStandardsExportRequestBackgroundJob,
  resetLockedLocationsStandardsExportColumns,
  showHiddenLocationsStandardsExportColumns,
  loadLocationStandardsExportColumns,
  reorderLocationsStandardsExportColumn,
  cancelColumnReorder,
  loadLocationsStandardsExportPage,
  toggleSaveCachedGridConfig,
  setIsExportStandardsAndVolumeDriversByLocationsRequest,
  createExportStandardsAndVolumeDriversByLocationsRequestBackgroundJob,
} from '../actions';
import {loadOrgHierarchyLevelsList} from '../../orgHierarchyLevels/actions';
import {
  loadingSelector,
  activeBackgroundJobsSelector,
  backgroundJobStartedSelector,
  totalRowsSelector,
  totalLoadedSelector,
  locationsStandardsExportListSelector,
  columnsSelector,
  columnConfigurationSelector,
  skipSelector,
  takeSelector,
  filterSelector,
  showGridConfigurationSelector,
  continuousCalculationTimestampSelector,
  dataSourceSelector,
  hideClearFiltersButtonSelector,
  loadingCountSelector,
  showResetButtonSelector,
  showLockButtonSelector,
  showHiddenButtonSelector,
  hiddenColumnsSelector,
  showColumnReorderConfirmModalSelector,
  reorderedColumnDetailSelector,
  lastReorderedColumnModelSelector,
  persistConfigurationSelector,
  cachedGridConfigurationSelector,
  isLocationsStandardsExportLoadedSelector,
  shouldLoadLocationsStandardsColumnsSelector,
  isExportStandardsAndVolumeDriversByLocationsRequestSelector,
  backgroundJobStatusSelector,
} from '../selectors/pages/list';
import {handleApiError, toastr, makeClasses, getReorderedGridColumnDetails, toggleLockReorderColumns, toggleVisibilityReorderColumns} from '../../shared/services';
import {withRouter} from 'react-router';
import {
  locationNameSelector,
  departmentNameSelector,
  configurationKronosVersion,
} from '../../shared/selectors/components/settings';
import {timeFormatSelector} from '../../shared/selectors/components/timeFormatSelector';
import {CreateExportRequestModal, TimeFormatSelector, ColumnReorderConfirmModal} from '../../shared/components';
import {showCreateExportRequest, pollBackgroundJobs} from '../../shared/actions';
import {ExportDropDown, DataSourceDropDown} from './';
import {DEBOUNCE_TIMEOUT} from '../../shared/constants/debounceTimeout';
import {
  POLL_INTERVAL,
  LOCATIONS_STANDARDS,
  CALCULATE_LABOR,
  LOCATION_STANDARDS_EXPORTER,
  STANDARDS_AND_VOLUME_DRIVERS_BY_LOCATIONS_EXPORTER,
  backgroundJobTitleText,
} from '../../shared/constants/backgroundJobs';
import {
  ClearFiltersButton,
  ClearHiddenColumnsButton,
  CustomizableGrid,
  GridConfigurationButton,
  GridConfigurationSidebar,
  PersistGridConfiguration,
  ResetLockedColumnsButton,
} from '../../customizableGrid/components';
import {DRAFT, PRODUCTION} from '../constants/DataSources';
import {exportLocationsStandardsToTumbleweed} from '../actions/exportLocationsStandardsToTumbleweed';
import {DRAFT as DRAFT_STANDARDS, PRODUCTION as PRODUCTION_STANDARDS} from '../../standards/constants/standardStatuses';
import {ALLOWED_MAX_COLUMN_LOCKS} from '../../customizableGrid/constants/columnConfigurations';
import {persistGridConfiguration, retrieveGridConfiguration, updateCachedGridConfiguration} from '../../customizableGrid/actions';
import {
  LOCATIONS_STANDARDS_EXPORT as LOCATIONS_STANDARDS_EXPORT_GRID,
} from '../../customizableGrid/constants/grids';
import {
  STANDARDS_AND_UOM_BY_LOCATION_EXPORT,
  TUMBLEWEED_STANDARDS_AND_UOM_BY_LOCATION_DRAFT_EXPORT,
  TUMBLEWEED_STANDARDS_AND_UOM_BY_LOCATION_PRODUCTION_EXPORT,
} from '../../authentication/constants/permissions';
import makeCurrentUserHasPermissionSelector from '../../authentication/selectors/currentUser/makeCurrentUserHasPermissionSelector';
import {STANDARDS_AND_VOLUME_DRIVERS_BY_LOCATIONS} from '../constants/outputTypes';

function PartialDataMessage({loadedCount, totalCount, locationName, lockedColumnsLimitReached}) {
  const classes = makeClasses({'partial-list': lockedColumnsLimitReached});
  // Only after reaching max locked columns limit , we need to apply partial-list class for formatting
  if (loadedCount === totalCount) return null;

  return (<div className={classes}>
    {`Showing ${loadedCount} of ${totalCount} possible ${locationName} Standards Export rows.`}
  </div>);
}

function BackgroundJobStatusMessage({activeBackgroundJobs, backgroundJobStatus, maxCreatedTimestamp}) {

  let activeBackgroundJobTitle = '';

  if (activeBackgroundJobs) {
    Object.entries(backgroundJobStatus).forEach(([key, value]) => {
      if (value) {
        activeBackgroundJobTitle += (activeBackgroundJobTitle.length ? ', ' : '') + backgroundJobTitleText(key);
      }
    });
    return <i className="fa fa-spinner fa-spin" title={`${activeBackgroundJobTitle} in progress`} />;
  } else if (maxCreatedTimestamp) {
    return <div className="generated-timestamp">Last Updated: {moment(maxCreatedTimestamp).local().format('L LT')}</div>;
  }
  return null;
}

class StandardsAndUomsByLocationListPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
    this.requestList = debounce(this.requestList, DEBOUNCE_TIMEOUT);
  }

  componentDidMount() {
    const {router, locationName, loadOrgHierarchyLevelsList, filter, params} = this.props;
    const dataSource = this.labelToDataSource(params.outputType);
    this.props.setLocationsStandardsDataSource(dataSource);
    loadOrgHierarchyLevelsList()
      .then(() => {
        const {loadLocationsStandardsExportList, router, locationName, loadLocationsStandardsExportCount, loadLocationStandardsExportColumns} = this.props;
        loadLocationsStandardsExportCount(dataSource, filter);
        loadLocationsStandardsExportList(dataSource, filter).then(() =>
          loadLocationStandardsExportColumns(this.props.columns)
        ).catch(error => handleApiError(error, router, `An error occurred while attempting to load the ${pluralize(locationName)} Standards Export data.`, 'Error'));
      })
      .catch(error => handleApiError(error, router, `An error occurred while attempting to load the ${pluralize(locationName)} Standards Export data.`, 'Error'));
    this.checkBackgroundJobs();
    this.pollTimer = setInterval(this.checkBackgroundJobs, POLL_INTERVAL);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isLocationsStandardsExportLoaded !== this.props.isLocationsStandardsExportLoaded ||
      prevProps.cachedGridConfig?.size !== this.props.cachedGridConfig?.size || this.props.shouldLoadLocationsStandardsColumns) {
      this.props.loadLocationStandardsExportColumns(this.props.columns);
    }

    if (!_.isEqual(prevProps?.filter, this.props?.filter)) {
      this.requestList();
    }
  }

  componentWillUnmount() {
    clearInterval(this.pollTimer);
    this.pollTimer = null;
  }

  checkBackgroundJobs() {
    this.props.pollBackgroundJobs([LOCATIONS_STANDARDS, CALCULATE_LABOR, LOCATION_STANDARDS_EXPORTER, STANDARDS_AND_VOLUME_DRIVERS_BY_LOCATIONS_EXPORTER])
      .then(() => {
        const {activeBackgroundJobs, wasCalculatingLabor} = this.props;

        if (!activeBackgroundJobs && wasCalculatingLabor) {
          this.requestList();
        }
      });
  }

  handleShowCreateExportRequest(event) {
    const {timeFormat, showCreateExportRequest, filter, setIsExportStandardsAndVolumeDriversByLocationsRequest} = this.props;
    if (event.target.type === STANDARDS_AND_VOLUME_DRIVERS_BY_LOCATIONS) {
      setIsExportStandardsAndVolumeDriversByLocationsRequest(true);
    } else {
      setIsExportStandardsAndVolumeDriversByLocationsRequest(false);
    }
    showCreateExportRequest(filter, timeFormat);
  }

  handleExportRequest(exportRequestId) {

    const {createLocationStandardsExportRequestBackgroundJob, router, dataSource, isExportStandardsAndVolumeDriversByLocationsRequest, createExportStandardsAndVolumeDriversByLocationsRequestBackgroundJob} = this.props;

    if (isExportStandardsAndVolumeDriversByLocationsRequest) {
      createExportStandardsAndVolumeDriversByLocationsRequestBackgroundJob(dataSource, exportRequestId)
        .then(response => {
          if (response.value.data.backgroundedJob) {
            toastr.success(exportResponseText.SUCCESS, exportResponseText.SUCCESS_TITLE);
          } else {
            toastr.error(exportResponseText.FAILURE);
          }
        })
        .catch(error => {
          let errorMessage = 'An error occurred while attempting to export Standards & Volume Drivers by Locations.';
          if (error.response.status === 500) {
            errorMessage = error.response.data.exceptionMessage;
          }
          handleApiError(error, router, errorMessage, 'Error');
        });
    } else {
      createLocationStandardsExportRequestBackgroundJob(dataSource, exportRequestId)
        .then(response => {
          if (response.value.data.backgroundedJob) {
            toastr.success(exportResponseText.SUCCESS, exportResponseText.SUCCESS_TITLE);
          } else {
            toastr.error(exportResponseText.FAILURE);
          }
        })
        .catch(error => {
          let errorMessage = 'An error occurred while attempting to export Standards & UOMs by Locations.';
          if (error.response.status === 500) {
            errorMessage = error.response.data.exceptionMessage;
          }
          handleApiError(error, router, errorMessage, 'Error');
        });
    }
  }

  setToggleColumnLock(field, lock) {
    const {columns, toggleLocationsStandardsExportColumnLock} = this.props;
    const finalColumnsList = toggleLockReorderColumns(field, lock, columns);
    toggleLocationsStandardsExportColumnLock(field, lock, finalColumnsList);
  }

  handleResetLockedColumns() {
    const {loadLocationStandardsExportColumns, resetLockedLocationsStandardsExportColumns} = this.props;
    resetLockedLocationsStandardsExportColumns().then(() => loadLocationStandardsExportColumns(this.props.columns));
  }

  setToggleColumnVisibility(field, visibility) {
    const {columns, hiddenColumns, toggleLocationsStandardsExportColumnVisibility} = this.props;
    const {selectedColumn, columnsList} = toggleVisibilityReorderColumns(field, visibility, columns, hiddenColumns);
    toggleLocationsStandardsExportColumnVisibility(field, visibility, columnsList, selectedColumn)
      .then(() => this.requestList());
  }

  setResetReorderedColumns() {
    const {loadLocationStandardsExportColumns, resetLocationsStandardsExportColumns} = this.props;
    resetLocationsStandardsExportColumns().then(() => {
      loadLocationStandardsExportColumns(this.props.columns);
      this.requestList();
    });
  }

  handlePaging({page}) {
    const {pageLocationsStandardsExportList} = this.props;
    pageLocationsStandardsExportList(page.skip);
  }

  handleFilter({filter}) {
    const {filterLocationsStandardsExportList} = this.props;
    return filterLocationsStandardsExportList(filter)
      .then(() => {
        this.requestList();
      });
  }

  handleDataSourceChange(dataSource) {
    const {
      setLocationsStandardsDataSource, router, toggleSaveCachedGridConfig} = this.props;
    toggleSaveCachedGridConfig().then(() => {
      setLocationsStandardsDataSource(dataSource);
      this.requestList();
      router.push(`/locations-standards-export/${this.dataSourceToLabel(dataSource)}`);
    });
  }

  dataSourceToLabel(dataSource) {
    switch (dataSource) {
      case PRODUCTION:
        return PRODUCTION_STANDARDS;
      default:
        return DRAFT_STANDARDS;
    }
  }

  labelToDataSource(label) {
    switch (label) {
      case PRODUCTION_STANDARDS:
        return PRODUCTION;
      default:
        return DRAFT;
    }
  }

  requestList() {
    const {loadLocationsStandardsExportList, router, locationName, loadLocationsStandardsExportCount, loadLocationsStandardsExportPage, dataSource, filter} = this.props;
    loadLocationsStandardsExportPage();
    loadLocationsStandardsExportCount(dataSource, filter);
    loadLocationsStandardsExportList(dataSource, filter).catch(error => handleApiError(error, router, `An error occurred while attempting to load the ${pluralize(locationName)} Standards Export data.`, 'Error'));
  }

  handleClearFilters() {
    this.props.clearLocationsStandardsExportListFilters();
    this.requestList();
  }

  handleShowHiddenColumns() {
    const {loadLocationStandardsExportColumns, showHiddenLocationsStandardsExportColumns} = this.props;
    showHiddenLocationsStandardsExportColumns().then(() => loadLocationStandardsExportColumns(this.props.columns));
  }

  handleReorderColumn(event) {
    const {reorderLocationsStandardsExportColumn, columns} = this.props;
    const reorderedColumnDetail = getReorderedGridColumnDetails(event, columns);
    if (!reorderedColumnDetail) return;
    const {columnKey, oldIndex, newIndex} = reorderedColumnDetail;
    reorderLocationsStandardsExportColumn(columnKey, oldIndex, newIndex);
  }

  handleConfirmColumnReorder() {
    const {reorderLocationsStandardsExportColumn, lastReorderedColumnModel} = this.props;
    reorderLocationsStandardsExportColumn(lastReorderedColumnModel.columnKey, lastReorderedColumnModel.oldIndex, lastReorderedColumnModel.newIndex);
  }

  handleExportTumbleweedRequest() {
    const {filter, dataSource, exportLocationsStandardsToTumbleweed} = this.props;
    exportLocationsStandardsToTumbleweed(dataSource, filter)
      .then(() => toastr.success('The export request has been submitted.', 'Request submitted'));
  }

  render() {
    const {
      loading,
      filter,
      skip,
      take,
      listData,
      totalRows,
      totalLoaded,
      columns,
      locationName,
      activeBackgroundJobs,
      showGridConfiguration,
      gridConfiguration,
      maxCreatedTimestamp,
      dataSource,
      canExport,
      canExportTumbleweedDraft,
      canExportTumbleweedProduction,
      hideClearFiltersButton,
      kronosVersion,
      loadingCount,
      showResetButton,
      showLockButton,
      showHiddenButton,
      toggleLocationsStandardsExportGridConfigurationSidebar,
      cancelColumnReorder,
      reorderedColumnDetail,
      showColumnReorderConfirmModal,
      persistConfiguration,
      persistGridConfiguration,
      retrieveGridConfiguration,
      updateCachedGridConfiguration,
      backgroundJobStatus,
    } = this.props;

    let totalCountText = null;
    if (loadingCount) {
      totalCountText = <i className="fa fa-spinner fa-spin" title="Loading total count" />;
    } else {
      totalCountText = <PartialDataMessage loadedCount={totalLoaded} totalCount={totalRows} locationName={locationName} lockedColumnsLimitReached={columns.first().get('lockable')} />;
    }
    const disableExportActions = totalRows === 0 || activeBackgroundJobs;
    const heightDifference = totalLoaded < totalRows ? 30 : 0;
    const canExportTumbleweed = (dataSource === DRAFT && canExportTumbleweedDraft) || (dataSource === PRODUCTION && canExportTumbleweedProduction);

    return (
      <Page pageClassName="locations-standards-export-list-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Labor Standards Model Output</PageTitle>
          <PageHeaderActions>
            <BackgroundJobStatusMessage activeBackgroundJobs={activeBackgroundJobs} backgroundJobStatus={backgroundJobStatus} maxCreatedTimestamp={maxCreatedTimestamp} />
            <ClearFiltersButton hide={hideClearFiltersButton} onClear={this.handleClearFilters} />
            <ResetLockedColumnsButton hide={showLockButton} onClear={this.handleResetLockedColumns} />
            <ClearHiddenColumnsButton hide={showHiddenButton} onClear={this.handleShowHiddenColumns} />
            <TimeFormatSelector />
            <DataSourceDropDown disabled={loading} onDataSourceChange={this.handleDataSourceChange} selectedDataSource={dataSource} />
            {(canExport || canExportTumbleweed) &&
              <ExportDropDown disabled={disableExportActions} onExportRequest={this.handleShowCreateExportRequest} onExportRequestByDate={this.handleShowCreateExportRequest}
                kronosVersion={kronosVersion} onExportTumbleweedRequest={this.handleExportTumbleweedRequest} canExportTumbleweed={canExportTumbleweed} locationName={locationName} />}
            <GridConfigurationButton openSidebar={toggleLocationsStandardsExportGridConfigurationSidebar} closeSidebar={toggleLocationsStandardsExportGridConfigurationSidebar} showGridConfiguration={showGridConfiguration} />
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.OUTPUTS} />
          <MainContent loading={loading}>
            {totalCountText}
            { this.setToggleColumnLock && !columns.first().get('lockable') &&
            <div className="column-lock-warning">
              <h5 className="text-danger">Note: Maximum {ALLOWED_MAX_COLUMN_LOCKS} columns can be locked</h5>
            </div>}
            <AutoSizer>
              {({height, width}) => (
                <CustomizableGrid data={listData} total={totalLoaded} onPageChange={this.handlePaging}
                  columns={columns} skip={skip} take={take} style={{height: height - heightDifference, width}}
                  filter={filter} onFilter={this.handleFilter}
                  toggleColumnLock={this.setToggleColumnLock}
                  toggleColumnVisibility={this.setToggleColumnVisibility}
                  onColumnReorder={this.handleReorderColumn}
                  showColumnContextMenu
                  reorderable />
              )}
            </AutoSizer>
          </MainContent>
          <CreateExportRequestModal title={`Export ${pluralize(locationName)} Standards`} onExportRequestCreated={this.handleExportRequest} />
          <GridConfigurationSidebar dropActionId={REORDER_LOCATIONS_STANDARDS_EXPORT_COLUMN} columns={gridConfiguration} show={showGridConfiguration}
            toggleColumnVisibility={this.setToggleColumnVisibility} toggleColumnLock={this.setToggleColumnLock}
            handleResetGridConfiguration={this.setResetReorderedColumns} showResetGridConfiguration={showResetButton} />
          <ColumnReorderConfirmModal show={showColumnReorderConfirmModal}
            column={reorderedColumnDetail} onConfirm={this.handleConfirmColumnReorder}
            onCancel={cancelColumnReorder} processing={false} />
          <PersistGridConfiguration gridId={LOCATIONS_STANDARDS_EXPORT_GRID} configuration={persistConfiguration}
            persist={persistGridConfiguration} retrieve={retrieveGridConfiguration} updateCachedConfiguration={updateCachedGridConfiguration} />
        </PageBody>
      </Page>
    );
  }
}


StandardsAndUomsByLocationListPage.propTypes = {
  canExport: PropTypes.bool,
};

function mapStateToProps(state) {
  const canExportSelector = makeCurrentUserHasPermissionSelector(STANDARDS_AND_UOM_BY_LOCATION_EXPORT);
  const canExportTumbleweedDraftSelector = makeCurrentUserHasPermissionSelector(TUMBLEWEED_STANDARDS_AND_UOM_BY_LOCATION_DRAFT_EXPORT);
  const canExportTumbleweedProductionSelector = makeCurrentUserHasPermissionSelector(TUMBLEWEED_STANDARDS_AND_UOM_BY_LOCATION_PRODUCTION_EXPORT);

  return {
    loading: loadingSelector(state),
    listData: locationsStandardsExportListSelector(state),
    totalRows: totalRowsSelector(state),
    totalLoaded: totalLoadedSelector(state),
    skip: skipSelector(state),
    take: takeSelector(state),
    filter: filterSelector(state),
    columns: columnsSelector(state),
    locationName: locationNameSelector(state),
    departmentName: departmentNameSelector(state),
    timeFormat: timeFormatSelector(state),
    activeBackgroundJobs: activeBackgroundJobsSelector(state),
    wasCalculatingLabor: backgroundJobStartedSelector(state),
    showGridConfiguration: showGridConfigurationSelector(state),
    gridConfiguration: columnConfigurationSelector(state),
    maxCreatedTimestamp: continuousCalculationTimestampSelector(state),
    dataSource: dataSourceSelector(state),
    hideClearFiltersButton: hideClearFiltersButtonSelector(state),
    kronosVersion: configurationKronosVersion(state),
    loadingCount: loadingCountSelector(state),
    showResetButton: showResetButtonSelector(state),
    showLockButton: showLockButtonSelector(state),
    showHiddenButton: showHiddenButtonSelector(state),
    hiddenColumns: hiddenColumnsSelector(state),
    showColumnReorderConfirmModal: showColumnReorderConfirmModalSelector(state),
    reorderedColumnDetail: reorderedColumnDetailSelector(state),
    lastReorderedColumnModel: lastReorderedColumnModelSelector(state),
    persistConfiguration: persistConfigurationSelector(state),
    cachedGridConfig: cachedGridConfigurationSelector(state),
    isLocationsStandardsExportLoaded: isLocationsStandardsExportLoadedSelector(state),
    shouldLoadLocationsStandardsColumns: shouldLoadLocationsStandardsColumnsSelector(state),
    isExportStandardsAndVolumeDriversByLocationsRequest: isExportStandardsAndVolumeDriversByLocationsRequestSelector(state),
    backgroundJobStatus: backgroundJobStatusSelector(state),
    canExport: canExportSelector(state),
    canExportTumbleweedDraft: canExportTumbleweedDraftSelector(state),
    canExportTumbleweedProduction: canExportTumbleweedProductionSelector(state),
  };
}

const mapDispatchToProps = {
  loadLocationsStandardsExportList: loadContinuousLaborCalculationLocationsStandardsExportList,
  filterLocationsStandardsExportList,
  showCreateExportRequest,
  showExportLocationsStandardsByDate,
  pollBackgroundJobs,
  pageLocationsStandardsExportList,
  toggleLocationsStandardsExportGridConfigurationSidebar,
  toggleLocationsStandardsExportColumnVisibility,
  loadOrgHierarchyLevelsList,
  loadLocationStandardsExportColumns,
  setLocationsStandardsDataSource,
  clearLocationsStandardsExportListFilters,
  exportLocationsStandardsToTumbleweed,
  loadLocationsStandardsExportCount: loadContinuousLaborCalculationLocationsStandardsExportCount,
  toggleLocationsStandardsExportColumnLock,
  resetLocationsStandardsExportColumns,
  createLocationStandardsExportRequestBackgroundJob,
  resetLockedLocationsStandardsExportColumns,
  showHiddenLocationsStandardsExportColumns,
  reorderLocationsStandardsExportColumn,
  cancelColumnReorder,
  persistGridConfiguration,
  retrieveGridConfiguration,
  updateCachedGridConfiguration,
  loadLocationsStandardsExportPage,
  toggleSaveCachedGridConfig,
  setIsExportStandardsAndVolumeDriversByLocationsRequest,
  createExportStandardsAndVolumeDriversByLocationsRequestBackgroundJob,
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(StandardsAndUomsByLocationListPage));
