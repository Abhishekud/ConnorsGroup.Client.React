import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {AutoSizer} from 'react-virtualized';
import {Button} from 'react-bootstrap';
import {GridColumn} from '@progress/kendo-react-grid';
import {fromJS} from 'immutable';
import {CustomizableGrid} from '../../../customizableGrid/components';
import {handleApiError} from '../../../shared/services';
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
import {
  CreateJobModal,
  DeleteJobModal,
  EditJobSidebar,
} from './';
import {
  showCreateModal,
  selectJob,
  cancelEdit,
  filterJobs,
  sortJobs,
  loadJobsList,
} from '../actions';
import {
  jobsSelector,
  selectedJobSelector,
  sortSelector,
  filterSelector,
  numberOfSidebarsShowingSelector,
} from '../selectors/pages/list';

class JobsListPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {loadJobsList, router} = this.props;

    loadJobsList()
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Jobs list.', 'error'));
  }

  handleCreateJobClick() {
    this.props.showCreateModal();
    this.props.cancelEdit();
  }

  handleTableRowClick({dataItem}) {
    const {selectJob, jobs, cancelEdit, selectedJob} = this.props;
    const newSelection = jobs.find(d => d.get('id') === dataItem.id);
    if (dataItem.id === (selectedJob && selectedJob.get('id'))) {
      cancelEdit();
    } else {
      selectJob(newSelection);
    }
  }

  handleSort({sort}) {
    this.props.sortJobs(fromJS(sort));
  }

  handleFilter({filter}) {
    this.props.filterJobs(fromJS(filter));
  }

  render() {
    const {loading, jobs, sort, filter, numberOfSidebarsShowing} = this.props;

    return (
      <Page pageClassName="kronos-labor-jobs-list-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Jobs</PageTitle>
          <PageHeaderActions>
            <Button id="createJob" onClick={this.handleCreateJobClick}><i className="fa fa-plus" /></Button>
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.KRONOS_INTEGRATION} />
          <MainContent loading={loading}>
            <AutoSizer>
              {({width, height}) => (
                <CustomizableGrid data={jobs}
                  style={{width: width + (numberOfSidebarsShowing * layout.SIDEBAR_WIDTH), height}}
                  onRowClick={this.handleTableRowClick} selectedField="selected"
                  sort={sort} onSort={this.handleSort}
                  filter={filter} onFilter={this.handleFilter} >
                  <GridColumn field="name" title="Name" />
                </CustomizableGrid>
              )}
            </AutoSizer>
          </MainContent>
          <EditJobSidebar />
        </PageBody>
        <CreateJobModal />
        <DeleteJobModal />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: false,
    jobs: jobsSelector(state),
    selectedJob: selectedJobSelector(state),
    sort: sortSelector(state),
    filter: filterSelector(state),
    numberOfSidebarsShowing: numberOfSidebarsShowingSelector(state),
  };
}

export default withRouter(connect(mapStateToProps, {
  showCreateModal,
  selectJob,
  cancelEdit,
  sortJobs,
  filterJobs,
  loadJobsList,
})(JobsListPage));
