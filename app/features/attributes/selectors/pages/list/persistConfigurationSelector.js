import {createSelector} from 'reselect';
import filterSelector from './filterSelector';
import sortSelector from './sortSelector';
import columnOrderSelector from './columnOrderSelector';
import hiddenColumnsSelector from './hiddenColumnsSelector';
import lockedColumnsSelector from './lockedColumnsSelector';
import selectedDepartmentIdSelector from './selectedDepartmentIdSelector';
import cachedGridConfigurationSelector from './cachedGridConfigurationSelector';
import isAttributesLoadedSelector from './isAttributesLoadedSelector';
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
  isAttributesLoadedSelector,
  saveCachedGridConfigurationSelector,
  (columnOrder, sort, filter, hiddenColumns, lockedColumns, selectedDepartmentId, cachedGridConfiguration, isAttributesLoaded, saveCachedGridConfiguration) => {
    const columnConfiguration = {
      id: selectedDepartmentId,
      columns: columnOrder ? columnOrder.toJS() : columnOrder,
      sort: sort ? sort.toJS() : sort,
      filter: filter ? filter.toJS() : filter,
      lockedColumns: lockedColumns ? lockedColumns.toJS() : lockedColumns,
      hiddenColumns: hiddenColumns ? hiddenColumns.toJS() : hiddenColumns,
    };

    if (!isAttributesLoaded || !saveCachedGridConfiguration) return cachedGridConfiguration ? cachedGridConfiguration.toJS() : {};

    return updateColumnsConfiguration(selectedDepartmentId, cachedGridConfiguration, columnConfiguration);
  }
);
