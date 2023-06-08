import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {AutoSizer} from 'react-virtualized';
import {Dropdown, MenuItem} from 'react-bootstrap';
import {GridColumn} from '@progress/kendo-react-grid';
import _ from 'lodash';
import {ClearFiltersButton, ClearSortsButton, CustomizableGrid} from '../../../customizableGrid/components';
import {
  MainContent,
  NavigationSidebar,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../../layout/components';
import {handleApiError, toastr} from '../../../shared/services';
import {navigationGroups, exportResponseText} from '../../../shared/constants';
import makeCurrentUserHasPermissionSelector from '../../../authentication/selectors/currentUser/makeCurrentUserHasPermissionSelector';
import {KRONOS_LABOR_PERIOD_EDIT} from '../../../authentication/constants/permissions';
import {
  showCreateModal,
  selectLaborPeriod,
  cancelEdit,
  filterLaborPeriods,
  sortLaborPeriods,
  loadLaborPeriodsList,
  clearLaborPeriodListFilters,
  clearLaborPeriodListSorts,
  loadLaborPeriod,
  clearModel,
  showImportLaborPeriods,
  closeImportLaborPeriodsValidationErrors,
  createLaborPeriodsExportRequestBackgroundJob,
  createLaborPeriodsExportImportTemplateRequestBackgroundJob,
  setIsLaborPeriodsExportImportTemplateBackgroundJob,
} from '../actions';
import {
  sortSelector,
  filterSelector,
  hideClearFiltersButtonSelector,
  hideClearSortsButtonSelector,
  isLaborPeriodsExportImportTemplateBackgroundJobSelector,
} from '../selectors/pages/list';
import {showCreateExportRequest, pollBackgroundJobs} from '../../../shared/actions';
import {CreateExportRequestModal, ImportFileValidationErrorsModal} from '../../../shared/components';
import ImportLaborPeriodsModal from './ImportLaborPeriodsModal';
import {
  showSelector,
  createdRecordCountSelector,
  updatedRecordCountSelector,
  totalRecordCountSelector,
  validationErrorsSelector,
} from '../selectors/modals/importValidationErrors';
import activeBackgroundJobsSelector from '../selectors/pages/list/activeBackgroundJobsSelector';
import {POLL_INTERVAL, KRONOS_LABOR_PERIOD_IMPORTER, KRONOS_LABOR_PERIOD_EXPORTER, KRONOS_LABOR_PERIODS_IMPORT_TEMPLATE_EXPORTER} from '../../../shared/constants/backgroundJobs';
import {PAGE_SIZE, TAKE_SIZE} from '../../../shared/constants/virtualPaging';
import {DEBOUNCE_TIMEOUT} from '../../../shared/constants/debounceTimeout';
import backgroundJobStartedSelector from '../selectors/pages/list/backgroundJobStartedSelector';
class LaborPeriodsListPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      skip: 0,
      data: [],
      total: 0,
      loading: true,
    };
    autoBind(this);
    setTimeout(() => this.checkBackgroundJobs());
    this.pollTimer = setInterval(this.checkBackgroundJobs, POLL_INTERVAL);

    this.getData = _.debounce(this.getData, DEBOUNCE_TIMEOUT);
    this.reloadLaborPeriodsDebounce = _.debounce(this.reloadLaborPeriods, DEBOUNCE_TIMEOUT);
  }

  componentDidMount() {
    const {clearModel} = this.props;
    clearModel();
    this.getData();
  }

  componentWillUnmount() {
    clearInterval(this.pollTimer);
    this.pollTimer = null;
  }

  checkBackgroundJobs() {
    const {
      pollBackgroundJobs,
    } = this.props;

    pollBackgroundJobs([KRONOS_LABOR_PERIOD_IMPORTER, KRONOS_LABOR_PERIOD_EXPORTER, KRONOS_LABOR_PERIODS_IMPORT_TEMPLATE_EXPORTER])
      .then(() => {
        const {activeBackgroundJobs, backgroundJobStarted} = this.props;

        if (!activeBackgroundJobs && backgroundJobStarted) {
          this.reloadLaborPeriods();
        }
      });
  }

  requestData() {
    const {skip, data} = this.state;
    if (data.length && data.slice(skip, skip + PAGE_SIZE).some(x => typeof x.id === 'undefined')) {
      this.getData();
    }
  }

  getData() {
    if (this.requestingData) return;
    this.requestingData = true;
    const {data} = this.state;
    const {filter, sort, router, loadLaborPeriodsList} = this.props;
    const skip = Math.max(0, this.state.skip - PAGE_SIZE);

    loadLaborPeriodsList(filter, sort, skip, TAKE_SIZE)
      .then(response => {
        const {laborPeriods, total} = response.value.data;
        const periods =
          data.length === total
            ? data
            : new Array(total).fill().map((e, i) => ({index: i})); // Have a slot for every labor periods to fill

        laborPeriods.forEach((lp, i) => {
          periods[i + skip] = {index: i, ...lp};
        });

        this.setState({data: periods, total, loading: false},
          () => {
            this.requestingData = false;
            this.requestData();
          });
      })
      .catch(error => {
        this.setState({loading: false});
        this.requestingData = false;
        handleApiError(error, router, 'An error occurred while attempting to load the Labor Periods list.', 'Error');
      });
  }

  handlePageChange(event) {
    if (event.page.skip === this.state.skip) return;
    const skip = isNaN(event.page.skip) ? 0 : event.page.skip;
    this.setState({skip},
      () => this.requestData());
  }

  handleCreateLaborPeriodClick() {
    const {router} = this.props;
    router.push('/kronos/laborperiods/create');
  }

  handleTableRowClick({dataItem}) {
    const {router} = this.props;

    router.push(`/kronos/laborperiods/${dataItem.id}`);
  }

  reloadLaborPeriods() {
    this.setState({
      data: [],
      total: 0,
      skip: 0,
      loading: true,
    }, () => this.getData());
  }

  handleSort({sort}) {

    this.props.sortLaborPeriods(sort);
    this.reloadLaborPeriodsDebounce();
  }

  handleFilter({filter}) {
    this.props.filterLaborPeriods(filter);
    this.reloadLaborPeriodsDebounce();
  }
  handleShowCreateExportRequest() {
    const {showCreateExportRequest, filter, setIsLaborPeriodsExportImportTemplateBackgroundJob} = this.props;
    setIsLaborPeriodsExportImportTemplateBackgroundJob(false);
    showCreateExportRequest(filter);
  }
  handleExportLaborPeriod(exportRequestId) {
    const {createLaborPeriodsExportRequestBackgroundJob, createLaborPeriodsExportImportTemplateRequestBackgroundJob, isLaborPeriodsExportImportTemplate, router} = this.props;

    if (isLaborPeriodsExportImportTemplate) {
      createLaborPeriodsExportImportTemplateRequestBackgroundJob(exportRequestId)
        .then(response => {
          if (response.value.data.backgroundedJob) {
            toastr.success(exportResponseText.SUCCESS, exportResponseText.SUCCESS_TITLE);
          } else {
            toastr.error(exportResponseText.FAILURE);
          }
        })
        .catch(error => handleApiError(error, router, 'An error occurred while attempting to export labor periods import template.', 'Error'));
    } else {
      createLaborPeriodsExportRequestBackgroundJob(exportRequestId)
        .then(response => {
          if (response.value.data.backgroundedJob) {
            toastr.success(exportResponseText.SUCCESS, exportResponseText.SUCCESS_TITLE);
          } else {
            toastr.error(exportResponseText.FAILURE);
          }
        })
        .catch(error => handleApiError(error, router, 'An error occurred while attempting to export Labor Periods.', 'Error'));
    }
  }

  handleShowCreateExportLaborPeriodImportTemplate() {
    const {showCreateExportRequest, setIsLaborPeriodsExportImportTemplateBackgroundJob} = this.props;
    setIsLaborPeriodsExportImportTemplateBackgroundJob(true);
    showCreateExportRequest();
  }

  handleValidationErrorsConfirm() {
    const {createdRecordCount, updatedRecordCount, totalRecordCount} = this.props;
    this.props.closeImportLaborPeriodsValidationErrors();

    const processedMsg = `${totalRecordCount} record${(totalRecordCount === 1) ? ' was' : 's were'} processed.`;
    const createdMsg = `${createdRecordCount} Labor Period${(createdRecordCount === 1) ? ' has' : 's have'} been added.`;
    const updatedMsg = `${updatedRecordCount} Labor Period${(updatedRecordCount === 1) ? ' has' : 's have'} been updated.`;

    toastr.success(`${processedMsg} ${createdMsg} ${updatedMsg}`, 'Import Results');
  }
  handleShowImportLaborPeriods() {
    const {activeBackgroundJobs, showImportLaborPeriods} = this.props;

    if (activeBackgroundJobs) return;

    showImportLaborPeriods();
  }

  handleClearFilters() {
    this.props.clearLaborPeriodListFilters();
    this.reloadLaborPeriods();
  }

  handleClearSorts() {
    this.props.clearLaborPeriodListSorts();
    this.reloadLaborPeriods();
  }


  render() {
    const {
      sort,
      filter,
      canEdit,
      activeBackgroundJobs,
      showValidationErrorsModal,
      validationErrors,
      hideClearFiltersButton,
      hideClearSortsButton,
    } = this.props;
    const {
      data,
      skip,
      total,
      loading,
    } = this.state;
    const page =
      data.slice(skip, skip + PAGE_SIZE);
    let recalcStatus = null;
    if (activeBackgroundJobs) {
      recalcStatus = <i className="fa fa-spinner fa-spin" title="Import/Export in progress" />;
    }
    return (
      <Page pageClassName="kronos-labor-periods-list-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Labor Periods</PageTitle>
          <PageHeaderActions>
            <ClearFiltersButton hide={hideClearFiltersButton} onClear={this.handleClearFilters} />
            <ClearSortsButton hide={hideClearSortsButton} onClear={this.handleClearSorts} />
            {recalcStatus}
            <Dropdown id="laborPeriods-export" className="btn-default header-button" pullRight disabled={activeBackgroundJobs}>
              <Dropdown.Toggle noCaret><i className="fa fa-file-excel-o" /></Dropdown.Toggle>
              <Dropdown.Menu>
                <MenuItem eventKey="1" onClick={this.handleShowCreateExportRequest}>
                  Export Labor Periods
                </MenuItem>
                <MenuItem eventKey="2" onClick={this.handleShowCreateExportLaborPeriodImportTemplate}>
                  Download Labor Period Import Template
                </MenuItem>
              </Dropdown.Menu>
            </Dropdown>
            {canEdit && <Dropdown id="laborPeriods-list-actions" disabled={activeBackgroundJobs} className="header-button" pullRight>
              <Dropdown.Toggle noCaret>
                <i className="fa fa-plus" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {canEdit && <MenuItem eventKey="1" onClick={this.handleCreateLaborPeriodClick}>
                  New Labor Period
                </MenuItem>}
                {canEdit && <MenuItem eventKey="2" onClick={this.handleShowImportLaborPeriods}>
                  Import Labor Periods
                </MenuItem>}
              </Dropdown.Menu>
            </Dropdown>}
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.KRONOS_INTEGRATION} />
          <MainContent loading={loading}>
            <AutoSizer>
              {({width, height}) => (
                <CustomizableGrid
                  data={page}
                  noFromJs

                  /* Paging */
                  skip={skip}
                  total={total}
                  pageSize={PAGE_SIZE}
                  scrollable={'virtual'}
                  onPageChange={this.handlePageChange}

                  /* Selecting */
                  onRowClick={this.handleTableRowClick}

                  /* Filtering */
                  onFilter={this.handleFilter}
                  filter={filter}

                  /* Sorting */
                  onSort={this.handleSort}
                  sort={sort}

                  /* Styles */
                  style={{width, height}}
                  rowHeight={40}>
                  <GridColumn field="name" title="Name" />
                  <GridColumn field="laborPeriodTypeName" title="Type" />
                </CustomizableGrid>
              )}
            </AutoSizer>
          </MainContent>
        </PageBody>
        <CreateExportRequestModal title="Export Labor Periods" onExportRequestCreated={this.handleExportLaborPeriod} />
        <ImportLaborPeriodsModal reloadLaborPeriods={this.reloadLaborPeriods} />
        <ImportFileValidationErrorsModal
          show={showValidationErrorsModal}
          validationErrors={validationErrors}
          onConfirm={this.handleValidationErrorsConfirm} />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const canEditSelector = makeCurrentUserHasPermissionSelector(KRONOS_LABOR_PERIOD_EDIT);
  return {
    sort: sortSelector(state),
    filter: filterSelector(state),
    canEdit: canEditSelector(state),
    hideClearFiltersButton: hideClearFiltersButtonSelector(state),
    hideClearSortsButton: hideClearSortsButtonSelector(state),
    showValidationErrorsModal: showSelector(state),
    createdRecordCount: createdRecordCountSelector(state),
    updatedRecordCount: updatedRecordCountSelector(state),
    totalRecordCount: totalRecordCountSelector(state),
    validationErrors: validationErrorsSelector(state),
    activeBackgroundJobs: activeBackgroundJobsSelector(state),
    backgroundJobStarted: backgroundJobStartedSelector(state),
    isLaborPeriodsExportImportTemplate: isLaborPeriodsExportImportTemplateBackgroundJobSelector(state),
  };
}

export default withRouter(connect(mapStateToProps, {
  showCreateModal,
  selectLaborPeriod,
  cancelEdit,
  sortLaborPeriods,
  filterLaborPeriods,
  loadLaborPeriodsList,
  loadLaborPeriod,
  clearModel,
  showCreateExportRequest,
  showImportLaborPeriods,
  closeImportLaborPeriodsValidationErrors,
  pollBackgroundJobs,
  clearLaborPeriodListFilters,
  clearLaborPeriodListSorts,
  createLaborPeriodsExportRequestBackgroundJob,
  createLaborPeriodsExportImportTemplateRequestBackgroundJob,
  setIsLaborPeriodsExportImportTemplateBackgroundJob,
})(LaborPeriodsListPage));
