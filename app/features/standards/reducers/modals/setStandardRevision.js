import {Map, List, fromJS} from 'immutable';
import {
  SHOW_CONFIRM_SET_STANDARD_REVISION,
  CANCEL_SET_STANDARD_REVISION,
  SET_STANDARD_REVISION_PENDING,
  SET_STANDARD_REVISION_FULFILLED,
  SET_STANDARD_REVISION_REJECTED,
} from '../../actions';

const initialState = Map({
  show: false,
  processing: false,
  standardId: null,
  revisionNumber: null,
  validationErrors: List(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_CONFIRM_SET_STANDARD_REVISION: {
      const {standardId, revisionNumber, hasInactiveCharacteristics, hasInactiveUnitsOfMeasure} = action.payload;

      return initialState.withMutations(map =>
        map.set('show', true)
          .set('standardId', standardId)
          .set('revisionNumber', revisionNumber)
          .set('hasInactiveCharacteristics', hasInactiveCharacteristics)
          .set('hasInactiveUnitsOfMeasure', hasInactiveUnitsOfMeasure));
    }

    case SET_STANDARD_REVISION_PENDING:
      return state.set('processing', true);

    case CANCEL_SET_STANDARD_REVISION:
    case SET_STANDARD_REVISION_FULFILLED:
      return initialState;

    case SET_STANDARD_REVISION_REJECTED:
      return initialState.withMutations(map => {
        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data._) : Map());
      });

    default:
      return state;
  }
}
