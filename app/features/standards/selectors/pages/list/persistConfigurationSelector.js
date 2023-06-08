import {createSelector} from 'reselect';
import filterSelector from './filterSelector';
import sortSelector from './sortSelector';
import columnOrderSelector from './columnOrderSelector';
import hiddenColumnsSelector from './hiddenColumnsSelector';
import lockedColumnsSelector from './lockedColumnsSelector';
import isStandardsLoadedSelector from './isStandardsLoadedSelector';
import saveCachedGridConfigurationSelector from './saveCachedGridConfigurationSelector';
import cachedGridConfigurationSelector from './cachedGridConfigurationSelector';

export default createSelector(
  columnOrderSelector,
  sortSelector,
  filterSelector,
  hiddenColumnsSelector,
  lockedColumnsSelector,
  isStandardsLoadedSelector,
  saveCachedGridConfigurationSelector,
  cachedGridConfigurationSelector,
  (columnOrder, sort, filter, hiddenColumns, lockedColumns, isStandardsLoaded, saveCachedGridConfiguration, cachedGridConfiguration) => {

    if (!isStandardsLoaded || !saveCachedGridConfiguration) return cachedGridConfiguration ? cachedGridConfiguration.toJS() : {};

    return {
      columns: columnOrder ? columnOrder.toJS() : columnOrder,
      sort: sort ? sort.toJS() : sort,
      filter: filter ? filter.toJS() : filter,
      lockedColumns: lockedColumns ? lockedColumns.toJS() : lockedColumns,
      hiddenColumns: hiddenColumns ? hiddenColumns.toJS() : hiddenColumns,
    };
  });
