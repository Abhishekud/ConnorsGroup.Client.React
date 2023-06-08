import _ from 'lodash';
import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {PropTypes} from 'prop-types';
import {AutoSizer} from 'react-virtualized';
import {GridEditCell} from '@progress/kendo-react-grid';
import {List, Map} from 'immutable';
import {Dropdown, MenuItem} from 'react-bootstrap';
import moment from 'moment';
import {
  ClearFiltersButton,
  ClearHiddenColumnsButton,
  ClearSortsButton,
  CustomizableGrid,
  GridConfigurationButton,
  GridConfigurationSidebar,
  PersistGridConfiguration,
  ResetLockedColumnsButton,
} from '../../../customizableGrid/components';
import {handleApiError, toastr, toggleLockReorderColumns, toggleVisibilityReorderColumns, getReorderedGridColumnDetails, exportDownloader} from '../../../shared/services';
import {showCreateExportRequest, pollBackgroundJobs} from '../../../shared/actions';
import {POLL_INTERVAL, CALCULATE_LABOR} from '../../../shared/constants/backgroundJobs';
import {
  MainContent,
  NavigationSidebar,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../../layout/components';
import {/*layout,*/navigationGroups, exportResponseText} from '../../../shared/constants';
import {BulkEditButton} from '../../../shared/components/buttons';
import {ColumnReorderConfirmModal, CreateExportRequestModal} from '../../../shared/components';
import {KronosEndpointSelect} from '../../shared/components';
import makeCurrentUserHasPermissionSelector from '../../../authentication/selectors/currentUser/makeCurrentUserHasPermissionSelector';
import {
  KRONOS_LABOR_STANDARDS_EDIT,
  KRONOS_LABOR_STANDARDS_EXPORT,
  KRONOS_LABOR_STANDARDS_PUSH,
  KRONOS_WIM_EXPORT,
  TUMBLEWEED_KRONOS_WIM_EXPORT,
  BETA_FEATURES_ACCESS,
} from '../../../authentication/constants/permissions';
import {
  loadLaborStandardsList,
  submitLaborStandardsIntegrationRequest,
  submitWimEmailExportRequest,
  submitWimTumbleweedExportRequest,
  submitWimKronosEmailExportRequest,
  submitWimKronosEmailExportRequestWithHashes,
  submitWimKronosTumbleweedExportRequest,
  submitWimKronosTumbleweedExportRequestWithHashes,
  submitAllLaborStandardsIntegrationRequest,
  toggleLaborStandardsListBulkEditSidebar,

  showImportLaborStandards,
  selectKronosLaborStandard,
  clearEditLaborStandardSidebar,
  REORDER_LABOR_STANDARDS_COLUMN,
  loadLaborStandardsColumns,
  reorderLaborStandardsColumn,
  resetLaborStandardsColumns,
  resetLaborStandardsLockedColumns,
  showHiddenLaborStandardsColumns,
  toggleLaborStandardsColumnLock,
  toggleLaborStandardsColumnVisibility,
  toggleGridConfigurationSidebar,
  cancelColumnReorder,
  filterLaborStandardsList,
  sortLaborStandardsList,
  clearLaborStandardsListFilters,
  clearLaborStandardsListSorts,
} from '../actions';
import {
  shouldReloadLaborStandardsSelector,
  isCalculatingSelector,
  isSubmittingIntegrationRequestSelector,
  bulkEditSidebarShownSelector,
  kronosEndpointsSelectOptionsSelector,
  kronosEndpointsSelector,
  columnConfigurationSelector,
  showResetButtonSelector,
  showHiddenButtonSelector,
  hiddenColumnsSelector,
  showLockButtonSelector,
  showGridConfigurationSelector,
  showColumnReorderConfirmModalSelector,
  reorderedColumnDetailSelector,
  lastReorderedColumnModelSelector,
  filterSelector,
  sortSelector,
  hideClearFiltersButtonSelector,
  hideClearSortsButtonSelector,
  loadingSelector,
  isLaborStandardsLoadedSelector,
  cachedGridConfigurationSelector,
  persistConfigurationSelector,
  hasFilterSortSelector,
} from '../selectors/pages/list';
import {loadEndpointsListForSelect} from '../../integrationEndpoint/actions';
import {
  SubmitKronosExportRequestButton,
  LaborStandardsListBulkEditSidebar,
  ImportLaborStandardsModal,
  ImportLaborStandardsValidationErrorsModal,
  EditLaborStandardSidebar,
} from './';
import {PAGE_SIZE} from '../../../shared/constants/virtualPaging';
import {configurationWimEmailExport, configurationKronosVersion} from '../../../shared/selectors/components/settings';
import {KRONOS_INTEGRATION_VERSION_ENUM_INDEX} from '../../constants/KronosVersions';
import {ALLOWED_MAX_COLUMN_LOCKS} from '../../../customizableGrid/constants/columnConfigurations';
import {persistGridConfiguration, retrieveGridConfiguration, updateCachedGridConfiguration} from '../../../customizableGrid/actions';
import {
  LABOR_STANDARDS as LABOR_STANDARDS_GRID,
} from '../../../customizableGrid/constants/grids';
import {dateTimeFilterField} from '../constants/dateTimeFilterFields';
import {loadOrgHierarchyLevelsList} from '../../../orgHierarchyLevels/actions';

class LaborStandardsListPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      skip: 0,
      standards: [],
      selectedIds: Map(),
      allStandardsSelected: false,
      total: 0,
      pageSize: 40,
      selectedLaborStandard: new Map(),
      selectedEndpoint: new Map(),
    };

    autoBind(this);

    this.handleFilterChangeDebounce = _.debounce(() => {
      this.reloadLaborStandards();
    }, 500);
    this.handleSortChangeDebounce = _.debounce(() => {
      this.sortLaborStandards();
    }, 500);
  }

  componentDidMount() {
    const {router, loadEndpointsListForSelect, loadOrgHierarchyLevelsList} = this.props;
    loadOrgHierarchyLevelsList()
      .then(() => this.requestData(0))
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load organization hierarchies.'));

    loadEndpointsListForSelect()
      .catch(error => handleApiError(error, router, 'An error occurred attempting to load Kronos endpoints.', 'Error'));

    this.pollForCalculatingLabor();
    this.pollTimer = setInterval(this.pollForCalculatingLabor, POLL_INTERVAL);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isLaborStandardsLoaded !== this.props.isLaborStandardsLoaded || prevProps.cachedGridConfig?.size !== this.props.cachedGridConfig?.size) {
      const {columnConfiguration, loadLaborStandardsColumns} = this.props;
      const columns = columnConfiguration(this.state.allStandardsSelected, this.renderSelectionCell);
      loadLaborStandardsColumns(this.filterVisibleColumns(columns));
    }
    if (this.props.hasFilterSort) {
      this.handleFilterChangeDebounce();
    }
  }

  componentWillUnmount() {
    clearInterval(this.pollTimer);
    delete this.pollTimer;
  }

  filterVisibleColumns(columns) {
    return columns.filter(c => c.get('included'));
  }

  requestIfNeeded(skip) {
    const {standards} = this.state;
    for (let i = skip; i < skip + PAGE_SIZE - 1 && i < standards.length; i++) {
      if (typeof standards[i].id === 'undefined') {
        this.requestData(skip);
        return;
      }
    }
  }

  reloadLaborStandards() {
    this.setState({
      standards: [],
      selectedIds: Map(),
      allStandardsSelected: false,
      total: 0,
      skip: 0,
    });
    this.requestData(0);
  }

  sortLaborStandards() {
    this.setState({
      standards: [],
      total: 0,
    });
    this.requestData(0);
  }

  requestData(skipParameter) {
    if (this.requestInProgress) return;
    this.requestInProgress = true;
    const skip = Math.max(skipParameter - PAGE_SIZE, 0);
    this.props.loadLaborStandardsList(skip, this.props.filter, this.props.sort, this.state.selectedEndpoint.get('id', null))
      .then(result => {
        const {total, totalWithDeleted, laborStandards} = result.value.data;

        // the totalWithDeleted will not match on first load or a data change. Refresh all.
        const standards = this.state.totalWithDeleted === totalWithDeleted
          ? this.state.standards
          : new Array(total).fill().map((e, i) => ({index: i})); // Have a slot for every labor standard to fill

        laborStandards.forEach((standard, i) => {
          standards[i + skip] = {index: i + skip, ...standard, updatedDate: moment(standard.updatedDate).toDate(), exportStartTime: moment(standard.exportStartTime).toDate()};
        });

        this.setState({
          standards,
          total,
          totalWithDeleted,
        });
        this.requestIfNeeded(skip);
      }).catch(error => {
        handleApiError(error, this.props.router, 'An error occurred while attempting to load the Labor Standards list.', 'Error');
      }).finally(() => {
        this.requestInProgress = false;
      });
  }

  handlePageChange(event) {
    if (event.page.skip === this.state.skip) return;
    // somehow kendo will pass NaN after sorting changes.  :/
    const skip = isNaN(event.page.skip) ? 0 : event.page.skip;
    this.requestIfNeeded(skip);
    this.setState({skip});
  }

  pollForCalculatingLabor() {
    const {pollBackgroundJobs} = this.props;

    pollBackgroundJobs([CALCULATE_LABOR])
      .then(() => {
        const {shouldReloadLaborStandards, router} = this.props;

        if (shouldReloadLaborStandards) {
          this.reloadLaborStandards()
            .catch(error => handleApiError(error, router, 'An error occurred attempting to load labor standards.', 'Error'));
        }
      });
  }

  handleSelectionChange({dataItem}) {
    const {id} = dataItem;
    const {selectedLaborStandard, selectedIds} = this.state;
    if (selectedLaborStandard.size > 0) return;
    this.setState({selectedIds: selectedIds.has(id) ? selectedIds.deleteIn([id]) : selectedIds.setIn([id], true)});
  }

  handleAllSelectionChange() {
    const allStandardsSelected = this.state.allStandardsSelected;
    this.setState({
      selectedIds: Map(),
      allStandardsSelected: !allStandardsSelected,
    });
  }

  handleSubmitIntegration() {
    const {submitLaborStandardsIntegrationRequest, submitAllLaborStandardsIntegrationRequest} = this.props;
    const {selectedIds, allStandardsSelected, selectedEndpoint} = this.state;
    const {filter} = this.props;
    (allStandardsSelected
      ? submitAllLaborStandardsIntegrationRequest(selectedEndpoint.get('id'), filter)
      : submitLaborStandardsIntegrationRequest(selectedEndpoint.get('id'), selectedIds.keySeq().toArray()))
      .then(() => toastr.success('The integration request has been submitted.', 'Request submitted'))
      .catch(() => toastr.error('Unable to process integration request.'));
  }

  handleShowBulkEditPanel() {
    this.props.toggleLaborStandardsListBulkEditSidebar();
  }

  handleFilter({filter}) {
    let tempFilter = filter;
    if (tempFilter) {
      const isInValidDateTime = tempFilter.filters?.filter(col => dateTimeFilterField.includes(col.field) && col.value === null)?.length;
      if (isInValidDateTime) {
        toastr.error('Please select date before applying filter.');
        return;
      }
    } else {
      tempFilter = _.clone(this.props.filter);
      tempFilter.filters = [];
    }
    this.props.filterLaborStandardsList(tempFilter).then(() => this.handleFilterChangeDebounce());
  }

  handleSort({sort}) {
    this.props.sortLaborStandardsList(sort).then(() => this.handleSortChangeDebounce());
  }

  formatStandardsDataForPresentation() {
    const {
      standards,
      selectedIds,
      skip,
      pageSize,
      selectedLaborStandard,
    } = this.state;
    return standards.slice(skip, skip + pageSize).map(s => {
      s.selected = selectedIds.has(s.id) || selectedLaborStandard.size > 0 && s.id === selectedLaborStandard.get('id');
      if (s.laborStandardOrgHierarchyLevels) {
        Object.keys(s.laborStandardOrgHierarchyLevels).forEach(key => {
          s[key] = s.laborStandardOrgHierarchyLevels[key];
        });
      }
      return s;
    });
  }

  renderSelectionCell(props) {
    const handleChange = this.state.allStandardsSelected ? null : this.handleSelectionChange;
    const selected = this.state.allStandardsSelected ? true : props.dataItem.selected && props.dataItem.id !== this.state.selectedLaborStandard.get('id');
    const dataItem = {...props.dataItem, selected};
    return <GridEditCell {...props} dataItem={dataItem} editor="boolean" onChange={handleChange} />;
  }

  handleShowCreateExportRequest() {
    const {showCreateExportRequest, filter} = this.props;
    showCreateExportRequest(filter);
  }

  handleExportImportTemplate(exportRequestId) {
    exportDownloader(`${process.env.API_BASE_URL}kronos/laborstandard/import/template/${exportRequestId}`);
  }

  handleWimEmailExportRequest() {
    const {selectedIds, allStandardsSelected} = this.state;
    const {filter} = this.props;
    const standardsAreSelected = selectedIds.size > 0 || allStandardsSelected;
    if (!standardsAreSelected) return;

    this.props.submitWimEmailExportRequest(selectedIds.keySeq().toArray(), filter, allStandardsSelected)
      .then(() => toastr.success('The WIM export request has been submitted. Files will be emailed shortly.', exportResponseText.SUCCESS_TITLE))
      .catch(() => toastr.error(exportResponseText.FAILURE));
  }

  handleWimTumbleweedExportRequest() {
    const {selectedIds, allStandardsSelected} = this.state;
    const {filter} = this.props;
    const standardsAreSelected = selectedIds.size > 0 || allStandardsSelected;
    if (!standardsAreSelected) return;

    this.props.submitWimTumbleweedExportRequest(selectedIds.keySeq().toArray(), filter, allStandardsSelected)
      .then(() => toastr.success('The WIM export request has been submitted and will be sent to Tumbleweed shortly.', exportResponseText.SUCCESS_TITLE))
      .catch(() => toastr.error(exportResponseText.FAILURE));
  }

  handleWimKronosEmailExportRequest() {
    const {selectedIds, allStandardsSelected} = this.state;
    const {filter} = this.props;
    const standardsAreSelected = selectedIds.size > 0 || allStandardsSelected;
    if (!standardsAreSelected) return;

    this.props.submitWimKronosEmailExportRequest(selectedIds.keySeq().toArray(), filter, allStandardsSelected)
      .then(() => toastr.success('The Kronos WIM export request has been submitted. Files will be emailed shortly.', exportResponseText.SUCCESS_TITLE))
      .catch(() => toastr.error(exportResponseText.FAILURE));
  }

  handleWimKronosEmailExportRequestWithHashes() {
    const {selectedIds, allStandardsSelected} = this.state;
    const {filter} = this.props;
    const standardsAreSelected = selectedIds.size > 0 || allStandardsSelected;
    if (!standardsAreSelected) return;

    this.props.submitWimKronosEmailExportRequestWithHashes(selectedIds.keySeq().toArray(), filter, allStandardsSelected)
      .then(() => toastr.success('The Kronos WIM export request has been submitted. Files will be emailed shortly.', exportResponseText.SUCCESS_TITLE))
      .catch(() => toastr.error(exportResponseText.FAILURE));
  }

  handleWimKronosTumbleweedExportRequest() {
    const {selectedIds, allStandardsSelected} = this.state;
    const {filter} = this.props;
    const standardsAreSelected = selectedIds.size > 0 || allStandardsSelected;
    if (!standardsAreSelected) return;

    this.props.submitWimKronosTumbleweedExportRequest(selectedIds.keySeq().toArray(), filter, allStandardsSelected)
      .then(() => toastr.success('The Kronos WIM export request has been submitted and will be sent to Tumbleweed shortly.', exportResponseText.SUCCESS_TITLE))
      .catch(() => toastr.error(exportResponseText.FAILURE));
  }

  handleWimKronosTumbleweedExportRequestWithHashes() {
    const {selectedIds, allStandardsSelected} = this.state;
    const {filter} = this.props;
    const standardsAreSelected = selectedIds.size > 0 || allStandardsSelected;
    if (!standardsAreSelected) return;

    this.props.submitWimKronosTumbleweedExportRequestWithHashes(selectedIds.keySeq().toArray(), filter, allStandardsSelected)
      .then(() => toastr.success('The Kronos WIM export request has been submitted and will be sent to Tumbleweed shortly.', exportResponseText.SUCCESS_TITLE))
      .catch(() => toastr.error(exportResponseText.FAILURE));
  }

  handleRowClick({dataItem}) {
    const {selectedIds, selectedLaborStandard} = this.state;
    const {selectKronosLaborStandard} = this.props;
    if (selectedIds.size <= 0) {
      if (dataItem.id === selectedLaborStandard.get('id')) {
        this.clearSelectedLaborStandard();
      } else {
        selectKronosLaborStandard(Map(dataItem));
        this.setState({selectedLaborStandard: Map(dataItem)});
      }
    }
  }

  clearSelectedLaborStandard() {
    this.props.clearEditLaborStandardSidebar();
    this.setState({selectedLaborStandard: new Map()});
  }

  handleSelectKronosEndpoint({target}) {
    const {kronosEndpoints} = this.props;
    const targetId = parseInt(target.value, 10);

    const endpoint = kronosEndpoints.find(ep =>
      ep.get('id') === targetId, null, new Map());
    this.setState({selectedEndpoint: endpoint},
      () => this.reloadLaborStandards());
  }

  handleClearFilters() {
    this.props.clearLaborStandardsListFilters().then(() => this.handleFilterChangeDebounce());
  }

  handleClearSorts() {
    this.props.clearLaborStandardsListSorts().then(() => this.handleSortChangeDebounce());
  }

  setResetReorderedColumns() {
    const {loadLaborStandardsColumns, resetLaborStandardsColumns} = this.props;
    resetLaborStandardsColumns().then(() => {
      const columns = this.props.columnConfiguration(this.state.allStandardsSelected, this.renderSelectionCell);
      loadLaborStandardsColumns(columns);
    });
  }

  handleResetLockedColumns() {
    const {loadLaborStandardsColumns, resetLaborStandardsLockedColumns} = this.props;
    resetLaborStandardsLockedColumns().then(() => {
      const columns = this.props.columnConfiguration(this.state.allStandardsSelected, this.renderSelectionCell);
      loadLaborStandardsColumns(columns);
    });
  }

  handleShowHiddenColumns() {
    const {loadLaborStandardsColumns, showHiddenLaborStandardsColumns} = this.props;
    showHiddenLaborStandardsColumns().then(() => {
      const columns = this.props.columnConfiguration(this.state.allStandardsSelected, this.renderSelectionCell);
      loadLaborStandardsColumns(columns);
    });
  }

  handleReorderColumns(event) {
    const {columnConfiguration, reorderLaborStandardsColumn} = this.props;
    const columns = columnConfiguration(this.state.allStandardsSelected, this.renderSelectionCell);
    const reorderedColumnDetail = getReorderedGridColumnDetails(event, columns);
    if (!reorderedColumnDetail) return;
    const {columnKey, oldIndex, newIndex} = reorderedColumnDetail;
    reorderLaborStandardsColumn(columnKey, oldIndex, newIndex);
  }

  setToggleColumnLock(field, lock) {
    const {columnConfiguration, toggleLaborStandardsColumnLock} = this.props;
    const columns = columnConfiguration(this.state.allStandardsSelected, this.renderSelectionCell);
    const finalColumnsList = toggleLockReorderColumns(field, lock, this.filterVisibleColumns(columns));
    toggleLaborStandardsColumnLock(field, lock, finalColumnsList);
  }

  setToggleColumnVisibility(field, visibility) {
    const {hiddenColumns, toggleLaborStandardsColumnVisibility, columnConfiguration} = this.props;
    const columns = columnConfiguration(this.state.allStandardsSelected, this.renderSelectionCell);
    const {selectedColumn, columnsList} = toggleVisibilityReorderColumns(field, visibility, this.filterVisibleColumns(columns), hiddenColumns);
    toggleLaborStandardsColumnVisibility(field, visibility, columnsList, selectedColumn).then(() => this.handleFilterChangeDebounce());
  }

  handleConfirmColumnReorder() {
    const {reorderLaborStandardsColumn, lastReorderedColumnModel} = this.props;
    reorderLaborStandardsColumn(lastReorderedColumnModel.columnKey, lastReorderedColumnModel.oldIndex, lastReorderedColumnModel.newIndex);
  }


  render() {
    const {
      isCalculating,
      isSubmittingIntegrationRequest,
      bulkEditSidebarShown,
      showImportLaborStandards,
      kronosEndpointsSelectList,
      columnConfiguration,
      showWimEmailExport,
      canEdit,
      canExport,
      canPush,
      canWimExport,
      canWimExportTumbleweed,
      hasBetaFeaturesAccess,
      kronosVersion,
      showGridConfiguration,
      showResetButton,
      showHiddenButton,
      showLockButton,
      toggleGridConfigurationSidebar,
      cancelColumnReorder,
      reorderedColumnDetail,
      showColumnReorderConfirmModal,
      hideClearFiltersButton,
      hideClearSortsButton,
      filter,
      sort,
      loading,
      persistConfiguration,
      persistGridConfiguration,
      retrieveGridConfiguration,
      updateCachedGridConfiguration,
    } = this.props;
    const {selectedIds} = this.state;
    const {
      skip,
      total,
      allStandardsSelected,
      selectedLaborStandard,
      selectedEndpoint,
    } = this.state;
    const standardsAreSelected = selectedIds.size > 0 || allStandardsSelected;

    const columns = columnConfiguration(allStandardsSelected, this.renderSelectionCell);

    return (
      <Page pageClassName="kronos-labor-standards-list-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Labor Standards</PageTitle>
          <PageHeaderActions>
            <ClearFiltersButton hide={hideClearFiltersButton} onClear={this.handleClearFilters} />
            <ClearSortsButton hide={hideClearSortsButton} onClear={this.handleClearSorts} />
            <ResetLockedColumnsButton hide={showLockButton} onClear={this.handleResetLockedColumns} />
            <ClearHiddenColumnsButton hide={showHiddenButton} onClear={this.handleShowHiddenColumns} />
            {kronosVersion !== KRONOS_INTEGRATION_VERSION_ENUM_INDEX.TUMBLEWEED &&
              <KronosEndpointSelect selectedEndpoint={selectedEndpoint.get('id')} kronosEndpoints={kronosEndpointsSelectList} onChange={this.handleSelectKronosEndpoint} />}
            {isCalculating ? (<i className="fa fa-spinner fa-spin" title="Calculation in progress" />) : null}
            {(canEdit || canExport || canWimExport) && <Dropdown id="export" className="btn-default header-button" pullRight disabled={isCalculating || isSubmittingIntegrationRequest}>
              <Dropdown.Toggle noCaret><i className="fa fa-file-excel-o" /></Dropdown.Toggle>
              <Dropdown.Menu>
                {(canExport || canWimExport || canWimExportTumbleweed) && (
                  <>
                    {canExport && <MenuItem eventKey="1" onClick={this.handleShowCreateExportRequest} >
                      Export Labor Standards CSV
                    </MenuItem>}
                    {(showWimEmailExport && canWimExport) ? (<MenuItem eventKey="2" onClick={this.handleWimEmailExportRequest} disabled={!standardsAreSelected}>Export WIM File</MenuItem>) : null}
                    {(showWimEmailExport && canWimExportTumbleweed && kronosVersion === KRONOS_INTEGRATION_VERSION_ENUM_INDEX.TUMBLEWEED)
                      ? (<MenuItem eventKey="2" onClick={this.handleWimTumbleweedExportRequest} disabled={!standardsAreSelected}>Export WIM File To Tumbleweed</MenuItem>) : null}
                    {(showWimEmailExport && canWimExport && hasBetaFeaturesAccess)
                      ? (<MenuItem eventKey="2" onClick={this.handleWimKronosEmailExportRequest} disabled={!standardsAreSelected}>Export Kronos Wim File</MenuItem>) : null}
                    {(showWimEmailExport && canWimExport && hasBetaFeaturesAccess)
                      ? (<MenuItem eventKey="2" onClick={this.handleWimKronosEmailExportRequestWithHashes} disabled={!standardsAreSelected}>Export Kronos Wim File With Hashes</MenuItem>) : null}
                    {(showWimEmailExport && canWimExport && hasBetaFeaturesAccess && kronosVersion === KRONOS_INTEGRATION_VERSION_ENUM_INDEX.TUMBLEWEED)
                      ? (<MenuItem eventKey="2" onClick={this.handleWimKronosTumbleweedExportRequest} disabled={!standardsAreSelected}>Export Kronos Wim File To Tumbleweed</MenuItem>) : null}
                    {(showWimEmailExport && canWimExport && hasBetaFeaturesAccess && kronosVersion === KRONOS_INTEGRATION_VERSION_ENUM_INDEX.TUMBLEWEED)
                      ? (<MenuItem eventKey="2" onClick={this.handleWimKronosTumbleweedExportRequestWithHashes} disabled={!standardsAreSelected}>Export Kronos Wim File With Hashes To Tumbleweed</MenuItem>) : null}
                  </>
                )}
                {canEdit && (
                  <MenuItem eventKey="3" onClick={showImportLaborStandards}>
                    Import Labor Standards
                  </MenuItem>
                )}
              </Dropdown.Menu>
            </Dropdown>}
            {canEdit && <BulkEditButton isVisible={standardsAreSelected} isOpen={bulkEditSidebarShown} onClick={this.handleShowBulkEditPanel} />}
            {canPush && standardsAreSelected && !selectedEndpoint.isEmpty() && !(selectedEndpoint.get('status') === 'Disabled')
              ? <SubmitKronosExportRequestButton onClick={this.handleSubmitIntegration} isSubmitting={isSubmittingIntegrationRequest} />
              : null}
            <GridConfigurationButton openSidebar={toggleGridConfigurationSidebar} closeSidebar={toggleGridConfigurationSidebar} showGridConfiguration={showGridConfiguration} />
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.KRONOS_INTEGRATION} />
          <MainContent loading={loading}>
            <div>{this.setToggleColumnLock && !columns.first().get('lockable') &&
            <div className="column-lock-warning">
              <span className="text-danger">Note: Maximum {ALLOWED_MAX_COLUMN_LOCKS} columns can be locked</span>
            </div>}
            </div>
            <AutoSizer>
              {({height, width}) => (
                <CustomizableGrid style={{width, height}}
                  noFromJs
                  data={this.formatStandardsDataForPresentation()}
                  skip={skip}
                  total={total}
                  pageSize={PAGE_SIZE}
                  onFilter={this.handleFilter} filter={filter} onSort={this.handleSort} sort={sort}
                  scrollable={'virtual'} onPageChange={this.handlePageChange} rowHeight={40}
                  selectedField="selected" onSelectedChange={this.handleSelectionChange}
                  onHeaderSelectedChange={this.handleAllSelectionChange} onRowClick={this.handleRowClick}
                  columns={this.filterVisibleColumns(columns)}
                  toggleColumnLock={this.setToggleColumnLock} toggleColumnVisibility={this.setToggleColumnVisibility}
                  onColumnReorder={this.handleReorderColumns}
                  showColumnContextMenu reorderable />
              )}
            </AutoSizer>
          </MainContent>
          <GridConfigurationSidebar dropActionId={REORDER_LABOR_STANDARDS_COLUMN} columns={columns}
            show={showGridConfiguration} toggleColumnVisibility={this.setToggleColumnVisibility} toggleColumnLock={this.setToggleColumnLock}
            handleResetGridConfiguration={this.setResetReorderedColumns} showResetGridConfiguration={showResetButton} />
          <PersistGridConfiguration gridId={LABOR_STANDARDS_GRID} configuration={persistConfiguration} persist={persistGridConfiguration} retrieve={retrieveGridConfiguration}
            updateCachedConfiguration={updateCachedGridConfiguration} />
          <LaborStandardsListBulkEditSidebar reloadLaborStandards={this.reloadLaborStandards} selectedLaborStandardIds={selectedIds} allStandardsSelected={allStandardsSelected} filter={filter} canEdit={canEdit} />
          <EditLaborStandardSidebar reloadLaborStandards={this.reloadLaborStandards} selectedLaborStandard={selectedLaborStandard} clearSelection={this.clearSelectedLaborStandard} canEdit={canEdit} />
        </PageBody>
        <ImportLaborStandardsModal />
        <ImportLaborStandardsValidationErrorsModal />
        <CreateExportRequestModal title={'Export Labor Standards'} onExportRequestCreated={this.handleExportImportTemplate} />
        <ColumnReorderConfirmModal show={showColumnReorderConfirmModal} column={reorderedColumnDetail} onConfirm={this.handleConfirmColumnReorder} onCancel={cancelColumnReorder} processing={false} />
      </Page>
    );
  }
}

