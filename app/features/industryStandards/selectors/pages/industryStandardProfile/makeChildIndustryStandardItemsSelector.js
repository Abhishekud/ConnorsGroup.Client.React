import {createSelector} from 'reselect';
import industryStandardItemsSelector from './industryStandardItemsSelector';
import industryStandardItemIdSelector from './industryStandardItemIdSelector';

export default () =>
  createSelector(
    industryStandardItemsSelector,
    industryStandardItemIdSelector,
    (standardItems, standardItemId) =>
      standardItems.filter(si => si.get('standardElementGroupId') === standardItemId)
  );
