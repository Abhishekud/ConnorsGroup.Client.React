import React, {Component} from 'react';
import autoBind from 'react-autobind';
import _ from 'lodash';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {AutoSizer} from 'react-virtualized';
import {GridColumn} from '@progress/kendo-react-grid';
import {FormattedDate, PreviousLink} from '../../../shared/components';
import {handleApiError} from '../../../shared/services';
import {PAGE_SIZE} from '../../../shared/constants/virtualPaging';
import {
  ClearFiltersButton,
  ClearSortsButton,
  CustomizableGrid,
  DropDownListFilterCell,
} from '../../../customizableGrid/components';
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
  modelSelector,
  loadingSelector,
  storeAttributeStatusesSelector,
  sortSelector,
  filterSelector,
} from '../selectors/pages/integrationStatus';
import {
  loadIntegrationStatus,
  loadStoreAttributeStatuses,
  filterStoreAttributes,
  sortStoreAttributes,
} from '../actions';

const statuses = [
  {text: '', value: ''},
  {text: 'Not Sent', value: 0, string: 'NotSent'},
  {text: 'Skipped', value: 1, string: 'Skipped'},
  {text: 'Failed', value: 2, string: 'Failed'},
  {text: 'Completed', value: 3, string: 'Completed'},
];

function StoreAttributeStatusFilterCell(props) {
  return (<DropDownListFilterCell options={statuses} {...props} />);
}

function StoreAttributeStatusCell(props) {
  const value = props.dataItem[props.field];
  const text = statuses.find(status => status.string === value).text;
  return (<td {...props}>{text}</td>);
}

