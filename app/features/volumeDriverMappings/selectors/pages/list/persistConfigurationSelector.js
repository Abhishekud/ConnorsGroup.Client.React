import {createSelector} from 'reselect';
import filterSelector from './filterSelector';
import sortSelector from './sortSelector';
import columnOrderSelector from './columnOrderSelector';
import hiddenColumnsSelector from './hiddenColumnsSelector';
import lockedColumnsSelector from './lockedColumnsSelector';
import selectedDepartmentIdSelector from './selectedDepartmentIdSelector';
import cachedGridConfigurationSelector from './cachedGridConfigurationSelector';
import isVolumeDriverMappingsLoadedSelector from './isVolumeDriverMappingsLoadedSelector';
import saveCachedGridConfigurationSelector from './saveCachedGridConfigurationSelector';

function updateColumnsConfiguration(selectedDepartmentId, cachedGridConfiguration, columnConfiguration) {
  const retrievedColumns = (cachedGridConfiguration && Object.keys(cachedGridConfiguration).length) ? cachedGridConfiguration.toJS() : {};
  const {department} = retrievedColumns;

  if (!Array.isArray(department)) {
    const tempData = {department: []};
    tempData.department.push(columnConfiguration);
    return tempData;
  }

  const index = department?.findIndex((col => col.id === selectedDepartmentId));
  if (index > -1) {
    retrievedColumns.department[index] = columnConfiguration;
  } else {
    retrievedColumns.department.push(columnConfiguration);
  }

  return retrievedColumns;
}

export default createSelector(
  columnOrderSelector,
  sortSelector,
  filterSelector,
  hiddenColumnsSelector,
  lockedColumnsSelector,
  selectedDepartmentIdSelector,
  cachedGridConfigurationSelector,
  isVolumeDriverMappingsLoadedSelector,
  saveCachedGridConfigurationSelector,
  (columnOrder, sort, filter, hiddenColumns, lockedColumns, selectedDepartmentId, cachedGridConfiguration, isVolumeDriverMappingsLoaded, saveCachedGridConfiguration) => {
    const columnConfiguration = {
      id: selectedDepartmentId,
      columns: columnOrder ? columnOrder.toJS() : columnOrder,
      sort,
      filter,
      lockedColumns: lockedColumns ? lockedColumns.toJS() : lockedColumns,
      hiddenColumns: hiddenColumns ? hiddenColumns.toJS() : hiddenColumns,
    };

    if (!isVolumeDriverMappingsLoaded || !saveCachedGridConfiguration) return cachedGridConfiguration ? cachedGridConfiguration.toJS() : {};

    return updateColumnsConfiguration(selectedDepartmentId, cachedGridConfiguration, columnConfiguration);
  }
);
