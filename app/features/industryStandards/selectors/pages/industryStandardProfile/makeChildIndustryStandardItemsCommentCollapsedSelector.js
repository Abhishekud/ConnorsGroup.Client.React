import {createSelector} from 'reselect';
import makeChildIndustryStandardItemsStatesSelector from './makeChildIndustryStandardItemsStatesSelector';

export default function () {
  const childStandardItemsStatesSelector = makeChildIndustryStandardItemsStatesSelector();
  return createSelector(
    childStandardItemsStatesSelector,
    childStandardItemsStates => childStandardItemsStates.map(states => states.get('commentCollapsed'))
  );
}
