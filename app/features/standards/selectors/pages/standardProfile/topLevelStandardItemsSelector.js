import {createSelector} from 'reselect';
import standardItemsSelector from './standardItemsSelector';

export default createSelector(
  standardItemsSelector,
  standardItems => standardItems.filter(si => Boolean(si.get('standardElementGroupId')) === false)
);
