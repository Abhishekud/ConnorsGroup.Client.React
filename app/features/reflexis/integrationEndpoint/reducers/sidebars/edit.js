import {fromJS} from 'immutable';
import {
  UPDATE_ENDPOINT_PROPERTY,
  ADD_ENDPOINT_PROPERTY,
  OPEN_ENDPOINT_EDIT_SIDEBAR_PENDING,
  OPEN_ENDPOINT_EDIT_SIDEBAR_FULFILLED,
  CANCEL_ENDPOINT_EDIT,
  UPDATE_ENDPOINT_PENDING,
  UPDATE_ENDPOINT_FULFILLED,
  UPDATE_ENDPOINT_REJECTED,
} from '../../actions';

const emptyModel = fromJS({
  id: 0,
  name: '',
  url: '',
  domainId: '',
  siteToken: '',
  authProperties: [],
});

const blankAuthParameter = fromJS({
  property: '',
  value: '',
});

const initialState = fromJS({
  show: false,
  saving: false,
  loading: false,
  dirty: false,
  model: emptyModel,
  validationErrors: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case (OPEN_ENDPOINT_EDIT_SIDEBAR_PENDING):
      return state.set('show', true).set('loading', true);

    case (OPEN_ENDPOINT_EDIT_SIDEBAR_FULFILLED):
      return state.set('loading', false).set('dirty', false).set('validationErrors', null).set('model', fromJS(action.payload.data));

    case (CANCEL_ENDPOINT_EDIT):
      return initialState;

    case (UPDATE_ENDPOINT_PROPERTY): {
      const path =
        (state.hasIn(['model', action.payload.id]))
          ? ['model', action.payload.id]
          : ['model', 'authProperties', /authProperties\[(\d+)\]\.(\w+)/.exec(action.payload.id).slice(1)].flat();
      return state.setIn(path, action.payload.value).set('dirty', true);
    }

    case (ADD_ENDPOINT_PROPERTY): {
      return state.updateIn(['model', 'authProperties'], list => list.push(blankAuthParameter));
    }

    case (UPDATE_ENDPOINT_PENDING):
      return state.set('saving', true);

    case (UPDATE_ENDPOINT_REJECTED):
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : new Map());
      });

    case (UPDATE_ENDPOINT_FULFILLED):
      return state.withMutations(m => m.set('dirty', false).set('validationErrors', null).set('saving', false).set('show', false));

    default:
      return state;

  }

}