class IntegrationStatusPage extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      skip: 0,
      total: 0,
      storeAttributeStatuses: [],
    };
    this.getStoreAttributeStatuses = _.debounce(this.getStoreAttributeStatuses, 800);
    this.updateStoreAttributeStatuses = _.debounce(this.getStoreAttributeStatuses, 1500);
  }

  componentDidMount() {
    const {
      loadIntegrationStatus,
      router,
      params,
    } = this.props;

    loadIntegrationStatus(params.endpointId, params.id)
      .catch(error => handleApiError(error, router, 'Unable to load Reflexis integration status.'));

    this.getStoreAttributeStatuses();
  }

  requestStoreAttributeStatuses() {
    const {skip, storeAttributeStatuses} = this.state;

    if (storeAttributeStatuses.slice(skip, skip + PAGE_SIZE).some(x => typeof x.locationId === 'undefined')) {
      this.getStoreAttributeStatuses();
    }
  }

  getStoreAttributeStatuses() {
    if (this.loadingStoreAttributeStatuses) return;
    this.loadingStoreAttributeStatuses = true;

    const existingStatuses = this.state.storeAttributeStatuses;
    const {filter, sort, loadStoreAttributeStatuses, router, params} = this.props;
    const skip = Math.max(0, this.state.skip - PAGE_SIZE);

    loadStoreAttributeStatuses(params.endpointId, params.id, filter, sort, skip)
      .then(response => {
        const {storeAttributeStatuses, total} = response.value.data;
        const statuses =
          existingStatuses.length === total
            ? existingStatuses
            : new Array(total).fill().map((e, i) => ({index: i}));

        storeAttributeStatuses.forEach((sa, i) => {
          statuses[i + skip] = {index: i, ...sa};
        });

        this.setState({storeAttributeStatuses: statuses, total});
        this.loadingStoreAttributeStatuses = false;
        this.requestStoreAttributeStatuses();
      })
      .catch(error => handleApiError(error, router, 'Unable to load store attribute statuses.'));
  }

  handlePageChange(event) {
    if (event.page.skip === this.state.skip) return;
    const skip = isNaN(event.page.skip) ? 0 : event.page.skip;
    this.setState({skip});
    this.requestStoreAttributeStatuses();
  }

  handleFilter({filter}) {
    this.props.filterStoreAttributes(filter);
    this.setState({storeAttributeStatuses: [], skip: 0});
    this.updateStoreAttributeStatuses();
  }

  handleSort({sort}) {
    this.props.sortStoreAttribute(sort);
    this.setState({storeAttributeStatuses: [], skip: 0});
    this.updateStoreAttributeStatuses();
  }


  handleClearFilters() {}
  handleClearSorts() {}

  handleRowClick() {}

  render() {
    const hideClearFiltersButton = true;
    const hideClearSortsButton = true;
    const {
      sort,
      filter,
      model,
      loading,
    } = this.props;

    const {storeAttributeStatuses, skip, total} = this.state;
    const page = storeAttributeStatuses.slice(skip, skip + PAGE_SIZE);

    return (
      <Page pageClassName="reflexis-integration-status-page">
        <PageHeader>
          <PageHeaderActions>
            <PreviousLink />
          </PageHeaderActions>
          <PageTitle>Integration Status</PageTitle>
          <PageHeaderActions>
            <ClearFiltersButton hide={hideClearFiltersButton} onClear={this.handleClearFilters} />
            <ClearSortsButton hide={hideClearSortsButton} onClear={this.handleClearSorts} />
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar />
          <MainContent loading={loading}>
            <div style={{width: '100%', height: '100%', display: 'flex', flexFlow: 'column nowrap'}}>
              {!loading &&
              <section style={{width: '100%', display: 'flex', flexFlow: 'row wrap'}}>
                <div style={{flexBasis: '50%', paddingBottom: '12px'}}>
                  <label htmlFor="endpoint">Endpoint:</label>
                  <div>{model.get('endpoint')}</div>
                </div>
                <div style={{flexBasis: '50%', paddingBottom: '12px'}}>
                  <label htmlFor="requester">Requested by:</label>
                  <div name="requester">{model.get('requestedBy')}</div>
                </div>
                <div style={{flexBasis: '50%', paddingBottom: '12px'}}>
                  <label htmlFor="timestamp">Processed at:</label>
                  <div name="timestamp">
                    <FormattedDate date={model.get('timestamp')} />
                  </div>
                </div>
                <div style={{flexBasis: '50%', paddingBottom: '12px'}}>
                  <label htmlFor="status">Status:</label>
                  <div name="status">{model.get('status')}</div>
                </div>
                <div style={{flexBasis: '50%', paddingBottom: '12px'}}>
                  <label htmlFor="message">Status Message:</label>
                  <div name="message" style={{overflowY: 'scroll', maxHeight: '150px'}}>{model.get('message')}</div>
                </div>
              </section>}
              <section style={{width: '100%', flexGrow: 1}}>
                <label>Included Store Attributes:</label>
                { storeAttributeStatuses !== null &&
                  <AutoSizer>
                    {({width, height}) => (
                      <CustomizableGrid
                        noFromJs
                        data={page}
                        style={{width, height: height - 30}}

                        /* Paging */
                        take={PAGE_SIZE}
                        total={total}
                        skip={skip}
                        onPageChange={this.handlePageChange}
                        scrollable={'virtual'}

                        /* Sorting */
                        sort={sort.toJS()}
                        onSort={this.handleSort}

                        /* Filtering */
                        filter={filter}
                        onFilter={this.handleFilter}

                        onRowClick={this.handleRowClick}>
                        <GridColumn title="Attribute" field="attributeName" width="280px" />
                        <GridColumn title="Location" field="locationName" width="280px" />
                        <GridColumn title="Status" field="status" width="200px" cell={StoreAttributeStatusCell} filterCell={StoreAttributeStatusFilterCell} />
                        <GridColumn title="Status Message" field="message" />
                      </CustomizableGrid>
                    )}
                  </AutoSizer>
                }
              </section>
            </div>
          </MainContent>
        </PageBody>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    model: modelSelector(state),
    storeAttributeStatuses: storeAttributeStatusesSelector(state),
    loading: loadingSelector(state),
    sort: sortSelector(state),
    filter: filterSelector(state),
  };
}

const actions = {
  loadIntegrationStatus,
  loadStoreAttributeStatuses,
  filterStoreAttributes,
  sortStoreAttributes,
};

IntegrationStatusPage.propTypes = {};

export default withRouter(connect(mapStateToProps, actions)(IntegrationStatusPage));
