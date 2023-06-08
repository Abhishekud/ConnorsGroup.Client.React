import {Map, List, fromJS} from 'immutable';
import {
  SHOW_CREATE_EXPORT_REQUEST,
  SET_CREATE_EXPORT_REQUEST_MODEL_PROPERTY,
  CANCEL_CREATE_EXPORT_REQUEST,
  CREATE_EXPORT_REQUEST_PENDING,
  CREATE_EXPORT_REQUEST_FULFILLED,
  CREATE_EXPORT_REQUEST_REJECTED,
} from '../../actions';

const initialState = new Map({
  show: false,
  saving: false,
  validationErrors: new Map(),
  model: new Map({
    fileName: '',
    filters: '',
    timeFormat: null,
    selectedIds: List(),
  }),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_CREATE_EXPORT_REQUEST: {
      const {filters, timeFormat, selectedIds} = action.payload;

      return state.withMutations(map =>
        map.set('show', true)
          .set('saving', false)
          .set('validationErrors', Map())
          .set('model', Map({
            fileName: '',
            filters: JSON.stringify(filters || {}),
            timeFormat: timeFormat || null,
            selectedIds: List(selectedIds || []),
          }))
      );
    }

    case SET_CREATE_EXPORT_REQUEST_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case CANCEL_CREATE_EXPORT_REQUEST:
      return state.set('show', false);

    case CREATE_EXPORT_REQUEST_PENDING:
      return state.set('saving', true);

    case CREATE_EXPORT_REQUEST_FULFILLED:
      return state.withMutations(map =>
        map.set('show', false)
          .set('saving', false));

    case CREATE_EXPORT_REQUEST_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    default:
      return state;
  }
}
