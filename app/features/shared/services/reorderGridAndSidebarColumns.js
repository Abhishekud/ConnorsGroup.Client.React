import {nonReorderableColumns} from '../constants/nonReorderableColumns';
import {ALLOWED_MAX_COLUMN_LOCKS} from '../../customizableGrid/constants/columnConfigurations';

/**
 * Description: Accepts columnKey, oldIndex, newIndex and list of columns and
 * reorders the columns on the basis of oldIndex and newIndex parameter,
 * updates the locked & lockable attributes.
 * @param {*} columnKey - Contains the name of field which is dragged from its original position.
 * @param {*} oldIndex -  Contains the order index of field which is dragged from its original position.
 * @param {*} newIndex -  Contains the order index of new position.
 * @param {*} columns  -  Contains list of columns.
 * @returns finalColumns - List of columns.
 */
export default function (columnKey, oldIndex, newIndex, columns) {

  const sourceColumn = columns.find(col => col.orderIndex === oldIndex);
  const destinationColumn = columns.find(col => col.orderIndex === newIndex);

  let lockedColumnsSize = columns.filter(col => col.locked && !nonReorderableColumns.includes(col.field))?.length;
  if (destinationColumn.locked && !sourceColumn.locked) lockedColumnsSize += 1;
  if (sourceColumn.locked && !destinationColumn.locked) lockedColumnsSize -= 1;

  const finalColumns = columns.map(item => {
    if (oldIndex < newIndex && item.orderIndex > oldIndex && item.orderIndex <= newIndex) {
      item.orderIndex -= 1;
    } else if (item.orderIndex < oldIndex && item.orderIndex >= newIndex) {
      item.orderIndex += 1;
    }
    if (item.field === columnKey) {
      item.orderIndex = newIndex;
    }
    // For handling the locked into unlocked and unlocked into locked column ordering
    if (destinationColumn.locked && item.field === columnKey) {
      item.locked = true;
    } else if (!destinationColumn.locked && item.field === columnKey) {
      item.locked = false;
    }

    if (lockedColumnsSize > (ALLOWED_MAX_COLUMN_LOCKS - 1)) {
      item.lockable = false;
    } else {
      item.lockable = true;
    }
    return item;
  });
  return finalColumns;
}
