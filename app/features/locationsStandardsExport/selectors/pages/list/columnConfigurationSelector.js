import {createSelector} from 'reselect';
import systemColumnsSelector from './systemColumnsSelector';
import hiddenColumnsSelector from './hiddenColumnsSelector';
import columnOrderSelector from './columnOrderSelector';
import orgHierarchyLevelsSelector from './orgHierarchyLevelColumnsSelector';
import featureFlagsSelector from '../../../../shared/selectors/components/settings/featureFlagsSelector';
import lockedColumnsSelector from './lockedColumnsSelector';
import {ALLOWED_MAX_COLUMN_LOCKS} from '../../../../customizableGrid/constants/columnConfigurations';

export default createSelector(
  systemColumnsSelector,
  orgHierarchyLevelsSelector,
  lockedColumnsSelector,
  hiddenColumnsSelector,
  columnOrderSelector,
  featureFlagsSelector,
  (systemColumns, orgHierarchyLevels, lockedColumns, hiddenColumns, columnOrder, featureFlags) => {

    const lockedColumnsCount = lockedColumns.size;
    const x = orgHierarchyLevels
      .merge(systemColumns)
      .filter(x => {
        const featureFlagFilter = x.get('featureFlag');
        return !featureFlagFilter || featureFlags.get(featureFlagFilter) === true;
      })
      .map(c =>
        c.set('included', !hiddenColumns.has(c.get('columnId') || c.get('field')))
          .set('locked', c.get('field') === 'selected' || lockedColumns.has(c.get('columnId') || c.get('field')))
          .set('lockable', lockedColumnsCount < ALLOWED_MAX_COLUMN_LOCKS))
      .toList();

    let columnOrderIndex = 0;
    const lockedList = x.filter(c => c.get('locked')).map(c => c.set('orderIndex', columnOrderIndex++));
    const unLockedList = x.filter(c => !c.get('locked') && c.get('included')).map(c => c.set('orderIndex', columnOrderIndex++));
    const hiddenList = x.filter(c => !c.get('included')).map(c => c.set('orderIndex', columnOrderIndex++));

    let mergedColumns = lockedList.concat(unLockedList);
    if (columnOrder.size) {
      const final = mergedColumns.map(c => {
        const col = columnOrder.find(a => a.get('field') === c.get('field'));
        return col ? c.set('orderIndex', col.get('orderIndex')) : c;
      });
      mergedColumns = final.concat(hiddenList);
    }
    return mergedColumns.sortBy(item => item.get('orderIndex'));
  }
);
