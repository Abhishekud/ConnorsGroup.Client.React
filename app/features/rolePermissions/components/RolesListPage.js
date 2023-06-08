import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {withRouter} from 'react-router';
import {AutoSizer} from 'react-virtualized';
import {
  MainContent,
  NavigationSidebar,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../layout/components';
import {navigationGroups} from '../../shared/constants';
import {
  loadRolesPage,
  loadPermissionRolesList,
  sortRolesList,
  filterRolesList,
  showCreateRole,
  toggleRolesSidebar,
  updatePermissionsRole,
  loadRolesList,
  clearRolesListFilters,
  clearRolesListSorts,
} from '../actions';
import {
  loadingSelector,
  savingSelector,
  permissionsRolesSelector,
  sortSelector,
  filterSelector,
  columnsSelector,
  dataSelector,
  columnsConfigurationSelector,
  rolesSelector,
  hideClearFiltersButtonSelector,
  hideClearSortsButtonSelector,
} from '../selectors/pages/list';
import {
  showSelector as showRolesSelector,
} from '../selectors/sidebars/roles';
import {
  RolesSidebar,
  CreateRoleModal,
} from './';
import {handleApiError, toastr} from '../../shared/services';
import {
  CustomizableGrid,
  BooleanFilterCell,
  ClearFiltersButton,
  ClearSortsButton,
} from '../../customizableGrid/components';
import permissionsCountSelector from '../selectors/pages/list/permissionsCountSelector';
import {loadIdentity} from '../../authentication/actions';
import {SUPER_ADMIN_MANAGE_PERMISSIONS} from '../../authentication/constants/permissions';
import {SUPER_ADMIN} from '../roleConstants';

class RolesListPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {
      loadRolesPage, loadPermissionRolesList, loadRolesList, router,
    } = this.props;

    loadRolesPage();

    loadPermissionRolesList()
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Permission Roles list.', 'Error'));

    loadRolesList()
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Roles list.', 'Error'));
  }

  handleSort({sort}) {
    this.props.sortRolesList(sort);
  }

  handleFilter({filter}) {
    this.props.filterRolesList(filter);
  }

  renderFilterCell(element, filterProps) {
    if (filterProps.field.startsWith('role_')) {
      return (<BooleanFilterCell {...filterProps} />);
    }
    return element;
  }

  handleSelectRole({dataItem, field}) {
    const permissionId = dataItem.id;
    const roleId = parseInt(/role_(\d+)/.exec(field)[1], 10);
    const {permissionsRoles, updatePermissionsRole, roles} = this.props;
    const roleIds = permissionsRoles.getIn([permissionId, 'roleIds']);
    const remove = roleIds && roleIds.has(roleId);

    const permission = permissionsRoles.getIn([permissionId, 'permission']);
    if (permission === SUPER_ADMIN_MANAGE_PERMISSIONS) {
      const role = roles.find(role => role.get('id') === roleId);
      if (remove && role.get('name') === SUPER_ADMIN) {
        toastr.error(`Unable to remove 'Manage Permissions' permission from ${SUPER_ADMIN} role.`);
        return;
      }
      if (!remove && role.get('name') !== SUPER_ADMIN) {
        toastr.error(`Unable to add 'Manage Permissions' permission to ${role.get('name')} role.`);
        return;
      }
    }
    updatePermissionsRole(permissionId, remove, roleId).then(() => this.props.loadIdentity());
  }

  handleShowCreateRole() {
    const {showCreateRole} = this.props;

    showCreateRole();
  }

  handleClearFilters() {
    this.props.clearRolesListFilters();
  }

  handleClearSorts() {
    this.props.clearRolesListSorts();
  }

  render() {
    const {
      loading,
      saving,
      sort,
      filter,
      columns,
      data,
      showRoles,
      handleToggleRolesSidebar,
      hideClearFiltersButton,
      hideClearSortsButton,
    } = this.props;

    return (
      <Page pageClassName="roles-list-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Role Permissions</PageTitle>
          <PageHeaderActions align="right">
            <ClearFiltersButton onClear={this.handleClearFilters} hide={hideClearFiltersButton} />
            <ClearSortsButton onClear={this.handleClearSorts} hide={hideClearSortsButton} />
            <Button onClick={this.handleShowCreateRole} title="New Role"><i className="fa fa-plus" /></Button>
            <div className="flyout-button">
              <Button className={showRoles ? 'btn-wheat' : 'btn-default'} onClick={handleToggleRolesSidebar} disabled={saving}>
                <i className="fa fa-list-ul" />
              </Button>
            </div>
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.PROFILING} />
          <MainContent loading={loading}>
            <AutoSizer>
              {({width, height}) => (
                <CustomizableGrid style={{width, height}}
                  columns={columns} data={data}
                  onItemChange={this.handleSelectRole}
                  onSort={this.handleSort} sort={sort}
                  onFilter={this.handleFilter} filter={filter}
                  filterCellRender={this.renderFilterCell} />
              )}
            </AutoSizer>
          </MainContent>
          <RolesSidebar />
        </PageBody>
        <CreateRoleModal />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: loadingSelector(state),
    saving: savingSelector(state),
    permissionsRoles: permissionsRolesSelector(state),
    sort: sortSelector(state),
    filter: filterSelector(state),
    permissionsCount: permissionsCountSelector(state),
    showRoles: showRolesSelector(state),
    columns: columnsSelector(state),
    columnsConfiguration: columnsConfigurationSelector(state),
    data: dataSelector(state),
    roles: rolesSelector(state),
    hideClearFiltersButton: hideClearFiltersButtonSelector(state),
    hideClearSortsButton: hideClearSortsButtonSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadPermissionRolesList,
    sortRolesList,
    filterRolesList,
    showCreateRole,
    handleToggleRolesSidebar: toggleRolesSidebar,
    updatePermissionsRole,
    loadRolesList,
    loadRolesPage,
    loadIdentity,
    clearRolesListFilters,
    clearRolesListSorts,
  }
)(RolesListPage));
