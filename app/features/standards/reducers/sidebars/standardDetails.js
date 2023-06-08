import {fromJS, Map} from 'immutable';
import {modelsArrayToMapById} from '../../../shared/services';
import {
  CANCEL_EDIT_STANDARD_DETAILS,
  CREATE_STANDARD_FULFILLED,
  EDIT_STANDARD_DETAILS,
  LOAD_STANDARD_DETAILS_FULFILLED,
  LOAD_STANDARD_FULFILLED,
  LOAD_STANDARD_PENDING,
  LOAD_STANDARD_REJECTED,
  LOAD_STANDARD_REVISION_FULFILLED,
  LOAD_STANDARD_REVISION_PENDING,
  SET_STANDARD_DETAIL_FILING_FIELD_MODEL_PROPERTY,
  SET_STANDARD_DETAIL_MODEL_PROPERTY,
  TOGGLE_STANDARD_DETAILS_SIDEBAR,
  TOGGLE_STANDARD_STATUS_LOG_COMMENT,
  UPDATE_STANDARD_FULFILLED,
  UPDATE_STANDARD_PENDING,
  UPDATE_STANDARD_REJECTED,
} from '../../actions';

const initialState = Map({
  newStandard: false,
  open: false,

  id: null,
  model: Map({
    filingFieldValues: Map(),
  }),
  pristineModel: Map(),
  validationErrors: Map(),
  editing: false,
  saving: false,

  statusLogs: Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_STANDARD_FULFILLED:
      return state.set('newStandard', true);

    case LOAD_STANDARD_REVISION_PENDING:
    case LOAD_STANDARD_PENDING:
      return state.set('open', false);

    case LOAD_STANDARD_REVISION_FULFILLED:
    case LOAD_STANDARD_FULFILLED: {
      const {id, details} = action.payload.data;
      const model = fromJS(details);

      return state.withMutations(map =>
        map.set('open', map.get('newStandard'))
          .set('newStandard', false)
          .set('id', id)
          .set('pristineModel', model)
          .set('model', model)
          .set('validationErrors', Map())
          .set('editing', false)
          .set('saving', false)
          .set('statusLogs', modelsArrayToMapById(details.standardStatusLogs)));
    }

    case LOAD_STANDARD_DETAILS_FULFILLED:
      return state.set('model', fromJS(action.payload.data));

    case SET_STANDARD_DETAIL_MODEL_PROPERTY: {
      const {name, value} = action.payload;
      return state.setIn(['model', name], value);
    }

    case SET_STANDARD_DETAIL_FILING_FIELD_MODEL_PROPERTY: {
      const {id, value} = action.payload;
      const filingFields = state.getIn(['model', 'filingFieldValues']);
      if (filingFields === null) {
        return state.setIn(['model', 'filingFieldValues'],
          fromJS([{standardFilingFieldId: id, standardFileFieldOptionId: value}]));
      }
      const index = filingFields.findIndex(y => y.get('standardFilingFieldId') === id);
      return state.updateIn(['model', 'filingFieldValues'], x => {
        if (index === -1) {
          if (value === null) return x;
          return x.push(fromJS({
            standardFilingFieldId: id,
            standardFilingFieldOptionId: value,
          }));
        }
        if (value === null) {
          return x.delete(index);
        }
        return x.set(index, fromJS({
          standardFilingFieldId: id,
          standardFilingFieldOptionId: value,
        }));
      });
    }

    case LOAD_STANDARD_REJECTED:
      return initialState;

    case TOGGLE_STANDARD_DETAILS_SIDEBAR: {
      if (state.get('open')) {
        return state.withMutations(map =>
          map.set('open', false)
            .set('model', map.get('pristineModel'))
            .set('validationErrors', Map())
            .set('editing', false)
        );
      }

      return state.set('open', true);
    }

    case EDIT_STANDARD_DETAILS:
      return state.set('editing', true);

    case CANCEL_EDIT_STANDARD_DETAILS:
      return state.withMutations(map =>
        map.set('model', map.get('pristineModel'))
          .set('validationErrors', Map())
          .set('editing', false)
      );

    case UPDATE_STANDARD_PENDING:
      return state.set('saving', true);

    case UPDATE_STANDARD_FULFILLED: {
      const {details} = action.payload.data;
      const model = fromJS(details);

      return state.withMutations(map =>
        map.set('model', model)
          .set('pristineModel', model)
          .set('validationErrors', Map())
          .set('editing', false)
          .set('saving', false)
          .set('statusLogs', modelsArrayToMapById(details.standardStatusLogs))
      );
    }

    case UPDATE_STANDARD_REJECTED:
      return state.withMutations(map => {
        map.set('saving', false);

        const {status, data} = action.payload.response || {};
        map.set('validationErrors', status === 400 ? fromJS(data) : Map());
      });

    case TOGGLE_STANDARD_STATUS_LOG_COMMENT: {
      const {commentId} = action.payload;
      const showComment = state.getIn(['statusLogs', commentId, 'showComment']);

      return state.setIn(['statusLogs', commentId, 'showComment'], !showComment);
    }

    default:
      return state;
  }
}
