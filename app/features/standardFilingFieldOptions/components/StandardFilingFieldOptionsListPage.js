import React, {Component} from 'react';
import {Dropdown, MenuItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {Map} from 'immutable';
import pluralize from 'pluralize';
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
  loadStandardFilingFieldOptionsList,
  sortStandardFilingFieldOptionsList,
  showCreateStandardFilingFieldOption,
  selectStandardFilingFieldOption,
  clearSelectedStandardFilingFieldOption,
  filterStandardFilingFieldOptionsList,
} from '../actions';
import {
  showSelector,
} from '../selectors/sidebars/edit';
import {loadStandardFilingFieldsList, showCreateStandardFilingField} from '../../standardFilingFields/actions';
import {
  loadingSelector,
  sortedStandardFilingFieldOptionsArraySelector,
  sortSelector,
  selectedStandardFilingFieldOptionIdSelector,
  filterSelector,
} from '../selectors/pages/list';
import StandardFilingFieldOptionsList from './StandardFilingFieldOptionsList';
import EditStandardFilingFieldOptionSidebar from './EditStandardFilingFieldOptionSidebar';
import CreateStandardFilingFieldOptionModal from './CreateStandardFilingFieldOptionModal';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {StandardFilingFieldSelect} from '../../standardsListManagement/components';
import EditStandardFilingFieldSidebar from '../../standardFilingFields/components/EditStandardFilingFieldSidebar';
import CreateStandardFilingFieldModal from '../../standardFilingFields/components/CreateStandardFilingFieldModal';
import {selectedStandardsListTypeSelector, selectedStandardFilingFieldSelector} from '../../standardsListManagement/selectors';

class StandardFilingFieldOptionsListPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {router, selectedStandardFilingFieldId} = this.props;

    this.props.loadStandardFilingFieldOptionsList(selectedStandardFilingFieldId)
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Standard Filing Field Options list.', 'Error'));
  }

  componentDidUpdate({selectedStandardFilingFieldId}) {
    if (selectedStandardFilingFieldId !== this.props.selectedStandardFilingFieldId) {
      const {router, loadStandardFilingFieldOptionsList} = this.props;
      loadStandardFilingFieldOptionsList(this.props.selectedStandardFilingFieldId)
        .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Standard Filing Field Options list.', 'Error'));
    }
  }

  handleSort({sort}) {
    this.props.sortStandardFilingFieldOptionsList(sort);
  }

  handleFilter({filter}) {
    this.props.filterStandardFilingFieldOptionsList(filter);
  }

  handleRowClick({dataItem}) {
    const {
      selectedStandardFilingFieldId,
      selectedStandardFilingFieldOptionId,
      selectStandardFilingFieldOption,
      clearSelectedStandardFilingFieldOption,
    } = this.props;

    if (dataItem.id === selectedStandardFilingFieldOptionId) clearSelectedStandardFilingFieldOption();
    else selectStandardFilingFieldOption(selectedStandardFilingFieldId, Map(dataItem));
  }

  handleShowCreateOptionModal() {
    const {showCreateStandardFilingFieldOption, selectedStandardFilingFieldId} = this.props;
    showCreateStandardFilingFieldOption(selectedStandardFilingFieldId);
  }

  render() {
    const {
      loading,
      sort,
      filter,
      standardFilingFieldOptions,
      selectedStandardFilingFieldOptionId,
      showCreateStandardFilingField,
      selectedStandardFilingField,
      sidebarShown,
      canManageStandardList,
      canEditFilingFields,
    } = this.props;

    return (
      <Page pageClassName="standard-filing-field-options-list-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>{pluralize.plural(selectedStandardFilingField.get('name'))}</PageTitle>
          <PageHeaderActions align="right">
            {(canManageStandardList || canEditFilingFields) && (
              <Dropdown id="add" className="header-button btn-default" pullRight>
                <Dropdown.Toggle noCaret>
                  <i className="fa fa-plus" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {canManageStandardList && <MenuItem eventKey="1" onClick={this.handleShowCreateOptionModal}>New {selectedStandardFilingField.get('name')}</MenuItem>}
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
            <StandardFilingFieldOptionsList
              standardFilingFieldOptions={standardFilingFieldOptions}
              sort={sort}
              filter={filter}
              selectedStandardFilingFieldOptionId={selectedStandardFilingFieldOptionId}
              onSort={this.handleSort}
              onFilter={this.handleFilter}
              onRowClick={this.handleRowClick}
              sidebarShown={sidebarShown} />
          </MainContent>
          <EditStandardFilingFieldOptionSidebar canEditFilingFields={canEditFilingFields} />
          <EditStandardFilingFieldSidebar canEditFilingFields={canEditFilingFields} />
        </PageBody>
        <CreateStandardFilingFieldOptionModal />
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
    sort: sortSelector(state),
    filter: filterSelector(state),
    standardFilingFieldOptions: sortedStandardFilingFieldOptionsArraySelector(state),
    selectedStandardFilingFieldOptionId: selectedStandardFilingFieldOptionIdSelector(state),
    selectedStandardFilingFieldId: selectedStandardsListTypeSelector(state),
    selectedStandardFilingField: selectedStandardFilingFieldSelector(state),
    sidebarShown: showSelector(state),
    canManageStandardList: canManageStandardListSelector(state),
    canEditFilingFields: canEditFilingFields(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadStandardFilingFieldsList,
    loadStandardFilingFieldOptionsList,
    sortStandardFilingFieldOptionsList,
    filterStandardFilingFieldOptionsList,
    showCreateStandardFilingFieldOption,
    selectStandardFilingFieldOption,
    clearSelectedStandardFilingFieldOption,
    showCreateStandardFilingField,
  }
)(StandardFilingFieldOptionsListPage));
