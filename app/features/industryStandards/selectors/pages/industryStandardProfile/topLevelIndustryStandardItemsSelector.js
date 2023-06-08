import {createSelector} from 'reselect';
import industryStandardItemsSelector from './industryStandardItemsSelector';

export default createSelector(
  industryStandardItemsSelector,
  standardItems => standardItems.filter(si => Boolean(si.get('standardElementGroupId')) === false)
);
