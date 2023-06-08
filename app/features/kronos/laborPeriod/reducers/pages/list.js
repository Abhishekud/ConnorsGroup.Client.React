import {fromJS} from 'immutable';
import {
  SORT_LABOR_PERIODS,
  FILTER_LABOR_PERIODS,


  LOAD_LABOR_PERIODS_LIST_FULFILLED,

  IMPORT_LABOR_PERIODS_PENDING,
  CLEAR_LABOR_PERIOD_LIST_FILTERS,
  CLEAR_LABOR_PERIOD_LIST_SORTS,
  SET_IS_LABOR_PERIODS_EXPORT_IMPORT_TEMPLATE_BACKGROUND_JOB,
} from '../../actions';

import {POLL_BACKGROUND_JOBS_FULFILLED} from '../../../../shared/actions/index';
import {KRONOS_LABOR_PERIOD_IMPORTER, KRONOS_LABOR_PERIOD_EXPORTER, KRONOS_LABOR_PERIODS_IMPORT_TEMPLATE_EXPORTER} from '../../../../shared/constants/backgroundJobs';
const initialState = fromJS({
  sort: null,
  filter: null,
  activeBackgroundJobs: false,
  backgroundJobStarted: false,
  isLaborPeriodsTemplateExportBackgroundJob: false,
});

export default function (state = initialState, action) {
  switch (action.type) {

    case LOAD_LABOR_PERIODS_LIST_FULFILLED:
      return state.set('backgroundJobStarted', false);

    case SORT_LABOR_PERIODS:
      return state.set('sort', action.payload);
    case FILTER_LABOR_PERIODS:
      return state.set('filter', action.payload);

    case IMPORT_LABOR_PERIODS_PENDING:
      return state.withMutations(map => {
        map.set('activeBackgroundJobs', true);
      });
    case POLL_BACKGROUND_JOBS_FULFILLED: {
      const {activeJobs, backgroundJobTypes} = action.payload.data;

      if (backgroundJobTypes.includes(KRONOS_LABOR_PERIOD_IMPORTER) || backgroundJobTypes.includes(KRONOS_LABOR_PERIOD_EXPORTER) ||
      backgroundJobTypes.includes(KRONOS_LABOR_PERIODS_IMPORT_TEMPLATE_EXPORTER)) {
        return state.withMutations(map => {
          if (activeJobs) map.set('backgroundJobStarted', true);
          map.set('activeBackgroundJobs', activeJobs);
        });
      }

      return state;
    }

    case CLEAR_LABOR_PERIOD_LIST_FILTERS:
      return state.set('filter', initialState.get('filter'));

    case CLEAR_LABOR_PERIOD_LIST_SORTS:
      return state.set('sort', initialState.get('sort'));

    case SET_IS_LABOR_PERIODS_EXPORT_IMPORT_TEMPLATE_BACKGROUND_JOB:
      return state.set('isLaborPeriodsTemplateExportBackgroundJob', action.payload);
  }
  return state;
}
