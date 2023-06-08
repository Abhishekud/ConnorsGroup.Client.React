import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {AutoSizer} from 'react-virtualized';
import {Dropdown, MenuItem} from 'react-bootstrap';
import {GridColumn} from '@progress/kendo-react-grid';
import {fromJS} from 'immutable';
import {ClearFiltersButton, ClearSortsButton, CustomizableGrid} from '../../../customizableGrid/components';
import {
  MainContent,
  NavigationSidebar,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../../layout/components';
import {handleApiError} from '../../../shared/services';
import {layout, navigationGroups} from '../../../shared/constants';
import {KRONOS_LABOR_DRIVERS_EDIT, KRONOS_LABOR_DRIVERS_EXPORT} from '../../../authentication/constants/permissions';
import makeCurrentUserHasPermissionSelector from '../../../authentication/selectors/currentUser/makeCurrentUserHasPermissionSelector';
import {
  CreateLaborDriverModal,
  DeleteLaborDriverModal,
  EditLaborDriverSidebar,
  ImportLaborDriversModal,
  ImportLaborDriversValidationErrorsModal,
} from './';
import {
  showCreateModal,
  cancelEdit,
  filterLaborDrivers,
  sortLaborDrivers,
  clearLaborDriverListFilters,
  clearLaborDriverListSorts,

  loadLaborDriversList,
  loadLaborDriver,
  showImportLaborDrivers,
} from '../actions';
import {
  laborDriversSelector,
  selectedLaborDriverSelector,
  sortSelector,
  filterSelector,
  numberOfSidebarsShowingSelector,
  hideClearFiltersButtonSelector,
  hideClearSortsButtonSelector,
} from '../selectors/pages/list';

class LaborDriversListPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {loadLaborDriversList, router} = this.props;

    loadLaborDriversList()
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Labor Drivers list.', 'error'));
  }

  handleCreateLaborDriverClick() {
    this.props.showCreateModal();
  }

  handleTableRowClick({dataItem}) {
    const {laborDrivers, cancelEdit, selectedLaborDriver, loadLaborDriver, router} = this.props;
    const newSelection = laborDrivers.find(d => d.get('id') === dataItem.id);
    if (dataItem.id === (selectedLaborDriver && selectedLaborDriver.get('id'))) {
      cancelEdit();
    } else {
      loadLaborDriver(newSelection.get('id'))
        .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Labor Driver.', 'error'));
    }
  }

  handleSort({sort}) {
    this.props.sortLaborDrivers(fromJS(sort));
  }

  handleFilter({filter}) {
    this.props.filterLaborDrivers(fromJS(filter));
  }

  handleExportImportTemplate() {
    window.location.href = `${process.env.API_BASE_URL}kronos/labordriver/import/template`;
  }

  handleClearFilters() {
    this.props.clearLaborDriverListFilters();
  }

  handleClearSorts() {
    this.props.clearLaborDriverListSorts();
  }

  render() {
    const {
      loading,
      laborDrivers,
      sort,
      filter,
      numberOfSidebarsShowing,
      showImportLaborDrivers,
      canEdit,
      canExport,
      hideClearFiltersButton,
      hideClearSortsButton,
    } = this.props;

    return (
      <Page pageClassName="kronos-labor-drivers-list-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Labor Drivers</PageTitle>
          <PageHeaderActions>
            <ClearFiltersButton hide={hideClearFiltersButton} onClear={this.handleClearFilters} />
            <ClearSortsButton hide={hideClearSortsButton} onClear={this.handleClearSorts} />
            {canExport && (
              <Dropdown id="export" className="btn-default header-button" pullRight disabled={false}>
                <Dropdown.Toggle noCaret><i className="fa fa-file-excel-o" /></Dropdown.Toggle>
                <Dropdown.Menu>
                  <MenuItem eventKey="1" onSelect={this.handleExportImportTemplate}>
                    Export Labor Drivers
                  </MenuItem>
                </Dropdown.Menu>
              </Dropdown>
            )}
            {canEdit && (
              <Dropdown id="add" className="btn-default header-button" pullRight disabled={false}>
                <Dropdown.Toggle noCaret><i className="fa fa-plus" /></Dropdown.Toggle>
                <Dropdown.Menu>
                  <MenuItem eventKey="1" onSelect={this.handleCreateLaborDriverClick}>
                    New Labor Driver
                  </MenuItem>
                  <MenuItem eventKey="2" onSelect={showImportLaborDrivers}>
                    Import Labor Drivers
                  </MenuItem>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.KRONOS_INTEGRATION} />
          <MainContent loading={loading}>
            <AutoSizer>
              {({width, height}) => (
                <CustomizableGrid data={laborDrivers}
                  style={{width: width + (numberOfSidebarsShowing * layout.SIDEBAR_WIDTH), height}}
                  onRowClick={this.handleTableRowClick} selectedField="selected"
                  sort={sort} onSort={this.handleSort}
                  filter={filter} onFilter={this.handleFilter} >
                  <GridColumn field="name" title="Name" />
                  <GridColumn field="laborDriverTypeName" title="Type" />
                </CustomizableGrid>
              )}
            </AutoSizer>
          </MainContent>
          <EditLaborDriverSidebar canEdit={canEdit} />
        </PageBody>
        <CreateLaborDriverModal />
        <DeleteLaborDriverModal />
        <ImportLaborDriversModal />
        <ImportLaborDriversValidationErrorsModal />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const canEditSelector = makeCurrentUserHasPermissionSelector(KRONOS_LABOR_DRIVERS_EDIT);
  const canExportSelector = makeCurrentUserHasPermissionSelector(KRONOS_LABOR_DRIVERS_EXPORT);

  return {
    loading: false,
    laborDrivers: laborDriversSelector(state),
    selectedLaborDriver: selectedLaborDriverSelector(state),
    sort: sortSelector(state),
    filter: filterSelector(state),
    numberOfSidebarsShowing: numberOfSidebarsShowingSelector(state),
    canEdit: canEditSelector(state),
    canExport: canExportSelector(state),
    hideClearFiltersButton: hideClearFiltersButtonSelector(state),
    hideClearSortsButton: hideClearSortsButtonSelector(state),
  };
}

export default withRouter(connect(mapStateToProps, {
  showCreateModal,
  cancelEdit,
  sortLaborDrivers,
  filterLaborDrivers,
  clearLaborDriverListFilters,
  clearLaborDriverListSorts,

  loadLaborDriversList,
  loadLaborDriver,
  showImportLaborDrivers,
})(LaborDriversListPage));
