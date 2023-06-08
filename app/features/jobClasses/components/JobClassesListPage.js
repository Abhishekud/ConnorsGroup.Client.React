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
  loadJobClassesList,
  sortJobClassesList,
  filterJobClassesList,
  showCreateJobClass,
  selectJobClass,
  clearSelectedJobClass,
  toggleImportJobClasses,
} from '../actions';
import {showCreateStandardFilingField} from '../../standardFilingFields/actions';
import {
  loadingSelector,
  sortedJobClassesArraySelector,
  sortSelector,
  filterSelector,
  selectedJobClassIdSelector,
} from '../selectors/pages/list';
import {
  showSelector,
} from '../selectors/sidebars/edit';
import JobClassesListEditSidebar from './JobClassesListEditSidebar';
import CreateJobClassModal from './CreateJobClassModal';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {StandardFilingFieldSelect, StandardFilingFieldList} from '../../standardsListManagement/components';
import {CreateStandardFilingFieldModal} from '../../standardFilingFields/components';
import {ImportJobClassesModal, ImportJobClassesValidationErrorsModal} from './';

class JobClassesListPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {router} = this.props;
    this.props.loadJobClassesList()
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Job Classes list.', 'Error'));
  }

  handleSort({sort}) {
    this.props.sortJobClassesList(sort);
  }

  handleFilter({filter}) {
    this.props.filterJobClassesList(filter);
  }

  handleRowClick({dataItem}) {
    const {selectedJobClassId, selectJobClass, clearSelectedJobClass} = this.props;

    if (dataItem.id === selectedJobClassId) clearSelectedJobClass();
    else selectJobClass(Map(dataItem));
  }
  handleExportAllImportTemplate() {
    window.location.href = `${process.env.API_BASE_URL}job-classes/import/template`;
  }
  render() {
    const {
      loading,
      sort,
      jobClasses,
      selectedJobClassId,
      handleShowCreateJobClass,
      showCreateStandardFilingField,
      sidebarShown,
      filter,
      canManageStandardList,
      canEditFilingFields,
      toggleImportJobClasses,
    } = this.props;

    return (
      <Page pageClassName="job-classes-list-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Job Classes</PageTitle>
          <PageHeaderActions>
            {(canManageStandardList) && (
              <Dropdown id="export" className="header-button" pullRight>
                <Dropdown.Toggle noCaret><i className="fa fa-file-excel-o" /></Dropdown.Toggle>
                <Dropdown.Menu>
                  {canManageStandardList && (
                    <MenuItem eventKey="1" onClick={this.handleExportAllImportTemplate}>
                      Download Job Classes Import Template
                    </MenuItem>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            )}
            {(canManageStandardList || canEditFilingFields) && (
              <Dropdown id="add" className="header-button btn-default" pullRight>
                <Dropdown.Toggle noCaret>
                  <i className="fa fa-plus" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {canManageStandardList && <MenuItem eventKey="1" onClick={handleShowCreateJobClass}>New Job Class</MenuItem>}
                  {canManageStandardList && <MenuItem eventKey="2" onClick={toggleImportJobClasses}>Import Job Classes</MenuItem>}
                  {canEditFilingFields && <MenuItem eventKey="3" onClick={showCreateStandardFilingField}>New Standard Filing Field</MenuItem>}
                </Dropdown.Menu>
              </Dropdown>
            )}
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.STANDARDS} selectedNavigationSubGroup={navigationGroups.STANDARDS_LIST_MANAGEMENT} />
          <MainContent loading={loading}>
            <StandardFilingFieldSelect />
            <StandardFilingFieldList
              filingFields={jobClasses}
              sort={sort}
              selectedJobClassId={selectedJobClassId}
              onSort={this.handleSort}
              onRowClick={this.handleRowClick}
              sidebarShown={sidebarShown}
              filter={filter}
              onFilter={this.handleFilter} />
          </MainContent>
          <JobClassesListEditSidebar canManageStandardList={canManageStandardList} />
        </PageBody>
        <CreateJobClassModal />
        <CreateStandardFilingFieldModal />
        <ImportJobClassesModal />
        <ImportJobClassesValidationErrorsModal />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const canManageStandardListSelector = makeCurrentUserHasPermissionSelector(STANDARDS_LIST_MANAGEMENT);
  const canEditFilingFields = makeCurrentUserHasPermissionSelector(STANDARDS_FILING_FIELDS_EDIT);

  return {
    loading: loadingSelector(state),
    jobClasses: sortedJobClassesArraySelector(state),
    sort: sortSelector(state),
    selectedJobClassId: selectedJobClassIdSelector(state),
    sidebarShown: showSelector(state),
    filter: filterSelector(state),
    canManageStandardList: canManageStandardListSelector(state),
    canEditFilingFields: canEditFilingFields(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadJobClassesList,
    sortJobClassesList,
    filterJobClassesList,
    handleShowCreateJobClass: showCreateJobClass,
    selectJobClass,
    clearSelectedJobClass,
    showCreateStandardFilingField,
    toggleImportJobClasses,
  }
)(JobClassesListPage));
