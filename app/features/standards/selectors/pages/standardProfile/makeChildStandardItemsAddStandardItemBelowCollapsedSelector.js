import {createSelector} from 'reselect';
import makeChildStandardItemsStatesSelector from './makeChildStandardItemsStatesSelector';

export default function () {
  const childStandardItemsStatesSelector = makeChildStandardItemsStatesSelector();
  return createSelector(
    childStandardItemsStatesSelector,
    childStandardItemsStates => childStandardItemsStates.map(states => states.get('addStandardItemBelowCollapsed'))
  );
}
