import {createSelector} from 'reselect';
import modalSelector from './modalSelector';

export default createSelector(
  modalSelector,
  page => page.get('elementId')
);
