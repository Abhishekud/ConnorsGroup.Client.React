import {createSelector} from 'reselect';
import containerSelector from './containerSelector';

export default createSelector(
  containerSelector,
  container => container.get('mostSteps').sortBy(ms => ms.get('number'))
);
