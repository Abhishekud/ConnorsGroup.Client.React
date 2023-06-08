import {Map} from 'immutable';
import {createSelector} from 'reselect';
import validationErrorsSelector from './validationErrorsSelector';
import locationProfileIdSelector from './locationProfileIdSelector';

export default () =>
  createSelector(
    validationErrorsSelector,
    locationProfileIdSelector,
    (errors, id) => errors.get(id) || Map()
  );
