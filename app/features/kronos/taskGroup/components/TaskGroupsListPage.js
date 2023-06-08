import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {AutoSizer} from 'react-virtualized';
import {Dropdown, MenuItem} from 'react-bootstrap';
import {GridColumn} from '@progress/kendo-react-grid';
import moment from 'moment';
import {Map} from 'immutable';
import _ from 'lodash';
import {
  ClearFiltersButton,
  ClearSortsButton,
  CustomizableGrid,
  KronosItemExportStatusCell,
  KronosItemExportStatusFilterCell,
} from '../../../customizableGrid/components';
import {
  MainContent,
  NavigationSidebar,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../../layout/components';
import {layout, navigationGroups} from '../../../shared/constants';
import makeCurrentUserHasPermissionSelector from '../../../authentication/selectors/currentUser/makeCurrentUserHasPermissionSelector';
import {KRONOS_TASK_GROUPS_EDIT, KRONOS_TASK_GROUPS_EXPORT} from '../../../authentication/constants/permissions';
import {loadEndpointsListForSelect} from '../../integrationEndpoint/actions';
import {handleApiError, toastr} from '../../../shared/services';
import {KronosEndpointSelect} from '../../shared/components';
import {
  CreateTaskGroupModal,
  DeleteTaskGroupModal,
  EditTaskGroupSidebar,
  ImportTaskGroupsModal,
  ImportTaskGroupsValidationErrorsModal,
} from './';
import {
  showCreateModal,
  cancelEdit,
  loadTaskGroupsList,
  loadTaskGroup,
  showImportTaskGroups,
} from '../actions';
import {
  selectedTaskGroupSelector,
  numberOfSidebarsShowingSelector,
  kronosEndpointsSelectOptionsSelector,
  kronosEndpointsSelector,
  activeBackgroundJobsSelector, backgroundJobStartedSelector} from '../selectors/pages/list';
import {configurationKronosVersion} from '../../../shared/selectors/components/settings';
import {KRONOS_INTEGRATION_VERSION_ENUM_INDEX} from '../../constants/KronosVersions';
import {pollBackgroundJobs} from '../../../shared/actions';
import {POLL_INTERVAL, KRONOS_TASK_GROUPS_IMPORTER} from '../../../shared/constants/backgroundJobs';
import {PAGE_SIZE} from '../../../shared/constants/virtualPaging';

class TaskGroupsListPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
    setTimeout(() => this.checkBackgroundJobs());
    this.pollTimer = setInterval(this.checkBackgroundJobs, POLL_INTERVAL);
    this.state = {
      skip: 0,
      taskGroups: [],
      filter: null,
      sort: null,
      total: 0,
      pageSize: 40,
      selectedEndpoint: new Map(),
      loading: true,
    };
    this.handleFilterChangeDebounce = _.debounce(() => {
      this.reloadTaskGroups();
    }, 500);
    this.handleSortChangeDebounce = _.debounce(() => {
      this.sortTaskGroups();
    }, 500);
  }

  componentDidMount() {
    const {loadEndpointsListForSelect, router} = this.props;

    loadEndpointsListForSelect()
      .catch(error => handleApiError(error, router, 'An error occurred attempting to load Kronos endpoints.', 'Error'));

    this.requestData(0);
  }

  componentWillUnmount() {
    clearInterval(this.pollTimer);
    this.pollTimer = null;
  }

  requestIfNeeded(skip) {
    const {taskGroups} = this.state;
    for (let i = skip; i < skip + PAGE_SIZE - 1 && i < taskGroups.length; i++) {
      if (typeof taskGroups[i].id === 'undefined') {
        this.requestData(skip);
        return;
      }
    }
  }
  reloadTaskGroups() {

    this.setState({
      taskGroups: [],
      selectedIds: Map(),
      total: 0,
      skip: 0,
      loading: true,
    });
    this.requestData(0);
  }

  sortTaskGroups() {
    this.setState({
      taskGroups: [],
      total: 0,
      loading: true,
    });
    this.requestData(0);
  }

  requestData(skipParameter) {
    if (this.requestInProgress) return;
    this.requestInProgress = true;
    const skip = Math.max(skipParameter - PAGE_SIZE, 0);
    const {router, loadTaskGroupsList} = this.props;
    loadTaskGroupsList(skip, this.state.filter, this.state.sort, this.state.selectedEndpoint.get('id', null))
      .then(result => {
        const {total, taskGroups} = result.value.data;

        const taskGroupsList = this.state.skip === 0
          ? new Array(total).fill().map((e, i) => ({index: i}))
          : this.state.taskGroups;

        taskGroups.forEach((taskGroup, i) => {
          taskGroupsList[i + skip] = {index: i + skip, ...taskGroup, exportStartTime: moment(taskGroup.exportStartTime).toDate()};
        });

        this.setState({
          taskGroups: taskGroupsList,
          total,
          loading: false,
        });
        this.requestInProgress = false;
        this.requestIfNeeded(skip);
      })
      .catch(error => {
        this.setState({
          loading: false,
        });
        this.requestInProgress = false;
        handleApiError(error, router, 'An error occurred while attempting to load the Task Groups list.', 'error');
      });
  }
  handlePageChange(event) {
    if (event.page.skip === this.state.skip) return;
    // somehow kendo will pass NaN after sorting changes.  :/
    const skip = isNaN(event.page.skip) ? 0 : event.page.skip;
    this.requestIfNeeded(skip);
    this.setState({skip});
  }
  checkBackgroundJobs() {
    const {
      pollBackgroundJobs,
    } = this.props;
    pollBackgroundJobs([KRONOS_TASK_GROUPS_IMPORTER])
      .then(() => {
        const {activeBackgroundJobs, backgroundJobStarted} = this.props;

        if (!activeBackgroundJobs && backgroundJobStarted) {
          this.reloadTaskGroups();
        }
      });
  }

  handleCreateTaskGroupClick() {
    this.props.showCreateModal();
    this.props.cancelEdit();
  }

  handleTableRowClick({dataItem}) {
    const {loadTaskGroup, cancelEdit, selectedTaskGroup, router} = this.props;
    if (dataItem.id === (selectedTaskGroup && selectedTaskGroup.get('id'))) {
      cancelEdit();
    } else {
      loadTaskGroup(dataItem.id, this.state.selectedEndpoint.get('id', null))
        .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Task Group.', 'error'));
    }
  }


  handleFilter({filter}) {
    const customFilters = ['gt', 'gte', 'lt', 'lte', 'eq', 'neq'];
    if (filter) {
      for (let index = 0; index < filter.filters.length; index++) {
        if (filter.filters[index].field === 'exportStartTime') {
          if (customFilters.indexOf(filter.filters[index].operator) >= 0 && !filter.filters[index].value) {
            toastr.error('Please select date before applying filter.');
            return;
          }
        }
      }
    }
    this.setState({filter});
    this.handleFilterChangeDebounce();
  }

  handleSort({sort}) {
    this.setState({sort});
    this.handleSortChangeDebounce();
  }

  formatTaskGroupsDataForPresentation() {
    const {
      taskGroups,
      skip,
      pageSize,
    } = this.state;
    return taskGroups.slice(skip, skip + pageSize);
  }

  handleExportImportTemplate() {
    window.location.href = `${process.env.API_BASE_URL}kronos/taskgroup/import/template`;
  }

  handleSelectKronosEndpoint({target}) {
    const {kronosEndpoints, selectedTaskGroup, router} = this.props;
    const targetId = parseInt(target.value, 10);

    const endpoint = kronosEndpoints.find(ep =>
      ep.get('id') === targetId, null, new Map());
    this.setState({selectedEndpoint: endpoint},
      () => this.reloadTaskGroups());
    if (selectedTaskGroup.get('id')) {
      loadTaskGroup(selectedTaskGroup.get('id'), target.value)
        .catch(error => handleApiError(error, router, 'An error occurred while attempting to reload the Task Group.', 'error'));
    }
  }

  handleClearFilters() {
    this.setState({filter: null});
    this.handleFilterChangeDebounce();
  }

  handleClearSorts() {
    this.setState({sort: null});
    this.handleSortChangeDebounce();
  }


  render() {
    const {
      numberOfSidebarsShowing,
      showImportTaskGroups,
      kronosEndpointsSelectList,
      canEdit,
      canExport,
      kronosVersion,
      activeBackgroundJobs,
    } = this.props;

    const {
      loading,
      skip,
      total,
      filter,
      sort,
      selectedEndpoint,
    } = this.state;
    return (
      <Page pageClassName="kronos-labor-taskGroups-list-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Task Groups</PageTitle>
          <PageHeaderActions>
            <ClearFiltersButton hide={!filter} onClear={this.handleClearFilters} />
            <ClearSortsButton hide={!sort} onClear={this.handleClearSorts} />
            {kronosVersion !== KRONOS_INTEGRATION_VERSION_ENUM_INDEX.TUMBLEWEED &&
              <KronosEndpointSelect selectedEndpoint={selectedEndpoint.get('id', null)} kronosEndpoints={kronosEndpointsSelectList} onChange={this.handleSelectKronosEndpoint} />}
            {canExport && <Dropdown id="export" className="btn-default header-button" title={activeBackgroundJobs ? 'Import in progress' : ''} pullRight disabled={activeBackgroundJobs}>
              <Dropdown.Toggle noCaret><i className="fa fa-file-excel-o" /></Dropdown.Toggle>
              <Dropdown.Menu>
                <MenuItem eventKey="1" onClick={this.handleExportImportTemplate}>
                  Export Task Groups
                </MenuItem>
              </Dropdown.Menu>
            </Dropdown>}
            {canEdit && <Dropdown id="add" className="btn-default header-button" title={activeBackgroundJobs ? 'Import in progress' : ''} pullRight disabled={activeBackgroundJobs}>
              <Dropdown.Toggle noCaret><i className="fa fa-plus" /></Dropdown.Toggle>
              <Dropdown.Menu>
                <MenuItem eventKey="1" onClick={this.handleCreateTaskGroupClick}>
                  New Task Group
                </MenuItem>
                <MenuItem eventKey="2" onClick={showImportTaskGroups}>
                  Import Task Groups
                </MenuItem>
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
                  noFromJs
                  data={this.formatTaskGroupsDataForPresentation()}
                  style={{width: width + (numberOfSidebarsShowing * layout.SIDEBAR_WIDTH), height}}
                  total={total} skip={skip}
                  scrollable={'virtual'} onPageChange={this.handlePageChange} rowHeight={40}
                  onRowClick={this.handleTableRowClick} selectedField="selected"
                  sort={sort} onSort={this.handleSort}
                  filter={filter} onFilter={this.handleFilter} >
                  <GridColumn field="name" title="Name" />
                  <GridColumn field="success" title="Export Status" width={200} cell={KronosItemExportStatusCell} filterCell={KronosItemExportStatusFilterCell} />
                  <GridColumn field="exportStartTime" title="Last Exported" width={200} filter="date" format="{0:yyyy-MM-dd HH:mm:ss}" />
                </CustomizableGrid>
              )}
            </AutoSizer>
          </MainContent>
          <EditTaskGroupSidebar canEdit={canEdit} reloadList={this.reloadTaskGroups} />
        </PageBody>
        <CreateTaskGroupModal reloadList={this.reloadTaskGroups} />
        <DeleteTaskGroupModal reloadList={this.reloadTaskGroups} />
        <ImportTaskGroupsModal reloadList={this.reloadTaskGroups} />
        <ImportTaskGroupsValidationErrorsModal />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const canEditSelector = makeCurrentUserHasPermissionSelector(KRONOS_TASK_GROUPS_EDIT);
  const canExportSelector = makeCurrentUserHasPermissionSelector(KRONOS_TASK_GROUPS_EXPORT);
  return {
    selectedTaskGroup: selectedTaskGroupSelector(state),
    numberOfSidebarsShowing: numberOfSidebarsShowingSelector(state),
    kronosEndpointsSelectList: kronosEndpointsSelectOptionsSelector(state),
    canEdit: canEditSelector(state),
    canExport: canExportSelector(state),
    kronosVersion: configurationKronosVersion(state),
    kronosEndpoints: kronosEndpointsSelector(state),

    activeBackgroundJobs: activeBackgroundJobsSelector(state),
    backgroundJobStarted: backgroundJobStartedSelector(state),
  };
}

export default withRouter(connect(mapStateToProps, {
  showCreateModal,
  cancelEdit,

  loadTaskGroupsList,
  loadTaskGroup,
  showImportTaskGroups,
  loadEndpointsListForSelect,
  pollBackgroundJobs,

})(TaskGroupsListPage));
