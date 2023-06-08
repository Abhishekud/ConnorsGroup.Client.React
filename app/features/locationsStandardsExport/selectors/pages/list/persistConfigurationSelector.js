import {createSelector} from 'reselect';
import columnOrderSelector from './columnOrderSelector';
import hiddenColumnsSelector from './hiddenColumnsSelector';
import lockedColumnsSelector from './lockedColumnsSelector';
import filterSelector from './filterSelector';
import cachedGridConfigurationSelector from './cachedGridConfigurationSelector';
import isLocationsStandardsExportLoadedSelector from './isLocationsStandardsExportLoadedSelector';
import saveCachedGridConfigurationSelector from './saveCachedGridConfigurationSelector';
import dataSourceSelector from './dataSourceSelector';

function updateColumnsConfiguration(selectedDataSource, cachedGridConfiguration, columnConfiguration) {
  const retrievedColumns = (cachedGridConfiguration && Object.keys(cachedGridConfiguration).length) ? cachedGridConfiguration.toJS() : {};
  const {dataSource} = retrievedColumns;
  if (!Array.isArray(dataSource)) {
    const tempData = {dataSource: []};
    tempData.dataSource.push(columnConfiguration);
    return tempData;
  }

  const index = dataSource?.findIndex((col => col.dataSource === selectedDataSource));
  if (index > -1) {
    retrievedColumns.dataSource[index] = columnConfiguration;
  } else {
    retrievedColumns.dataSource.push(columnConfiguration);
  }
  return retrievedColumns;
}

export default createSelector(
  columnOrderSelector,
  hiddenColumnsSelector,
  lockedColumnsSelector,
  filterSelector,
  cachedGridConfigurationSelector, isLocationsStandardsExportLoadedSelector,
  saveCachedGridConfigurationSelector, dataSourceSelector,
  (columnOrder, hiddenColumns, lockedColumns, filter, cachedGridConfiguration, isLocationsStandardsExportLoaded, saveCachedGridConfiguration, selectedDataSource) => {

    if (!isLocationsStandardsExportLoaded || !saveCachedGridConfiguration) return cachedGridConfiguration ? cachedGridConfiguration.toJS() : {};

    const columnConfiguration = {
      dataSource: selectedDataSource,
      columns: columnOrder ? columnOrder.toJS() : columnOrder,
      lockedColumns: lockedColumns ? lockedColumns.toJS() : lockedColumns,
      hiddenColumns: hiddenColumns ? hiddenColumns.toJS() : hiddenColumns,
      filter: filter ? filter.toJS() : filter,
    };

    return updateColumnsConfiguration(selectedDataSource, cachedGridConfiguration, columnConfiguration);
  });
