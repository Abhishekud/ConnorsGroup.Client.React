import {Map, fromJS} from 'immutable';
import {
  SHOW_CREATE_MOST_ELEMENT,
  CANCEL_CREATE_MOST_ELEMENT,
  SET_CREATE_MOST_ELEMENT_MODEL_PROPERTY,
  CREATE_MOST_ELEMENT_PENDING,
  CREATE_MOST_ELEMENT_FULFILLED,
  CREATE_MOST_ELEMENT_REJECTED,
} from '../../actions';
import {BASIC_MOST} from '../../../mostAnalysis/constants/mostTypes';

const initialState = Map({
  show: false,
  saving: false,
  validationErrors: new Map(),
  model: new Map({
    mostType: BASIC_MOST,
    name: '',
    elementUnitOfMeasureId: '',
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_CREATE_MOST_ELEMENT:
      return state.set('show', true);

    case SET_CREATE_MOST_ELEMENT_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case CREATE_MOST_ELEMENT_PENDING:
      return state.set('saving', true);

    case CANCEL_CREATE_MOST_ELEMENT:
    case CREATE_MOST_ELEMENT_FULFILLED:
      return initialState;

    case CREATE_MOST_ELEMENT_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
