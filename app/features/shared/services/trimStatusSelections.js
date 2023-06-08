import {ARCHIVE, DRAFT, PRODUCTION, READY_FOR_QA, STATUS_ORDER} from '../../standards/constants/standardStatuses';

export default function (statuses, prestineStatus, canManageProduction) {
  let status = prestineStatus;
  if (status === ARCHIVE) status = PRODUCTION;
  let index = 0;
  if (status !== READY_FOR_QA) {
    index = STATUS_ORDER.findIndex(s => s === status);
  }
  const trimmedStatuses = statuses.slice(index);
  if (!canManageProduction && (prestineStatus === DRAFT || prestineStatus === READY_FOR_QA)) {
    const index = trimmedStatuses.findIndex(x => x.value === PRODUCTION);
    return trimmedStatuses.slice(0, index);
  }
  return trimmedStatuses;
}
