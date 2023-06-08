import autoBind from 'react-autobind';
import {Button, Dropdown, MenuItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import {
  loadingSelector,
  sortSelector,
  selectedUserIdSelector,
  columnsConfigurationSelector,
  filterSelector,
  dataSelector,
  hideClearFiltersButtonSelector,
} from '../selectors/pages/list';
import UsersListEditSidebar from './UsersListEditSidebar';
import CreateUserModal from './CreateUserModal';
import SetUserPasswordModal from './SetUserPasswordModal';
import {navigationGroups} from '../../shared/constants';
import {
  loadUsersList,
  showCreateUser,
  sortUsersList,
  filterUsersList,
  selectUser,
  clearSelectedUser,
  clearUsersListFilters,
  clearUsersListSorts,
  showImportUsersModal,
} from '../actions';
import {
  MainContent,
  NavigationSidebar,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../layout/components';
import {
  showSelector,
} from '../selectors/sidebars/edit';
import React, {Component} from 'react';
import {exportDownloader, handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {
  AutoSizer,
} from 'react-virtualized';
import {ClearFiltersButton, ClearSortsButton, CustomizableGrid} from '../../customizableGrid/components';
import {fromJS} from 'immutable';
import {loadRoleSelectListOptions} from '../../rolePermissions/actions';
import hideClearSortsButtonSelector from '../selectors/pages/list/hideClearSortsButtonSelector';
import ImportUsersModal from './ImportUsersModal';
import ImportUsersValidationErrorsModal from './ImportUsersValidationErrorsModal';

class UsersListPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {router, loadUsersList, loadRoleSelectListOptions} = this.props;
    loadUsersList()
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the list of users.', 'Error'));
    loadRoleSelectListOptions()
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the list of roles.', 'Error'));
  }

  handleSort({sort}) {
    this.props.sortUsersList(sort);
  }

  handleExportImportTemplate() {
    exportDownloader(`${process.env.API_BASE_URL}users/import/template`);
  }

  handleFilter({filter}) {
    this.props.filterUsersList(filter);
  }

  handleRowClick({dataItem}) {
    const {selectedUserId, selectUser, clearSelectedUser} = this.props;

    if (dataItem.id === selectedUserId) clearSelectedUser();
    else selectUser(fromJS(dataItem));
  }

  handleClearFilters() {
    this.props.clearUsersListFilters();
  }

  handleClearSorts() {
    this.props.clearUsersListSorts();
  }

  render() {
    const {
      loading,
      data,
      filter,
      columnsConfiguration,
      sort,
      handleShowCreateUser,
      handleShowImportUser,
      hideClearFiltersButton,
      hideClearSortsButton,
    } = this.props;

    return (
      <Page pageClassName="users-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Users</PageTitle>
          <PageHeaderActions>
            <ClearFiltersButton hide={hideClearFiltersButton} onClear={this.handleClearFilters} />
            <ClearSortsButton hide={hideClearSortsButton} onClear={this.handleClearSorts} />
            <Button title="Download Users Import Template" onClick={this.handleExportImportTemplate}><i className="fa fa-file-excel-o" /></Button>
            <Dropdown pullRight className="header-button">
              <Dropdown.Toggle noCaret><i className="fa fa-plus" /></Dropdown.Toggle>
              <Dropdown.Menu>
                <MenuItem eventKey="1" onClick={handleShowCreateUser}> New Users </MenuItem>
                <MenuItem eventKey="2" onClick={handleShowImportUser}> Import Users </MenuItem>
              </Dropdown.Menu>
            </Dropdown>
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.ADMIN} />
          <MainContent loading={loading}>
            <AutoSizer disableWidth>
              {({width, height}) => (
                <CustomizableGrid
                  data={data}
                  style={{width, height}}
                  sort={sort}
                  onSort={this.handleSort}
                  filter={filter}
                  onFilter={this.handleFilter}
                  onRowClick={this.handleRowClick}
                  columns={columnsConfiguration} />
              )}
            </AutoSizer>
          </MainContent>
          <UsersListEditSidebar />
        </PageBody>
        <CreateUserModal />
        <ImportUsersModal />
        <ImportUsersValidationErrorsModal />
        <SetUserPasswordModal />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: loadingSelector(state),
    columnsConfiguration: columnsConfigurationSelector(state),
    sort: sortSelector(state),
    filter: filterSelector(state),
    data: dataSelector(state),
    selectedUserId: selectedUserIdSelector(state),
    sidebarShown: showSelector(state),
    hideClearFiltersButton: hideClearFiltersButtonSelector(state),
    hideClearSortsButton: hideClearSortsButtonSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadUsersList,
    sortUsersList,
    filterUsersList,
    handleShowCreateUser: showCreateUser,
    handleShowImportUser: showImportUsersModal,
    selectUser,
    clearSelectedUser,
    loadRoleSelectListOptions,
    clearUsersListFilters,
    clearUsersListSorts,
  }
)(UsersListPage));
