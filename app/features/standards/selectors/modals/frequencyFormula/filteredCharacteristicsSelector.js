import {createSelector} from 'reselect';
import modalSelector from './modalSelector';

export default createSelector(
  modalSelector,
  modal => modal.get('characteristics')
    .filter(x => x.get('name').toUpperCase().includes(modal.get('filter').toUpperCase()))
    .sortBy(x => x.get('name')),
);
