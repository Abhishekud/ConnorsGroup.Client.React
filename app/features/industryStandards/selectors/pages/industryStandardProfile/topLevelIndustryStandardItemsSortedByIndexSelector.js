import {createSelector} from 'reselect';
import topLevelindustryStandardItemsSelector from './topLevelIndustryStandardItemsSelector';

export default createSelector(
  topLevelindustryStandardItemsSelector,
  topLevelStandardItems => topLevelStandardItems.sortBy(si => si.get('index'))
);
