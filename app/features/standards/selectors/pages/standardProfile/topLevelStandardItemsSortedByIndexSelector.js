import {createSelector} from 'reselect';
import topLevelStandardItemsSelector from './topLevelStandardItemsSelector';

export default createSelector(
  topLevelStandardItemsSelector,
  topLevelStandardItems => topLevelStandardItems.sortBy(si => si.get('index'))
);
