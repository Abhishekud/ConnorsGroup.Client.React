import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Map} from 'immutable';
import autoBind from 'react-autobind';
import {
  AutoSizer,
  Column,
  Table,
} from 'react-virtualized';
import {
  MatrixGridCheckbox,
  MatrixGridHeaderCheckbox,
} from '../../forms/components';
import pluralize from 'pluralize';

export default class AttributesList extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  rowClassName({index}) {
    if (index < 0) return '';

    return index % 2 === 0 ? 'even' : 'odd';
  }

  noRowsRenderer() {
    const {departmentName, locationName} = this.props;
    return <div className="no-rows"><h3>No {pluralize(locationName)} with this {departmentName} found</h3></div>;
  }

  getLocationAtIndex({index}) {
    return this.props.locations[index];
  }

  renderLocationAttributeCell({dataKey, rowData}) {
    const {saving, onSelectAttribute, locationsAttributes} = this.props;

    const locationId = rowData.get('id');
    const checked = locationsAttributes.get(locationId).has(dataKey);

    return (
      <MatrixGridCheckbox
        onChange={onSelectAttribute}
        rowId={rowData.get('id')}
        columnId={dataKey}
        saving={saving}
        checked={checked} />
    );
  }

  renderLocationAttributeHeader({dataKey, label}) {
    const {saving, locations, onSelectAllAttributes} = this.props;
    const selectedCount = this.getSelectedCount(dataKey);

    return (
      <MatrixGridHeaderCheckbox
        onChange={onSelectAllAttributes}
        label={label}
        columnId={dataKey}
        saving={saving}
        rowCount={locations.length}
        selectedCount={selectedCount} />
    );
  }

  getSelectedCount(attributeId) {
    const {locations, locationsAttributes} = this.props;

    let count = 0;

    locations.forEach(location => {
      const locationId = location.get('id');
      if (locationsAttributes.get(locationId).has(attributeId)) count++;
    });

    return count;
  }

  render() {
    const {locations, locationsAttributes, attributes, sort, onSort, locationName} = this.props;

    const width = 320 + attributes.length * 125;

    return (
      <AutoSizer>
        {({height}) => (
          <Table
            _locations={locations}
            _locationsAttributes={locationsAttributes}
            _attributes={attributes}

            style={{width: `${width + 30}px`}}
            width={width}
            height={height - 60}
            headerHeight={50}
            rowHeight={30}

            rowCount={locations.length}
            rowGetter={this.getLocationAtIndex}
            rowClassName={this.rowClassName}

            sortBy={sort.get('by')}
            sortDirection={sort.get('direction')}
            sort={onSort}

            noRowsRenderer={this.noRowsRenderer}>

            <Column dataKey="name" width={320} flexGrow={1} label={locationName} />
            {attributes.map(att =>
              (<Column key={att.get('id')} dataKey={att.get('id')} width={125} label={att.get('name')}
                cellRenderer={this.renderLocationAttributeCell}
                headerRenderer={this.renderLocationAttributeHeader}
                disableSort />))}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

AttributesList.propTypes = {
  locationName: PropTypes.string.isRequired,
  departmentName: PropTypes.string.isRequired,
  saving: PropTypes.bool,
  locations: PropTypes.array.isRequired,
  locationsAttributes: PropTypes.instanceOf(Map).isRequired,
  attributes: PropTypes.array.isRequired,
  sort: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  onSelectAttribute: PropTypes.func.isRequired,
  onSelectAllAttributes: PropTypes.func.isRequired,
};
