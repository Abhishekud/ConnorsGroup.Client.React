import {Map} from 'immutable';
import {BACKGROUND_JOB_FINISHED} from '../../actions';
import {POLL_BACKGROUND_JOBS_FULFILLED} from '../../../shared/actions';

const initialState = new Map({
  activeBackgroundJobs: false,
  backgroundJobStarted: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case BACKGROUND_JOB_FINISHED:
      return state.withMutations(map => map.set('backgroundJobStarted', false));

    case POLL_BACKGROUND_JOBS_FULFILLED: {
      const activeJobs = action.payload.data.activeJobs;

      return state.withMutations(map => {
        if (activeJobs) map.set('backgroundJobStarted', true);
        map.set('activeBackgroundJobs', activeJobs);
      });
    }

    default:
      return state;
  }
}
