import {ALLOWED_MAX_COLUMN_LOCKS} from '../../customizableGrid/constants/columnConfigurations';

/**
 * Description: Accepts field, lock (state), list of columns,
 * lock or unlock the column on the basis of lock and field parameter and
 * returns newly generated columns list.
 * @param {*} field - Contains the name of column in which operation is performed.
 * @param {*} lock - It has true or false value.
 * @param {*} columns - Contains list of columns.
 * @returns the newly created list according to lock parameter.
 */
export default function (field, lock, columns) {
  let columnsList;
  let lastLockedColumnIndex = 0;
  const lockedColumns = columns.filter(c => c.get('locked'));
  // To skip the 'selected', 'activeSymbol' and 'staleStandard field from the count of locked columns.
  const lockedColumnsSize = lockedColumns.filter(c => c.get('field') !== 'selected' && c.get('field') !== 'activeSymbol' && c.get('field') !== 'staleStandard')?.size;
  lockedColumns.sortBy(item => item.get('orderIndex'));
  lastLockedColumnIndex = lockedColumns.size ? lockedColumns.last().get('orderIndex') : -1;
  const lockedColumn = columns.find(c => c.get('field') === field);
  let updatedOrderIndex = 0;
  if (lock) {
    columnsList = columns.map(c => {
      updatedOrderIndex = c.get('orderIndex');
      if (c.get('field') === field) updatedOrderIndex = lastLockedColumnIndex + 1;
      if (c.get('orderIndex') > lastLockedColumnIndex && c.get('orderIndex') < lockedColumn.get('orderIndex')) {
        updatedOrderIndex = c.get('orderIndex') + 1;
      }
      return c.set('orderIndex', updatedOrderIndex)
        .set('locked', c.get('field') === field ? lock : c.get('locked'))
        .set('lockable', lockedColumnsSize < ALLOWED_MAX_COLUMN_LOCKS - 1);
    });
  } else {
    columnsList = columns.map(c => {
      updatedOrderIndex = c.get('orderIndex');
      if (c.get('field') === field) updatedOrderIndex = lastLockedColumnIndex;
      if (c.get('locked') && c.get('orderIndex') > lockedColumn.get('orderIndex')) {
        updatedOrderIndex = c.get('orderIndex') - 1;
      }
      return c.set('orderIndex', updatedOrderIndex)
        .set('locked', c.get('field') === field ? lock : c.get('locked'))
        .set('lockable', true);
    });
  }
  return columnsList.sortBy(x => x.get('orderIndex'));
}
