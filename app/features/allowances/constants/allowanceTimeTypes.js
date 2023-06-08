export const UNPAID = 'Unpaid';
export const PAID = 'Paid';
export const EXCLUDED_PAID = 'ExcludedPaid';
export const ADJUSTED_PAID_TIME = 'AdjustedPaidTime;';
export const RELIEF = 'Relief';
export const TOTAL_INCLUDED_PAID = 'TotalIncludedPaid';
export const INCLUDED_PAID_SCHEDULED = 'IncludedPaidScheduled';
export const INCLUDED_PAID_UNSCHEDULED = 'IncludedPaidUnscheduled';
export const INCLUDED_PAID_OTHER = 'IncludedPaidOther';
export const REST = 'Rest';
export const REST_ALLOWED = 'RestAllowed';
export const DELAY = 'Delay';
export const PERCENTAGES = 'Percentages';

export function displayName(allowanceTimeType) {
  switch (allowanceTimeType) {
    case UNPAID:
      return 'Unpaid Time';

    case EXCLUDED_PAID:
      return 'Excluded Paid Time';

    case INCLUDED_PAID_SCHEDULED:
      return 'Included Paid Time - Scheduled';

    case INCLUDED_PAID_UNSCHEDULED:
      return 'Included Paid Time - Unscheduled';

    case INCLUDED_PAID_OTHER:
      return 'Included Paid Time - Other';

    default:
      return allowanceTimeType;
  }
}
