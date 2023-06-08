import {createSelector} from 'reselect';
import selectedEndpointSelector from './selectedEndpointSelector';

export default createSelector(
  selectedEndpointSelector,
  selected => (selected === null ? 0 : 1)
);
