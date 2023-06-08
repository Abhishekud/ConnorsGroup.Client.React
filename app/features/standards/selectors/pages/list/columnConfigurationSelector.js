import {createSelector} from 'reselect';
import allStandardsSelectedSelector from './allStandardsSelectedSelector';
import departmentNameSelector from '../../../../shared/selectors/components/settings/departmentNameSelector';
import partFamilyNameSelector from '../../../../shared/selectors/components/settings/partFamilyNameSelector';
import featureFlagsSelector from '../../../../shared/selectors/components/settings/featureFlagsSelector';
import {ALLOWED_MAX_COLUMN_LOCKS} from '../../../../customizableGrid/constants/columnConfigurations';
import lockedColumnsSelector from './lockedColumnsSelector';
import columnOrderSelector from './columnOrderSelector';
import hiddenColumnsSelector from './hiddenColumnsSelector';
import {DateCell, FixedVariableCell, FixedVariableFilterCell, NumericFilterCell} from '../../../../customizableGrid/components';
import {PARTS} from '../../../../shared/constants/featureFlags';
import {fromJS, Map} from 'immutable';
import filingFieldsSelector from './filingFieldsSelector';

export default createSelector(
  allStandardsSelectedSelector,
  departmentNameSelector,
  partFamilyNameSelector,
  featureFlagsSelector,
  lockedColumnsSelector,
  columnOrderSelector,
  hiddenColumnsSelector,
  filingFieldsSelector,
  (allStandardsSelected, departmentName, partFamilyName, featureFlags, lockedColumns, columnOrder, hiddenColumns,
    filingFields) => {

    let defaultColumns =
    fromJS([
      {field: 'selected', width: 50, required: true, included: true, sortable: false, filterable: false, headerSelectionValue: allStandardsSelected},
      {field: 'id', width: 100, title: 'ID', included: true, filter: 'numeric', filterCell: NumericFilterCell, sortable: true},
      {field: 'name', width: 400, title: 'Name', included: true, sortable: true},
      {field: 'departmentName', width: 200, title: departmentName, included: true, sortable: true},
      {field: 'jobClassName', width: 200, title: 'Job Class', included: true, sortable: true},
      {field: 'laborCategoryName', width: 200, title: 'Labor Category', included: true, sortable: true},
      {field: 'classificationName', width: 200, title: 'Classification', included: true, sortable: true},
      {field: 'allowanceName', width: 200, title: 'Allowance', included: true, sortable: true},
      {field: 'attributeName', width: 200, title: 'Attribute', included: true, sortable: true},
      {field: 'partFamily', width: 200, title: partFamilyName, included: true, featureFlag: PARTS, sortable: true},
      {field: 'fixed', width: 200, title: 'Fixed/Variable', included: true, filterCell: FixedVariableFilterCell, cell: FixedVariableCell, sortable: true},
      {field: 'applicatorEmail', width: 200, title: 'Applicator', included: true, sortable: true},
      {field: 'status', width: 200, title: 'Status', included: true, sortable: true},
      {field: 'effectiveStartDate', width: 200, title: 'Effective Start Date', filter: 'date', cell: DateCell, included: true, sortable: true},
      {field: 'effectiveEndDate', width: 200, title: 'Effective End Date', filter: 'date', cell: DateCell, included: true, sortable: true},
    ]);

    const filingFieldsColumns = filingFields.map(col =>
      Map({
        field: col.get('filingFieldId').toString(),
        title: col.get('filingFieldName'),
        width: 200,
        included: true,
        sortable: true,
      })
    ).toList();

    const disabledFeatureFlagFields = defaultColumns.filter(col => col.get('featureFlag') && !featureFlags.get(col.get('featureFlag'))).map(x => x.get('field'));
    const lockedColumnsCount = lockedColumns.size;

    if (disabledFeatureFlagFields?.size) {
      defaultColumns = defaultColumns.filter(col => !disabledFeatureFlagFields.includes(col.get('field')));
    }

    const columns = defaultColumns
      .concat(filingFieldsColumns)
      .withMutations(allColumnsArray => {
        allColumnsArray.map(col =>
          col
            .set('included', !hiddenColumns.has(col.get('columnId') || col.get('field')))
            .set('locked', col.get('field') === 'selected' || lockedColumns.has(col.get('columnId') || col.get('field')))
            .set('lockable', lockedColumnsCount < ALLOWED_MAX_COLUMN_LOCKS)
        );
      });

    let columnOrderIndex = 0;
    const lockedList = columns.filter(c => c.get('locked')).map(c => c.set('orderIndex', columnOrderIndex++));
    const unLockedList = columns.filter(c => !c.get('locked') && c.get('included')).map(c => c.set('orderIndex', columnOrderIndex++));
    const hiddenList = columns.filter(c => !c.get('included')).map(c => c.set('orderIndex', columnOrderIndex++));
    let mergedColumns = lockedList.concat(unLockedList);

    if (columnOrder.size) {
      mergedColumns = columnOrder.concat(hiddenList)
        .map(c => (c.get('field') === 'selected' ? c.set('headerSelectionValue', allStandardsSelected) : c));
    }
    return mergedColumns.sortBy(item => item.get('orderIndex'));
  });
