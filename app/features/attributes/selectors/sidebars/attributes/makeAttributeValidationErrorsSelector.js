import {Map} from 'immutable';
import {createSelector} from 'reselect';
import attributeValidationErrorsSelector from './attributeValidationErrorsSelector';
import attributeIdSelector from './attributeIdSelector';

export default () =>
  createSelector(
    attributeValidationErrorsSelector,
    attributeIdSelector,
    (validationErrors, id) => validationErrors.get(id) || Map()
  );
