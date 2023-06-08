/**
 * Description: Accepts columnKey, oldIndex, newIndex and list of columns,
 * reorder the orginal columns list on the basis of oldIndex and newIndex parameter and
 * returns newly generated columns list.
 * @param {*} columnKey - It contains the name of field which is dragged from its original position.
 * @param {*} oldIndex - It contains the order index of field which is dragged from its original position.
 * @param {*} newIndex - It contains the order index of new position.
 * @param {*} columns - Contains list of columns.
 * @returns newly created list.
 */
export default function (columnKey, oldIndex, newIndex, columns) {
  const finalColumns = columns.map(item => {
    if (oldIndex < newIndex && item.orderIndex > oldIndex && item.orderIndex <= newIndex) {
      item.orderIndex--;
    } else if (item.orderIndex < oldIndex && item.orderIndex >= newIndex) {
      item.orderIndex++;
    }
    if (item.field === columnKey) {
      item.orderIndex = newIndex;
    }
    return item;
  });
  return finalColumns;
}
