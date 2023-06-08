import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {Dropdown, MenuItem} from 'react-bootstrap';
import {navigationGroups} from '../../shared/constants';
import {
  MainContent,
  NavigationSidebar,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../layout/components';
import {fromJS} from 'immutable';
import {ClearFiltersButton, ClearHiddenColumnsButton, ClearSortsButton, CustomizableGrid, GridConfigurationButton, GridConfigurationSidebar, PersistGridConfiguration, ResetLockedColumnsButton} from '../../customizableGrid/components';
import {Tooltip} from '@progress/kendo-react-tooltip';
import {AutoSizer} from 'react-virtualized';
import {
  loadElementsList,
  toggleElementsListFiltersSidebar,
  toggleElementsListBulkEditSidebar,
  showCreateNonMOSTElement,
  showCreateMOSTElement,
  sortElementsList,
  filterElementsList,
  selectAllElements,
  selectElement,
  toggleSelectElements,
  pageElementsList,
  toggleElementsGridConfigurationSidebar,
  toggleElementsColumnVisibility,
  REORDER_ELEMENTS_COLUMN,
  clearElementsListFilters,
  clearElementsListSorts,
  toggleElementsColumnLock,
  resetElementsColumns,
  reorderElementsColumn,
  loadElementsColumns,
  resetLockedElementsColumns,
  showHiddenElementsColumns,
  cancelColumnReorder,
} from '../actions';
import {toggleIndustryElementsList} from '../../industryElements/actions';
import {showSelector as showIndustryElementsSelector} from '../../industryElements/selectors/pages/list';
import {
  columnsConfigurationSelector,
  loadingSelector,
  sortSelector,
  selectedElementsSelector,
  filterSelector,
  dataSelector,
  skipSelector,
  columnsSelector,
  showGridConfigurationSelector,
  takeSelector,
  totalElementsSelector,
  tableDataSelector,
  hideClearFiltersButtonSelector,
  showResetButtonSelector,
  showHiddenButtonSelector,
  showLockButtonSelector,
  hiddenColumnsSelector,
  showColumnReorderConfirmModalSelector,
  reorderedColumnDetailSelector,
  lastReorderedColumnModelSelector,
  persistConfigurationSelector,
  cachedGridConfigurationSelector,
  isElementsLoadedSelector,
  shouldLoadElementsColumnsSelector,
} from '../selectors/pages/list';
import {timeFormatSelector} from '../../shared/selectors/components/timeFormatSelector';
import CreateNonMOSTElementModal from './CreateNonMOSTElementModal';
import CreateMOSTElementModal from './CreateMOSTElementModal';
import ElementsListFiltersSidebar from './ElementsListFiltersSidebar';
import {ColumnReorderConfirmModal, CreateExportRequestModal, TimeFormatSelector} from '../../shared/components';
import {BulkEditButton} from '../../shared/components/buttons';
import {
  openSelector as bulkEditOpenSelector,
} from '../selectors/sidebars/bulkEditElements';
import ElementsListBulkEditSidebar from './ElementsListBulkEditSidebar';
import {elementTypes} from '../constants';
import IndustryElementsListPage from '../../industryElements/components/IndustryElementsListPage';
import DeleteSelectedElementsModal from './DeleteSelectedElementsModal';
import ExportElementsButton from './ExportElementsButton';
import {getReorderedGridColumnDetails, handleApiError, toggleLockReorderColumns, toggleVisibilityReorderColumns} from '../../shared/services';
import {withRouter} from 'react-router';
import {INDUSTRY_TYPICAL_SOURCES} from '../../selectListOptions/constants/selectListTypes';
import {makeSelectListOptionsArraySelector} from '../../selectListOptions/selectors';
import makeCurrentUserHasPermissionSelector from '../../authentication/selectors/currentUser/makeCurrentUserHasPermissionSelector';
import {ELEMENTS_EDIT} from '../../authentication/constants/permissions';
import hideClearSortsButtonSelector from '../selectors/pages/list/hideClearSortsButtonSelector';
import {ALLOWED_MAX_COLUMN_LOCKS} from '../../customizableGrid/constants/columnConfigurations';
import {persistGridConfiguration, retrieveGridConfiguration, updateCachedGridConfiguration} from '../../customizableGrid/actions';
import {
  ELEMENTS as ELEMENTS_GRID,
} from '../../customizableGrid/constants/grids';

class ElementsListPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {loadElementsList, appliedFilterValues, router} = this.props;
    loadElementsList(appliedFilterValues)
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the list of elements.', 'Error'));
  }

  componentDidUpdate(prevProps) {
    if (this.props.shouldLoadElementsColumns || prevProps.isElementsLoaded !== this.props.isElementsLoaded || prevProps.cachedGridConfig?.size !== this.props.cachedGridConfig?.size) {
      this.props.loadElementsColumns(this.props.columns);
    }
  }

  handleAddIndustryElements() {
    this.props.toggleIndustryElementsList();
  }

  handleCreateNonMOSTElement() {
    this.props.showCreateNonMOSTElement();
  }

  handleCreateMOSTElement() {
    this.props.showCreateMOSTElement();
  }

  handleSort({sort}) {
    this.props.sortElementsList(sort);
  }

  handleFilter({filter}) {
    this.props.filterElementsList(filter);
  }

  handleRowClick({dataItem, nativeEvent}) {
    const {router, selectElement} = this.props;
    const elementType = dataItem.elementType;
    const id = dataItem.id;

    if (nativeEvent.target.previousSibling === null) {
      selectElement(id);
    } else if (elementType === elementTypes.MOST) {
      router.push(`/elements/most/${id}`);
    } else {
      router.push(`/elements/non-most/${id}`);
    }
  }

  handleSelectAll() {
    const {data, selectedElements, selectAllElements} = this.props;
    selectAllElements(data.map(x => x.get('id')), Boolean(selectedElements.size === 0));
  }

  handleExport(exportRequestId) {
    window.location.href = `${process.env.API_BASE_URL}elements/export/${exportRequestId}`;
  }

  handleToggleSelect({dataItem}) {
    const {toggleSelectElements} = this.props;
    toggleSelectElements(dataItem.id);
  }

  handleShowBulkEditPanel() {
    this.props.toggleElementsListBulkEditSidebar();
  }

  handlePageChange(event) {
    this.props.pageElementsList(event.page.skip);
  }

  handleClearFilters() {
    this.props.clearElementsListFilters();
  }

  handleClearSorts() {
    this.props.clearElementsListSorts();
  }

  setToggleColumnLock(field, lock) {
    const {columns, toggleElementsColumnLock} = this.props;
    const finalColumnsList = toggleLockReorderColumns(field, lock, columns);
    toggleElementsColumnLock(field, lock, finalColumnsList);
  }

  setToggleColumnVisibility(field, visibility) {
    const {columns, hiddenColumns, toggleElementsColumnVisibility} = this.props;
    const {selectedColumn, columnsList} = toggleVisibilityReorderColumns(field, visibility, columns, hiddenColumns);
    toggleElementsColumnVisibility(field, visibility, columnsList, selectedColumn);
  }

  setResetReorderedColumns() {
    const {loadElementsColumns, resetElementsColumns} = this.props;
    resetElementsColumns().then(() => loadElementsColumns(this.props.columns));
  }

  handleResetLockedColumns() {
    const {loadElementsColumns, resetLockedElementsColumns} = this.props;
    resetLockedElementsColumns().then(() => loadElementsColumns(this.props.columns));
  }

  handleShowHiddenColumns() {
    const {loadElementsColumns, showHiddenElementsColumns} = this.props;
    showHiddenElementsColumns().then(() => loadElementsColumns(this.props.columns));
  }

  handleReorderColumns(event) {
    const {columns, reorderElementsColumn} = this.props;
    const reorderedColumnDetail = getReorderedGridColumnDetails(event, columns);
    if (!reorderedColumnDetail) return;
    const {columnKey, oldIndex, newIndex} = reorderedColumnDetail;
    reorderElementsColumn(columnKey, oldIndex, newIndex);
  }

  handleConfirmColumnReorder() {
    const {reorderElementsColumn, lastReorderedColumnModel} = this.props;
    reorderElementsColumn(lastReorderedColumnModel.columnKey, lastReorderedColumnModel.oldIndex, lastReorderedColumnModel.newIndex);
  }

  render() {
    const {
      loading,
      bulkEditSidebarShown,
      sort,
      pageOfElements,
      filter,
      showIndustryElementsList,
      selectedElements,
      industrySources,
      columnsConfiguration,
      totalElements,
      skip,
      take,
      toggleGridConfigurationSidebar,
      columns,
      showGridConfiguration,
      canEdit,
      hideClearFiltersButton,
      hideClearSortsButton,
      showResetButton,
      showLockButton,
      showHiddenButton,
      cancelColumnReorder,
      reorderedColumnDetail,
      showColumnReorderConfirmModal,
      persistConfiguration,
      persistGridConfiguration,
      retrieveGridConfiguration,
      updateCachedGridConfiguration,
    } = this.props;

    if (showIndustryElementsList) {
      return <IndustryElementsListPage />;
    }

    return (
      <Page pageClassName="elements-list-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Elements</PageTitle>
          <PageHeaderActions>
            <ClearFiltersButton hide={hideClearFiltersButton} onClear={this.handleClearFilters} />
            <ClearSortsButton hide={hideClearSortsButton} onClear={this.handleClearSorts} />
            <ResetLockedColumnsButton hide={showLockButton} onClear={this.handleResetLockedColumns} />
            <ClearHiddenColumnsButton hide={showHiddenButton} onClear={this.handleShowHiddenColumns} />
            {canEdit && <BulkEditButton isVisible={selectedElements.size > 0} isOpen={bulkEditSidebarShown} onClick={this.handleShowBulkEditPanel} />}
            <ExportElementsButton />
            {canEdit && (
              <Dropdown id="createElement" pullRight className="header-button">
                <Dropdown.Toggle noCaret><i className="fa fa-plus" /></Dropdown.Toggle>
                <Dropdown.Menu>
                  <MenuItem eventKey="1" disabled={industrySources.length === 0} onClick={industrySources.length === 0 ? null : this.handleAddIndustryElements}>Existing Industry Element</MenuItem>
                  <MenuItem eventKey="2" onClick={this.handleCreateNonMOSTElement}>New Timed Element</MenuItem>
                  <MenuItem eventKey="3" onClick={this.handleCreateMOSTElement}>New MOST Element</MenuItem>
                </Dropdown.Menu>
              </Dropdown>
            )}
            <TimeFormatSelector />
            <GridConfigurationButton openSidebar={toggleGridConfigurationSidebar} closeSidebar={toggleGridConfigurationSidebar} showGridConfiguration={showGridConfiguration} />
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.MEASUREMENTS} />
          <MainContent loading={loading}>
            <div>{this.setToggleColumnLock && !columns.first().get('lockable') &&
            <div className="column-lock-warning">
              <span className="text-danger">Note: Maximum {ALLOWED_MAX_COLUMN_LOCKS} columns can be locked</span>
            </div>}
            </div>
            <AutoSizer>
              {({width, height}) => (
                <Tooltip openDelay={100} position="top" anchorElement="target">
                  <CustomizableGrid
                    data={fromJS(pageOfElements)}
                    style={{width, height}}
                    sort={sort}
                    onSort={this.handleSort}
                    filter={filter}
                    onPageChange={this.handlePageChange}
                    onFilter={this.handleFilter}
                    selectedField={canEdit ? 'selected' : null}
                    onRowClick={this.handleRowClick}
                    onSelectedChange={canEdit ? this.handleToggleSelect : null}
                    onHeaderSelectedChange={canEdit ? this.handleSelectAll : null}
                    columns={columns}
                    total={totalElements}
                    skip={skip} take={take}
                    toggleColumnLock={this.setToggleColumnLock} toggleColumnVisibility={this.setToggleColumnVisibility}
                    onColumnReorder={this.handleReorderColumns}
                    showColumnContextMenu reorderable />
                </Tooltip>
              )}
            </AutoSizer>
          </MainContent>
          <GridConfigurationSidebar dropActionId={REORDER_ELEMENTS_COLUMN} columns={columnsConfiguration} show={showGridConfiguration}
            toggleColumnVisibility={this.setToggleColumnVisibility} toggleColumnLock={this.setToggleColumnLock}
            handleResetGridConfiguration={this.setResetReorderedColumns} showResetGridConfiguration={showResetButton} />
          <PersistGridConfiguration gridId={ELEMENTS_GRID} configuration={persistConfiguration} persist={persistGridConfiguration} retrieve={retrieveGridConfiguration}
            updateCachedConfiguration={updateCachedGridConfiguration} />
          <ElementsListBulkEditSidebar />
          <ElementsListFiltersSidebar />
        </PageBody>
        <CreateNonMOSTElementModal />
        <CreateMOSTElementModal />
        <CreateExportRequestModal title="Export Elements" onExportRequestCreated={this.handleExport} />
        <DeleteSelectedElementsModal />
        <ColumnReorderConfirmModal show={showColumnReorderConfirmModal} column={reorderedColumnDetail} onConfirm={this.handleConfirmColumnReorder} onCancel={cancelColumnReorder} processing={false} />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const industrySourcesSelector = makeSelectListOptionsArraySelector(INDUSTRY_TYPICAL_SOURCES);
  const canEditSelector = makeCurrentUserHasPermissionSelector(ELEMENTS_EDIT);
  return {
    loading: loadingSelector(state),
    sort: sortSelector(state),
    data: dataSelector(state),
    pageOfElements: tableDataSelector(state),
    filter: filterSelector(state),
    showIndustryElementsList: showIndustryElementsSelector(state),
    showGridConfiguration: showGridConfigurationSelector(state),
    columns: columnsSelector(state),
    timeFormat: timeFormatSelector(state),
    bulkEditSidebarShown: bulkEditOpenSelector(state),
    selectedElements: selectedElementsSelector(state),
    industrySources: industrySourcesSelector(state),
    columnsConfiguration: columnsConfigurationSelector(state),
    skip: skipSelector(state),
    take: takeSelector(state),
    totalElements: totalElementsSelector(state),
    canEdit: canEditSelector(state),
    hideClearFiltersButton: hideClearFiltersButtonSelector(state),
    hideClearSortsButton: hideClearSortsButtonSelector(state),
    showResetButton: showResetButtonSelector(state),
    showHiddenButton: showHiddenButtonSelector(state),
    showLockButton: showLockButtonSelector(state),
    hiddenColumns: hiddenColumnsSelector(state),
    showColumnReorderConfirmModal: showColumnReorderConfirmModalSelector(state),
    reorderedColumnDetail: reorderedColumnDetailSelector(state),
    lastReorderedColumnModel: lastReorderedColumnModelSelector(state),
    persistConfiguration: persistConfigurationSelector(state),
    cachedGridConfig: cachedGridConfigurationSelector(state),
    isElementsLoaded: isElementsLoadedSelector(state),
    shouldLoadElementsColumns: shouldLoadElementsColumnsSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleToggleFiltersSidebar: toggleElementsListFiltersSidebar,
    loadElementsList,
    selectAllElements,
    showCreateMOSTElement,
    showCreateNonMOSTElement,
    sortElementsList,
    toggleElementsColumnVisibility,
    filterElementsList,
    toggleIndustryElementsList,
    toggleElementsListBulkEditSidebar,
    toggleGridConfigurationSidebar: toggleElementsGridConfigurationSidebar,
    selectElement,
    toggleSelectElements,
    pageElementsList,
    clearElementsListFilters,
    clearElementsListSorts,
    toggleElementsColumnLock,
    resetElementsColumns,
    reorderElementsColumn,
    loadElementsColumns,
    resetLockedElementsColumns,
    showHiddenElementsColumns,
    cancelColumnReorder,
    persistGridConfiguration,
    retrieveGridConfiguration,
    updateCachedGridConfiguration,
  }
)(ElementsListPage));
