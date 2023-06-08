import {createSelector} from 'reselect';
import standardItemsSelector from './standardItemsSelector';

export default createSelector(
  standardItemsSelector,
  standardItems => standardItems.sortBy(si => si.get('index'))
);
