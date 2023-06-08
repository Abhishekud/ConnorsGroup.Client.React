import {Map, fromJS} from 'immutable';
import {
  SHOW_PROMOTE_TO_LIST_ELEMENT,
  CANCEL_PROMOTE_TO_LIST_ELEMENT,
  SET_PROMOTE_TO_LIST_ELEMENT_MODEL_PROPERTY,
  PROMOTE_TO_LIST_ELEMENT_PENDING,
  PROMOTE_TO_LIST_ELEMENT_FULFILLED,
  PROMOTE_TO_LIST_ELEMENT_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  saving: false,
  validationErrors: new Map(),
  standardId: null,
  standardElementId: null,
  model: new Map({
    elementActivityId: null,
    elementUnitOfMeasureId: null,
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_PROMOTE_TO_LIST_ELEMENT: {
      const {standardId, standardElementId} = action.payload;

      return initialState.withMutations(map => {
        map.set('show', true)
          .set('standardId', standardId)
          .set('standardElementId', standardElementId);
      });
    }

    case SET_PROMOTE_TO_LIST_ELEMENT_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case PROMOTE_TO_LIST_ELEMENT_PENDING:
      return state.set('saving', true);

    case PROMOTE_TO_LIST_ELEMENT_FULFILLED:
    case CANCEL_PROMOTE_TO_LIST_ELEMENT:
      return initialState;

    case PROMOTE_TO_LIST_ELEMENT_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
