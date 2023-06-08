import {modelsArrayToOrderedMapById} from '../../../shared/services';
import {Map, List, fromJS} from 'immutable';
import {
  LOAD_VOLUME_DRIVER_VALUE_SETS_LIST_PENDING,
  LOAD_VOLUME_DRIVER_VALUE_SETS_LIST_FULFILLED,
  LOAD_VOLUME_DRIVER_VALUE_SETS_LIST_REJECTED,
  PAGE_VOLUME_DRIVER_VALUE_SETS_LIST,
  SELECT_VOLUME_DRIVER_VALUE_SET,
  SORT_VOLUME_DRIVER_VALUE_SETS_LIST,
  FILTER_VOLUME_DRIVER_VALUE_SETS_LIST,
  CLEAR_VOLUME_DRIVER_VALUE_SETS_FILTERS,
  CLEAR_VOLUME_DRIVER_VALUE_SETS_SORTS,
  CLEAR_SELECTED_VOLUME_DRIVER_VALUE_SET,
  CLOSE_VOLUME_DRIVER_VALUE_SET_LIST_EDIT_SIDEBAR,
  CREATE_VOLUME_DRIVER_VALUE_SET_PENDING,
  UPDATE_VOLUME_DRIVER_VALUE_SET_FULFILLED,
  DELETE_VOLUME_DRIVER_VALUE_SET_FULFILLED,
  TOGGLE_SELECT_VOLUME_DRIVER_VALUE_SET,
  SELECT_ALL_VOLUME_DRIVER_VALUE_SETS,
  SET_LOCATION_STANDARDS_DATA_SOURCE,
  CREATE_LOCATION_STANDARDS_EXPORT_REQUEST_FOR_VDV_SETS_BACKGROUND_JOB_FULFILLED,
  SET_IS_EXPORT_SELECTED_VDV_SETS_BACKGROUND_JOB,
  CREATE_VDV_EXPORT_REQUEST_FOR_SELECTED_VDV_SETS_BACKGROUND_JOB_FULFILLED,
} from '../../actions';
import {DEFAULT_TAKE_SIZE} from '../../../shared/constants/defaultTakeSize';
import {POLL_BACKGROUND_JOBS_FULFILLED} from '../../../shared/actions/index';
import {VOLUME_DRIVER_VALUE_IMPORTER, LOCATION_STANDARDS_FOR_VDV_SETS_EXPORTER, LOCATIONS_STANDARDS, CALCULATE_LABOR, VOLUME_DRIVER_VALUES_EXPORTER} from '../../../shared/constants/backgroundJobs';
import {DRAFT} from '../../../shared/constants/exportTypes';

