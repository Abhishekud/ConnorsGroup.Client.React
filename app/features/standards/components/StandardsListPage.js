import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {AutoSizer} from 'react-virtualized';
import {Dropdown, MenuItem} from 'react-bootstrap';
import {layout, navigationGroups, exportResponseText} from '../../shared/constants';
import {
  loadingSelector,
  pageOfStandardsSelector,
  totalStandardsSelector,
  sortSelector,
  filterSelector,
  skipSelector,
  takeSelector,
  standardStatesSelector,
  selectedStandardsSelector,
  showGridConfigurationSelector,
  columnConfigurationSelector,
  columnsSelector,
  standardsListSelector,
  persistConfigurationSelector,
  hideClearFiltersButtonSelector,
  hideClearSortsButtonSelector,
  isStandardDetailExportBackgroundJobSelector,
  activeBackgroundJobs,
  activeBulkDeleteBackgroundJobSelector,
  showHiddenButtonSelector,
  hiddenColumnsSelector,
  showLockButtonSelector,
  columnOrderSelector,
  showResetButtonSelector,
  lastReorderedColumnModelSelector,
  showColumnReorderConfirmModalSelector,
  reorderedColumnDetailSelector,
  isStandardsLoadedSelector,
  cachedGridConfigurationSelector,
  shouldLoadStandardsColumnsSelector,
} from '../selectors/pages/list';
import {
  createStandard,
  loadStandardsList,
  sortStandardsList,
  filterStandardsList,
  pageStandardsList,
  toggleStandardsListBulkEditSidebar,
  showCreateStandard,
  selectAllStandards,
  toggleSelectStandard,
  toggleGridConfigurationSidebar,
  toggleStandardsColumnVisibility,
  REORDER_STANDARDS_COLUMN,
  resetStandardsGridConfiguration,
  clearStandardsListFilters,
  clearStandardsListSorts,
  createStandardsDetailExportRequestBackgroundJob,
  toggleStandardsColumnLock,
  loadStandardsColumns,
  showHiddenStandardsColumns,
  resetLockedStandardsColumns,
  reorderStandardsColumn,
  cancelColumnReorder,
  loadStandardsPage,
} from '../actions';
import {
  TimeFormatSelector,
  CreateExportRequestModal,
  ColumnReorderConfirmModal,
} from '../../shared/components';
import {BulkEditButton} from '../../shared/components/buttons';
import {
  ClearFiltersButton,
  ClearHiddenColumnsButton,
  ClearSortsButton,
  CustomizableGrid,
  GridConfigurationButton,
  GridConfigurationSidebar,
  PersistGridConfiguration,
  ResetLockedColumnsButton,
} from '../../customizableGrid/components';
import {
  STANDARDS as STANDARDS_GRID,
} from '../../customizableGrid/constants/grids';
import {persistGridConfiguration, retrieveGridConfiguration, updateCachedGridConfiguration} from '../../customizableGrid/actions';
import {
  openSelector as bulkEditOpenSelector,
} from '../selectors/sidebars/bulkEditStandards';
import StandardsListBulkEditSidebar from './StandardsListBulkEditSidebar';
import {showCreateExportRequest, pollBackgroundJobs} from '../../shared/actions';
import {toggleIndustryStandardsList} from '../../industryStandards/actions';
import {showSelector} from '../../industryStandards/selectors/pages/list';
import {
  MainContent,
  NavigationSidebar,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../layout/components';
import {timeFormatSelector} from '../../shared/selectors/components/timeFormatSelector';
import IndustryStandardsListPage from '../../industryStandards/components/IndustryStandardsListPage';
import CreateStandardModal from './CreateStandardModal';
import React, {Component} from 'react';
import ExportStandardsButton from './ExportStandardsButton';
import DeleteSelectedStandardsModal from './DeleteSelectedStandardsModal';
import BulkDeleteStandardsRevisionsModal from './BulkDeleteStandardsRevisionsModal';
import {handleApiError, toastr, toggleLockReorderColumns, toggleVisibilityReorderColumns, getReorderedGridColumnDetails} from '../../shared/services';
import {INDUSTRY_TYPICAL_SOURCES} from '../../selectListOptions/constants/selectListTypes';
import {makeSelectListOptionsArraySelector} from '../../selectListOptions/selectors';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {STANDARDS_EDIT, STANDARDS_EXPORT} from '../../authentication/constants/permissions';

import BulkExportGenerator from './BulkExportGenerator';
import {generatingSelector as generatingReportSelector} from '../../pdfGeneration/selectors/components/generatePdfButton';
import {STANDARD_DETAILS_EXPORTER, POLL_INTERVAL} from '../../shared/constants/backgroundJobs';
import {Tooltip} from '@progress/kendo-react-tooltip';
import {ALLOWED_MAX_COLUMN_LOCKS} from '../../customizableGrid/constants/columnConfigurations';
import {getFilingFieldsAsSelectListOptions} from '../../selectListOptions/actions';

class StandardsListPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {router, appliedFilterValues, loadStandardsList, getFilingFieldsAsSelectListOptions} = this.props;
    getFilingFieldsAsSelectListOptions().then(() => {
      loadStandardsList(appliedFilterValues)
        .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the list of standards.', 'Error'));
    });

    this.checkBackgroundJobs();
    this.pollTimer = setInterval(this.checkBackgroundJobs, POLL_INTERVAL);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.columns.size !== this.props.columns.size || prevProps.isStandardsLoaded !== this.props.isStandardsLoaded ||
      prevProps.cachedGridConfig?.size !== this.props.cachedGridConfig?.size || this.props.shouldLoadStandardsColumns) {
      this.props.loadStandardsColumns(this.props.columns);
    }

    if (prevProps.showIndustryStandardsList !== this.props.showIndustryStandardsList) {
      this.props.loadStandardsPage();
    }
  }

  componentWillUnmount() {
    clearInterval(this.pollTimer);
    this.pollTimer = null;
  }

  handleSort({sort}) {
    this.props.sortStandardsList(sort);
  }

  handleFilter({filter}) {
    this.props.filterStandardsList(filter);
  }

  handleRowClick({dataItem, nativeEvent}) {
    const {router, toggleSelectStandard} = this.props;
    if (nativeEvent.target.previousSibling === null) {
      toggleSelectStandard(dataItem.id);
    } else {
      router.push(`/standards/${dataItem.id}`);
    }
  }

  handleToggleSelect({dataItem}) {
    const {toggleSelectStandard} = this.props;
    toggleSelectStandard(dataItem.id);
  }

  handleAddIndustryStandard() {
    this.props.toggleIndustryStandardsList();
  }

  handleExport(exportRequestId) {
    const {createStandardsDetailExportRequestBackgroundJob, isStandardDetailExportBackgroundJob, router} = this.props;
    if (isStandardDetailExportBackgroundJob) {
      createStandardsDetailExportRequestBackgroundJob(exportRequestId)
        .then(response => {
          if (response.value.data.backgroundedJob) {
            toastr.success(exportResponseText.SUCCESS, exportResponseText.SUCCESS_TITLE);
          } else {
            toastr.error(exportResponseText.FAILURE);
          }
        })
        .catch(error => handleApiError(error, router, 'An error occurred while attempting to export Standards.', 'Error'));
    } else {
      window.location.href = `${process.env.API_BASE_URL}standards/export/${exportRequestId}`;
    }
  }

  handleShowBulkEditPanel() {
    this.props.toggleStandardsListBulkEditSidebar();
  }

  handleSelectAll() {
    const {standardsList, selectedStandards, selectAllStandards} = this.props;
    selectAllStandards(standardsList.map(x => x.get('id')), Boolean(selectedStandards.size === 0));
  }

  handlePageChange(event) {
    this.props.pageStandardsList(event.page.skip);
  }

  toggleGridConfiguration() {
    const {toggleGridConfigurationSidebar} = this.props;
    toggleGridConfigurationSidebar();
  }

  handleClearFilters() {
    this.props.clearStandardsListFilters();
  }

  handleClearSorts() {
    this.props.clearStandardsListSorts();
  }

  checkBackgroundJobs() {
    const {pollBackgroundJobs} = this.props;
    pollBackgroundJobs([STANDARD_DETAILS_EXPORTER]);
  }

  setResetReorderedColumns() {
    const {loadStandardsColumns, resetStandardsGridConfiguration} = this.props;
    resetStandardsGridConfiguration().then(() => loadStandardsColumns(this.props.columns));
  }

  handleResetLockedColumns() {
    const {loadStandardsColumns, resetLockedStandardsColumns} = this.props;
    resetLockedStandardsColumns().then(() => loadStandardsColumns(this.props.columns));
  }

  handleShowHiddenColumns() {
    const {loadStandardsColumns, showHiddenStandardsColumns} = this.props;
    showHiddenStandardsColumns().then(() => loadStandardsColumns(this.props.columns));
  }

  handleReorderColumn(event) {
    const {columns, reorderStandardsColumn} = this.props;
    const reorderedColumnDetail = getReorderedGridColumnDetails(event, columns);
    if (!reorderedColumnDetail) return;
    const {columnKey, oldIndex, newIndex} = reorderedColumnDetail;
    reorderStandardsColumn(columnKey, oldIndex, newIndex);
  }

  handleConfirmColumnReorder() {
    const {reorderStandardsColumn, lastReorderedColumnModel} = this.props;
    reorderStandardsColumn(lastReorderedColumnModel.columnKey, lastReorderedColumnModel.oldIndex, lastReorderedColumnModel.newIndex);
  }

  setToggleColumnLock(field, lock) {
    const {columns, toggleStandardsColumnLock} = this.props;
    const finalColumnsList = toggleLockReorderColumns(field, lock, columns);
    toggleStandardsColumnLock(field, lock, finalColumnsList);
  }

  setToggleColumnVisibility(field, visibility) {
    const {columns, hiddenColumns, toggleStandardsColumnVisibility} = this.props;
    const {selectedColumn, columnsList} = toggleVisibilityReorderColumns(field, visibility, columns, hiddenColumns);
    toggleStandardsColumnVisibility(field, visibility, columnsList, selectedColumn);
  }

  render() {
    const {
      loading,
      pageOfStandards,
      totalStandards,
      showFilters,
      sort,
      filter,
      skip,
      take,
      showIndustryStandardsList,
      bulkEditSidebarShown,
      handleShowCreateStandard,
      selectedStandards,
      timeFormat,
      industrySources,
      showGridConfiguration,
      columns,
      gridConfiguration,
      persistGridConfiguration,
      retrieveGridConfiguration,
      persistConfiguration,
      canEdit,
      hideClearFiltersButton,
      hideClearSortsButton,
      generatingReport,
      canExport,
      activeBackgroundJobs,
      showLockButton,
      showHiddenButton,
      showResetButton,
      activeBulkDeleteBackgroundJob,
      showColumnReorderConfirmModal,
      reorderedColumnDetail,
      cancelColumnReorder,
      isStandardDetailExportBackgroundJob,
      updateCachedGridConfiguration,
    } = this.props;

    if (showIndustryStandardsList) {
      return <IndustryStandardsListPage />;
    }
    let sidebarsShown = showFilters ? 1 : 0;
    sidebarsShown += bulkEditSidebarShown ? 1 : 0;

    const stds = pageOfStandards.map(std => std.set('timeUnit', timeFormat));
    let recalcStatus = null;
    if (activeBackgroundJobs) {
      recalcStatus = <Tooltip openDelay={100} position="bottom" anchorElement="target"><i className="fa fa-spinner fa-spin" title="Export in progress" /></Tooltip>;
    }
    if (activeBulkDeleteBackgroundJob) {
      recalcStatus = <Tooltip openDelay={100} position="bottom" anchorElement="target"><i className="fa fa-spinner fa-spin" title="Revision delete is in-progress" /></Tooltip>;
    }

    return (
      <Page pageClassName="standards-list-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Standards</PageTitle>
          <PageHeaderActions>
            <ClearFiltersButton hide={hideClearFiltersButton} onClear={this.handleClearFilters} />
            <ClearSortsButton hide={hideClearSortsButton} onClear={this.handleClearSorts} />
            <ResetLockedColumnsButton hide={showLockButton} onClear={this.handleResetLockedColumns} />
            <ClearHiddenColumnsButton hide={showHiddenButton} onClear={this.handleShowHiddenColumns} />
            {canEdit && <BulkEditButton isVisible={selectedStandards.size > 0} isOpen={bulkEditSidebarShown} onClick={this.handleShowBulkEditPanel} />}
            {selectedStandards.size > 0 && canExport && (<BulkExportGenerator generating={generatingReport} canExport={canExport} />)}
            {recalcStatus}
            <ExportStandardsButton disableExportDetails={activeBackgroundJobs} />

            {canEdit && (
              <Dropdown id="add" className="header-button btn-default" pullRight>
                <Dropdown.Toggle noCaret>
                  <i className="fa fa-plus" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <MenuItem eventKey="1" disabled={industrySources.length === 0} onClick={industrySources.length === 0 ? null : this.handleAddIndustryStandard}>Existing Industry
                    Standard</MenuItem>
                  <MenuItem eventKey="2" onClick={handleShowCreateStandard}>New Standard</MenuItem>
                </Dropdown.Menu>
              </Dropdown>
            )}
            <TimeFormatSelector />
            <GridConfigurationButton openSidebar={this.toggleGridConfiguration} closeSidebar={this.toggleGridConfiguration} showGridConfiguration={showGridConfiguration} />
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.STANDARDS} />
          <MainContent loading={loading}>
            {this.setToggleColumnLock && !columns.first().get('lockable') &&
            <div className="column-lock-warning">
              <span className="text-danger">Note: Maximum {ALLOWED_MAX_COLUMN_LOCKS} columns can be locked</span>
            </div>}
            <AutoSizer>
              {({width, height}) => (
                <CustomizableGrid
                  data={stds} total={totalStandards}
                  style={{width: width + (sidebarsShown * layout.SIDEBAR_WIDTH), height}}
                  onRowClick={this.handleRowClick} onSelectedChange={this.handleToggleSelect}
                  onHeaderSelectedChange={this.handleSelectAll}
                  columns={columns} sort={sort} onSort={this.handleSort}
                  filter={filter} onFilter={this.handleFilter} onPageChange={this.handlePageChange} skip={skip} take={take}
                  toggleColumnLock={this.setToggleColumnLock} toggleColumnVisibility={this.setToggleColumnVisibility}
                  onColumnReorder={this.handleReorderColumn}
                  showColumnContextMenu reorderable />
              )}
            </AutoSizer>
          </MainContent>
          <StandardsListBulkEditSidebar />
          <GridConfigurationSidebar dropActionId={REORDER_STANDARDS_COLUMN}
            columns={gridConfiguration} show={showGridConfiguration}
            toggleColumnVisibility={this.setToggleColumnVisibility}
            toggleColumnLock={this.setToggleColumnLock}
            handleResetGridConfiguration={this.setResetReorderedColumns}
            showResetGridConfiguration={showResetButton} />
          <PersistGridConfiguration gridId={STANDARDS_GRID} configuration={persistConfiguration} persist={persistGridConfiguration} retrieve={retrieveGridConfiguration}
            updateCachedConfiguration={updateCachedGridConfiguration} />
        </PageBody>
        <CreateStandardModal />
        <DeleteSelectedStandardsModal />
        <BulkDeleteStandardsRevisionsModal />
        <CreateExportRequestModal title="Export Standards" onExportRequestCreated={this.handleExport} />
        <ColumnReorderConfirmModal show={showColumnReorderConfirmModal}
          column={reorderedColumnDetail} onConfirm={this.handleConfirmColumnReorder}
          onCancel={cancelColumnReorder} processing={false} />
        <CreateExportRequestModal title={isStandardDetailExportBackgroundJob ? 'Export Standard Details' : 'Export Standards'} onExportRequestCreated={this.handleExport} />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const industrySourcesSelector = makeSelectListOptionsArraySelector(INDUSTRY_TYPICAL_SOURCES);
  const canEditSelector = makeCurrentUserHasPermissionSelector(STANDARDS_EDIT);
  const canExportSelector = makeCurrentUserHasPermissionSelector(STANDARDS_EXPORT);
  return {
    loading: loadingSelector(state),
    pageOfStandards: pageOfStandardsSelector(state),
    standardsList: standardsListSelector(state),
    sort: sortSelector(state),
    filter: filterSelector(state),
    skip: skipSelector(state),
    take: takeSelector(state),
    totalStandards: totalStandardsSelector(state),
    showIndustryStandardsList: showSelector(state),
    timeFormat: timeFormatSelector(state),
    bulkEditSidebarShown: bulkEditOpenSelector(state),
    selectedStandards: selectedStandardsSelector(state),
    standardStates: standardStatesSelector(state),
    industrySources: industrySourcesSelector(state),
    showGridConfiguration: showGridConfigurationSelector(state),
    columns: columnsSelector(state),
    gridConfiguration: columnConfigurationSelector(state),
    persistConfiguration: persistConfigurationSelector(state),
    canEdit: canEditSelector(state),
    hideClearFiltersButton: hideClearFiltersButtonSelector(state),
    hideClearSortsButton: hideClearSortsButtonSelector(state),
    generatingReport: generatingReportSelector(state),
    canExport: canExportSelector(state),
    isStandardDetailExportBackgroundJob: isStandardDetailExportBackgroundJobSelector(state),
    activeBackgroundJobs: activeBackgroundJobs(state),
    showHiddenButton: showHiddenButtonSelector(state),
    hiddenColumns: hiddenColumnsSelector(state),
    showLockButton: showLockButtonSelector(state),
    columnOrder: columnOrderSelector(state),
    showResetButton: showResetButtonSelector(state),
    activeBulkDeleteBackgroundJob: activeBulkDeleteBackgroundJobSelector(state),
    lastReorderedColumnModel: lastReorderedColumnModelSelector(state),
    showColumnReorderConfirmModal: showColumnReorderConfirmModalSelector(state),
    reorderedColumnDetail: reorderedColumnDetailSelector(state),
    isStandardsLoaded: isStandardsLoadedSelector(state),
    cachedGridConfig: cachedGridConfigurationSelector(state),
    shouldLoadStandardsColumns: shouldLoadStandardsColumnsSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadStandardsList,
    sortStandardsList,
    filterStandardsList,
    pageStandardsList,
    createStandard,
    toggleIndustryStandardsList,
    handleShowCreateStandard: showCreateStandard,
    showCreateExportRequest,
    toggleStandardsListBulkEditSidebar,
    selectAllStandards,
    toggleSelectStandard,
    toggleGridConfigurationSidebar,
    toggleStandardsColumnVisibility,
    persistGridConfiguration,
    retrieveGridConfiguration,
    resetStandardsGridConfiguration,
    clearStandardsListFilters,
    clearStandardsListSorts,
    createStandardsDetailExportRequestBackgroundJob,
    pollBackgroundJobs,
    toggleStandardsColumnLock,
    loadStandardsColumns,
    showHiddenStandardsColumns,
    resetLockedStandardsColumns,
    reorderStandardsColumn,
    cancelColumnReorder,
    getFilingFieldsAsSelectListOptions,
    updateCachedGridConfiguration,
    loadStandardsPage,
  }
)(StandardsListPage));
