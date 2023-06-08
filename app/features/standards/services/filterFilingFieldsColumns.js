import {ALLOWED_MAX_COLUMN_LOCKS} from '../../customizableGrid/constants/columnConfigurations';

/**
 * Description: Accepts originalColumns, columns (retrieved), finalLockedColumns, finalHiddenColumns, filter and sort.
 * It add, update and remove filing fields columns, remove filter and sorting of deleted filing fields columns and
 * remove deleted filing fields from locked columns and hidden columns list
 * returns newly generated columns list, locked columns, hidden columns, filter and sorting.
 * @param {*} originalColumns - Contains the original columns list.
 * @param {*} columns - Contains retrieved columns list from DB.
 * @param {*} finalLockedColumns - Contains locked columns list.
 * @param {*} finalHiddenColumns - Contains hidden columns list.
 * @param {*} sort - Contains sort applied on columns.
 * @param {*} filter - Contains filter applied on columns.
 * @returns the newly created columns list, locked columns, hidden columns, filters and sorts.
 */
export default function filterFilingFieldsColumns(originalColumns, columns, finalLockedColumns, finalHiddenColumns, filter, sort) {
  let finalColumns = columns.valueSeq().toList();
  let finalSort = sort;
  let finalFilter = filter;
  const removedFilingFields = [];
  let lockable = true;

  const originalColumnsArray = originalColumns.valueSeq().toJS();

  // To add newly added filing fields in existing columns list
  const newFilingField = finalColumns.filter(c => !c.has('orderIndex'));
  if (newFilingField.size) {
    let lastIndex = finalColumns.filter(c => c.has('orderIndex')).sortBy(x => x.get('orderIndex')).last().get('orderIndex');
    finalColumns = finalColumns.map(x => {
      if (newFilingField.filter(y => y.get('field') === x.get('field'))?.size) {
        return x.set('orderIndex', ++lastIndex).set('lockable', finalColumns.first().get('lockable') ?? null);
      }
      return x;
    });
  }

  // To get the original columns and latest filing fields names
  const ColumnsField = originalColumns.valueSeq().map(x => ({title: x.get('title'), field: x.get('field')})).toArray();

  // For update the title of the existing updated filing fields
  if (originalColumns.size === finalColumns.size) {
    finalColumns = finalColumns.map(col => {
      if (ColumnsField.some(x => x.title !== col.get('title') && x.field === col.get('field'))) {
        return col.set('title', ColumnsField.find(x => x.field === col.get('field')).title);
      }
      return col;
    });
  }

  // To find deleted filing fields and then remove it from the existing columns list
  // and also to remove applied filter and sorting on it
  finalColumns.forEach(col => {
    if (!ColumnsField.some(x => x.title === col.get('title') && x.field === col.get('field'))) {
      removedFilingFields.push({title: col.get('title'), field: col.get('field')});
    }
  });

  // we are updating the hidden column title so if we unhide it then we get the updated title for that column
  if (finalHiddenColumns) {
    for (const key in finalHiddenColumns) {
      if (originalColumnsArray?.some(x => x.title !== finalHiddenColumns[key][0].title && x.field === key)) {
        finalHiddenColumns[key][0].title = originalColumnsArray.find(x => x.field === key).title;
      }
    }
  }

  if (removedFilingFields.length) {
    finalSort = sort.filter(x => !removedFilingFields.some(y => y.field === x.field));
    if (filter) {
      finalFilter = {
        filters: filter.filters.filter(x => !removedFilingFields.some(y => y.field === x.field)),
        logic: filter.logic,
      };
    }
    const filteredColumns = finalColumns.filter(x => !removedFilingFields.some(y => y.title === x.get('title') && y.field === x.get('field')));

    // To remove deleted filing fields from locked columns list
    if (finalLockedColumns) {
      removedFilingFields.forEach(x => {
        delete finalLockedColumns[x.field];
      });
      if (Object.keys(finalLockedColumns).length > ALLOWED_MAX_COLUMN_LOCKS - 1) lockable = false;
    }

    // To remove deleted filing fields from hidden columns list
    if (finalHiddenColumns) {
      removedFilingFields.forEach(x => {
        delete finalHiddenColumns[x.field];
      });
    }

    // To set the order index after removing the columns
    finalColumns = filteredColumns.sortBy(x => x.get('orderIndex')).map((col, index) => col.set('orderIndex', index).set('lockable', lockable));
  }

  return {finalColumns, finalLockedColumns, finalHiddenColumns, finalSort, finalFilter};
}
