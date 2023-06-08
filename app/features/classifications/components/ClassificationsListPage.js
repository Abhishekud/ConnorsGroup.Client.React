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
  loadClassificationsList,
  sortClassificationsList,
  showCreateClassification,
  selectClassification,
  clearSelectedClassification,
  filterClassificationsList,
} from '../actions';
import {showCreateStandardFilingField} from '../../standardFilingFields/actions';
import {
  loadingSelector,
  sortedClassificationsArraySelector,
  sortSelector,
  selectedClassificationIdSelector,
  filterSelector,
} from '../selectors/pages/list';
import {
  showSelector,
} from '../selectors/sidebars/edit';
import ClassificationsListEditSidebar from './ClassificationsListEditSidebar';
import CreateClassificationModal from './CreateClassificationModal';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {StandardFilingFieldSelect, StandardFilingFieldList} from '../../standardsListManagement/components';
import {CreateStandardFilingFieldModal} from '../../standardFilingFields/components';

class ClassificationsListPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {router} = this.props;
    this.props.loadClassificationsList()
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Classifications list.', 'Error'));
  }

  handleSort({sort}) {
    this.props.sortClassificationsList(sort);
  }

  handleFilter({filter}) {
    this.props.filterClassificationsList(filter);
  }

  handleRowClick({dataItem}) {
    const {selectedClassificationId, selectClassification, clearSelectedClassification} = this.props;

    if (dataItem.id === selectedClassificationId) clearSelectedClassification();
    else selectClassification(Map(dataItem));
  }

  render() {
    const {
      loading,
      sort,
      filter,
      classifications,
      selectedClassificationId,
      handleShowCreateClassification,
      showCreateStandardFilingField,
      sidebarShown,
      canManageStandardList,
      canEditFilingFields,
    } = this.props;

    return (
      <Page pageClassName="classifications-list-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Classifications</PageTitle>
          <PageHeaderActions>
            {(canManageStandardList || canEditFilingFields) && (
              <Dropdown id="add" className="header-button btn-default" pullRight>
                <Dropdown.Toggle noCaret>
                  <i className="fa fa-plus" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {canManageStandardList && <MenuItem eventKey="1" onClick={handleShowCreateClassification}>New Classification</MenuItem>}
                  {canEditFilingFields && <MenuItem eventKey="2" onClick={showCreateStandardFilingField}>New Standard Filing Field</MenuItem>}
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
              filingFields={classifications}
              sort={sort}
              selectedClassificationId={selectedClassificationId}
              onSort={this.handleSort}
              onRowClick={this.handleRowClick}
              filter={filter}
              onFilter={this.handleFilter}
              sidebarShown={sidebarShown} />
          </MainContent>
          <ClassificationsListEditSidebar canManageStandardList={canManageStandardList} />
        </PageBody>
        <CreateClassificationModal />
        <CreateStandardFilingFieldModal />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const canManageStandardListSelector = makeCurrentUserHasPermissionSelector(STANDARDS_LIST_MANAGEMENT);
  const canEditFilingFields = makeCurrentUserHasPermissionSelector(STANDARDS_FILING_FIELDS_EDIT);

  return {
    loading: loadingSelector(state),
    classifications: sortedClassificationsArraySelector(state),
    sort: sortSelector(state),
    filter: filterSelector(state),
    selectedClassificationId: selectedClassificationIdSelector(state),
    sidebarShown: showSelector(state),
    canManageStandardList: canManageStandardListSelector(state),
    canEditFilingFields: canEditFilingFields(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadClassificationsList,
    sortClassificationsList,
    handleShowCreateClassification: showCreateClassification,
    selectClassification,
    clearSelectedClassification,
    showCreateStandardFilingField,
    filterClassificationsList,
  }
)(ClassificationsListPage));
