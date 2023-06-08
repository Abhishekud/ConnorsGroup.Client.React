import {createSelector} from 'reselect';
import standardItemsSelector from './standardItemsSelector';
import standardItemIdSelector from './standardItemIdSelector';

export default () =>
  createSelector(
    standardItemsSelector,
    standardItemIdSelector,
    (standardItems, standardItemId) =>
      standardItems.filter(si => si.get('standardElementGroupId') === standardItemId)
  );
