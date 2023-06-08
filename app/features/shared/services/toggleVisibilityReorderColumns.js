import {ALLOWED_MAX_COLUMN_LOCKS} from '../../customizableGrid/constants/columnConfigurations';

/**
 * Description: Accepts field, visibility (state), list of columns and list of hiddenColumns,
 * hide or unhide the column on the basis of visibility and field parameter and
 * returns selected column data and newly generated columns list.
 * @param {*} field - Contains the name of column in which operation is performed.
 * @param {*} visibility - It has true or false value.
 * @param {*} columns - Contains list of columns.
 * @param {*} hiddenColumns - Contains list of all hidden columns.
 * @returns the selected column and also newly created list according to visibility parameter.
 */
export default function (field, visibility, columns, hiddenColumns) {
  let columnsList = columns;
  const selectedColumn = columns.filter(c => c.get('field') === field);
  let updatedOrderIndex = 0;

  if (visibility) {
    let selectedHiddenColumn = hiddenColumns.get(field);
    const oldIndex = selectedHiddenColumn.first().get('orderIndex');
    const visibleColumns = columns.sortBy(item => item.get('orderIndex'));
    const visibleColumnLastIndex = visibleColumns.filter(col => col.get('included')).last()?.get('orderIndex') ?? -1;
    const lockedColumns = visibleColumns.filter(col => col.get('locked'));

    if (oldIndex > visibleColumnLastIndex) {
      updatedOrderIndex = visibleColumnLastIndex + 1;
    } else {
      const lockedColumnLastIndex = lockedColumns.last()?.get('orderIndex') ?? -1;

      if (oldIndex <= lockedColumnLastIndex) {
        updatedOrderIndex = lockedColumnLastIndex + 1;
      } else {
        updatedOrderIndex = oldIndex;
      }
      columnsList = columns.map(col => {
        const orderIndex = col.get('orderIndex');
        if (orderIndex >= updatedOrderIndex && col.get('included')) {
          return col.set('orderIndex', orderIndex + 1);
        }
        return col;
      });
    }

    const isColumnLockable = !(lockedColumns.size >= ALLOWED_MAX_COLUMN_LOCKS);
    selectedHiddenColumn = selectedHiddenColumn.map(item => item.set('orderIndex', updatedOrderIndex).set('lockable', isColumnLockable));
    columnsList = columnsList.merge(selectedHiddenColumn);
  } else {
    columnsList = columns.map(c => {
      updatedOrderIndex = c.get('orderIndex');
      if (c.get('orderIndex') > selectedColumn.first().get('orderIndex')) {
        updatedOrderIndex = c.get('orderIndex') - 1;
      }
      return c.set('orderIndex', updatedOrderIndex);
    });
    columnsList = columnsList.filter(c => c.get('field') !== field);
  }
  return {selectedColumn, columnsList};
}
