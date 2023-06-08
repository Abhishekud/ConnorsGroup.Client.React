import {http} from '../../shared/services';

export const GET_DASHBOARD_STATS = 'GET_DASHBOARD_STATS';
export const GET_DASHBOARD_STATS_PENDING = `${GET_DASHBOARD_STATS}_PENDING`;
export const GET_DASHBOARD_STATS_FULFILLED = `${GET_DASHBOARD_STATS}_FULFILLED`;
export const GET_DASHBOARD_STATS_REJECTED = `${GET_DASHBOARD_STATS}_REJECTED`;

export function getDashboardStats() {
  return {
    type: GET_DASHBOARD_STATS,
    payload: http.get('dashboard/list'),
  };
}
