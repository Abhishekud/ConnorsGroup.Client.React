import {createSelector} from 'reselect';
import columnOrderSelector from './columnOrderSelector';
import hiddenColumnsSelector from './hiddenColumnsSelector';
import lockedColumnsSelector from './lockedColumnsSelector';
import filterSelector from './filterSelector';
import sortSelector from './sortSelector';
import cachedGridConfigurationSelector from './cachedGridConfigurationSelector';
import isElementsLoadedSelector from './isElementsLoadedSelector';
import saveCachedGridConfigurationSelector from './saveCachedGridConfigurationSelector';

export default createSelector(
  columnOrderSelector,
  hiddenColumnsSelector,
  lockedColumnsSelector,
  filterSelector,
  sortSelector,
  cachedGridConfigurationSelector,
  isElementsLoadedSelector,
  saveCachedGridConfigurationSelector,
  (columnOrder, hiddenColumns, lockedColumns, filter, sort, cachedGridConfiguration, isElementsLoaded, saveCachedGridConfiguration) => {

    if (!isElementsLoaded || !saveCachedGridConfiguration) return cachedGridConfiguration ? cachedGridConfiguration.toJS() : {};

    return {
      'columns': columnOrder ? columnOrder.toJS() : columnOrder,
      lockedColumns: lockedColumns ? lockedColumns.toJS() : lockedColumns,
      hiddenColumns: hiddenColumns ? hiddenColumns.toJS() : lockedColumns,
      filter: filter ? filter.toJS() : filter,
      sort: sort ? sort.toJS() : sort,
    };
  });
