import {Map} from 'immutable';

export default function createStandardItemState() {
  return Map({
    collapsed: false,
    commentCollapsed: true,
  });
}
