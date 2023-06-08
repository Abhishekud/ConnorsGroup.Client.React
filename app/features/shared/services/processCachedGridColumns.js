import {Map} from 'immutable';
import {ALLOWED_MAX_COLUMN_LOCKS} from '../../customizableGrid/constants/columnConfigurations';

/**
 * Description: Accepts originalColumns, retrievedColumns, finalLockedColumns, finalHiddenColumns, filter and sort.
 * The service then adds, updates and removes columns, filter and sorting of deleted columns,
 * further it would remove deleted columns from locked columns and hidden columns list.
 * @param {*} originalColumns - Contains the original columns list.
 * @param {*} retrievedColumns - Contains retrieved columns list from DB.
 * @param {*} finalLockedColumns - Contains locked columns list.
 * @param {*} finalHiddenColumns - Contains hidden columns list.
 * @param {*} sort - Contains sort applied on columns.
 * @param {*} filter - Contains filter applied on columns.
 * @returns the newly created columns list, locked columns, hidden columns, filters and sorts.
 */

function getPriorityColumnIndex(field, orderIndex) {
  if (field === 'selected') return -1;
  return orderIndex;
}

export default function processCachedGridColumns(originalColumns, retrievedColumns, finalLockedColumns, finalHiddenColumns, filter, sort) {
  let finalColumns = retrievedColumns;
  let finalSort = sort;
  let finalFilter = filter;
  const removedColumns = [];
  let lockable = true;

  const originalColumnsArray = originalColumns.toJS();

  // To add new columns in retrieved columns list
  let lastOrderIndex = finalColumns.sortBy(x => x.get('orderIndex')).last().get('orderIndex');
  originalColumnsArray.forEach(col => {
    const isColumnFound = finalColumns.find(y => y.get('field') === col.field);
    if (!isColumnFound && !(col.field in finalHiddenColumns)) {
      finalColumns = finalColumns.push(Map({
        ...col,
        orderIndex: getPriorityColumnIndex(col.field, ++lastOrderIndex),
        lockable: finalColumns.first().get('lockable') ?? null,
      }));
    }
  });

  // To update the title of the existing updated column
  finalColumns = finalColumns.map(col => {
    if (originalColumnsArray.some(x => x.title !== col.get('title') && x.field === col.get('field'))) {
      return col.set('title', originalColumnsArray.find(x => x.field === col.get('field')).title);
    }
    return col;
  });

  // To find deleted column and then remove it from the existing retrieved columns list
  // and also to remove applied filter and sorting on it
  finalColumns.forEach(col => {
    if (!originalColumnsArray.some(x => x.title === col.get('title') && x.field === col.get('field'))) {
      removedColumns.push({title: col.get('title'), field: col.get('field')});
    }
  });

  if (finalHiddenColumns) {
    for (const key in finalHiddenColumns) {
      if (!originalColumnsArray.some(x => x.field === key)) {
        // To remove deleted columns from hidden columns list
        delete finalHiddenColumns[key];
      } else if (originalColumnsArray.some(x => x.title !== finalHiddenColumns[key][0].title && x.field === key)) {
        // we are updating the hidden column title so if we unhide it then we get the updated title for that column
        finalHiddenColumns[key][0].title = originalColumnsArray.find(x => x.field === key).title;
      }
    }
  }

  if (removedColumns.length) {
    finalSort = sort?.filter(x => !removedColumns.some(y => y.field === x.field));
    if (filter) {
      finalFilter = {
        filters: filter.filters.filter(x => !removedColumns.some(y => y.field === x.field)),
        logic: filter.logic,
      };
    }
    finalColumns = finalColumns.filter(x => !removedColumns.some(y => y.title === x.get('title') && y.field === x.get('field')));

    // To remove deleted columns from locked columns list
    if (finalLockedColumns) {
      removedColumns.forEach(x => {
        delete finalLockedColumns[x.field];
      });
    }
  }

  if (finalLockedColumns && Object.keys(finalLockedColumns).length > ALLOWED_MAX_COLUMN_LOCKS - 1) lockable = false;
  // To set the order index after removing the columns
  finalColumns = finalColumns.sortBy(x => x.get('orderIndex')).map((col, index) => col.set('orderIndex', index).set('lockable', lockable));

  return {finalColumns, finalLockedColumns, finalHiddenColumns, finalSort, finalFilter};
}