LaborStandardsListPage.propTypes = {
  shouldReloadLaborStandards: PropTypes.bool,
  isCalculating: PropTypes.bool,
  kronosEndpoints: PropTypes.instanceOf(List).isRequired,
  isSubmittingIntegrationRequest: PropTypes.bool.isRequired,
  bulkEditSidebarShown: PropTypes.bool.isRequired,

  loadLaborStandardsList: PropTypes.func.isRequired,
  loadEndpointsListForSelect: PropTypes.func.isRequired,
  pollBackgroundJobs: PropTypes.func.isRequired,
  submitLaborStandardsIntegrationRequest: PropTypes.func.isRequired,
  submitAllLaborStandardsIntegrationRequest: PropTypes.func.isRequired,
  toggleLaborStandardsListBulkEditSidebar: PropTypes.func.isRequired,

  selectKronosLaborStandard: PropTypes.func.isRequired,

  showImportLaborStandards: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const canExportSelector = makeCurrentUserHasPermissionSelector(KRONOS_LABOR_STANDARDS_EXPORT);
  const canEditSelector = makeCurrentUserHasPermissionSelector(KRONOS_LABOR_STANDARDS_EDIT);
  const canPushSelector = makeCurrentUserHasPermissionSelector(KRONOS_LABOR_STANDARDS_PUSH);
  const canWimExportSelector = makeCurrentUserHasPermissionSelector(KRONOS_WIM_EXPORT);
  const canWimExportTumbleweedSelector = makeCurrentUserHasPermissionSelector(TUMBLEWEED_KRONOS_WIM_EXPORT);
  const hasBetaFeaturesAccessSelector = makeCurrentUserHasPermissionSelector(BETA_FEATURES_ACCESS);

  return {
    columnConfiguration: columnConfigurationSelector(state),
    shouldReloadLaborStandards: shouldReloadLaborStandardsSelector(state),
    isCalculating: isCalculatingSelector(state),
    isSubmittingIntegrationRequest: isSubmittingIntegrationRequestSelector(state),
    bulkEditSidebarShown: bulkEditSidebarShownSelector(state),
    kronosEndpointsSelectList: kronosEndpointsSelectOptionsSelector(state),
    kronosEndpoints: kronosEndpointsSelector(state),
    showWimEmailExport: configurationWimEmailExport(state),
    canExport: canExportSelector(state),
    canEdit: canEditSelector(state),
    canPush: canPushSelector(state),
    canWimExport: canWimExportSelector(state),
    canWimExportTumbleweed: canWimExportTumbleweedSelector(state),
    hasBetaFeaturesAccess: hasBetaFeaturesAccessSelector(state),
    kronosVersion: configurationKronosVersion(state),
    showResetButton: showResetButtonSelector(state),
    showHiddenButton: showHiddenButtonSelector(state),
    hiddenColumns: hiddenColumnsSelector(state),
    showLockButton: showLockButtonSelector(state),
    showGridConfiguration: showGridConfigurationSelector(state),
    showColumnReorderConfirmModal: showColumnReorderConfirmModalSelector(state),
    reorderedColumnDetail: reorderedColumnDetailSelector(state),
    lastReorderedColumnModel: lastReorderedColumnModelSelector(state),
    filter: filterSelector(state),
    sort: sortSelector(state),
    hideClearFiltersButton: hideClearFiltersButtonSelector(state),
    hideClearSortsButton: hideClearSortsButtonSelector(state),
    loading: loadingSelector(state),
    persistConfiguration: persistConfigurationSelector(state),
    cachedGridConfig: cachedGridConfigurationSelector(state),
    isLaborStandardsLoaded: isLaborStandardsLoadedSelector(state),
    hasFilterSort: hasFilterSortSelector(state),
  };
};

