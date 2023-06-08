import {createSelector} from 'reselect';
import shouldClientResetGridConfigurationSelector from './shouldClientResetGridConfigurationSelector';
import hideClearFiltersButtonSelector from './hideClearFiltersButtonSelector';
import hideClearSortsButtonSelector from './hideClearSortsButtonSelector';
import showLockButtonSelector from './showLockButtonSelector';
import showResetButtonSelector from './showResetButtonSelector';
import showHiddenButtonSelector from './showHiddenButtonSelector';
import columnOrderSelector from './columnOrderSelector';
import originalColumnsSelector from './originalColumnsSelector';

export default createSelector(
  shouldClientResetGridConfigurationSelector,
  hideClearFiltersButtonSelector,
  hideClearSortsButtonSelector,
  showLockButtonSelector,
  showResetButtonSelector,
  showHiddenButtonSelector,
  columnOrderSelector,
  originalColumnsSelector,
  (shouldClientResetGridConfiguration, hideFilter, hideSort, lock, reset, hidden, columnOrder, originalColumns) => {
    let isReordered = false;
    originalColumns.forEach((element, index) => {
      if (element.get('field') !== columnOrder.getIn([index, 'field'])) {
        isReordered = true;
      }
    });
    const reorder = shouldClientResetGridConfiguration ? false : isReordered;
    return !(!hideFilter || !hideSort || lock || reset || hidden || reorder);
  }
);
