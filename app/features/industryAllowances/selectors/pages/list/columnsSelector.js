import {createSelector} from 'reselect';
import {fromJS} from 'immutable';
import headerSelectionValueSelector from './headerSelectionValueSelector';
import {TwoDecimalNumericCell, DefaultTableHeaderCell, DefaultTableNumericCell, DefaultTableCell} from '../../../../customizableGrid/components';

export default createSelector(
  headerSelectionValueSelector,
  headerCheckbox => {
    const columns = fromJS([
      {
        width: 50,
        field: 'selected',
        required: true,
        headerSelectionValue: headerCheckbox,
        filterable: false,
      },
      {
        width: 200,
        field: 'name',
        title: 'Name',
        filterable: true,
        sortable: true,
        headerCell: DefaultTableHeaderCell,
        cell: DefaultTableCell,
      },
      {
        width: 200,
        field: 'restCalculationName',
        title: 'Rest Calculation Name',
        filterable: true,
        sortable: true,
        headerCell: DefaultTableHeaderCell,
        cell: DefaultTableCell,
      },
      {
        width: 200,
        field: 'paidTimeMinutes',
        title: 'Paid Time (Mins)',
        filterable: true,
        sortable: true,
        headerCell: DefaultTableHeaderCell,
        cell: DefaultTableNumericCell,
      },
      {
        width: 200,
        field: 'excludedPaidBreaksMinutes',
        title: 'Excluded Paid Breaks (Mins)',
        filterable: true,
        sortable: true,
        headerCell: DefaultTableHeaderCell,
        cell: DefaultTableNumericCell,
      },
      {
        width: 200,
        field: 'reliefTimeMinutes',
        title: 'Relief Time (Mins)',
        filterable: true,
        sortable: true,
        headerCell: DefaultTableHeaderCell,
        cell: DefaultTableNumericCell,
      },
      {
        width: 200,
        field: 'includedPaidBreaksMinutes',
        title: 'Included Paid Breaks (Mins)',
        filterable: true,
        sortable: true,
        headerCell: DefaultTableHeaderCell,
        cell: DefaultTableNumericCell,
      },
      {
        width: 200,
        field: 'minorUnavoidableDelayPercent',
        title: 'Minor Unavoidable Delay %',
        filterable: true,
        sortable: true,
        headerCell: DefaultTableHeaderCell,
        cell: DefaultTableNumericCell,
      },
      {
        width: 200,
        field: 'additionalDelayPercent',
        title: 'Additional Delay %',
        filterable: true,
        sortable: true,
        headerCell: DefaultTableHeaderCell,
        cell: DefaultTableNumericCell,
      },
      {
        width: 200,
        field: 'machineAllowancePercent',
        title: 'Incentive Opportunity Allowance %',
        filterable: true,
        sortable: true,
        headerCell: DefaultTableHeaderCell,
        cell: DefaultTableNumericCell,
      },
      {
        width: 200,
        field: 'allowancePercent',
        title: 'Allowance %',
        filterable: true,
        sortable: true,
        headerCell: DefaultTableHeaderCell,
        cell: TwoDecimalNumericCell,
      },
      {
        width: 200,
        field: 'allowanceFactor',
        title: 'Calculated PR&D Allowance Factor',
        filterable: true,
        sortable: true,
        headerCell: DefaultTableHeaderCell,
        cell: TwoDecimalNumericCell,
      }]);

    return columns;
  }
);
