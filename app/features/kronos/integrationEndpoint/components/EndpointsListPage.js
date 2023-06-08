import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {AutoSizer} from 'react-virtualized';
import {Button} from 'react-bootstrap';
import {GridColumn} from '@progress/kendo-react-grid';
import {fromJS} from 'immutable';
import {CustomizableGrid, ExportStatusCell, ExportStatusFilterCell} from '../../../customizableGrid/components';
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
import {KRONOS_INTEGRATION_ENDPOINTS_EDIT} from '../../../authentication/constants/permissions';
import {
  CreateEndpointModal,
  DeleteEndpointModal,
  EditEndpointSidebar,
} from './';
import {
  showCreateModal,
  selectEndpoint,
  cancelEdit,
  filterEndpoints,
  sortEndpoints,
  loadEndpointsList,
} from '../actions';
import {
  endpointsSelector,
  selectedEndpointSelector,
  sortSelector,
  filterSelector,
  numberOfSidebarsShowingSelector,
} from '../selectors/pages/list';
import {handleApiError} from '../../../shared/services';

class EndpointsListPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {router} = this.props;

    this.props.loadEndpointsList()
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load Kronos Endpoints', 'Error'));
  }

  handleCreateEndpointClick() {
    this.props.showCreateModal();
    this.props.cancelEdit();
  }

  handleTableRowClick({dataItem}) {
    const {selectEndpoint, integrationEndpoints, cancelEdit, selectedEndpoint} = this.props;
    const newSelection = integrationEndpoints.find(d => d.get('id') === dataItem.id);
    if (dataItem.id === (selectedEndpoint && selectedEndpoint.get('id'))) {
      cancelEdit();
    } else {
      selectEndpoint(newSelection);
    }
  }

  handleSort({sort}) {
    this.props.sortEndpoints(fromJS(sort));
  }

  handleFilter({filter}) {
    this.props.filterEndpoints(fromJS(filter));
  }

  render() {
    const {loading, integrationEndpoints, sort, filter, numberOfSidebarsShowing, canEdit} = this.props;

    return (
      <Page pageClassName="kronos-endpoints-list-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Kronos Endpoints</PageTitle>
          <PageHeaderActions>
            {canEdit && <Button id="createEndpoint" onClick={this.handleCreateEndpointClick}><i className="fa fa-plus" /></Button>}
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.KRONOS_INTEGRATION} />
          <MainContent loading={loading}>
            <AutoSizer>
              {({width, height}) => (
                <CustomizableGrid data={integrationEndpoints}
                  style={{width: width + (numberOfSidebarsShowing * layout.SIDEBAR_WIDTH), height}}
                  onRowClick={this.handleTableRowClick} selectedField="selected"
                  sort={sort} onSort={this.handleSort}
                  filter={filter} onFilter={this.handleFilter} >
                  <GridColumn field="status" title="Status" width={150} />
                  <GridColumn field="name" title="Name" />
                  <GridColumn field="url" title="Url" />
                  <GridColumn field="userName" title="User Name" />
                  <GridColumn field="exportStatus" title="Export Status" cell={ExportStatusCell} filterCell={ExportStatusFilterCell} />
                  <GridColumn field="exportStartTime" title="Export Date" />
                </CustomizableGrid>
              )}
            </AutoSizer>
          </MainContent>
          <EditEndpointSidebar canEdit={canEdit} />
        </PageBody>
        <CreateEndpointModal />
        <DeleteEndpointModal />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const canEditSelector = makeCurrentUserHasPermissionSelector(KRONOS_INTEGRATION_ENDPOINTS_EDIT);
  return {
    loading: false,
    integrationEndpoints: endpointsSelector(state),
    selectedEndpoint: selectedEndpointSelector(state),
    sort: sortSelector(state),
    filter: filterSelector(state),
    numberOfSidebarsShowing: numberOfSidebarsShowingSelector(state),
    canEdit: canEditSelector(state),
  };
}

export default withRouter(connect(mapStateToProps, {
  showCreateModal,
  selectEndpoint,
  cancelEdit,
  sortEndpoints,
  filterEndpoints,
  loadEndpointsList,
})(EndpointsListPage));
