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
  attributeSelector,
  requestsSelector,
  sortSelector,
  filterSelector,
  hideClearFiltersButtonSelector,
  hideClearSortsButtonSelector,
} from '../selectors/pages/attributeList';
import {
  filterAttributeRequests,
  clearAttributeRequestsFilter,
  sortAttributeRequests,
  clearAttributeRequestsSort,
  loadAttributeRequests,
} from '../actions';
import {IntegrationStatusCell, IntegrationStatusFilterCell} from './';

class AttributeStatusesListPage extends Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  componentDidMount() {
    const {loadAttributeRequests, router, params} = this.props;
    loadAttributeRequests(params.id)
      .catch(error => handleApiError(error, router, 'Unable to load Reflexis integration requests.'));
  }

  handleClearFilters() {
    this.props.clearAttributeRequestsFilter();
  }

  handleClearSorts() {
    this.props.clearAttributeRequestsSort();
  }

  handleSort({sort}) {
    this.props.sortAttributeRequests(sort);
  }

  handleFilter({filter}) {
    this.props.filterAttributeRequests(filter);
  }

  handleRowClick(row) {
    const {router} = this.props;
    router.push(`/reflexis/integration-endpoints/${row.dataItem.endpointId}/requests/${row.dataItem.requestId}`);
  }

  render() {
    const {
      attribute,
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
          <PageTitle>Attribute Statuses: {attribute.name}</PageTitle>
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
    attribute: attributeSelector(state),
    requests: requestsSelector(state),
    sort: sortSelector(state),
    filter: filterSelector(state),
    hideClearFiltersButton: hideClearFiltersButtonSelector(state),
    hideClearSortsButton: hideClearSortsButtonSelector(state),
  };
}

const actions = {
  filterAttributeRequests,
  clearAttributeRequestsFilter,
  sortAttributeRequests,
  clearAttributeRequestsSort,
  loadAttributeRequests,
};

AttributeStatusesListPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  attribute: PropTypes.object.isRequired,
  requests: PropTypes.object.isRequired,
  sort: PropTypes.object,
  filter: PropTypes.object,
  hideClearFiltersButton: PropTypes.bool.isRequired,
  hideClearSortsButton: PropTypes.bool.isRequired,

  /* Actions */
  filterAttributeRequests: PropTypes.func.isRequired,
  clearAttributeRequestsFilter: PropTypes.func.isRequired,
  sortAttributeRequests: PropTypes.func.isRequired,
  clearAttributeRequestsSort: PropTypes.func.isRequired,
  loadAttributeRequests: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, actions)(AttributeStatusesListPage));

