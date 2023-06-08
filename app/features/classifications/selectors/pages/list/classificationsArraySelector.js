import {createSelector} from 'reselect';
import classificationsSelector from './classificationsSelector';

export default createSelector(
  classificationsSelector,
  classifications => classifications.toList().toJS()
);
