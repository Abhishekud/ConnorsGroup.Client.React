import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {AutoSizer} from 'react-virtualized';
import {GridColumn} from '@progress/kendo-react-grid';
import {PreviousLink} from '../../../shared/components';
import {handleApiError} from '../../../shared/services';
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
  endpointSelector,
  requestsSelector,
  sortSelector,
  filterSelector,
  hideClearFiltersButtonSelector,
  hideClearSortsButtonSelector,
  loadingSelector,
} from '../selectors/pages/endpointList';
import {
  filterEndpointRequests,
  clearEndpointRequestsFilter,
  sortEndpointRequests,
  clearEndpointRequestsSort,
  loadIntegrationEndpointRequests,
} from '../actions';
import {IntegrationStatusCell, IntegrationStatusFilterCell} from './';

class EndpointRequestsListPage extends Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  componentDidMount() {
    const {loadIntegrationEndpointRequests, router, params} = this.props;
    loadIntegrationEndpointRequests(params.id)
      .catch(error => handleApiError(error, router, 'Unable to load Reflexis integration endpoints.'));
  }

  handleClearFilters() {
    this.props.clearEndpointRequestsFilter();
  }

  handleClearSorts() {
    this.props.clearEndpointRequestsSort();
  }

  handleSort({sort}) {
    this.props.sortEndpointRequests(sort);
  }

  handleFilter({filter}) {
    this.props.filterEndpointRequests(filter);
  }

  handleRowClick(row) {
    const {router, params} = this.props;
    router.push(`/reflexis/integration-endpoints/${params.id}/requests/${row.dataItem.id}`);
  }

  render() {
    const {
      endpoint,
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
          <PageTitle>{endpoint.get('name')} Requests</PageTitle>
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
                  <GridColumn title="Timestamp" field="timestamp" cell={DateTimeCell} />
                  <GridColumn title="Status" field="status" cell={IntegrationStatusCell} filterCell={IntegrationStatusFilterCell} />
                  <GridColumn title="Requested By" field="requestedBy" />
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
    endpoint: endpointSelector(state),
    requests: requestsSelector(state),
    sort: sortSelector(state),
    filter: filterSelector(state),
    hideClearFiltersButton: hideClearFiltersButtonSelector(state),
    hideClearSortsButton: hideClearSortsButtonSelector(state),
  };
}

const actions = {
  filterEndpointRequests,
  clearEndpointRequestsFilter,
  sortEndpointRequests,
  clearEndpointRequestsSort,
  loadIntegrationEndpointRequests,
};

EndpointRequestsListPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  endpoint: PropTypes.object.isRequired,
  requests: PropTypes.object.isRequired,
  sort: PropTypes.object,
  filter: PropTypes.object,
  hideClearFiltersButton: PropTypes.bool.isRequired,
  hideClearSortsButton: PropTypes.bool.isRequired,

  /* Actions */
  filterEndpointRequests: PropTypes.func.isRequired,
  clearEndpointRequestsFilter: PropTypes.func.isRequired,
  sortEndpointRequests: PropTypes.func.isRequired,
  clearEndpointRequestsSort: PropTypes.func.isRequired,
  loadIntegrationEndpointRequests: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, actions)(EndpointRequestsListPage));
