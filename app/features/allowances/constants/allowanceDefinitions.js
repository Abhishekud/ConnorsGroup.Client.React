export const ADDITIONAL_DELAY = 'Additional paid delay time when workers are not expected to be engaged in activities measured in labor standards. Examples: Warehouse congestion, unutilized time provided to maintain queue length expectations, etc.';
export const ALLOWANCE_FACTOR = 'Adjusted Paid Time / (Adjusted Paid Time - (Included Paid Time + Rest Time + Delay Time)) - 100%';
export const ALLOWANCE_PERCENT = '(Included Paid Time + Rest Time + Delay Time) / Adjusted Paid Time';
export const ADJUSTED_PAID_TIME = 'Adjusted Paid Time is the remaining time once Excluded Paid Time is removed and Relief Time is added.';
export const DELAY_TIME = 'Delays are best determined by a work sampling study to determine the extent of minor unavoidable delays. Effort should be made to correct the causes of delays; where they cannot be corrected, a delay allowance should be provided. If delays are corrected after the allowance has been applied, a new study should be taken (or parse the original study to remove the corrected delay). It is also acceptable to use the industry standard of 2% of The Available Paid Time for Allowance Application minus the the Allowed Paid Time.';
export const EXCLUDED_PAID_BREAKS = 'Excluded Paid Breaks are included in Excluded Paid Time, as they impact the allowed rest minutes. 1/2 of Excluded Paid Breaks are deducted from the allowed rest minutes. Value is entered in sidebar.';
export const EXCLUDED_PAID_TIME = 'Excluded Paid Time is time not accounted for in allowances or labor standards but rather accounted for in separate labor models, such as a labor management system or scheduling system.';
export const INCLUDED_PAID_BREAKS = 'Included Paid Breaks are included in Included Paid Time. Included Paid Breaks impact the allowed rest minutes. 1/2 of Included Paid Breaks are deducted from the allowed rest minutes. Value is entered in sidebar.';
export const INCENTIVE_OPPORTUNITY_ALLOWANCE = 'This is additional allowance time designed to ensure that an employee is provided time to achieve incentive during machine operations. It is a manual input and is decided by Management or union contractual language. Value is entered in sidebar.';
export const PAID_TIME = 'Company policy or union contractual language will dictate the categories of time paid. This is known as Paid Time. Examples may include: Work time, pre/end of shift meetings, clean-up, breaks, lunches, etc. Value is entered in sidebar.';
export const RELIEF_TIME = 'Relief Time allows for an employee to step away from an operation, while the operation continues to run due to assistance. This reduces the Included Paid Time, resulting in an allowance factor that is less due to the continued running of the operation.  The standard time reflects the amount of Included Paid Time allowed during production time of the line or machine NOT the production time of the individual worker. Relief Time is removed from Included Paid Time. Value is entered in sidebar.';
export const REST_TIME = 'Rest Time is determined from industry standard tables recognizing weight handled and the percentage of working time under load. Rest Time accounts for a worker\'s last hour of working being less productive than their first hour of work. Rest Factor is applied to the difference of the Included Paid Time from the Available Paid Time for Allowance Application. 1/2 of the Excluded and Included Paid Break Time is subtracted from Rest Time. This assumes that 1/2 of Excluded and Included Paid Break Time will be used for rest.';
export const TOTAL_INCLUDED_PAID = 'Included Paid Time is paid time when employees are not expected to be engaged in measured activities. If Relief Time is provided, Relief Time is deducted from Included Paid Time.';
export const UNPAID_TIME = 'The company does not pay for all of the time an employee is at the work site. This is known as Unpaid Time. Examples: Unpaid lunches, unpaid ad hoc breaks taken when time permits, etc. Company policy or union contractual language will dictate the categories of time which are unpaid.';
export const REST_OFFSET_MINUTES = '(Total Included + Excluded)/2';
export const TOTAL_REST_MINUTES = '(Rest Time – Rest Offset)';
export const TOTAL_REST_TIME = '(From Rest Calculation)';