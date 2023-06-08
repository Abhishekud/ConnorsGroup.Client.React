import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {fromJS} from 'immutable';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {Dropdown, MenuItem} from 'react-bootstrap';
import {AutoSizer} from 'react-virtualized';
import {GridColumn, GridNoRecords} from '@progress/kendo-react-grid';
import {CustomizableGrid} from '../../../customizableGrid/components';

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
import {handleApiError} from '../../../shared/services';

import {CreateIntegrationEndpointModal, EditIntegrationEndpointSidebar} from './';

import {
  showCreateEndpointModal,
  loadIntegrationEndpoints,
  sortEndpoints,
  filterEndpoints,
  openEndpointEditSidebar,
} from '../actions';
import {
  endpointsSelector,
  sortSelector,
  filterSelector,
  loadingSelector,
  numberOfSidebarsOpenSelector,
} from '../selectors/pages/list';
import {REFLEXIS_INTEGRATION_EDIT} from '../../../authentication/constants/permissions';
import {makeCurrentUserHasPermissionSelector} from '../../../authentication/selectors/currentUser';

class IntegrationEndpointsPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {loadIntegrationEndpoints, router} = this.props;
    loadIntegrationEndpoints()
      .catch(error => handleApiError(error, router, 'Unable to load Reflexis integration endpoints.'));
  }

  handleCreateEndpointClick() {
    this.props.showCreateEndpointModal();
  }

  handleSort({sort}) {
    this.props.sortEndpoints(fromJS(sort));
  }

  handleFilter({filter}) {
    this.props.filterEndpoints(fromJS(filter));
  }

  handleRowClick({dataItem}) {
    const {router, openEndpointEditSidebar} = this.props;
    openEndpointEditSidebar(dataItem.id)
      .catch(error => handleApiError(error, router, 'Unable to load endpoint.'));
  }

  render() {
    const {
      loading,
      canEdit,
      integrationEndpoints,
      numberOfSidebarsShowing,
      sort,
      filter,
    } = this.props;

    return (
      <Page pageClassName="reflexis-integration-endpoints-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Integration Endpoints</PageTitle>
          <PageHeaderActions>
            {canEdit && <Dropdown id="add" className="btn-default header-button" pullRight disabled={false}>
              <Dropdown.Toggle noCaret><i className="fa fa-plus" /></Dropdown.Toggle>
              <Dropdown.Menu>
                <MenuItem eventKey="1" onClick={this.handleCreateEndpointClick}>
                  Create Integration Endpoint
                </MenuItem>
              </Dropdown.Menu>
            </Dropdown>}
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.REFLEXIS_MODULE} />
          <MainContent loading={loading}>
            <AutoSizer>
              {({width, height}) => (
                <CustomizableGrid data={integrationEndpoints}
                  style={{width: width + (numberOfSidebarsShowing * layout.SIDEBAR_WIDTH), height}}
                  sort={sort} onSort={this.handleSort}
                  filter={filter} onFilter={this.handleFilter}
                  onRowClick={this.handleRowClick}>
                  <GridNoRecords>
                    There are no integration endpoints configured.
                  </GridNoRecords>
                  <GridColumn field="name" title="Name" />
                  <GridColumn field="url" title="Url" />
                </CustomizableGrid>
              )}
            </AutoSizer>
          </MainContent>
          <CreateIntegrationEndpointModal />
          <EditIntegrationEndpointSidebar />
        </PageBody>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const canEditSelector = makeCurrentUserHasPermissionSelector(REFLEXIS_INTEGRATION_EDIT);

  return {
    loading: loadingSelector(state),
    canEdit: canEditSelector(state),
    integrationEndpoints: endpointsSelector(state),
    sort: sortSelector(state),
    filter: filterSelector(state),
    numberOfSidebarsShowing: numberOfSidebarsOpenSelector(state),
  };
}

const actions = {
  showCreateEndpointModal,
  loadIntegrationEndpoints,
  sortEndpoints,
  filterEndpoints,
  openEndpointEditSidebar,
};

IntegrationEndpointsPage.propTypes = {
  loading: PropTypes.bool.isRequired,

  // Permissions

  // handlers
  showCreateEndpointModal: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, actions)(IntegrationEndpointsPage));
