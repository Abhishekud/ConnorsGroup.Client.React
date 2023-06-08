import React, {Component} from 'react';
import {Button, Dropdown, MenuItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {withRouter} from 'react-router';
import pluralize from 'pluralize';
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
import {navigationGroups} from '../../shared/constants';
import {
  departmentNameSelector,
  locationNameSelector,
} from '../../shared/selectors/components/settings';
import {
  loadAttributesPage,
  loadLocationAttributesList,
  sortAttributesList,
  pageAttributesList,
  filterAttributesList,
  showCreateAttribute,
  toggleAttributesSidebar,
  updateLocationsAttribute,
  loadAttributesList,
  showImportAttributes,
  showImportLocationAttributes,
  toggleGridConfigurationSidebar,
  toggleAttributesColumnVisibility,
  toggleConfirmSelectAllAttributes,
  clearAttributesListFilters,
  clearAttributesListSorts,
  reorderAttributesColumn,
  toggleAttributesColumnLock,
  resetAttributesColumns,
  showHiddenAttributeColumns,
  REORDER_ATTRIBUTES_COLUMN,
  loadAttributesColumns,
  resetLockedAttributesColumns,
  cancelColumnReorder,
} from '../actions';
import {
  loadingSelector,
  savingSelector,
  locationsAttributesSelector,
  sortSelector,
  filterSelector,
  selectedDepartmentIdSelector,
  columnsSelector,
  columnsConfigurationSelector,
  tableDataSelector,
  dataSelector,
  showGridConfigurationSelector,
  attributesSelector,
  hideClearFiltersButtonSelector,
  activeBackgroundJobsSelector,
  backgroundJobStartedSelector,
  hideClearSortsButtonSelector,
  showResetButtonSelector,
  showHiddenButtonSelector,
  hiddenColumnsSelector,
  showLockButtonSelector,
  persistConfigurationSelector,
  cachedGridConfigurationSelector,
  showColumnReorderConfirmModalSelector,
  reorderedColumnDetailSelector,
  lastReorderedColumnModelSelector,
} from '../selectors/pages/list';
import {
  showSelector as showAttributesSelector,
} from '../selectors/sidebars/attributes';
import {ColumnReorderConfirmModal, CreateExportRequestModal} from '../../shared/components';
import {showCreateExportRequest, pollBackgroundJobs} from '../../shared/actions';
import {loadOrgHierarchyLevelsList} from '../../orgHierarchyLevels/actions';
import {loadAllOrgHierarchyLevelOptionsList} from '../../orgHierarchyLevelOptions/actions';
import {
  AttributesSidebar,
  CreateAttributeModal,
  ImportAttributesModal,
  ImportAttributesValidationErrorsModal,
  ImportLocationAttributesModal,
  ImportLocationAttributesValidationErrorsModal,
  ConfirmSelectAllAttributesModal,
} from './';
import {makeSelectListOptionsArraySelector} from '../../selectListOptions/selectors';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {DEPARTMENTS} from '../../selectListOptions/constants/selectListTypes';
import {handleApiError, toggleVisibilityReorderColumns, toggleLockReorderColumns, getReorderedGridColumnDetails, exportDownloader} from '../../shared/services';
import {
  CustomizableGrid,
  CheckboxHeaderCell,
  GridConfigurationButton,
  GridConfigurationSidebar,
  BooleanFilterCell,
  ClearFiltersButton,
  ClearSortsButton,
  ResetLockedColumnsButton,
  ClearHiddenColumnsButton,
  PersistGridConfiguration,
} from '../../customizableGrid/components';
import pagingSelector from '../selectors/pages/list/pagingSelector';
import locationsCountSelector from '../selectors/pages/list/locationsCountSelector';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {PROFILING_ATTRIBUTES_ASSIGN, PROFILING_ATTRIBUTES_CREATE, PROFILING_ATTRIBUTES_EXPORT, PROFILING_LOCATION_ATTRIBUTES_IMPORT} from '../../authentication/constants/permissions';
import {Map} from 'immutable';
import {POLL_INTERVAL, LOCATION_ATTRIBUTE_IMPORTER} from '../../shared/constants/backgroundJobs';
import {Tooltip} from '@progress/kendo-react-tooltip';
import {ALLOWED_MAX_COLUMN_LOCKS} from '../../customizableGrid/constants/columnConfigurations';
import {persistGridConfiguration, retrieveGridConfiguration, updateCachedGridConfiguration} from '../../customizableGrid/actions';
import {
  ATTRIBUTES as ATTRIBUTES_GRID,
} from '../../customizableGrid/constants/grids';

class AttributesListPage extends Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);
    setTimeout(() => this.checkBackgroundJobs());
    this.pollTimer = setInterval(this.checkBackgroundJobs, POLL_INTERVAL);
  }

  componentDidMount() {
    const {
      locationName, departmentName,
      loadAttributesPage, loadSelectListOptions, loadLocationAttributesList, loadAttributesList, loadOrgHierarchyLevelsList, loadAllOrgHierarchyLevelOptionsList, router,
    } = this.props;

    loadAttributesPage();

    loadSelectListOptions(DEPARTMENTS)
      .then(() => {
        const {departments} = this.props;
        const departmentId = departments.length ? departments[0].value : 0;

        loadLocationAttributesList(departmentId)
          .catch(error => handleApiError(error, router, `An error occurred while attempting to load the ${locationName} Attributes list.`, 'Error'));

        loadAttributesList(departmentId)
          .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Attributes list.', 'Error'));
      })
      .catch(error => handleApiError(error, router, `An error occurred while attempting to load the available ${pluralize(departmentName)}.`, 'Error'));

    loadOrgHierarchyLevelsList().catch(error => handleApiError(error, router, 'An error occurred while attempting to load organization hierarchies.'));
    loadAllOrgHierarchyLevelOptionsList().catch(error => handleApiError(error, router, 'An error occurred while attempting to load organization hierarchies.'));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.columns.size !== this.props.columns.size || prevProps.saving !== this.props.saving ||
      prevProps.selectedDepartmentId !== this.props.selectedDepartmentId || prevProps.cachedGridConfig?.size !== this.props.cachedGridConfig?.size) {
      this.props.loadAttributesColumns(this.props.columns);
    }
  }

  componentWillUnmount() {
    clearInterval(this.pollTimer);
    this.pollTimer = null;
  }

  checkBackgroundJobs() {
    const {
      pollBackgroundJobs,
      loadLocationAttributesList,
      router,
      departments,
    } = this.props;

    pollBackgroundJobs([LOCATION_ATTRIBUTE_IMPORTER])
      .then(() => {
        const {activeBackgroundJobs, backgroundJobStarted} = this.props;

        if (!activeBackgroundJobs && backgroundJobStarted) {
          const departmentId = departments.length ? departments[0].value : 0;
          loadLocationAttributesList(departmentId)
            .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Attributes list.', 'Error'));
        }
      });
  }
  handleSort({sort}) {
    if (Object.entries(sort).length === 0) {
      this.props.clearAttributesListSorts();
    } else {
      this.props.sortAttributesList(sort);
    }
  }

  handleFilter({filter}) {
    this.props.filterAttributesList(filter);
  }

  handlePageChange(event) {
    this.props.pageAttributesList(event.page.skip);
  }

  renderHeader(tdElement, headerProps) {
    if (headerProps.field.startsWith('attribute_')) {
      return (
        <CheckboxHeaderCell field={headerProps.field} title={headerProps.title}
          data={this.props.filteredAttributes} saving={this.props.activeBackgroundJobs} disabled={!this.props.canAssign} onClick={this.handleConfirmSelectAllAttributes} />
      );
    }

    return tdElement;
  }

  renderFilterCell(element, filterProps) {
    if (filterProps.field.startsWith('attribute_')) {
      return (<BooleanFilterCell {...filterProps} />);
    }
    return element;
  }

  handleSelectDepartment(event) {
    const departmentId = event.target.value;
    const {locationName, loadLocationAttributesList, loadAttributesList, router} = this.props;

    if (departmentId) {
      loadLocationAttributesList(departmentId)
        .catch(error => handleApiError(error, router, `An error occurred while attempting to load the ${locationName} Attributes list.`, 'Error'));

      loadAttributesList(departmentId)
        .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Attributes list.', 'Error'));
    }
  }

  handleSelectAttribute({dataItem, field}) {
    if (!this.props.canAssign || this.props.activeBackgroundJobs) return;

    const locationId = dataItem.id;
    const attributeId = parseInt(/attribute_(\d+)/.exec(field)[1], 10);
    const {locationsAttributes, updateLocationsAttribute} = this.props;
    const attributeIds = locationsAttributes.get(locationId);
    const remove = attributeIds.has(attributeId);

    updateLocationsAttribute([{locationId, remove}], attributeId);
  }

  handleSelectAllAttributes(column) {
    const attributeId = parseInt(column.slice(10), 10);
    const {filteredAttributes, locationsAttributes, updateLocationsAttribute} = this.props;
    const anyChecked = filteredAttributes.some(location => location.get(column));
    const models = [];

    filteredAttributes.forEach(location => {
      const locationId = location.get('id');
      const attributeIds = locationsAttributes.get(locationId);

      const newAttributeIds = anyChecked
        ? attributeIds.subtract([attributeId])
        : attributeIds.add(attributeId);

      if (newAttributeIds !== attributeIds) {
        models.push({locationId, remove: anyChecked});
      }
    });

    updateLocationsAttribute(models, attributeId);
  }

  handleConfirmSelectAllAttributes(column) {
    const {filteredAttributes, toggleConfirmSelectAllAttributes, attributesList, activeBackgroundJobs} = this.props;
    if (activeBackgroundJobs) return;
    const attributeId = parseInt(column.slice(10), 10);
    const toggleConfirmModel = new Map({
      columnId: column,
      columnName: attributesList.get(attributeId).get('name'),
      appliedCheck: filteredAttributes.some(location => location.get(column)),
    });
    toggleConfirmSelectAllAttributes(toggleConfirmModel);
    return;
  }

  handleShowCreateAttribute() {
    const {selectedDepartmentId, showCreateAttribute, departments} = this.props;
    const selectedDepartment = departments.filter(d => d.value === selectedDepartmentId)[0];

    showCreateAttribute(selectedDepartmentId, selectedDepartment.label);
  }

  handleShowCreateExportRequest() {
    const {showCreateExportRequest, selectedDepartmentId, filter} = this.props;
    showCreateExportRequest({departmentId: selectedDepartmentId, filter});
  }

  handleExport(exportRequestId) {
    exportDownloader(`${process.env.API_BASE_URL}attributes/export/${exportRequestId}`);
  }

  handleExportImportTemplate() {
    exportDownloader(`${process.env.API_BASE_URL}attributes/import/template`);
  }

  handleExportImportLocationAttributesTemplate() {
    exportDownloader(`${process.env.API_BASE_URL}attributes/import-location-attributes/template`);
  }

  setResetReorderedColumns() {
    const {loadAttributesColumns, resetAttributesColumns} = this.props;
    resetAttributesColumns().then(() => loadAttributesColumns(this.props.columns));
  }

  handleResetLockedColumns() {
    const {loadAttributesColumns, resetLockedAttributesColumns} = this.props;
    resetLockedAttributesColumns().then(() => loadAttributesColumns(this.props.columns));
  }

  handleShowHiddenColumns() {
    const {loadAttributesColumns, showHiddenAttributeColumns} = this.props;
    showHiddenAttributeColumns().then(() => loadAttributesColumns(this.props.columns));
  }

  handleClearFilters() {
    this.props.clearAttributesListFilters();
  }

  handleClearSorts() {
    this.props.clearAttributesListSorts();
  }

  handleReorderColumns(event) {
    const {columns, reorderAttributesColumn} = this.props;
    const reorderedColumnDetail = getReorderedGridColumnDetails(event, columns);
    if (!reorderedColumnDetail) return;
    const {columnKey, oldIndex, newIndex} = reorderedColumnDetail;
    reorderAttributesColumn(columnKey, oldIndex, newIndex);
  }

  setToggleColumnLock(field, lock) {
    const {columns, toggleAttributesColumnLock} = this.props;
    const lockColumnsList = toggleLockReorderColumns(field, lock, columns);
    toggleAttributesColumnLock(field, lock, lockColumnsList);
  }

  setToggleColumnVisibility(field, visibility) {
    const {columns, hiddenColumns, toggleAttributesColumnVisibility} = this.props;
    const {selectedColumn, columnsList} = toggleVisibilityReorderColumns(field, visibility, columns, hiddenColumns);
    toggleAttributesColumnVisibility(field, visibility, columnsList, selectedColumn);
  }

  handleConfirmColumnReorder() {
    const {reorderAttributesColumn, lastReorderedColumnModel} = this.props;
    reorderAttributesColumn(lastReorderedColumnModel.columnKey, lastReorderedColumnModel.oldIndex, lastReorderedColumnModel.newIndex);
  }

  render() {
    const {
      loading,
      saving,
      sort,
      filter,
      columns,
      pagedAttributes,
      showAttributes,
      handleToggleAttributesSidebar,
      handleShowImportAttributes,
      handleShowImportLocationAttributes,
      departments,
      locationName,
      selectedDepartmentId,
      showGridConfiguration,
      columnsConfiguration,
      locationsCount,
      paging,
      canCreate,
      canImport,
      canExport,
      hideClearFiltersButton,
      hideClearSortsButton,
      activeBackgroundJobs,
      showResetButton,
      showHiddenButton,
      showLockButton,
      persistConfiguration,
      persistGridConfiguration,
      retrieveGridConfiguration,
      updateCachedGridConfiguration,
      cancelColumnReorder,
      reorderedColumnDetail,
      showColumnReorderConfirmModal,
      toggleGridConfigurationSidebar,
    } = this.props;
    let recalcStatus = null;
    if (activeBackgroundJobs) {
      recalcStatus = <Tooltip openDelay={100} position="bottom" anchorElement="target"><i className="fa fa-spinner fa-spin" title="Calculation in progress" /></Tooltip>;
    }

    return (
      <Page pageClassName="attributes-list-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Attributes</PageTitle>
          <PageHeaderActions align="right">
            <ClearFiltersButton hide={hideClearFiltersButton} onClear={this.handleClearFilters} />
            <ClearSortsButton hide={hideClearSortsButton} onClear={this.handleClearSorts} />
            <ResetLockedColumnsButton hide={showLockButton} onClear={this.handleResetLockedColumns} />
            <ClearHiddenColumnsButton hide={showHiddenButton} onClear={this.handleShowHiddenColumns} />
            {recalcStatus}
            {canExport && <Dropdown id="export" pullRight className="header-button" disabled={activeBackgroundJobs}>
              <Dropdown.Toggle noCaret><i className="fa fa-file-excel-o" /></Dropdown.Toggle>
              <Dropdown.Menu>
                <MenuItem eventKey="1" disabled={departments.length === 0} onClick={departments.length === 0 ? null : this.handleShowCreateExportRequest}>Export Attributes</MenuItem>
                <MenuItem eventKey="2" disabled={departments.length === 0} onClick={departments.length === 0 ? null : this.handleExportImportTemplate}>Download Attribute Import Template</MenuItem>
                <MenuItem eventKey="3" disabled={departments.length === 0} onClick={departments.length === 0 ? null : this.handleExportImportLocationAttributesTemplate}>Download All {locationName}-Attributes Import Template (.xlsx)</MenuItem>
              </Dropdown.Menu>
            </Dropdown>}
            {(canCreate || canImport) && <Dropdown id="newAttributes" pullRight className="header-button" disabled={activeBackgroundJobs}>
              <Dropdown.Toggle noCaret><i className="fa fa-plus" /></Dropdown.Toggle>
              <Dropdown.Menu>
                {canCreate && (
                  <>
                    <MenuItem eventKey="1" disabled={departments.length === 0} onClick={departments.length === 0 ? null : this.handleShowCreateAttribute}>New Attribute</MenuItem>
                    <MenuItem eventKey="2" disabled={departments.length === 0} onClick={departments.length === 0 ? null : handleShowImportAttributes}>Import Attributes</MenuItem>
                  </>
                )}
                {canImport && <MenuItem eventKey="3" disabled={departments.length === 0} onClick={departments.length === 0 ? null : handleShowImportLocationAttributes}>Import All {locationName}-Attributes (.xlsx)</MenuItem>}
              </Dropdown.Menu>
            </Dropdown>}
            <div className="flyout-button">
              <Button className={showAttributes ? 'btn-wheat' : 'btn-default'} onClick={handleToggleAttributesSidebar} disabled={saving}>
                <i className="fa fa-list-ul" />
              </Button>
            </div>
            <GridConfigurationButton openSidebar={toggleGridConfigurationSidebar} closeSidebar={toggleGridConfigurationSidebar} showGridConfiguration={showGridConfiguration} />
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.PROFILING} />
          <MainContent loading={loading}>
            <div className="attributes-grid-header-section">
              <div>
                <Select
                  id="departmentId"
                  formGroupClassName="departments-selector"
                  onChange={this.handleSelectDepartment}
                  value={selectedDepartmentId}
                  options={departments}
                  disabled={saving} />
              </div>
              { this.setToggleColumnLock && !columns.first().get('lockable') && <div className="column-lock-warning"><h5 className="text-danger">Note: Maximum {ALLOWED_MAX_COLUMN_LOCKS} columns can be locked</h5></div>}
            </div>
            <AutoSizer>
              {({width, height}) => (
                <CustomizableGrid style={{width, height: height - 50}}
                  columns={columns} data={pagedAttributes}
                  onItemChange={this.handleSelectAttribute}
                  onSort={this.handleSort} sort={sort}
                  onFilter={this.handleFilter} filter={filter}
                  headerCellRender={this.renderHeader} filterCellRender={this.renderFilterCell}
                  onPageChange={this.handlePageChange} total={locationsCount}
                  skip={paging.get('skip')} take={paging.get('take')}
                  toggleColumnLock={this.setToggleColumnLock} toggleColumnVisibility={this.setToggleColumnVisibility} reorderable
                  onColumnReorder={this.handleReorderColumns}
                  showColumnContextMenu />
              )}
            </AutoSizer>
          </MainContent>
          <AttributesSidebar />
          <GridConfigurationSidebar dropActionId={REORDER_ATTRIBUTES_COLUMN} columns={columnsConfiguration}
            show={showGridConfiguration} toggleColumnVisibility={this.setToggleColumnVisibility} toggleColumnLock={this.setToggleColumnLock}
            handleResetGridConfiguration={this.setResetReorderedColumns} showResetGridConfiguration={showResetButton} />
          <PersistGridConfiguration gridId={ATTRIBUTES_GRID} configuration={persistConfiguration} persist={persistGridConfiguration} retrieve={retrieveGridConfiguration}
            updateCachedConfiguration={updateCachedGridConfiguration} />
        </PageBody>
        <CreateAttributeModal />
        <CreateExportRequestModal title="Export Attributes" onExportRequestCreated={this.handleExport} />
        <ImportAttributesModal />
        <ImportAttributesValidationErrorsModal />
        <ImportLocationAttributesModal />
        <ImportLocationAttributesValidationErrorsModal />
        <ConfirmSelectAllAttributesModal onConfirm={this.handleSelectAllAttributes} />
        <ColumnReorderConfirmModal show={showColumnReorderConfirmModal} column={reorderedColumnDetail} onConfirm={this.handleConfirmColumnReorder} onCancel={cancelColumnReorder} processing={false} />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const departmentsSelector = makeSelectListOptionsArraySelector(DEPARTMENTS);
  const canAssignSelector = makeCurrentUserHasPermissionSelector(PROFILING_ATTRIBUTES_ASSIGN);
  const canCreateSelector = makeCurrentUserHasPermissionSelector(PROFILING_ATTRIBUTES_CREATE);
  const canExportSelector = makeCurrentUserHasPermissionSelector(PROFILING_ATTRIBUTES_EXPORT);
  const canImportSelector = makeCurrentUserHasPermissionSelector(PROFILING_LOCATION_ATTRIBUTES_IMPORT);

  return {
    loading: loadingSelector(state),
    saving: savingSelector(state),
    locationsAttributes: locationsAttributesSelector(state),
    selectedDepartmentId: selectedDepartmentIdSelector(state),
    departmentName: departmentNameSelector(state),
    departments: departmentsSelector(state),
    locationName: locationNameSelector(state),
    sort: sortSelector(state),
    paging: pagingSelector(state),
    filter: filterSelector(state),
    locationsCount: locationsCountSelector(state),
    showAttributes: showAttributesSelector(state),
    columns: columnsSelector(state),
    columnsConfiguration: columnsConfigurationSelector(state),
    pagedAttributes: tableDataSelector(state),
    filteredAttributes: dataSelector(state),
    showGridConfiguration: showGridConfigurationSelector(state),
    canAssign: canAssignSelector(state),
    canCreate: canCreateSelector(state),
    canExport: canExportSelector(state),
    canImport: canImportSelector(state),
    attributesList: attributesSelector(state),
    hideClearFiltersButton: hideClearFiltersButtonSelector(state),
    hideClearSortsButton: hideClearSortsButtonSelector(state),
    activeBackgroundJobs: activeBackgroundJobsSelector(state),
    backgroundJobStarted: backgroundJobStartedSelector(state),
    showResetButton: showResetButtonSelector(state),
    showHiddenButton: showHiddenButtonSelector(state),
    hiddenColumns: hiddenColumnsSelector(state),
    showLockButton: showLockButtonSelector(state),
    persistConfiguration: persistConfigurationSelector(state),
    cachedGridConfig: cachedGridConfigurationSelector(state),
    showColumnReorderConfirmModal: showColumnReorderConfirmModalSelector(state),
    reorderedColumnDetail: reorderedColumnDetailSelector(state),
    lastReorderedColumnModel: lastReorderedColumnModelSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadLocationAttributesList,
    sortAttributesList,
    filterAttributesList,
    showCreateAttribute,
    handleToggleAttributesSidebar: toggleAttributesSidebar,
    handleShowImportAttributes: showImportAttributes,
    handleShowImportLocationAttributes: showImportLocationAttributes,
    updateLocationsAttribute,
    loadSelectListOptions,
    loadAttributesList,
    loadAttributesPage,
    showCreateExportRequest,
    loadOrgHierarchyLevelsList,
    loadAllOrgHierarchyLevelOptionsList,
    toggleGridConfigurationSidebar,
    toggleAttributesColumnVisibility,
    pageAttributesList,
    clearAttributesListFilters,
    clearAttributesListSorts,
    toggleConfirmSelectAllAttributes,
    pollBackgroundJobs,
    reorderAttributesColumn,
    toggleAttributesColumnLock,
    resetAttributesColumns,
    showHiddenAttributeColumns,
    persistGridConfiguration,
    retrieveGridConfiguration,
    updateCachedGridConfiguration,
    loadAttributesColumns,
    resetLockedAttributesColumns,
    cancelColumnReorder,
  }
)(AttributesListPage));
