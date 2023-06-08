import {createSelector} from 'reselect';
import standardItemsStatesSelector from './standardItemsStatesSelector';
import makeChildStandardItemsSelector from './makeChildStandardItemsSelector';

export default function () {
  const childStandardItemsSelector = makeChildStandardItemsSelector();
  return createSelector(
    childStandardItemsSelector,
    standardItemsStatesSelector,
    (childStandardItems, standardItemsStates) => standardItemsStates.filter((_, id) => childStandardItems.has(id))
  );
}
