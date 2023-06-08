import {Map} from 'immutable';

export default function createStandardItemState(standardItem) {
  return Map({
    addStandardItemAboveCollapsed: true,
    addStandardItemBelowCollapsed: true,
    editing: false,
    collapsed: false,
    commentCollapsed: true,
    commentEntered: Boolean(standardItem.comment),
    selected: false,
    type: String(standardItem.type),
  });
}
