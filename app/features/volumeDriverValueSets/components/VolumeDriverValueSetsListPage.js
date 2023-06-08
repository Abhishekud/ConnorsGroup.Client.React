import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {withRouter} from 'react-router';
import {AutoSizer} from 'react-virtualized';
import {Tooltip} from '@progress/kendo-react-tooltip';
import {Button, Dropdown, MenuItem} from 'react-bootstrap';
import {fromJS} from 'immutable';
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
  loadVolumeDriverValueSetsList,
  pageVolumeDriverValueSetsList,
  selectVolumeDriverValueSet,
  sortVolumeDriverValueSetsList,
  filterVolumeDriverValueSetsList,
  clearVolumeDriverValueSetsFilters,
  clearVolumeDriverValueSetsSorts,
  clearSelectedVolumeDriverValueSet,
  showCreateVolumeDriverValueSet,
  toggleImportVolumeDriverValueSets,
  toggleSelectVolumeDriverValueSet,
  selectAllVolumeDriverValueSets,
  createLocationStandardsExportRequestForVDVSetsBackgroundJob,
  createVDVExportRequestForSelectedVDVSetsBackgroundJob,
} from '../actions';
import {
  loadingSelector,
  columnsSelector,
  tableDataSelector,
  skipSelector,
  takeSelector,
  totalVolumeDriverValueSetsSelector,
  sortSelector,
  filterSelector,
  hideClearFiltersButtonSelector,
  hideClearSortsButtonSelector,
  activeBackgroundJobsSelector,
  backgroundJobStartedSelector,
  dataSelector,
  selectedVolumeDriverValueSetsSelector,
  selectedVolumeDriverValueSetIdsSelector,
  dataSourceSelector,
  activeLocationStandardsExportRequestForVDVSetsBackgroundJobSelector,
  activeVDVExportRequestForSelectedVDVSetsBackgroundJobSelector,
  isSelectedVDVSetsExportRequestSelector,
} from '../selectors/pages/list';
import {handleApiError, toastr, exportDownloader} from '../../shared/services';
import {CustomizableGrid, ClearFiltersButton, ClearSortsButton} from '../../customizableGrid/components';
import {TOOLTIP_OPEN_DELAY} from '../../shared/constants/tooltipOpenDelay';
import ImportVolumeDriverValueSetsModal from './ImportVolumeDriverValueSetsModal';
import ImportVolumeDriverValueSetsValidationErrorsModal from './ImportVolumeDriverValueSetsValidationErrorsModal';
import ImportVolumeDriverValuesValidationErrorsModal from './ImportVolumeDriverValuesValidationErrorsModal';
import CreateVolumeDriverValueSetModal from './CreateVolumeDriverValueSetModal';
import VolumeDriverValueSetsListEditSidebar from './VolumeDriverValueSetsListEditSidebar';
import makeCurrentUserHasPermissionSelector from '../../authentication/selectors/currentUser/makeCurrentUserHasPermissionSelector';
import {PROFILING_VOLUME_DRIVER_VALUE_SETS_EXPORT, PROFILING_VOLUME_DRIVER_VALUE_SETS_CREATE, STANDARDS_AND_UOM_BY_LOCATION_EXPORT, BETA_FEATURES_ACCESS} from '../../authentication/constants/permissions';
import {POLL_INTERVAL, VOLUME_DRIVER_VALUE_IMPORTER, LOCATION_STANDARDS_FOR_VDV_SETS_EXPORTER, LOCATIONS_STANDARDS, CALCULATE_LABOR, VOLUME_DRIVER_VALUES_EXPORTER} from '../../shared/constants/backgroundJobs';
import {pollBackgroundJobs, showCreateExportRequest} from '../../shared/actions';
import {volumeDriverValueSetsLimitSelector} from '../../shared/selectors/components/settings';
import {CreateExportRequestModal} from '../../shared/components';
import ExportRequestButton from './ExportRequestButton';

class VolumeDriverValueSetsListPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);

    setTimeout(() => this.checkBackgroundJobs());
    this.pollTimer = setInterval(this.checkBackgroundJobs, POLL_INTERVAL);
  }

  componentDidMount() {
    const {router, loadVolumeDriverValueSetsList, location} = this.props;

    if (location.query.return) {
      return;
    }
    loadVolumeDriverValueSetsList()
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Volume Driver Value Sets list.', 'Error'));
  }

  componentWillUnmount() {
    clearInterval(this.pollTimer);
    this.pollTimer = null;
  }

  reloadVolumeDriverValueSets() {
    const {pageVolumeDriverValueSetsList, loadVolumeDriverValueSetsList, router} = this.props;
    pageVolumeDriverValueSetsList(0);
    loadVolumeDriverValueSetsList()
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Volume Driver Values list.', 'Error'));
  }

  checkBackgroundJobs() {
    const {pollBackgroundJobs} = this.props;

    pollBackgroundJobs([VOLUME_DRIVER_VALUE_IMPORTER, LOCATION_STANDARDS_FOR_VDV_SETS_EXPORTER, LOCATIONS_STANDARDS, CALCULATE_LABOR, VOLUME_DRIVER_VALUES_EXPORTER])
      .then(() => {
        const {activeBackgroundJobs, backgroundJobStarted} = this.props;

        if (!activeBackgroundJobs && backgroundJobStarted) {
          this.reloadVolumeDriverValueSets();
        }
      });
  }

  handleSort({sort}) {
    this.props.sortVolumeDriverValueSetsList(sort);
  }

  handleFilter({filter}) {
    this.props.filterVolumeDriverValueSetsList(filter);
  }

  handlePageChange(event) {
    this.props.pageVolumeDriverValueSetsList(event.page.skip);
  }

  handleExportRequest(exportRequestId) {
    const {createLocationStandardsExportRequestForVDVSetsBackgroundJob, router, dataSource, isSelectedVDVSetsExportRequest, createVDVExportRequestForSelectedVDVSetsBackgroundJob} = this.props;

    if (isSelectedVDVSetsExportRequest) {
      createVDVExportRequestForSelectedVDVSetsBackgroundJob(exportRequestId)
        .then(response => {
          if (response.value.data.backgroundedJob) {
            toastr.success(exportResponseText.SUCCESS, exportResponseText.SUCCESS_TITLE);
          } else {
            toastr.error(exportResponseText.FAILURE);
          }
        })
        .catch(error => {
          let errorMessage = 'An error occurred while attempting to export selected VDV Sets.';
          if (error.response.status === 500) {
            errorMessage = error.response.data.exceptionMessage;
          }
          handleApiError(error, router, errorMessage, 'Error');
        });
    } else {
      createLocationStandardsExportRequestForVDVSetsBackgroundJob(dataSource, exportRequestId)
        .then(response => {
          if (response.value.data.backgroundedJob) {
            toastr.success(exportResponseText.SUCCESS, exportResponseText.SUCCESS_TITLE);
          } else {
            toastr.error(exportResponseText.FAILURE);
          }
        })
        .catch(error => {
          let errorMessage = 'An error occurred while attempting to export Location Standards For VDV Sets.';
          if (error.response.status === 500) {
            errorMessage = error.response.data.exceptionMessage;
          }
          handleApiError(error, router, errorMessage, 'Error');
        });
    }
  }

  handleShowCreateExportRequest() {
    const {showCreateExportRequest, selectedVolumeDriverValueSetIds} = this.props;
    showCreateExportRequest({}, null, selectedVolumeDriverValueSetIds);
  }

  handleClearFilters() {
    this.props.clearVolumeDriverValueSetsFilters();
  }

  handleClearSorts() {
    this.props.clearVolumeDriverValueSetsSorts();
  }

  handleRowClick({dataItem}) {
    const {selectedVolumeDriverValueSetId, selectVolumeDriverValueSet, clearSelectedVolumeDriverValueSet} = this.props;

    if (dataItem.id === selectedVolumeDriverValueSetId) {
      clearSelectedVolumeDriverValueSet();
    } else {
      selectVolumeDriverValueSet(fromJS(dataItem));
    }
  }

  handleToggleSelect({dataItem}) {
    this.props.toggleSelectVolumeDriverValueSet(dataItem.id);
  }

  handleSelectAll() {
    const {volumeDriverValueSets, selectedVolumeDriverValueSets, selectAllVolumeDriverValueSets} = this.props;
    selectAllVolumeDriverValueSets(volumeDriverValueSets.map(x => x.get('id')), Boolean(selectedVolumeDriverValueSets.size === 0));
  }

  handleExportVolumeDriverValuesImportTemplate() {
    exportDownloader(`${process.env.API_BASE_URL}volume-driver-value-sets/volume-driver-values/import/template`);
  }

  render() {
    const {
      loading,
      skip,
      take,
      total,
      columns,
      sort,
      filter,
      hideClearFiltersButton,
      hideClearSortsButton,
      handleShowCreateVolumeDriverValueSet,
      canCreate,
      canExport,
      pagedVolumeDriverValueSets,
      volumeDriverValueSetsLimit,
      activeBackgroundJobs,
      activeLocationStandardsExportRequestForVDVSetsBackgroundJob,
      selectedVolumeDriverValueSetIds,
      canExportStandardsAndUOMByLocationExport,
      activeVDVExportRequestForSelectedVDVSetsBackgroundJob,
      hasBetaAccess,
    } = this.props;

    let backgroundJobStatus = null;

    if (activeBackgroundJobs) {
      backgroundJobStatus = <i className="fa fa-spinner fa-spin" title={activeLocationStandardsExportRequestForVDVSetsBackgroundJob || activeVDVExportRequestForSelectedVDVSetsBackgroundJob ? 'Export in progress' : 'Calculation in progress'} />;
    }
    return (
      <Page pageClassName="volume-driver-value-sets-list-page">
        <PageHeader>
          <PageTitle>Volume Driver Value Sets</PageTitle>
          <PageHeaderActions align="right">
            <ClearFiltersButton hide={hideClearFiltersButton} onClear={this.handleClearFilters} />
            <ClearSortsButton hide={hideClearSortsButton} onClear={this.handleClearSorts} />
            {backgroundJobStatus}
            {canExport && <Dropdown id="export-volume-driver-value-sets" pullRight className="header-button">
              <Dropdown.Toggle noCaret><i className="fa fa-file-excel-o" /></Dropdown.Toggle>
              <Dropdown.Menu>
                {canExportStandardsAndUOMByLocationExport && selectedVolumeDriverValueSetIds.length > 0 && <ExportRequestButton onExportRequest={this.handleShowCreateExportRequest} disabled={activeBackgroundJobs} />}
                <MenuItem eventKey="1" onClick={this.handleExportVolumeDriverValuesImportTemplate}>
                  Download Volume Driver Values Import Template
                </MenuItem>
              </Dropdown.Menu>
            </Dropdown>}
            {canCreate && <Button onClick={handleShowCreateVolumeDriverValueSet} disabled={total >= volumeDriverValueSetsLimit || activeBackgroundJobs} title={total >= volumeDriverValueSetsLimit ? `Maximum number of sets (${volumeDriverValueSetsLimit}) have been created.` : ''} ><i className="fa fa-plus" /></Button>}
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={hasBetaAccess ? navigationGroups.VOLUME_DRIVERS : navigationGroups.PROFILING} />
          <MainContent loading={loading}>
            <AutoSizer>
              {({width, height}) => (
                <Tooltip openDelay={TOOLTIP_OPEN_DELAY} position="top" anchorElement="target">
                  <CustomizableGrid
                    style={{width, height}}
                    data={pagedVolumeDriverValueSets}
                    sort={sort}
                    onSort={this.handleSort}
                    filter={filter}
                    onFilter={this.handleFilter}
                    onPageChange={this.handlePageChange} total={total}
                    skip={skip} take={take}
                    columns={columns}
                    onRowClick={this.handleRowClick}
                    onSelectedChange={this.handleToggleSelect}
                    onHeaderSelectedChange={this.handleSelectAll} />
                </Tooltip>
              )}
            </AutoSizer>
          </MainContent>
          <VolumeDriverValueSetsListEditSidebar />
        </PageBody>
        <CreateVolumeDriverValueSetModal />
        <ImportVolumeDriverValueSetsModal />
        <ImportVolumeDriverValueSetsValidationErrorsModal />
        <ImportVolumeDriverValuesValidationErrorsModal />
        <CreateExportRequestModal title="Export Volume Driver Value Sets" onExportRequestCreated={this.handleExportRequest} />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const canCreateSelector = makeCurrentUserHasPermissionSelector(PROFILING_VOLUME_DRIVER_VALUE_SETS_CREATE);
  const canExportSelector = makeCurrentUserHasPermissionSelector(PROFILING_VOLUME_DRIVER_VALUE_SETS_EXPORT);
  const canExportStandardsAndUOMByLocationExportSelector = makeCurrentUserHasPermissionSelector(STANDARDS_AND_UOM_BY_LOCATION_EXPORT);
  const hasBetaAccessSelector = makeCurrentUserHasPermissionSelector(BETA_FEATURES_ACCESS);

  return {
    loading: loadingSelector(state),
    skip: skipSelector(state),
    take: takeSelector(state),
    columns: columnsSelector(state),
    pagedVolumeDriverValueSets: tableDataSelector(state),
    total: totalVolumeDriverValueSetsSelector(state),
    sort: sortSelector(state),
    filter: filterSelector(state),
    canCreate: canCreateSelector(state),
    canExport: canExportSelector(state),
    hideClearFiltersButton: hideClearFiltersButtonSelector(state),
    hideClearSortsButton: hideClearSortsButtonSelector(state),
    volumeDriverValueSetsLimit: volumeDriverValueSetsLimitSelector(state),
    activeBackgroundJobs: activeBackgroundJobsSelector(state),
    backgroundJobStarted: backgroundJobStartedSelector(state),
    volumeDriverValueSets: dataSelector(state),
    selectedVolumeDriverValueSets: selectedVolumeDriverValueSetsSelector(state),
    dataSource: dataSourceSelector(state),
    selectedVolumeDriverValueSetIds: selectedVolumeDriverValueSetIdsSelector(state),
    activeLocationStandardsExportRequestForVDVSetsBackgroundJob: activeLocationStandardsExportRequestForVDVSetsBackgroundJobSelector(state),
    canExportStandardsAndUOMByLocationExport: canExportStandardsAndUOMByLocationExportSelector(state),
    activeVDVExportRequestForSelectedVDVSetsBackgroundJob: activeVDVExportRequestForSelectedVDVSetsBackgroundJobSelector(state),
    isSelectedVDVSetsExportRequest: isSelectedVDVSetsExportRequestSelector(state),
    hasBetaAccess: hasBetaAccessSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadVolumeDriverValueSetsList,
    pageVolumeDriverValueSetsList,
    selectVolumeDriverValueSet,
    sortVolumeDriverValueSetsList,
    filterVolumeDriverValueSetsList,
    clearVolumeDriverValueSetsFilters,
    clearVolumeDriverValueSetsSorts,
    clearSelectedVolumeDriverValueSet,
    pollBackgroundJobs,
    handleToggleImportVolumeDriverValueSets: toggleImportVolumeDriverValueSets,
    handleShowCreateVolumeDriverValueSet: showCreateVolumeDriverValueSet,
    toggleSelectVolumeDriverValueSet,
    selectAllVolumeDriverValueSets,
    showCreateExportRequest,
    createLocationStandardsExportRequestForVDVSetsBackgroundJob,
    createVDVExportRequestForSelectedVDVSetsBackgroundJob,
  }
)(VolumeDriverValueSetsListPage));