const actions = {
  loadLaborStandardsList,
  loadEndpointsListForSelect,
  pollBackgroundJobs,
  submitLaborStandardsIntegrationRequest,
  submitAllLaborStandardsIntegrationRequest,
  submitWimEmailExportRequest,
  submitWimTumbleweedExportRequest,
  submitWimKronosEmailExportRequest,
  submitWimKronosEmailExportRequestWithHashes,
  submitWimKronosTumbleweedExportRequest,
  submitWimKronosTumbleweedExportRequestWithHashes,
  toggleLaborStandardsListBulkEditSidebar,
  showImportLaborStandards,
  showCreateExportRequest,
  selectKronosLaborStandard,
  clearEditLaborStandardSidebar,
  loadLaborStandardsColumns,
  reorderLaborStandardsColumn,
  resetLaborStandardsColumns,
  resetLaborStandardsLockedColumns,
  showHiddenLaborStandardsColumns,
  toggleLaborStandardsColumnLock,
  toggleLaborStandardsColumnVisibility,
  toggleGridConfigurationSidebar,
  cancelColumnReorder,
  filterLaborStandardsList,
  sortLaborStandardsList,
  clearLaborStandardsListFilters,
  clearLaborStandardsListSorts,
  persistGridConfiguration,
  retrieveGridConfiguration,
  updateCachedGridConfiguration,
  loadOrgHierarchyLevelsList,
};

export default withRouter(connect(mapStateToProps, actions)(LaborStandardsListPage));
