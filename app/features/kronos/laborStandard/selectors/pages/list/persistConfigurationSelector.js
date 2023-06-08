import {createSelector} from 'reselect';
import columnOrderSelector from './columnOrderSelector';
import hiddenColumnsSelector from './hiddenColumnsSelector';
import lockedColumnsSelector from './lockedColumnsSelector';
import filterSelector from './filterSelector';
import sortSelector from './sortSelector';
import cachedGridConfigurationSelector from './cachedGridConfigurationSelector';
import isLaborStandardsLoadedSelector from './isLaborStandardsLoadedSelector';
import saveCachedGridConfigurationSelector from './saveCachedGridConfigurationSelector';

export default createSelector(
  columnOrderSelector,
  hiddenColumnsSelector,
  lockedColumnsSelector,
  filterSelector,
  sortSelector,
  cachedGridConfigurationSelector,
  isLaborStandardsLoadedSelector,
  saveCachedGridConfigurationSelector,
  (columnOrder, hiddenColumns, lockedColumns, filter, sort, cachedGridConfiguration, isLaborStandardsLoaded, saveCachedGridConfiguration) => {

    if (!isLaborStandardsLoaded || !saveCachedGridConfiguration) return cachedGridConfiguration ? cachedGridConfiguration.toJS() : {};

    return {
      'columns': columnOrder ? columnOrder.toJS() : columnOrder,
      lockedColumns: lockedColumns ? lockedColumns.toJS() : lockedColumns,
      hiddenColumns: hiddenColumns ? hiddenColumns.toJS() : lockedColumns,
      filter,
      sort,
    };
  });
