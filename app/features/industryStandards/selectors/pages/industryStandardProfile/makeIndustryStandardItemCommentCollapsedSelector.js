import {createSelector} from 'reselect';
import industryStandardItemsStatesSelector from './industryStandardItemsStatesSelector';
import industryStandardItemIdSelector from './industryStandardItemIdSelector';

export default () =>
  createSelector(
    industryStandardItemsStatesSelector,
    industryStandardItemIdSelector,
    (standardItemsStates, standardItemId) => standardItemsStates.getIn([standardItemId, 'commentCollapsed'])
  );
