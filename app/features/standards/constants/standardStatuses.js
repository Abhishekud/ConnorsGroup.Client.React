export const DRAFT = 'Draft';
export const READY_FOR_QA = 'ReadyForQA';
export const PRODUCTION = 'Production';
export const ARCHIVE = 'Archive';
export const STATUS_ORDER = [
  DRAFT,
  READY_FOR_QA,
  PRODUCTION,
  ARCHIVE,
];

export function titleText(status, includeProduction) {
  switch (status) {
    case DRAFT:
      return '(DRAFT)';
    case READY_FOR_QA:
      return '(READY FOR QA)';
    case ARCHIVE:
      return '(ARCHIVE)';
    case PRODUCTION:
      if (includeProduction) return '(PRODUCTION)';
      return '';
    default:
      return '';
  }
}

export function statusClass(status) {
  switch (status) {
    case DRAFT:
      return 'draft';
    case READY_FOR_QA:
      return 'ready-for-qa';
    case ARCHIVE:
      return 'archive';
    default:
      return '';
  }
}

export function displayName(status) {
  switch (status) {
    case DRAFT:
      return 'Draft';
    case READY_FOR_QA:
      return 'Ready for QA';
    case ARCHIVE:
      return 'Archive';
    case PRODUCTION:
      return 'Production';
    default:
      return '';
  }
}
