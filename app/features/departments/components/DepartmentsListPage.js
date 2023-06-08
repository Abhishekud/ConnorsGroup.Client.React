import React, {Component} from 'react';
import {Dropdown, MenuItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {Map} from 'immutable';
import {
  MainContent,
  NavigationSidebar,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../layout/components';
import makeCurrentUserHasPermissionSelector from '../../authentication/selectors/currentUser/makeCurrentUserHasPermissionSelector';
import {STANDARDS_FILING_FIELDS_EDIT, STANDARDS_LIST_MANAGEMENT} from '../../authentication/constants/permissions';
import {navigationGroups} from '../../shared/constants';
import {
  loadDepartmentsList,
  sortDepartmentsList,
  showCreateDepartment,
  selectDepartment,
  clearSelectedDepartment,
  filterDepartmentsList,
  toggleImportDepartments,
} from '../actions';
import {showCreateStandardFilingField} from '../../standardFilingFields/actions';
import {
  loadingSelector,
  sortedDepartmentsArraySelector,
  sortSelector,
  filterSelector,
  selectedDepartmentIdSelector,
} from '../selectors/pages/list';
import {
  showSelector,
} from '../selectors/sidebars/edit';
import {
  departmentNameSelector,
} from '../../shared/selectors/components/settings';
import DepartmentsListEditSidebar from './DepartmentsListEditSidebar';
import CreateDepartmentModal from './CreateDepartmentModal';
import pluralize from 'pluralize';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {StandardFilingFieldSelect, StandardFilingFieldList} from '../../standardsListManagement/components';
import {CreateStandardFilingFieldModal} from '../../standardFilingFields/components';
import {ImportDepartmentsModal, ImportDepartmentsValidationErrorsModal} from './';

class DepartmentsListPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {departmentName, router} = this.props;
    this.props.loadDepartmentsList()
      .catch(error => handleApiError(error, router, `An error occurred while attempting to load the ${pluralize.plural(departmentName)} list.`, 'Error'));
  }

  handleSort({sort}) {
    this.props.sortDepartmentsList(sort);
  }

  handleFilter({filter}) {
    this.props.filterDepartmentsList(filter);
  }

  handleRowClick({dataItem}) {

    const {selectedDepartmentId, selectDepartment, clearSelectedDepartment} = this.props;

    if (dataItem.id === selectedDepartmentId) clearSelectedDepartment();
    else selectDepartment(Map(dataItem));
  }
  handleExportAllImportTemplate() {
    window.location.href = `${process.env.API_BASE_URL}departments/import/template`;
  }

  render() {
    const {
      loading,
      sort,
      filter,
      departments,
      handleShowCreateDepartment,
      departmentName,
      sidebarShown,
      showCreateStandardFilingField,
      canManageStandardList,
      canEditFilingFields,
      toggleImportDepartments,
    } = this.props;

    return (
      <Page pageClassName="departments-list-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>{pluralize.plural(departmentName)}</PageTitle>
          <PageHeaderActions align="right">
            {(canManageStandardList) && (
              <Dropdown id="export" className="header-button" pullRight>
                <Dropdown.Toggle noCaret><i className="fa fa-file-excel-o" /></Dropdown.Toggle>
                <Dropdown.Menu>
                  {canManageStandardList && (
                    <MenuItem eventKey="1" onClick={this.handleExportAllImportTemplate}>
                      Download Departments Import Template
                    </MenuItem>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            )}
            {(canManageStandardList || canEditFilingFields) && (
              <Dropdown id="newDepartments" pullRight className="header-button btn-default">
                <Dropdown.Toggle noCaret><i className="fa fa-plus" /></Dropdown.Toggle>
                <Dropdown.Menu>
                  {canManageStandardList && <MenuItem eventKey="1" onClick={handleShowCreateDepartment}>New {departmentName}</MenuItem>}
                  {canManageStandardList && <MenuItem eventKey="2" onClick={toggleImportDepartments}>Import Departments</MenuItem>}
                  {canEditFilingFields && <MenuItem eventKey="3" onClick={showCreateStandardFilingField}>New Standard Filing Field</MenuItem>}
                </Dropdown.Menu>
              </Dropdown>
            )}
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.PROFILING} selectedNavigationSubGroup={navigationGroups.PROFILING_LIST_MANAGEMENT} />
          <MainContent loading={loading}>
            <StandardFilingFieldSelect />
            <StandardFilingFieldList
              filingFields={departments}
              sort={sort}
              filter={filter}
              onSort={this.handleSort}
              onFilter={this.handleFilter}
              onRowClick={this.handleRowClick}
              sidebarShown={sidebarShown}
              departmentName={departmentName} />
          </MainContent>
          <DepartmentsListEditSidebar canManageStandardList={canManageStandardList} />
        </PageBody>
        <CreateDepartmentModal />
        <CreateStandardFilingFieldModal />
        <ImportDepartmentsModal />
        <ImportDepartmentsValidationErrorsModal />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const canManageStandardListSelector = makeCurrentUserHasPermissionSelector(STANDARDS_LIST_MANAGEMENT);
  const canEditFilingFields = makeCurrentUserHasPermissionSelector(STANDARDS_FILING_FIELDS_EDIT);

  return {
    loading: loadingSelector(state),
    departments: sortedDepartmentsArraySelector(state),
    sort: sortSelector(state),
    filter: filterSelector(state),
    selectedDepartmentId: selectedDepartmentIdSelector(state),
    departmentName: departmentNameSelector(state),
    sidebarShown: showSelector(state),
    canManageStandardList: canManageStandardListSelector(state),
    canEditFilingFields: canEditFilingFields(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadDepartmentsList,
    sortDepartmentsList,
    filterDepartmentsList,
    handleShowCreateDepartment: showCreateDepartment,
    selectDepartment,
    clearSelectedDepartment,
    showCreateStandardFilingField,
    toggleImportDepartments,
  }
)(DepartmentsListPage));
