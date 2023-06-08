import {createSelector} from 'reselect';
import standardItemsSelector from './standardItemsSelector';

export default createSelector(
  standardItemsSelector,
  standardItems => standardItems.valueSeq().map(si => si.get('index')).max() || 0
);
