import {createSelector} from 'reselect';
import standardItemsSelector from './standardItemsSelector';
import standardItemsSelectedSelector from './standardItemsSelectedSelector';
import {ARCHIVE} from '../../../constants/standardStatuses';

export default createSelector(
  standardItemsSelector,
  standardItemsSelectedSelector,
  (standardItems, standardItemsSelected) => standardItems.some(x => (standardItemsSelected.has(x.get('id'))) && x.get('elementStatus') === ARCHIVE)
);
