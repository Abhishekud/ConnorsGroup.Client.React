import {STATUS_ORDER, DRAFT} from '../constants/standardStatuses';

export default function (selectedStandards) {
  let highestStatus = DRAFT;
  for (const status of STATUS_ORDER) {
    if (selectedStandards.some(se => se.get('status') === status)) highestStatus = status;
  }
  return highestStatus;
}
