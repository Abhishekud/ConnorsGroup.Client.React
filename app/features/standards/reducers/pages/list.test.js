import {List, Map, fromJS} from 'immutable';
import {
  STANDARDS as STANDARDS_GRID,
} from '../../../customizableGrid/constants/grids';
import {
  retrieveGridConfigurationFulfilled,
} from '../../../customizableGrid/services/gridActionBuilder';
import {default as reducerFunction} from './list';
import {
  FixedVariableCell,
  NumericFilterCell,
  FixedVariableFilterCell,
  DateCell,
} from '../../../customizableGrid/components';
import {
  GET_STANDARD_FILING_FIELDS_AS_SELECT_LISTS_OPTIONS_FULFILLED,
} from '../../../selectListOptions/actions';
import {
  isNil as isNullOrUndefined,
  isUndefined,
} from 'lodash';
import {PARTS} from '../../../shared/constants/featureFlags';
import {STANDARDS_EDIT} from '../../../authentication/constants/permissions';
import {default as selectorFunction} from '../../selectors/pages/list/columnConfigurationSelector';
import {LOAD_STANDARDS_COLUMNS} from '../../actions';

const {describe, test, expect} = global;

let emptyState;

//Commit e5ef859 removed tests for checking column name field changes; reimplement the tests when the behavior is added back.

