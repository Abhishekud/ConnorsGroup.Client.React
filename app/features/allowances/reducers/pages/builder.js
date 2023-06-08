import {Map, fromJS} from 'immutable';
import {modelsArrayToRecordMapById} from '../../../shared/services';
import {
  LOAD_ALLOWANCE_PENDING,
  LOAD_ALLOWANCE_FULFILLED,
  LOAD_ALLOWANCE_REJECTED,
  TOGGLE_ALLOWANCE_TIME_GROUP,
  UPDATE_ALLOWANCE_PENDING,
  UPDATE_ALLOWANCE_FULFILLED,
  UPDATE_ALLOWANCE_REJECTED,
  CREATE_ALLOWANCE_TIME_FULFILLED,
  EDIT_ALLOWANCE_TIME,
  SET_ALLOWANCE_TIME_MODEL_PROPERTY,
  CANCEL_EDIT_ALLOWANCE_TIME,
  UPDATE_ALLOWANCE_TIME_PENDING,
  UPDATE_ALLOWANCE_TIME_FULFILLED,
  UPDATE_ALLOWANCE_TIME_REJECTED,
  DELETE_ALLOWANCE_TIME_FULFILLED,
} from '../../actions';
import {AllowanceModel, AllowanceTimeModel} from '../../models';
import {allowanceTimeTypes} from '../../constants';

const initialState = Map({
  loading: false,
  saving: false,

  allowance: new AllowanceModel(),
  allowanceTimes: Map(),
  allowanceTimeGroupsStates: fromJS({
    [allowanceTimeTypes.UNPAID]: {collapsed: false},
    [allowanceTimeTypes.EXCLUDED_PAID]: {collapsed: false},
    [allowanceTimeTypes.INCLUDED_PAID_SCHEDULED]: {collapsed: false},
    [allowanceTimeTypes.INCLUDED_PAID_UNSCHEDULED]: {collapsed: false},
    [allowanceTimeTypes.INCLUDED_PAID_OTHER]: {collapsed: false},
    [allowanceTimeTypes.DELAY]: {collapsed: false},
    [allowanceTimeTypes.REST]: {collapsed: false},
    [allowanceTimeTypes.PERCENTAGES]: {collapsed: false},
  }),
  allowanceTimesStates: Map(),
  allowanceTimesValidationErrors: Map(),
  pristineAllowanceTimes: Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_ALLOWANCE_PENDING:
      return initialState.set('loading', true);

    case LOAD_ALLOWANCE_FULFILLED: {
      const {allowance, times} = action.payload.data;

      const allowanceTimesStates = Map().asMutable();
      for (const time of times) allowanceTimesStates.set(time.id, Map({editing: false}));

      return state.withMutations(map => {
        map.set('loading', false)
          .set('allowance', new AllowanceModel(allowance))
          .set('allowanceTimes', modelsArrayToRecordMapById(times, AllowanceTimeModel))
          .set('allowanceTimesStates', allowanceTimesStates.asImmutable());
      });
    }

    case LOAD_ALLOWANCE_REJECTED:
      return state.set('loading', false);

    case UPDATE_ALLOWANCE_PENDING:
      return state.set('saving', true);

    case UPDATE_ALLOWANCE_FULFILLED:
      return state.withMutations(map =>
        map.set('saving', false)
          .set('allowance', new AllowanceModel(action.payload.data)));

    case UPDATE_ALLOWANCE_REJECTED:
      return state.set('saving', false);

    case TOGGLE_ALLOWANCE_TIME_GROUP:
      return state.updateIn(['allowanceTimeGroupsStates', action.payload, 'collapsed'], collapsed => !collapsed);

    case CREATE_ALLOWANCE_TIME_FULFILLED: {
      const {allowance, allowanceTime} = action.payload.data;

      return state.withMutations(map =>
        map.setIn(['allowanceTimes', allowanceTime.id], new AllowanceTimeModel(allowanceTime))
          .set('allowance', new AllowanceModel(allowance)));
    }

    case EDIT_ALLOWANCE_TIME: {
      const id = action.payload;
      const allowanceTime = state.getIn(['allowanceTimes', id]);

      return state.withMutations(map =>
        map.setIn(['allowanceTimesStates', id, 'editing'], true)
          .setIn(['pristineAllowanceTimes', id], allowanceTime));
    }

    case SET_ALLOWANCE_TIME_MODEL_PROPERTY: {
      const {id, name, value} = action.payload;

      return state.setIn(['allowanceTimes', id, name], value);
    }

    case CANCEL_EDIT_ALLOWANCE_TIME: {
      const id = action.payload;

      return state.withMutations(map =>
        map.setIn(['allowanceTimesStates', id, 'editing'], false)
          .setIn(['allowanceTimes', id], map.getIn(['pristineAllowanceTimes', id]))
          .deleteIn(['pristineAllowanceTimes', id]));
    }

    case UPDATE_ALLOWANCE_TIME_PENDING:
      return state.set('saving', true);

    case UPDATE_ALLOWANCE_TIME_FULFILLED: {
      const {allowance, allowanceTime} = action.payload.data;

      return state.withMutations(map =>
        map.set('saving', false)
          .setIn(['allowanceTimes', allowanceTime.id], new AllowanceTimeModel(allowanceTime))
          .set('allowance', new AllowanceModel(allowance))
          .setIn(['allowanceTimesStates', allowanceTime.id, 'editing'], false)
          .deleteIn(['allowanceTimesValidationErrors', allowanceTime.id])
          .deleteIn(['pristineAllowanceTimes', allowanceTime.id]));
    }

    case UPDATE_ALLOWANCE_TIME_REJECTED: {
      const {payload} = action;
      const {id: allowanceTimeId} = JSON.parse(payload.config.data);
      const {status, data} = payload.response || {};

      return state.withMutations(map => {
        map.set('saving', false);

        if (status === 400) {
          const validationErrors = fromJS(data);

          map.setIn(['allowanceTimesValidationErrors', allowanceTimeId], validationErrors);
        } else {
          map.deleteIn(['allowanceTimesValidationErrors', allowanceTimeId]);
        }
      });
    }

    case DELETE_ALLOWANCE_TIME_FULFILLED: {
      const {allowance, allowanceTimeId} = action.payload.data;

      return state.withMutations(map =>
        map.deleteIn(['allowanceTimes', allowanceTimeId])
          .set('allowance', new AllowanceModel(allowance)));
    }

    default:
      return state;
  }
}
