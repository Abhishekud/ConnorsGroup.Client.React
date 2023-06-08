/* eslint-disable react/display-name */
/**
 * Description: Accepts event (contains reordered columns),
 * list of columns, fetches column title and then finds the indexes of dragged column,
 * further it finds the columnKey, returns null if column title or newIndex fetch fails.
 * @param {*} event - It contains the reordered columns list.
 * @param {*} columns - Contains list of columns (before the reorder is performed).
 * @returns the columnKey, oldIndex and newIndex.
 */

const getColumnTitle = target => {
  let draggedColumnTitle = target.dragLogic.dragElementClue.state.innerText;
  if (!draggedColumnTitle) return null;

  target.props.sort?.forEach((record, index) => {
    const column = target.props.children.find(r => r.props.field === record.field);
    if (draggedColumnTitle === (column.props.title + (index + 1))) {
      draggedColumnTitle = column.props.title;
    }
  });
  return String(draggedColumnTitle).trim();
};

export default function (event, columns) {
  const draggedColumnTitle = getColumnTitle(event.target);
  if (!draggedColumnTitle) return null;
  const newIndex = event.columns.find(col => String(col.title).trim() === draggedColumnTitle).orderIndex;
  if (!newIndex && newIndex !== 0) return null;

  const draggedColumn = columns.find(col => String(col.get('title')).trim() === draggedColumnTitle);
  const oldIndex = draggedColumn.get('orderIndex');
  const columnKey = draggedColumn.get('field');

  return {columnKey, oldIndex, newIndex};
}