function selectState(filingFieldsColumns, isFlagEnabled) {
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
            filingFields: filingFieldsColumns,
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

const retrieveAction = {
  type: retrieveGridConfigurationFulfilled(STANDARDS_GRID),
  payload: {},
};

const loadColumnAction = {
  type: LOAD_STANDARDS_COLUMNS,
  payload: {},
};

const filingFieldsAction = {
  type: GET_STANDARD_FILING_FIELDS_AS_SELECT_LISTS_OPTIONS_FULFILLED,
  payload: {},
};

const filingFieldReturnDataSetTwoFields = [
  {filingFieldId: 1, filingFieldName: 'Filing Field 1', options: []},
  {filingFieldId: 2, filingFieldName: 'Filing Field 2', options: []},
];

const filingFieldReturnDataSetOneField = [
  {filingFieldId: 1, filingFieldName: 'Filing Field 1', options: []},
];

const filingFieldReturnDataSetOneFieldWithDifferentId = [
  {filingFieldId: 2, filingFieldName: 'Filing Field 1', options: []},
];

const filingFieldReturnDataSetThreeFields = [
  {filingFieldId: 1, filingFieldName: 'Filing Field 1', options: []},
  {filingFieldId: 2, filingFieldName: 'Filing Field 2', options: []},
  {filingFieldId: 3, filingFieldName: 'Filing Field 3', options: []},
];

const filingFieldReturnDataSetEmpty = [];

const defaultGridConfigurationStateTwoFilingFields = new Map({
  filter: null,
  columnOrder: fromJS([
    {field: 'selected', width: 50, required: true, included: true, sortable: false, filterable: false, headerSelectionValue: false, orderIndex: 0, lockable: true, locked: true},
    {field: 'id', width: 100, title: 'ID', included: true, filter: 'numeric', filterCell: NumericFilterCell, sortable: true, orderIndex: 1, lockable: true, locked: false},
    {field: 'name', width: 400, title: 'Name', included: true, sortable: true, orderIndex: 2, lockable: true, locked: false},
    {field: 'departmentName', width: 200, title: 'Department', included: true, sortable: true, orderIndex: 3, lockable: true, locked: false},
    {field: 'jobClassName', width: 200, title: 'Job Class', included: true, sortable: true, orderIndex: 4, lockable: true, locked: false},
    {field: 'laborCategoryName', width: 200, title: 'Labor Category', included: true, sortable: true, orderIndex: 5, lockable: true, locked: false},
    {field: 'classificationName', width: 200, title: 'Classification', included: true, sortable: true, orderIndex: 6, lockable: true, locked: false},
    {field: 'allowanceName', width: 200, title: 'Allowance', included: true, sortable: true, orderIndex: 7, lockable: true, locked: false},
    {field: 'attributeName', width: 200, title: 'Attribute', included: true, sortable: true, orderIndex: 8, lockable: true, locked: false},
    {field: 'partFamily', width: 200, title: 'Part Family', included: true, featureFlag: PARTS, sortable: true, orderIndex: 9, lockable: true, locked: false},
    {field: 'fixed', width: 200, title: 'Fixed/Variable', included: true, filterCell: FixedVariableFilterCell, cell: FixedVariableCell, sortable: true, orderIndex: 10, lockable: true, locked: false},
    {field: 'applicatorEmail', width: 200, title: 'Applicator', included: true, sortable: true, orderIndex: 11, lockable: true, locked: false},
    {field: 'status', width: 200, title: 'Status', included: true, sortable: true, orderIndex: 12, lockable: true, locked: false},
    {field: 'effectiveStartDate', width: 200, title: 'Effective Start Date', filter: 'date', included: true, cell: DateCell, sortable: true, orderIndex: 13, lockable: true, locked: false},
    {field: 'effectiveEndDate', width: 200, title: 'Effective End Date', filter: 'date', included: true, cell: DateCell, sortable: true, orderIndex: 14, lockable: true, locked: false},
    {field: '1', title: 'Filing Field 1', width: 200, included: true, sortable: true, orderIndex: 15, lockable: true, locked: false},
    {field: '2', title: 'Filing Field 2', width: 200, included: true, sortable: true, orderIndex: 16, lockable: true, locked: false},
  ]),
  sort: new List(),
});

const defaultGridConfigurationStateOneFilingField = new Map({
  columnOrder: fromJS([
    {field: 'selected', width: 50, required: true, included: true, sortable: false, filterable: false, headerSelectionValue: false, orderIndex: 0, lockable: true, locked: true},
    {field: 'id', width: 100, title: 'ID', included: true, filter: 'numeric', filterCell: NumericFilterCell, sortable: true, orderIndex: 1, lockable: true, locked: false},
    {field: 'fixed', width: 200, title: 'Fixed/Variable', included: true, filterCell: FixedVariableFilterCell, cell: FixedVariableCell, sortable: true, orderIndex: 2, lockable: true, locked: false},
    {field: 'name', width: 400, title: 'Name', included: true, sortable: true, orderIndex: 3, lockable: true, locked: false},
    {field: 'departmentName', width: 200, title: 'Department', included: true, sortable: true, orderIndex: 4, lockable: true, locked: false},
    {field: 'jobClassName', width: 200, title: 'Job Class', included: true, sortable: true, orderIndex: 5, lockable: true, locked: false},
    {field: 'laborCategoryName', width: 200, title: 'Labor Category', included: true, sortable: true, orderIndex: 6, lockable: true, locked: false},
    {field: 'classificationName', width: 200, title: 'Classification', included: true, sortable: true, orderIndex: 7, lockable: true, locked: false},
    {field: 'allowanceName', width: 200, title: 'Allowance', included: true, sortable: true, orderIndex: 8, lockable: true, locked: false},
    {field: 'attributeName', width: 200, title: 'Attribute', included: true, sortable: true, orderIndex: 9, lockable: true, locked: false},
    {field: 'partFamily', width: 200, title: 'Part Family', included: true, featureFlag: PARTS, sortable: true, orderIndex: 10, lockable: true, locked: false},
    {field: 'applicatorEmail', width: 200, title: 'Applicator', included: true, sortable: true, orderIndex: 11, lockable: true, locked: false},
    {field: 'status', width: 200, title: 'Status', included: true, sortable: true, orderIndex: 12, lockable: true, locked: false},
    {field: 'effectiveStartDate', width: 200, title: 'Effective Start Date', filter: 'date', included: true, cell: DateCell, sortable: true, orderIndex: 13, lockable: true, locked: false},
    {field: 'effectiveEndDate', width: 200, title: 'Effective End Date', filter: 'date', included: true, cell: DateCell, sortable: true, orderIndex: 14, lockable: true, locked: false},
    {field: '1', title: 'Filing Field 1', width: 200, included: true, sortable: true, orderIndex: 15, lockable: true, locked: false},
  ]),
  sort: fromJS([{'field': 'name', 'dir': 'desc'}]),
  filter: fromJS({'logic': 'and',
    filters: [{'field': 'fixed', 'operator': 'eq', 'value': true},
      {'field': 'classificationName', 'operator': 'contains', 'value': 'CLASS'},
    ]}),
});

const defaultGridConfigurationStateNoFilingFields = new Map({
  columnOrder: fromJS([
    {field: 'selected', width: 50, required: true, included: true, sortable: false, filterable: false, headerSelectionValue: false, orderIndex: 0, lockable: true, locked: true},
    {field: 'id', width: 100, title: 'ID', included: true, filter: 'numeric', filterCell: NumericFilterCell, sortable: true, orderIndex: 1, lockable: true, locked: false},
    {field: 'departmentName', width: 200, title: 'Department', included: true, sortable: true, orderIndex: 2, lockable: true, locked: false},
    {field: 'name', width: 400, title: 'Name', included: true, sortable: true, orderIndex: 3, lockable: true, locked: false},
    {field: 'jobClassName', width: 200, title: 'Job Class', included: true, sortable: true, orderIndex: 4, lockable: true, locked: false},
    {field: 'laborCategoryName', width: 200, title: 'Labor Category', included: true, sortable: true, orderIndex: 5, lockable: true, locked: false},
    {field: 'classificationName', width: 200, title: 'Classification', included: true, sortable: true, orderIndex: 6, lockable: true, locked: false},
    {field: 'allowanceName', width: 200, title: 'Allowance', included: true, sortable: true, orderIndex: 7, lockable: true, locked: false},
    {field: 'attributeName', width: 200, title: 'Attribute', included: true, sortable: true, orderIndex: 8, lockable: true, locked: false},
    {field: 'partFamily', width: 200, title: 'Part Family', included: true, featureFlag: PARTS, sortable: true, orderIndex: 9, lockable: true, locked: false},
    {field: 'fixed', width: 200, title: 'Fixed/Variable', included: true, filterCell: FixedVariableFilterCell, cell: FixedVariableCell, sortable: true, orderIndex: 10, lockable: true, locked: false},
    {field: 'applicatorEmail', width: 200, title: 'Applicator', included: true, sortable: true, orderIndex: 11, lockable: true, locked: false},
    {field: 'status', width: 200, title: 'Status', included: true, sortable: true, orderIndex: 12, lockable: true, locked: false},
    {field: 'effectiveStartDate', width: 200, title: 'Effective Start Date', filter: 'date', included: true, cell: DateCell, sortable: true, orderIndex: 13, lockable: true, locked: false},
    {field: 'effectiveEndDate', width: 200, title: 'Effective End Date', filter: 'date', included: true, cell: DateCell, sortable: true, orderIndex: 14, lockable: true, locked: false},
  ]),
  sort: fromJS([{'field': 'name', 'dir': 'desc'}]),
  filter: fromJS({logic: 'and',
    filters: [
      {'field': 'fixed', 'operator': 'eq', 'value': true},
      {'field': 'classificationName', 'operator': 'contains', 'value': 'CLASS'},
    ]}),
});

const defaultGridConfigurationStateOneFilingFieldWithDifferentId = new Map({
  columnOrder: fromJS([
    {field: 'selected', width: 50, required: true, included: true, sortable: false, filterable: false, headerSelectionValue: false, orderIndex: 0, lockable: true, locked: true},
    {field: 'id', width: 100, title: 'ID', included: true, filter: 'numeric', filterCell: NumericFilterCell, sortable: true, orderIndex: 1, lockable: true, locked: false},
    {field: 'departmentName', width: 200, title: 'Department', included: true, sortable: true, orderIndex: 2, lockable: true, locked: false},
    {field: 'name', width: 400, title: 'Name', included: true, sortable: true, orderIndex: 3, lockable: true, locked: false},
    {field: 'jobClassName', width: 200, title: 'Job Class', included: true, sortable: true, orderIndex: 4, lockable: true, locked: false},
    {field: 'laborCategoryName', width: 200, title: 'Labor Category', included: true, sortable: true, orderIndex: 5, lockable: true, locked: false},
    {field: 'classificationName', width: 200, title: 'Classification', included: true, sortable: true, orderIndex: 6, lockable: true, locked: false},
    {field: 'allowanceName', width: 200, title: 'Allowance', included: true, sortable: true, orderIndex: 7, lockable: true, locked: false},
    {field: 'attributeName', width: 200, title: 'Attribute', included: true, sortable: true, orderIndex: 8, lockable: true, locked: false},
    {field: 'partFamily', width: 200, title: 'Part Family', included: true, featureFlag: PARTS, sortable: true, orderIndex: 9, lockable: true, locked: false},
    {field: 'fixed', width: 200, title: 'Fixed/Variable', included: true, filterCell: FixedVariableFilterCell, cell: FixedVariableCell, sortable: true, orderIndex: 10, lockable: true, locked: false},
    {field: 'applicatorEmail', width: 200, title: 'Applicator', included: true, sortable: true, orderIndex: 11, lockable: true, locked: false},
    {field: 'status', width: 200, title: 'Status', included: true, sortable: true, orderIndex: 12, lockable: true, locked: false},
    {field: 'effectiveStartDate', width: 200, title: 'Effective Start Date', filter: 'date', included: true, cell: DateCell, sortable: true, orderIndex: 13, lockable: true, locked: false},
    {field: 'effectiveEndDate', width: 200, title: 'Effective End Date', filter: 'date', included: true, cell: DateCell, sortable: true, orderIndex: 14, lockable: true, locked: false},
    {field: '2', title: 'Filing Field 1', width: 200, included: true, sortable: true, orderIndex: 15, lockable: true, locked: false},
  ]),
  sort: fromJS([{'field': 'name', 'dir': 'desc'}]),
  filter: fromJS({logic: 'and',
    filters: [
      {'field': 'fixed', 'operator': 'eq', 'value': true},
      {'field': 'classificationName', 'operator': 'contains', 'value': 'CLASS'},
    ]}),
});

const defaultGridConfigurationStateThreeFilingFields = new Map({
  columnOrder: fromJS([
    {field: 'selected', width: 50, required: true, included: true, sortable: false, filterable: false, headerSelectionValue: false, orderIndex: 0, lockable: true, locked: true},
    {field: 'id', width: 100, title: 'ID', included: true, filter: 'numeric', filterCell: NumericFilterCell, sortable: true, orderIndex: 1, lockable: true, locked: false},
    {field: 'fixed', width: 200, title: 'Fixed/Variable', included: true, filterCell: FixedVariableFilterCell, cell: FixedVariableCell, sortable: true, orderIndex: 2, lockable: true, locked: false},
    {field: 'name', width: 400, title: 'Name', included: true, sortable: true, orderIndex: 3, lockable: true, locked: false},
    {field: 'departmentName', width: 200, title: 'Department', included: true, sortable: true, orderIndex: 4, lockable: true, locked: false},
    {field: 'jobClassName', width: 200, title: 'Job Class', included: true, sortable: true, orderIndex: 5, lockable: true, locked: false},
    {field: 'laborCategoryName', width: 200, title: 'Labor Category', included: true, sortable: true, orderIndex: 6, lockable: true, locked: false},
    {field: 'classificationName', width: 200, title: 'Classification', included: true, sortable: true, orderIndex: 7, lockable: true, locked: false},
    {field: 'allowanceName', width: 200, title: 'Allowance', included: true, sortable: true, orderIndex: 8, lockable: true, locked: false},
    {field: 'attributeName', width: 200, title: 'Attribute', included: true, sortable: true, orderIndex: 9, lockable: true, locked: false},
    {field: 'partFamily', width: 200, title: 'Part Family', included: true, featureFlag: PARTS, sortable: true, orderIndex: 10, lockable: true, locked: false},
    {field: 'applicatorEmail', width: 200, title: 'Applicator', included: true, sortable: true, orderIndex: 11, lockable: true, locked: false},
    {field: 'status', width: 200, title: 'Status', included: true, orderIndex: 12, lockable: true, locked: false},
    {field: 'effectiveStartDate', width: 200, title: 'Effective Start Date', filter: 'date', included: true, cell: DateCell, sortable: true, orderIndex: 13, lockable: true, locked: false},
    {field: 'effectiveEndDate', width: 200, title: 'Effective End Date', filter: 'date', included: true, cell: DateCell, sortable: true, orderIndex: 14, lockable: true, locked: false},
    {field: '1', title: 'Filing Field 1', width: 200, included: true, sortable: true, orderIndex: 15, lockable: true, locked: false},
    {field: '2', title: 'Filing Field 2', width: 200, included: true, sortable: true, orderIndex: 16, lockable: true, locked: false},
    {field: '3', title: 'Filing Field 3', width: 200, included: true, sortable: true, orderIndex: 17, lockable: true, locked: false},
  ]),
  sort: fromJS([{field: 'name', dir: 'desc'}]),
  filter: fromJS({
    logic: 'and',
    filters: [
      {field: 'fixed', operator: 'eq', value: true},
      {field: 'classificationName', operator: 'contains', value: 'CLASS'},
    ]}),
});

const compareCachedGridConfigurationStateTwoFilingFields = new Map({
  filter: fromJS({
    logic: 'and',
    filters: [
      {field: 'fixed', operator: 'eq', value: true},
      {field: 'classificationName', operator: 'contains', value: 'CLASS'},
    ],
  }),
  columnOrder: fromJS([
    {field: 'selected', width: 50, required: true, included: true, sortable: false, filterable: false, headerSelectionValue: false, orderIndex: 0, lockable: true},
    {field: 'id', width: 100, title: 'ID', included: true, filter: 'numeric', filterCell: NumericFilterCell, orderIndex: 1, lockable: true},
    {field: 'fixed', width: 200, title: 'Fixed/Variable', included: true, filterCell: FixedVariableFilterCell, cell: FixedVariableCell, orderIndex: 2, lockable: true},
    {field: 'name', width: 400, title: 'Name', included: true, orderIndex: 3, lockable: true},
    {field: 'departmentName', width: 200, title: 'Department', included: true, orderIndex: 4, lockable: true},
    {field: 'jobClassName', width: 200, title: 'Job Class', included: true, orderIndex: 5, lockable: true},
    {field: 'laborCategoryName', width: 200, title: 'Labor Category', included: true, orderIndex: 6, lockable: true},
    {field: 'classificationName', width: 200, title: 'Classification', included: true, orderIndex: 7, lockable: true},
    {field: 'allowanceName', width: 200, title: 'Allowance', included: true, orderIndex: 8, lockable: true},
    {field: 'attributeName', width: 200, title: 'Attribute', included: true, orderIndex: 9, lockable: true},
    {field: 'partFamily', width: 200, title: 'Part Family', included: true, featureFlag: PARTS, orderIndex: 10, lockable: true},
    {field: 'applicatorEmail', width: 200, title: 'Applicator', included: true, orderIndex: 11, lockable: true},
    {field: 'status', width: 200, title: 'Status', included: true, orderIndex: 12, lockable: true},
    {field: 'effectiveStartDate', width: 200, title: 'Effective Start Date', filter: 'date', included: true, cell: DateCell, orderIndex: 13, lockable: true},
    {field: 'effectiveEndDate', width: 200, title: 'Effective End Date', filter: 'date', included: true, cell: DateCell, orderIndex: 14, lockable: true},
    {field: '1', title: 'Filing Field 1', width: 200, included: true, orderIndex: 15, lockable: true},
    {field: '2', title: 'Filing Field 2', width: 200, included: true, orderIndex: 16, lockable: true},
  ]),
  sort: fromJS([{field: 'name', dir: 'desc'}]),
});

const cachedGridConfigurationTwoFilingFields = {configuration: '{"columns":[{"orderIndex":0,"field":"selected","width":50,"required":true,"included":true,"sortable":false,"filterable":false,"headerSelectionValue":false},{"orderIndex":1,"field":"id","width":100,"title":"ID","included":true,"filter":"numeric"},{"orderIndex":2,"field":"fixed","width":200,"title":"Fixed/Variable","included":true},{"orderIndex":3,"field":"name","width":400,"title":"Name","included":true},{"orderIndex":4,"field":"departmentName","width":200,"title":"Department","included":true},{"orderIndex":5,"field":"jobClassName","width":200,"title":"Job Class","included":true},{"orderIndex":6,"field":"laborCategoryName","width":200,"title":"Labor Category","included":true},{"orderIndex":7,"field":"classificationName","width":200,"title":"Classification","included":true},{"orderIndex":8,"field":"allowanceName","width":200,"title":"Allowance","included":true},{"orderIndex":9,"field":"attributeName","width":200,"title":"Attribute","included":true},{"orderIndex":10,"field":"partFamily","width":200,"title":"Part Family","included":true,"featureFlag":"parts"},{"orderIndex":11,"field":"applicatorEmail","width":200,"title":"Applicator","included":true},{"orderIndex":12,"field":"status","width":200,"title":"Status","included":true},{"orderIndex":13,"field":"effectiveStartDate","width":200,"title":"Effective Start Date","filter":"date","included":true},{"orderIndex":14,"field":"effectiveEndDate","width":200,"title":"Effective End Date","filter":"date","included":true},{"orderIndex":15,"field":"1","title":"Filing Field 1","width":200,"included":true},{"orderIndex":16,"field":"2","title":"Filing Field 2","width":200,"included":true}],"sort":[{"field":"name","dir":"desc"}],"filter":{"logic":"and","filters":[{"field":"fixed","operator":"eq","value":true},{"field":"classificationName","operator":"contains","value":"CLASS"}]},"hiddenColumns":{}}'};
const cachedGridConfigurationOnefilingField = {configuration: '{"columns":[{"orderIndex":0,"field":"selected","width":50,"required":true,"included":true,"sortable":false,"filterable":false,"headerSelectionValue":false},{"orderIndex":1,"field":"id","width":100,"title":"ID","included":true,"filter":"numeric"},{"orderIndex":3,"field":"departmentName","width":200,"title":"Department","included":true},{"orderIndex":4,"field":"name","width":400,"title":"Name","included":true},{"orderIndex":5,"field":"jobClassName","width":200,"title":"Job Class","included":true},{"orderIndex":6,"field":"laborCategoryName","width":200,"title":"Labor Category","included":true},{"orderIndex":7,"field":"classificationName","width":200,"title":"Classification","included":true},{"orderIndex":8,"field":"allowanceName","width":200,"title":"Allowance","included":true},{"orderIndex":9,"field":"attributeName","width":200,"title":"Attribute","included":true},{"orderIndex":10,"field":"partFamily","width":200,"title":"Part Family","included":true},{"orderIndex":11,"field":"fixed","width":200,"title":"Fixed/Variable","included":true},{"orderIndex":12,"field":"applicatorEmail","width":200,"title":"Applicator","included":true},{"orderIndex":13,"field":"status","width":200,"title":"Status","included":true},{"orderIndex":14,"field":"effectiveStartDate","width":200,"title":"Effective Start Date","filter":"date","included":true},{"orderIndex":15,"field":"effectiveEndDate","width":200,"title":"Effective End Date","filter":"date","included":true},{"orderIndex":16,"field":"1","title":"Filing Field 1","width":200,"included":true}],"sort":[{"field":"name","dir":"desc"}],"filter":{"logic":"and","filters":[{"field":"fixed","operator":"eq","value":true},{"field":"classificationName","operator":"contains","value":"CLASS"}]},"hiddenColumns":{}}'};

const cachedDefaultGridConfigurationTwoFilingFields = {configuration: '{"columns":[{"orderIndex":0,"field":"selected","width":50,"required":true,"included":true,"sortable":false,"filterable":false,"headerSelectionValue":false},{"orderIndex":1,"field":"id","width":100,"title":"ID","included":true,"filter":"numeric"},{"orderIndex":2,"field":"name","width":400,"title":"Name","included":true},{"orderIndex":3,"field":"departmentName","width":200,"title":"Department","included":true},{"orderIndex":4,"field":"jobClassName","width":200,"title":"Job Class","included":true},{"orderIndex":5,"field":"laborCategoryName","width":200,"title":"Labor Category","included":true},{"orderIndex":6,"field":"classificationName","width":200,"title":"Classification","included":true},{"orderIndex":7,"field":"allowanceName","width":200,"title":"Allowance","included":true},{"orderIndex":8,"field":"attributeName","width":200,"title":"Attribute","included":true},{"orderIndex":9,"field":"partFamily","width":200,"title":"Part Family","included":true},{"orderIndex":10,"field":"fixed","width":200,"title":"Fixed/Variable","included":true},{"orderIndex":11,"field":"applicatorEmail","width":200,"title":"Applicator","included":true},{"orderIndex":12,"field":"status","width":200,"title":"Status","included":true},{"orderIndex":13,"field":"effectiveStartDate","width":200,"title":"Effective Start Date","filter":"date","included":true},{"orderIndex":14,"field":"effectiveEndDate","width":200,"title":"Effective End Date","filter":"date","included":true},{"orderIndex":15,"field":"1","title":"Filing Field 1","width":200,"included":true},{"orderIndex":16,"field":"2","title":"Filing Field 2","width":200,"included":true}],"sort":[],"filter":null,"hiddenColumns":{}}'};

const nullGridConfiguration = {configuration: null};

function checkTypeMismatch(SUTType, comparisonType) {
  return {
    pass: SUTType === comparisonType,
    msg: `expected SUT to be '${comparisonType}' but it is '${SUTType}'`,
  };
}

expect.extend({
  toBeEqualStateColumns(SUTStateColumns, comparisonStateColumns) {
    let pass = true;
    let msg;

    SUTStateColumns.forEach((col, key, iter) => {
      const sutIndex = iter.findIndex(i => i === key);
      const compIndex = comparisonStateColumns.findIndex(i => i === key);
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
  toBeEqualList(SUTList, comparisonList) {
    if (SUTList.equals(comparisonList)) {
      return {
        message: () => 'expected lists to not be equal',
        pass: true,
      };
    }
    return {
      message: () => 'expected lists to be equal',
      pass: false,
    };
  },
  toBeEqualStateSort(SUTStateSort, comparisonStateSort) {
    let pass = true;
    let msg;

    const comparisonType = isNullOrUndefined(comparisonStateSort) ? comparisonStateSort : comparisonStateSort.constructor.name;
    const SUTType = isNullOrUndefined(SUTStateSort) ? SUTStateSort : SUTStateSort.constructor.name;
    const bothValuesDefined = !isNullOrUndefined(SUTStateSort) && !isNullOrUndefined(comparisonStateSort);

    ({pass, msg} = checkTypeMismatch(SUTType, comparisonType));

    if (pass && bothValuesDefined) {
      SUTStateSort.forEach((sort, index) => {
        if (sort.field !== comparisonStateSort.get(index).field) {
          pass = false;
          msg = `expected sort field at index '${index}' to be '${comparisonStateSort.get(index).field}' but found '${sort.field}'`;
          return false;
        } else if (sort.dir !== comparisonStateSort.get(index).dir) {
          pass = false;
          msg = `expected sort dir at index '${index}' to be '${comparisonStateSort.get(index).dir} but found '${sort.dir}'`;
          return false;
        }
        return true;
      });
    }

    if (pass) {
      return {
        message: () => 'expected state sorts to not be equal',
        pass: true,
      };
    }
    return {
      message: () => msg,
      pass: false,
    };
  },
  toBeEqualStateFilter(SUTStateFilter, comparisonStateFilter) {
    let pass = true;
    let msg;

    const comparisonType = isNullOrUndefined(comparisonStateFilter) ? comparisonStateFilter : comparisonStateFilter.constructor.name;
    const SUTType = isNullOrUndefined(SUTStateFilter) ? SUTStateFilter : SUTStateFilter.constructor.name;
    const bothValuesDefined = !isNullOrUndefined(SUTStateFilter) && !isNullOrUndefined(comparisonStateFilter);

    ({pass, msg} = checkTypeMismatch(SUTType, comparisonType));

    if (pass && bothValuesDefined && SUTStateFilter.get('logic') !== comparisonStateFilter.get('logic')) {
      pass = false;
      msg = `expected SUT Filter logic to be '${comparisonStateFilter.get('logic')}' but found '${SUTStateFilter.get('logic')}'`;
    } else if (pass && bothValuesDefined) {
      SUTStateFilter.get('filters').forEach(filter => {
        const comparisonFilter = comparisonStateFilter.get('filters').find(f => f.get('field') === filter.get('field'));
        if (isUndefined(comparisonFilter)) {
          pass = false;
          msg = `unexpected filter on field '${filter.get('field')}'`;
          return false;
        } else if (filter.get('operator') !== comparisonFilter.get('operator')) {
          pass = false;
          msg = `expected '${filter.get('field')}' filter operator to be '${comparisonFilter.get('operator')}' but found '${filter.get('operator')}'`;
          return false;
        } else if (filter.get('value') !== comparisonFilter.get('value')) {
          pass = false;
          msg = `expected '${filter.get('field')}.${filter.get('field')}' filter value to be '${comparisonFilter.get('value')}' but found '${filter.get('value')}'`;
          return false;
        }
        return true;
      });
    }

    if (pass) {
      return {
        message: () => 'expected state filters to not be equal',
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
  toBeSameTypeImmutableContainer(SUTContainer, comparisonContainer) {
    const comparisonContainerType = isNullOrUndefined(comparisonContainer) ? comparisonContainer : comparisonContainer.constructor.name;
    const SUTContainerType = isNullOrUndefined(SUTContainer) ? SUTContainer : SUTContainer.constructor.name;

    if (SUTContainerType === comparisonContainerType) {
      return {
        message: () => `expected container types to be different, but both are ${comparisonContainerType}`,
        pass: true,
      };
    }
    return {
      message: () => `expected SUT container type to be '${comparisonContainerType}' but found '${SUTContainerType}'`,
      pass: false,
    };
  },
});

describe('Standards Grid Configuration Retrieval, cache finishes first', () => {
  test('should return default state with no configuration passed', () => {
    retrieveAction.payload = {data: nullGridConfiguration};
    filingFieldsAction.payload = {data: filingFieldReturnDataSetTwoFields};

    let SUT = reducerFunction(emptyState, retrieveAction);
    SUT = reducerFunction(SUT, filingFieldsAction);
    SUT = SUT.set('isStandardsLoaded', true);
    const columnOrder = selectorFunction(selectState(SUT.get('filingFields'), true));
    loadColumnAction.payload = columnOrder;
    SUT = reducerFunction(SUT, loadColumnAction);

    const comparisonValue = defaultGridConfigurationStateTwoFilingFields;

    expect(SUT.get('columnOrder')).toBeEqualSizeImmutableContainer(comparisonValue.get('columnOrder'));
    expect(SUT.get('columnOrder')).toBeEqualStateColumns(comparisonValue.get('columnOrder'));

    expect(SUT.get('sort')).toBeEqualSizeImmutableContainer(comparisonValue.get('sort'));
    expect(SUT.get('sort')).toBeEqualStateSort(comparisonValue.get('sort'));

    expect(SUT.getIn(['filter', 'filters'])).toBeEqualSizeImmutableContainer(comparisonValue.getIn(['filter', 'filters']));
    expect(SUT.get('filter')).toBeEqualStateFilter(comparisonValue.get('filter'));
  });
  test('should return default state with when fewer filing fields retrieved than cached', () => {
    //Since this changes the total number of columns, this also tests if we remove columns from initialState
    retrieveAction.payload = {data: cachedGridConfigurationTwoFilingFields};
    filingFieldsAction.payload = {data: filingFieldReturnDataSetOneField};

    let SUT = reducerFunction(emptyState, retrieveAction);
    SUT = reducerFunction(SUT, filingFieldsAction);
    SUT = SUT.set('isStandardsLoaded', true);
    const columnOrder = selectorFunction(selectState(SUT.get('filingFields'), true));
    loadColumnAction.payload = columnOrder;
    SUT = reducerFunction(SUT, loadColumnAction);

    const comparisonValue = defaultGridConfigurationStateOneFilingField;

    expect(SUT.get('columnOrder')).toBeEqualSizeImmutableContainer(comparisonValue.get('columnOrder'));
    expect(SUT.get('columnOrder')).toBeEqualStateColumns(comparisonValue.get('columnOrder'));

    expect(SUT.get('sort')).toBeEqualSizeImmutableContainer(comparisonValue.get('sort'));
    expect(SUT.get('sort')).toBeEqualStateSort(comparisonValue.get('sort'));

    expect(SUT.getIn(['filter', 'filters'])).toBeEqualSizeImmutableContainer(comparisonValue.getIn(['filter', 'filters']));
    expect(SUT.get('filter')).toBeEqualStateFilter(comparisonValue.get('filter'));
  });
  test('should return default state when more filing fields retrieved than cached', () => {
    //Since this changes the total number of columns, this also tests if we add new columns to initialState
    retrieveAction.payload = {data: cachedGridConfigurationTwoFilingFields};
    filingFieldsAction.payload = {data: filingFieldReturnDataSetThreeFields};

    let SUT = reducerFunction(emptyState, retrieveAction);
    SUT = reducerFunction(SUT, filingFieldsAction);
    SUT = SUT.set('isStandardsLoaded', true);
    const columnOrder = selectorFunction(selectState(SUT.get('filingFields'), true));
    loadColumnAction.payload = columnOrder;
    SUT = reducerFunction(SUT, loadColumnAction);

    const comparisonValue = defaultGridConfigurationStateThreeFilingFields;

    expect(SUT.get('columnOrder')).toBeEqualSizeImmutableContainer(comparisonValue.get('columnOrder'));
    expect(SUT.get('columnOrder')).toBeEqualStateColumns(comparisonValue.get('columnOrder'));

    expect(SUT.get('sort')).toBeEqualSizeImmutableContainer(comparisonValue.get('sort'));
    expect(SUT.get('sort')).toBeEqualStateSort(comparisonValue.get('sort'));

    expect(SUT.getIn(['filter', 'filters'])).toBeEqualSizeImmutableContainer(comparisonValue.getIn(['filter', 'filters']));
    expect(SUT.get('filter')).toBeEqualStateFilter(comparisonValue.get('filter'));
  });
  test('should return default state when no filing fields are retrieved, but cached has at least one', () => {
    retrieveAction.payload = {data: cachedGridConfigurationOnefilingField};
    filingFieldsAction.payload = {data: filingFieldReturnDataSetEmpty};

    let SUT = reducerFunction(emptyState, retrieveAction);
    SUT = reducerFunction(SUT, filingFieldsAction);
    SUT = SUT.set('isStandardsLoaded', true);
    const columnOrder = selectorFunction(selectState(SUT.get('filingFields'), true));
    loadColumnAction.payload = columnOrder;
    SUT = reducerFunction(SUT, loadColumnAction);

    const comparisonValue = defaultGridConfigurationStateNoFilingFields;

    expect(SUT.get('columnOrder')).toBeEqualSizeImmutableContainer(comparisonValue.get('columnOrder'));
    expect(SUT.get('columnOrder')).toBeEqualStateColumns(comparisonValue.get('columnOrder'));

    expect(SUT.get('sort')).toBeEqualSizeImmutableContainer(comparisonValue.get('sort'));
    expect(SUT.get('sort')).toBeEqualStateSort(comparisonValue.get('sort'));

    expect(SUT.getIn(['filter', 'filters'])).toBeEqualSizeImmutableContainer(comparisonValue.getIn(['filter', 'filters']));
    expect(SUT.get('filter')).toBeEqualStateFilter(comparisonValue.get('filter'));
  });
  test('should return default state when filing field has new ID or column has new field', () => {
    //Since filingFieldId becomes the column's 'field', this also tests if we update an initialState column with a new field
    retrieveAction.payload = {data: cachedGridConfigurationOnefilingField};
    filingFieldsAction.payload = {data: filingFieldReturnDataSetOneFieldWithDifferentId};

    let SUT = reducerFunction(emptyState, retrieveAction);
    SUT = reducerFunction(SUT, filingFieldsAction);
    SUT = SUT.set('isStandardsLoaded', true);
    const columnOrder = selectorFunction(selectState(SUT.get('filingFields'), true));
    loadColumnAction.payload = columnOrder;
    SUT = reducerFunction(SUT, loadColumnAction);

    const comparisonValue = defaultGridConfigurationStateOneFilingFieldWithDifferentId;

    expect(SUT.get('columnOrder')).toBeEqualSizeImmutableContainer(comparisonValue.get('columnOrder'));
    expect(SUT.get('columnOrder')).toBeEqualStateColumns(comparisonValue.get('columnOrder'));

    expect(SUT.get('sort')).toBeEqualSizeImmutableContainer(comparisonValue.get('sort'));
    expect(SUT.get('sort')).toBeEqualStateSort(comparisonValue.get('sort'));

    expect(SUT.getIn(['filter', 'filters'])).toBeEqualSizeImmutableContainer(comparisonValue.getIn(['filter', 'filters']));
    expect(SUT.get('filter')).toBeEqualStateFilter(comparisonValue.get('filter'));
  });

  test('should match default state when state was cached as default', () => {
    retrieveAction.payload = {data: cachedDefaultGridConfigurationTwoFilingFields};
    filingFieldsAction.payload = {data: filingFieldReturnDataSetTwoFields};

    let SUT = reducerFunction(emptyState, retrieveAction);
    SUT = reducerFunction(SUT, filingFieldsAction);
    SUT = SUT.set('isStandardsLoaded', true);
    const columnOrder = selectorFunction(selectState(SUT.get('filingFields'), true));
    loadColumnAction.payload = columnOrder;
    SUT = reducerFunction(SUT, loadColumnAction);

    const compareValue = defaultGridConfigurationStateTwoFilingFields;

    expect(SUT.get('columnOrder')).toBeEqualSizeImmutableContainer(compareValue.get('columnOrder'));
    expect(SUT.get('columnOrder')).toBeEqualStateColumns(compareValue.get('columnOrder'));

    expect(SUT.get('sort')).toBeEqualSizeImmutableContainer(compareValue.get('sort'));
    expect(SUT.get('sort')).toBeEqualStateSort(compareValue.get('sort'));

    expect(SUT.getIn(['filter', 'filters'])).toBeEqualSizeImmutableContainer(compareValue.getIn(['filter', 'filters']));
    expect(SUT.get('filter')).toBeEqualStateFilter(compareValue.get('filter'));
  });
  test('should match cached state when valid cached state is retrieved', () => {
    retrieveAction.payload = {data: cachedGridConfigurationTwoFilingFields};
    filingFieldsAction.payload = {data: filingFieldReturnDataSetTwoFields};

    let SUT = reducerFunction(emptyState, retrieveAction);
    SUT = reducerFunction(SUT, filingFieldsAction);
    SUT = SUT.set('isStandardsLoaded', true);
    const columnOrder = selectorFunction(selectState(SUT.get('filingFields'), true));
    loadColumnAction.payload = columnOrder;
    SUT = reducerFunction(SUT, loadColumnAction);

    const compareValue = compareCachedGridConfigurationStateTwoFilingFields;

    expect(SUT.get('columnOrder')).toBeEqualSizeImmutableContainer(compareValue.get('columnOrder'));
    expect(SUT.get('columnOrder')).toBeEqualStateColumns(compareValue.get('columnOrder'));

    expect(SUT.get('sort')).toBeEqualSizeImmutableContainer(compareValue.get('sort'));
    expect(SUT.get('sort')).toBeEqualStateSort(compareValue.get('sort'));

    expect(SUT.getIn(['filter', 'filters'])).toBeEqualSizeImmutableContainer(compareValue.getIn(['filter', 'filters']));
    expect(SUT.get('filter')).toBeEqualStateFilter(compareValue.get('filter'));
  });
});

describe('Standards Grid Configuration Retrieval, filing fields finish first', () => {
  test('should return default state with no configuration passed', () => {
    retrieveAction.payload = {data: nullGridConfiguration};
    filingFieldsAction.payload = {data: filingFieldReturnDataSetTwoFields};

    let SUT = reducerFunction(emptyState, filingFieldsAction);
    SUT = reducerFunction(SUT, retrieveAction);
    SUT = SUT.set('isStandardsLoaded', true);
    const columnOrder = selectorFunction(selectState(SUT.get('filingFields'), true));
    loadColumnAction.payload = columnOrder;
    SUT = reducerFunction(SUT, loadColumnAction);

    const compareValue = defaultGridConfigurationStateTwoFilingFields;

    expect(SUT.get('columnOrder')).toBeEqualSizeImmutableContainer(compareValue.get('columnOrder'));
    expect(SUT.get('columnOrder')).toBeEqualStateColumns(compareValue.get('columnOrder'));

    expect(SUT.get('sort')).toBeEqualSizeImmutableContainer(compareValue.get('sort'));
    expect(SUT.get('sort')).toBeEqualStateSort(compareValue.get('sort'));

    expect(SUT.getIn(['filter', 'filters'])).toBeEqualSizeImmutableContainer(compareValue.getIn(['filter', 'filters']));
    expect(SUT.get('filter')).toBeEqualStateFilter(compareValue.get('filter'));
  });
  test('should return default state with when fewer filing fields retrieved than cached', () => {
    //Since this changes the total number of columns, this also tests if we remove columns from initialState
    retrieveAction.payload = {data: cachedGridConfigurationTwoFilingFields};
    filingFieldsAction.payload = {data: filingFieldReturnDataSetOneField};

    let SUT = reducerFunction(emptyState, filingFieldsAction);
    SUT = reducerFunction(SUT, retrieveAction);
    SUT = SUT.set('isStandardsLoaded', true);
    const columnOrder = selectorFunction(selectState(SUT.get('filingFields'), true));
    loadColumnAction.payload = columnOrder;
    SUT = reducerFunction(SUT, loadColumnAction);

    const comparisonValue = defaultGridConfigurationStateOneFilingField;

    expect(SUT.get('columnOrder')).toBeEqualSizeImmutableContainer(comparisonValue.get('columnOrder'));
    expect(SUT.get('columnOrder')).toBeEqualStateColumns(comparisonValue.get('columnOrder'));

    expect(SUT.get('sort')).toBeEqualSizeImmutableContainer(comparisonValue.get('sort'));
    expect(SUT.get('sort')).toBeEqualStateSort(comparisonValue.get('sort'));

    expect(SUT.getIn(['filter', 'filters'])).toBeEqualSizeImmutableContainer(comparisonValue.getIn(['filter', 'filters']));
    expect(SUT.get('filter')).toBeEqualStateFilter(comparisonValue.get('filter'));
  });
  test('should return default state when more filing fields retrieved than cached', () => {
    //Since this changes the total number of columns, this also tests if we add new columns to initialState
    retrieveAction.payload = {data: cachedGridConfigurationTwoFilingFields};
    filingFieldsAction.payload = {data: filingFieldReturnDataSetThreeFields};

    let SUT = reducerFunction(emptyState, filingFieldsAction);
    SUT = reducerFunction(SUT, retrieveAction);
    SUT = SUT.set('isStandardsLoaded', true);
    const columnOrder = selectorFunction(selectState(SUT.get('filingFields'), true));
    loadColumnAction.payload = columnOrder;
    SUT = reducerFunction(SUT, loadColumnAction);

    const comparisonValue = defaultGridConfigurationStateThreeFilingFields;

    expect(SUT.get('columnOrder')).toBeEqualSizeImmutableContainer(comparisonValue.get('columnOrder'));
    expect(SUT.get('columnOrder')).toBeEqualStateColumns(comparisonValue.get('columnOrder'));

    expect(SUT.get('sort')).toBeEqualSizeImmutableContainer(comparisonValue.get('sort'));
    expect(SUT.get('sort')).toBeEqualStateSort(comparisonValue.get('sort'));

    expect(SUT.getIn(['filter', 'filters'])).toBeEqualSizeImmutableContainer(comparisonValue.getIn(['filter', 'filters']));
    expect(SUT.get('filter')).toBeEqualStateFilter(comparisonValue.get('filter'));
  });
  test('should return default state when no filing fields are retrieved, but cached has at least one', () => {
    retrieveAction.payload = {data: cachedGridConfigurationOnefilingField};
    filingFieldsAction.payload = {data: filingFieldReturnDataSetEmpty};

    let SUT = reducerFunction(emptyState, filingFieldsAction);
    SUT = reducerFunction(SUT, retrieveAction);
    SUT = SUT.set('isStandardsLoaded', true);
    const columnOrder = selectorFunction(selectState(SUT.get('filingFields'), true));
    loadColumnAction.payload = columnOrder;
    SUT = reducerFunction(SUT, loadColumnAction);

    const comparisonValue = defaultGridConfigurationStateNoFilingFields;

    expect(SUT.get('columnOrder')).toBeEqualSizeImmutableContainer(comparisonValue.get('columnOrder'));
    expect(SUT.get('columnOrder')).toBeEqualStateColumns(comparisonValue.get('columnOrder'));

    expect(SUT.get('sort')).toBeEqualSizeImmutableContainer(comparisonValue.get('sort'));
    expect(SUT.get('sort')).toBeEqualStateSort(comparisonValue.get('sort'));

    expect(SUT.getIn(['filter', 'filters'])).toBeEqualSizeImmutableContainer(comparisonValue.getIn(['filter', 'filters']));
    expect(SUT.get('filter')).toBeEqualStateFilter(comparisonValue.get('filter'));
  });
  test('should return default state when filing field has new ID or column has new field', () => {
    //Since filingFieldId becomes the column's 'field', this also tests if we update an initialState column with a new field
    retrieveAction.payload = {data: cachedGridConfigurationOnefilingField};
    filingFieldsAction.payload = {data: filingFieldReturnDataSetOneFieldWithDifferentId};

    let SUT = reducerFunction(emptyState, filingFieldsAction);
    SUT = reducerFunction(SUT, retrieveAction);
    SUT = SUT.set('isStandardsLoaded', true);
    const columnOrder = selectorFunction(selectState(SUT.get('filingFields'), true));
    loadColumnAction.payload = columnOrder;
    SUT = reducerFunction(SUT, loadColumnAction);

    const comparisonValue = defaultGridConfigurationStateOneFilingFieldWithDifferentId;

    expect(SUT.get('columnOrder')).toBeEqualSizeImmutableContainer(comparisonValue.get('columnOrder'));
    expect(SUT.get('columnOrder')).toBeEqualStateColumns(comparisonValue.get('columnOrder'));

    expect(SUT.get('sort')).toBeEqualSizeImmutableContainer(comparisonValue.get('sort'));
    expect(SUT.get('sort')).toBeEqualStateSort(comparisonValue.get('sort'));

    expect(SUT.getIn(['filter', 'filters'])).toBeEqualSizeImmutableContainer(comparisonValue.getIn(['filter', 'filters']));
    expect(SUT.get('filter')).toBeEqualStateFilter(comparisonValue.get('filter'));
  });

  test('should match default state when state was cached as default', () => {
    retrieveAction.payload = {data: cachedDefaultGridConfigurationTwoFilingFields};
    filingFieldsAction.payload = {data: filingFieldReturnDataSetTwoFields};

    let SUT = reducerFunction(emptyState, filingFieldsAction);
    SUT = reducerFunction(SUT, retrieveAction);
    SUT = SUT.set('isStandardsLoaded', true);
    const columnOrder = selectorFunction(selectState(SUT.get('filingFields'), true));
    loadColumnAction.payload = columnOrder;
    SUT = reducerFunction(SUT, loadColumnAction);

    const compareValue = defaultGridConfigurationStateTwoFilingFields;

    expect(SUT.get('columnOrder')).toBeEqualSizeImmutableContainer(compareValue.get('columnOrder'));
    expect(SUT.get('columnOrder')).toBeEqualStateColumns(compareValue.get('columnOrder'));

    expect(SUT.get('sort')).toBeEqualSizeImmutableContainer(compareValue.get('sort'));
    expect(SUT.get('sort')).toBeEqualStateSort(compareValue.get('sort'));

    expect(SUT.getIn(['filter', 'filters'])).toBeEqualSizeImmutableContainer(compareValue.getIn(['filter', 'filters']));
    expect(SUT.get('filter')).toBeEqualStateFilter(compareValue.get('filter'));
  });
  test('should match cached state when valid cached state is retrieved', () => {
    retrieveAction.payload = {data: cachedGridConfigurationTwoFilingFields};
    filingFieldsAction.payload = {data: filingFieldReturnDataSetTwoFields};

    let SUT = reducerFunction(emptyState, filingFieldsAction);
    SUT = reducerFunction(SUT, retrieveAction);
    SUT = SUT.set('isStandardsLoaded', true);
    const columnOrder = selectorFunction(selectState(SUT.get('filingFields'), true));
    loadColumnAction.payload = columnOrder;
    SUT = reducerFunction(SUT, loadColumnAction);

    const compareValue = compareCachedGridConfigurationStateTwoFilingFields;

    expect(SUT.get('columnOrder')).toBeEqualSizeImmutableContainer(compareValue.get('columnOrder'));
    expect(SUT.get('columnOrder')).toBeEqualStateColumns(compareValue.get('columnOrder'));

    expect(SUT.get('sort')).toBeEqualSizeImmutableContainer(compareValue.get('sort'));
    expect(SUT.get('sort')).toBeEqualStateSort(compareValue.get('sort'));

    expect(SUT.getIn(['filter', 'filters'])).toBeEqualSizeImmutableContainer(compareValue.getIn(['filter', 'filters']));
    expect(SUT.get('filter')).toBeEqualStateFilter(compareValue.get('filter'));
  });
});