const initialState = Map({
  loading: false,
  volumeDriverValueSets: Map(),
  take: DEFAULT_TAKE_SIZE,
  skip: 0,
  sort: new List(),
  filter: null,
  activeBackgroundJobs: false,
  backgroundJobStarted: false,
  selectedVolumeDriverValueSetId: null,
  headerSelectionValue: false,
  dataSource: DRAFT,
  activeLocationStandardsExportRequestForVDVSetsBackgroundJob: false,
  isSelectedVDVSetsExportRequest: false,
  activeVDVExportRequestForSelectedVDVSetsBackgroundJob: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_VOLUME_DRIVER_VALUE_SETS_LIST_PENDING:
      return state.set('loading', true);

    case LOAD_VOLUME_DRIVER_VALUE_SETS_LIST_FULFILLED:
      return state.withMutations(map =>
        map.set('loading', false)
          .set('backgroundJobStarted', false)
          .set('volumeDriverValueSets', modelsArrayToOrderedMapById(action.payload.data))
          .set('selectedVolumeDriverValueSetId', null)
          .set('headerSelectionValue', false));

    case LOAD_VOLUME_DRIVER_VALUE_SETS_LIST_REJECTED:
      return state.set('loading', false);

    case PAGE_VOLUME_DRIVER_VALUE_SETS_LIST:
      return state.set('skip', action.payload);

    case SORT_VOLUME_DRIVER_VALUE_SETS_LIST:
      return state.set('sort', action.payload);

    case FILTER_VOLUME_DRIVER_VALUE_SETS_LIST:{
      return state.withMutations(map =>
        map.set('filter', action.payload)
          .set('skip', initialState.get('skip'))
          .update('volumeDriverValueSets', volumeDriverValueSets => volumeDriverValueSets.map(volumeDriverValueSet => volumeDriverValueSet.set('selected', false)))
          .set('headerSelectionValue', false));
    }

    case CLEAR_VOLUME_DRIVER_VALUE_SETS_SORTS:
      return state.set('sort', initialState.get('sort'));

    case CLEAR_VOLUME_DRIVER_VALUE_SETS_FILTERS:
      return state.withMutations(map => {
        map.set('filter', initialState.get('filter'))
          .set('skip', initialState.get('skip'));
      });

    case POLL_BACKGROUND_JOBS_FULFILLED: {
      const {activeJobs, backgroundJobTypes} = action.payload.data;

      if (backgroundJobTypes.includes(VOLUME_DRIVER_VALUE_IMPORTER) || backgroundJobTypes.includes(LOCATION_STANDARDS_FOR_VDV_SETS_EXPORTER) || backgroundJobTypes.includes(LOCATIONS_STANDARDS) || backgroundJobTypes.includes(CALCULATE_LABOR) || backgroundJobTypes.includes(VOLUME_DRIVER_VALUES_EXPORTER)) {
        return state.withMutations(map => {
          if (activeJobs) map.set('backgroundJobStarted', true);
          map.set('activeBackgroundJobs', activeJobs);
        });
      }
      return state;
    }

    case CREATE_VOLUME_DRIVER_VALUE_SET_PENDING:
      return state.set('activeBackgroundJobs', true);

    case SELECT_VOLUME_DRIVER_VALUE_SET:
      return state.set('selectedVolumeDriverValueSetId', action.payload.get('id'));

    case CLEAR_SELECTED_VOLUME_DRIVER_VALUE_SET:
    case CLOSE_VOLUME_DRIVER_VALUE_SET_LIST_EDIT_SIDEBAR:
      return state.set('selectedVolumeDriverValueSetId', null);

    case UPDATE_VOLUME_DRIVER_VALUE_SET_FULFILLED: {
      const volumeDriverValueSets = action.payload.data;
      return state.withMutations(map => {
        if (volumeDriverValueSets.isDefault) {
          map.update('volumeDriverValueSets', vdvSet =>
            vdvSet.map(vdvs => vdvs.set('isDefault', false))
          );
        }
        map.setIn(['volumeDriverValueSets', volumeDriverValueSets.id], fromJS(volumeDriverValueSets));
      });
    }

    case DELETE_VOLUME_DRIVER_VALUE_SET_FULFILLED:
      return state.deleteIn(['volumeDriverValueSets', action.payload.data]);

    case TOGGLE_SELECT_VOLUME_DRIVER_VALUE_SET: {
      const index = state.get('volumeDriverValueSets').find(s => s.get('id') === action.payload.volumeDriverValueSetId);
      const newIndex = index.get('id');

      if (index === -1) throw new Error('Unknown Volume Driver Value Set selected');
      return state.withMutations(map => {
        map.setIn(['headerSelectionValue'], !map.get('volumeDriverValueSets').some(s => !s.get('selected')))
          .updateIn(['volumeDriverValueSets', newIndex, 'selected'], t => !t);
      });
    }

    case SELECT_ALL_VOLUME_DRIVER_VALUE_SETS: {
      const {ids, selected} = action.payload;
      return state.withMutations(map => {
        map.setIn(['headerSelectionValue'], selected);
        map.update('volumeDriverValueSets', volumeDriverValueSets => volumeDriverValueSets.map(volumeDriverValueSet => {
          if (ids.includes(volumeDriverValueSet.get('id'))) {
            return volumeDriverValueSet.set('selected', selected);
          }
          return volumeDriverValueSet.set('selected', false);
        }));
      });
    }

    case SET_LOCATION_STANDARDS_DATA_SOURCE:
      return state.set('dataSource', action.payload.dataSource);

    case CREATE_LOCATION_STANDARDS_EXPORT_REQUEST_FOR_VDV_SETS_BACKGROUND_JOB_FULFILLED: {
      const {backgroundedJob} = action.payload.data;
      return state.set('activeLocationStandardsExportRequestForVDVSetsBackgroundJob', backgroundedJob);
    }

    case CREATE_VDV_EXPORT_REQUEST_FOR_SELECTED_VDV_SETS_BACKGROUND_JOB_FULFILLED: {
      const {backgroundedJob} = action.payload.data;
      return state.set('activeVDVExportRequestForSelectedVDVSetsBackgroundJob', backgroundedJob);
    }

    case SET_IS_EXPORT_SELECTED_VDV_SETS_BACKGROUND_JOB:
      return state.set('isSelectedVDVSetsExportRequest', action.payload);

    default:
      return state;
  }
}
