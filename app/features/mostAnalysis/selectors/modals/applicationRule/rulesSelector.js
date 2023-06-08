import {createSelector} from 'reselect';
import modalSelector from './modalSelector';

export default createSelector(
  modalSelector,
  container => container.get('rules')
);
