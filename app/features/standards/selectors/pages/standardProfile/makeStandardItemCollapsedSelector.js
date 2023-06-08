import {createSelector} from 'reselect';
import standardItemsStatesSelector from './standardItemsStatesSelector';
import standardItemIdSelector from './standardItemIdSelector';

export default () =>
  createSelector(
    standardItemsStatesSelector,
    standardItemIdSelector,
    (standardItemsStates, standardItemId) =>
      standardItemsStates.getIn([standardItemId, 'collapsed'])
  );
