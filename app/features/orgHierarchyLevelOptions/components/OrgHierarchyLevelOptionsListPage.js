import React, {Component} from 'react';
import {Dropdown, MenuItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {CustomizableGrid} from '../../customizableGrid/components';
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
import {Select} from '../../forms/components';
import {layout, navigationGroups} from '../../shared/constants';
import makeCurrentUserHasPermissionSelector from '../../authentication/selectors/currentUser/makeCurrentUserHasPermissionSelector';
import {PROFILING_LIST_MANAGEMENT} from '../../authentication/constants/permissions';
import {loadOrgHierarchyLevelsList} from '../../orgHierarchyLevels/actions';
import {
  loadAllOrgHierarchyLevelOptionsList,
  loadOrgHierarchyLevelOptionsList,
  sortOrgHierarchyLevelOptionsList,
  filterOrgHierarchyLevelOptionsList,
  showCreateOrgHierarchyLevelOption,
  selectOrgHierarchyLevelOption,
  clearSelectedOrgHierarchyLevelOption,
  showImportOrgHierarchyLevelOptions,
} from '../actions';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {
  loadingSelector,
  sortedOrgHierarchyLevelsSelector,
  orgHierarchyLevelSelectListOptionsArraySelector,
  sortedOrgHierarchyLevelOptionsArraySelector,
  sortedAllOrgHierarchyLevelOptionsSelector,
  sortSelector,
  selectedOrgHierarchyLevelOptionIdSelector,
  selectedOrgHierarchyLevelIdSelector,
  dataSelector,
  filterSelector,
  columnConfigurationSelector,
} from '../selectors/pages/list';
import {
  showSelector,
} from '../selectors/sidebars/edit';
import EditOrgHierarchyLevelOptionSidebar from './EditOrgHierarchyLevelOptionSidebar';
import CreateOrgHierarchyLevelOptionModal from './CreateOrgHierarchyLevelOptionModal';
import ImportOrgHierarchyLevelOptionsModal from './ImportOrgHierarchyLevelOptionsModal';
import ImportOrgHierarchyLevelOptionsValidationErrorsModal from './ImportOrgHierarchyLevelOptionsValidationErrorsModal';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {fromJS} from 'immutable';

class OrgHierarchyLevelOptionsListPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {
      loadOrgHierarchyLevelsList,
      loadAllOrgHierarchyLevelOptionsList,
      loadOrgHierarchyLevelOptionsList,
      router,
    } = this.props;

    loadOrgHierarchyLevelsList()
      .then(() => {
        const {orgHierarchyLevels} = this.props;

        loadAllOrgHierarchyLevelOptionsList()
          .then(() =>
            loadOrgHierarchyLevelOptionsList(orgHierarchyLevels.size ? orgHierarchyLevels.first().id : 0)
              .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Hierarchy Level Options list.', 'Error'))
          )
          .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the available Hierarchy Level Options.', 'Error'));
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Hierarchy Levels.', 'Error'));
  }

  handleSort({sort}) {
    this.props.sortOrgHierarchyLevelOptionsList(sort);
  }

  handleFilter({filter}) {
    this.props.filterOrgHierarchyLevelOptionsList(filter);
  }

  handleRowClick({dataItem}) {
    const {
      selectedOrgHierarchyLevelId,
      selectedOrgHierarchyLevelOptionId,
      selectOrgHierarchyLevelOption,
      clearSelectedOrgHierarchyLevelOption,
    } = this.props;

    if (dataItem.id === selectedOrgHierarchyLevelOptionId) clearSelectedOrgHierarchyLevelOption();
    else selectOrgHierarchyLevelOption(selectedOrgHierarchyLevelId, fromJS(dataItem));
  }

  handleSelectOrgHierarchyLevel(event) {
    const orgHierarchyLevelId = event.target.value;
    if (!orgHierarchyLevelId) return;

    const {router} = this.props;
    this.props.loadOrgHierarchyLevelOptionsList(orgHierarchyLevelId)
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Hierarchy Level Options list.', 'Error'));
  }

  handleShowCreateOptionModal() {
    const {showCreateOrgHierarchyLevelOption, selectedOrgHierarchyLevelId} = this.props;
    showCreateOrgHierarchyLevelOption(selectedOrgHierarchyLevelId);
  }

  handleExportImportTemplate() {
    const {selectedOrgHierarchyLevelId} = this.props;
    window.location.href = `${process.env.API_BASE_URL}org-hierarchy-levels/${selectedOrgHierarchyLevelId}/options/import/template`;
  }

  render() {
    const {
      loading,
      sort,
      filter,
      data,
      sidebarShown,
      orgHierarchyLevelSelectListOptions,
      selectedOrgHierarchyLevelId,
      column,
      handleShowImportOrgHierarchyLevelOptions,
      canEdit,
    } = this.props;
    const noLevels = orgHierarchyLevelSelectListOptions.length === 0;
    return (
      <Page>
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Hierarchy Level Options</PageTitle>
          <PageHeaderActions align="right">
            {canEdit && (
              <>
                <Dropdown id="export" pullRight className="header-button">
                  <Dropdown.Toggle noCaret><i className="fa fa-file-excel-o" /></Dropdown.Toggle>
                  <Dropdown.Menu>
                    <MenuItem eventKey="1" onClick={this.handleExportImportTemplate}>Download Hierarchy Level Option Import Template</MenuItem>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown id="newOrgHierarchyLevelOptions" disabled={noLevels} pullRight className="header-button">
                  <Dropdown.Toggle noCaret><i className="fa fa-plus" /></Dropdown.Toggle>
                  <Dropdown.Menu>
                    <MenuItem eventKey="1" onClick={this.handleShowCreateOptionModal}>New Hierarchy Level Option</MenuItem>
                    <MenuItem eventKey="2" onClick={handleShowImportOrgHierarchyLevelOptions}>Import Hierarchy Level Options</MenuItem>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.PROFILING} selectedNavigationSubGroup={navigationGroups.PROFILING_LIST_MANAGEMENT} />
          <MainContent loading={loading}>
            <Select
              id="orgHierarchyLevelId"
              formGroupClassName="org-hierarchy-level-selector"
              onChange={this.handleSelectOrgHierarchyLevel}
              value={selectedOrgHierarchyLevelId}
              options={orgHierarchyLevelSelectListOptions} />

            <AutoSizer>
              {({width, height}) => (
                <CustomizableGrid
                  data={data}
                  style={{width: width + (sidebarShown * layout.SIDEBAR_WIDTH), height: height - 50}}
                  sort={sort}
                  onSort={this.handleSort}
                  filter={filter}
                  onFilter={this.handleFilter}
                  selectedField="selected"
                  onRowClick={this.handleRowClick}
                  onSelectedChange={this.handleToggleSelect}
                  onHeaderSelectedChange={this.handleSelectAll}
                  columns={column} />
              )}
            </AutoSizer>
          </MainContent>
          <EditOrgHierarchyLevelOptionSidebar />
        </PageBody>
        <CreateOrgHierarchyLevelOptionModal />
        <ImportOrgHierarchyLevelOptionsModal />
        <ImportOrgHierarchyLevelOptionsValidationErrorsModal />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const canEditSelector = makeCurrentUserHasPermissionSelector(PROFILING_LIST_MANAGEMENT);

  return {
    loading: loadingSelector(state),
    sort: sortSelector(state),
    column: columnConfigurationSelector(state),
    filter: filterSelector(state),
    data: dataSelector(state),
    orgHierarchyLevels: sortedOrgHierarchyLevelsSelector(state),
    orgHierarchyLevelOptions: sortedOrgHierarchyLevelOptionsArraySelector(state),
    allOrgHierarchyLevelOptions: sortedAllOrgHierarchyLevelOptionsSelector(state),
    selectedOrgHierarchyLevelOptionId: selectedOrgHierarchyLevelOptionIdSelector(state),
    selectedOrgHierarchyLevelId: selectedOrgHierarchyLevelIdSelector(state),
    orgHierarchyLevelSelectListOptions: orgHierarchyLevelSelectListOptionsArraySelector(state),
    sidebarShown: showSelector(state),
    canEdit: canEditSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadSelectListOptions,
    loadOrgHierarchyLevelsList,
    loadAllOrgHierarchyLevelOptionsList,
    loadOrgHierarchyLevelOptionsList,
    sortOrgHierarchyLevelOptionsList,
    filterOrgHierarchyLevelOptionsList,
    showCreateOrgHierarchyLevelOption,
    selectOrgHierarchyLevelOption,
    clearSelectedOrgHierarchyLevelOption,
    handleShowImportOrgHierarchyLevelOptions: showImportOrgHierarchyLevelOptions,
  }
)(OrgHierarchyLevelOptionsListPage));
