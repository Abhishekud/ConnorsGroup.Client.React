import {createSelector} from 'reselect';
import pristineCharacteristicSetsSelector from './pristineCharacteristicSetsSelector';

export default createSelector(
  pristineCharacteristicSetsSelector,
  pristineCharacteristicSets => pristineCharacteristicSets.sortBy(a => a.get('name')).sortBy(a => -a.get('default')).valueSeq().toArray()
);
