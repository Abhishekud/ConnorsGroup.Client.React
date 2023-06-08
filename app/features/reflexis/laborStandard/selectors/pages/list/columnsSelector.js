import {createSelector} from 'reselect';
import {fromJS} from 'immutable';
import orgHierarchyLevelsSelector from '../../../../../orgHierarchyLevels/selectors/pages/list/orgHierarchyLevelsSelector';
import {
  NumericFilterCell,
} from '../../../../../customizableGrid/components';

//const columnWidth = title => title.length * 7 + 60;

const primaryColumns =
 fromJS([
   {
     field: 'selected',
     width: 50,
     required: true,
     included: true,
     sortable: false,
     filterable: false,
   },
   //{
   //  field: 'staleStandard',
   //  title: ' ',
   //  editable: false,
   //  filterable: true,
   //  sortable: true,
   //  width: 90,
   //  filterCell: StaleFilterCell,
   //  cell: StaleCell,
   //},
   //{
   //  field: 'laborStandardName',
   //  title: 'Labor Standard',
   //  editable: false,
   //  filterable: true,
   //  sortable: true,
   //  required: true,
   //  width: 200,
   //},
   {
     field: 'standardId',
     title: 'Standard Id',
     filterCell: NumericFilterCell,
     filter: 'numeric',
     editable: false,
     filterable: true,
     sortable: true,
     required: true,
     width: 200,
   },
   {
     field: 'standardName',
     title: 'Standard',
     editable: false,
     filterable: true,
     sortable: true,
     required: true,
     width: 200,
   },
   {
     field: 'locationName',
     title: 'Location',
     editable: false,
     filterable: true,
     sortable: true,
     required: true,
     width: 200,
   },
   {
     field: 'volumeDriverName',
     title: 'Volume Driver',
     editable: false,
     filterable: true,
     sortable: true,
     required: true,
     width: 200,
   },
   {
     field: 'attributeName',
     title: 'Reflexis Attribute',
     editable: false,
     filterable: true,
     sortable: true,
     required: true,
     width: 200,
   },
   {
     field: 'laborTimeMeasurementUnits',
     title: 'Time Value',
     filterCell: NumericFilterCell,
     filter: 'numeric',
     editable: false,
     filterable: true,
     sortable: true,
     required: true,
     width: 200,
   },
   //{
   //  field: 'description',
   //  title: 'Description',
   //  editable: false,
   //  filterable: true,
   //  sortable: true,
   //  required: true,
   //  width: 200,
   //}
 ]);

export default createSelector(
  orgHierarchyLevelsSelector,
  () => primaryColumns
);
