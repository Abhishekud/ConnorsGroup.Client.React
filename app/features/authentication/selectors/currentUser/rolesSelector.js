import {createSelector} from 'reselect';
import currentUserSelector from './currentUserSelector';

export default createSelector(
  currentUserSelector,
  currentUser => currentUser.get('roles')
);
