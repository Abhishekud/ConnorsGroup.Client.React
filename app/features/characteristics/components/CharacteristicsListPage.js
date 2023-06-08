import autoBind from 'react-autobind';
import pluralize from 'pluralize';
import {connect} from 'react-redux';
import {AutoSizer} from 'react-virtualized';
import {CustomizableGrid, GridConfiguration, GridConfigurationButton, ClearFiltersButton, ClearSortsButton, MultiSectionSidebar, ResetLockedColumnsButton, ClearHiddenColumnsButton, PersistGridConfiguration} from '../../customizableGrid/components';
import {Tooltip} from '@progress/kendo-react-tooltip';
import {withRouter} from 'react-router';
import {Dropdown, MenuItem, Button} from 'react-bootstrap';
import {fromJS, Map} from 'immutable';
import _ from 'lodash';
import React, {Component} from 'react';
import {Select} from '../../forms/components';
import {layout, navigationGroups, exportResponseText} from '../../shared/constants';
import {PAGE_SIZE} from '../../shared/constants/virtualPaging';
import {addNewCharacteristicSetToCharacteristics, mergeCharacteristicsListData} from '../services';
import {DEBOUNCE_TIMEOUT} from '../../shared/constants/debounceTimeout';
import {handleApiError, toastr, modelsArrayToMapById, toggleLockReorderColumns, toggleVisibilityReorderColumns, getReorderedGridColumnDetails, exportDownloader} from '../../shared/services';
import {departmentNameSelector} from '../../shared/selectors/components/settings';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {CHARACTERISTICS_EDIT, CHARACTERISTICS_EXPORT} from '../../authentication/constants/permissions';
import {DEPARTMENTS} from '../../selectListOptions/constants/selectListTypes';
import {
  loadCharacteristicsList,
  loadCharacteristicsPage,
  toggleCharacteristicGridConfigurationSidebar,
  showCreateCharacteristic,
  selectCharacteristic,
  selectBulkEditCharacteristic,
  clearSelectedCharacteristic,
  toggleCharacteristicSetsSidebar,
  showCreateCharacteristicSet,
  showImportCharacteristics,
  toggleCharacteristicsColumnsVisibility,
  pageCharacteristicsList,
  REORDER_CHARACTERISTICS_COLUMN,
  reorderCharacteristicsColumn,
  loadCharacteristicSetsList,
  loadCharacteristicDetails,
  closeCharacteristicsListEditSidebar,
  createCharacteristicsExportRequestBackgroundJob,
  toggleCharacteristicConfigureColumnVisibility,
  loadCharacteristicsColumns,
  toggleCharacteristicsColumnLock,
  resetLockedCharacteristicsColumns,
  resetCharacteristicsColumns,
  showHiddenCharacteristicsColumns,
  cancelColumnReorder,
  clearCharacteristicsListFilters,
  clearCharacteristicsListSorts,
  filterCharacteristicsList,
  sortCharacteristicsList,
  setAllCharacteristicsSelected,
} from '../actions';
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
  columnsConfigurationSelector,
  allCharacteristicsSelectedSelector,
  loadingSelector,
  sortedCharacteristicSetsSelector,
  selectedCharacteristicIdSelector,
  selectedDepartmentIdSelector,
  columnsSelector,
  showGridConfigurationSelector,
  activeBackgroundJobsSelector,
  activeBulkEditBackgroundJobSelector,
  visibleCharacteristicSetsColumnsSelector,
  showResetButtonSelector,
  hiddenColumnsSelector,
  showHiddenButtonSelector,
  showLockButtonSelector,
  showColumnReorderConfirmModalSelector,
  reorderedColumnDetailSelector,
  lastReorderedColumnModelSelector,
  isCharacteristicsLoadedSelector,
  cachedGridConfigurationSelector,
  persistConfigurationSelector,
  filterSelector,
  sortSelector,
  hideClearFiltersButtonSelector,
  hideClearSortsButtonSelector,
  savingSelector,
  shouldReloadCharacteristicListSelector,
} from '../selectors/pages/list';
import CharacteristicsListFiltersSidebar from './CharacteristicsListFiltersSidebar';
import CharacteristicsListEditSidebar from './CharacteristicsListEditSidebar';
import CreateCharacteristicModal from './CreateCharacteristicModal';
import CreateCharacteristicSetModal from './CreateCharacteristicSetModal';
import CharacteristicSetsSidebar from './CharacteristicSetsSidebar';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import ImportCharacteristicsModal from './ImportCharacteristicsModal';
import ImportCharacteristicsValidationErrorsModal from './ImportCharacteristicsValidationErrorsModal';
import CharacteristicsColumnConfiguration from './CharacteristicsColumnConfiguration';
import {ColumnReorderConfirmModal, CreateExportRequestModal} from '../../shared/components';
import {showCreateExportRequest, pollBackgroundJobs} from '../../shared/actions';
import {makeSelectListOptionsArraySelector} from '../../selectListOptions/selectors';
import {
  appliedCountSelector as appliedFiltersCountSelector,
  showSelector as showFiltersSelector,
  modelSelector as characteristicsFiltersSelector,
} from '../selectors/sidebars/filters';
import {
  showSelector as showSetsSelector,
} from '../selectors/sidebars/sets';
import {
  showSelector as showSidebarSelector,
} from '../selectors/sidebars/edit';
import {BulkEditButton} from '../../shared/components/buttons';

