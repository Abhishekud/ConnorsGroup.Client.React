import React from 'react';
import {PropTypes} from 'prop-types';
import {Grid, GridColumn, GridNoRecords} from '@progress/kendo-react-grid';
import {ColumnContextMenu} from './ColumnContextMenu';
import {DEFAULT_GRID_COLUMN_MIN_WIDTH} from '../constants/columnConfigurations';
function scrollableOptions({onPageChange, skip, take, total}) {
  if (typeof onPageChange !== 'undefined') {
    return {
      onPageChange,
      skip,
      total,
      scrollable: total <= take ? 'scrollable' : 'virtual',
      pageSize: take,
      rowHeight: 40,
    };
  }
  return {};
}

function sortableOptions({onSort, sort, noFromJs}) {
  if (typeof onSort !== 'undefined') {
    return {
      sortable: {
        allowUnsort: true,
        mode: 'multiple',
      },
      sort: noFromJs ? sort : sort.toJS(),
      onSortChange: onSort,
    };
  }

  return {};
}

function getfilter(filter, noFromJs) {
  if (filter === null || typeof filter === 'undefined') {
    return null;
  }
  return noFromJs ? filter : filter.toJS();
}

function filterableOptions({onFilter, filter, noFromJs}) {
  if (typeof onFilter !== 'undefined') {
    return {
      filterable: true,
      filter: getfilter(filter, noFromJs),
      onFilterChange: onFilter,
    };
  }
  return {};
}

function columnReorderableOptions({reorderable, onColumnReorder}) {
  if (typeof onColumnReorder !== 'undefined' && reorderable) {
    return {
      reorderable,
      onColumnReorder,
    };
  }
  return {};
}
function selectableOptions({selectedField, onSelectedChange, onHeaderSelectedChange, columns, children}) {
  if (onSelectedChange && columns && columns.size > 0) {
    return {
      selectedField: columns.first().get('field'),
      onSelectionChange: onSelectedChange,
      onHeaderSelectionChange: onHeaderSelectedChange,
    };
  } else if (onSelectedChange && children && children.length > 0) {
    return {
      selectedField: children[0].props.field,
      onSelectionChange: onSelectedChange,
      onHeaderSelectionChange: onHeaderSelectedChange,
    };
  } else if (selectedField) {
    return {
      selectedField,
    };
  }
  return {};
}

function editableOptions({onItemChange}) {
  if (typeof onItemChange !== 'undefined') {
    return {onItemChange, editField: 'inEdit'}; // standardize the field used to signal the row is ready for edit.
  }
  return {};
}

export default function CustomizableGrid(props) {
  const {data, style, columns, children, onRowClick, headerCellRender, filterCellRender, noFromJs, toggleColumnLock, toggleColumnVisibility, isGridDataLoading, gridDataLoadingMessage} = props;
  const gridOptions = {
    resizable: true,
    onRowClick,
    style,
    headerCellRender,
    filterCellRender,
    data: noFromJs ? data : data.toJS(),
    ...sortableOptions(props),
    ...filterableOptions(props),
    ...selectableOptions(props),
    ...scrollableOptions(props),
    ...editableOptions(props),
    ...columnReorderableOptions(props),
  };

  const renderColumnContextMenu = columnProps => (columnProps.get('field') !== 'selected' && columnProps.get('field') !== 'activeSymbol' && columnProps.get('field') !== 'staleStandard' && props.showColumnContextMenu
    ? props => (<ColumnContextMenu
      {...props}
      isSortable={columnProps.get('sortable')}
      onColumnLockToggle={toggleColumnLock}
      onColumnDisableToggle={toggleColumnVisibility}
      locked={columnProps.get('locked')}
      lockable={columnProps.get('lockable')} />) : null);

  return (
    <Grid {...gridOptions} >
      {isGridDataLoading && <GridNoRecords>
        {gridDataLoadingMessage ? gridDataLoadingMessage : 'Data Loading...'}
      </GridNoRecords>}
      {children || columns.map(c => (<GridColumn key={c.get('field')} reorderable
        columnMenu={renderColumnContextMenu(c)} {...c.toJS()}
        minResizableWidth={c.get('locked') ? c.get('width') : DEFAULT_GRID_COLUMN_MIN_WIDTH} />))}
    </Grid>
  );
}

CustomizableGrid.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired, // Immutable.js list
  style: PropTypes.object,
  columns: props => {
    if ((typeof props.columns) === 'undefined' || props.columns === null) {
      if ((typeof props.children) === 'undefined' || props.children === null) {
        return new Error('Must provide content for the modal in "columns" or "children" properties.');
      }
    } else if (typeof props.columns !== 'object') {
      return new Error('Columns must be an immutable list');
    }
    return null;
  },
  children: PropTypes.arrayOf(PropTypes.element),
  sort: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onSort: PropTypes.func,
  filter: PropTypes.object,
  onFilter: PropTypes.func,
  onRowClick: PropTypes.func,
  onSelectedChange: PropTypes.func,
  onHeaderSelectedChange: PropTypes.func,
  onPageChange: PropTypes.func,
  skip: PropTypes.number,
  take: PropTypes.number,
  total: PropTypes.number,
  onItemChange: PropTypes.func,
  headerCellRender: PropTypes.func,
  filterCellRender: PropTypes.func,
  selectedField: PropTypes.string,
  isGridDataLoading: PropTypes.bool,
};
