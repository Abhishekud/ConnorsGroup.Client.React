import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {AutoSizer} from 'react-virtualized';
import {GridColumn} from '@progress/kendo-react-grid';
import {handleApiError} from '../../../shared/services';
import {PreviousLink} from '../../../shared/components';
import {
  MainContent,
  NavigationSidebar,
  Page,
  PageHeader,
  PageHeaderActions,
  PageBody,
  PageTitle,
} from '../../../layout/components';
import {
  ClearFiltersButton,
  ClearSortsButton,
  CustomizableGrid,
  DateTimeCell,
} from '../../../customizableGrid/components';
import {
  loadingSelector,
  locationSelector,
  requestsSelector,
  sortSelector,
  filterSelector,
  hideClearFiltersButtonSelector,
  hideClearSortsButtonSelector,
} from '../selectors/pages/locationList';
import {
  filterLocationRequests,
  clearLocationRequestsFilter,
  sortLocationRequests,
  clearLocationRequestsSort,
  loadLocationRequests,
} from '../actions';
import {IntegrationStatusCell, IntegrationStatusFilterCell} from './';

class LocationStatusesListPage extends Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  componentDidMount() {
    const {loadLocationRequests, router, params} = this.props;
    loadLocationRequests(params.id)
      .catch(error => handleApiError(error, router, 'Unable to load Reflexis integration requests.'));
  }

  handleClearFilters() {
    this.props.clearLocationRequestsFilter();
  }

  handleClearSorts() {
    this.props.clearLocationRequestsSort();
  }

  handleSort({sort}) {
    this.props.sortLocationRequests(sort);
  }

  handleFilter({filter}) {
    this.props.filterLocationRequests(filter);
  }

  handleRowClick(row) {
    const {router} = this.props;
    router.push(`/reflexis/integration-endpoints/${row.dataItem.endpointId}/requests/${row.dataItem.requestId}`);
  }

  render() {
    const {
      location,
      requests,
      hideClearFiltersButton,
      hideClearSortsButton,
      sort,
      filter,
      loading,
    } = this.props;

    return (
      <Page pageClassName="reflexis-integration-status-list-page">
        <PageHeader>
          <PageHeaderActions>
            <PreviousLink />
          </PageHeaderActions>
          <PageTitle>Location Statuses: {location.name}</PageTitle>
          <PageHeaderActions>
            <ClearFiltersButton hide={hideClearFiltersButton} onClear={this.handleClearFilters} />
            <ClearSortsButton hide={hideClearSortsButton} onClear={this.handleClearSorts} />
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar />
          <MainContent loading={loading}>
            <AutoSizer>
              {({width, height}) => (
                <CustomizableGrid
                  data={requests}
                  style={{width, height}}
                  sort={sort}
                  onSort={this.handleSort}
                  filter={filter}
                  onFilter={this.handleFilter}
                  onRowClick={this.handleRowClick}>
                  <GridColumn title="Endpoint" field="endpoint" />
                  <GridColumn title="Timestamp" field="timestamp" cell={DateTimeCell} />
                  <GridColumn title="Requested By" field="requester" />
                  <GridColumn title="Integration Status" field="status" cell={IntegrationStatusCell} filterCell={IntegrationStatusFilterCell} />
                </CustomizableGrid>
              )}
            </AutoSizer>
          </MainContent>
        </PageBody>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: loadingSelector(state),
    location: locationSelector(state),
    requests: requestsSelector(state),
    sort: sortSelector(state),
    filter: filterSelector(state),
    hideClearFiltersButton: hideClearFiltersButtonSelector(state),
    hideClearSortsButton: hideClearSortsButtonSelector(state),
  };
}

const actions = {
  filterLocationRequests,
  clearLocationRequestsFilter,
  sortLocationRequests,
  clearLocationRequestsSort,
  loadLocationRequests,
};

LocationStatusesListPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  requests: PropTypes.object.isRequired,
  sort: PropTypes.object,
  filter: PropTypes.object,
  hideClearFiltersButton: PropTypes.bool.isRequired,
  hideClearSortsButton: PropTypes.bool.isRequired,

  /* Actions */
  filterLocationRequests: PropTypes.func.isRequired,
  clearLocationRequestsFilter: PropTypes.func.isRequired,
  sortLocationRequests: PropTypes.func.isRequired,
  clearLocationRequestsSort: PropTypes.func.isRequired,
  loadLocationRequests: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, actions)(LocationStatusesListPage));
