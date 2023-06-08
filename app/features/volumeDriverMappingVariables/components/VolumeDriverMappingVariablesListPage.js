/* eslint-disable no-warning-comments */
import React, {useEffect, useCallback, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import {Tooltip} from '@progress/kendo-react-tooltip';
import {
  AutoSizer,
} from 'react-virtualized';
import {
  CustomizableGrid,
} from '../../customizableGrid/components';
import {navigationGroups} from '../../shared/constants';
import {
  columnsSelector, filterSelector, hideClearFiltersButtonSelector, hideClearSortsButtonSelector, loadingSelector, pageSizeSelector, selectedDepartmentIdSelector, shouldReloadVolumeDriverMappingVariablesListSelector, skipRecordsSelector, sortSelector, takeRecordsSelector, totalRecordsSelector, volumeDriverMappingSetIdsSelector, volumeDriverMappingVariablesSelector, sortedVolumeDriverMappingSetsSelector,
} from '../selectors/pages/list';
import {
  MainContent,
  NavigationSidebar,
  Page,
  PageBody,
} from '../../layout/components';
import {Select} from '../../forms/components';
import {makeSelectListOptionsArraySelector} from '../../selectListOptions/selectors';
import {DEPARTMENTS} from '../../selectListOptions/constants/selectListTypes';
import VolumeDriverMappingVariablesPageHeaderComponent from './VolumeDriverMappingVariablesPageHeaderComponent';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {loadVolumeDriverMappingVariablesList} from '../actions/loadVolumeDriverMappingVariablesList';
import _ from 'lodash';
import {handleApiError, handleAlertResponse, handleExportRequestErrors} from '../../shared/services';
import {withRouter} from 'react-router';
import pluralize from 'pluralize';
import {departmentNameSelector} from '../../shared/selectors/components/settings';
import {loadVolumeDriverMappingSetsList} from '../../volumeDriverMappings/actions';
import {filterVolumeDriverMappingVariablesList, loadVolumeDriverMappingVariablesPage, setSkipRecords, shouldReloadVolumeDriverMappingVariablesPage, sortVolumeDriverMappingVariablesList, showCreateVolumeDriverMappingVariables, createVolumeDriverMappingVariablesExportRequestBackgroundJob} from '../actions';
import {DEBOUNCE_TIMEOUT} from '../../shared/constants/debounceTimeout';
import CreateVolumeDriverMappingVariablesModal from './CreateVolumeDriverMappingVariablesModal';
import {CreateExportRequestModal} from '../../shared/components';
import {showCreateExportRequest} from '../../shared/actions';

//todo
function handleBulkEdit() {}

function VolumeDriverMappingVariablesListPage(props) {
  const {importStatus, departments, activeBackgroundJobs, loading, handleShowCreateVolumeDriverMappingSet,
    handleShowImportVolumeDriverMappingVariables, selectedDepartmentId, volumeDriverMappingVariables, sort, filter, take, totalRecords, skip, columns
    , router, departmentName, hideClearFiltersButton, hideClearSortsButton, volumeDriverMappingSetIds, volumeDriverMappingSets,
    shouldReloadList, pageSize} = props;

  const dispatch = useDispatch();
  const [requestInProgress, setRequestInProgress] = useState(false);

  const loadPage = useCallback(async () => {
    dispatch(loadVolumeDriverMappingVariablesPage());
  });

  const loadVolumeDriverMappingSets = useCallback(async departmentId => {
    await dispatch(loadVolumeDriverMappingSetsList(departmentId))
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the available Volume Driver Mapping Sets.', 'Error'));
  });

  const loadVolumeDriverMappingVariables = async skipRecords => {
    if (requestInProgress) return;
    setRequestInProgress(true);

    const skipSize = skipRecords < skip ? Math.max(skipRecords - pageSize, 0) : skipRecords;

    await dispatch(loadVolumeDriverMappingVariablesList(selectedDepartmentId, volumeDriverMappingSetIds, skipSize, take, filter, sort))
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the available Volume Driver Mapping Variables.', 'Error'))
      .finally(() => setRequestInProgress(false));
  };

  useEffect(() => {
    (async () => {
      await loadPage();
      dispatch(loadSelectListOptions(DEPARTMENTS))
        .then(async result => {
          const departmentList = result.value.data.options;

          await loadVolumeDriverMappingSets(_.first(departmentList)?.value ?? 0);
        })
        .catch(error => handleApiError(error, router, `An error occurred while attempting to load the available ${pluralize(departmentName)}.`, 'Error'));
    })();
  }, []);

  const handleShowCreateVolumeDriverMappingVariables = useCallback(async selectedDepartmentId => {
    console.log(selectedDepartmentId);
    dispatch(showCreateVolumeDriverMappingVariables(selectedDepartmentId));
  });

  const handleExport = useCallback(exportRequestId => {
    dispatch(createVolumeDriverMappingVariablesExportRequestBackgroundJob(exportRequestId))
      .then(response => handleAlertResponse(response))
      .catch(error => handleExportRequestErrors(error, router, 'An error occurred while attempting to export Volume Driver Mapping Variables.'));
  });

  const handleShowCreateExportAllRequest = useCallback(() => {
    dispatch(showCreateExportRequest());
  });

  const reloadListDebounce = useCallback(_.debounce(() => {
    dispatch(shouldReloadVolumeDriverMappingVariablesPage());
  }, DEBOUNCE_TIMEOUT), []);

  // To get the volume driver mapping variables list based on the filters, sorts, department and skip size
  useEffect(() => {
    (async () => {
      if (!shouldReloadList) return;

      await loadPage();
      await loadVolumeDriverMappingVariables(skip);
    })();
  }, [shouldReloadList]);

  const handleSelectDepartment = useCallback(async event => {
    const departmentId = event.target.value;

    if (departmentId) {
      await loadPage();
      await loadVolumeDriverMappingSets(departmentId);
    }
  });

  const handleFilter = useCallback(({filter}) => {
    dispatch(filterVolumeDriverMappingVariablesList(filter)).then(() => reloadListDebounce());
  });

  const handleSort = useCallback(({sort}) => {
    dispatch(sortVolumeDriverMappingVariablesList(sort)).then(() => reloadListDebounce());
  });

  const requestIfNeeded = skipRecords => {
    for (let i = skipRecords; i < skipRecords + pageSize - 1 && i < totalRecords; i++) {
      if (typeof volumeDriverMappingVariables[i].id === 'undefined') {
        loadVolumeDriverMappingVariables(skipRecords);
        return;
      }
    }
  };

  const handlePageChange = useCallback(event => {
    if (event.page.skip === skip) return;

    const skipRecords = isNaN(event.page.skip) ? 0 : event.page.skip;
    dispatch(setSkipRecords(skipRecords));
    requestIfNeeded(skipRecords);
  });

  const formatDataForPresentation = () => volumeDriverMappingVariables.slice(skip, skip + pageSize);

  return (
    <Page pageClassName="volumeDriverMappingVariables-list-page">
      <VolumeDriverMappingVariablesPageHeaderComponent importStatus={importStatus} departments={departments} activeBackgroundJobs={activeBackgroundJobs}
        onBulkEdit={handleBulkEdit} onShowCreateVolumeDriverMappingVariables={handleShowCreateVolumeDriverMappingVariables}
        onShowCreateVolumeDriverMappingSet={handleShowCreateVolumeDriverMappingSet}
        onShowImportVolumeDriverMappingVariables={handleShowImportVolumeDriverMappingVariables}
        selectedDepartmentId={selectedDepartmentId} hideClearFiltersButton={hideClearFiltersButton} hideClearSortsButton={hideClearSortsButton}
        handleShowCreateExportAllRequest={handleShowCreateExportAllRequest} />
      <PageBody>
        <NavigationSidebar selectedNavigationGroup={navigationGroups.VOLUME_DRIVERS} />
        <MainContent loading={loading}>
          <div className="volume-driver-mapping-variables-grid-header-section">
            <div>
              <Select
                id="departmentId"
                formGroupClassName="departments-selector"
                onChange={handleSelectDepartment}
                value={selectedDepartmentId}
                options={departments} />
            </div>
          </div>
          <AutoSizer>
            {({width, height}) => (
              <Tooltip openDelay={100} position="top" anchorElement="target">
                <CustomizableGrid
                  noFromJs
                  data={formatDataForPresentation()}
                  style={{width, height: height - 50}}
                  sort={sort}
                  onSort={handleSort}
                  filter={filter}
                  onFilter={handleFilter}
                  take={pageSize}
                  total={totalRecords}
                  skip={skip}
                  columns={columns}
                  onPageChange={handlePageChange}
                  selectedField="selected" />
              </Tooltip>
            )}
          </AutoSizer>
        </MainContent>
        <CreateVolumeDriverMappingVariablesModal volumeDriverMappingSets={volumeDriverMappingSets}
          reloadVolumeDriverMappingVariables={reloadListDebounce} selectedDepartmentId={selectedDepartmentId} />
        <CreateExportRequestModal title="Export Volume Driver Mapping Variables" onExportRequestCreated={handleExport} />
      </PageBody>
    </Page>
  );
}

function mapStateToProps(state) {
  const departmentsSelector = makeSelectListOptionsArraySelector(DEPARTMENTS);

  return {
    loading: loadingSelector(state),
    departments: departmentsSelector(state),
    selectedDepartmentId: selectedDepartmentIdSelector(state),
    columns: columnsSelector(state),
    volumeDriverMappingVariables: volumeDriverMappingVariablesSelector(state),
    departmentName: departmentNameSelector(state),
    filter: filterSelector(state),
    sort: sortSelector(state),
    totalRecords: totalRecordsSelector(state),
    take: takeRecordsSelector(state),
    skip: skipRecordsSelector(state),
    hideClearFiltersButton: hideClearFiltersButtonSelector(state),
    hideClearSortsButton: hideClearSortsButtonSelector(state),
    volumeDriverMappingSetIds: volumeDriverMappingSetIdsSelector(state),
    shouldReloadList: shouldReloadVolumeDriverMappingVariablesListSelector(state),
    pageSize: pageSizeSelector(state),
    volumeDriverMappingSets: sortedVolumeDriverMappingSetsSelector(state),
  };
}

export default withRouter(connect(mapStateToProps,
  {showCreateExportRequest,
    createVolumeDriverMappingVariablesExportRequestBackgroundJob})(VolumeDriverMappingVariablesListPage));
