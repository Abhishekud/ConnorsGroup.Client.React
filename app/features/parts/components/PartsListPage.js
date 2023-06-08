import React, {Component} from 'react';
import {Dropdown, MenuItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
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
  CustomizableGrid,
  GridConfigurationButton,
  GridConfigurationSidebar,
} from '../../customizableGrid/components';
import {
  showSelector,
} from '../selectors/sidebars/edit';
import {navigationGroups, layout} from '../../shared/constants';
import {
  AutoSizer,
} from 'react-virtualized';
import {
  loadPartsPage,
  loadPartsList,
  sortPartsList,
  filterPartsList,
  showCreatePart,
  selectPart,
  clearSelectedPart,
  showImportParts,
  showDeleteAllParts,
  togglePartsGridConfigurationSidebar,
  togglePartsGridColumnVisibility,
  REORDER_PARTS_GRID_COLUMN,
} from '../actions';
import {
  loadingSelector,
  sortSelector,
  dataSelector,
  filterSelector,
  selectedPartIdSelector,
  selectedPartFamilyIdSelector,
  columnConfigurationSelector,
  columnsSelector,
  showGridConfigurationSelector,
} from '../selectors/pages/list';
import {partNameSelector, partFamilyNameSelector} from '../../shared/selectors/components/settings';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {STANDARDS_PARTS_DELETE_ALL, STANDARDS_PARTS_AND_FAMILIES_EDIT, STANDARDS_PARTS_EXPORT} from '../../authentication/constants/permissions';
import PartsListEditSidebar from './PartsListEditSidebar';
import CreatePartModal from './CreatePartModal';
import ImportPartsModal from './ImportPartsModal';
import ImportPartsValidationErrorsModal from './ImportPartsValidationErrorsModal';
import {Select} from '../../forms/components';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {makeSelectListOptionsArraySelector} from '../../selectListOptions/selectors';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {PART_FAMILIES, PART_FIELDS} from '../../selectListOptions/constants/selectListTypes';
import pluralize from 'pluralize';
import DeleteAllPartsModal from './DeleteAllPartsModal';
import DeleteAllPartsConfirmModal from './DeleteAllPartsConfirmModal';
import {fromJS} from 'immutable';

class PartsListPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {loadPartsPage, loadPartsList, loadSelectListOptions, router, partName, partFamilyName} = this.props;

    loadPartsPage();

    loadSelectListOptions(PART_FAMILIES)
      .then(() => {
        const {partFamilies} = this.props;
        const partFamilyId = partFamilies.length ? partFamilies[0].value : 0;

        loadPartsList(partFamilyId)
          .catch(error => handleApiError(error, router, `An error occurred while attempting to load the ${pluralize(partName)} list.`, 'Error'));
      })
      .catch(error => handleApiError(error, router, `An error occurred while attempting to the load the available ${pluralize(partFamilyName)}.`, 'Error'));
  }

  handleSort({sort}) {
    this.props.sortPartsList(sort);
  }

  handleFilter({filter}) {
    this.props.filterPartsList(filter);
  }

  handleRowClick({dataItem}) {
    const {selectedPartId, selectPart, clearSelectedPart} = this.props;

    if (dataItem.id === selectedPartId) clearSelectedPart();
    else selectPart(fromJS(dataItem));
  }

  handleSelectPartFamily(event) {
    const partFamilyId = event.target.value;
    const {loadPartsList, router, partName} = this.props;

    loadPartsList(partFamilyId)
      .catch(error => handleApiError(error, router, `An error occurred while attempting to load the ${pluralize(partName)} list.`, 'Error'));
  }

  handleExportImportTemplate() {
    const {selectedPartFamilyId} = this.props;
    window.location.href = `${process.env.API_BASE_URL}part-families/${selectedPartFamilyId}/parts/import/template`;
  }

  render() {
    const {
      loading,
      data,
      sort,
      filter,
      columnConfiguration,
      selectedPartFamilyId,
      handleShowCreatePart,
      handleShowImportParts,
      handleShowDeleteAllParts,
      partFamilies,
      partName,
      sidebarShown,
      partFields,
      toggleGridConfigurationSidebar,
      showGridConfiguration,
      togglePartsGridColumnVisibility,
      columns,
      canDeleteAllParts,
      canEdit,
      canExport,
    } = this.props;

    const relativeWidth = (partFields.length > 4) ? false : sidebarShown;

    return (
      <Page pageClassName="parts-list-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>{pluralize(partName)}</PageTitle>
          <PageHeaderActions align="right">
            {canExport && <Dropdown id="export" pullRight className="header-button">
              <Dropdown.Toggle noCaret><i className="fa fa-file-excel-o" /></Dropdown.Toggle>
              <Dropdown.Menu>
                <MenuItem eventKey="1" onClick={this.handleExportImportTemplate}>Download {partName} Import Template</MenuItem>
              </Dropdown.Menu>
            </Dropdown>}
            {(canEdit || canDeleteAllParts) && <Dropdown id="newParts" pullRight className="header-button">
              <Dropdown.Toggle noCaret><i className="fa fa-plus" /></Dropdown.Toggle>
              <Dropdown.Menu>
                {canEdit && <MenuItem eventKey="1" onClick={partFamilies.length === 0 ? null : handleShowCreatePart} disabled={partFamilies.length === 0}>New {partName}</MenuItem>}
                {canEdit && <MenuItem eventKey="2" onClick={partFamilies.length === 0 ? null : handleShowImportParts} disabled={partFamilies.length === 0}>Import {pluralize(partName)}</MenuItem>}
                {canEdit && canDeleteAllParts ? <MenuItem divider /> : null}
                {canDeleteAllParts ? <MenuItem eventKey="3" onClick={partFamilies.length === 0 ? null : handleShowDeleteAllParts} disabled={partFamilies.length === 0}>Delete All {pluralize(partName)}</MenuItem> : null}
              </Dropdown.Menu>
            </Dropdown>}
            <GridConfigurationButton openSidebar={toggleGridConfigurationSidebar} closeSidebar={toggleGridConfigurationSidebar} showGridConfiguration={showGridConfiguration} />
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.STANDARDS} selectedNavigationSubGroup={navigationGroups.PARTS} />
          <MainContent loading={loading}>
            <Select
              id="partFamilyId"
              formGroupClassName="part-family-selector"
              onChange={this.handleSelectPartFamily}
              value={selectedPartFamilyId}
              options={partFamilies}
              disabled={loading} />
            <AutoSizer>
              {({width, height}) => (
                <CustomizableGrid
                  data={fromJS(data)}
                  style={{width: width + (relativeWidth * layout.SIDEBAR_WIDTH), height: height - 50}}
                  sort={sort}
                  onSort={this.handleSort}
                  filter={filter}
                  onFilter={this.handleFilter}
                  onRowClick={this.handleRowClick}
                  columns={columns} />
              )}
            </AutoSizer>
          </MainContent>
          <GridConfigurationSidebar dropActionId={REORDER_PARTS_GRID_COLUMN} columns={columnConfiguration} show={showGridConfiguration} toggleColumnVisibility={togglePartsGridColumnVisibility} />
          <PartsListEditSidebar canEdit={canEdit} />
        </PageBody>
        <CreatePartModal />
        <ImportPartsModal />
        <ImportPartsValidationErrorsModal />
        <DeleteAllPartsModal />
        <DeleteAllPartsConfirmModal />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const partFamiliesSelector = makeSelectListOptionsArraySelector(PART_FAMILIES);
  const partFieldsSelector = makeSelectListOptionsArraySelector(PART_FIELDS);
  const canDeleteAllSelector = makeCurrentUserHasPermissionSelector(STANDARDS_PARTS_DELETE_ALL);
  const canEditSelector = makeCurrentUserHasPermissionSelector(STANDARDS_PARTS_AND_FAMILIES_EDIT);
  const canExportSelector = makeCurrentUserHasPermissionSelector(STANDARDS_PARTS_EXPORT);

  return {
    loading: loadingSelector(state),
    columnConfiguration: columnConfigurationSelector(state),
    columns: columnsSelector(state),
    showGridConfiguration: showGridConfigurationSelector(state),
    sort: sortSelector(state),
    data: dataSelector(state),
    filter: filterSelector(state),
    selectedPartId: selectedPartIdSelector(state),
    selectedPartFamilyId: selectedPartFamilyIdSelector(state),
    partFamilies: partFamiliesSelector(state),
    partFields: partFieldsSelector(state),
    partName: partNameSelector(state),
    partFamilyName: partFamilyNameSelector(state),
    sidebarShown: showSelector(state),
    canDeleteAllParts: canDeleteAllSelector(state),
    canEdit: canEditSelector(state),
    canExport: canExportSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadPartsPage,
    loadPartsList,
    loadSelectListOptions,
    togglePartsGridColumnVisibility,
    sortPartsList,
    filterPartsList,
    toggleGridConfigurationSidebar: togglePartsGridConfigurationSidebar,
    handleShowCreatePart: showCreatePart,
    handleShowImportParts: showImportParts,
    handleShowDeleteAllParts: showDeleteAllParts,
    selectPart,
    clearSelectedPart,
  }
)(PartsListPage));
