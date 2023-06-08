import {createSelector} from 'reselect';
import locationProfileStatesSelector from './locationProfileStatesSelector';
import locationProfileIdSelector from './locationProfileIdSelector';

export default () =>
  createSelector(
    locationProfileStatesSelector,
    locationProfileIdSelector,
    (states, id) => states.getIn([id, 'editing']) || false
  );
