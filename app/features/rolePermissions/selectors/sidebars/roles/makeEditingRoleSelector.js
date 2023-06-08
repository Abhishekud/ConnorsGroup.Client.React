import {createSelector} from 'reselect';
import roleStatesSelector from './roleStatesSelector';
import roleIdSelector from './roleIdSelector';

export default () =>
  createSelector(
    roleStatesSelector,
    roleIdSelector,
    (states, id) => states.getIn([id, 'editing'])
  );
