import {fromJS, Map} from 'immutable';
import {
  SET_PROPERTY_FOR_EDIT,
  CANCEL_EDIT,
  DELETE,
  ADD_ABSOLUTE_HOURS_LIST_ITEM_FOR_EDIT,
  ADD_OPERATION_HOURS_LIST_ITEM_FOR_EDIT,
  ADD_AFTER_OPEN_HOURS_LIST_ITEM_FOR_EDIT,
  ADD_AFTER_CLOSE_HOURS_LIST_ITEM_FOR_EDIT,

  REMOVE_LABOR_PERIOD_LIST_ITEM_FOR_EDIT,

  SET_ABSOLUTE_HOURS_LIST_ITEM_PROPERTY_FOR_EDIT,
  SET_OPERATION_HOURS_LIST_ITEM_PROPERTY_FOR_EDIT,
  SET_AFTER_OPEN_HOURS_LIST_ITEM_PROPERTY_FOR_EDIT,
  SET_AFTER_CLOSE_HOURS_LIST_ITEM_PROPERTY_FOR_EDIT,

  LOAD_LABOR_PERIOD_FULFILLED,
  SAVE_EDIT_FULFILLED,
  SAVE_EDIT_PENDING,
  SAVE_EDIT_REJECTED,
  CLEAR_MODEL,
} from '../../actions';
import {KRONOS_LABOR_PERIOD_TYPE_ENUM_INDEX} from '../../../constants/KronosLaborPeriodTypes';
import {processLaborPeriodModelForEdit} from './../../services/';

const initialState = fromJS({
  show: false,
  saving: false,
  model: new Map(),
  dirty: false,
  validationErrors: new Map(),
});

const initialLaborPeriod = fromJS([]);
const absoluteHoursMap = new Map(
  {
    day: '',
    timeField1: new Map({hour: '', minute: ''}),
    timeField2: new Map({hour: '', minute: ''}),
    laborPeriodType: KRONOS_LABOR_PERIOD_TYPE_ENUM_INDEX.ABSOLUTE_HOURS,
  });
const operationHoursMap = new Map({
  day: '',
  laborPeriodType: KRONOS_LABOR_PERIOD_TYPE_ENUM_INDEX.OPERATION_HOURS,
});
const afterOpenHoursMap = new Map({
  day: '',
  timeField1: new Map({hour: '', minute: '', negativeZero: false}),
  timeField2: new Map({hour: '', minute: '', negativeZero: false}),
  laborPeriodType: KRONOS_LABOR_PERIOD_TYPE_ENUM_INDEX.AFTER_OPEN_HOURS,
});
const afterCloseHoursMap = new Map({
  day: '',
  timeField1: new Map({hour: '', minute: '', negativeZero: false}),
  timeField2: new Map({hour: '', minute: '', negativeZero: false}),
  laborPeriodType: KRONOS_LABOR_PERIOD_TYPE_ENUM_INDEX.AFTER_CLOSE_HOURS,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case CANCEL_EDIT:
    case DELETE:
      return initialState;

    case SAVE_EDIT_FULFILLED:
      return initialState;
    case SAVE_EDIT_PENDING:
      return state.set('saving', true);
    case SAVE_EDIT_REJECTED: {
      const {status, data} = action.payload.response;
      return state.set('saving', false).set('validationErrors', status === 400 ? fromJS(data) : Map());
    }

    case SET_PROPERTY_FOR_EDIT: {
      if (action.payload.id === 'laborPeriodType') {
        return state
          .setIn(['model', 'laborPeriodType'], action.payload.value)
          .setIn(['model', 'laborPeriodDays'], initialLaborPeriod)
          .set('dirty', true);
      } else if (action.payload.id === 'trafficPatternType') {
        return state
          .setIn(['model', 'trafficPatternType'], action.payload.value)
          .set('dirty', true);
      } else if (action.payload.id === 'laborDistributionType') {
        return state
          .setIn(['model', 'laborDistributionType'], action.payload.value)
          .set('dirty', true);
      }
      return state.setIn(['model', action.payload.id], action.payload.value).set('dirty', true);
    }

    case ADD_ABSOLUTE_HOURS_LIST_ITEM_FOR_EDIT:
      return state.updateIn(['model', 'laborPeriodDays'],
        laborPeriodList => laborPeriodList.push(absoluteHoursMap)).set('dirty', true);
    case ADD_OPERATION_HOURS_LIST_ITEM_FOR_EDIT:
      return state.updateIn(['model', 'laborPeriodDays'],
        laborPeriodList => laborPeriodList.push(operationHoursMap)).set('dirty', true);
    case ADD_AFTER_OPEN_HOURS_LIST_ITEM_FOR_EDIT:
      return state.updateIn(['model', 'laborPeriodDays'],
        laborPeriodList => laborPeriodList.push(afterCloseHoursMap)).set('dirty', true);
    case ADD_AFTER_CLOSE_HOURS_LIST_ITEM_FOR_EDIT:
      return state.updateIn(['model', 'laborPeriodDays'],
        laborPeriodList => laborPeriodList.push(afterOpenHoursMap)).set('dirty', true);

    case REMOVE_LABOR_PERIOD_LIST_ITEM_FOR_EDIT:
      return state.deleteIn(['model', 'laborPeriodDays', action.payload.index]).set('dirty', true);

    case SET_ABSOLUTE_HOURS_LIST_ITEM_PROPERTY_FOR_EDIT:
    case SET_OPERATION_HOURS_LIST_ITEM_PROPERTY_FOR_EDIT:
    case SET_AFTER_OPEN_HOURS_LIST_ITEM_PROPERTY_FOR_EDIT:
    case SET_AFTER_CLOSE_HOURS_LIST_ITEM_PROPERTY_FOR_EDIT:
      return state.setIn(['model', 'laborPeriodDays', action.payload.index, action.payload.id], action.payload.value).set('dirty', true);

    case LOAD_LABOR_PERIOD_FULFILLED: {
      return state.set('model', processLaborPeriodModelForEdit(fromJS(action.payload.data)))
        .set('dirty', false);
    }
    case CLEAR_MODEL:
      return initialState;
  }
  return state;
}

