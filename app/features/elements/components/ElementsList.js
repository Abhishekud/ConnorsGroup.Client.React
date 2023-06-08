import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {
  AutoSizer,
  Column,
  Table,
} from 'react-virtualized';
import {FormattedTMUs} from '../../shared/components';
import {layout} from '../../shared/constants';
import {statusClass, displayName, DRAFT, READY_FOR_QA, PRODUCTION} from '../../standards/constants/standardStatuses';

export default class ElementsList extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleRowClick({index, event}) {
    const {onRowClick, elements} = this.props;
    const status = elements[index].get('status');
    const {minimumStatus} = this.props;
    if ((minimumStatus === READY_FOR_QA && status === DRAFT) || (minimumStatus === PRODUCTION && status !== PRODUCTION)) {
      return;
    }
    if (onRowClick) {
      onRowClick(elements[index], index, event);
    }
  }

  noRowsRenderer() {
    return (
      <div className="no-rows"><h3>No Elements found</h3></div>
    );
  }

  getElementAtIndex({index}) {
    return this.props.elements[index];
  }

  isDisabled(index) {
    const {minimumStatus} = this.props;
    const status = this.props.elements[index].get('status');
    return ((minimumStatus === READY_FOR_QA && status === DRAFT) || (minimumStatus === PRODUCTION && status !== PRODUCTION));
  }

  rowClassName({index}) {
    if (index < 0) return '';
    if (this.isDisabled(index)) {
      return index % 2 === 0 ? 'even disabled' : 'odd disabled';
    }
    return index % 2 === 0 ? 'even' : 'odd';
  }

  renderCheckboxCell({rowIndex}) {
    const row = this.props.elements[rowIndex];
    const selected = row.get('selected');
    if (this.isDisabled(rowIndex)) {
      return <i className={selected ? 'fa fa-check-square-o disabled' : 'fa fa-square-o disabled'} />;
    }

    return <i className={selected ? 'fa fa-check-square-o list-row-selector' : 'fa fa-square-o list-row-selector'} />;
  }

  renderHeaderCheckboxCell() {
    const {selectedCount} = this.props;

    let faClass = 'fa-square-o';
    if (selectedCount > 0 && selectedCount === this.props.elements.length) {
      faClass = 'fa-check-square-o';
    } else if (selectedCount > 0) {
      faClass = 'fa-minus-square-o';
    }

    return <i className={`fa ${faClass} clickable`} onClick={this.props.onSelectAll} />;
  }

  elementTypeRenderer({rowData}) {
    const type = rowData.get('elementType');

    return (
      type[0]
    );
  }

  timeFormatRenderer({rowData}) {
    const tmu = rowData.get('measuredTimeMeasurementUnits');
    const formatId = rowData.get('id');

    return <FormattedTMUs timeMeasurementUnits={tmu} timeFormat={this.props.timeFormat} formattedTMUsId={formatId} />;
  }

  renderApplicatorInstructions({rowIndex}) {
    const row = this.props.elements[rowIndex];
    const instructions = row ? row.get('applicatorInstructions') : '';
    const hasInstructions = instructions ? instructions.length > 0 : false;

    return hasInstructions ? <i className={'fa fa-info'} title={instructions} /> : '';
  }

  renderId({rowData}) {
    const status = rowData.get('status');

    return (
      <div className={statusClass(status)}>
        <span>{rowData.get('id')}</span>
      </div>
    );
  }

  renderStatus({rowData}) {
    return displayName(rowData.get('status'));
  }

  render() {
    const {elements, withSelectors, sort, onSort, sidebarsShown} = this.props;

    return (
      <AutoSizer>
        {({width, height}) => (
          <Table
            width={width + (sidebarsShown * layout.SIDEBAR_WIDTH)}
            height={height}
            headerHeight={50}
            rowHeight={30}

            rowCount={elements.length}
            rowGetter={this.getElementAtIndex}
            rowClassName={this.rowClassName}
            onRowClick={this.handleRowClick}
            noRowsRenderer={this.noRowsRenderer}
            sort={onSort}
            sortBy={sort.get('by')}
            sortDirection={sort.get('direction')}>

            {withSelectors
              ? <Column
                dataKey="selected"
                disableSort
                width={40}
                flexShrink={0}
                className="selector-column list-row-selector"
                headerClassName="selector-column"
                cellRenderer={this.renderCheckboxCell}
                headerRenderer={this.renderHeaderCheckboxCell} />
              : null}
            <Column dataKey="id" width={70} flexShrink={0} label="ID" className="element-id-cell" cellRenderer={this.renderId} />
            <Column dataKey="elementType" width={40} flexShrink={0} label="Type" headerClassName="column-header-center-align" className="column-center-align" cellRenderer={this.elementTypeRenderer} />
            <Column dataKey="name" width={450} flexGrow={1} label="Name" />
            <Column dataKey="elementUnitOfMeasureName" width={150} flexGrow={1} label="Unit of Measure" />
            <Column dataKey="elementActivityName" width={170} flexGrow={1} label="Activity" />
            <Column dataKey="status" width={100} flexGrow={1} label="Status" cellRenderer={this.renderStatus} />
            <Column dataKey="measuredTimeMeasurementUnits" width={50} flexGrow={1} headerClassName="column-header-right-align" className="column-right-align" label="Time" cellRenderer={this.timeFormatRenderer} />
            <Column dataKey="applicatorInstructions" width={60} flexGrow={0} label="App. Inst." cellRenderer={this.renderApplicatorInstructions} headerClassName="column-header-center-align" className="column-center-align" />
          </Table>
        )}
      </AutoSizer>
    );
  }
}

ElementsList.propTypes = {
  elements: PropTypes.array.isRequired,
  withSelectors: PropTypes.bool,
  selectedCount: PropTypes.number,
  onRowClick: PropTypes.func,
  onSelectAll: PropTypes.func,
  sort: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  sidebarsShown: PropTypes.number.isRequired,
  timeFormat: PropTypes.string.isRequired,
};