import {POLL_INTERVAL, CHARACTERISTICS_EXPORTER, BULK_UPDATE_CHARACTERISTICS, CHARACTERISTICS_IMPORTER} from '../../shared/constants/backgroundJobs';
import {ALLOWED_MAX_COLUMN_LOCKS} from '../../customizableGrid/constants/columnConfigurations';
import {persistGridConfiguration, retrieveGridConfiguration, updateCachedGridConfiguration} from '../../customizableGrid/actions';
import {
  CHARACTERISTICS as CHARACTERISTICS,
} from '../../customizableGrid/constants/grids';

class CharacteristicsListPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      skip: 0,
      characteristics: [],
      total: 0,
      selectedCharacteristics: new Map(),
      currentTabIndex: 1,
    };

    this.reloadListDebounce = _.debounce(() => {
      this.reloadCharacteristics();
    }, DEBOUNCE_TIMEOUT);
    // The api response returns 50 records in each call, for virtual scrolling to work correctly we need to call api before we reach 50 records
    // and have few records on the grid before we reach the end of page.
    this.pageSize = PAGE_SIZE / 2;
    autoBind(this);
  }

  componentDidMount() {
    const {
      departmentName, loadCharacteristicsPage, loadSelectListOptions, router,
      loadCharacteristicSetsList, location} = this.props;
    if (location.query.return) {
      this.requestData(0);
      return;
    }
    loadCharacteristicsPage();

    loadSelectListOptions(DEPARTMENTS)
      .then(() => {
        const {departments} = this.props;
        const departmentId = departments.length ? departments[0].value : 0;
        loadCharacteristicSetsList(departmentId).then(() => this.requestData(0));

      })
      .catch(error => handleApiError(error, router, `An error occurred while attempting to load the available ${pluralize(departmentName)}.`, 'Error'));

    this.pollTimer = setInterval(this.checkBackgroundJobs, POLL_INTERVAL);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.columns.size !== this.props.columns.size || prevProps.saving !== this.props.saving ||
      prevProps.isCharacteristicsLoaded !== this.props.isCharacteristicsLoaded ||
      prevProps.cachedGridConfig?.size !== this.props.cachedGridConfig?.size) {
      this.props.loadCharacteristicsColumns(this.props.columns);
    }
  }

  componentWillUnmount() {
    clearInterval(this.pollTimer);
    this.pollTimer = null;
  }

  checkBackgroundJobs() {
    const {pollBackgroundJobs} = this.props;

    pollBackgroundJobs([CHARACTERISTICS_EXPORTER, BULK_UPDATE_CHARACTERISTICS, CHARACTERISTICS_IMPORTER]);
  }

  requestIfNeeded(skip) {
    const {characteristics} = this.state;
    for (let i = skip; i < skip + this.pageSize - 1 && i < characteristics.length; i++) {
      if (typeof characteristics[i].id === 'undefined') {
        this.requestData(skip);
        return;
      }
    }
  }
  async reloadCharacteristics() {
    const {closeCharacteristicsListEditSidebar, setAllCharacteristicsSelected} = this.props;
    this.setState({
      characteristics: [],
      total: 0,
      skip: 0,
      selectedCharacteristics: new Map(),
    });
    closeCharacteristicsListEditSidebar();
    setAllCharacteristicsSelected(false);
    await this.requestData(0);
  }


  async requestData(skipParameter) {
    if (this.requestInProgress) return;
    this.requestInProgress = true;
    const skip = Math.max(skipParameter - this.pageSize, 0);
    const {router, loadCharacteristicsList, departments, selectedDepartmentId, visibleCharacteristicSetsColumns, filter, sort} = this.props;
    let departmentId = selectedDepartmentId;
    if (!departmentId) departmentId = departments.length ? departments[0].value : 0;
    const characteristicSetIds = visibleCharacteristicSetsColumns.map(a => a.get('id'));
    loadCharacteristicsList(skip, filter, sort, departmentId, characteristicSetIds.toJS())
      .then(result => {
        const {total, characteristics, characteristicsSetSpecifiedValues} = result.value.data;
        const characteristicsData = skipParameter === 0
          ? new Array(total).fill().map((e, i) => ({index: i}))
          : this.state.characteristics;
        const mergedCharacteristicsData = mergeCharacteristicsListData(characteristics, characteristicsSetSpecifiedValues, characteristicsData, skip);
        this.setState({
          characteristics: mergedCharacteristicsData,
          total,
        });
        this.requestIfNeeded(skip);
      })
      .catch(error => {
        handleApiError(error, router, 'An error occurred while attempting to load the Characteristics list.', 'error');
      })
      .finally(() => {
        this.requestInProgress = false;
        if (this.props.shouldReloadCharacteristicList) this.requestData(0);
      });
  }

  handleRowClick({dataItem, nativeEvent}) {
    if (!dataItem.id) return;
    const {columnsConfiguration} = this.props;
    const columnIndex = nativeEvent.srcElement.cellIndex;
    const columnClickTarget = columnsConfiguration.getIn([columnIndex, 'title']);
    const {selectedCharacteristicId, selectCharacteristic, clearSelectedCharacteristic, loadCharacteristicDetails} = this.props;
    const {selectedCharacteristics} = this.state;
    if (selectedCharacteristics.size <= 0) {
      if (dataItem.id === selectedCharacteristicId) clearSelectedCharacteristic();
      else {
        loadCharacteristicDetails(dataItem.id).then(() =>
          selectCharacteristic(fromJS(dataItem), dataItem.id, columnClickTarget)
        );
      }
    }
  }

  clearSelectedCharacteristic() {
    this.props.clearSelectedCharacteristic();
    this.setState({selectedCharacteristics: new Map()});
  }

  handleBulkEdit({dataItem}) {
    const {selectBulkEditCharacteristic} = this.props;
    const {characteristics, selectedCharacteristics} = this.state;
    const actualCharacteristics = characteristics.filter(r => r.id);
    if (dataItem) {
      this.clearSelectedCharacteristic();
    } else {
      const selectedCharacteristicsList = characteristics.filter(c => selectedCharacteristics.has(c.id));
      const selectedCharacteristicsKey = Object.keys(selectedCharacteristics.toJS());
      selectBulkEditCharacteristic(selectedCharacteristicsList, selectedCharacteristicsKey, actualCharacteristics);

    }
  }

  handlePageChange(event) {
    if (event.page.skip === this.state.skip) return;
    // somehow kendo will pass NaN after sorting changes.  :/
    const skip = isNaN(event.page.skip) ? 0 : event.page.skip;
    this.requestIfNeeded(skip);
    this.setState({skip});
  }

  handleShowCreateExportAllRequest() {
    const {showCreateExportRequest, characteristicsFilters} = this.props;
    showCreateExportRequest({...characteristicsFilters.toJSON()});
  }

  handleExport(exportRequestId) {
    const {createCharacteristicsExportRequestBackgroundJob, router} = this.props;
    createCharacteristicsExportRequestBackgroundJob(exportRequestId)
      .then(response => {
        if (response.value.data.backgroundedJob) {
          toastr.success(exportResponseText.SUCCESS, exportResponseText.SUCCESS_TITLE);
        } else {
          toastr.error(exportResponseText.FAILURE);
        }
      })
      .catch(error => {
        let errorMessage = 'An error occurred while attempting to export Characteristics.';
        if (error.response.status === 500) {
          errorMessage = error.response.data.exceptionMessage;
        }
        handleApiError(error, router, errorMessage, 'Error');
      });
  }

  handleExportAllImportTemplate() {
    exportDownloader(`${process.env.API_BASE_URL}characteristics/import/template`);
  }

  handleToggleSelect({dataItem}) {
    if (!this.props.allCharacteristicsSelected) {
      const {id} = dataItem;
      const {selectedCharacteristics, characteristics} = this.state;

      const selectedCharacteristicsAfterSelect = selectedCharacteristics.has(id) ? selectedCharacteristics.deleteIn([id]) : selectedCharacteristics.setIn([id], fromJS(characteristics.filter(r => r.id === id)[0]));

      this.setState({selectedCharacteristics: selectedCharacteristicsAfterSelect});
    }
  }

  handleSelectAll() {
    const {allCharacteristicsSelected, setAllCharacteristicsSelected} = this.props;
    const invertedAllCharacteristicsSelected = !allCharacteristicsSelected;
    const selectedCharacteristics = invertedAllCharacteristicsSelected ? this.state.characteristics.filter(r => r.id) : Map();
    this.setState({
      selectedCharacteristics: modelsArrayToMapById(selectedCharacteristics),
    });
    setAllCharacteristicsSelected(invertedAllCharacteristicsSelected);
  }

  handleSelectDepartment(event) {
    const departmentId = event.target.value;
    this.setState({
      characteristics: [],
      total: 0,
      skip: 0,
    });
    const {loadCharacteristicSetsList} = this.props;
    loadCharacteristicSetsList(departmentId).then(() => this.reloadCharacteristics());
  }

  handleSort({sort}) {
    this.props.sortCharacteristicsList(sort).then(() => this.reloadListDebounce());
  }

  handleFilter({filter}) {
    this.props.filterCharacteristicsList(filter).then(() => this.reloadListDebounce());
  }

  handleClearFilters() {
    this.props.clearCharacteristicsListFilters().then(() => this.reloadListDebounce());
  }

  handleClearSorts() {
    this.props.clearCharacteristicsListSorts().then(() => this.reloadListDebounce());
  }

  formatCharacteristicsDataForPresentation() {
    const {characteristics, skip, selectedCharacteristics} = this.state;
    return characteristics.slice(skip, skip + PAGE_SIZE).map(c => {
      c.selected = selectedCharacteristics.has(c.id) || this.props.allCharacteristicsSelected;
      return c;
    });
  }
  handleCreateCharacteristicSet(newCharacteristicSetValues) {
    const {
      characteristics,
    } = this.state;

    const characteristicValuesByCharacteristicId = modelsArrayToMapById(
      newCharacteristicSetValues.characteristicValues,
      'characteristicId'
    );
    characteristics.forEach((characteristic, index) => {
      if (typeof characteristic.id !== 'undefined') {
        characteristics[index] = addNewCharacteristicSetToCharacteristics(
          characteristic,
          characteristicValuesByCharacteristicId
        );
      }
    }
    );
    this.setState({
      characteristics,
    });
  }

  setToggleCharacteristicsColumnsVisibility(field, visibility) {
    const {toggleCharacteristicsColumnsVisibility, columns, hiddenColumns} = this.props;
    const {selectedColumn, columnsList} = toggleVisibilityReorderColumns(field, visibility, columns, hiddenColumns);
    toggleCharacteristicsColumnsVisibility(field, visibility, columnsList, selectedColumn).then(() => this.reloadCharacteristics());
  }

  setToggleColumnLock(field, lock) {
    const {columns, toggleCharacteristicsColumnLock} = this.props;
    const lockColumnsList = toggleLockReorderColumns(field, lock, columns);
    toggleCharacteristicsColumnLock(field, lock, lockColumnsList);
  }

  setToggleConfigureColumnVisibility(field, visibility) {
    const {toggleCharacteristicConfigureColumnVisibility} = this.props;
    toggleCharacteristicConfigureColumnVisibility(field, visibility).then(() => this.reloadCharacteristics());
  }

  handleResetLockedGridColumns() {
    const {loadCharacteristicsColumns, resetLockedCharacteristicsColumns} = this.props;
    resetLockedCharacteristicsColumns().then(() => loadCharacteristicsColumns(this.props.columns));
  }

  handleReorderColumns(event) {
    const {columns, reorderCharacteristicsColumn} = this.props;
    const newEvent = event;
    const isNotDefault = event.target.dragLogic.columns.find(c => c.title === event.target.dragLogic.dragElementClue.state.innerText);
    if (!isNotDefault) {
      newEvent.target.dragLogic.dragElementClue.state.innerText = newEvent.target.dragLogic.dragElementClue.state.innerText.replace(' (default)', '');
    }
    const reorderedColumnDetail = getReorderedGridColumnDetails(newEvent, columns);
    if (!reorderedColumnDetail) return;
    const {columnKey, oldIndex, newIndex} = reorderedColumnDetail;
    reorderCharacteristicsColumn(columnKey, oldIndex, newIndex);
  }

  handleShowHiddenCharacteristicsColumns() {
    const {loadCharacteristicsColumns, showHiddenCharacteristicsColumns} = this.props;
    showHiddenCharacteristicsColumns().then(() => loadCharacteristicsColumns(this.props.columns));
  }

  setResetCharacteristicsColumns() {
    const {loadCharacteristicsColumns, resetCharacteristicsColumns} = this.props;
    resetCharacteristicsColumns().then(() => loadCharacteristicsColumns(this.props.columns));
  }

  changeTab(tabIndex) {
    this.setState({currentTabIndex: this.state.currentTabIndex === tabIndex ? 0 : tabIndex});
  }

  handleConfirmColumnReorder() {
    const {reorderCharacteristicsColumn, lastReorderedColumnModel} = this.props;
    reorderCharacteristicsColumn(lastReorderedColumnModel.columnKey, lastReorderedColumnModel.oldIndex, lastReorderedColumnModel.newIndex);
  }

  reloadCharacteristicSetsAndList() {
    const {loadCharacteristicSetsList, selectedDepartmentId} = this.props;
    loadCharacteristicSetsList(selectedDepartmentId).then(() => this.requestData(0));
  }

  render() {

    const {
      characteristicSets,
      showSets,
      showSidebar,
      handleToggleSetsSidebar,
      handleShowCreateCharacteristic,
      handleShowCreateCharacteristicSet,
      handleShowImportCharacteristics,
      departments,
      columnsConfiguration,
      columns,
      showGridConfiguration,
      canEdit,
      canExport,
      selectedDepartmentId,
      activeBackgroundJobs,
      activeBulkEditBackgroundJob,
      visibleCharacteristicSetsColumns,
      loadCharacteristicDetails,
      showResetButton,
      showHiddenButton,
      showLockButton,
      toggleGridConfigurationSidebar,
      cancelColumnReorder,
      reorderedColumnDetail,
      showColumnReorderConfirmModal,
      persistConfiguration,
      persistGridConfiguration,
      retrieveGridConfiguration,
      updateCachedGridConfiguration,
      filter,
      sort,
      hideClearFiltersButton,
      hideClearSortsButton,
      loading,
      allCharacteristicsSelected,
    } = this.props;
    const show = Boolean(showSidebar || showSets);

    const {
      skip,
      total,
      selectedCharacteristics,
      currentTabIndex,
    } = this.state;
    const disableExportActions = departments.length === 0 || activeBackgroundJobs;
    const exportStatus = activeBackgroundJobs ? <i className="fa fa-spinner fa-spin"
      title={activeBackgroundJobs && activeBulkEditBackgroundJob ? 'Bulk Update in progress' : 'Export in progress'} /> : <i className="fa fa-file-excel-o" />;
    const showBulkEdit = selectedCharacteristics.size > 0 || allCharacteristicsSelected;
    return (
      <Page pageClassName="characteristics-list-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Characteristics</PageTitle>
          <PageHeaderActions>
            <ClearFiltersButton hide={hideClearFiltersButton} onClear={this.handleClearFilters} />
            <ClearSortsButton hide={hideClearSortsButton} onClear={this.handleClearSorts} />
            <ResetLockedColumnsButton hide={showLockButton} onClear={this.handleResetLockedGridColumns} />
            <ClearHiddenColumnsButton hide={showHiddenButton} onClear={this.handleShowHiddenCharacteristicsColumns} />
            {canEdit && <BulkEditButton isVisible={showBulkEdit} isOpen={showSidebar} onClick={this.handleBulkEdit}
              disabled={activeBackgroundJobs && activeBulkEditBackgroundJob} />}

            {(canEdit || canExport) && (
              <Dropdown id="export" className="header-button" pullRight disabled={disableExportActions}>
                <Dropdown.Toggle noCaret>{exportStatus}</Dropdown.Toggle>
                <Dropdown.Menu>
                  {canExport && (
                    <MenuItem eventKey="1" onClick={this.handleShowCreateExportAllRequest}>
                      Export All Characteristics (.xlsx)
                    </MenuItem>
                  )}

                  {canEdit && (
                    <MenuItem eventKey="2" onClick={this.handleExportAllImportTemplate}>
                      Download All Characteristics Import Template (.xlsx)
                    </MenuItem>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            )}

            {canEdit && (
              <Dropdown id="characteristics-list-actions" className="header-button" pullRight disabled={!selectedDepartmentId}>
                <Dropdown.Toggle noCaret><i className="fa fa-plus" /></Dropdown.Toggle>
                <Dropdown.Menu>
                  <MenuItem eventKey="1" onClick={handleShowCreateCharacteristic}>
                    New Characteristic
                  </MenuItem>
                  <MenuItem eventKey="2" onClick={handleShowCreateCharacteristicSet}>
                    New Characteristic Set
                  </MenuItem>
                  <MenuItem eventKey="3" onClick={handleShowImportCharacteristics}>
                    Import Characteristics  (.xlsx)
                  </MenuItem>
                </Dropdown.Menu>
              </Dropdown>
            )}

            <div className="flyout-button">
              <Button className={showSets ? 'btn-wheat' : 'btn-default'} onClick={handleToggleSetsSidebar}>
                <i className="fa fa-list-ul" />
              </Button>
            </div>
            <GridConfigurationButton openSidebar={toggleGridConfigurationSidebar} closeSidebar={toggleGridConfigurationSidebar} showGridConfiguration={showGridConfiguration} />
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.STANDARDS} />
          <MainContent loading={loading}>
            <div className="characteristics-grid-header-section">
              <div>
                <Select
                  id="departmentId"
                  formGroupClassName="departments-selector"
                  onChange={this.handleSelectDepartment}
                  value={selectedDepartmentId}
                  options={departments} />
              </div>
              { characteristicSets.size !== visibleCharacteristicSetsColumns.size && <div className="column-warning">
                <h5 >{visibleCharacteristicSetsColumns.size} of {characteristicSets.size} characteristic sets columns are visible</h5>
              </div>}
            </div>
            {this.setToggleColumnLock && !columns.first().get('lockable') &&
              <div className="column-lock-warning">
                <span className="text-danger">Note: Maximum {ALLOWED_MAX_COLUMN_LOCKS} columns can be locked</span>
              </div>}
            <AutoSizer>
              {({width, height}) => (
                <Tooltip openDelay={100} position="top" anchorElement="target">
                  <CustomizableGrid
                    noFromJs
                    data={this.formatCharacteristicsDataForPresentation()}
                    style={{width: width + (show * layout.SIDEBAR_WIDTH), height: height - 50}}
                    sort={sort}
                    onSort={this.handleSort}
                    filter={filter}
                    onFilter={this.handleFilter}
                    selectedField={canEdit ? 'selected' : null}
                    onRowClick={this.handleRowClick}
                    onPageChange={this.handlePageChange}
                    onSelectedChange={canEdit ? this.handleToggleSelect : null}
                    onHeaderSelectedChange={canEdit ? this.handleSelectAll : null}
                    take={this.pageSize}
                    total={total} skip={skip}
                    dataItemKey={'name'}
                    toggleColumnLock={this.setToggleColumnLock}
                    toggleColumnVisibility={this.setToggleCharacteristicsColumnsVisibility}
                    onColumnReorder={this.handleReorderColumns}
                    columns={columns}
                    showColumnContextMenu reorderable />
                </Tooltip>
              )}
            </AutoSizer>
          </MainContent>
          <CharacteristicsListEditSidebar reloadCharacteristics={this.reloadCharacteristics} selectedCharacteristics={selectedCharacteristics}
            filtersModel={filter} departmentId={selectedDepartmentId} allCharacteristicsSelected={allCharacteristicsSelected} />
          <CharacteristicsListFiltersSidebar />
          <CharacteristicSetsSidebar reloadCharacteristics={this.reloadCharacteristics} />
          <CreateCharacteristicModal characteristicSets={characteristicSets} reloadCharacteristics={this.reloadCharacteristics} loadCharacteristicDetails={loadCharacteristicDetails} />
          <CreateCharacteristicSetModal characteristicSets={characteristicSets} onCreateCharacteristicSet={this.handleCreateCharacteristicSet} />
          <CreateExportRequestModal title="Export Characteristics" onExportRequestCreated={this.handleExport} />
          <ImportCharacteristicsModal reloadCharacteristics={this.reloadCharacteristicSetsAndList} />
          <ImportCharacteristicsValidationErrorsModal />
          <MultiSectionSidebar show={showGridConfiguration}>
            <GridConfiguration dropActionId={REORDER_CHARACTERISTICS_COLUMN} columns={columnsConfiguration} show={showGridConfiguration}
              toggleColumnVisibility={this.setToggleCharacteristicsColumnsVisibility} collapsible
              changeTab={this.changeTab} showTab={currentTabIndex} tabIndex={1}
              toggleColumnLock={this.setToggleColumnLock} handleResetGridConfiguration={this.setResetCharacteristicsColumns} showResetGridConfiguration={showResetButton} />
            <CharacteristicsColumnConfiguration characteristicSetcolumns={characteristicSets} visibleCharacteristicSetsColumns={visibleCharacteristicSetsColumns}
              show={showGridConfiguration} toggleConfigureColumnVisibility={this.setToggleConfigureColumnVisibility} disabled={loading}
              changeTab={this.changeTab} showTab={currentTabIndex} tabIndex={2} />
          </MultiSectionSidebar>
          <ColumnReorderConfirmModal show={showColumnReorderConfirmModal} column={reorderedColumnDetail} onConfirm={this.handleConfirmColumnReorder} onCancel={cancelColumnReorder} processing={false} />
          <PersistGridConfiguration gridId={CHARACTERISTICS} configuration={persistConfiguration} persist={persistGridConfiguration} retrieve={retrieveGridConfiguration}
            updateCachedConfiguration={updateCachedGridConfiguration} />
        </PageBody>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const departmentsSelector = makeSelectListOptionsArraySelector(DEPARTMENTS);
  const canEditSelector = makeCurrentUserHasPermissionSelector(CHARACTERISTICS_EDIT);
  const canExportSelector = makeCurrentUserHasPermissionSelector(CHARACTERISTICS_EXPORT);

  return {
    loading: loadingSelector(state),
    allCharacteristicsSelected: allCharacteristicsSelectedSelector(state),
    characteristicSets: sortedCharacteristicSetsSelector(state),
    departments: departmentsSelector(state),
    selectedCharacteristicId: selectedCharacteristicIdSelector(state),
    selectedDepartmentId: selectedDepartmentIdSelector(state),
    appliedFiltersCount: appliedFiltersCountSelector(state),
    showFilters: showFiltersSelector(state),
    showSets: showSetsSelector(state),
    showSidebar: showSidebarSelector(state),
    departmentName: departmentNameSelector(state),
    characteristicsFilters: characteristicsFiltersSelector(state),
    columnsConfiguration: columnsConfigurationSelector(state),
    columns: columnsSelector(state),
    showGridConfiguration: showGridConfigurationSelector(state),
    canEdit: canEditSelector(state),
    canExport: canExportSelector(state),
    activeBackgroundJobs: activeBackgroundJobsSelector(state),
    activeBulkEditBackgroundJob: activeBulkEditBackgroundJobSelector(state),
    visibleCharacteristicSetsColumns: visibleCharacteristicSetsColumnsSelector(state),
    showResetButton: showResetButtonSelector(state),
    showHiddenButton: showHiddenButtonSelector(state),
    hiddenColumns: hiddenColumnsSelector(state),
    showLockButton: showLockButtonSelector(state),
    showColumnReorderConfirmModal: showColumnReorderConfirmModalSelector(state),
    reorderedColumnDetail: reorderedColumnDetailSelector(state),
    lastReorderedColumnModel: lastReorderedColumnModelSelector(state),
    persistConfiguration: persistConfigurationSelector(state),
    cachedGridConfig: cachedGridConfigurationSelector(state),
    isCharacteristicsLoaded: isCharacteristicsLoadedSelector(state),
    filter: filterSelector(state),
    sort: sortSelector(state),
    hideClearFiltersButton: hideClearFiltersButtonSelector(state),
    hideClearSortsButton: hideClearSortsButtonSelector(state),
    saving: savingSelector(state),
    shouldReloadCharacteristicList: shouldReloadCharacteristicListSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    handleToggleSetsSidebar: toggleCharacteristicSetsSidebar,
    loadCharacteristicsList,
    toggleCharacteristicsColumnsVisibility,
    toggleGridConfigurationSidebar: toggleCharacteristicGridConfigurationSidebar,
    loadCharacteristicsPage,
    loadSelectListOptions,
    handleShowCreateCharacteristic: showCreateCharacteristic,
    selectCharacteristic,
    selectBulkEditCharacteristic,
    clearSelectedCharacteristic,
    handleShowCreateCharacteristicSet: showCreateCharacteristicSet,
    showCreateExportRequest,
    pageCharacteristicsList,
    handleShowImportCharacteristics: showImportCharacteristics,
    loadCharacteristicSetsList,
    loadCharacteristicDetails,
    closeCharacteristicsListEditSidebar,
    createCharacteristicsExportRequestBackgroundJob,
    pollBackgroundJobs,
    toggleCharacteristicConfigureColumnVisibility,
    loadCharacteristicsColumns,
    toggleCharacteristicsColumnLock,
    reorderCharacteristicsColumn,
    resetLockedCharacteristicsColumns,
    resetCharacteristicsColumns,
    showHiddenCharacteristicsColumns,
    cancelColumnReorder,
    persistGridConfiguration,
    retrieveGridConfiguration,
    updateCachedGridConfiguration,
    clearCharacteristicsListFilters,
    clearCharacteristicsListSorts,
    filterCharacteristicsList,
    sortCharacteristicsList,
    setAllCharacteristicsSelected,
  }
)(CharacteristicsListPage));
