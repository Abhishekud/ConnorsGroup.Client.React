import {createSelector} from 'reselect';
import makeChildStandardItemsSelector from './makeChildStandardItemsSelector';

export default function () {
  const childStandardItemsSelector = makeChildStandardItemsSelector();
  return createSelector(
    childStandardItemsSelector,
    childStandardItems => childStandardItems.sortBy(si => si.get('index'))
  );
}
