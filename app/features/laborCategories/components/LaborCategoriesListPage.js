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
  loadLaborCategoriesList,
  sortLaborCategoriesList,
  filterLaborCategoriesList,
  showCreateLaborCategory,
  selectLaborCategory,
  clearSelectedLaborCategory,
  toggleImportLaborCategories,
} from '../actions';
import {showCreateStandardFilingField} from '../../standardFilingFields/actions';
import {
  loadingSelector,
  sortedLaborCategoriesArraySelector,
  sortSelector,
  selectedLaborCategoryIdSelector,
  filterSelector,
} from '../selectors/pages/list';
import {
  showSelector,
} from '../selectors/sidebars/edit';
import LaborCategoriesListEditSidebar from './LaborCategoriesListEditSidebar';
import CreateLaborCategoryModal from './CreateLaborCategoryModal';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {StandardFilingFieldSelect, StandardFilingFieldList} from '../../standardsListManagement/components';
import {CreateStandardFilingFieldModal} from '../../standardFilingFields/components';
import {ImportLaborCategoriesModal, ImportLaborCategoriesValidationErrorsModal} from './';

class LaborCategoriesListPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {router} = this.props;
    this.props.loadLaborCategoriesList()
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Labor Categories list.', 'Error'));
  }

  handleSort({sort}) {
    this.props.sortLaborCategoriesList(sort);
  }

  handleFilter({filter}) {
    this.props.filterLaborCategoriesList(filter);
  }

  handleRowClick({dataItem}) {
    const {selectedLaborCategoryId, selectLaborCategory, clearSelectedLaborCategory} = this.props;

    if (dataItem.id === selectedLaborCategoryId) clearSelectedLaborCategory();
    else selectLaborCategory(Map(dataItem));
  }

  handleExportAllImportTemplate() {
    window.location.href = `${process.env.API_BASE_URL}labor-categories/import/template`;
  }
  render() {
    const {
      loading,
      sort,
      filter,
      laborCategories,
      selectedLaborCategoryId,
      handleShowCreateLaborCategory,
      showCreateStandardFilingField,
      sidebarShown,
      canManageStandardList,
      canEditFilingFields,
      toggleImportLaborCategories,
    } = this.props;

    return (
      <Page pageClassName="labor-categories-list-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Labor Categories</PageTitle>
          <PageHeaderActions>
            {(canManageStandardList) && (
              <Dropdown id="export" className="header-button" pullRight>
                <Dropdown.Toggle noCaret><i className="fa fa-file-excel-o" /></Dropdown.Toggle>
                <Dropdown.Menu>
                  {canManageStandardList && (
                    <MenuItem eventKey="1" onClick={this.handleExportAllImportTemplate}>
                      Download Labor Categories Import Template
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
                  {canManageStandardList && <MenuItem eventKey="1" onClick={handleShowCreateLaborCategory}>New Labor Category</MenuItem>}
                  {canManageStandardList && <MenuItem eventKey="2" onClick={toggleImportLaborCategories}>Import Labor Categories</MenuItem>}
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
              filingFields={laborCategories}
              sort={sort}
              filter={filter}
              selectedLaborCategoryId={selectedLaborCategoryId}
              onSort={this.handleSort}
              onFilter={this.handleFilter}
              onRowClick={this.handleRowClick}
              sidebarShown={sidebarShown} />
          </MainContent>
          <LaborCategoriesListEditSidebar canManageStandardList={canManageStandardList} />
        </PageBody>
        <CreateLaborCategoryModal />
        <CreateStandardFilingFieldModal />
        <ImportLaborCategoriesModal />
        <ImportLaborCategoriesValidationErrorsModal />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const canManageStandardListSelector = makeCurrentUserHasPermissionSelector(STANDARDS_LIST_MANAGEMENT);
  const canEditFilingFields = makeCurrentUserHasPermissionSelector(STANDARDS_FILING_FIELDS_EDIT);

  return {
    loading: loadingSelector(state),
    laborCategories: sortedLaborCategoriesArraySelector(state),
    sort: sortSelector(state),
    filter: filterSelector(state),
    selectedLaborCategoryId: selectedLaborCategoryIdSelector(state),
    sidebarShown: showSelector(state),
    canManageStandardList: canManageStandardListSelector(state),
    canEditFilingFields: canEditFilingFields(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadLaborCategoriesList,
    sortLaborCategoriesList,
    filterLaborCategoriesList,
    handleShowCreateLaborCategory: showCreateLaborCategory,
    selectLaborCategory,
    clearSelectedLaborCategory,
    showCreateStandardFilingField,
    toggleImportLaborCategories,
  }
)(LaborCategoriesListPage));
