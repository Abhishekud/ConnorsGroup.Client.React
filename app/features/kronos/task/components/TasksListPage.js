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
import {handleApiError, toastr} from '../../../shared/services';
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
import {KRONOS_TASKS_EDIT, KRONOS_TASKS_EXPORT} from '../../../authentication/constants/permissions';
import {loadEndpointsListForSelect} from '../../integrationEndpoint/actions';
import {
  CreateTaskModal,
  DeleteTaskModal,
  EditTaskSidebar,
  ImportTasksModal,
  ImportTasksValidationErrorsModal,
} from './';
import {KronosEndpointSelect} from '../../shared/components';
import {
  showCreateModal,
  cancelEdit,

  loadTaskGroupsList,
  loadTasksList,
  loadTask,
  showImportTasks,
} from '../actions';
import {
  selectedTaskSelector,
  numberOfSidebarsShowingSelector,
  kronosEndpointsSelectOptionsSelector,
  kronosEndpointsSelector,
  activeBackgroundJobsSelector,
  backgroundJobStartedSelector,
} from '../selectors/pages/list';
import {configurationKronosVersion} from '../../../shared/selectors/components/settings';
import {KRONOS_INTEGRATION_VERSION_ENUM_INDEX} from '../../constants/KronosVersions';
import {pollBackgroundJobs} from '../../../shared/actions';
import {POLL_INTERVAL, KRONOS_TASK_IMPORTER} from '../../../shared/constants/backgroundJobs';
import {PAGE_SIZE} from '../../../shared/constants/virtualPaging';
import {DEBOUNCE_TIMEOUT} from '../../../shared/constants/debounceTimeout';

class TasksListPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
    setTimeout(() => this.checkBackgroundJobs());
    this.pollTimer = setInterval(this.checkBackgroundJobs, POLL_INTERVAL);

    this.state = {
      skip: 0,
      tasks: [],
      filter: null,
      sort: null,
      total: 0,
      pageSize: 40,
      loading: true,
      selectedEndpoint: new Map(),
    };

    this.handleFilterChangeDebounce = _.debounce(() => {
      this.reloadTasks();
    }, DEBOUNCE_TIMEOUT);
    this.handleSortChangeDebounce = _.debounce(() => {
      this.sortTasks();
    }, DEBOUNCE_TIMEOUT);
  }

  componentDidMount() {
    const {loadTaskGroupsList, router, loadEndpointsListForSelect} = this.props;

    loadEndpointsListForSelect()
      .catch(error => handleApiError(error, router, 'An error occurred attempting to load Kronos endpoints.', 'Error'));

    loadTaskGroupsList()
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Task Groups list.', 'error'));

    this.requestData(0);
  }

  componentWillUnmount() {
    clearInterval(this.pollTimer);
    this.pollTimer = null;
  }

  requestIfNeeded(skip) {
    const {tasks} = this.state;
    for (let i = skip; i < skip + PAGE_SIZE - 1 && i < tasks.length; i++) {
      if (typeof tasks[i].id === 'undefined') {
        this.requestData(skip);
        return;
      }
    }
  }
  reloadTasks() {

    this.setState({
      tasks: [],
      selectedIds: Map(),
      total: 0,
      skip: 0,
      loading: true,
    });
    this.requestData(0);
  }

  sortTasks() {
    this.setState({
      tasks: [],
      total: 0,
      loading: true,
    });
    this.requestData(0);
  }

  requestData(skipParameter) {
    if (this.requestInProgress) return;
    this.requestInProgress = true;
    const skip = Math.max(skipParameter - PAGE_SIZE, 0);
    const {router, loadTasksList} = this.props;
    loadTasksList(skip, this.state.filter, this.state.sort, this.state.selectedEndpoint.get('id', null))
      .then(result => {
        const {total, tasks} = result.value.data;
        const tasksList = skipParameter === 0
          ? new Array(total).fill().map((e, i) => ({index: i}))
          : this.state.tasks;
        tasks.forEach((task, i) => {
          tasksList[i + skip] = {index: i + skip, ...task, exportStartTime: moment(task.exportStartTime).toDate()};
        });

        this.setState({
          tasks: tasksList,
          total,
          loading: false,
        });
        this.requestInProgress = false;
        this.requestIfNeeded(skip);
      })
      .catch(error => {
        this.requestInProgress = false;
        this.setState({
          loading: false,
        });
        handleApiError(error, router, 'An error occurred while attempting to load the Tasks list.', 'error');
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

    pollBackgroundJobs([KRONOS_TASK_IMPORTER])
      .then(() => {
        const {activeBackgroundJobs, backgroundJobStarted} = this.props;

        if (!activeBackgroundJobs && backgroundJobStarted) {
          this.reloadTasks();
        }
      });
  }

  handleCreateTaskClick() {
    this.props.showCreateModal();
    this.props.cancelEdit();
  }

  handleTableRowClick({dataItem}) {
    const {cancelEdit, selectedTask, loadTask, router} = this.props;
    if (dataItem.id === (selectedTask && selectedTask.get('id'))) {
      cancelEdit();
    } else {
      loadTask(dataItem.id, this.state.selectedEndpoint.get('id', null))
        .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Task.', 'error'));
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

  formatTasksDataForPresentation() {
    const {
      tasks,
      skip,
      pageSize,
    } = this.state;
    return tasks.slice(skip, skip + pageSize);
  }

  handleExportImportTemplate() {
    window.location.href = `${process.env.API_BASE_URL}kronos/task/import/template`;
  }

  handleSelectKronosEndpoint({target}) {
    const {kronosEndpoints} = this.props;
    const targetId = parseInt(target.value, 10);

    const endpoint = kronosEndpoints.find(ep =>
      ep.get('id') === targetId, null, new Map());
    this.setState({selectedEndpoint: endpoint},
      () => this.reloadTasks());
  }

  handleClearFilters() {
    this.setState({filter: null}, () => this.reloadTasks());
  }

  handleClearSorts() {
    this.setState({sort: null}, () => this.reloadTasks());
  }
  render() {
    const {
      numberOfSidebarsShowing,
      showImportTasks,
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
      <Page pageClassName="kronos-labor-tasks-list-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Tasks</PageTitle>
          <PageHeaderActions>
            <ClearFiltersButton hide={!filter} onClear={this.handleClearFilters} />
            <ClearSortsButton hide={!sort} onClear={this.handleClearSorts} />
            {kronosVersion !== KRONOS_INTEGRATION_VERSION_ENUM_INDEX.TUMBLEWEED &&
              <KronosEndpointSelect selectedEndpoint={selectedEndpoint.get('id', null)} kronosEndpoints={kronosEndpointsSelectList} onChange={this.handleSelectKronosEndpoint} />}
            {canExport && <Dropdown id="export" className="btn-default header-button" title={activeBackgroundJobs ? 'Import in progress' : ''} pullRight disabled={activeBackgroundJobs}>
              <Dropdown.Toggle noCaret><i className="fa fa-file-excel-o" /></Dropdown.Toggle>
              <Dropdown.Menu>
                <MenuItem eventKey="1" onClick={this.handleExportImportTemplate}>
                  Export Tasks
                </MenuItem>
              </Dropdown.Menu>
            </Dropdown>}
            {canEdit && <Dropdown id="add" className="btn-default header-button" title={activeBackgroundJobs ? 'Import in progress' : ''} pullRight disabled={activeBackgroundJobs}>
              <Dropdown.Toggle noCaret><i className="fa fa-plus" /></Dropdown.Toggle>
              <Dropdown.Menu>
                <MenuItem eventKey="1" onClick={this.handleCreateTaskClick}>
                  New Task
                </MenuItem>
                <MenuItem eventKey="2" onClick={showImportTasks}>
                  Import Tasks
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
                  data={this.formatTasksDataForPresentation()}
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
          <EditTaskSidebar canEdit={canEdit} reloadTasks={this.reloadTasks} />
        </PageBody>
        <CreateTaskModal reloadTasks={this.reloadTasks} />
        <DeleteTaskModal reloadTasks={this.reloadTasks} />
        <ImportTasksModal reloadTasks={this.reloadTasks} />
        <ImportTasksValidationErrorsModal />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const canEditSelector = makeCurrentUserHasPermissionSelector(KRONOS_TASKS_EDIT);
  const canExportSelector = makeCurrentUserHasPermissionSelector(KRONOS_TASKS_EXPORT);

  return {
    loading: false,
    selectedTask: selectedTaskSelector(state),
    numberOfSidebarsShowing: numberOfSidebarsShowingSelector(state),
    kronosEndpointsSelectList: kronosEndpointsSelectOptionsSelector(state),
    kronosEndpoints: kronosEndpointsSelector(state),
    canEdit: canEditSelector(state),
    canExport: canExportSelector(state),
    kronosVersion: configurationKronosVersion(state),

    activeBackgroundJobs: activeBackgroundJobsSelector(state),
    backgroundJobStarted: backgroundJobStartedSelector(state),
  };
}

export default withRouter(connect(mapStateToProps, {
  showCreateModal,
  cancelEdit,

  loadTaskGroupsList,
  loadTasksList,

  loadTask,
  showImportTasks,
  loadEndpointsListForSelect,

  pollBackgroundJobs,
})(TasksListPage));
