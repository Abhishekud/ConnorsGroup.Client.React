import {fromJS} from 'immutable';
import {default as selectorFunction} from './columnConfigurationSelector';
import {
  FixedVariableCell,
  NumericFilterCell,
  FixedVariableFilterCell,
  DateCell,
} from '../../../../customizableGrid/components';
import {
  isNil as isNullOrUndefined,
} from 'lodash';
import {PARTS} from '../../../../shared/constants/featureFlags';
import {STANDARDS_EDIT} from '../../../../authentication/constants/permissions';

const {describe, test, expect} = global;

function selectState(isFlagEnabled) {
  return {
    features: {
      authentication: {
        currentUser: fromJS({
          id: 0,
          email: '',
          roles: [],
          permissions: [STANDARDS_EDIT],
          passwordChangeRequired: false,
          acceptedTerms: false,
          authenticated: false,
          authenticationMethod: 'Password',
        }),
      },
      standards: {
        pages: {
          list: fromJS({
            standards: [],
            filter: null,
            sort: [],
            hiddenColumns: [],
            lockedColumns: [],
            columnOrder: [],
            filingFields: [],
          }),
        },
      },
      shared: {
        components: {
          settings: fromJS({
            settings: {},
            configurations: fromJS({parts: isFlagEnabled}),
            version: 0,
          }),
        },
      },
    },
  };
}

function getStandardsColumns(isFlagEnabled) {
  let columns = [
    {field: 'selected', width: 50, required: true, included: true, sortable: false, filterable: false, headerSelectionValue: false, locked: true, lockable: true, orderIndex: 0},
    {field: 'id', width: 100, title: 'ID', included: true, filter: 'numeric', filterCell: NumericFilterCell, locked: false, lockable: true, orderIndex: 1, sortable: true},
    {field: 'name', width: 400, title: 'Name', included: true, locked: false, lockable: true, orderIndex: 2, sortable: true},
    {field: 'departmentName', width: 200, title: 'Department', included: true, locked: false, lockable: true, orderIndex: 3, sortable: true},
    {field: 'jobClassName', width: 200, title: 'Job Class', included: true, locked: false, lockable: true, orderIndex: 4, sortable: true},
    {field: 'laborCategoryName', width: 200, title: 'Labor Category', included: true, locked: false, lockable: true, orderIndex: 5, sortable: true},
    {field: 'classificationName', width: 200, title: 'Classification', included: true, locked: false, lockable: true, orderIndex: 6, sortable: true},
    {field: 'allowanceName', width: 200, title: 'Allowance', included: true, locked: false, lockable: true, orderIndex: 7, sortable: true},
    {field: 'attributeName', width: 200, title: 'Attribute', included: true, locked: false, lockable: true, orderIndex: 8, sortable: true},
    {field: 'fixed', width: 200, title: 'Fixed/Variable', included: true, filterCell: FixedVariableFilterCell, cell: FixedVariableCell, locked: false, lockable: true, orderIndex: 9, sortable: true},
    {field: 'applicatorEmail', width: 200, title: 'Applicator', included: true, locked: false, lockable: true, orderIndex: 10, sortable: true},
    {field: 'status', width: 200, title: 'Status', included: true, locked: false, lockable: true, orderIndex: 11, sortable: true},
    {field: 'effectiveStartDate', width: 200, title: 'Effective Start Date', filter: 'date', included: true, cell: DateCell, locked: false, lockable: true, orderIndex: 12, sortable: true},
    {field: 'effectiveEndDate', width: 200, title: 'Effective End Date', filter: 'date', included: true, cell: DateCell, locked: false, lockable: true, orderIndex: 13, sortable: true},
  ];
  // we are removing the partFamily column if featureFlag is false
  if (isFlagEnabled) {
    const partFamilyColumn = {field: 'partFamily', width: 200, title: 'Part Family', featureFlag: PARTS, included: true, required: false, hidden: false, locked: false, lockable: true, orderIndex: 9, sortable: true};
    columns = columns.map(col => {
      if (col.orderIndex >= partFamilyColumn.orderIndex) col.orderIndex += 1;
      return col;
    });
    columns.push(partFamilyColumn);
  }
  return fromJS(columns);
}

expect.extend({
  toBeEqualStateColumns(SUTStateColumns, comparisonStateColumns) {
    let pass = true;
    let msg;

    SUTStateColumns.forEach((col, key, iter) => {
      const sutIndex = iter.keySeq().findIndex(i => i === key);
      const compIndex = comparisonStateColumns.keySeq().findIndex(i => i === key);
      if (sutIndex !== compIndex) {
        pass = false;
        if (compIndex === -1) msg = `SUT columns key '${key}' does not exist in comparison state columns`;
        else msg = `expected indices for key '${key}' of SUT columns '${sutIndex}' to be '${compIndex}'`;
        return false;
      }
      for (const [k, v] of col) {
        const comparisonStateColValue = comparisonStateColumns.getIn([key, k], null);

        //If the current column key value is a function (e.g. cell, FilterCell, etc) make sure the names match
        //Otherwise make sure the column exists in our expected state and if so that the value matches
        if (typeof v === 'function' && typeof comparisonStateColValue === 'function' && v.name !== comparisonStateColValue.name) {
          pass = false;
          msg = `expected SUT's column '${key}.${k}' function to be named '${comparisonStateColValue.name}' but found '${v.name}'`;
          return false;
        } else if (!comparisonStateColumns.has(key)) {
          pass = false;
          msg = `unexpected SUT column '${key}'`;
          return false;
        } else if (v !== comparisonStateColValue) {
          pass = false;
          msg = `expected SUT's '${key}.${k}' value to be '${comparisonStateColValue}' but found '${v}'`;
          return false;
        }
      }
      return true;
    });

    if (pass) {
      return {
        message: () => 'expected state columns to not be equal',
        pass: true,
      };
    }
    return {
      message: () => msg,
      pass: false,
    };
  },
  toBeEqualSizeImmutableContainer(SUTContainer, comparisonContainer) {
    const comparisonContainerSize = isNullOrUndefined(comparisonContainer) ? comparisonContainer : comparisonContainer.size;
    const SUTContainerSize = isNullOrUndefined(SUTContainer) ? SUTContainer : SUTContainer.size;

    if (SUTContainerSize === comparisonContainerSize) {
      return {
        message: () => `expected container sizes to be different, but both are '${comparisonContainerSize}'`,
        pass: true,
      };
    }
    return {
      message: () => `expected SUT container size to be '${comparisonContainerSize}' but found '${SUTContainerSize}'`,
      pass: false,
    };
  },
});

describe('Standards Grid Columns, PARTS flag OFF', () => {
  test('should return all columns except PartsFamily column', () => {
    const SUT = selectorFunction(selectState(false));
    const comparisonValue = getStandardsColumns(false);

    expect(SUT).toBeEqualSizeImmutableContainer(comparisonValue);
    expect(SUT.sortBy(f => f.get('field'))).toBeEqualStateColumns(comparisonValue.sortBy(f => f.get('field')));
  });
});

describe('Standards Grid Columns, PARTS flag ON', () => {
  test('should return all columns with the PartsFamily column visible', () => {
    const SUT = selectorFunction(selectState(true));
    const comparisonValue = getStandardsColumns(true);

    expect(SUT).toBeEqualSizeImmutableContainer(comparisonValue);
    expect(SUT.sortBy(f => f.get('field'))).toBeEqualStateColumns(comparisonValue.sortBy(f => f.get('field')));
  });
});
