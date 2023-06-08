import {createSelector} from 'reselect';
import componentSelector from './componentSelector';

export default createSelector(
  componentSelector,
  component => component.get('version') || 0,
);
