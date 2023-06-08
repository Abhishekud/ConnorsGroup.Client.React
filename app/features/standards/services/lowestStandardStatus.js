import {STATUS_ORDER} from '../constants/standardStatuses';

export default function (selectedStandards) {
  for (const status of STATUS_ORDER) {
    if (selectedStandards.some(se => se.get('status') === status)) return status;
  }
  return '';
}
