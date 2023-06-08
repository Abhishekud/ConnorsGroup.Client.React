import {List, Map, fromJS} from 'immutable';
import {LOAD_VOLUME_DRIVER_MAPPING_VARIABLES_LIST_FULFILLED, LOAD_VOLUME_DRIVER_MAPPING_VARIABLES_LIST_REJECTED} from '../../actions/loadVolumeDriverMappingVariablesList';
import {LOAD_VOLUME_DRIVER_MAPPING_SETS_LIST_FULFILLED, LOAD_VOLUME_DRIVER_MAPPING_SETS_LIST_REJECTED} from '../../../volumeDriverMappings/actions';
import {CLEAR_VOLUME_DRIVER_MAPPING_VARIABLES_LIST_FILTERS, CLEAR_VOLUME_DRIVER_MAPPING_VARIABLES_LIST_SORTS, FILTER_VOLUME_DRIVER_MAPPING_VARIABLES_LIST_FULFILLED, LOAD_VOLUME_DRIVER_MAPPING_VARIABLES_PAGE, SHOULD_RELOAD_VOLUME_DRIVER_MAPPING_VARIABLES_PAGE, SORT_VOLUME_DRIVER_MAPPING_VARIABLES_LIST_FULFILLED} from '../../actions';
import {SET_SKIP_RECORDS_FULFILLED} from '../../actions/setSkipRecords';
import {DEFAULT_TAKE_SIZE} from '../../../shared/constants/defaultTakeSize';
import {PAGE_SIZE} from '../../../shared/constants/virtualPaging';

const initialState = new Map({
  loading: false,
  sorts: List(),
  filters: Map(),
  skipRecords: 0,
  takeRecords: DEFAULT_TAKE_SIZE,
  pageSize: PAGE_SIZE / 2,
  totalRecords: 0,
  volumeDriverMappingVariables: [],
  volumeDriverMappingSets: List(),
  selectedDepartmentId: null,
  volumeDriverMappingSetIds: [],
  shouldReloadVolumeDriverMappingVariablesList: false,
});

function resetPageData(state) {
  return state.withMutations(map => {
    map.set('skipRecords', initialState.get('skipRecords'))
      .set('volumeDriverMappingVariables', initialState.get('volumeDriverMappingVariables'))
      .set('totalRecords', initialState.get('totalRecords'));
  });
}

function mergeVolumeDriverMappingVariables(state, newVolumeDriverMappingVariables, skip) {
  const volumeDriverMappingVariables = skip === 0
    ? new Array(state.get('totalRecords')).fill().map((e, i) => ({index: i})) : state.get('volumeDriverMappingVariables');

  newVolumeDriverMappingVariables.forEach((volumeDriveMappingVariable, i) => {
    volumeDriverMappingVariables[i + skip] = {index: i + skip, ...volumeDriveMappingVariable};
  });
  return volumeDriverMappingVariables;
}

export default function (state = initialState, action) {
  switch (action.type) {

    case LOAD_VOLUME_DRIVER_MAPPING_VARIABLES_PAGE: {
      return state.set('loading', true);
    }

    case SHOULD_RELOAD_VOLUME_DRIVER_MAPPING_VARIABLES_PAGE: {
      const updatedState = state.set('shouldReloadVolumeDriverMappingVariablesList', true);
      return resetPageData(updatedState);
    }

    case LOAD_VOLUME_DRIVER_MAPPING_SETS_LIST_FULFILLED: {
      const {departmentId, volumeDriverMappingSets} = action.payload.data;

      const updatedState = state.withMutations(map =>
        map.set('selectedDepartmentId', departmentId)
          .set('volumeDriverMappingSets', fromJS(volumeDriverMappingSets))
          .set('volumeDriverMappingSetIds', volumeDriverMappingSets.map(set => set.id))
          // This case is also called from the VDM page so to set 'shouldReloadVolumeDriverMappingVariablesList'
          // we are checking the 'loading' state, so if its true that means we are in VDM Variables page
          .set('shouldReloadVolumeDriverMappingVariablesList', state.get('loading'))
      );
      return resetPageData(updatedState);
    }

    case LOAD_VOLUME_DRIVER_MAPPING_VARIABLES_LIST_FULFILLED: {
      const {total, volumeDriverMappingVariables, skip} = action.payload.data;
      return state.withMutations(map =>
        map.set('totalRecords', total)
          .set('volumeDriverMappingVariables', mergeVolumeDriverMappingVariables(map, volumeDriverMappingVariables, skip))
          .set('loading', false))
        .set('shouldReloadVolumeDriverMappingVariablesList', false);
    }

    case LOAD_VOLUME_DRIVER_MAPPING_SETS_LIST_REJECTED:
    case LOAD_VOLUME_DRIVER_MAPPING_VARIABLES_LIST_REJECTED: {
      return state.withMutations(map =>
        map.set('loading', false)
          .set('shouldReloadVolumeDriverMappingVariablesList', false));
    }

    case SORT_VOLUME_DRIVER_MAPPING_VARIABLES_LIST_FULFILLED: {
      return state.setIn(['sorts', state.get('selectedDepartmentId')], action.payload);
    }

    case FILTER_VOLUME_DRIVER_MAPPING_VARIABLES_LIST_FULFILLED: {
      return state.setIn(['filters', state.get('selectedDepartmentId')], action.payload);
    }

    case SET_SKIP_RECORDS_FULFILLED: {
      return state.set('skipRecords', action.payload);
    }

    case CLEAR_VOLUME_DRIVER_MAPPING_VARIABLES_LIST_FILTERS: {
      const updatedState = state.withMutations(map =>
        map.setIn(['filters', state.get('selectedDepartmentId')], null)
          .set('shouldReloadVolumeDriverMappingVariablesList', true));
      return resetPageData(updatedState);
    }

    case CLEAR_VOLUME_DRIVER_MAPPING_VARIABLES_LIST_SORTS: {
      const updatedState = state.withMutations(map =>
        map.setIn(['sorts', state.get('selectedDepartmentId')], null)
          .set('shouldReloadVolumeDriverMappingVariablesList', true));
      return resetPageData(updatedState);
    }

    default:
      return state;
  }
}
