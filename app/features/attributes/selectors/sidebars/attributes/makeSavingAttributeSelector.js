import {createSelector} from 'reselect';
import attributeStatesSelector from './attributeStatesSelector';
import attributeIdSelector from './attributeIdSelector';

export default () =>
  createSelector(
    attributeStatesSelector,
    attributeIdSelector,
    (states, id) => states.getIn([id, 'saving'])
  );
