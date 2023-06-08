import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {
  AutoSizer,
  Column,
  Table,
} from 'react-virtualized';
import pluralize from 'pluralize';

export default class PartsList extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  rowClassName({index}) {
    if (index < 0) return '';

    const {parts, selectedPartId} = this.props;
    if (parts[index].get('id') === selectedPartId) return 'clickable selected';

    return index % 2 === 0 ? 'clickable even' : 'clickable odd';
  }

  noRowsRenderer() {
    const {partName} = this.props;
    return <div className="no-rows"><h3>{`No ${pluralize(partName)} found`}</h3></div>;
  }

  getPartAtIndex({index}) {
    return this.props.parts[index];
  }

  getScrollToIndex() {
    const {parts, selectedPartId} = this.props;

    return selectedPartId ? parts.findIndex(u => u.get('id') === selectedPartId) : null;
  }

  renderPartFieldCell({dataKey, rowData}) {
    const field = rowData.get('partFieldValues').find(pfv => pfv.get('partFieldId') === Number(dataKey));
    const value = field ? field.get('value') : null;
    return <span>{value}</span>;
  }

  render() {
    const {parts, partFields, sort, onSort, onRowClick} = this.props;
    const conditionalProps = {};
    const scrollToIndex = this.getScrollToIndex();

    if (scrollToIndex) conditionalProps.scrollToIndex = scrollToIndex;

    const width = 320 + partFields.length * 150;

    return (
      <AutoSizer>
        {({height}) => (
          <Table
            style={{width: `${width + 30}px`}}
            width={width}
            height={height - 50}
            headerHeight={50}
            rowHeight={30}

            rowCount={parts.length}
            rowGetter={this.getPartAtIndex}
            rowClassName={this.rowClassName}

            sortBy={sort.get('by')}
            sortDirection={sort.get('direction')}
            sort={onSort}

            noRowsRenderer={this.noRowsRenderer}

            onRowClick={onRowClick}

            {...conditionalProps}>

            <Column dataKey="name" width={320} flexGrow={1} label="Name" />
            {partFields.map(field =>
              (<Column key={field.value} dataKey={field.value.toString()} width={150} flexGrow={0}
                label={field.label} cellRenderer={this.renderPartFieldCell} />))}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

PartsList.propTypes = {
  parts: PropTypes.array.isRequired,
  partFields: PropTypes.array.isRequired,
  partName: PropTypes.string.isRequired,
  sort: PropTypes.object.isRequired,
  selectedPartId: PropTypes.number,
  onSort: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
};
