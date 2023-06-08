import {createSelector} from 'reselect';
import {fromJS, Map} from 'immutable';
import attributeSelector from './attributesSelector';
import hiddenColumnsSelector from './hiddenColumnsSelector';
import columnOrderSelector from './columnOrderSelector';
import {locationNameSelector} from '../../../../shared/selectors/components/settings';
import orgHierarchyLevelsSelector from '../../../../orgHierarchyLevels/selectors/pages/list/orgHierarchyLevelsSelector';
import canProfilingAttributesAssignSelector from '../../../../authentication/selectors/currentUser/canProfilingAttributesAssignSelector';
import activeBackgroundJobsSelector from './activeBackgroundJobsSelector';
import lockedColumnsSelector from './lockedColumnsSelector';
import {ALLOWED_MAX_COLUMN_LOCKS} from '../../../../customizableGrid/constants/columnConfigurations';
const columnWidth = title => title.length * 7 + 60;

export default createSelector(
  attributeSelector,
  locationNameSelector,
  orgHierarchyLevelsSelector,
  hiddenColumnsSelector,
  lockedColumnsSelector,
  columnOrderSelector,
  canProfilingAttributesAssignSelector,
  activeBackgroundJobsSelector,
  (attributes, locationName, orgHierarchyLevels, hiddenColumns, lockedColumns, columnOrder, canProfilingAttributesAssign, activeBackgroundJob) => {
    const attributeColumns =
      attributes.map(a =>
        Map({
          field: `attribute_${a.get('id')}`,
          title: a.get('name'),
          width: Math.max(columnWidth(a.get('name')), 170),
          sortable: false,
          filterable: true,
          editor: 'boolean',
          className: !canProfilingAttributesAssign || activeBackgroundJob ? 'disabled-input' : '',
        })
      ).toList()
        .sortBy(a => a.get('name'));

    const orgHierarchyColumns =
      orgHierarchyLevels.map(ohl =>
        Map({
          field: `orghierarchylevel_${ohl.get('id')}`,
          title: ohl.get('name'),
          width: 200,
          editable: false,
          filterable: true,
          sortable: true,
        })
      ).toList();
    const lockedColumnsCount = lockedColumns.size;
    const columns = fromJS([{field: 'name', title: locationName, editable: false, filterable: true, sortable: true, width: 200},
      {field: 'description', title: `${locationName} Description`, editable: false, filterable: true, sortable: true, width: 200}])
      .concat(orgHierarchyColumns)
      .concat(attributeColumns)
      .withMutations(allColumnsArray => {
        allColumnsArray.map(col =>
          col
            .set('included', !hiddenColumns.has(col.get('columnId') || col.get('field')))
            .set('locked', col.get('field') === 'selected' || lockedColumns.has(col.get('columnId') || col.get('field')))
            .set('lockable', lockedColumnsCount < ALLOWED_MAX_COLUMN_LOCKS)
        );
      });
    let columnOrderIndex = 0;
    const lockedList = columns.filter(c => c.get('locked')).map(c => c.set('orderIndex', columnOrderIndex++));
    const unLockedList = columns.filter(c => !c.get('locked') && c.get('included')).map(c => c.set('orderIndex', columnOrderIndex++));
    const hiddenList = columns.filter(c => !c.get('included')).map(c => c.set('orderIndex', columnOrderIndex++));
    let mergedColumns = lockedList.concat(unLockedList);
    if (columnOrder.size) {
      mergedColumns = columnOrder.concat(hiddenList);
    }
    const finalMergedColumns = mergedColumns.sortBy(item => item.get('orderIndex'));
    return finalMergedColumns;
  }
);
