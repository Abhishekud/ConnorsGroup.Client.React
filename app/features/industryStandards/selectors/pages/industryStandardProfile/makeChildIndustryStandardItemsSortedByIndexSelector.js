import {createSelector} from 'reselect';
import makeChildIndustryStandardItemsSelector from './makeChildIndustryStandardItemsSelector';

export default function () {
  const childStandardItemsSelector = makeChildIndustryStandardItemsSelector();
  return createSelector(
    childStandardItemsSelector,
    childStandardItems => childStandardItems.sortBy(si => si.get('index'))
  );
}
