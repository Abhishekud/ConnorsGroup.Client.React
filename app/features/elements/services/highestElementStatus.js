import {STATUS_ORDER, DRAFT} from '../../standards/constants/standardStatuses';

export default function (selectedElements, elements) {
  const selectedElementIds = selectedElements.keySeq().toArray();
  let highestStatus = DRAFT;
  const filteredElements = elements.filter(x => selectedElementIds.indexOf(x.get('id')) >= 0);
  for (const status of STATUS_ORDER) {
    if (filteredElements.some(se => se.get('status') === status)) highestStatus = status;
  }
  return highestStatus;
}
