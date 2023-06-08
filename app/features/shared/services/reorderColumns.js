/**
 * Description: Accepts event, list of columns,
 * compare the event columns list with original columns list then update original list accordingly
 * and returns newly generated columns list.
 * @param {*} event - It contains the reordered columns list.
 * @param {*} columns - Contains list of columns (before the reorder is performed).
 * @returns the new created list.
 */
export default function (event, columns) {
  let isLocked = false;
  const finalColumns = columns.map(column => {
    const field = event.columns.find(c => c.field === column.get('field'));
    if (field.orderIndex !== column.get('orderIndex') && !isLocked) {
      // To avoid reorder on locked columns
      if (field.locked) {
        isLocked = true;
        return column;
      }
      return column.set('orderIndex', field.orderIndex);
    }
    return column;
  });
  return finalColumns;
}
