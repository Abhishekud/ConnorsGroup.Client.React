import {http} from '../../../shared/services';
import {SUBMIT_LABOR_STANDARDS_INTEGRATION_REQUEST} from './submitLaborStandardsIntegrationRequest';

export function submitAllLaborStandardsIntegrationRequest(endpointId, filter) {
  return {
    type: SUBMIT_LABOR_STANDARDS_INTEGRATION_REQUEST,
    payload: http.post('kronos/integrationrequest', {endpointId, filter, allStandardsSelected: true}),
  };
}
