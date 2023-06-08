import {createSelector} from 'reselect';
import industryStandardItemsStatesSelector from './industryStandardItemsStatesSelector';
import makeChildIndustryStandardItemsSelector from './makeChildIndustryStandardItemsSelector';

export default function () {
  const childStandardItemsSelector = makeChildIndustryStandardItemsSelector();
  return createSelector(
    childStandardItemsSelector,
    industryStandardItemsStatesSelector,
    (childStandardItems, standardItemsStates) => standardItemsStates.filter((_, id) => childStandardItems.has(id))
  );
}
