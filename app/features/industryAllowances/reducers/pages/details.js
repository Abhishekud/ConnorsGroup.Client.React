import {fromJS, Map} from 'immutable';
import {allowanceTimeTypes} from '../../../allowances/constants';
import {modelsArrayToRecordMapById} from '../../../shared/services';
import {
  LOAD_INDUSTRY_TYPICAL_ALLOWANCE_PENDING,
  LOAD_INDUSTRY_TYPICAL_ALLOWANCE_FULFILLED,
  LOAD_INDUSTRY_TYPICAL_ALLOWANCE_REJECTED,
  TOGGLE_ALLOWANCE_TIME_GROUP,
} from '../../actions';
import {AllowanceModel, AllowanceTimeModel} from '../../models';

const initialState = Map({
  show: false,
  loading: false,
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
});

export default function (state = initialState, action) {
  switch (action.type) {

    case LOAD_INDUSTRY_TYPICAL_ALLOWANCE_PENDING:
      return state.set('loading', true);

    case LOAD_INDUSTRY_TYPICAL_ALLOWANCE_FULFILLED: {
      const {allowance, times} = action.payload.data;
      const allowanceTimesStates = Map().asMutable();
      for (const time of times) {
        allowanceTimesStates.set(time.id, Map());
      }

      return state.withMutations(map => {
        map.set('loading', false)
          .set('allowance', new AllowanceModel(allowance))
          .set('allowanceTimes', modelsArrayToRecordMapById(times, AllowanceTimeModel))
          .set('allowanceTimesStates', allowanceTimesStates.asImmutable());
      }); }

    case LOAD_INDUSTRY_TYPICAL_ALLOWANCE_REJECTED:
      return state.set('loading', true);

    case TOGGLE_ALLOWANCE_TIME_GROUP:
      return state.updateIn(['allowanceTimeGroupsStates', action.payload, 'collapsed'], collapsed => !collapsed);

    default:
      return state;
  }
}
