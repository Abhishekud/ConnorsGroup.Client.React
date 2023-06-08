import {fromJS} from 'immutable';
import {
  SHOW_CREATE_ENDPOINT_MODAL,
  CANCEL_CREATE_ENDPOINT,
  UPDATE_ENDPOINT_PROPERTY,
  ADD_ENDPOINT_PROPERTY,
  CREATE_ENDPOINT_PENDING,
  CREATE_ENDPOINT_FULFILLED,
  CREATE_ENDPOINT_REJECTED,
} from '../../actions';

const blankAuthParameter = fromJS({
  property: '',
  value: '',
});

const initialState = fromJS({
  show: false,
  saving: false,
  model: {
    name: '',
    url: '',
    domainId: '',
    siteToken: '',
    authProperties: [],
  },
  formValidationErrors: {},
});

export default function (state = initialState, action) {
  switch (action.type) {
    case (SHOW_CREATE_ENDPOINT_MODAL):
      return state.set('show', true);

    case (CREATE_ENDPOINT_PENDING):
      return state.set('saving', true);

    case (CANCEL_CREATE_ENDPOINT):
    case (CREATE_ENDPOINT_FULFILLED):
      return state.set('show', false).set('saving', false);

    case (CREATE_ENDPOINT_REJECTED):
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('formValidationErrors', status === 400 ? fromJS(data) : new Map());
      });

    case (UPDATE_ENDPOINT_PROPERTY): {
      const path =
        (state.hasIn(['model', action.payload.id]))
          ? ['model', action.payload.id]
          : ['model', 'authProperties', /authProperties\[(\d+)\]\.(\w+)/.exec(action.payload.id).slice(1)].flat();
      return state.setIn(path, action.payload.value);
    }

    case (ADD_ENDPOINT_PROPERTY): {
      return state.updateIn(['model', 'authProperties'], list => list.push(blankAuthParameter));
    }

    default:
      return state;
  }
}
